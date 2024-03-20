const http = require('http');
const https = require('https');

/**
 * Checks if the host supports HTTPS, HTTP, or neither.
 * 
 * @param {string} host - The host to check.
 * @param {number} timeout - The timeout for each request in milliseconds.
 * @returns {Promise<string>} A promise that resolves to the protocol supported by the host.
 */
function checkProtocol(host, timeout = 5000) {
  return new Promise(resolve => {
    const options = {
      hostname: host,
      port: 443,
      method: 'HEAD',
      timeout: timeout,
    };

    const reqHttps = https.request(options, res => {
      resolve('https');
    });

    reqHttps.on('timeout', () => {
      reqHttps.destroy();
      const reqHttp = http.request({ ...options, port: 80 }, res => {
        resolve('http');
      });

      reqHttp.on('timeout', () => {
        reqHttp.destroy();
        resolve('none');
      });

      reqHttp.on('error', () => {
        resolve('none');
      });

      reqHttp.end();
    });

    reqHttps.on('error', () => {
      resolve('none');
    });

    reqHttps.end();
  });
}

/**
 * Checks a list of hosts for their supported protocols with concurrency control.
 * 
 * @param {Array<string>} hosts - The list of hosts to check.
 * @param {number} concurrency - The number of concurrent checks.
 * @param {number} timeout - The timeout for each check in milliseconds.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of objects with host and protocol.
 */
async function checkHosts(hosts, concurrency = 5, timeout = 5000) {
  const promises = hosts.map((host) => ({
    host,
    promise: checkProtocol(host, timeout).then(protocol => ({ host, protocol })),
  }));

  const results = [];
  for (let i = 0; i < promises.length; i += concurrency) {
    const batch = promises.slice(i, i + concurrency);
    const resultsBatch = await Promise.allSettled(batch.map(item => item.promise));
    results.push(...resultsBatch.map(result => result.status === 'fulfilled' ? result.value : { host: batch[result.index].host, protocol: 'error' }));
  }

  return results;
}

module.exports = checkHosts;

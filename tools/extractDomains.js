const { URL } = require('url');

/**
 * Extracts domains from URLs found in a given text. Optionally filters the domains
 * to include only those that are subdomains of a specified host.
 *
 * @param {string} text The text containing URLs.
 * @param {string} [host] Optional. The host used to filter the domains.
 * @returns {Array<string>} A list of unique domains, optionally filtered by the host.
 */
function extractDomainsFromText(text, host) {
    const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/gi;
    let domains = new Set();

    // Find and process all URLs in the text
    const urls = text.match(urlRegex);
    if (urls) {
        urls.forEach(url => {
            try {
                const domain = new URL(url).hostname;
                // If a host is specified, only add the domain if it's a subdomain or the same as the host
                if (!host || domain === host || domain.endsWith('.' + host)) {
                    domains.add(domain);
                }
            } catch (error) {
                // Log errors but don't interrupt the process
                console.error(`Error parsing URL: ${url}`, error);
            }
        });
    }

    // Convert the Set to an array for the output
    return Array.from(domains);
}

module.exports = extractDomainsFromText;

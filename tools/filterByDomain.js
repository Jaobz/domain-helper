/**
 * Checks if a given host belongs to a specified domain or its subdomains.
 *
 * @param {string} host The host to check.
 * @param {string} domain The domain to compare against.
 * @returns {boolean} True if the host belongs to the domain or its subdomains; false otherwise.
 */
function isSubdomainOrEqual(host, domain) {
    // Ensure both domain and host are in lowercase
    const normalizedHost = host.toLowerCase();
    const normalizedDomain = domain.toLowerCase();

    // Check if the host is equal to the domain or ends with the domain (as a subdomain)
    return normalizedHost === normalizedDomain || normalizedHost.endsWith('.' + normalizedDomain);
}

/**
 * Filters a list of URLs or hosts to include only those that belong to a specified domain or its subdomains.
 *
 * @param {Array<string>} urlsOrHosts The list of URLs or hosts to filter.
 * @param {string} domain The domain used for filtering the list.
 * @returns {Array<string>} The filtered list of URLs or hosts.
 */
function filterByDomain(urlsOrHosts, domain) {
    return urlsOrHosts.filter(item => {
        // Extract the host part (for URLs)
        let host;
        if (item.startsWith('http://') || item.startsWith('https://')) {
            try {
                const url = new URL(item);
                host = url.hostname;
            } catch (error) {
                console.error(`Error parsing URL: ${item}`, error);
                return false;
            }
        } else {
            host = item;
        }
        
        return isSubdomainOrEqual(host, domain);
    });
}

module.exports = filterByDomain;

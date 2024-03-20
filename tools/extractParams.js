/**
 * Extracts and de-duplicates query parameter names from a list of URLs.
 *
 * @param {Array<string>} urls The list of URLs to process.
 * @returns {Array<string>} A list of unique query parameter names.
 */
function extractUniqueQueryParams(urls) {
    const paramNames = new Set();

    urls.forEach(url => {
        const queryParams = new URL(url).searchParams;
        queryParams.forEach((value, name) => {
            paramNames.add(name);
        });
    });

    // Convert the Set to an array for output
    return Array.from(paramNames);
}

module.exports = extractUniqueQueryParams;

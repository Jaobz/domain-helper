# Domain Helper

This tool is used to help free up from the clutter of URLs, domains.

## Usage

```javascript
const tool = require('@jaobz/domain-helper');

const urls = [
    'http://a.com/x=1',
    'http://b.com/x=1',
    'http://a.b.com/x=2',
    'http://c.com/x=1',
];


// Filter urls by domain
tool.filterByDomain(urls, "b.com");  // ['http://b.com/x=1', 'http://a.b.com/x=2']


const hosts = [
    'a.com',
    'b.b.com',
    'c.b.com'
]

// Filter hosts by domain
tool.filterByDomain(urls, "b.com");  // ['b.b.com', 'c.b.com']

const hosts1 = [
    "example.com",
    "xxxx1111cccczzz.com"
];

const concurrency = 5;
const timeout = 30;

// Check alive http hosts and add http or https to result
const list = await tool.checkHosts(hosts1, concurrency, timeout); // ["https://example.com"]


const text = "https://a.com\nhttps://b.com/xxx\nhttps://a.b.com:443/abc\nhttps://c.com"

// Extract domains from text
const list = tool.extractDomain(text, "b.com"); // ["b.com", "a.b.com"]


const urls1 = [
    "https://a.com?p1=a&p2=2&p3",
    "https://b.com",
    "https://c.com?x1=a"
]

const params = tool.extractParams(urls1); // ["p1", "p2", "p3", "x1"]

```
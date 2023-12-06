const fs = require('fs');
const argv = process.argv;
const path = argv[2];
const axios = require('axios');

if (!path) {
    console.error(`Error: expected file path as argument. Did not get one.`);
    process.exit(1);
};

function readFileURLS(path) {
    try {
        const urlsString = fs.readFileSync(path, 'utf8');
        const urlsArray = urlsString.split('\n');
        return urlsArray;
    } catch (error) {
        console.error(`Error reading file/URL: ${error.message}`);
        process.exit(1);
    };
};



async function fetchData(url) {
    try {
        const res = await axios.get(url);
        return { url, res }
    } catch (err) {
        console.error(`Error fetching data from ${url}: ${err.message}`);
        return null;
    };
};

async function getData() {
    const urls = readFileURLS(path);

    const responses = await Promise.all(urls.map(url => fetchData(url)));

    const successfulPromises = responses.filter(response => response && response.res.status >= 200 && response.res.status < 300);

    const successfulResponses = successfulPromises.map(response => ({ url: response.url, data: response.res.data}));

    return successfulResponses;
};


async function writeData() {
    const dataArray = await getData();
    for(let data of dataArray) {
        const filePath = findRoot(data.url);
        const content = data.data;
        fs.writeFile(filePath, content, 'utf8', (err) => {
            if (err) {
                console.error(`Error writing to file: ${err.message}`);
            } else {
                console.log(`Data has been written to ${filePath}`);
            };
        });
    };
};

function findRoot(url) {
    const urlHostName = new URL(url).hostname;
    return urlHostName;
};

writeData();
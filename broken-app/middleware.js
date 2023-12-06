const axios = require('axios');


async function fetchData(developer) {
    const baseURL = 'https://api.github.com/users';
    try {
        const res = await axios.get(`${baseURL}/${developer}`);
        const name = res.data.login;
        const bio = res.data.bio;
        return { name, bio };
    } catch (err) {
        console.error(`Error fetching data for developer ${developer}: ${err.message}`);
        return { 'name': developer, Error: 'Not Found' };
    };
};


async function getData(developers) {
    const responses = await Promise.all(developers.map(developer => fetchData(developer)));
    return responses;
};


module.exports = { fetchData, getData };
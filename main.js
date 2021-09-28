const { json } = require('stream/consumers');
require('dotenv').config()
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const options = {
    headers: {
        Authorization: 'Bearer ' + process.env.BEARER_TOKEN,
    },
    method: 'GET',
};

var delay = 0;

main = async function () {

    const params = new URLSearchParams();
    params.append('screen_name', process.env.SCREEN_NAME);
    params.append('count', 200);

    response = await fetch("https://api.twitter.com/1.1/friends/list.json?" + params, options);
    result = await response.text();

    console.log(JSON.stringify(findOccurrences((await Promise.all(JSON.parse(result).users
        .map(a => a.screen_name)
        .map(async screenName => { return await fetchFriends(screenName) })))
        .flatMap(a => a)
        .sort())))
}

var fetchFriends = async function (screenName) {
    delay = delay + 30000;
    await sleep(delay) +
        console.log("continuing with... " + screenName);

    const params = new URLSearchParams();
    params.append('screen_name', screenName);
    return await fetch("https://api.twitter.com/1.1/friends/list.json?" + params, options)
        .then(response => {
            return response.text()
        })
        .then(body => {
            return JSON.parse(body).users
                .map(friend => friend.screen_name)
        })
        .catch(error => console.error(error))
}

function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time || 1000);
    });
}

var findOccurrences = function (arr) {
    return Object.entries(arr.reduce(function (acc, curr) { return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc }, {}))
        .filter(entry => entry[1] > 1)
}

main();
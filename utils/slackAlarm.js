const path = require('path');
require('dotenv').config({path: '/environments/slack-channel.env'});

const { WebClient } = require('@slack/web-api');
const token = process.env.TOKEN;
const slackBot = new WebClient(token);

const sendSlackAlarm = async (message) => {
    try {
        await slackBot.chat.postMessage({
            channel: process.env.CHANNEL,
            text: message
        })
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = sendSlackAlarm;
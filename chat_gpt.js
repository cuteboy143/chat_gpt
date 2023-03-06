const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const querystring = require('querystring');
const { URL } = require('url');

// Replace the value with your Telegram Bot token
const token = '5586300646:AAG3majgYBv68pS4ezONtvIm_FCujgvfGaM';

// Create a new bot instance
const bot = new TelegramBot(token, { polling: true });

// Listen for the "/modify" command
bot.onText(/\/modify (.+)/, async function (msg, match) {
  const shortUrl = match[1];
  const chatId = msg.chat.id;

  // Extract the last page URL from the short URL
  const response = await axios.get(shortUrl, { maxRedirects: 0, validateStatus: false });
  const lastUrl = response.headers.location;

  // Parse the last page URL and update the "tag" parameter with a new value provided by the user
  const parsedUrl = new URL(lastUrl);
  const tag = parsedUrl.searchParams.get('tag');
  const newTag = 'NEW_TAG_VALUE'; // Replace this with the new tag value provided by the user
  parsedUrl.searchParams.set(tag, newTag);
  parsedUrl.search = parsedUrl.searchParams.toString();

  // Return the modified URL
  const modifiedUrl = parsedUrl.toString();
  bot.sendMessage(`${chatId}, Modified URL: ${modifiedUrl}`);
});
const Telegraf = require('telegraf');
const express = require('express');
const app = express();

const API_TOKEN = '618490077:AAFQbPupzUUNHqADjHDlQu-RPAobpJLSYeM';
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'https://your-heroku-app.herokuapp.com';

const bot = new Telegraf(API_TOKEN);
bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
app.use(bot.webhookCallback(`/bot${API_TOKEN}`));

bot.hears('hi', ctx => {
  return ctx.reply('Hey!');
});

bot.startPolling();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

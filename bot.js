const Telegraf = require('telegraf');
const express = require('express');
const app = express();

const API_TOKEN = '618490077:AAFQbPupzUUNHqADjHDlQu-RPAobpJLSYeM';
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'https://schedule-telegram-bot.herokuapp.com/';

const bot = new Telegraf(API_TOKEN);
bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
app.use(bot.webhookCallback(`/bot${API_TOKEN}`));


bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy'));


bot.startPolling();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

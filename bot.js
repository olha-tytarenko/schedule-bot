const API_TOKEN = '618490077:AAFQbPupzUUNHqADjHDlQu-RPAobpJLSYeM';
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(API_TOKEN, { polling: true });

bot.on('message', (msg) => {
  const { chat } = msg;
  const chatId = chat.id;
  const firstName = chat.first_name;

  console.log(msg);
  bot.sendMessage(chatId, `Hello, ${firstName}`);
});

// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
//
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

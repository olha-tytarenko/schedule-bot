const TelegramBot = require('node-telegram-bot-api');
const MESSAGES = require('./messages');
const API_TOKEN = '618490077:AAFQbPupzUUNHqADjHDlQu-RPAobpJLSYeM';
const bot = new TelegramBot(API_TOKEN, { polling: true });

bot.on('message', (msg) => {
  const { chat: { id }, text } = msg;

  if (MESSAGES.GREETINGS.includes(text.toLocaleLowerCase())) {
    bot.sendMessage(id, MESSAGES.GREETING_REPLY);
  }
});

bot.onText(/\/startsearch/, (msg) => {
  const { chat: { id }} = msg;

  bot.sendMessage(id, MESSAGES.START_SEARCH_REPLY, {
    reply_markup: {
      keyboard: [['genre'], ['year'], ['name']],
      one_time_keyboard: true
    }
  });
});

bot.onText(/\/endsearch/, (msg) => {
  const { chat: { id }} = msg;

  bot.sendMessage(id, MESSAGES.END_SEARCH_REPLY);
});

bot.onText(/genre/, (msg) => {
  const { chat: { id }} = msg;

  bot.sendMessage(id, MESSAGES.END_SEARCH_REPLY, {
    reply_markup: {
      remove_keyboard: true
    }
  });
});

bot.onText(/name/, (msg) => {
  const { chat: { id }} = msg;

  bot.sendMessage(id, MESSAGES.END_SEARCH_REPLY, {
    reply_markup: {
      remove_keyboard: true
    }
  });
});

bot.onText(/year/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, MESSAGES.END_SEARCH_REPLY, {
    reply_markup: {
      remove_keyboard: true
    }
  });
});

bot.onText(/\/top/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, MESSAGES.END_SEARCH_REPLY);
});

bot.onText(/\/next/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, MESSAGES.END_SEARCH_REPLY);
});

bot.on('polling_error', (error) => {
  console.log(error);  // => 'EFATAL'
});



const TelegramBot = require('node-telegram-bot-api');
const MESSAGES = require('./messages');
const fetch = require('node-fetch');
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

  fetch('https://api.themoviedb.org/3/movie/popular?api_key=3e085579fcffd4433e96a3e0ac6dacb5&language=ru-RU&page=1')
    .then(res => res.json())
    .then(data => {
      const movies = data.results.slice(0, 5);
      const formattedMovies = movies.map(movie => ({
        title: movie.title,
        description: movie.overview,
        rating: movie.vote_average
      }))
        .map(m => {
          return `Title: ${m.title}\nDescription: ${m.description}\nRating: ${m.rating}`;
        });


      bot.sendMessage(chatId, formattedMovies.join('\n\n'));
    });
});

bot.onText(/\/next/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, MESSAGES.END_SEARCH_REPLY);
});

bot.on('polling_error', (error) => {
  console.log(error);  // => 'EFATAL'
});

bot.onText(/\/upcoming/, (msg) => {
  const chatId = msg.chat.id;

  fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=3e085579fcffd4433e96a3e0ac6dacb5&language=ru-RU&page=1')
    .then(res => res.json())
    .then(data => {
      const movies = data.results.slice(0, 5);
      const formattedMovies = movies.map(movie => ({
        title: movie.title,
        description: movie.overview,
        releaseDate: movie.release_date
      }))
        .map(m => {
          return `Title: ${m.title}\nDescription: ${m.description}\nRelease date: ${m.releaseDate}`;
        });


      bot.sendMessage(chatId, formattedMovies.join('\n\n'));
    });
});



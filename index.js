const Telegraf = require('telegraf');
const app = new Telegraf('618490077:AAFQbPupzUUNHqADjHDlQu-RPAobpJLSYeM');

app.hears('hi', ctx => {
  return ctx.reply('Hey!');
});

app.startPolling();

const { Telegraf, Markup } = require('telegraf');

const BOT_TOKEN = '9133573433:AAGVibT0UyIDsGknJDSuten5DPw2YGrhq_Q';
const WEB_APP_URL = 'https://matikzxc.github.io/Shop---matikzxc/';

const bot = new Telegraf(BOT_TOKEN);

const commands = [
  { command: 'start', description: 'Главное меню и магазин' },
  { command: 'terms', description: 'Условия магазина' },
  { command: 'paysupport', description: 'Помощь с покупкой' }
];

async function setCommands() {
  try {
    await bot.telegram.setMyCommands(commands);
    await bot.telegram.setMyCommands(commands, { language_code: 'ru' });
    console.log('Команды обновлены');
  } catch (error) {
    console.error('Ошибка команд:', error.message);
  }
}

bot.start(async (ctx) => {
  const text = `MATIKZXC SHOP — магазин водяных знаков и не только!

• Готовые watermark с вашим ником
• Озвучки и аватарки на заказ
• Доступ в приват
• Collab в TikTok со мной

Оплата: звёзды ⭐️ или карта / СБП. Готовые файлы приходят в этот чат!

📢 Канал: @biomatikzxc

Нажмите кнопку ниже, чтобы открыть магазин.
Условия: /terms · Помощь с оплатой: /paysupport`;

  return ctx.reply(text, Markup.inlineKeyboard([
    [Markup.button.webApp('🔥 Открыть магазин', WEB_APP_URL)],
    [
      Markup.button.url('📢 Канал', 'https://t.me/biomatikzxc'),
      Markup.button.url('💬 Поддержка', 'https://t.me/matikmngr')
    ]
  ]));
});

bot.command('terms', (ctx) => ctx.reply(`Правила и условия магазина MATIKZXC SHOP:

1. Товары цифровые: watermark, озвучки, аватарки и доступ в приват. Все это приходит в чат бота.
2. Заказы на watermark выполняются по очереди; созданием занимается владелец. Срок не гарантируется, но делается максимально быстро!
3. Озвучки и аватарки создаются вручную; срок зависит от сложности.
4. Доступ в приват предоставляется навсегда по персональной ссылке. Если потеряли доступ, напишите менеджеру: @matikmngr.
5. Проверьте ник перед оплатой: watermark делается ровно с тем ником, который вы указали.
6. Возврат: если заказ не выполнен по моей вине — верну оплату в кратчайшие сроки. Если товар уже выдан, возврату он не подлежит.
7. Оформляя заказ, вы соглашаетесь с условиями и политикой конфиденциальности.

По всем вопросам писать менеджеру: @matikmngr`));

bot.command('paysupport', (ctx) => ctx.reply(
  'Возникли трудности с оплатой звездами или переводом на карту?\nНапишите нашему менеджеру — вам помогут в течение нескольких минут: @matikmngr',
  Markup.inlineKeyboard([
    [Markup.button.url('💬 Написать менеджеру', 'https://t.me/matikmngr')]
  ])
));

bot.catch((error, ctx) => {
  console.error('Ошибка:', error);
});

(async () => {
  await setCommands();
  await bot.launch();
  console.log('Бот успешно запущен');
})().catch((error) => {
  console.error('Ошибка запуска:', error);
  process.exit(1);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

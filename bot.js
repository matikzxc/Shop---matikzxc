const { Telegraf, Markup } = require('telegraf');

// ==========================================
// ВСТАВЬ СВОЙ ТОКЕН ВНУТРИ ОДИНАРНЫХ КАВЫЧЕК:
const BOT_TOKEN = '9133573433:AAEQbkMF2X_5cFUbqC-ReDzeqIy_JExM1mU';
// ==========================================

const WEB_APP_URL = 'https://matikzxc.github.io/Shop---matikzxc/';

const bot = new Telegraf(BOT_TOKEN);

async function cleanAndSetCommands() {
  try {
    await bot.telegram.deleteMyCommands();
    await bot.telegram.deleteMyCommands({ language_code: 'ru' });
    await bot.telegram.setMyCommands([
      { command: 'start', description: 'Главное меню и магазин' },
      { command: 'terms', description: 'Условия и правила' },
      { command: 'paysupport', description: 'Помощь с оплатой' }
    ]);
    console.log('>>> [OK] Старые команды стерты! Меню очищено.');
  } catch (err) {
    console.error('Ошибка обновления команд:', err);
  }
}

// 1. КОМАНДА /start
bot.start((ctx) => {
  const welcomeText = 
`MATIKZXC SHOP — магазин водяных знаков и не только!

• Готовые watermark с вашим ником
• Озвучки и аватарки на заказ
• Доступ в приват
• Collab в TikTok со мной

Оплата: звёзды ⭐️, или карта / СБП. Готовые файлы приходят в этот чат!

📢 Канал: @biomatikzxc

Нажмите кнопку ниже, чтобы открыть магазин.
Условия: /terms · Помощь с оплатой: /paysupport`;

  return ctx.reply(welcomeText, Markup.inlineKeyboard([
    [Markup.button.webApp('🔥 Открыть магазин', WEB_APP_URL)],
    [
      Markup.button.url('📢 Канал', 'https://t.me/biomatikzxc'),
      Markup.button.url('💬 Поддержка', 'https://t.me/matikmngr')
    ]
  ]));
});

// 2. КОМАНДА /terms
bot.command('terms', (ctx) => {
  const termsText = 
`Правила и условия магазина MATIKZXC SHOP:

1. Товары — цифровые: watermark, озвучки, аватарки, доступ в приват. Все это приходит в чат бота.
2. Watermark's делаются по очереди: заказ встаёт в очередь сразу после оплаты, а созданием занимается владелец. Готовой файл придёт в этот чат, как можно быстрее. (Срок не гарантируется!)
3. Озвучки и аватарки делаются вручную или с помощью специальных инструментов, срок зависит от сложности заказа!
4. Доступ в приват — навсегда, личная ссылка работает только для вашего аккаунта. Потеряли доступ — @matikmngr.
5. Проверьте ник перед оплатой: watermark делается ровно с тем ником, который вы написали.
6. Возврат: если заказ не выполнен по моей вине или не может быть выполнен — верну оплату в кратчайшие сроки. Если товар уже выдан, то он уже возврату не подлежит.
7. Оплачивая заказ, вы соглашаетесь с моей политикой конфиденциальности!

По всем вопросам писать менеджеру: @matikmngr`;

  return ctx.reply(termsText, Markup.inlineKeyboard([
    [Markup.button.url('💬 Связаться с менеджером', 'https://t.me/matikmngr')]
  ]));
});

// 3. КОМАНДА /paysupport
bot.command('paysupport', (ctx) => {
  return ctx.reply(
    'Возникли трудности с оплатой звездами или переводом на карту?\nНапишите нашему менеджеру — вам помогут в течение нескольких минут: @matikmngr',
    Markup.inlineKeyboard([
      [Markup.button.url('💬 Написать в поддержку', 'https://t.me/matikmngr')]
    ]
  ));
});

cleanAndSetCommands().then(() => {
  bot.launch().then(() => {
    console.log('>>> [УСПЕХ] БОТ ПОЛНОСТЬЮ ЗАПУЩЕН И ОТВЕЧАЕТ НА ВСЕ КОМАНДЫ!');
  });
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
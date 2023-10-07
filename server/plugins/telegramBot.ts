import TelegramBot from 'node-telegram-bot-api';

// portfolio19_form_bot
const token = process.env.TELEGRAM_BOT_TOKEN;

let telegramBot: TelegramBot | null = null
export const sendTelegramBotMessage = (message: string) => {
    console.log('tgbot message', message)
    const chatId = process.env.TELEGRAM_CHAT_ID
    telegramBot?.sendMessage(chatId!, message);
}

export default defineNitroPlugin(() => {
    // Create a new instance of the bot.
    telegramBot = new TelegramBot(token!, { polling: true });

    // Listen for the /start command.
    telegramBot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        const message = `Your chat id is ${chatId}`;
        telegramBot?.sendMessage(chatId, message);
    });
});
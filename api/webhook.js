import crypto from 'crypto';

const BOT_TOKEN = process.env.BOT_TOKEN || '8849846358:AAH1QyRQpjS2DEh868mlrbzRrbK-QgkwYtc';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message } = req.body;
  if (!message) return res.json({ ok: true });

  const chatId = message.chat.id;
  const text = message.text || '';

  if (text.startsWith('/start')) {
    const webAppUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://certified-clo.vercel.app';

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: '✦ Welcome to Certified Clo\n\nDiscover quiet luxury — browse our collection of handpicked essentials.',
        reply_markup: {
          inline_keyboard: [[
            { text: 'Open Boutique', web_app: { url: webAppUrl } }
          ]]
        }
      })
    });
  }

  res.json({ ok: true });
}

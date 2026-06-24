import express from 'express';
import crypto from 'crypto';
import { createReadStream } from 'fs';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const BOT_TOKEN = process.env.BOT_TOKEN || '8849846358:AAH1QyRQpjS2DEh868mlrbzRrbK-QgkwYtc';
const NOTIFY_CHAT_ID = process.env.NOTIFY_CHAT_ID || '8849846358';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const distPath = join(__dirname, 'dist');

app.use(express.static(distPath));

function validateTelegramData(initData) {
  try {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    urlParams.delete('hash');
    urlParams.sort();
    const dataCheckString = Array.from(urlParams.entries())
      .map(([k, v]) => `${k}=${v}`)
      .join('\n');
    const secretKey = crypto.createHmac('sha256', 'WebAppData').update(BOT_TOKEN).digest();
    const computedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
    return computedHash === hash;
  } catch {
    return false;
  }
}

app.post('/api/webhook', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.json({ ok: true });

  const chatId = message.chat.id;
  const text = message.text || '';
  const publicUrl = process.env.PUBLIC_URL || `http://localhost:${PORT}`;

  if (text.startsWith('/start')) {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: '✦ Welcome to Certified Clo\n\nDiscover quiet luxury — browse our collection of handpicked essentials.',
        reply_markup: {
          inline_keyboard: [[
            { text: 'Open Boutique', web_app: { url: publicUrl } }
          ]]
        }
      })
    });
  }

  res.json({ ok: true });
});

app.post('/api/order', async (req, res) => {
  const { initData, order } = req.body;

  if (!validateTelegramData(initData)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const urlParams = new URLSearchParams(initData);
  const user = JSON.parse(urlParams.get('user') || '{}');

  const itemsList = order.items
    .map((i) => `• ${i.name} (${i.color}/${i.size}) × ${i.quantity} — $${i.price * i.quantity}`)
    .join('\n');

  const message = [
    `🛍 *New Order — Certified Clo*`,
    ``,
    `*Name:* ${order.name}`,
    `*Phone:* ${order.phone}`,
    `*Address:* ${order.address}`,
    `*TG:* ${user.first_name || ''} ${user.last_name || ''} @${user.username || ''}`,
    ``,
    `*Items:*`,
    itemsList,
    ``,
    `*Total:* $${order.total}`,
  ].join('\n');

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: NOTIFY_CHAT_ID, text: message, parse_mode: 'Markdown' }),
  });

  res.json({ ok: true });
});

app.get('*', async (req, res) => {
  try {
    const html = await readFile(join(distPath, 'index.html'), 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch {
    res.status(404).send('Not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

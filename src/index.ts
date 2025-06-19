import express from 'express';
import { create } from '@wppconnect-team/wppconnect';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const sessions: Record<string, any> = {};

app.post('/start-session/:sessionId', async (req, res) => {
  const { sessionId } = req.params;

  if (sessions[sessionId]) {
    return res.json({ message: 'Session already started' });
  }

  try {
    const client = await create({
      session: sessionId,
      catchQR: (base64Qrimg) => {
        console.log(`QR Code for ${sessionId}: ${base64Qrimg}`);
      },
      headless: true,
      devtools: false,
      useChrome: false,
      debug: false
    });

    sessions[sessionId] = client;
    res.json({ message: `Session ${sessionId} started` });

    client.onMessage((message: any) => {
      console.log(`[${sessionId}] Message from ${message.from}: ${message.body}`);
    });
  } catch (err) {
    console.error(`Error starting session ${sessionId}:`, err);
    res.status(500).json({ error: 'Failed to start session' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

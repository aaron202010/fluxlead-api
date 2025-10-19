export default function handler(req, res) {
  res.status(200).json({ ok: true, env: 'vercel', ts: Date.now() });
}

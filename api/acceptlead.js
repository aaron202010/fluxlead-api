export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Optional Bearer auth (recommended). Set ACCEPTLEAD_TOKEN in Vercel env.
  const expected = process.env.ACCEPTLEAD_TOKEN;
  if (expected) {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
    if (token !== expected) {
      return res.status(401).json({ error: 'unauthorized' });
    }
  }

  // Body may arrive as string; handle both.
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch {
      return res.status(400).json({ error: 'invalid json' });
    }
  }

  const envelope = body?.envelope;
  if (!envelope || typeof envelope !== 'object') {
    return res.status(400).json({ error: 'envelope missing' });
  }

  // TODO: call your real AcceptLead logic here

  return res.status(200).json({
    ok: true,
    trace_id: envelope.trace_id ?? null,
    received: envelope,
  });
}

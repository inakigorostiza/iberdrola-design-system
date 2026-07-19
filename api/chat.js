/* Vercel serverless function — Aura assistant.
   Calls the Claude Messages API with the Iberdrola knowledge base as grounding (RAG-lite).
   Requires env var ANTHROPIC_API_KEY (set it in the Vercel project settings).
   Node runtime (global fetch). No external dependencies. */

const { KB, SYSTEM_BASE, langDirective } = require("./_kb.js");

const MODEL = "claude-haiku-4-5"; // fast/low-cost; swap to "claude-opus-4-8" for max quality

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // No key configured yet — signal the client to use its offline fallback.
    res.status(503).json({ error: "no_api_key" });
    return;
  }

  try {
    var body = req.body;
    if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    body = body || {};
    var incoming = Array.isArray(body.messages) ? body.messages : [];
    var persona = body.persona || null;
    var lang = body.lang === "en" ? "en" : "es";

    // Normalize to Anthropic message shape; keep last 12; must start with a user turn.
    var msgs = incoming
      .map(function (m) {
        return {
          role: m && m.role === "assistant" ? "assistant" : "user",
          content: String((m && m.content) || "").slice(0, 4000),
        };
      })
      .filter(function (m) { return m.content; })
      .slice(-12);
    while (msgs.length && msgs[0].role !== "user") msgs.shift();
    if (!msgs.length) { res.status(400).json({ error: "empty" }); return; }

    var system = langDirective(lang) + "\n\n" + SYSTEM_BASE + "\n\n# BASE DE CONOCIMIENTO\n" + KB;
    if (persona && persona.name) {
      system +=
        "\n\n# CLIENTE ACTUAL\nEstás hablando con " + persona.name +
        (persona.segmentLabel ? " (segmento " + persona.segmentLabel + ")" : "") +
        ". Personaliza tus respuestas y propuestas para su segmento." +
        (persona.flags && persona.flags.length ? " Señales activas: " + persona.flags.join(", ") + "." : "");
    }

    var upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
        messages: msgs,
      }),
    });

    if (!upstream.ok) {
      var detail = await upstream.text();
      res.status(502).json({ error: "upstream_error", status: upstream.status, detail: detail.slice(0, 400) });
      return;
    }

    var data = await upstream.json();
    var text = (data.content || [])
      .filter(function (b) { return b.type === "text"; })
      .map(function (b) { return b.text; })
      .join("\n")
      .trim();

    res.status(200).json({ text: text, model: data.model || MODEL });
  } catch (e) {
    res.status(500).json({ error: "exception", detail: String(e).slice(0, 300) });
  }
};

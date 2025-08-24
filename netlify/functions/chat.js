// Rage-to-Polite Converter using Gemini
import { franc } from "franc-min";
import langs from "langs";


export async function handler(event) {
  try {
    const { message, tone } = JSON.parse(event.body);

    // fallback if frontend doesn't pass a tone
    const selectedTone = tone || "polite and professional";

    // Detect language from input
    const langCode = franc(message); // e.g. 'vie'
    let detectedLangName = "the same language as input";
    if (langCode !== "und") {
      const langObj = langs.where("iso639-3", langCode);
      detectedLangName = langObj ? langObj.name : detectedLangName;
    }

     const prompt = `Rewrite the following text into a ${selectedTone} email.
        The entire output must be written in ${detectedLangName}.
        Do not add explanations, options, or commentary — return only the final email text.

        "${message}"`;

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const json = await res.json();

    // Gemini response format
    const reply =
      json.candidates?.[0]?.content?.parts?.[0]?.text || "[no reply]";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}

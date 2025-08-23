<h1 align="center">Rage-to-Polite Email Converter ✉️😤→🙂</h1>

<p align="center">
  <a href="https://app.netlify.com/sites/ai-chat-app-demo-dt/deploys">
    <img src="https://api.netlify.com/api/v1/badges/a7b87ebb-6bcc-447a-9b7a-55ff93209466/deploy-status" alt="Netlify Status" />
  </a>
  <a href="https://github.com/duytin095/ai-chat-app/stargazers">
    <img src="https://img.shields.io/github/stars/duytin095/ai-chat-app?style=social" alt="GitHub Stars" />
  </a>
  <a href="https://github.com/duytin095/ai-chat-app/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/duytin095/ai-chat-app" alt="License" />
  </a>
  <a href="https://github.com/duytin095/ai-chat-app/issues">
    <img src="https://img.shields.io/github/issues/duytin095/ai-chat-app" alt="Issues" />
  </a>
</p>

<p align="center">
  A playful side project built with <strong>Vue 3</strong>, <strong>TypeScript</strong>, and <strong>Netlify Functions</strong> that takes your raw, angry rants (like “some jerk stole my ice cream from the fridge”) and magically rewrites them into diplomatic, professional emails.
</p>
<br />
<p align="center">
  Powered by <strong>Google’s Gemini API</strong>, this tool is half joke, half actually-useful — perfect for when you need to vent but still keep your job.
</p>

<hr />

<h2>✨ Features</h2>
<ul>
  <li><strong>Rage in, Politeness out</strong> – instantly transform angry input into a calm, office-ready email.</li>
  <li><strong>Automatic language detection</strong> – works with English, Vietnamese, and more.</li>
  <li><strong>Markdown formatting</strong> – responses come neatly formatted (no wall of text).</li>
  <li><strong>Copy-to-clipboard</strong> – one-click to copy the final email.</code></li>
  <li><strong>Serverless</strong> – runs on Netlify Functions, no backend server required.</li>
</ul>

<hr />

<h2>📂 Project Structure</h2>

<pre>
├── netlify/functions/chat.js     # Serverless endpoint to Gemini
├── src/
│   ├── App.vue                   # Chat UI
├── .env                          # Local environment variables
└── README.md                     # This file
</pre>

<hr />

<h2>⚡ Quick Setup</h2>

<ol>
  <li><b>Clone & install $</b>
    <pre><code>git clone https://github.com/your-username/rage-to-polite-email.git
cd rage-to-polite-email
npm install</code></pre>
  </li>

  <li><b>Set your API key locally</b>  
    Create <code>.env</code> in root:
    <pre><code>GEMINI_API_KEY=your_google_ai_studio_key</code></pre>
  </li>

  <li><b>Run everything locally</b>
    <pre><code>npx netlify dev</code></pre>
    The app will be available at <a href="http://localhost:8888">http://localhost:8888</a>  
    with the backend function at <code>/.netlify/functions/chat</code>.
  </li>

  <li><b>Deploy to Netlify</b>
    <ul>
      <li>Push your code to GitHub.</li>
      <li>In Netlify dashboard, connect the repo.</li>
      <li>Add <code>GEMINI_API_KEY</code> under <i>Site Settings → Environment variables</i>.</li>
      <li>Netlify handles build (<code>npm run build</code>) and deployment automatically.</li>
    </ul>
  </li>
</ol>

<hr />

<h2>🛠 How It Works</h2>
<ul>
  <li><code>ChatDemo.vue</code>: Captures user input, sends to the Netlify function, renders the Markdown response.</li>
  <li><code>chat.js</code>: Takes message, forwards it to Gemini (using <code>process.env.GEMINI_API_KEY</code>), returns JSON.</li>
  <li><code>markdown.ts</code>: Converts Markdown string to HTML using <code>marked.parse()</code>.</li>
</ul>

<hr />

<hr />

<h2>📌 Notes</h2>
<ul>
  <li>No persistent history — refresh equals reset.</li>
  <li>Use Gemini within free-tier limits to avoid silent failure.</li>
  <li>TypeScript may complain about <code>marked.parse()</code>; casting with <code>as string</code> silences it.</li>
</ul>

<hr />

<h2>🎯 Example</h2>
<strong>Input:</strong> <br/>
<code>
  "who the f kicked my dog"
</code>
<strong>Output:</strong> <br/>

<p>
  Subject: Inquiry Regarding an Incident

  To Whom It May Concern,

  I am writing to inquire about an incident that occurred earlier today. I understand that there may have been a situation involving my dog, and I would appreciate any information you can provide regarding what happened.

</p>

<h2>📜 License</h2>
<p>
MIT. Steal it, tweak it, just don’t come crying when your API quota disappears.  
</p>

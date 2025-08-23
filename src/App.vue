<template>
  <div class="converter-demo">
    <h2>Rage-to-Polite Converter</h2>

    <div class="grid grid-cols-2 gap-4">
      <!-- Rage input -->
      <div class="p-4 border rounded">
        <h3 class="font-bold mb-2">Your Rage</h3>
        <textarea v-model="input" placeholder="Type your angry message here..."
          class="w-full h-40 p-2 border rounded"></textarea>

        <!-- Tone selector -->
        <label class="block mt-2 text-sm font-medium">Tone</label>
        <select v-model="tone" class="w-full border rounded p-1">
          <option value="polite and professional">Polite</option>
          <option value="diplomatic">Diplomatic</option>
          <option value="overly apologetic">Overly Apologetic</option>
          <option value="comically groveling">Comically Groveling</option>
        </select>

        <button @click="convert" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Convert
        </button>
      </div>

      <!-- Polite output -->
      <div class="p-4 border rounded relative">
        <h3 class="font-bold mb-2">Polite Output</h3>
        <div v-if="output" class="prose border p-2 rounded bg-gray-50" v-html="renderMarkdown(output)"></div>
        <div v-else class="text-gray-400 italic">No output yet...</div>

        <button v-if="output" @click="copyToClipboard"
          class="absolute top-2 right-2 bg-gray-200 px-2 py-1 rounded text-sm">
          Copy
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { marked } from "marked";

const input = ref("");
const output = ref("");
const tone = ref("polite and professional");

async function convert() {
  if (!input.value.trim()) return;

  const res = await fetch("/.netlify/functions/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: input.value,
      tone: tone.value.trim(),
    }),
  });

  const data = await res.json();
  output.value = data.reply ?? "[No reply]";
}

async function copyToClipboard() {
  if (!output.value) return;
  try {
    await navigator.clipboard.writeText(output.value);
    alert("Copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy", err);
  }
}

function renderMarkdown(text: string): string {
  return marked.parse(text) as string;
}
</script>

<template>
  <Toaster />

   <div
      class="absolute inset-0 z-0"
      style="
        background-image: radial-gradient(
          circle at top center,
          rgba(70, 130, 180, 0.5),
          transparent 70%
        );
        filter: blur(80px);
        background-repeat: no-repeat;
      "
    ></div>


  <div class="md:max-w-7xl min-h-screen max-w-full mx-auto relative z-10">
    <div class="flex md:flex-row flex-col items-center md:justify-between">
      <div class="text-4xl md:p-12 font-normal text-neutral-600 dark:text-neutral-400 self-start px-4">
        Rage to
        <br class="md:hidden" />
        <FlipWords
          :words="['Polite', 'Smart', 'Courtly', 'Genteel', 'Swish', 'Urbane', 'Gentlemanlike', 'Decently', 'Civil-spoken']"
          :duration="3000" class="text-4xl !text-primary" />
        <div class=""> Email Converter</div>
      </div>
      <div class=" md:p-12 py-2 px-4 md:w-auto w-full">
        <LightDarkToggler class="w-full" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:px-12 px-4">
      <div class="p-4 border border-gray-200 dark:border-gray-700 rounded shadow-md dark:shadow-gray-800">
        <!-- Rage input -->
        <Label class="font-bold mb-2" for="message">Your Rage <v-icon name="hi-solid-fire" animation="ring"
            fill="red" /></Label>
        <Textarea id="message" v-model="input" 
          :placeholder="displayedText">
        </Textarea>

        <!-- Tone selector -->
        <Label class="mt-3 mb-2 text-sm font-medium">Tone</Label>
        <Select v-model="tone" defaultValue='banana'>
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Banana" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="tone in tones" :key="tone.value" :value="tone.value">{{ tone.label }}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <!-- <Button>Convert</Button> -->
        <RippleButton rippleColor="#ADD8E6" variant="outline" class="mt-4 w-full md:w-auto" @click="convert"> Convert </RippleButton>
      </div>

      <!-- Polite output -->
      <div class="p-4 border border-gray-200 dark:border-gray-700 rounded shadow-md dark:shadow-gray-800">
        <div class="flex items-center justify-between">
          <h3 class="font-bold mb-2">Polite Output </h3>
          <Button v-if="output" variant="outline" @click="copyToClipboard"> Copy </Button>
        </div>
        <div v-if="output" class="prose border p-2 mt-2 rounded  dark:bg-gray-800" v-html="renderMarkdown(output)"></div>
        <div v-else class="text-gray-400 italic">No output yet...</div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { marked } from "marked";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FlipWords } from "@/components/ui/flip-words";
import { Label } from "@/components/ui/label";
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
import { toast } from 'vue-sonner'
import LightDarkToggler from "./components/ui/LightDarkToggler.vue";
import { RippleButton } from "./components/ui/ripple-button";




const input = ref("");
const output = ref("");
const tone = ref("polite and professional");

const placeholders = [
  "This website sucks, who make this garbage?",
  "Some jerk ate my ice cream, its was in the fridge this morning",
  "Smoking in somewhere else bastard, I can stand with that smell every day",
  "I know that's some jerk in marketing department that stole my ice cream from the fridge",
];

const displayedText = ref("");
let currentIndex = 0;
let charIndex = 0;

function typeEffect() {
  const current = placeholders[currentIndex];
  if (charIndex < current.length) {
    displayedText.value += current[charIndex];
    charIndex++;
    setTimeout(typeEffect, 100); // typing speed
  } else {
    // pause before deleting
    setTimeout(deleteEffect, 1500);
  }
}

function deleteEffect() {
  if (charIndex > 0) {
    displayedText.value = displayedText.value.slice(0, -1);
    charIndex--;
    setTimeout(deleteEffect, 50); // delete speed
  } else {
    // move to next placeholder
    currentIndex = (currentIndex + 1) % placeholders.length;
    setTimeout(typeEffect, 500);
  }
}

onMounted(() => {
  typeEffect();
});

const tones = [
  { value: "polite and professional", label: "Polite" },
  { value: "diplomatic", label: "Diplomatic" },
  { value: "overly apologetic", label: "Overly Apologetic" },
  { value: "comically groveling", label: "Comically Groveling" },
];

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
    toast('Copied to clipboard')
  } catch (err) {
    console.error("Failed to copy", err);
  }
}

function renderMarkdown(text: string): string {
  return marked.parse(text) as string;
}
</script>

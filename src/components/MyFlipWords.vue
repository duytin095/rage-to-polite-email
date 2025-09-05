<template>
    <div class="text-4xl md:p-12 font-normal text-neutral-600 dark:text-neutral-400 self-start px-4">
        Rage to
        <br class="md:hidden" />
        <FlipWords
            :words="['Polite', 'Smart', 'Courtly', 'Genteel', 'Swish', 'Urbane', 'Gentlemanlike', 'Decently', 'Civil-spoken']"
            :duration="3000" class="text-4xl !text-primary" />
        <div class=""> Email Converter</div>
    </div>
</template>

<script setup lang="ts">
    import { FlipWords } from "@/components/ui/flip-words";
</script>
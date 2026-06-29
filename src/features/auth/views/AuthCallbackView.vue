<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const hasProviderError = computed(() => typeof route.query.error === 'string')
const heading = computed(() => (hasProviderError.value ? 'Authentication failed' : 'Invalid callback'))
const message = computed(() =>
  hasProviderError.value
    ? 'The sign-in provider rejected the request. Please start a new login attempt.'
    : 'The sign-in callback is missing the authorization details required to continue.',
)
</script>

<template>
  <section class="min-h-screen px-6 pt-32">
    <div class="mx-auto max-w-3xl">
      <p class="font-mono text-sm text-[var(--color-text-muted)]">Sign-in</p>
      <h1 class="mt-4 text-3xl font-semibold text-[var(--color-text-primary)]">
        {{ heading }}
      </h1>
      <p class="mt-4 max-w-xl text-base text-[var(--color-text-secondary)]">
        {{ message }}
      </p>
    </div>
  </section>
</template>

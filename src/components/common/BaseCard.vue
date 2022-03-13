<script lang="ts" setup>
defineProps(['noShadow']);
</script>

<template>
  <section :class="{ shadow: !noShadow }">
    <slot></slot>
  </section>
</template>

<style scoped>
.shadow {
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}
</style>

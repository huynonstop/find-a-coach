<script lang="ts" setup>
defineProps(['title', 'type']);
</script>

<template>
  <span class="badge" :class="type">
    {{ title.toUpperCase() }}
  </span>
</template>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 0.5rem;
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

.frontend {
  background-color: #3d008d;
  color: white;
}

.backend {
  background-color: #71008d;
  color: white;
}

.career {
  background-color: #8d006e;
  color: white;
}
</style>

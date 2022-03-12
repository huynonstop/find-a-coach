<script lang="ts" setup>
import CoachFilter from '@/components/coaches/CoachFilter.vue';
import { ref } from 'vue';
const coachFilter = ref({
  frontend: true,
  backend: true,
  career: true,
});
</script>

<template>
  <main class="page">
    <CoachFilter
      class="content-container filter"
      v-model:filter="coachFilter"
    ></CoachFilter>
  </main>
</template>

<style scoped>
main {
  padding: 1rem;
}
.filter {
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
</style>

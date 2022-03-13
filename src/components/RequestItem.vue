<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps(['email', 'message', 'userId']);
const emailLink = computed(() => {
  return `mailto:${props.email}`;
});
</script>

<template>
  <li>
    <div>
      From: {{ userId || 'Anonymous' }}#<a :href="emailLink">{{ email }}</a>
    </div>
    <p>{{ message }}</p>
  </li>
</template>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>

<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue';

const error = ref<String | null>(null);
onErrorCaptured((err) => {
  error.value = err.message || "Something went wrong :'\( ";
});
const confirmError = () => {
  error.value = null;
};
</script>
<template>
  <BaseDialog :show="error" title="Whoops" @close="confirmError">
    <p>{{ error }}</p>
  </BaseDialog>
  <slot></slot>
</template>

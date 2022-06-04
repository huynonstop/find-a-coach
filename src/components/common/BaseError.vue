<script setup lang="ts">
defineProps(['error']);
const emits = defineEmits(['confirmError']);
</script>
<template>
  <BaseDialog :show="!!error" title="Whoops" @close="emits('confirmError')">
    <p>{{ error }}</p>
  </BaseDialog>
</template>

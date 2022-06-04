<script setup lang="ts">
import { onErrorCaptured } from 'vue';

onErrorCaptured((err) => {
  console.log(err);
});
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <BaseHeader v-if="!route.meta?.customLayout"></BaseHeader>
    <Transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </Transition>
  </router-view>
</template>

<style>
@import '@/assets/base.css';
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>

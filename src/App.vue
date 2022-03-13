<script setup lang="ts">
import BaseErrorBoundary from './components/BaseErrorBoundary.vue';
import BaseSuspense from './components/BaseSuspense.vue';
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <BaseErrorBoundary>
      <BaseHeader v-if="!route.meta?.customLayout"></BaseHeader>
      <Transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </Transition>
    </BaseErrorBoundary>
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

<script setup lang="ts">
import BaseSuspense from './components/BaseSuspense.vue';
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <BaseHeader v-if="!route.meta?.customLayout"></BaseHeader>
    <transition name="fade" mode="out-in">
      <BaseSuspense>
        <component :is="Component"></component>
      </BaseSuspense>
    </transition>
  </router-view>
</template>

<style>
@import '@/assets/base.css';
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
}
</style>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps([
  'id',
  'firstName',
  'lastName',
  'hourlyRate',
  'areas',
  'isUser',
]);
const fullName = computed(() => {
  return `${props.firstName} ${props.lastName}`;
});
const toCoachContact = computed(() => {
  return {
    name: 'coach/contact',
    params: {
      id: props.id,
    },
  };
});
const toCoach = computed(() => {
  return {
    name: 'coach',
    params: {
      id: props.id,
    },
  };
});
</script>

<template>
  <li>
    <div class="title">
      <h2>{{ fullName }}</h2>
      <h3>${{ hourlyRate }}/hour</h3>
    </div>
    <div class="badge-group">
      <BaseBadge
        v-for="area of areas"
        :key="area"
        :type="area"
        :title="area"
      ></BaseBadge>
    </div>
    <div class="actions">
      <BaseButton
        v-if="!isUser"
        mode="outline"
        as="router-link"
        :to="toCoachContact"
        >Contact
      </BaseButton>
      <BaseButton as="router-link" :to="toCoach">Details</BaseButton>
    </div>
  </li>
</template>

<style scoped>
li {
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h2 {
  font-size: 2rem;
  font-weight: bold;
}
h3 {
  line-height: 1.5rem;
  height: 1.5rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.title {
  display: flex;
  justify-content: space-between;
}

.badge-group {
  display: flex;
  gap: 1rem;
}
</style>

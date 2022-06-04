<script setup lang="ts">
interface Props {
  filter: object;
}
interface Emits {
  (event: 'update:filter', value: object): void;
}
const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const setFilter = (e: Event) => {
  const { id, checked } = e.target as HTMLInputElement;
  emits('update:filter', {
    ...props.filter,
    [id]: checked,
  });
};
</script>

<template>
  <BaseCard>
    <h2>Find Your Coach</h2>
    <div class="filter-option-group">
      <span
        v-for="(value, option) of filter"
        :key="option"
        class="filter-option"
        :class="{ active: value }"
      >
        <input type="checkbox" :id="option" checked @change="setFilter" />
        <label :for="option"> {{ option }}</label>
      </span>
    </div>
  </BaseCard>
</template>

<style scoped>
h2 {
  color: var(--primary);
}
.filter-option-group {
  display: flex;
  gap: 1rem;
}

.filter-option {
  line-height: normal;
}

.filter-option label {
  margin-left: 0.25rem;
  text-transform: capitalize;
}

.filter-option.active label {
  color: var(--primary);
}
</style>

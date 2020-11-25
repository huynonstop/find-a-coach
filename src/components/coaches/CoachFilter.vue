<template>
  <section>
    <base-card>
      <h2>Find Your Coach</h2>
      <span v-for="(_, option) of filter" :key="option" class="filter-option">
        <input type="checkbox" :id="option" checked @change="setFilter" />
        <label :for="option"> {{ option }}</label>
      </span>
    </base-card>
  </section>
</template>

<script>
export default {
  emits: ['update:filter'],
  props: ['filter'],
  methods: {
    setFilter(event) {
      const { id, checked } = event.target;
      this.$emit('update:filter', {
        ...this.filter,
        [id]: checked,
      });
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
  text-transform: capitalize;
}

.filter-option.active label {
  font-weight: bold;
}
</style>

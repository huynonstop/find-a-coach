<template>
  <section>
    Filter
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button as="router-link" to="/register"
          >Register as coach</base-button
        >
      </div>
      <ul v-if="hasCoaches">
        <coach-item v-for="coach of coaches" :key="coach.id" v-bind="coach">
        </coach-item>
      </ul>
      <h3 v-else>No coaches founded, :'(</h3>
    </base-card>
  </section>
</template>

<script>
import CoachItem from '@/components/coaches/CoachItem.vue';
export default {
  components: {
    CoachItem,
  },
  computed: {
    coaches() {
      return this.$store.getters['coaches/coaches'];
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>

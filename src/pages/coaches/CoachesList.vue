<template>
  <coach-filter v-model:filter="activeFilter"></coach-filter>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button v-if="!isCoach" as="router-link" to="/register"
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
import CoachFilter from '../../components/coaches/CoachFilter.vue';
export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      activeFilter: { frontend: true, backend: true, career: true },
    };
  },
  computed: {
    coaches() {
      return this.$store.getters['coaches/coaches'].filter(coach => {
        for (const filter in this.activeFilter) {
          if (this.activeFilter[filter] && coach.areas.includes(filter))
            return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
  },
  methods: {
    setFilter(filter) {
      this.activeFilter = filter;
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

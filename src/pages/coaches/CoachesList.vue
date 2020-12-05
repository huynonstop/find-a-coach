<template>
  <main>
    <base-dialog :show="!!error" title="Whoops" @close="confirmError">
      <p>{{ error }}</p>
    </base-dialog>
    <coach-filter v-model:filter="activeFilter"></coach-filter>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button v-if="!isAuth" as="router-link" to="/auth?red=register"
            >Login to Register as coach</base-button
          >
          <base-button
            v-else-if="!isLoading && !isCoach"
            as="router-link"
            to="/register"
            >Register as coach</base-button
          >
        </div>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach of coaches"
            :key="coach.id"
            :isUser="userId === coach.id"
            v-bind="coach"
          >
          </coach-item>
        </ul>
        <h3 v-else>No coaches founded, :'(</h3>
      </base-card>
    </section>
  </main>
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
      isLoading: false,
      error: null,
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
    userId() {
      return this.$store.getters.userId;
    },
    isAuth() {
      return this.$store.getters.isAuth;
    },
  },
  methods: {
    setFilter(filter) {
      this.activeFilter = filter;
    },
    async loadCoaches(forceRefresh = false) {
      this.isLoading = true;
      this.error = null;
      try {
        await this.$store.dispatch('coaches/loadCoaches', { forceRefresh });
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.error = error.message || 'Something went wrong';
      }
    },
    confirmError() {
      this.error = null;
      this.isLoading = false;
    },
  },
  created() {
    this.loadCoaches();
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

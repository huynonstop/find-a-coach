<template>
  <main>
    <section>
      <base-card>
        <h2>Register a coach now!</h2>
        <coach-form @submit-data="submitCoachData"> </coach-form>
      </base-card>
    </section>
  </main>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: { CoachForm },
  methods: {
    submitCoachData(data) {
      this.$store.dispatch('coaches/registerCoach', data);
      this.$router.replace('/coaches');
    },
  },
};
</script>

<style scoped></style>

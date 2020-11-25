<template>
  <section>
    <base-card>
      <h2>{{ fullname }}</h2>
      <h3>${{ rate }}/hour</h3>
    </base-card>
    <base-card>
      <h2>Interested? Reach out now!</h2>
      <base-button as="router-link" :to="contactLink">
        Contact
      </base-button>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge
        v-for="area of areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
      <p>{{ description }}</p>
    </base-card>
  </section>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullname() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastname;
    },
    contactLink() {
      return this.$route.path + '/contact';
    },
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      c => c.id === this.id
    );
  },
};
</script>

<style scoped></style>

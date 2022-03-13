<script lang="ts" setup>
import FIREBASE_CONFIG from '@/firebase.config';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { CoachInfo } from './CoachesPage.vue';
import useUserStore from '@/store/user';
import { useError } from '@/hooks/useError';

const userStore = useUserStore();
const route = useRoute();
const { id } = route.params;
const toCoachContact = {
  name: 'coach/contact',
  params: {
    id,
  },
};
const isUser = computed(() => {
  return id === userStore.userId;
});
const coach = ref<CoachInfo | null>(null);
const isLoading = ref<boolean>(false);
const fetchCoachDetail = async () => {
  const res = await fetch(`${FIREBASE_CONFIG.DATABASE_URL}/coaches/${id}.json`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message);
  }
  const coachInfo: CoachInfo = {
    ...data,
    id,
  };
  return coachInfo;
};
const fullName = computed(() => {
  return `${coach.value?.firstName} ${coach.value?.lastName}`;
});
const [error, confirmError, setError] = useError();
onMounted(async () => {
  try {
    isLoading.value = true;
    coach.value = await fetchCoachDetail();
  } catch (err) {
    setError(err, 'Fetch coach detail failed');
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <main class="page coach-detail">
    <BaseError :error="error" @confirm-error="confirmError"></BaseError>
    <BaseSpinner v-if="isLoading"></BaseSpinner>
    <BaseCard class="content-container coach-info" v-else>
      <div class="title">
        <h2>{{ fullName }}</h2>
        <h3>${{ coach?.hourlyRate }}/hour</h3>
      </div>
      <p>{{ coach?.description }}</p>
      <div class="badges">
        <BaseBadge
          v-for="area of coach?.areas"
          :key="area"
          :type="area"
          :title="area"
        ></BaseBadge>
      </div>
    </BaseCard>
    <section class="contact" v-if="!isUser">
      <template v-if="route.name !== 'coach/contact'">
        <h4>Interested? Reach out now!</h4>
        <BaseButton as="router-link" :to="toCoachContact"> Contact </BaseButton>
      </template>
      <router-view></router-view>
    </section>
  </main>
</template>

<style scoped>
h2 {
  font-size: 2rem;
  font-weight: bold;
}
h3 {
  font-size: 1.5rem;
  line-height: 1.5rem;
  height: 1.5rem;
}
p,
h4 {
  font-size: 1.5rem;
}
.coach-detail {
  max-width: 40rem;
  margin: 2rem auto;
  align-items: center;
  gap: 2rem;
}

.coach-info {
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
}

.badges {
  display: flex;
  gap: 1rem;
}
</style>

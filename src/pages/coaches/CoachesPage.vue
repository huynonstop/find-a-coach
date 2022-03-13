<script lang="ts" setup>
import CoachFilter from '@/components/coaches/CoachFilter.vue';
import FIREBASE_CONFIG from '@/firebase.config';
import useUserStore from '@/store/user';
import { ref, onMounted, computed } from 'vue';
import CoachItem from '../../components/coaches/CoachItem.vue';
export interface CoachInfo {
  id: string;
  firstName: string;
  lastName: string;
  areas: string[];
  description: string;
  hourlyRate: number;
}
const coachFilter = ref<Record<string, boolean>>({
  frontend: true,
  backend: true,
  career: true,
});

const userStore = useUserStore();
const fetchCoaches = async () => {
  const res = await fetch(`${FIREBASE_CONFIG.DATABASE_URL}/coaches.json`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message);
  }
  const coaches: CoachInfo[] = [];
  for (const id in data) {
    const { firstName, lastName, description, hourlyRate, areas } = data[id];
    const coach: CoachInfo = {
      id,
      firstName,
      lastName,
      description,
      hourlyRate,
      areas,
    };
    coaches.push(coach);
  }
  return coaches;
};
const coaches = ref<CoachInfo[]>([]);
const isLoading = ref<boolean>(false);
const loadCoaches = async () => {
  isLoading.value = true;
  try {
    coaches.value = await fetchCoaches();
  } catch (err) {
    throw err;
  } finally {
    isLoading.value = false;
  }
};

const isCoach = computed(() => {
  return userStore.isCoach(coaches.value);
});

const filteredCoaches = computed(() => {
  return coaches.value.filter((coach) => {
    for (const key in coachFilter.value) {
      if (coachFilter.value[key] && coach.areas?.includes(key)) {
        return true;
      }
    }
    return false;
  });
});

onMounted(() => {
  loadCoaches();
});
</script>

<template>
  <main class="page">
    <CoachFilter
      class="content-container filter"
      v-model:filter="coachFilter"
    ></CoachFilter>
    <BaseCard class="content-container controls" :noShadow="true">
      <BaseButton mode="outline" @click="loadCoaches"> Refresh</BaseButton>
      <BaseButton v-if="!userStore.isAuth" as="router-link" to="/auth"
        >Login to be a coach
      </BaseButton>
      <BaseButton
        v-else-if="!isLoading && !isCoach"
        as="router-link"
        to="/coach-register"
        >Register as coach
      </BaseButton>
    </BaseCard>
    <BaseSpinner v-if="isLoading"></BaseSpinner>
    <BaseCard
      v-else-if="filteredCoaches"
      class="content-container"
      :noShadow="true"
    >
      <ul>
        <CoachItem
          v-for="coach of filteredCoaches"
          :key="coach.id"
          :is-user="userStore.isUser(coach.id)"
          v-bind="coach"
        ></CoachItem>
      </ul>
    </BaseCard>
  </main>
</template>

<style scoped>
main {
  padding: 1rem;
  gap: 2rem;
}

ul {
  list-style: none;
  max-width: 48rem;
  margin: auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.filter {
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.controls {
  max-width: 48rem;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}
</style>

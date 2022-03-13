<script lang="ts" setup>
import RequestItem from '@/components/RequestItem.vue';
import FIREBASE_CONFIG from '@/firebase.config';
import { useError } from '@/hooks/useError';
import useUserStore from '@/store/user';
import { computed, onMounted, ref } from 'vue';
import BaseError from '../components/common/BaseError.vue';
export interface RequestInfo {
  id: string;
  coachId: string;
  email: string;
  message: string;
  userId: string;
}

const requests = ref<RequestInfo[]>([]);
const userStore = useUserStore();
const { userId, token } = userStore;

const isLoading = ref(false);
const [error, confirmError, setError] = useError();

const loadRequests = async () => {
  const res = await fetch(
    `${FIREBASE_CONFIG.DATABASE_URL}/requests/${userId}.json?auth=${token}`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message);
  }
  const requests: RequestInfo[] = [];
  for (const id in data) {
    const { email, message } = data[id];
    requests.push({
      id,
      coachId: userId || '',
      email,
      message,
      userId: data[id].userId,
    });
  }
  return requests;
};
const filteredRequest = computed(() => {
  return requests.value.filter((request) => {
    return request.coachId === userId;
  });
});
onMounted(async () => {
  try {
    isLoading.value = true;
    requests.value = await loadRequests();
  } catch (err: any) {
    setError(err, 'Load requests failed');
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <main class="page">
    <BaseError :error="error" @confirmError="confirmError"></BaseError>
    <BaseCard class="content-container" :noShadow="true">
      <header>
        <h2>Request Received</h2>
      </header>
      <BaseSpinner v-if="isLoading"></BaseSpinner>
      <ul v-else-if="filteredRequest.length > 0">
        <RequestItem
          v-for="request of filteredRequest"
          :key="request.id"
          v-bind="request"
        ></RequestItem>
      </ul>
      <h3 v-else>You haven't received any requests yet!</h3>
    </BaseCard>
  </main>
</template>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>

<script lang="ts" setup>
import RequestItem from '@/components/RequestItem.vue';
import FIREBASE_CONFIG from '@/firebase.config';
import useUserStore from '@/store/user';
import { computed, onMounted, ref } from 'vue';
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
const loadRequests = async () => {
  try {
    isLoading.value = true;
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
  } catch (err) {
    throw err;
  } finally {
    isLoading.value = false;
  }
};
const filteredRequest = computed(() => {
  return requests.value.filter((request) => {
    return request.coachId === userId;
  });
});
onMounted(async () => {
  requests.value = await loadRequests();
});
</script>

<template>
  <main class="page">
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

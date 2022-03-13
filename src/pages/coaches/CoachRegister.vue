<script lang="ts" setup>
import FIREBASE_CONFIG from '@/firebase.config';
import useUserStore from '@/store/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { CoachInfo } from './CoachesPage.vue';
import CoachForm from '@/components/coaches/CoachForm.vue';
import { useError } from '@/hooks/useError';

const userStore = useUserStore();
const router = useRouter();
const { userId, token } = userStore;
const isLoading = ref(false);
const [error, confirmError, setError] = useError();
const coachRegister = async ({ id, ...coachData }: CoachInfo) => {
  try {
    isLoading.value = true;
    const res = await fetch(
      `${FIREBASE_CONFIG.DATABASE_URL}/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw Error(data.error?.message);
    }
    router.replace('/coaches');
  } catch (err: any) {
    setError(err, 'Register Failed');
  } finally {
    isLoading.value = true;
  }
};
</script>
<template>
  <main class="page coach-register">
    <BaseError :error="error" @confirm-error="confirmError"></BaseError>
    <BaseCard class="content-container register-group">
      <h2>Register to be a coach now!</h2>
      <CoachForm @submit-data="coachRegister"> </CoachForm>
    </BaseCard>
  </main>
</template>

<style scoped>
.coach-register {
  margin-top: 2rem;
}
.register-group {
  max-width: 40rem;
}
h2 {
  font-weight: bold;
}
</style>

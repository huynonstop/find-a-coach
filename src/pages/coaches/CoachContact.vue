<script lang="ts" setup>
import FIREBASE_CONFIG from '@/firebase.config';
import useUserStore from '@/store/user';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const message = ref('');
const isValid = ref(true);
const isLoading = ref(false);

const submitForm = async () => {
  try {
    isValid.value = true;
    if (!email.value || !email.value.includes('@') || !message.value) {
      isValid.value = false;
      return;
    }
    isLoading.value = true;
    const coachId = route.params.id;
    const { userId } = userStore;
    const res = await fetch(
      `${FIREBASE_CONFIG.DATABASE_URL}/requests/${coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify({
          userId,
          email: email.value,
          message: message.value,
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error.message);
    }
    router.replace({ name: 'coach', params: { id: coachId } });
  } catch (err) {
    throw err;
  } finally {
    isLoading.value = false;
  }
};
</script>
<template lang="">
  <div>
    <BaseSpinner v-if="isLoading"></BaseSpinner>
    <form @submit.prevent="submitForm" v-else>
      <div class="form-control">
        <label for="email">Your E-Mail</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="message"> Message</label>
        <textarea rows="5" id="message" v-model.trim="message"></textarea>
      </div>
      <p class="errors" v-if="!isValid">
        Check your input and re-submit the form
      </p>
      <p class="errors" v-else-if="error">
        {{ error }}
      </p>
      <div class="actions">
        <BaseButton>Send Message</BaseButton>
      </div>
    </form>
  </div>
</template>
<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>

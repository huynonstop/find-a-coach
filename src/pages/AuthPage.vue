<script setup lang="ts">
import FIREBASE_CONFIG, { AUTH_MODE } from '@/firebase.config';
import useUserStore from '@/store/auth';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const mode: Record<string, string> = {
  login: 'signup',
  signup: 'login',
};

const email = ref('');
const password = ref('');
const formIsValid = ref(true);
const currentMode = ref('login');
const isLoading = ref(false);

const submitButtonCap = computed(() => {
  return currentMode.value;
});
const switchButtonCap = computed(() => {
  return mode[currentMode.value];
});

const getAuthMode = () => {
  if (currentMode.value === 'login') {
    return AUTH_MODE.LOGIN;
  }
  if (currentMode.value === 'signup') {
    return AUTH_MODE.SIGNUP;
  }
  return AUTH_MODE.LOGIN;
};
const clearForm = () => {
  email.value = '';
  password.value = '';
};
const switchMode = () => {
  currentMode.value = mode[currentMode.value];
};

const setFormValid = () => {
  formIsValid.value = true;
  if (!email.value || !email.value.includes('@') || password.value.length < 6) {
    formIsValid.value = false;
  }
};
const submitForm = async () => {
  setFormValid();
  if (!formIsValid.value) {
    return;
  }
  isLoading.value = true;
  const authMode = getAuthMode();
  const url = FIREBASE_CONFIG.authGoogleAPI(authMode);

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        returnSecureToken: true,
      }),
    });

    const { idToken, localId, expiresIn, error } = await res.json();
    if (!res.ok) {
      throw new Error(error?.message || '');
    }
    if (authMode === AUTH_MODE.LOGIN) {
      const expiresAt = new Date().getTime() + +expiresIn * 3600;
      localStorage.setItem(
        'user',
        JSON.stringify({
          token: idToken,
          userId: localId,
          expiresAt,
        })
      );
      userStore.setUser({
        token: idToken,
        userId: localId,
      });
      userStore.setAuthTimeout(
        setTimeout(() => {
          userStore.logout();
          router.replace('/coaches');
        }, +expiresIn * 3600)
      );
      router.replace('/coaches');
    }
    if (authMode === AUTH_MODE.SIGNUP) {
      currentMode.value = mode[currentMode.value];
    }
  } catch (err: any) {
    formIsValid.value = false;
    throw err;
  } finally {
    isLoading.value = false;
    clearForm();
  }
};
</script>

<template>
  <main class="page">
    <BaseDialog :fixed="true" :show="isLoading" title="Authenticating...">
      <BaseSpinner></BaseSpinner>
    </BaseDialog>
    <BaseCard class="content-container form-group">
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p class="errors" v-if="!formIsValid">
          Please enter a valid email and password
        </p>
        <div class="button-group">
          <BaseButton type="button" mode="flat" @click="switchMode">{{
            switchButtonCap
          }}</BaseButton>
          <BaseButton>{{ submitButtonCap }}</BaseButton>
        </div>
      </form>
    </BaseCard>
  </main>
</template>
<style scoped>
main {
  padding: 4rem;
}
.form-group {
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  width: 60%;
  display: flex;
  flex-direction: column;
  margin: 2rem;
  gap: 1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

label {
  font-weight: bold;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.25rem;
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

button {
  text-transform: capitalize;
  min-width: 6rem;
}
</style>

<script setup lang="ts">
import useUserStore from '@/store/auth';
import { RouterLink, useRouter } from 'vue-router';
import BaseButton from './BaseButton.vue';

const userStore = useUserStore();
const router = useRouter();
const logout = () => {
  if (userStore.isAuth) {
    userStore.logout();
    router.replace('/coaches');
  }
};
</script>

<template>
  <header>
    <nav>
      <h1><RouterLink to="/">Find Coaches</RouterLink></h1>
      <ul>
        <li><RouterLink to="/coaches">All Coaches</RouterLink></li>
        <template v-if="userStore.isAuth">
          <li>
            <RouterLink to="/requests">Requests</RouterLink>
          </li>
          <li>
            <BaseButton @click="logout">Logout</BaseButton>
          </li>
        </template>
        <template v-else>
          <li><RouterLink to="/auth">Getting started</RouterLink></li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}

button {
  background: white;
  color: #3a0061;
}
button:hover {
  background: #3a0061;
  color: white;
}
</style>

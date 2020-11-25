<template>
  <base-header></base-header>
  <main>
    <router-view />
  </main>
</template>
<script>
import BaseHeader from './components/layout/BaseHeader';
export default {
  components: {
    BaseHeader,
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

main {
  max-width: min(1440px, 80%);
  margin: 0 auto;
}

button {
  outline: none;
}
</style>

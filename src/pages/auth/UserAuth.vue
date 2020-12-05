<template>
  <main>
    <base-dialog
      :show="!isLoading && !!error"
      title="Whoops"
      @close="confirmError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog fixed :show="isLoading" title="Authenticating...">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card @submit.prevent="submitForm">
      <form>
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
        <base-button>{{ submitButtonCap }}</base-button>
        <base-button type="button" mode="flat" @click="switchMode">{{
          switchButtonCap
        }}</base-button>
      </form>
    </base-card>
  </main>
</template>

<script>
const mode = {
  login: 'signup',
  signup: 'login',
};
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCap() {
      return this.mode;
    },
    switchButtonCap() {
      return mode[this.mode];
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      this.error = null;
      try {
        await this.$store.dispatch(this.mode, {
          email: this.email,
          password: this.password,
        });
        if (this.mode === 'login') {
          const redirectUrl = this.$route.query.red || 'coaches';
          this.$router.replace('/' + redirectUrl);
        }
        if (this.mode === 'signup') this.mode = 'login';
      } catch (error) {
        this.error =
          error.message ||
          `Failed to authenticate, Please check your ${this.mode} data`;
      } finally {
        this.isLoading = false;
        this.clearForm();
      }
    },
    clearForm() {
      this.email = '';
      this.password = '';
    },
    switchMode() {
      this.mode = mode[this.mode];
    },
    confirmError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
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

button {
  text-transform: capitalize;
}
</style>

<template>
  <main>
    <base-spinner v-if="isLoading"></base-spinner>
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
        <base-button>Send Message</base-button>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',
      isValid: true,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async submitForm() {
      this.isValid = true;
      this.error = null;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.message === ''
      ) {
        this.isValid = false;
        return;
      }
      this.isLoading = true;
      try {
        const coachId = this.$route.params.id;
        await this.$store.dispatch('requests/contactCoach', {
          email: this.email,
          message: this.message,
          coachId,
        });
        this.$router.replace('/coaches/' + coachId);
      } catch (error) {
        this.error = error.message || 'Something went wrong';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

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

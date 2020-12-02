<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">Firstname</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstName.val"
        @blur="clearValidate('firstName')"
      />
      <p v-if="!firstName.isValid">Firstname must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Lastname</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastName.val"
        @blur="clearValidate('lastName')"
      />
      <p v-if="!lastName.isValid">Lastname must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearValidate('description')"
      ></textarea>
      <p v-if="!description.isValid">Description must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        id="rate"
        rows="5"
        type="number"
        v-model.number="rate.val"
        @blur="clearValidate('rate')"
      />
      <p v-if="!rate.isValid">Rate must be greater than 0</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Area:</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
          @blur="clearValidate('areas')"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"
          @blur="clearValidate('areas')"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.val"
          @blur="clearValidate('areas')"
        />
        <label for="career">Career Advisor</label>
      </div>
      <p v-if="!areas.isValid">Must select 1 area</p>
    </div>
    <p v-if="!isFormValid">Please fix your inputs and submit again</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['submit-data'],
  data() {
    return {
      firstName: {
        val: '',
        isValid: true,
      },
      lastName: {
        val: '',
        isValid: true,
      },
      description: {
        val: '',
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      isFormValid: true,
    };
  },
  methods: {
    clearValidate(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.isFormValid = true;
      if (!this.firstName.val) {
        this.firstName.isValid = false;
        this.isFormValid = false;
      }
      if (!this.lastName.val) {
        this.lastName.isValid = false;
        this.isFormValid = false;
      }
      if (!this.description.val) {
        this.description.isValid = false;
        this.isFormValid = false;
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.isFormValid = false;
      }
      if (!this.areas.val.length) {
        this.areas.isValid = false;
        this.isFormValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.isFormValid) {
        return;
      }
      const { firstName, lastName, description, rate, areas } = this;
      const formData = {
        firstName: firstName.val,
        lastName: lastName.val,
        description: description.val,
        hourlyRate: rate.val,
        areas: areas.val,
      };
      this.$emit('submit-data', formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>

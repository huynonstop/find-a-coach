<script setup lang="ts">
import { reactive, ref } from 'vue';
import BaseMultiCheckbox from '../BaseMultiCheckbox.vue';

const emits = defineEmits(['submit-data']);
const formData = reactive<Record<string, any>>({
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
});
const isFormValid = ref(true);

const setValidation = (target: string, value: boolean) => {
  formData[target].isValid = value;
};
const validateForm = () => {
  isFormValid.value = true;
  if (!formData.firstName.val) {
    formData.firstName.isValid = false;
    isFormValid.value = false;
  }
  if (!formData.lastName.val) {
    formData.lastName.isValid = false;
    isFormValid.value = false;
  }
  if (!formData.description.val) {
    formData.description.isValid = false;
    isFormValid.value = false;
  }
  if (!formData.rate.val || formData.rate.val < 0) {
    formData.rate.isValid = false;
    isFormValid.value = false;
  }
  if (!formData.areas.val.length) {
    formData.areas.isValid = false;
    isFormValid.value = false;
  }
};
const submitForm = () => {
  validateForm();
  if (!isFormValid.value) {
    return;
  }
  const data = {
    firstName: formData.firstName.val,
    lastName: formData.lastName.val,
    description: formData.description.val,
    hourlyRate: formData.rate.val,
    areas: formData.areas.val,
  };
  emits('submit-data', data);
};
</script>
<template>
  <form @submit.prevent="submitForm">
    <BaseInput
      is="input"
      type="text"
      v-model:value="formData.firstName.val"
      v-model:valid="formData.firstName.isValid"
      field="firstName"
      label="First name"
      error="First name must not be empty"
    ></BaseInput>
    <BaseInput
      is="input"
      type="text"
      v-model:value="formData.lastName.val"
      v-model:valid="formData.lastName.isValid"
      field="lastName"
      label="Last name"
      error="Last name must not be empty"
    ></BaseInput>
    <BaseInput
      is="textarea"
      rows="5"
      v-model:value="formData.description.val"
      v-model:valid="formData.description.isValid"
      field="description"
      label="Description"
      error="Description must not be empty"
    ></BaseInput>
    <BaseInput
      is="input"
      type="number"
      v-model:value="formData.rate.val"
      v-model:valid="formData.rate.isValid"
      field="rate"
      label="Hourly Rate"
      error="Rate must be greater than 0"
    ></BaseInput>
    <BaseMultiCheckbox
      v-model:value="formData.areas.val"
      v-model:valid="formData.areas.isValid"
      :fields="['frontend', 'backend', 'career']"
      :labels="[
        'Frontend Development',
        'Backend Development',
        'Career Advisor',
      ]"
      title="Coaching area:"
      error="Must select 1 area"
    >
    </BaseMultiCheckbox>
    <p v-if="!isFormValid">Please fix your inputs and submit again</p>
    <BaseButton>Register</BaseButton>
  </form>
</template>

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

.invalid label,
.invalid p,
.invalid h3 {
  color: red;
}
</style>

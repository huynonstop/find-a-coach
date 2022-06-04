<script lang="ts" setup>
const props = defineProps([
  'value',
  'valid',
  'rows',
  'field',
  'label',
  'is',
  'type',
  'error',
]);
const emits = defineEmits(['update:value', 'update:valid', 'setValid']);
type Target = HTMLInputElement | HTMLTextAreaElement;
</script>
<template>
  <div class="form-control" :class="{ invalid: !valid }">
    <label for="field">{{ label }}</label>
    <component
      :is="is"
      :type="type"
      :id="field"
      :rows="rows"
      :value="value"
      @change="emits('update:value', ($event.target as Target).value)"
      @blur="emits('update:valid', true)"
    />
    <p v-if="!valid">{{ error }}</p>
  </div>
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

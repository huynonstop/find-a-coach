<script lang="ts" setup>
import { useModel } from '@/hooks/useModel';

const props = defineProps([
  'value',
  'valid',
  'fields',
  'labels',
  'error',
  'title',
]);
const emits = defineEmits(['update:value', 'update:valid', 'setValid']);
const val: any = useModel(props, emits, 'value');
</script>
<template>
  <div class="form-control" :class="{ invalid: !valid }">
    <h3>{{ title }}</h3>
    <div v-for="(field, index) of fields">
      <input
        type="checkbox"
        :id="field"
        :value="field"
        v-model="val"
        @blur="emits('update:valid', true)"
      />
      <label for="frontend">{{ labels[index] }}</label>
    </div>
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

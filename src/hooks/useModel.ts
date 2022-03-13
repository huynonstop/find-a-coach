import { computed } from 'vue';
export const useModel = (props: any, emits: any, name = 'modelValue') => {
  return computed({
    get() {
      return props[name];
    },
    set(value) {
      emits(`update:${name}`, value);
    },
  });
};

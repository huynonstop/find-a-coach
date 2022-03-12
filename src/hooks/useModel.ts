import { computed } from 'vue';
export const useModel = (props: any, emit: any, name = 'modelValue') => {
  return computed({
    get: () => props[name],
    set: (value) => emit(`update:${name}`, value),
  });
};

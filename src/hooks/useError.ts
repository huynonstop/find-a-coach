import { ref, type Ref } from 'vue';

type SetError = (arg0: any, arg1: string) => void;

export const useError = (): [Ref<string | null>, () => void, SetError] => {
  const error = ref<string | null>(null);
  const confirmError = () => {
    error.value = null;
  };
  const setError = (err: any, defaultMessage: string) => {
    error.value = err.message || defaultMessage;
  };
  return [error, confirmError, setError];
};

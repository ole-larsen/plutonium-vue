import { ref } from "vue";

const isDev = import.meta.env.DEV;

export default function useConfig() {
  return {
    isDev,
  };
}

import { createContext, useContext } from '@/config/hooks/core/useContext';

const key = Symbol();

export function createFormContext(context) {
  return createContext(context, key);
}

export function useFormContext() {
  return useContext(key);
}

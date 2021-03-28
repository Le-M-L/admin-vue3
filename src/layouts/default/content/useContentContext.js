// @ts-nocheck
import { createContext, useContext } from '@/config/hooks/core/useContext';

const key = Symbol();

export function createContentContext(context) {
  return createContext(context, key, { native: true });
}

export function useContentContext() {
  return useContext(key);
}

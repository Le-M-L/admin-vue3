<template>
  <transition name="fade-bottom" mode="out-in">
    <LockPage v-if="getIsLock" />
  </transition>
</template>
<script>
  import { defineComponent, computed } from 'vue';
  import LockPage from './LockPage.vue';

  import { useStore } from 'vuex';
  export default defineComponent({
    name: 'Lock',
    components: { LockPage },
    setup() {
      const store = useStore();
      const getIsLock = computed(() => {
        const { isLock } = store.getters['lock/getLockInfo'];
        return isLock;
      });

      return { getIsLock };
    },
  });
</script>

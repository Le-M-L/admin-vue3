<template>
  <a-dropdown :trigger="trigger" v-bind="$attrs">
    <span>
      <slot></slot>
    </span>
    <template #overlay>
      <a-menu :selectedKeys="selectedKeys">
        <template v-for="item in getMenuList" :key="`${item.event}`">
          <a-menu-item
            v-bind="getAttr(item.event)"
            @click="handleClickMenu(item)"
            :disabled="item.disabled"
          >
            <component v-if="item.icon" :is="item.icon" />
            <span class="ml-1">{{ item.text }}</span>
          </a-menu-item>
          <a-menu-divider v-if="item.divider" :key="`d-${item.event}`" />
        </template>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>
  import { defineComponent, computed, unref } from 'vue';
  import { Dropdown, Menu } from 'ant-design-vue';

  export default defineComponent({
    name: 'BasicDropdown',
    components: {
      [Dropdown.name]: Dropdown,
      [Menu.name]: Menu,
      [Menu.Item.name]: Menu.Item,
      [Menu.Divider.name]: Menu.Divider,
    },
    props: {
      /**
       * the trigger mode which executes the drop-down action
       * @default ['hover']
       * @type string[]
       */
      trigger: {
        type: [Array],
        default: () => {
          return ['contextmenu'];
        },
      },
      dropMenuList: {
        type: Array,
        default: () => [],
      },
      selectedKeys: {
        type: Array,
        default: () => [],
      },
    },
    emits: ['menuEvent'],
    setup(props, { emit }) {
      const getMenuList = computed(() => props.dropMenuList);

      function handleClickMenu(item) {
        const { event } = item;
        const menu = unref(getMenuList).find((item) => `${item.event}` === `${event}`);
        emit('menuEvent', menu);
        item.onClick?.();
      }

      return {
        handleClickMenu,
        getMenuList,
        getAttr: (key) => ({ key }),
      };
    },
  });
</script>

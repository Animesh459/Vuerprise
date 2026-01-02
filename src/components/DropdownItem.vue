<script setup>
import Dropdown from './Dropdown.vue';
import DropdownItem from './DropdownItem.vue'; // Self-import for recursion
import { ChevronRight } from 'lucide-vue-next';
import { RouterLink } from 'vue-router'; // <-- Import RouterLink

defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const getLinkComponent = (item) => {

  if (item.to) {
    return RouterLink;
  }
  return 'a';
};

const getLinkProps = (item) => {
  if (item.to) {
    return { to: item.to };
  }
  return { href: item.href || '#' };
};

</script>

<template>
  <div v-if="!item.children">
    <component
        :is="getLinkComponent(item)"
        v-bind="getLinkProps(item)"
        class="flex items-center gap-3 px-4 py-2.5 text-sm text-black hover:text-black hover:bg-zinc-50 transition-colors duration-150 group"
    >
      {{ item.label }}
    </component>
  </div>

  <div v-else class="">
    <Dropdown isSubmenu alignSubmenuToParentTop>
      <template #trigger>
        <div
            class="flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-black hover:text-black hover:bg-zinc-50 transition-colors duration-150 group cursor-pointer w-full"
        >
          <span>{{ item.label }}</span>
          <ChevronRight :size="16" class="text-black group-hover:text-black transition-colors"/>
        </div>
      </template>

      <template #content>
        <DropdownItem
            v-for="child in item.children"
            :key="child.label"
            :item="child"
        />
      </template>
    </Dropdown>
  </div>
</template>
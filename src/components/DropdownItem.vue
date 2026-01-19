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
        class="flex items-center gap-3 px-4 py-2 text-sm text-zinc-500 hover:text-zinc-500 hover:bg-gray-100 transition-colors duration-150 group"
    >
      {{ item.label }}
    </component>
  </div>

  <div v-else class="relative group/item">
    <!-- Clickable Category Link -->
    <component
        :is="getLinkComponent(item)"
        v-bind="getLinkProps(item)"
        class="flex items-center justify-between gap-3 px-4 py-2 text-sm text-zinc-500 hover:text-zinc-500 hover:bg-gray-100 transition-colors duration-150 cursor-pointer w-full"
    >
      <span>{{ item.label }}</span>
      <ChevronRight :size="16" class="text-zinc-500 transition-colors"/>
    </component>
    
    <!-- Submenu (appears on hover) -->
    <div class="absolute left-full top-0 ml-0 hidden group-hover/item:block z-50">
      <div class="bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[200px]">
        <DropdownItem
            v-for="child in item.children"
            :key="child.label"
            :item="child"
        />
      </div>
    </div>
  </div>
</template>
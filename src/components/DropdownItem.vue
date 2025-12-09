<script setup>
import Dropdown from './Dropdown.vue';
import { ChevronRight } from 'lucide-vue-next';

defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div v-if="!item.children">
    <a
        :href="item.href || '#'"
        class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150 group"
    >
      {{ item.label }}
    </a>
  </div>

  <div v-else>
    <Dropdown isSubmenu>
      <template #trigger>
        <div
            class="flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150 group cursor-pointer w-full"
        >
          <span>{{ item.label }}</span>
          <ChevronRight :size="16" class="text-slate-500 group-hover:text-white transition-colors"/>
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
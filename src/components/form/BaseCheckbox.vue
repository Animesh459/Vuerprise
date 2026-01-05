<template>
  <label class="flex items-center gap-2 cursor-pointer group">
    <div class="relative flex items-center">
      <input
          type="checkbox"
          :checked="modelValue"
          @change="$emit('update:modelValue', $event.target.checked)"
          :class="[
          'relative h-4 w-4 appearance-none border border-black/20 bg-white/50 rounded-sm cursor-pointer transition-all',
          'checked:bg-black checked:border-black',
          'after:content-[\'✓\'] after:absolute after:inset-0 after:flex after:items-center after:justify-center',
          'after:text-[10px] after:text-white after:font-bold after:opacity-0 checked:after:opacity-100',
          customClass
        ]"
      />
    </div>
    <span v-if="label" class="text-sm font-medium text-gray-700 select-none">
      {{ label }}
    </span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  customClass: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue']);
</script>
<template>
  <div :class="{'w-full': !isInline}" class="relative">
    <label
        v-if="label"
        class="block text-sm font-medium text-gray-700 mb-2"
    >
      {{ label }}
    </label>

    <div class="relative">
      <select
          :value="modelValue"
          @change="$emit('update:modelValue', $event.target.value)"
          :class="[
          'h-9 w-full appearance-none border border-neutral-200 bg-neutral-50 pl-4 pr-10 text-sm transition-colors',
          'text-black focus:border-black focus:outline-none cursor-pointer',
          customClass
        ]"
      >
        <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>

        <option
            v-for="option in options"
            :key="option.value || option"
            :value="option.value || option"
        >
          {{ option.label || option }}
        </option>

        <slot />
      </select>

      <div class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
  label: { type: String, default: '' },
  placeholder: { type: String, default: 'Select an option' },
  customClass: { type: String, default: '' },
  isInline: { type: Boolean, default: false },
  options: {
    type: Array,
    default: () => [] // Format: [{label: 'Vendor A', value: 'a'}] or ['Vendor A', 'Vendor B']
  }
});

defineEmits(['update:modelValue']);
</script>
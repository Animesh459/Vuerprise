<template>

  <div  :class="{'w-full': !isInline}">
    <label
        v-if="label"
        class="block text-sm font-medium text-gray-700 mb-2"
    >
      {{ label }}
    </label>
    <input
        type="text"
        :placeholder="placeholder"
        :class="[
        'h-9 w-full border border-neutral-200 bg-neutral-50 pl-4 pr-4 text-sm transition-colors',
        'placeholder:text-neutral-300 text-black focus:border-black focus:outline-none',
        customClass
      ]"
    />
  </div>


</template>

<script setup>

defineProps({
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Enter text...'
  },
  customClass: {
    type: String,
    default: ''
  },
  isInline: { type: Boolean, default: false },
});
</script>
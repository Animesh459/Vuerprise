<template>

  <div  :class="{'w-full': !isInline}">
    <label
        v-if="label"
        class="block text-sm font-medium text-gray-700 mb-2"
    >
      {{ label }}
    </label>
    <textarea
        type="text"
        :placeholder="placeholder"
        :class="[
        'min-h-[150px] w-full border border-neutral-200 bg-neutral-50 p-4 text-sm transition-colors resize-none',
        'placeholder:text-neutral-300 text-black focus:border-black focus:outline-none',
        customClass
      ]"
    ></textarea>
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
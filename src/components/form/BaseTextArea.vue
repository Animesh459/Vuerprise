<template>
  <div :class="{'w-full': !isInline}">
    <label
        v-if="label"
        class="block text-sm font-medium text-gray-700 mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <textarea
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :rows="rows"
        :class="[
        'min-h-[100px] rounded-xl w-full border border-border bg-white p-4 text-sm transition-colors resize-none',
        'placeholder:text-neutral-300 text-black focus:border-blue-600 focus:outline-none',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        error ? 'border-red-500' : '',
        customClass
      ]"
    ></textarea>
    <small v-if="error" class="text-red-500 text-xs mt-1 block">{{ error }}</small>
  </div>
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
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
  isInline: { 
    type: Boolean, 
    default: false 
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  rows: {
    type: [String, Number],
    default: 4
  }
});

defineEmits(['update:modelValue']);
</script>
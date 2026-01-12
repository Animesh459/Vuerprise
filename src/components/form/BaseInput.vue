<template>
  <div :class="{'w-full': !isInline}">
    <label
        v-if="label"
        class="block text-sm font-medium text-gray-700 mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :min="min"
        :max="max"
        :step="step"
        :class="[
        'h-9 w-full border border-neutral-200 bg-neutral-50 pl-4 pr-4 text-sm transition-colors',
        'placeholder:text-neutral-300 text-black focus:border-black focus:outline-none',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        error ? 'border-red-500' : '',
        customClass
      ]"
    />
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
  type: {
    type: String,
    default: 'text'
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
  min: {
    type: [String, Number],
    default: undefined
  },
  max: {
    type: [String, Number],
    default: undefined
  },
  step: {
    type: [String, Number],
    default: undefined
  }
});

defineEmits(['update:modelValue']);
</script>
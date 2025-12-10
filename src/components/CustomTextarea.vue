<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-400 mb-1">
      {{ label }}
    </label>
    <textarea
        :id="id"
        :rows="rows"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full px-4 py-3 border rounded-lg shadow-sm
             bg-[#10161F] border-gray-700 text-white
             placeholder-gray-500
             focus:outline-none

             focus:border-gray-800
             shadow-none hover:shadow-md hover:shadow-gray-800/50

             transition duration-200 ease-in-out resize-y"
        :placeholder="placeholder"
        :required="required"
    ></textarea>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  rows: { type: [String, Number], default: 4 }, // Number of rows to display by default
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false }
});

defineEmits(['update:modelValue']);
</script>
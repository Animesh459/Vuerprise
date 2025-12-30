<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-400 mb-1">
      {{ label }}
    </label>
    <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full bg-gray-950/80 border border-slate-800 rounded-md px-4 py-3 text-sm focus:border-cyan-500/50 transition-all outline-none"
        :placeholder="placeholder"
        :required="required"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' }, // Allows text, email, password, etc.
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false }
});

defineEmits(['update:modelValue']);
</script>


location /demo-site/ {
alias /var/www/html/demo-site/;
try_files $uri $uri/ /demo-site/index.html;
}
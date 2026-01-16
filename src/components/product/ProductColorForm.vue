<template>
  <form @submit.prevent="submit" class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Master Color Selection -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Master Color <span class="text-red-500">*</span>
      </label>
      <select
        v-model="colorForm.master_color_id"
        @change="onMasterColorChange"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">-- Select Master Color --</option>
        <option
          v-for="masterColor in masterColors"
          :key="masterColor.id"
          :value="masterColor.id"
        >
          {{ masterColor.name }}
        </option>
      </select>
      <small v-if="errors.master_color_id" class="text-red-500 block mt-1">{{ errors.master_color_id[0] }}</small>
    </div>

    <!-- Color Name -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Color Name <span class="text-red-500">*</span>
      </label>
      <input
        v-model="colorForm.name"
        type="text"
        placeholder="e.g., Dark Blue, Light Green"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <small v-if="errors.name" class="text-red-500 block mt-1">{{ errors.name[0] }}</small>
    </div>

    <!-- Color Code -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Color Code <span class="text-red-500">*</span>
      </label>
      <div class="flex gap-2">
        <input
          v-model="colorForm.color_code"
          type="text"
          placeholder="#000000"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          v-model="colorForm.color_code"
          type="color"
          class="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
        />
      </div>
      <small v-if="errors.color_code" class="text-red-500 block mt-1">{{ errors.color_code[0] }}</small>
    </div>

    <!-- Color Image Upload -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Color Image
      </label>
      <div class="flex gap-2 items-start">
        <input
          ref="imageInput"
          type="file"
          accept="image/*"
          @change="onImageSelect"
          class="hidden"
        />
        <button
          type="button"
          @click="imageInput.click()"
          class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          Choose Image
        </button>
        
        <!-- Image Preview -->
        <div v-if="imagePreview" class="relative">
          <img
            :src="imagePreview"
            alt="Color preview"
            class="w-16 h-16 object-cover rounded border border-gray-300"
          />
          <button
            type="button"
            @click="removeImage"
            class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
          >
            ×
          </button>
        </div>
        
        <span v-if="selectedFileName" class="text-sm text-gray-600 self-center">
          {{ selectedFileName }}
        </span>
      </div>
      <small v-if="errors.image" class="text-red-500 block mt-1">{{ errors.image[0] }}</small>
    </div>

    <!-- Action Buttons -->
    <div class="md:col-span-2 flex gap-2 justify-end">
      <button
        type="button"
        @click="emit('cancel')"
        class="btn-secondary-new"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading"
        class="btn-primary-new"
      >
        {{ loading ? 'Adding...' : 'Add Color' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/utils/axios';
import { useToast } from '@/composables/useToast';

const emit = defineEmits(['color-added', 'cancel']);
const { success, error } = useToast();

const masterColors = ref([]);
const colorForm = ref({
  master_color_id: '',
  name: '',
  color_code: '#000000',
  image: null,
});
const errors = ref({});
const loading = ref(false);
const imagePreview = ref('');
const selectedFileName = ref('');
const imageInput = ref(null);

const fetchMasterColors = async () => {
  try {
    const response = await apiClient.get('/master-colors');
    masterColors.value = response.data.data || [];
  } catch (err) {
    console.error('Failed to fetch master colors:', err);
  }
};

const onMasterColorChange = () => {
  const selectedMaster = masterColors.value.find(mc => mc.id == colorForm.value.master_color_id);
  if (selectedMaster) {
    // Auto-fill code if available
    if (selectedMaster.color_code && !colorForm.value.color_code) {
      colorForm.value.color_code = selectedMaster.color_code;
    }
  }
};

const onImageSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Validate file size (max 1MB)
    if (file.size > 1024 * 1024) {
      error('Image size must be less than 1MB');
      return;
    }

    colorForm.value.image = file;
    selectedFileName.value = file.name;
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  colorForm.value.image = null;
  imagePreview.value = '';
  selectedFileName.value = '';
  if (imageInput.value) {
    imageInput.value.value = '';
  }
};

const submit = async () => {
  errors.value = {};
  loading.value = true;

  try {
    const formData = new FormData();
    formData.append('master_color_id', colorForm.value.master_color_id);
    formData.append('name', colorForm.value.name);
    formData.append('color_code', colorForm.value.color_code);
    formData.append('status', 1); // Always active when added from product form
    
    if (colorForm.value.image) {
      formData.append('image', colorForm.value.image);
    }

    const response = await apiClient.post('/colors', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    success('Color added successfully!');
    emit('color-added', response.data.data);
    resetForm();
  } catch (err) {
    if (err.response?.data?.errors) {
      errors.value = err.response.data.errors;
    } else {
      error('Failed to add color');
    }
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  colorForm.value = {
    master_color_id: '',
    name: '',
    color_code: '#000000',
    image: null,
  };
  imagePreview.value = '';
  selectedFileName.value = '';
  errors.value = {};
  if (imageInput.value) {
    imageInput.value.value = '';
  }
};

onMounted(() => {
  fetchMasterColors();
});
</script>

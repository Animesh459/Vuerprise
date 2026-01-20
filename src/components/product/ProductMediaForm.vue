<template>
  <div class="common-card-new">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
        <ImageIcon class="w-6 h-6 text-pink-600" />
      </div>
      <div>
        <h3 class="text-lg font-bold text-gray-900">Media Management</h3>
        <p class="text-sm text-gray-600">Upload and manage product images and videos</p>
      </div>
    </div>

    <!-- Upload Area -->
    <div
      ref="dropzone"
      class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6 hover:border-blue-400 transition cursor-pointer bg-gray-50"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
      :class="{ 'border-blue-500 bg-blue-50': isDragging }"
    >
      <div class="flex flex-col items-center justify-center gap-3">
        <UploadIcon class="w-12 h-12 text-gray-400" />
        <div>
          <button type="button" @click.stop="triggerFileInput" class="btn-primary-new">
            UPLOAD IMAGES OR VIDEOS
          </button>
          <p class="text-xs text-gray-500 mt-2">
            or drag and drop files here
          </p>
        </div>
        <p class="text-xs text-gray-500">
          Max 20 files • Supported: JPG, PNG, GIF, MP4 • Max size: 10MB per file
        </p>
      </div>
    </div>

    <!-- Hidden File Input -->
    <input
      ref="fileInput"
      type="file"
      multiple
      accept="image/*,video/*"
      class="hidden"
      @change="onFileSelect"
    />

    <!-- Image Gallery (Draggable) -->
    <div v-if="images.length > 0" class="space-y-4">
      <h4 class="text-md font-semibold text-gray-700">Uploaded Media ({{ images.length }})</h4>
      
      <draggable
        v-model="localImages"
        item-key="id"
        class="flex flex-wrap gap-4"
        @end="onImageSorted"
      >
        <template #item="{ element, index }">
          <div class="relative group" style="width: 9%">
            <!-- Image/Video Preview -->
            <div class="relative h-56 flex items-center justify-center bg-gray-50 rounded-lg">
              <template v-if="element.video">
                <video class="w-full h-full object-contain" controls>
                  <source :src="element.video" type="video/mp4" />
                </video>
              </template>
              <template v-else>
                <img
                  :src="element.image"
                  alt="Product"
                  class="w-full h-full object-contain transition"
                />
              </template>
              
              <!-- Remove Button -->
              <button
                @click.stop="removeImage(index)"
                class="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
              >
                <XIcon :size="14" />
              </button>
            </div>

            <!-- Color Assignment -->
            <select
              v-model="element.color_id"
              class="w-full mt-2 px-2 py-1 text-xs border border-gray-300 rounded"
            >
              <option value="">Default (All Colors)</option>
              <option
                v-for="inventory in inventories"
                :key="inventory.color_id"
                :value="inventory.color_id"
              >
                {{ inventory.color?.name }}
              </option>
            </select>
            <small v-if="getError(index, 'color_id')" class="text-red-500 text-xs">
              {{ getError(index, 'color_id') }}
            </small>
          </div>
        </template>
      </draggable>

      <p class="text-xs text-gray-500 text-center mt-4">
        Drag and drop to reorder images
      </p>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
      <ImageIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p class="text-gray-600">No media uploaded yet</p>
      <p class="text-sm text-gray-500 mt-1">Click the upload button above or drag files here</p>
    </div>

    <!-- Upload Progress -->
    <div v-if="uploading" class="mt-4">
      <div class="flex items-center gap-2 text-sm text-blue-600">
        <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        Uploading... {{ uploadProgress }}%
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          class="bg-blue-600 h-2 rounded-full transition-all"
          :style="{ width: uploadProgress + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { ImageIcon, UploadIcon, XIcon } from 'lucide-vue-next';
import draggable from 'vuedraggable';
import apiClient from '@/utils/axios';
import { useToast } from '@/composables/useToast';

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  inventories: {
    type: Array,
    default: () => [],
  },
  allErrors: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:images']);

const { error } = useToast();

const fileInput = ref(null);
const dropzone = ref(null);
const isDragging = ref(false);
const uploading = ref(false);
const uploadProgress = ref(0);

const localImages = computed({
  get: () => props.images,
  set: (value) => emit('update:images', value),
});

// Methods
const triggerFileInput = () => {
  fileInput.value?.click();
};

const onDragOver = () => {
  isDragging.value = true;
};

const onDragLeave = () => {
  isDragging.value = false;
};

const onDrop = (e) => {
  isDragging.value = false;
  const files = Array.from(e.dataTransfer.files);
  handleFiles(files);
};

const onFileSelect = (e) => {
  const files = Array.from(e.target.files);
  handleFiles(files);
  // Reset input
  e.target.value = '';
};

const handleFiles = async (files) => {
  if (files.length === 0) return;

  // Validate file count
  if (props.images.length + files.length > 20) {
    error('Maximum 20 files allowed');
    return;
  }

  // Validate each file
  for (const file of files) {
    if (file.size > 2 * 1024 * 1024) { // 2MB
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      error(`File ${file.name} exceeds 2MB limit (Detected: ${sizeMB} MB)`);
      continue;
    }

    // Upload file
    await uploadFile(file);
  }
};

const uploadFile = async (file) => {
  uploading.value = true;
  uploadProgress.value = 0;

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await apiClient.post('/temporary-image-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      },
    });

    const newImage = {
      id: '',
      color_id: '',
      sort: props.images.length + 1,
      draft: response.data.draft,
      image: response.data.image || '',
      video: response.data.video || '',
      thumbs_image: '',
      compressed_image: '',
      compressed_image_sf: '',
    };

    emit('update:images', [...props.images, newImage]);
  } catch (err) {
    if (err.response?.data?.errors?.file) {
      error(err.response.data.errors.file[0]);
    } else {
      error('Failed to upload file');
    }
  } finally {
    uploading.value = false;
    uploadProgress.value = 0;
  }
};

const removeImage = async (index) => {
  const image = props.images[index];
  
  // Remove temporary image from server if not saved yet
  if (!image.id && image.draft) {
    try {
      await apiClient.post('/temporary-image-remove', { draft: image.draft });
    } catch (error) {
      console.error('Failed to remove temporary image:', error);
    }
  }

  const newImages = [...props.images];
  newImages.splice(index, 1);
  
  // Update sort order
  newImages.forEach((img, idx) => {
    img.sort = idx + 1;
  });
  
  emit('update:images', newImages);
};

const onImageSorted = () => {
  const sortedImages = localImages.value.map((img, index) => ({
    ...img,
    sort: index + 1,
  }));
  emit('update:images', sortedImages);
};

const getError = (index, field) => {
  const errorKey = `images.${index}.${field}`;
  return props.allErrors?.[errorKey]?.[0] || '';
};
</script>

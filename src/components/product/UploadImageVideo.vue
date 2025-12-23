<template>
  <div class="common-card flex flex-col gap-6">
    <div class="  space-y-12">
      <div class="space-y-6">
        <div class="flex flex-col gap-3">
          <h1 class="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <ImageIcon class="text-rose-400" :size="24" />
            Media Management
          </h1>
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
                class="w-fit px-8 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all duration-200 shadow-xl shadow-black/20 active:scale-95"
            >
              Upload Images Or Videos
            </button>
            <p class="text-[11px] text-slate-500 max-w-md leading-relaxed font-medium uppercase italic">
              Max 20 assets. 1MB limit. Automatic name truncation applied.
            </p>
          </div>
        </div>

        <!-- Image Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <!-- ... existing items loop ... -->
          <div
              v-for="(item, index) in items"
              :key="index"
              class="group relative flex flex-col gap-3"
          >
            <!-- Image Card -->
            <div class="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 group-hover:border-cyan-500/50 transition-all duration-300 shadow-2xl shadow-black/60 group-hover:-translate-y-1">
              <img
                  :src="getProductImage(item.image)"
                  :alt="`Product model ${index + 1}`"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <!-- PLUS+ Badge (Refined glassmorphism) -->
              <div
                  v-if="item.isPlus"
                  class="absolute top-0 right-0 overflow-hidden w-20 h-20 pointer-events-none"
              >
                <div class="absolute top-4 -right-8 w-28 bg-rose-500/90 backdrop-blur-md text-[9px] font-black text-white py-1.5 text-center rotate-45 shadow-xl border-b border-white/20 uppercase tracking-tighter">
                  PLUS+
                </div>
              </div>

              <!-- Overlay -->
              <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                <button class="p-3 bg-white/10 backdrop-blur-xl rounded-2xl hover:bg-rose-500/30 border border-white/10 transition-all active:scale-90">
                  <Trash2Icon :size="20" class="text-rose-400" />
                </button>
                <button class="p-3 bg-white/10 backdrop-blur-xl rounded-2xl hover:bg-cyan-500/30 border border-white/10 transition-all active:scale-90">
                  <MaximizeIcon :size="20" class="text-cyan-400" />
                </button>
              </div>
            </div>

            <!-- Color Dropdown (Refined) -->
            <div class="relative">
              <CustomSelect
                  id="project-select"
                  label="Select box"
                  v-model="item.color"
                  :options="[
                    { value: 'alice', text: 'Color [Default]<' },
                    { value: 'bob', text: 'Color [Beige]' },
                    { value: 'charlie', text: 'Color [Black]' }
                  ]"
                  placeholder="Color [Default]"
              />
            </div>
          </div>
        </div>

        <!-- Dropzone Area (Catchy Glow) -->
        <div
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
            :class="[
            'relative w-full h-40 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-all duration-500 group cursor-pointer overflow-hidden backdrop-blur-sm shadow-inner',
            isDragging ? 'border-cyan-500 bg-cyan-500/5 shadow-cyan-500/10' : 'border-slate-800 bg-slate-900/30 hover:border-slate-700 hover:bg-slate-900/50'
          ]"
        >
          <!-- Radial Glow -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 blur-[100px]"></div>
          </div>

          <div class="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 group-hover:scale-110 group-hover:bg-slate-700 transition-all duration-300 shadow-xl group-hover:shadow-cyan-500/20">
            <UploadCloudIcon :size="32" class="text-cyan-400 group-hover:text-cyan-300" />
          </div>
          <div class="text-center relative z-10">
            <p class="text-sm font-bold text-slate-300 group-hover:text-white transition-colors uppercase tracking-widest">
              Drag & Drop Assets
            </p>
            <p class="text-[10px] text-slate-500 mt-1 uppercase font-medium">PNG, JPG or MP4 up to 10MB</p>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <button class="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-all">
            <ArrowLeftIcon :size="14" />
            Back To List
          </button>
          <div class="flex gap-4">
            <button class="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-black rounded-xl transition-all border border-slate-700 uppercase tracking-widest active:scale-95">
              Previous
            </button>
            <button class="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-black rounded-xl transition-all shadow-lg shadow-cyan-900/20 flex items-center gap-2 uppercase tracking-[0.2em]">
              Save Item
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  UploadCloudIcon,
  Trash2Icon,
  ChevronDownIcon,

  ImageIcon,
  MaximizeIcon,
  ArrowLeftIcon,
  ActivityIcon,
  BoxIcon,
  ZapIcon,
  AlertTriangleIcon, PlusIcon
} from 'lucide-vue-next'
import CustomSelect from "@/components/CustomSelect.vue";
import {getProductImage} from "@/utils/helper.js";

const isDragging = ref(false)
const status = ref('active')

const stats = [
  {
    label: 'Total Colors',
    value: '2',
    icon: BoxIcon,
    colorClass: 'bg-blue-500 w-full',
    textClass: 'text-blue-400',
    borderColorClass: 'border-blue-500/20'
  },
  {
    label: 'Total Physical Stock',
    value: '0',
    icon: ZapIcon,
    colorClass: 'bg-green-500 w-full',
    textClass: 'text-green-400',
    borderColorClass: 'border-green-500/20'
  },
  {
    label: 'Total Projected Stock',
    value: '0',
    icon: ActivityIcon,
    colorClass: 'bg-amber-500 w-full',
    textClass: 'text-amber-400',
    borderColorClass: 'border-amber-500/20'
  },
  {
    label: 'Need Reorder',
    value: '2',
    icon: AlertTriangleIcon,
    colorClass: 'bg-rose-500 w-full',
    textClass: 'text-rose-400',
    borderColorClass: 'border-rose-500/20'
  },
]

const items = ref([
  { image: '1.jpg', color: 'Default', isPlus: false },
  { image: '2.jpg', color: 'Default', isPlus: false },
  { image: '3.jpg', color: 'Default', isPlus: true },
  { image: '4.jpg', color: 'Default', isPlus: false },
  { image: '5.jpg', color: 'Default', isPlus: false },
  { image: '1.jpg', color: 'Default', isPlus: false },
  { image: '2.jpg', color: 'Default', isPlus: true },
])

const handleDrop = (e) => {
  isDragging.value = false
  console.log('[v0] Files dropped:', e.dataTransfer.files)
}
</script>

<style>
/* Smooth focus rings and custom transitions */
input:focus-visible, select:focus-visible, textarea:focus-visible {
  outline: none;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #0a0a0c;
}
::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #334155;
}
</style>

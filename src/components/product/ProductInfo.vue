<!--<template>-->
<!--  <div class="common-card" >-->
<!--    <div class="">-->
<!--      &lt;!&ndash; Header Section &ndash;&gt;-->
<!--      <h1 class="text-2xl font-bold text-white">Edit Item</h1>-->
<!--      <div class="mb-8">-->
<!--        <div class="flex items-center justify-between  pt-4 mb-2">-->
<!--          <h1 class="text-xl font-bold text-white">Product Info</h1>-->
<!--          <div class="flex items-center gap-6">-->
<!--            <CustomRadio-->
<!--                id="delivery-method"-->
<!--                label="Radio"-->
<!--                v-model="orderData.speed"-->
<!--                :options="[-->
<!--          { value: 'standard', text: 'Active' },-->
<!--          { value: 'express', text: 'Inactive' },-->
<!--        ]"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Main Content Grid &ndash;&gt;-->
<!--      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">-->
<!--        &lt;!&ndash; Left Column &ndash;&gt;-->
<!--        <div class="lg:col-span-1 space-y-5">-->

<!--          <CustomInput-->
<!--              id="Style"-->
<!--              label=" Style No"-->
<!--              type="text"-->
<!--              placeholder="MJ10240..-Clone-Clone-Clone"-->

<!--          />-->

<!--          <CustomSelect-->
<!--              id="Size"-->
<!--              label="Select box"-->
<!--              :options="[-->
<!--                    { value: 'alice', text: 'S-M-L | S-M-L' },-->
<!--                    { value: 'bob', text: 'M-L-XL | M-L-XL' },-->
<!--                    { value: 'charlie', text: 'XS-S | XS-S' }-->
<!--                  ]"-->
<!--              placeholder="Select Size"-->
<!--          />-->

<!--          <CustomInput-->
<!--              id="FOB"-->
<!--              label=" FOB Price"-->
<!--              type="text"-->
<!--              placeholder="15.00"-->
<!--              :required="true"-->
<!--          />-->

<!--          <CustomInput-->
<!--              id="Landed"-->
<!--              label=" Landed Price"-->
<!--              type="text"-->
<!--              placeholder="17.00"-->
<!--              :required="true"-->
<!--          />-->

<!--          <CustomInput-->
<!--              id="Resale"-->
<!--              label="  Price"-->
<!--              type="text"-->
<!--              placeholder="22.90"-->
<!--              :required="true"-->
<!--          />-->

<!--        </div>-->

<!--        &lt;!&ndash; Middle Column &ndash;&gt;-->
<!--        <div class="lg:col-span-1 space-y-5">-->
<!--          &lt;!&ndash; SKU &ndash;&gt;-->

<!--          <CustomInput-->
<!--              id="SKU"-->
<!--              label="  SKU"-->
<!--              type="text"-->
<!--              placeholder="SKU"-->
<!--              :required="true"-->
<!--          />-->

<!--          <CustomInput-->
<!--              id="mj1"-->
<!--              label="Product Slug"-->
<!--              type="text"-->
<!--              placeholder="mj10240-clone"-->
<!--              :required="true"-->
<!--          />-->

<!--          <CustomInput-->
<!--              id="pname"-->
<!--              label="Product Name"-->
<!--              type="text"-->
<!--              placeholder="Short Sleeve Knit Top with Daisy Patch"-->
<!--              :required="true"-->
<!--          />-->

<!--          <CustomSelect-->
<!--              id="Pack"-->
<!--              label="Pack"-->
<!--              :options="[-->
<!--                    { value: 'alice', text: 'Pack 1' },-->
<!--                    { value: 'bob', text: 'Pack 1' },-->
<!--                    { value: 'charlie', text: 'Pack 1' }-->
<!--                  ]"-->
<!--              placeholder="Select Pack"-->
<!--          />-->

<!--          <div class="flex flex-col">-->
<!--            <p class="block text-sm font-medium text-gray-400 mb-1">Default Category</p>-->
<!--            <div class="flex gap-2">-->
<!--              <div class="flex-1">-->
<!--                <CustomSelect-->
<!--                    id="Pack"-->
<!--                    label=""-->
<!--                    :options="[-->
<!--                    { value: 'alice', text: 'Pack 1' },-->
<!--                    { value: 'bob', text: 'Pack 1' },-->
<!--                    { value: 'charlie', text: 'Pack 1' }-->
<!--                  ]"-->
<!--                    placeholder="Dress"-->
<!--                />-->
<!--              </div>-->
<!--              <div class="flex-1">-->
<!--                <CustomSelect-->
<!--                    id="Pack3"-->
<!--                    label=""-->
<!--                    :options="[-->
<!--                    { value: 'alice', text: 'Pack 1' },-->
<!--                    { value: 'bob', text: 'Pack 1' },-->
<!--                    { value: 'charlie', text: 'Pack 1' }-->
<!--                  ]"-->
<!--                    placeholder="Mini"-->
<!--                />-->
<!--              </div>-->
<!--              <div class="flex-1">-->
<!--                <CustomSelect-->
<!--                    id="Pack4"-->
<!--                    label=""-->
<!--                    :options="[-->
<!--                    { value: 'alice', text: 'Pack 1' },-->
<!--                    { value: 'bob', text: 'Pack 1' },-->
<!--                    { value: 'charlie', text: 'Pack 1' }-->
<!--                  ]"-->
<!--                    placeholder="Select Third"-->
<!--                />-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

<!--        </div>-->

<!--        &lt;!&ndash; Right Column &ndash;&gt;-->
<!--        <div class="lg:col-span-1 space-y-5">-->
<!--          <CustomTextarea-->
<!--              id="user-feedback"-->
<!--              label="Detailed Feedback"-->
<!--              placeholder="Description"-->
<!--              :rows="10"-->
<!--          />-->
<!--        </div>-->
<!--      </div>-->

<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref } from 'vue'-->
<!--import CustomRadio from "@/components/CustomRadio.vue";-->
<!--import CustomInput from "@/components/CustomInput.vue";-->
<!--import CustomSelect from "@/components/CustomSelect.vue";-->
<!--import CustomTextarea from "@/components/CustomTextarea.vue";-->


<!--const orderData = ref({-->
<!--  speed: 'standard',-->
<!--});-->
<!--</script>-->


<template>
  <div class=" common-card">
    <div class="mx-auto space-y-12">

      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <PackageIcon class="text-cyan-400" :size="24" />
            Edit Item
          </h1>
          <div class="flex items-center gap-4 bg-slate-900/20 p-1.5 rounded-full border border-slate-800">
            <button
                @click="status = 'active'"
                :class="[
                'flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all',
                status === 'active' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-slate-300'
              ]"
            >
              <div class="w-2 h-2 rounded-full" :class="status === 'active' ? 'bg-white' : 'bg-slate-600'"></div>
              ACTIVE
            </button>
            <button
                @click="status = 'inactive'"
                :class="[
                'flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all',
                status === 'inactive' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'text-slate-500 hover:text-slate-300'
              ]"
            >
              <div class="w-2 h-2 rounded-full" :class="status === 'inactive' ? 'bg-white' : 'bg-slate-600'"></div>
              INACTIVE
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 p-6 bg-slate-900/20 rounded-3xl border border-slate-800 backdrop-blur-sm shadow-2xl">
            <h2 class="col-span-full text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Product Essentials</h2>
            <div class="space-y-2">
              <label class="text-[11px] font-bold text-slate-500 uppercase ml-1">Style No</label>

              <input type="text" value="MJ10240..-Clone-Clone-Clone" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all outline-none" />
            </div>
            <div class="space-y-2">
              <label class="text-[11px] font-bold text-slate-500 uppercase ml-1">SKU</label>
              <input type="text" placeholder="SKU" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-cyan-500/50 transition-all outline-none" />
            </div>
            <div class="space-y-2">
              <label class="text-[11px] font-bold text-slate-500 uppercase ml-1">Select Size</label>
              <div class="relative">
                <select class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm appearance-none outline-none focus:border-cyan-500/50 transition-all cursor-pointer">
                  <option>Select Size</option>
                </select>
                <ChevronDownIcon class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" :size="16" />
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-[11px] font-bold text-slate-500 uppercase ml-1">Product Name</label>
              <input type="text" value="Short Sleeve Knit Top with Daisy Patch" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-cyan-500/50 transition-all outline-none" />
            </div>
            <div class="space-y-2">
              <label class="text-[11px] font-bold text-slate-500 uppercase ml-1">FOB Price</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-bold">$</span>
                <input type="text" value="15.00" class="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-3 text-sm focus:border-cyan-500/50 transition-all outline-none" />
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-[11px] font-bold text-slate-500 uppercase ml-1">Price</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-bold">$</span>
                <input type="text" value="22.90" class="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-3 text-sm focus:border-cyan-500/50 transition-all outline-none" />
              </div>
            </div>
          </div>

          <div class="space-y-5 p-6 bg-slate-900/40 rounded-3xl border border-slate-800 backdrop-blur-sm shadow-2xl flex flex-col">
            <h2 class="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Detailed Feedback</h2>
            <textarea
                placeholder="Enter internal description or feedback..."
                class="flex-1 w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-sm resize-none focus:border-cyan-500/50 transition-all outline-none min-h-[150px]"
            ></textarea>
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
  PackageIcon,
  LayersIcon,
  SearchIcon,
  PlusIcon,
  ImageIcon,
  MaximizeIcon,
  ArrowLeftIcon,
  ActivityIcon,
  BoxIcon,
  ZapIcon,
  AlertTriangleIcon
} from 'lucide-vue-next'

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
  { image: '/placeholder.svg?height=400&width=300', color: 'Default', isPlus: false },
  { image: '/placeholder.svg?height=400&width=300', color: 'Default', isPlus: false },
  { image: '/placeholder.svg?height=400&width=300', color: 'Default', isPlus: true },
  { image: '/placeholder.svg?height=400&width=300', color: 'Default', isPlus: false },
  { image: '/placeholder.svg?height=400&width=300', color: 'Default', isPlus: false },
  { image: '/placeholder.svg?height=400&width=300', color: 'Default', isPlus: false },
  { image: '/placeholder.svg?height=400&width=300', color: 'Default', isPlus: true },
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

<template>
  <div class="common-card" >
    <div class="">
      <!-- Header Section -->
      <h1 class="text-2xl font-bold text-white">Edit Item</h1>
      <div class="mb-8">
        <div class="flex items-center justify-between  pt-4 mb-2">
          <h1 class="text-xl font-bold text-white">Product Info</h1>
          <div class="flex items-center gap-6">
            <CustomRadio
                id="delivery-method"
                label="Radio"
                v-model="orderData.speed"
                :options="[
          { value: 'standard', text: 'Active' },
          { value: 'express', text: 'Inactive' },
        ]"
            />
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column -->
        <div class="lg:col-span-1 space-y-5">

          <CustomInput
              id="Style"
              label=" Style No"
              type="text"
              placeholder="MJ10240..-Clone-Clone-Clone"

          />

          <CustomSelect
              id="Size"
              label="Select box"
              :options="[
                    { value: 'alice', text: 'S-M-L | S-M-L' },
                    { value: 'bob', text: 'M-L-XL | M-L-XL' },
                    { value: 'charlie', text: 'XS-S | XS-S' }
                  ]"
              placeholder="Select Size"
          />

          <CustomInput
              id="FOB"
              label=" FOB Price"
              type="text"
              placeholder="15.00"
              :required="true"
          />

          <CustomInput
              id="Landed"
              label=" Landed Price"
              type="text"
              placeholder="17.00"
              :required="true"
          />

          <CustomInput
              id="Resale"
              label="  Price"
              type="text"
              placeholder="22.90"
              :required="true"
          />

        </div>

        <!-- Middle Column -->
        <div class="lg:col-span-1 space-y-5">
          <!-- SKU -->

          <CustomInput
              id="SKU"
              label="  SKU"
              type="text"
              placeholder="SKU"
              :required="true"
          />

          <CustomInput
              id="mj1"
              label="Product Slug"
              type="text"
              placeholder="mj10240-clone"
              :required="true"
          />

          <CustomInput
              id="pname"
              label="Product Name"
              type="text"
              placeholder="Short Sleeve Knit Top with Daisy Patch"
              :required="true"
          />

          <CustomSelect
              id="Pack"
              label="Pack"
              :options="[
                    { value: 'alice', text: 'Pack 1' },
                    { value: 'bob', text: 'Pack 1' },
                    { value: 'charlie', text: 'Pack 1' }
                  ]"
              placeholder="Select Pack"
          />

          <div class="flex flex-col">
            <p class="block text-sm font-medium text-gray-400 mb-1">Default Category</p>
            <div class="flex gap-2">
              <div class="flex-1">
                <CustomSelect
                    id="Pack"
                    label=""
                    :options="[
                    { value: 'alice', text: 'Pack 1' },
                    { value: 'bob', text: 'Pack 1' },
                    { value: 'charlie', text: 'Pack 1' }
                  ]"
                    placeholder="Dress"
                />
              </div>
              <div class="flex-1">
                <CustomSelect
                    id="Pack3"
                    label=""
                    :options="[
                    { value: 'alice', text: 'Pack 1' },
                    { value: 'bob', text: 'Pack 1' },
                    { value: 'charlie', text: 'Pack 1' }
                  ]"
                    placeholder="Mini"
                />
              </div>
              <div class="flex-1">
                <CustomSelect
                    id="Pack4"
                    label=""
                    :options="[
                    { value: 'alice', text: 'Pack 1' },
                    { value: 'bob', text: 'Pack 1' },
                    { value: 'charlie', text: 'Pack 1' }
                  ]"
                    placeholder="Select Third"
                />
              </div>
            </div>
          </div>

        </div>

        <!-- Right Column -->
        <div class="lg:col-span-1 space-y-5">
          <CustomTextarea
              id="user-feedback"
              label="Detailed Feedback"
              placeholder="Description"
              :rows="10"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CustomRadio from "@/components/CustomRadio.vue";
import CustomInput from "@/components/CustomInput.vue";
import CustomSelect from "@/components/CustomSelect.vue";
import CustomTextarea from "@/components/CustomTextarea.vue";


const orderData = ref({
  speed: 'standard',
});
</script>

<template>

  <div class="common-card flex flex-col gap-3 mb-3">
    <h2>Button</h2>

      <div class="flex gap-2 ">
        <button class="btn-primary">
          In Progress
        </button>

        <button class="btn-secondary">
          In Complete
        </button>

        <button class="btn-success">
          Completed
        </button>

        <button class="btn-info">
          Info
        </button>

        <button class="btn-default">
          In Complete
        </button>

        <button class="btn-danger">
          Danger
        </button>

      </div>

      <div class="flex gap-2 ">
        <button class="btn-primary-transparent">
          In Progress
        </button>

        <button class="btn-secondary-transparent">
          In Complete
        </button>

        <button class="btn-success-transparent">
          Completed
        </button>

        <button class="btn-info-transparent">
          Info
        </button>

        <button class="btn-default-transparent">
          In Complete
        </button>

        <button class="btn-danger-transparent">
          Danger
        </button>
        <button class="btn-secondary-transparent">
          transparent
        </button>
        <button class="btn-common">
          transparent
        </button>
      </div>

  </div>

  <div class="common-card flex flex-col gap-3 mb-3">
    <h2>Input</h2>
        <div
            class=""
        >

          <form class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-5">
              <CustomRadio
                  id="delivery-method"
                  label="Radio"
                  v-model="orderData.speed"
                  :options="[
          { value: 'standard', text: 'Radio 1' },
          { value: 'express', text: 'Radio 2' },
        ]"
              />
                <div class="card flex flex-wrap  gap-4">
                    <CustomCheckbox
                        id="news-check"
                        label="Checkbox 1"
                        v-model="formData.newsletter"
                    />

                    <CustomCheckbox id="terms-check" v-model="formData.terms">
                      Checkbox 2
                    </CustomCheckbox>
                </div>
                <CustomSelect
                    id="project-select"
                    label="Select box"
                    v-model="projectData.lead"
                    :options="[
                    { value: 'alice', text: 'Alice (Development)' },
                    { value: 'bob', text: 'Bob (Design)' },
                    { value: 'charlie', text: 'Charlie (Testing)' }
                  ]"
                    placeholder="Choose a team member..."
                />
              <CustomInput
                  id="user-name"
                  label="Username"
                  type="text"
                  placeholder="Choose a unique name"
                  v-model="inputData.username"
                  :required="true"
              />

              <CustomInput
                  id="user-password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  v-model="inputData.password"
              />

              <CustomInput
                  id="user-email"
                  label="Email Address"
                  type="email"
                  placeholder="you@domain.com"
                  v-model="inputData.email"
              />

              <CustomTextarea
                  id="user-feedback"
                  label="Detailed Feedback"
                  placeholder="Enter your thoughts or questions here..."
                  v-model="textarea.feedback"
                  :rows="5"
              />

            </div>

            <div class="space-y-5">
              <CustomRadio
                  id="delivery-method"
                  label="Radio"
                  v-model="orderData.speed"
                  :options="[
          { value: 'standard', text: 'Radio 1' },
          { value: 'express', text: 'Radio 2' },
        ]"
              />
              <div class="card flex flex-wrap  gap-4">
                <CustomCheckbox
                    id="news-check"
                    label="Checkbox 1"
                    v-model="formData.newsletter"
                />

                <CustomCheckbox id="terms-check" v-model="formData.terms">
                  Checkbox 2
                </CustomCheckbox>
              </div>
              <CustomSelect
                  id="project-select"
                  label="Select box"
                  v-model="projectData.lead"
                  :options="[
                    { value: 'alice', text: 'Alice (Development)' },
                    { value: 'bob', text: 'Bob (Design)' },
                    { value: 'charlie', text: 'Charlie (Testing)' }
                  ]"
                  placeholder="Choose a team member..."
              />
              <CustomInput
                  id="user-name"
                  label="Username"
                  type="text"
                  placeholder="Choose a unique name"
                  v-model="inputData.username"
                  :required="true"
              />

              <CustomInput
                  id="user-password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  v-model="inputData.password"
              />

              <CustomInput
                  id="user-email"
                  label="Email Address"
                  type="email"
                  placeholder="you@domain.com"
                  v-model="inputData.email"
              />

              <CustomTextarea
                  id="user-feedback"
                  label="Detailed Feedback"
                  placeholder="Enter your thoughts or questions here..."
                  v-model="textarea.feedback"
                  :rows="5"
              />

            </div>
          </form>
        </div>

  </div>

  <div class="bg-[#0D121C] rounded-lg p-6 flex flex-col gap-3 mb-3">
    <h2>Modal </h2>
    <div class="flex">
      <button class="btn-secondary" @click="isModalOpen = true">
        Open Modal
      </button>
    </div>


    <CustomModal
        :isOpen="isModalOpen"
        title="custom Modal Title"
        @close="isModalOpen = false"
    >
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores at dolore earum ex iusto nihil quod reiciendis, soluta temporibus ut.</p>
      <template #footer>
        <div class="flex items-end justify-end gap-1">
          <button class="btn-danger" @click="isModalOpen = false">
            Close
          </button>
          <button class="btn-success" @click="isModalOpen = false">
            Apply
          </button>
        </div>
      </template>
    </CustomModal>
  </div>

  <div class="common-card flex flex-col gap-3 mb-3">
    <h2>Table </h2>
<!--    <CustomTable :headers="tableHeaders" :data="tableData">-->

<!--      <template #cell-status="{ item }">-->
<!--        <span-->
<!--            :class="{-->
<!--            'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,-->
<!--            'btn-success': item.status === 'Complete',-->
<!--            'btn-primary': item.status === 'In Progress',-->
<!--            'btn-danger': item.status === 'Blocked',-->
<!--          }"-->
<!--        >-->
<!--          {{ item.status }}-->
<!--        </span>-->
<!--      </template>-->

<!--      <template #cell-actions="{ item }">-->
<!--        <button  class="btn-secondary">-->
<!--          View-->
<!--        </button>-->
<!--      </template>-->
<!--    </CustomTable>-->
<!--    <CustomPagination-->
<!--        :currentPage="pageData.current"-->
<!--        :totalPages="pageData.total"-->
<!--        :maxVisibleButtons="7"-->
<!--        @update:currentPage="updatePage"-->
<!--    />-->

    <div class="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-md shadow-2xl">
      <table class="w-full text-left border-collapse min-w-[1000px]">
        <thead>
        <tr class="border-b border-slate-800 bg-slate-900/40">
          <th v-for="header in tableHeaders" :key="header" class="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-[0.2em]">
            {{ header }}
          </th>
        </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/50">
        <tr v-for="row in inventoryData" :key="row.color" class="group hover:bg-slate-800/20 transition-colors">
          <td class="px-6 py-4">
            <span class="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold text-white uppercase tracking-wider">{{ row.color }}</span>
          </td>
          <td class="px-6 py-4">
            <input type="text" v-model="row.physical" class="w-20 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-center font-bold focus:border-cyan-500/50 outline-none transition-all" />
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center gap-2 text-cyan-400 font-black text-sm">{{ row.incoming }} <ZapIcon :size="14" class="animate-pulse" /></div>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center gap-2 text-amber-400 font-black text-sm">{{ row.outgoing }} <ArrowDownCircleIcon :size="14" /></div>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center gap-2 text-rose-400 font-black text-sm">{{ row.projected }} <AlertCircleIcon :size="14" /></div>
          </td>
          <td class="px-6 py-4">
            <div class="relative min-w-[140px]">
              <select v-model="row.status" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-bold text-slate-400 appearance-none outline-none focus:border-cyan-500/50 transition-all uppercase tracking-widest cursor-pointer">
                <option>Out of Stock</option>
                <option>In Stock</option>
                <option>Low Stock</option>
              </select>
              <ChevronDownIcon class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600" :size="12" />
            </div>
          </td>
          <td class="px-6 py-4 text-center">
            <input type="text" v-model="row.reorder" class="w-16 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-center font-bold outline-none" />
          </td>
          <td class="px-6 py-4">
            <div class="relative">
              <input type="text" placeholder="YYYY-MM-DD" class="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-slate-500 outline-none focus:border-cyan-500/50 transition-all" />
              <CalendarIcon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" :size="14" />
            </div>
          </td>
          <td class="px-6 py-4 text-center">
            <button class="text-rose-500/50 hover:text-rose-500 font-black text-[10px] uppercase tracking-widest transition-all hover:scale-110 active:scale-95">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="common-card flex flex-col gap-3 mb-3">
    <h2>Tab </h2>
    <CustomTabs :titles="['General', 'Security', 'Integrations']">

      <template #tab-0>
        <div class="space-y-4">
          <h4 class="text-xl font-semibold text-white">General Account Settings</h4>
          <p>Adjust your name, email, and preferred language here. Changes are saved automatically.</p>
          <CustomInput id="tab-name" label="Display Name" type="text" placeholder="Your Name" v-model="tabData.name" />
        </div>
      </template>

      <template #tab-1>
        <div class="space-y-4">
          <h4 class="text-xl font-semibold text-white">Security & MFA</h4>
          <p>Protect your account by enabling two-factor authentication.</p>
          <CustomCheckbox id="tab-2fa" label="Enable Two-Factor Authentication (2FA)" v-model="tabData.twoFactor" />
        </div>
      </template>

      <template #tab-2>
        <div class="space-y-4">
          <h4 class="text-xl font-semibold text-white">External Integrations</h4>
          <p>Connect third-party services like GitHub or Slack.</p>
          <CustomRadio
              id="tab-integrations"
              label="Integration Status"
              v-model="tabData.integration"
              :options="[{ value: 'slack', text: 'Slack' }, { value: 'github', text: 'GitHub' }]"
          />
        </div>
      </template>

    </CustomTabs>
  </div>

</template>

<script setup>

  import { ref } from 'vue';
  import CustomModal from "@/components/CustomModal.vue";
  import CustomCheckbox from "@/components/CustomCheckbox.vue";
  import CustomRadio from "@/components/CustomRadio.vue";
  import CustomSelect from "@/components/CustomSelect.vue";
  import CustomInput from "@/components/CustomInput.vue";
  import CustomTextarea from "@/components/CustomTextarea.vue";
  import CustomTable from "@/components/CustomTable.vue";
  import CustomTabs from "@/components/CustomTabs.vue";
  import CustomPagination from "@/components/CustomPagination.vue";
  import {AlertCircleIcon, ArrowDownCircleIcon, CalendarIcon, ChevronDownIcon, ZapIcon} from "lucide-vue-next";

  const isModalOpen = ref(false);

  const formData = ref({
    newsletter: false,
    terms: true,
  });

  const orderData = ref({
    speed: 'standard',
  });

  const projectData = ref({
    lead: '',
  });

  const inputData = ref({
    username: '',
    password: '',
    email: '',
  });

  const textarea = ref({
    feedback: '',
  });

  const tableHeaders = [
    'Color', 'Physical Qty', 'Incoming Qty', 'Outgoing Qty', 'Projected Qty', 'Stock Status', 'Reorder Level', 'Expected Arrival', 'Action'
  ]

  const inventoryData = ref([
    { color: 'Green', physical: 0, incoming: 0, outgoing: 0, projected: 0, status: 'Out of Stock', reorder: 0 },
    { color: 'Ivory', physical: 0, incoming: 0, outgoing: 0, projected: 0, status: 'Out of Stock', reorder: 0 },
  ])

  const pageData = ref({
    current: 1,
    total: 50, // Imagine 50 pages of content
  });

  const updatePage = (newPage) => {
    if (newPage >= 1 && newPage <= pageData.value.total) {
      pageData.value.current = newPage;
    }
  };


  const tabData = ref({
    name: 'Jane Doe',
    twoFactor: false,
    integration: 'slack',
  });




</script>
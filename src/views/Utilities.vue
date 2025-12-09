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
    <CustomTable :headers="tableHeaders" :data="tableData">

      <template #cell-status="{ item }">
        <span
            :class="{
            'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
            'btn-success': item.status === 'Complete',
            'btn-primary': item.status === 'In Progress',
            'btn-danger': item.status === 'Blocked',
          }"
        >
          {{ item.status }}
        </span>
      </template>

      <template #cell-actions="{ item }">
        <button  class="btn-secondary">
          View
        </button>
      </template>
    </CustomTable>
    <CustomPagination
        :currentPage="pageData.current"
        :totalPages="pageData.total"
        :maxVisibleButtons="7"
        @update:currentPage="updatePage"
    />
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

  const tableHeaders = ref([
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Project Title' },
    { key: 'owner', label: 'Owner' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ]);

  const tableData = ref([
    { id: 101, title: 'API Refactor', owner: 'Alice', status: 'Complete' },
    { id: 102, title: 'UX Redesign', owner: 'Bob', status: 'In Progress' },
    { id: 103, title: 'DB Migration', owner: 'Charlie', status: 'Blocked' },
    { id: 104, title: 'New Feature X', owner: 'Dave', status: 'In Progress' },
  ]);

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
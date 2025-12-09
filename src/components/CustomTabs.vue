<template>
  <div class="w-full">
    <div class="flex border-b border-gray-700 relative mb-6">
      <div
          v-if="activeTabElement"
          class="absolute bottom-0 h-0.5 bg-indigo-500 transition-all duration-300 ease-out"
          :style="underlineStyle"
      ></div>

      <button
          v-for="(title, index) in tabTitles"
          :key="index"
          @click="setActiveTab(index)"
          :class="{
          'text-white font-semibold': activeTabIndex === index,
          'text-gray-400 hover:text-gray-200': activeTabIndex !== index,
        }"
          class="px-4 py-2 text-sm transition-colors duration-200 z-10 relative focus:outline-none"
          :ref="el => setTabRef(el, index)"
      >
        {{ title }}
      </button>
    </div>

    <Transition name="tab-fade" mode="out-in">
      <div :key="activeTabIndex" class="p-0 text-gray-300 min-h-[100px]">
        <slot :name="`tab-${activeTabIndex}`"></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, useSlots, computed, onMounted, nextTick } from 'vue';

const slots = useSlots();
const tabTitles = ref([]);
const activeTabIndex = ref(0);
const tabRefs = ref([]);
const activeTabElement = ref(null);
const underlineStyle = ref({});

onMounted(() => {
  const titles = [];
  const slotNames = Object.keys(slots);

  if (props.titles && props.titles.length) {
    tabTitles.value = props.titles;
  }

  updateUnderlinePosition();
});


const props = defineProps({
  titles: {
    type: Array,
    required: true,
  },
});


const setActiveTab = (index) => {
  activeTabIndex.value = index;
  nextTick(updateUnderlinePosition);
};

const setTabRef = (el, index) => {
  if (el) {
    tabRefs.value[index] = el;
  }
};

const updateUnderlinePosition = () => {
  const activeEl = tabRefs.value[activeTabIndex.value];
  if (activeEl) {
    activeTabElement.value = activeEl;
    underlineStyle.value = {
      width: `${activeEl.offsetWidth}px`,
      transform: `translateX(${activeEl.offsetLeft}px)`,
    };
  }
};

</script>

<style>
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: opacity 0.3s ease;
}

.tab-fade-enter-from,
.tab-fade-leave-to {
  opacity: 0;
}
</style>
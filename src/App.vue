<script setup>
import {ref} from "vue";
import TheMode from "@/components/TheMode.vue";
import ThePomodoro from "@/components/ThePomodoro.vue";
import VectorIconSettings from "@/components/icons/VectorIconSettings.vue";
import SettingsModal from "@/components/SettingsModal.vue";

const mode = ref('pomodoro');
const duration = ref(1500);
const modes = ref([
  { name: 'pomodoro', duration: 1500 },
  { name: 'short break', duration: 300 },
  { name: 'long break', duration: 900 },
]);
function changeMode(newMode) {
  mode.value = newMode;
  const modeToBeSet = modes.value.find(item => item.name === newMode);
  duration.value = modeToBeSet.duration;
}
function showSettingsModal() {
  const showModal = new CustomEvent('modal::show', {
    detail: 'settings-modal',
  })
  window.dispatchEvent(showModal);
}
</script>

<template>
  <header>
    <h1>pomodoro</h1>
  </header>

  <main>
    <TheMode
      :current-mode="mode"
      :modes="modes.map(item=> item.name)"
      @changeMode="changeMode"
    />
    <ThePomodoro :duration="duration"/>
    <button class="btn minimal" @click="showSettingsModal">
      <VectorIconSettings />
    </button>
    <SettingsModal />
  </main>
</template>

<style lang="scss">
@import "@/assets/styles/styles.scss";
</style>

<style lang="scss" scoped>
header {
  padding: 48px;
  h1 {
    text-align: center;
    @include heading-2;
  }
}

main {
  text-align: center;
}
</style>

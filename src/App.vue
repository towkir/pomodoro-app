<script setup>
import TheMode from "@/components/TheMode.vue";
import ThePomodoro from "@/components/ThePomodoro.vue";
import VectorIconSettings from "@/components/icons/VectorIconSettings.vue";
import SettingsModal from "@/components/SettingsModal.vue";
import { usePomodoroStore } from "@/stores/pomodoro";

const store = usePomodoroStore();

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
      :current-mode="store.selectedMode.name"
      :modes="store.modes.map(item=> item.name)"
      :theme="store.selectedColor"
      :font="store.selectedFont"
      @changeMode="store.selectMode"
    />
    <ThePomodoro
      :duration-in-minutes="store.selectedMode.duration"
      :theme="store.selectedColor"
      :font="store.selectedFont"
    />
    <button
      class="btn minimal"
      @click="showSettingsModal"
    >
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
  .btn.minimal {
    opacity: 0.5;
    transition: opacity 0.3s ease-in-out;
    &:hover {
      opacity: 1;
    }
  }
}

@media screen and (max-width: 570px) {
  header {
    padding: 32px;
  }
}
</style>

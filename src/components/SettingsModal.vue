<script setup>
import { ref, onMounted } from "vue";
import { usePomodoroStore } from "@/stores/pomodoro";
import TheModal from "@/components/common/TheModal.vue";
import VectorIconCheck from "@/components/icons/VectorIconCheck.vue";

const store = usePomodoroStore();

const settings = ref({
  pomodoro: {},
  font: '',
  color: '',
});

function resetSettings() {
  // settings.value.pomodoro =
  settings.value.font = store.selectedFont;
  settings.value.color = store.selectedColor;
}
function hideSettingsModal() {
  const showModal = new CustomEvent('modal::hide', {
    detail: 'settings-modal',
  })
  window.dispatchEvent(showModal);
}
function applySettings() {
  // some stuff to save the settings
  hideSettingsModal();
}

onMounted(() => {
  resetSettings();
});
</script>

<template>
<TheModal
  id="settings-modal"
  title="Settings"
  ok-text="Apply"
  @ok="applySettings"
  @close="resetSettings"
>
  <template #body>
    <div class="settings">
      <h5>Time (Minutes)</h5>
      <div class="time"></div>
      <div class="font">
        <h5>Font</h5>
        <div class="options">
          <template
            v-for="font in store.fonts"
            :key="`font-${font}`"
          >
            <label :for="`font-${font}`">
              <input
                type="radio"
                name="font"
                :value="font"
                :id="`font-${font}`"
                v-model="settings.font"
              />
              <span :class="`font-label ${font}`">Aa</span>
            </label>
          </template>
        </div>
      </div>
      <div class="color">
        <h5>Color</h5>
        <div class="options">
          <template
            v-for="color in store.colors"
            :key="`color-${color}`"
          >
            <label :for="`color-${color}`">
              <input
                type="radio"
                name="color"
                :value="color"
                :id="`color-${color}`"
                v-model="settings.color"
              />
              <span :class="`color-label ${color}`">
                <VectorIconCheck />
              </span>
            </label>
          </template>
        </div>
      </div>
    </div>
  </template>
</TheModal>
</template>

<style scoped lang="scss">
.settings {
  text-align: left;
  h5 {
    @include heading-5;
  }
  .time,
  .font {
    border-bottom: 1px solid $brand-border;
  }
  .time,
  .font,
  .color {
    padding: 24px 0;
  }
  .font,
  .color {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .options {
      margin-right: -8px;
    }
  }
}
</style>

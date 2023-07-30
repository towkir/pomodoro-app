<script setup>
import { ref, onMounted } from "vue";
import { usePomodoroStore } from "@/stores/pomodoro";
import TheModal from "@/components/common/TheModal.vue";
import VectorIconCheck from "@/components/icons/VectorIconCheck.vue";
import NumberInputWithSpinner from "@/components/common/NumberInputWithSpinner.vue";

const store = usePomodoroStore();

const settings = ref({
  duration: {
    pomodoro: 0,
    shortBreak: 0,
    longBreak: 0,
  },
  font: '',
  color: '',
});

function findMode(name) {
  return store.modes.find(item => item.name === name)
}
function validateDurations(key, name, fallbackValue) {
  if (settings.value.duration[key] > findMode(name).max
    || settings.value.duration[key] < findMode(name).min) {
    settings.value.duration[key] = fallbackValue;
  } else {
    settings.value.duration[key] = Math.round(settings.value.duration[key]);
  }
}
function validateForm() {
  validateDurations('pomodoro', 'pomodoro', 25);
  validateDurations('shortBreak', 'short break', 5);
  validateDurations('longBreak', 'long break', 15);
  if (!store.fonts.includes(settings.value.font)) {
    settings.value.font = 'sans';
  }
  if (!store.colors.includes(settings.value.color)) {
    settings.value.color = 'begonia';
  }
}

function saveSettings() {
  store.updateDuration('pomodoro', settings.value.duration.pomodoro);
  store.updateDuration('short break', settings.value.duration.shortBreak);
  store.updateDuration('long break', settings.value.duration.longBreak);
  store.selectFont(settings.value.font);
  store.selectColor(settings.value.color);
  store.selectMode(store.selectedMode.name); // updates duration of currently selected mode
}
function resetSettings() {
  settings.value.duration.pomodoro = findMode('pomodoro').duration;
  settings.value.duration.shortBreak = findMode('short break').duration;
  settings.value.duration.longBreak = findMode('long break').duration;
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
  validateForm();
  saveSettings();
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
      <div class="time">
        <NumberInputWithSpinner
          label="pomodoro"
          v-model="settings.duration.pomodoro"
          :min="findMode('pomodoro').min"
          :max="findMode('pomodoro').max"
        />
        <NumberInputWithSpinner
          label="short break"
          v-model="settings.duration.shortBreak"
          :min="findMode('short break').min"
          :max="findMode('short break').max"
        />
        <NumberInputWithSpinner
          label="long break"
          v-model="settings.duration.longBreak"
          :min="findMode('long break').min"
          :max="findMode('long break').max"
        />
      </div>
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
  .time {
    display: flex;
    gap: 20px;
    div {
      flex: 1 1 0;
    }
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

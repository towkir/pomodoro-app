import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePomodoroStore = defineStore('pomodoro', () => {
  const selectedMode = ref({ name: 'pomodoro', duration: 25, min: 15, max: 40 });
  const selectedColor = ref('begonia');
  const selectedFont = ref('sans');
  const modes = ref([
    { name: 'pomodoro', duration: 25, min: 15, max: 40 }, // in minutes;
    { name: 'short break', duration: 5, min: 2, max: 10 },
    { name: 'long break', duration: 15, min: 10, max: 20 },
  ]);
  const colors = ref(['begonia', 'teal', 'purple']);
  const fonts = ref(['sans', 'serif', 'mono']);
  function selectMode(modeName) {
    selectedMode.value = modes.value.find(item => item.name === modeName);
  }
  function updateDuration(modeName, duration) {
    modes.value.find(item => item.name === modeName).duration = duration;
  }
  function selectColor(color) {
    selectedColor.value = color;
  }
  function selectFont(font) {
    selectedFont.value = font;
  }

  return { selectedMode, selectedColor, selectedFont, modes, colors, fonts, selectMode, updateDuration, selectColor, selectFont }
})

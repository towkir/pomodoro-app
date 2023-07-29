<script setup>
import TheModal from "@/components/common/TheModal.vue";

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
</script>

<template>
<TheModal
  id="settings-modal"
  title="Settings"
  ok-text="Apply"
  @ok="applySettings"
>
  <template #body>
    <p>test modal</p>
  </template>
</TheModal>
</template>

<style scoped lang="scss">

</style>

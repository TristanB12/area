<template>
  <div>
    <img
      class="landingText"
      src="@/assets/LandingText.png"
      alt="Automate your tasks and focus on what is important"
    />
    <img class="landingImage" src="@/assets/Landing.png" alt="Design Image" />
  </div>
  <div class="startedButton">
    <VButton 
    title="Get Started" 
    iconName="arrow.png" />
  </div>
</template>

<script>
import VButton from "@/components/ui/VButton.vue";
export default {
  components: {
    VButton,
  },
};
</script>

<style>
.landingText {
  margin: 50px;
  height: 325px;
}
.landingImage {
  margin-top: 50px;
  height: 450px;
}
.startedButton {
  margin-left: 50px;
}
</style>
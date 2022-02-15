<template>
  <div class="landing">
    <div class="sector">
      <h1 class="landingText">
        Automate your tasks and focus on what is
        <span class="important">important</span>.
      </h1>
      <img class="landingImage" src="@/assets/Landing.png" alt="Design Image" />
    </div>
  </div>
  <div class="startedButton">
    <VButton title="Get Started" iconName="arrow.png" />
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
.landing {
  display: flex;
  justify-content: space-between;
}
.sector {
  display: flex;
  width: 70%;
  margin: auto;
  margin-top: 10px
}
.important {
  color: #f06543;
}
.landingText {
  font-family: var($primary-font);
  font-style: normal;
  font-weight: bold;
  font-size: 64px;
  line-height: 87px;
  letter-spacing: -1px;
}
.landingImage {
  margin-top: 50px;
  min-width: 200px;
  min-height: 200px;
}
.startedButton {
  margin-left: 50px;
}
</style>
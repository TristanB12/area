<template>
    <div class="mobile-app">
        <div class="sector">
            <img class="phone-screen" src="@/assets/Phone.png" alt="Design Image" />
            <div class="right-side">
                <h1 class="mobile-text">
                    Join us on our
                    <span class="important">mobile app</span>.
                </h1>
                <a href="./app-release.apk" class="button">
                    <VButton title="Download app"/>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import VButton from '@/components/ui/VButton.vue';
    export default {
        components: {
            VButton,
        },
    }
</script>

<style lang="scss" scoped>
.mobile-app {
   display: flex;
  justify-content: space-between;
}
.sector {
  display: flex;
  width: 60%;
  margin: auto;
  margin-top: 10px;
}.right-side {
    margin-top: 100px;
}
.important {
  color: #f06543;
}
.phone-screen {
    margin-top: 50px;
  max-height: 600px;
}
.button {
    margin-top: 70px;
}
.mobile-text {
  margin-top: 90px;
  font-family: $primary-font;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 87px;
  letter-spacing: -1px;
}
</style>
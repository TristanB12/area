<template>
  <main>
    <LandingHeader />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script>
import LandingHeader from '@/components/layout/LandingHeader.vue';
export default {
  components: {
    LandingHeader
  },
  created () {
    this.getLocale();
  },
  methods: {
    getLocale() {
      const locale = localStorage.getItem("locale");
      let userLocale = undefined;

      if (locale)
        this.$i18n.locale = locale;
      else if (navigator.language) {
        userLocale = navigator.language.substring(0, 2);
        if (userLocale == 'fr' || 'en')
          this.$i18n.locale = userLocale;
      }
      else
          this.$i18n.locale = 'en';
    }
  },
}
</script>


<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: $secondary-font;
    color: $main-dark;
}
h1, h2, h3, h4, h5, h6 {
    font-family: $primary-font;
}
a {
  text-decoration: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
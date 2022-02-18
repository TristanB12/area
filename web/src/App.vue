<template>
  <main>
    <LandingHeader v-if="!loggedState" />
    <SignedHeader v-else />
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <div :key="route.name">  
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </main>
</template>

<script>
import LandingHeader from '@/components/layout/LandingHeader.vue';
import SignedHeader from '@/components/layout/SignedHeader.vue';
import API from '@/services/api.js';
export default {
  components: {
    LandingHeader,
    SignedHeader,
  },
  computed: {
    loggedState() {
      if (this.$store.state.token)
        return true;
      return false;
    }
  },
  async created () {
    this.getLocale();
    this.storeToken();
    await this.getUSer();
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
    },
    storeToken() {
      const token = localStorage.getItem('access_token');

      if (token) {
        this.$store.state.token = token;
      }
    },
    async getUSer() {
      if (!this.$store.state.token) return;
      let res = await API.getUserInfos();

      if (res[0]) {
          this.$store.state.user = res[0];
      }
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
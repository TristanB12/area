<template>
  <AppPageContainer :title="$t('pages.explore.title')">
    <div class="searchBar">
      <VSearchBar
        :placeholder="$t('pages.areas.search')"
        :searchItems="allServices"
        v-model="servicesToDisplay"
      />
    </div>
    <div class="iconSet">
      <img class="icon" src="@/assets/snapchat.png" alt="snapchat" />
      <img class="icon" src="@/assets/spotify.png" alt="spotify" />
      <img class="icon" src="@/assets/youtube.png" alt="youtube" />
      <img class="icon" src="@/assets/outlook.png" alt="outlook" />
      <img class="icon" src="@/assets/intranet.png" alt="intranet - Epitech" />
      <img class="icon" src="@/assets/gmail.png" alt="gmail" />
      <img class="icon" src="@/assets/reddit.png" alt="reddit" />
      <img class="icon" src="@/assets/twitter.png" alt="twitter" />
      <img class="icon" src="@/assets/vinted.png" alt="vinted" />
      <img class="icon" src="@/assets/orange.png" alt="orange" />
    </div>
  </AppPageContainer>
</template>

<script>
import AppPageContainer from "@/components/layout/AppPageContainer.vue";
import VSearchBar from "@/components/ui/VSearchBar.vue";
export default {
  components: {
    AppPageContainer,
    VSearchBar,
  },
  data() {
    return {
      servicesToDisplay: undefined,
    };
  },
  computed: {
    allServices() {
      return this.$store.state.services;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.searchBar {
    width: fit-content;
    margin-top: 10px;
}
.iconSet {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: auto;
  margin-top: 10px;
  flex-wrap: wrap;
}
.icon {
  margin: 30px;
}
</style>
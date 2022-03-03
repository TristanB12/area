<template>
    <AppPageContainer :title="$t('pages.apps.title')">
        <nav>
            <VSearchBar
            class="searchBar"
                :placeholder="$t('pages.areas.search')"
                :searchItems="areas"
                v-model="searchedAreas"
            />
        </nav>
        <div class="areas-container">
            <AreaComponent
            v-for="area in searchedAreas"
            :key="area._id"
            :infos="area" />
        </div>
    </AppPageContainer>
</template>

<script>
import VSearchBar from '@/components/ui/VSearchBar.vue';
import AreaComponent from '@/components/AreaComponent.vue';
import API from '@/services/api.js';
import AppPageContainer from '@/components/layout/AppPageContainer.vue'; 
    export default {
        components: {
            AppPageContainer,
            VSearchBar,
            AreaComponent
        },
        data() {
            return {
            areas: undefined,
            searchedAreas: undefined
            }
        },
        mounted() {
            this.loadUserAreas();
        },
        methods: {
            async loadUserAreas() {
                let res = await this.$store.state.user.linked_services //await API.getUserAreas();

                if (res[0]) {
                    this.areas = res[0];
                    this.searchedAreas = res[0];
                }
                console.log(this.searchedAreas);
            },
            async getUserAreas() {
                let res = await API.getUserAreas();

                if (res[0]) {
                    this.areas = res[0];
                    this.searchedAreas = res[0]
                }
                    console.log(this.searchedAreas);
            }
        }
    }
</script>

<style lang="scss" scoped>
.searchBar {
    width: fit-content;
    margin-top: 10px;
}
</style>
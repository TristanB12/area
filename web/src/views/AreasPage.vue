<template>
    <AppPageContainer :title="$t('pages.areas.title')">
        <nav>
            <VSearchBar
                :placeholder="$t('pages.areas.search')"
                :searchItems="areas"
                v-model="searchedAreas"
            />
            <VButton
                :title="$t('pages.areas.create')"
                @click="$router.push({name: 'AddAreaPage'})"
            />
        </nav>
        <div class="areas-container">
            <AreaPreview
                v-for="area in searchedAreas"
                :key="area._id"
                :infos="area"
            />
        </div>
    </AppPageContainer>
</template>

<script>
import VSearchBar from '@/components/ui/VSearchBar.vue';
import VButton from '@/components/ui/VButton.vue';
import AppPageContainer from '@/components/layout/AppPageContainer.vue';
import AreaPreview from '@/components/AreaPreview.vue';
import API from '@/services/api.js';
    export default {
        components: {
            AppPageContainer,
            VButton,
            VSearchBar,
            AreaPreview
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
                let res = await API.getUserAreas();

                if (res[0]) {
                    this.areas = res[0];
                    this.searchedAreas = res[0]
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
nav {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
}
.areas-container {
    margin-top: 50px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .area {
        width: 48%;
        margin: 15px 0;
    }
}
</style>
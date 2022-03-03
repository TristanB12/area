<template>
    <AppPageContainer :title="$t('pages.areas.title')">
        <nav v-if="areas && areas.length > 0">
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
        <div class="areas-container" v-if="areas && areas.length > 0">
            <AreaPreview
                v-for="area in searchedAreas"
                :key="area._id"
                :infos="area"
                @delete-area="loadUserAreas"
            />
        </div>
        <div class="error-container" v-else>
            <h4 class="subtitle">{{ $t('pages.areas.noArea') }}</h4>
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
                    this.areas = res[0].data;
                    this.searchedAreas = res[0].data;
                }
            },
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
.error-container {
    margin-top: 20vh;
    text-align: center;
}
</style>
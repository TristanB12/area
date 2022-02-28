<template>
    <div id="application">
        <NavigationBar />
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <div class="content-container"  v-if="$store.state.user">
                    <component :is="Component"/>
                </div>
                <div class="spinner-container" v-else>
                    <GridLoader
                        :loading="true"
                        :color="'#F06543'"
                        :size="'50px'"
                    />
                </div>
            </transition>
        </router-view>
    </div>
</template>

<script>
import GridLoader from 'vue-spinner/src/GridLoader.vue'
import NavigationBar from '@/components/layout/NavigationBar.vue';
import API from '@/services/api.js';
    export default {
        components: {
            NavigationBar,
            GridLoader
        },
        async created() {
            await this.getServices();
            await this.getUser();
        },
        methods: {
            async getServices() {
                let res = await API.getServices();

                if (res[0]) {
                    this.$store.state.services = res[0];
                }
            },
            async getUser() {
                let res = await API.getUserInfos();

                if (res[0]) {
                    this.$store.state.user = res[0];
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
#application {
    display: flex;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.content-container {
    width: 100%;
}
.spinner-container {
    margin: auto;
    height: calc(75vh - 75px);
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
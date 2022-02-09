<template>
    <div id="application">
        <NavigationBar />
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <div class="content-container">
                    <component :is="Component" />
                </div>
            </transition>
        </router-view>
    </div>
</template>

<script>
import NavigationBar from '@/components/layout/NavigationBar.vue';
    export default {
        components: {
            NavigationBar
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
</style>
<template>
    <aside>
        <router-link :to="{name: 'AddAreaPage'}">
            <VButton iconName="add_icon.png" />
        </router-link>
        <nav>
            <router-link :to="{name: 'AreasPage'}">
                <img src="../../assets/areas_icon.svg" alt="areas">
            </router-link>
            <router-link :to="{name: 'AppsPage'}">
                <img src="../../assets/apps_icon.svg" alt="apps">
            </router-link>
            <router-link :to="{name: 'ExplorePage'}">
                <img src="../../assets/explore_icon.svg" alt="explore">
            </router-link>
        </nav>
    </aside>
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
aside {
    width: 75px;
    height: calc(100vh - 75px);
    border-right:  1px solid rgba(47, 46, 65, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
}
img {
    filter: brightness(0) saturate(100%) invert(14%) sepia(21%) saturate(883%) hue-rotate(204deg) brightness(94%) contrast(87%);
}
nav {
    display: flex;
    flex-direction: column;
}
a {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;margin: 20px 0;
}
button {
    margin: 20px 0;
}
nav .router-link-active {
    background-color: #3773ff10;
    border-radius: 9px;

    img {
        filter: invert(42%) sepia(63%) saturate(4592%) hue-rotate(212deg) brightness(100%) contrast(102%);
    }
}
</style>
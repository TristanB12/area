<template>
    <div class="mobile-app">
        <a href="../build/outputs/apk/release/app-release.apk">
            <VButton title="Download app"/>
        </a>
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
    width: 200px;
    margin: auto;
    margin-top: 20vh;
}
</style>
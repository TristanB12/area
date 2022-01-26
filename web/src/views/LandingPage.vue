<template>
    <h1>dgfygj</h1>
    <VButton
        :title="variable"
        iconName="french_flag_icon.png"
    />
</template>

<script>
import VButton from '@/components/ui/VButton.vue';
export default {
    components: {
        VButton
    },
    data() {
        return {
            variable: "toto"
        }
    },
}
</script>

<style>

</style>
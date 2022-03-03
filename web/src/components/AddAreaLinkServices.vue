<template>
    <div class="link-services">
        <h2 class="heading-02">{{ $t('pages.add.finalize.services') }}</h2>
        <LinkServiceButton :service="area.action" />
        <LinkServiceButton :service="area.reaction" />
    </div>
</template>

<script>
import LinkServiceButton from '@/components/LinkServiceButton.vue';
    export default {
        components: {
            LinkServiceButton,
        },
        props: {
            area: {
                type: Object,
                default: undefined
            },
        },
    }
</script>

<style lang="scss" scoped>
.link-services {
    width: 40%;
}
h2 {
    margin-bottom: 40px;
}
.service-button {
    margin: 40px 0;
}
</style>
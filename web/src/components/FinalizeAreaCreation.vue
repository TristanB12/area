<template>
    <div class="finalize">
        <AddAreaLinkServices :area="area" />
        <AddAreaOptions @options-changed="manageOptionsChanged" />
    </div>
</template>

<script>
import AddAreaLinkServices from '@/components/AddAreaLinkServices.vue';
import AddAreaOptions from '@/components/AddAreaOptions.vue';
    export default {
        components: {
            AddAreaLinkServices,
            AddAreaOptions
        },
        props: {
            area: {
                type: Object,
                default: undefined
            },
        },
        methods: {
            manageOptionsChanged(inputs) {
                this.$emit('finalize-change', inputs.title, inputs.description);
            }
        },
    }
</script>

<style lang="scss" scoped>
.finalize {
    display: flex;
}
.link-services {
    margin-right: 20%;
}
</style>
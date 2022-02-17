<template>
    <AppPageContainer :title="title" width="80%">
        <AddAreaContainer v-model="step">
            <component :is="currentComponent"></component>
        </AddAreaContainer>
    </AppPageContainer>
</template>

<script>
import AppPageContainer from '@/components/layout/AppPageContainer.vue';
import AddAreaAction from '@/components/AddAreaAction.vue';
import AddAreaReaction from '@/components/AddAreaReaction.vue';
import AddAreaContainer from '@/components/AddAreaContainer.vue';
    export default {
        components: {
            AppPageContainer,
            AddAreaAction,
            AddAreaReaction,
            AddAreaContainer
        },
        computed: {
            title() {
                if (this.step == 'action') {
                    return '1. ' + this.$t('pages.add.action.title');
                } else {
                    return '2. ' + this.$t('pages.add.reaction.title');
                }
            },
            currentComponent() {
                if (this.step == 'action') {
                    return 'AddAreaAction';
                } else {
                    return 'AddAreaReaction';
                }
            }
        },
        data() {
            return {
                step: 'action'
            }
        },
    }
</script>

<style lang="scss" scoped>
.add {
    width: 80%;
    margin: auto;
}
.adder-container {
    margin-top: 5vh;
}
</style>
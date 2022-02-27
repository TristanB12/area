<template>
    <AppPageContainer :title="stepTitle" width="80%">
        <AddAreaContainer
            v-model="step"
            :disabled="isButtonDisabled"
            @step-changed="isButtonDisabled = true"
        >
            <component
                :area="area"
                :is="currentComponent"
                @action-change="ManageActionChange"
                @reaction-change="ManageReactionChange"
                @finalize-change="ManageFinalizeChange"
            />
        </AddAreaContainer>
    </AppPageContainer>
</template>

<script>
import AppPageContainer from '@/components/layout/AppPageContainer.vue';
import AddAreaAction from '@/components/AddAreaAction.vue';
import AddAreaReaction from '@/components/AddAreaReaction.vue';
import AddAreaContainer from '@/components/AddAreaContainer.vue';
import FinalizeAreaCreation from '@/components/FinalizeAreaCreation.vue';
    export default {
        components: {
            AppPageContainer,
            AddAreaAction,
            AddAreaReaction,
            AddAreaContainer,
            FinalizeAreaCreation
        },
        data() {
            return {
                step: 'action',
                isButtonDisabled: true,
                area: {
                    action: undefined,
                    reaction: undefined,
                    title: undefined,
                    description: undefined
                }
            }
        },
        computed: {
            stepTitle() {
                if (this.step == 'action') {
                    return '1. ' + this.$t('pages.add.action.title');
                } else if (this.step == 'reaction') {
                    return '2. ' + this.$t('pages.add.reaction.title');
                } else {
                    return '3 ' + this.$t('pages.add.finalize.title');
                }
            },
            currentComponent() {
                if (this.step == 'action') {
                    return 'AddAreaAction';
                } else if (this.step == 'reaction') {
                    return 'AddAreaReaction';
                } else {
                    return 'FinalizeAreaCreation'
                }
            }
        },
        methods: {
            ManageActionChange(...args) {
                let [isSelected, action] = args;

                this.isButtonDisabled = !isSelected;
                this.area.action = action;
            },
            ManageReactionChange(...args) {
                let [isSelected, reaction] = args;

                this.isButtonDisabled = !isSelected;
                this.area.reaction = reaction;
            },
            ManageFinalizeChange(...args) {
                let [title, description] = args;

                console.log(description);
                this.area.title = title;
                this.area.description = description;
                if (title && title.length > 0) {
                    this.isButtonDisabled = false;
                } else {
                    this.isButtonDisabled = true;
                }
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
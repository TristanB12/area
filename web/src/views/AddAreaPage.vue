<template>
    <AppPageContainer :title="stepTitle" width="80%">
        <AddAreaContainer
            v-model="step"
            :disabled="isButtonDisabled"
            @step-changed="isButtonDisabled = true"
            @add-area="addArea"
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
import API from '../services/api.js';
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
            isConnected(serviceToCheck) {
                let linkedServices = this.$store.state.user.linked_services;

                for (let service of linkedServices) {
                    if (service.toLowerCase() == serviceToCheck.toLowerCase()) {
                        return true;
                    }
                    if (['youtube', 'gmail', 'google'].includes(serviceToCheck) && service.toLowerCase() == 'google')
                        return true;
                }
                return false;
            },
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
                const {action, reaction} = this.area;

                this.area.title = title;
                this.area.description = description;
                if (title && title.length > 0) {
                    if (this.isConnected(action.service.name) && this.isConnected(reaction.service.name)) {
                        this.isButtonDisabled = false;
                    } else {
                        this.isButtonDisabled = true;
                    }
                } else {
                    this.isButtonDisabled = true;
                }
            },
            async addArea() {
                let data = {
                    title: this.area.title,
                    description: this.area.description,
                    action: {
                        'service.name': this.area.action.service.name,
                        tag: this.area.action.tag,
                        config: this.area.action.config || null
                    },
                    reaction: {
                        'service.name': this.area.reaction.service.name,
                        tag: this.area.reaction.tag,
                        config: this.area.reaction.config || null
                    }
                };
                let res = await API.createArea(data);

                if (res[0]) {
                    this.$router.push({name: 'AreasPage'});
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
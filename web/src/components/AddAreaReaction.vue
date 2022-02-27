<template>
    <div class="reaction-adder">
        <div class="container">
            <div class="header">
                <span>
                    <h2 class="heading-02">{{ $t('pages.add.reaction.chooseApp.title') }}</h2>
                    <p class="small">{{ $t('pages.add.reaction.chooseApp.description') }}</p>
                </span>
                <VSearchBar
                    :placeholder="$t('pages.areas.search')"
                    :searchItems="allServices"
                    v-model="servicesToDisplay"
                    :searchFunction="(items, string) => items.filter(item => item.name.toLowerCase().includes(string))"
                />
            </div>
            <ScrollContainer height="300px">
                <ServicePreview
                    v-for="service in servicesToDisplay || allServices"
                    :key="service.name"
                    :service="service"
                    :selected="service.name == serviceSelected"
                    @click="manageServiceSelected(service)"
                />
            </ScrollContainer>
        </div>
        <div class="container">
            <div class="header">
                <span>
                    <h2 class="heading-02">{{ $t('pages.add.reaction.chooseReaction.title') }}</h2>
                    <p class="small">{{ $t('pages.add.reaction.chooseReaction.description') }}</p>
                </span>
            </div>
            <ScrollContainer
                height="200px"
                v-if="serviceSelected"
                flexDirection="row"
            >
                <EventPreview
                    v-for="reaction in reactions"
                    :key="reaction.title"
                    :event="reaction"
                    :selected="isReactionSelected(reaction)"
                    @click="manageReactionSelected(reaction)"
                />
            </ScrollContainer>
            <EventConfiguration
                v-if="reactionSelected && reactionSelected.config"
                :config="reactionSelected.config"
                @configuration-changed="manageConfigurationChanged"
            />
        </div>
    </div>
</template>

<script>
import EventConfiguration from '@/components/EventConfiguration.vue';
import ScrollContainer from '@/components/layout/ScrollContainer.vue';
import VSearchBar from '@/components/ui/VSearchBar.vue';
import ServicePreview from '@/components/ServicePreview.vue';
import EventPreview from '@/components/EventPreview.vue';
    export default {
        components: {
            VSearchBar,
            ScrollContainer,
            ServicePreview,
            EventPreview,
            EventConfiguration
        },
        data() {
            return {
                serviceSelected: undefined,
                reactionSelected: undefined,
                servicesToDisplay: undefined
            }
        },
        computed: {
            allServices() {
                return this.$store.state.services; 
            },
            reactions() {
                if (!this.serviceSelected) return undefined;

                let services = [...this.allServices];

                let reactionService = services.find(item => item.name == this.serviceSelected);
                for (let reaction of reactionService.reactions) {
                    reaction.logoUri = reactionService.logoUri;
                }
                return reactionService.reactions;
            }
        },
        methods: {
            isReactionSelected(reaction) {
                if (!this.reactionSelected) return false;
                if (reaction.title == this.reactionSelected.title) {
                    return true;
                } else {
                    return false;
                }
            },
            manageReactionSelected(reaction) {
                this.reactionSelected = reaction;

                if (!reaction.config) {
                    this.$emit('reaction-change', true, {service: this.serviceSelected, ...reaction});
                } else {
                    this.$emit('reaction-change', false, undefined);
                }
            },
            manageServiceSelected(service) {
                this.serviceSelected = service.name;
                this.$emit('reaction-change', false, undefined);
            },
            manageConfigurationChanged(...args) {
                let [isFilled, config] = args;

                this.reactionSelected.config = config;
                if (isFilled) {
                    this.$emit('reaction-change', true, {service: this.serviceSelected, ...this.reactionSelected});
                } else {
                    this.$emit('reaction-change', false, undefined);
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.reaction-adder {
    display: flex;
    justify-content: space-between;
}
.header {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.container {
    width: 48%;
}
</style>
<template>
    <div class="action-adder" v-if="this.$store.state.services">
        <div class="container">
            <div class="header">
                <span>
                    <h2 class="heading-02">{{ $t('pages.add.action.chooseApp.title') }}</h2>
                    <p class="small">{{ $t('pages.add.action.chooseApp.description') }}</p>
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
                    <h2 class="heading-02">{{ $t('pages.add.action.chooseTrigger.title') }}</h2>
                    <p class="small">{{ $t('pages.add.action.chooseTrigger.description') }}</p>
                </span>
            </div>
            <ScrollContainer
                height="200px"
                v-if="serviceSelected"
                flexDirection="row"
            >
                <EventPreview
                    v-for="trigger in triggers"
                    :key="trigger.title"
                    :event="trigger"
                    :selected="isTriggerSelected(trigger)"
                    @click="manageTriggerSelected(trigger)"
                />
            </ScrollContainer>
            <EventConfiguration
                v-if="triggerSelected && triggerSelected.config"
                :config="triggerSelected.config"
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
                triggerSelected: undefined,
                servicesToDisplay: undefined
            }
        },
        computed: {
            allServices() {
                let  services = [];

                for (let service of this.$store.state.services) {
                    if (service.actions && service.actions.length > 0) {
                        services.push(service);
                    }
                }
                return services; 
            },
            triggers() {
                if (!this.serviceSelected) return undefined;

                let services = [...this.allServices];

                let triggerService = services.find(item => item.name == this.serviceSelected);
                for (let trigger of triggerService.actions) {
                    trigger.logoUri = triggerService.logoUri;
                }
                return triggerService.actions;
            }
        },
        methods: {
            isTriggerSelected(trigger) {
                if (!this.triggerSelected) return false;
                if (trigger.title == this.triggerSelected.title) {
                    return true;
                } else {
                    return false;
                }
            },
            manageTriggerSelected(trigger) {
                this.triggerSelected = trigger;

                if (!trigger.config) {
                    this.$emit('action-change', true, {service: this.serviceSelected, ...trigger});
                } else {
                    this.$emit('action-change', false, undefined);
                }
            },
            manageServiceSelected(service) {
                this.serviceSelected = service.name;
                this.$emit('action-change', false, undefined);
            },
            manageConfigurationChanged(...args) {
                let [isFilled, config] = args;

                this.triggerSelected.config = config;
                if (isFilled) {
                    this.$emit('action-change', true, {service: this.serviceSelected, ...this.triggerSelected});
                } else {
                    this.$emit('action-change', false, undefined);
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.action-adder {
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
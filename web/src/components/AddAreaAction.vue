<template>
    <div class="action-adder">
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
                    @click="serviceSelected = service.name"
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
                    :selected="trigger.title == triggerSelected"
                    @click="triggerSelected = trigger.title"
                />
            </ScrollContainer>
        </div>
    </div>
</template>

<script>
import ScrollContainer from '@/components/layout/ScrollContainer.vue';
import VSearchBar from '@/components/ui/VSearchBar.vue';
import ServicePreview from '@/components/ServicePreview.vue';
import EventPreview from '@/components/EventPreview.vue';
    export default {
        components: {
            VSearchBar,
            ScrollContainer,
            ServicePreview,
            EventPreview
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
                return this.$store.state.services; 
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
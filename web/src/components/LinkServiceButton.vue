<template>
    <div class="service-button">
        <div class="service">
            <img :src="service.logoUri" alt="">
            <h4 class="subtitle">{{ service.service }}</h4>
        </div>
        <div class="connected-state">
            <span v-if="isConnected"  class="button">{{ $t('pages.add.finalize.connected') }}</span>
            <VButton
                v-else
                :title="$t('pages.add.finalize.connect')"
            />
        </div>
    </div>
</template>

<script>
import VButton from '@/components/ui/VButton.vue';
    export default {
        components: {
            VButton,
        },
        props: {
            service: {
                type: Object,
                default: undefined
            },
        },
        computed: {
            isConnected() {
                let linkedServices = this.$store.state.user.linked_services;

                for (let service of linkedServices) {
                    if (service.toLowerCase() == this.service.service.toLowerCase()) {
                        return true;
                    }
                }
                return false;
            }
        },
    }
</script>

<style lang="scss" scoped>
.service-button {
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 6px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
}
img {
    max-width: 40px;
}
.service {
    display: flex;
    align-items: center;

    img {
        margin-right: 20px;
    }
}
.connected-state span {
    color: $success;
}
</style>
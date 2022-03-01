<template>
    <div class="service-button">
        <div class="service">
            <img :src="service.logoUri" alt="">
            <h4 class="subtitle">{{ service.service.name }}</h4>
        </div>
        <div class="connected-state">
            <span v-if="isConnected"  class="button">{{ $t('pages.add.finalize.connected') }}</span>
            <VButton
                v-else
                :title="$t('pages.add.finalize.connect')"
                @click="linkAccount"
            />
        </div>
    </div>
</template>

<script>
import VButton from '@/components/ui/VButton.vue';
import API from '@/services/api.js';
import { functionsTable } from '@/services/index.js';
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
                    console.log(service, this.service.service.name)
                    if (service.toLowerCase() == this.service.service.name.toLowerCase()) {
                        return true;
                    }
                    console.log(service, );
                    if (['youtube', 'gmail', 'google'].includes(this.service.service.name) && service.toLowerCase() == 'google')
                        return true;
                }
                return false;
            }
        },
        methods: {
            linkAccount() {
                let func = functionsTable[this.service.service.name.toLowerCase()];

                if (!func) return;
                let win = func('link');
                const timer = setInterval(async () => {
                    if (win.closed) {
                        clearInterval(timer);
                        let res = await API.getUserInfos();

                        if (res[0]) {
                            this.$store.state.user = res[0];
                        }
                    }
                }, 500);
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
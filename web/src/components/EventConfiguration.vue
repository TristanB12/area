<template>
    <div class="configuration">
        <div class="title-container">
            <h2 class="heading-02">{{ $t('pages.add.configuration.title') }}</h2>
            <p class="small">{{ $t('pages.add.configuration.description') }}</p>
        </div>
        <div class="inputs-container">
            <div
                class="input"
                v-for="(item, name) in config"
                :key="name"
            >
                <h3 class="subtitle">{{ name }}</h3>
                <VInput v-model="config[name].value" :type="item.type" fontSize="15px" />
            </div>
        </div>
    </div>
</template>

<script>
import VInput from '@/components/ui/VInput.vue';
    export default {
        props: {
            config: {
                type: Object,
                default: undefined
            },
        },
        components: {
            VInput,
        },
        updated () {
            this.manageChanges();
        },
        methods: {
            manageChanges() {
                let isConfigFilled = true;

                for (let [name, item] of Object.entries(this.config)) {
                    if (item.value.length < 1) {
                        isConfigFilled = false;
                    }
                }
                if (isConfigFilled) {
                    this.$emit('configuration-changed', true, this.config);
                } else {
                    this.$emit('configuration-changed', false, this.config);
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.configuration {
    margin-top: 40px;
    padding: 15px;
    border: 1px solid rgba(47, 46, 65, 0.2);
    border-radius: 6px;
}
.inputs-container {
    margin-top: 20px;
}
.input {
    margin-top: 10px;
}
</style>
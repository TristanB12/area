<template>
    <div class="adder-container">
        <slot></slot>
        <div class="button-container">
            <VButton
                :title="buttonTitle"
                @click="handleChange"
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
            modelValue: {
                type: String,
                default: "action"
            }
        },
        computed: {
            buttonTitle() {
                if (this.modelValue == 'action') {
                    return this.$t('pages.add.next');
                } else {
                    return this.$t('pages.add.create');
                }
            }
        },
        methods: {
            handleChange(e) {
                const newStep = this.modelValue == 'action' ? 'reaction' : 'finished';
                this.$emit('update:modelValue', newStep);
            }
        },
    }
</script>

<style lang="scss" scoped>
.adder-container {
    width: 100%;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
}
.button-container {
    width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
}
</style>
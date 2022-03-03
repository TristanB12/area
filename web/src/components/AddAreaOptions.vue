<template>
    <div>
        <h2 class="heading-02">{{ $t('pages.add.finalize.options.title') }}</h2>
        <div class="input-container">
            <h4 class="subtitle">{{ $t('pages.add.finalize.options.areaName.title') }}</h4>
            <VInput
                type="text"
                :placeholder="$t('pages.add.finalize.options.areaName.placeholder')"
                v-model="title"
            />
        </div>
        <div class="input-container">
            <h4 class="subtitle">{{ $t('pages.add.finalize.options.description.title') }}</h4>
            <VInput
                type="textarea"
                :placeholder="$t('pages.add.finalize.options.description.placeholder')"
                v-model="description"
            />
        </div>
    </div>
</template>

<script>
import VInput from '@/components/ui/VInput.vue';
    export default {
        components: {
            VInput,
        },
        data() {
            return {
                title: '',
                description: ''
            }
        },
        updated () {
            this.$emit('options-changed', {title: this.title, description: this.description});
        },
    }
</script>

<style lang="scss" scoped>
h2 {
    margin-bottom: 20px;
}
.input-container {
    margin: 20px 0;
}
</style>
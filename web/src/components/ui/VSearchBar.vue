<template>
    <div class="search-bar">
        <VInput
            type="text"
            :placeholder="placeholder"
            @input-updated="handleSearch"
        />
        <div class="search-button">
            <img src="../../assets/search_icon.png"/>
        </div>
    </div>
</template>

<script>
import VInput from '@/components/ui/VInput.vue';
    export default {
        components: {
            VInput
        },
        props: {
            placeholder: {
                type: String,
                default: ""
            },
            searchItems: {
                type: Array,
                default: []
            },
            modelValue: {
                type: Array,
                default: []
            }
        },
        methods: {
            handleSearch(e) {
                let searchedItems = this.searchItems.filter(item => item.title.toLowerCase().includes(e));

                this.$emit('update:modelValue', searchedItems);
            }
        },
    }
</script>

<style lang="scss" scoped>
.search-bar {
    border-radius: 3px;
    border: 1px solid $main-blue;
    display: flex;
}
.search-button {
    background-color: $main-blue;
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
        margin: 0 15px;
        max-width: 25px;
        max-height: 25px;
    }
}
</style>
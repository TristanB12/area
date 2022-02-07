<template>
    <button class="button">
        <span v-if="title && !isLoading">{{ title }}</span>
        <ClipLoader
            v-else
            size="24px"
            color="white"
        />
        <img v-if="iconName && !isLoading" :src="imagePath" :alt="iconName">
    </button>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
    export default {
        components: {
            ClipLoader,
        },
        props: {
            title: {
                type: String,
                default: null
            },
            iconName: {
                type: String,
                default: null
            },
            isLoading: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            imagePath() {
                return require(`../../assets/${this.iconName}`);
            }
        },
    }
</script>

<style lang="scss" scoped>
button {
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $main-orange;
    border: none;
    border-radius: 7px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    transition-duration: 200ms;

    &:hover {
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.40);
    }
}
span {
    color: white;
}
</style>
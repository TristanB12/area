<template>
    <div>
        <img :src="event.logoUri" alt="">
        <span class="body">{{ event.title }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            event: {
                type: Object,
                default: undefined
            },
            selected: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            borderColor() {
                return this.selected ? "#3772FF" : "#C8C8C8" 
            }
        },
    }
</script>

<style lang="scss" scoped>
div {
    width: 100%;
    height: min-content;
    padding: 10px;
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    border: 1px solid v-bind(borderColor);
    background-color: white;
    cursor: pointer;
}
img {
    margin: 0 10%;
    max-width: 25px;
}
</style>
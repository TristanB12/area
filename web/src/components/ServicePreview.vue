<template>
    <div>
        <img :src="service.logoUri" alt="">
        <span class="small">{{ service.name }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            service: {
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
    width: 95px;
    height: 95px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    border: 1px solid v-bind(borderColor);
    background-color: white;
    cursor: pointer;
}
img {
    max-width: 40px;
}
</style>
<template>
    <div class="scroll-container">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            height: {
                type: String,
                default: "250px"
            },
            flexDirection: {
                type: String,
                default: "row"
            }
        },
    }
</script>

<style lang="scss" scoped>
.scroll-container {
    padding: 15px;
    height: v-bind(height);
    display: flex;
    flex-direction: v-bind(flexDirection);
    flex-wrap: wrap;
    border-radius: 5px;
    background-color: #F4F4F4;
    overflow-y: scroll;
    border: 1px solid #adadad;

    & ::v-deep div {
        margin: 10px;
    }
}
</style>
<template>
    <section>
        <h1 class="heading-01">{{ title }}</h1>
        <slot></slot>
    </section>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ""
            },
            width: {
                type: String,
                default: "70%"
            }
        }
    }
</script>

<style lang="scss" scoped>
section {
    width: v-bind(width);
    margin: auto;
    margin-top: 10vh;
}
</style>
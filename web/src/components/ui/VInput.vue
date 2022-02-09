<template>
    <div>
        <input
            :type="type"
            :placeholder="placeholder"
            :style="styleObject"
            v-model="input"
        >
        <img v-if="iconName" :src="imagePath" alt="iconName">
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: "text"
            },
            placeholder: {
                type: String,
                default: ""
            },
            iconName: {
                type: String,
                default: null
            },
            width: {
                type: String,
                default: undefined
            },
            fontSize: {
                type: String,
                default: undefined
            },
            model: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                input: this.model
            }
        },
        computed: {
            styleObject() {
                let style = {};
                if (this.width)
                    style.width = this.width;
                if (this.iconName) {
                    style.textIndent = "35px";
                }
                style.fontSize = this.fontSize;
                return style;
            },
            imagePath() {
                return require(`../../assets/${this.iconName}`);
            }
        },
        beforeUpdate () {
            this.sendInput();
        },
        methods: {
            sendInput() {
                this.$emit('input-updated', this.input);
            }
        },
    }
</script>

<style lang="scss" scoped>
input {
    padding: 12px;
    font-size: 20px;
    font-weight: 600;
    background-color: #F4F4F4;
    color: $main-dark;
    border: none;
    border-radius: 3px;
    outline: none;

    &::placeholder {
        color: #6F6F6F;
        font-family: $secondary-font;
        font-size: 16px;
        font-weight: 300;
        letter-spacing: 1px;
    }
}
img {
    width: 20px;
    position: absolute;
    margin-left: 10px;
}
</style>
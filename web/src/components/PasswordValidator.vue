<template>
    <div id="password-validator">
        <div class="container">
            <img :src="charactersImg" />
            <span class="small">{{$t('auth.validator.characters')}}</span>
        </div>
        <div class="container">
            <img :src="hasNumberImg" />
            <span class="small">{{$t('auth.validator.number')}}</span>
        </div>
        <div class="container">
            <img :src="hasSpecialCharacterImg" />
            <span class="small">{{$t('auth.validator.specialCharacter')}}</span>
        </div>
        <div class="container">
            <img :src="arePasswordIdenticalImg" />
            <span class="small">{{$t('auth.validator.passwordIdentical')}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            password: {
                type: String,
                default: undefined
            },
            confirmPassword: {
                type: String,
                default: undefined
            }
        },
        computed: {
            charactersImg() {
                let state = 'grey';

                if (this.charactersAreValid()) {
                    state = "green";
                }
                return require(`../assets/${state}_checked_icon.png`);
            },
            hasNumberImg() {
                let state = 'grey';

                if (this.hasNumber()) {
                    state = "green";
                }
                return require(`../assets/${state}_checked_icon.png`);
            },
            hasSpecialCharacterImg() {
                let state = 'grey';

                if (this.hasSpecialCharacter()) {
                    state = "green";
                }
                return require(`../assets/${state}_checked_icon.png`);
            },
            arePasswordIdenticalImg() {
                let state = 'grey';

                if (this.arePasswordIdentical()) {
                    state = "green";
                }
                return require(`../assets/${state}_checked_icon.png`);
            },
        },
        updated () {
            this.emitValidator();
        },
        methods: {
            charactersAreValid() {
                return (this.password.length > 6 && this.password.length < 42);
            },
            hasNumber() {
                return /\d/.test(this.password);
            },
            hasSpecialCharacter() {
                let format = /[ `!@#$%^&*()_+\-=!\[\]{};':"\\|,.<>\/?~]/;

                return format.test(this.password);
            },
            arePasswordIdentical() {
                return (this.password === this.confirmPassword);
            },
            emitValidator() {
                if  (this.charactersAreValid() && this.hasNumber() && this.hasSpecialCharacter() && this.arePasswordIdentical()) {
                    this.$emit('validator-state', true);
                } else {
                    this.$emit('validator-state', false);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
#password-validator {
    width: 270px;
    padding: 10px;
    position: absolute;
    left: -80%;
    top: 50%;
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
    border-radius: 9px;


    .container {
        margin: 5px !important;
        width: 90%;
        margin: auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
}
img {
    max-width: 20px;
    margin-right: 10px;
}
</style>
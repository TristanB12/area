<template>
    <div class="register-form">
        <VLightButton
            :title="$t('auth.register.facebook')"
            iconName="facebook_icon.png"
            width="100%"
            :isLoading="isLoading.facebook"
            @click="signupWithFacebook"
        />
        <VLightButton
            :title="$t('auth.register.google')"
            iconName="google_icon.png"
            width="100%"
            :isLoading="isLoading.google"
            @click="signupWithGoogle"
        />
        <div>
            <span class="line"></span>
            <span>{{$t('auth.or')}}</span>
            <span class="line"></span>
        </div>
        <span  class="error" v-if="error" v-html="error"></span>
        <VInput
            type="text"
            :placeholder="$t('auth.email')"
            width="100%"
            iconName="email_icon.png"
            v-model="inputs.email"
        />
        <PasswordValidator
            @validator-state="setValidatorState"
            v-if="inputs.password.length > 0 || inputs.confirmPassword.length > 0"
            :password="inputs.password"
            :confirmPassword="inputs.confirmPassword"
        />
        <VInput
            type="password"
            :placeholder="$t('auth.password')"
            width="100%"
            iconName="password_icon.png"
            v-model="inputs.password"
        />
        <VInput
            type="password"
            :placeholder="$t('auth.confirmPassword')"
            width="100%"
            iconName="password_icon.png"
            v-model="inputs.confirmPassword"
        />
        <VButton
            :title="$t('auth.register.title')"
            width="100%"
            :isLoading="isLoading.signup"
            @click="signupWithEmail"
        />
        <span class="body">{{$t('auth.register.accountSentence') + ' '}}<router-link class="strong" :to="{name: 'LoginPage'}" >{{$t('auth.login.title')}}</router-link></span>
    </div>
</template>

<script>
import {facebookAuthCode, googleAuthCode} from '@/services';
import VLightButton from '@/components/ui/VLightButton.vue';
import PasswordValidator from '@/components/PasswordValidator.vue'
import VInput from '@/components/ui/VInput.vue';
import VButton from '@/components/ui/VButton.vue';
import {signupUser} from '@/services/api.js';
    export default {
        components: {
            VLightButton,
            VButton,
            VInput,
            PasswordValidator
        },
        data() {
            return {
                isLoading: {
                    facebook: false,
                    google: false,
                    signup: false
                },
                inputs: {
                    email: '',
                    password: '',
                    confirmPassword: ''
                },
                error: undefined,
                validatorState: false
            }
        },
        methods: {
            setValidatorState(data) {
                this.validatorState = data;
            },
            signupWithFacebook() {
                this.isLoading.facebook = true;
                let win = facebookAuthCode('signup');
                const timer = setInterval(() => {
                    if (win.closed) {
                        clearInterval(timer);
                        this.$router.push({name: 'AreasPage'});
                        this.$store.state.token = localStorage.getItem('access_token');
                    }
                }, 500);
            },
            signupWithGoogle() {
                this.isLoading.google = true;
                let win = googleAuthCode('signup');
                const timer = setInterval(() => {
                    if (win.closed) {
                        clearInterval(timer);
                        this.$router.push({name: 'AreasPage'});
                        this.$store.state.token = localStorage.getItem('access_token');
                    }
                }, 500);
            },
            async signupWithEmail() {
                if (this.inputs.password.trim() === "" ||
                    this.inputs.confirmPassword.trim() === "" ||
                    this.inputs.email.trim() === "") {
                    return;
                }
                if (this.inputs.password !== this.inputs.confirmPassword) {
                    this.error = "Passwords are not identical.";
                    return;
                }
                this.isLoading.signup = true;
                let res = await signupUser(this.inputs);
                if (res[0]) {
                    this.$store.state.token = res[0].access_token;
                    localStorage.setItem('access_token', res[0].access_token);
                    this.$router.push({name: 'AppPage'});
                }
                else {
                    this.error = res[1].message;
                    this.isLoading.signup = false;
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.register-form {
    text-align: center;
    position: relative;

    * {
        margin: 20px 0;
    }
    div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .line {
            width: 42%;
            height: 1px;
            background-color: black;
        }
    }
}
.button {
    margin-top: 30px;
}
a {
    text-decoration: underline;
    color: $main-blue;
}
.error {
    color: $error;
    font-weight: 600;
}
</style>
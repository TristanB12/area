<template>
    <div class="login-form">
        <VLightButton
            :title="$t('auth.login.facebook')"
            iconName="facebook_icon.png"
            width="100%"
            :isLoading="isLoading.facebook"
            @click="loginWithFacebook"
        />
        <VLightButton
            :title="$t('auth.login.google')"
            iconName="google_icon.png"
            width="100%"
            :isLoading="isLoading.google"
            @click="loginWithGoogle"
        />
        <div>
            <span class="line"></span>
            <span>{{$t('auth.or')}}</span>
            <span class="line"></span>
        </div>
            <span  class="error" v-if="error">{{ error }}</span>
        <VInput
            type="text"
            :placeholder="$t('auth.email')"
            width="100%"
            iconName="email_icon.png"
            v-model="inputs.email"
        />
        <VInput
            type="password"
            :placeholder="$t('auth.password')"
            width="100%"
            iconName="password_icon.png"
            v-model="inputs.password"
        />
        <VButton
            :title="$t('auth.login.title')"
            width="100%"
            :isLoading="isLoading.login"
            @click="loginWithEmail"
        />
        <span class="body">{{$t('auth.login.accountSentence') + ' '}}<router-link class="strong" :to="{name: 'RegisterPage'}" >{{$t('auth.register.title')}}</router-link></span>
    </div>
</template>

<script>
import VLightButton from '@/components/ui/VLightButton.vue';
import VInput from '@/components/ui/VInput.vue';
import VButton from '@/components/ui/VButton.vue';
import {loginUser} from '@/services/api.js';
import {facebookAuthCode, googleAuthCode} from '@/services';
    export default {
        components: {
            VLightButton,
            VButton,
            VInput
        },
        data() {
            return {
                isLoading: {
                    facebook: false,
                    google: false,
                    login: false
                },
                inputs: {
                    email: "",
                    password: ""
                },
                error: undefined
            }
        },
        methods: {
            loginWithFacebook() {
                this.isLoading.facebook = true;
                let win = facebookAuthCode('login');
                const timer = setInterval(() => {
                    if (win.closed) {
                        clearInterval(timer);
                        this.$router.push({name: 'AreasPage'});
                        this.$store.state.token = localStorage.getItem('access_token');
                    }
                }, 500);
            },
            loginWithGoogle() {
                this.isLoading.google = true;
                let win = googleAuthCode('login');
                const timer = setInterval(() => {
                    if (win.closed) {
                        clearInterval(timer);
                        this.$router.push({name: 'AreasPage'});
                        this.$store.state.token = localStorage.getItem('access_token');
                    }
                }, 500);
            },
            async loginWithEmail() {
                if (this.inputs.password.trim() === "" ||
                    this.inputs.email.trim() === "") {
                    return;
                }
                this.isLoading.login = true;
                let res = await loginUser(this.inputs);
                if (res[0]) {
                    localStorage.setItem('access_token', res[0].access_token);
                    this.$store.state.token = res[0].access_token;
                    this.$router.push({name: 'AreasPage'});
                }
                else {
                    this.error = res[1].message;
                    this.isLoading.login = false;
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
.login-form {
    text-align: center;
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
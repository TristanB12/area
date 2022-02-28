<template>
    <div>
        <div class="error" v-if="error">{{ error }}</div>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data() {
            return {
                error: undefined,
            }
        },
        computed: {
            redirectUri() {
                return window.location.origin
            }
        },
        mounted () {
            this.processCallback();
        },
        methods: {
            processCallback() {
                if (this.$route.query.error) {
                    this.error = this.$route.query.error;
                    return;
                }
                if (this.$route.query.state == 'link')
                    this.processLink();
                else if (this.$route.query.state == 'login')
                    this.processLogin();
                else if (this.$route.query.state == 'signup')
                    this.processSignup();
                else if (this.$route.query.state == 'link')
                    this.processLink();
            },
            processLink() {
                let config = {
                    method: 'post',
                    url: 'https://ikeapi.herokuapp.com/link',
                    headers: { 
                        'authorization': 'Bearer ' + localStorage.getItem('access_token'), 
                        'Content-Type': 'application/json'
                    },
                    params: {
                        service: this.$route.params.service,
                        code: this.$route.query.code,
                        redirect_uri: this.redirectUri + "/redirect/" + this.$route.params.service
                    },
                };
                axios(config)
                    .then(() =>  {
                        localStorage.setItem('access_token', res.data.access_token);    
                        this.$store.state.token = res.data.access_token;
                        window.close();
                    })
                    .catch(err => {this.error = err.response.data});
            },
            processLogin() {
                let config = {
                    method: 'post',
                    url: 'https://ikeapi.herokuapp.com/auth/login/' + this.$route.params.service,
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    params: {
                        code: this.$route.query.code,
                        redirect_uri: this.redirectUri + "/redirect/" + this.$route.params.service
                    }
                };
                axios(config)
                    .then(res => {
                        localStorage.setItem('access_token', res.data.access_token)
                        window.close();
                    })
                    .catch(err => this.error = err.response.data);
            },
            processSignup() {
                let config = {
                    method: 'post',
                    url: 'https://ikeapi.herokuapp.com/auth/signup/' + this.$route.params.service,
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    params: {
                        code: this.$route.query.code,
                        redirect_uri: this.redirectUri + "/redirect/" + this.$route.params.service
                    }
                };
                axios(config)
                    .then(res => {
                        localStorage.setItem('access_token', res.data.access_token)
                        window.close();
                    })
                    .catch(err => this.error = err.response.data);
            },
        },
    }
</script>

<style lang="scss" scoped>
</style>
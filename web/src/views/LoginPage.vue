<template>
    <div class="login-page">
        <div class="illustration">
            <img src="@/assets/login_illustration.png" alt="blobs">
        </div>
        <div class="orange">
            <AuthCard title="Login">
                <LoginForm />
            </AuthCard>
        </div>
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import AuthCard from '@/components/layout/AuthCard.vue';
    export default {
        components: {
            AuthCard,
            LoginForm
        }
    }
</script>

<style lang="scss" scoped>
.login-page {
    width: 100%;
    height: calc(100vh - 75px);
    display: flex;
}
.orange, .illustration {
    width: 50%;
    height: 100%;
}
.orange {
    background-color: $main-orange;
    display: flex;
    align-items: center;
}
img {
    width: 75%;
}
.illustration {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
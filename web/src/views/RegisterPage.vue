<template>
    <div class="register-page">
        <div class="illustration">
            <img src="@/assets/login_illustration.png" alt="blobs">
        </div>
        <div class="orange">
            <AuthCard title="auth.register.title">
                <RegisterForm />
            </AuthCard>
        </div>
    </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue';
import AuthCard from '@/components/layout/AuthCard.vue';
    export default {
        components: {
            AuthCard,
            RegisterForm
        }
    }
</script>

<style lang="scss" scoped>
.register-page {
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
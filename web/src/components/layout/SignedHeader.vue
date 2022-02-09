<template>
    <div class="header-container">
        <header>
            <div class="branding" @click="$router.push({name: 'LandingPage'})">
                <img src="@/assets/logo.png" alt="logo">
                <h1>AREA</h1>
            </div>
            <div class="actions-container">
                <LanguageSwitcher />
                <div class="profile-picture">
                    <span>{{ firstUserEmailLetter }}</span>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher.vue';
export default {
    components: {
        LanguageSwitcher
    },
    computed: {
        firstUserEmailLetter() {
            return 'T';
            //return this.$store.state.user.auth.email.toUpperCase()[0];
        },
    },
}
</script>

<style lang="scss" scoped>
.header-container {
    width: 100%;
    height: 75px;
    border-bottom: 1px solid rgba(47, 46, 65, 0.2);
    display: flex;
    align-items: center;
}
img {
    max-width: 40px;
}
header {
    width: 90vw;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
h1 {
    color: $main-dark;
    font-family: $primary-font;
    font-weight: 800;

    span {
        color: $main-orange;
    }
    &::first-letter {
        color: $main-orange;
    }
}
.branding {
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
        margin-right: 10px;
    }
}
.profile-picture {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #e67e22;
    display: flex;
    justify-content: center;
    align-items: center;
}
span {
    font-size: 20px;
    font-weight: 600;
    color: white ;
}
.actions-container {
    width: 10vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
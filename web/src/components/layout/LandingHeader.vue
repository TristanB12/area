<template>
    <div class="header-container">
        <header>
            <div class="branding" @click="$router.push({name: 'LandingPage'})">
                <img src="@/assets/logo.png" alt="logo">
                <h1><span>A</span>REA</h1>
            </div>
            <nav>
                <ul>
                    <router-link
                        class="subtitle"
                        v-for="link in links"
                        :key="link.routeName"
                        :to="{name: link.routeName}"
                    >
                        <li>
                            {{ $t(link.text) }}
                        </li>
                    </router-link>
                </ul>
                <VButton
                    :title="$t('navLinks.register')"
                />
                <LanguageSwitcher />
            </nav>
        </header>
    </div>
</template>

<script>
import VButton from '@/components/ui/VButton.vue';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher.vue';
export default {
    components: {
        LanguageSwitcher,
        VButton
    },
    data() {
        return {
            links: [
                {
                    text: 'navLinks.mobile',
                    routeName: "MobilePage"
                },
                {
                    text: 'navLinks.aboutUs',
                    routeName: "AboutUsPage"
                },
                {
                    text: 'navLinks.services',
                    routeName: "ServicesPage"
                },
                {
                    text: 'navLinks.signIn',
                    routeName: "LoginPage"
                }
            ]
        }
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
    width: 80vw;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
h1 {
    color: $main-dark;
    font-family: 'Noto Sans Display', sans-serif;
    font-weight: 800;

    span {
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
nav {
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
ul {
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
}
a {
    position: relative;

    &:after {
        content: '';
        width: 0;
        height: 2px;
        margin: 0 auto;
        left: 0;
        right: 0;
        position: absolute;
        bottom: -2px;
        background: $main-orange;
        transition: width 0.3s ease 0s, left 0.3s ease 0s;
    }
    &:hover:after {
        width: 100%;
    }
}
.router-link-active::after {
    content: '';
    width: 0;
    height: 2px;
    margin: 0 auto;
    left: 0;
    right: 0;
    position: absolute;
    bottom: -2px;
    background: $main-orange;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 100%;
}
</style>
<template>
    <div id="language-switcher" @click="switchLanguage">
        <img :src="currentLanguageFlag" alt="flag language">
    </div>
</template>

<script>
    export default {
        computed: {
            currentLanguageFlag() {
                if (this.$i18n.locale  == 'en')
                    return require('@/assets/english_flag_icon.png');
                return require('@/assets/french_flag_icon.png');
            }
        },
        methods: {
            switchLanguage() {
                let language;

                if (this.$i18n.locale == 'en')
                    language = 'fr';
                else
                    language = 'en';
                this.$i18n.locale = language;
                localStorage.setItem("locale", language);
            }
        },
    }
</script>

<style lang="scss" scoped>
#language-switcher {
    display: flex;
}
img {
    max-width: 40px;
    cursor: pointer;
}
</style>
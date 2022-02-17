<template>
    <div class="action-adder">
        <div class="container">
            <div class="header">
                <span>
                    <h2 class="heading-02">{{ $t('pages.add.action.chooseApp') }}</h2>
                    <p class="small">{{ $t('pages.add.action.description') }}</p>
                </span>
                <VSearchBar
                    :placeholder="$t('pages.areas.search')"
                />
            </div>
            <ScrollContainer>
                
            </ScrollContainer>
        </div>
        <div></div>
    </div>
</template>

<script>
import ScrollContainer from '@/components/layout/ScrollContainer.vue';
import VSearchBar from '@/components/ui/VSearchBar.vue';
    export default {
        components: {
            VSearchBar,
            ScrollContainer
        },
    }
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.container {
    width: 48%;
}
</style>
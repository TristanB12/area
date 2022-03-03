<template>
    <div class="area" v-if="state == 'actions'">
        <div class="header">
            <span class="subtitle">{{ infos.title }}</span>
            <div class="actions">
                <img
                    src="@/assets/parameters_icon.png"
                    alt="parameters"
                >
                <img
                    src="@/assets/delete_icon.png"
                    alt="delete"
                    @click="state = 'delete'"
                >
            </div>
        </div>
        <div class="infos">
            <div>
                <img :src="infos.action.service.logoUri" alt="logo">
                <span>{{ infos.action.service.name }}</span>
            </div>
            <div>
                <img :src="infos.reaction.service.logoUri" alt="logo">
                <span>{{ infos.reaction.service.name }}</span>
            </div>
        </div>
    </div>
    <div class="area" v-else>
        <div class="header">
            <h4>{{ $t('pages.areas.delete') }}</h4>
            <div class="delete-actions">
                <VButton
                    title="Cancel"
                    titleSize="16px"
                    @click="state='actions'"
                />
                <VButton
                    title="Delete"
                    titleSize="16px"
                    :isLoading="isDeleteLoading"
                    @click="startDeleteArea"
                />
            </div>
        </div>
    </div>
</template>

<script>
import VButton from '@/components/ui/VButton.vue';
import API from '@/services/api.js';

    export default {
        components: {
            VButton
        },
        props: {
            infos: {
                type: Object,
                default: undefined
            },
        },
        data() {
            return {
                state: 'actions',
                isDeleteLoading: false
            }
        },
        methods: {
            async startDeleteArea() {
                this.isDeleteLoading = true;
                let res = await API.deleteArea(this.infos.id);
                if (res[0]) {
                    this.$emit('delete-area');
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.area, .header {
    width: 100%;
}
.area {
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #C8C8C8;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        font-weight: 600;
    }
}
.actions {
    width: 12%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
        max-width: 25px;
        cursor: pointer;
    }
}
.infos {
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50%;

    div {
        display: flex;
        align-items: center;

        img {
            max-width: 40px;
            margin-right: 5px;
        }
    }
}
.delete-actions {
    display: flex;
    justify-content: space-between;
    width: 35%;
}
</style>
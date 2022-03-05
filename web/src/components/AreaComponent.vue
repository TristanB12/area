<template>
    <div class="component">
      <img class="logo" src="@/assets/snapchat.png" alt="snapchat" />
        <div class="section"> 
        <h1 class="text">Snapchat</h1>
        <p class="text">2 Areas</p>
        </div>
    </div>
</template>

<script>
import VButton from '@/components/ui/VButton.vue';
    export default {
        components: {
            VButton
        },
        methods: {
        },
    }
</script>

<style lang="scss" scoped>
.area, .header {
    width: 100%;
}
.component {
    margin-top: 30px;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #C8C8C8;
    display: flex;
    
}
.section {
    width: 80%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;}
.logo {
    width: 50px;
    margin-right: 20px;
}
.text {
    align-self: center;
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
</style>
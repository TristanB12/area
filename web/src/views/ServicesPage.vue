<template>
  <div>
    <img class="explore" src="@/assets/Explore.png" alt="Explore" />
  </div>
  <div class="iconSet">
    <img 
        class="icon"
        src="@/assets/snapchat.png"
        alt="snapchat" />
    <img 
        class="icon"
        src="@/assets/spotify.png"
        alt="spotify" />
    <img 
        class="icon"
        src="@/assets/youtube.png"
        alt="youtube" />
    <img 
        class="icon"
        src="@/assets/outlook.png"
        alt="outlook" />
    <img 
        class="icon"
        src="@/assets/intranet.png"
        alt="intranet - Epitech" />
    <img 
        class="icon"
        src="@/assets/gmail.png"
        alt="gmail" />
    <img 
        class="icon"
        src="@/assets/reddit.png"
        alt="reddit" />
    <img 
        class="icon"
        src="@/assets/twitter.png"
        alt="twitter" />
    <img 
        class="icon"
        src="@/assets/vinted.png"
        alt="vinted" />
    <img 
        class="icon"
        src="@/assets/orange.png"
        alt="orange" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.explore {
  margin: 40px;
}
.iconSet {
  display: flex;
  justify-content: space-around;
  width: 70%;
  margin: auto;
  margin-top: 10px;
  flex-wrap: wrap;
}
.icon {
  margin: 30px;
}
</style>
<template>
    <div v-show="true" class="settings-container">
        <div class="settings-modal">
            <div>
                <img src="@/resources/purpleclose.png">
            </div>
            <div class="sound-settings">
                <div>
                    <img src="" alt="bgm">
                    <div class="sound-bar"></div>
                    <p>10</p>
                </div>
                <div>
                    <img src="" alt="sound">
                    <div class="sound-bar"></div>
                    <p>10</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .settings-container{
        width:100vw;
        height:100vh;
        background-color:rgba(0,0,0,0.5);
        display:flex;
        justify-content:center;
        align-items:center;
        position:absolute;
        z-index:15;

    }
    .settings-modal{
        width:20vw;
        height:33vh;
        background-color:white;
        border:7px solid #56174F;
        border-radius:20px;
    }
    .sound-settings{
        width:16vw;
        height:20vh;
        background-color:#F0EBE9;
        border-radius:20px;
    }
    .sound-bar{
        width:10vw;
        height:3vh;
        background-color:#56174F;
        border-radius:5px;
    }
</style>
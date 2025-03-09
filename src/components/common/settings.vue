<template>
    <div v-show="soundsetting" class="settings-container">
        <div class="settings-modal">
            <div>
                <img src="@/resources/purpleclose.png" @click="$emit('closesound');">
            </div>
            <div class="sound-settings">
                <div  style="display:flex;justify-content:space-around;align-items:center;width:16vw;" @mousemove.left="asdf4($event)" @dragover="asdf4($event)">
                    <img src="@/resources/bgm.png" alt="bgm">
                    <div id="bgm" class="sound-bar" @dragover="asdf4($event)">
                        <img src="@/resources/soundcircle.png" alt="sound-circle" style="position:relative" :style="`left:${bgmsound-5}vw`" id="bgmimg">
                    </div>
                    <p>10</p>
                </div>
                <div style="display:flex;justify-content:space-around;align-items:center;width:16vw;" @mousemove.left="asdf4($event)" @dragover="asdf4($event)">
                    <img src="@/resources/effect.png" alt="sound">
                    <div id="effect" class="sound-bar" @dragover="asdf4($event)">
                        <img src="@/resources/soundcircle.png" alt="sound-circle" style="position:relative" :style="`left:${effectsound-5}vw`" id="effectimg">
                    </div>
                    <p>10</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            bgmsound:10,
            effectsound:10,
        }
    },
    methods:{
        asdf(e){
            console.log('asdf1',e);
        },
        asdf2(e){
            console.log('asdf2',e);
        },
        asdf3(e){
            console.log('asdf3',e);
        },
        asdf4(e){
            if(e.buttons===1){
                console.log('asdf4',e);
                console.log(e.target);
                console.log(e.offsetX);
            }
        }
    },
    props:['soundsetting'],
}
</script>
<style scoped>
    .settings-container{
        width:100vw;
        height:100vh;
        position:absolute;
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:15;
        background-color:rgba(0,0,0,0.5);

    }
    .settings-modal{
        width:20vw;
        height:33vh;
        background-color:white;
        border:7px solid #56174F;
        border-radius:20px;
        display:flex;
        flex-direction:column;
        justify-content:space-around;
        align-items:center;
    }
    .sound-settings{
        width:16vw;
        height:20vh;
        background-color:#F0EBE9;
        border-radius:20px;
        display:flex;
        flex-direction:column;
        justify-content:space-around;
        align-items:center;
    }
    .sound-bar{
        display:flex;
        justify-content:center;
        align-items:center;
        width:10vw;
        height:1vh;
        background-color:#56174F;
        border-radius:5px;
    }
</style>
<template>
    <div v-show="true" class="settings-container"> <!-- v-show=soundsetting으로 바꾸기 -->
        <div class="settings-modal">
            <div style="width:90%;text-align:right;">
                <img src="@/resources/purpleclose.png" @click="$emit('closesound');">
            </div>
            <div class="sound-settings">
                <div  style="display:flex;justify-content:space-around;align-items:center;width:16vw;">
                    <img src="@/resources/bgm.png" alt="bgm">
                    <div style="height:100%;display:flex;align-items:center;" id="bgmbar" @mouseup="asdf($event)" @dragend="asdf($event)" @mousemove.left="asdf4($event)" @dragover="asdf3($event)">
                        <div id="bgm" class="sound-bar" @dragover="asdf4($event)">
                            <img src="@/resources/soundcircle.png" alt="sound-circle" style="position:relative" :style="`left:${bgmsound-5}vw`" id="bgmimg">
                        </div>
                    </div>
                    <p>10</p>
                </div>
                <div style="display:flex;justify-content:space-around;align-items:center;width:16vw;">
                    <img src="@/resources/effect.png" alt="sound">
                    <div style="height:100%;display:flex;align-items:center;" id="effectbar" @mouseup="asdf($event)" @dragend="asdf($event)" @mousemove.left="asdf4($event)" @dragover="asdf3($event)">
                        <div id="effect" class="sound-bar" @dragover="asdf4($event)">
                            <img src="@/resources/soundcircle.png" alt="sound-circle" style="position:relative" :style="`left:${effectsound-5}vw`" id="effectimg">
                        </div>
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
            dragid:'',
        }
    },
    methods:{
        asdf(e){
            this.dragid='';
        },
        asdf2(e){
            console.log('asdf2',e);
        },
        asdf3(e){
            console.log('asdf3',e);
        },
        asdf4(e){
            if(e.buttons===1){
                if(this.dragid==''){
                    this.dragid=e.target.id;
                    console.log(this.dragid);
                }
                if(!this.dragid.includes('bar')){
                    console.log("오!");
                }
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
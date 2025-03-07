<template>
    <div class="conv">
        <img src="">
        <RouterView name="customer" class="background":customerA="customerA" :dialog="dialog" :quizDialog="quizDialog" :quizNum="quizNum"
                    @quizTime="quizTime" @customer="customer"></RouterView>
        <RouterView name="counter" :quizNum="quizNum" :quizAnswer="quizAnswer" :cart="cart" @result="result"
                    @dragstart_cart="dragstart_cart" @dragover_cart="dragover_cart" @drop_cart="drop_cart"></RouterView>
        <!-- <QuizMain :quizDialog="dialog" :quizNum="quizNum" class="background" @quizTime="quizTime"/> -->
        <!-- <QuizChoice v-show="quiz" :quizNum="quizNum" :quizAnswer="quizAnswer" @result="result"/> -->
    </div>
</template>
<script>
import QuizChoice from '../quiz/quizChoice.vue';
import QuizMain from '../quiz/quizMain.vue';
import { quiz, quizAnswer, quizComment, rewardDialog } from '@/resources/quiz.js';

export default {
    data(){
        return{
            quiz:false,
            dialog:'상품이 없어요',
            quizDialog:quiz[this.quizNum],
            day:Math.floor(Math.random()*10),   // 임의의 일수로 설정(1~10)
            customerCount:1,
            quizMan:Math.floor(Math.random()*6)+6,
            meetQuizMan:false,
        }
    },
    methods:{
        result(ans){
            clearInterval(this.interval);
            if(quizAnswer[this.quizNum]==ans){
                this.quizDialog='정답입니다.';
                // 사용자가 클릭하면 넘어갈지 일정 시간 뒤 넘어갈지 결정하기 일단 후자로
                setTimeout(() => {
                    this.quizDialog=rewardDialog[this.day].dialog;
                    if(rewardDialog[this.day].reward==0){
                        // 수익에 +30000원 추가. 내가 추가할 게 있나요?
                    }else if(rewardDialog[this.day].reward>=1 && rewardDialog[this.day].reward<=3){
                        // 영업 종료 후 총 수익에서 n% 증가, 정산서에 표시. 내가 추가할 게 있나요?
                    }else if(rewardDialog[this.day].reward==4){
                        // 뉴스 내용 전달. 내가 추가할 게 있나요?
                    }
                }, 3500);
            }else{
                this.quizDialog='오답입니다.';
                setTimeout(()=>{
                    this.quizDialog=quizComment[this.quizNum];
                },3500);
            }
            setTimeout(()=>{
                this.$router.push('/');
            },7000);
        },
        quizTime(){
            this.quiz=true;
            this.$emit('quizTime');
        },
        customer(){
            this.$emit('customer');
        },
        dragstart_cart(ev){
            this.$emit('dragstart_cart',ev);
        },
        dragover_cart(ev){
            this.$emit('dragover_cart',ev);
        },
        drop_cart(ev){
            console.log("여기까지 옴?");
            this.$emit('drop_cart',ev);
        },
    },
    watch:{
        timeleft(curVal, oriVal){
            if(curVal<=0){
                clearInterval(this.interval);
                if(this.customerCount==this.quizMan && !this.meetQuizMan){
                    this.meetQuizMan=true;
                    this.quizDialog='시간을 초과하였습니다.';
                    setTimeout(()=>{
                        this.quizDialog=quizComment[this.quizNum];
                    },3500);
                    setTimeout(()=>{
                        this.$router.push('/maingame/'+this.customerCount);
                    },7000);
                }else{
                    this.customerCount++;
                    console.log(this.customerCount);
                    if(this.customerCount==this.quizMan){
                        setTimeout(()=>{
                            this.$router.push('/maingame/quiz');
                        },3500);
                    }else{
                        setTimeout(()=>{
                            this.$router.push('/maingame/'+this.customerCount);
                            this.$emit('customer');
                        },3500);
                    }
                }
            }
        }
    },
    components:{
        QuizMain,QuizChoice,
    },
    props:['quizNum','interval','timeleft','customerA','cart']
}
</script>
<style scoped>
    div{
        border:1px solid black;
    }
    .conv{
        width:1000px;
        height:892px;
    }
    .conv p{
        margin:0;
    }
    .background{
        width:100%;
        height:65%;
    }
    .counter{
        width:100%;
        text-wrap:nowrap;
    }
    .amount{
        display:inline-block;
        width:50%;
        text-align:center;
    }
    .sell{
        display:inline-block;
        width:50%;
    }
    .amount *, .sell *{
        width:100%;
    }
</style>
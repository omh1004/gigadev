<template>
    <div class="conv">
        <QuizMain :quizDialog="dialog" :quizNum="quizNum" class="background" @quizTime="quizTime"/>
        <QuizChoice v-show="quiz" :quizNum="quizNum" :quizAnswer="quizAnswer" @result="result"/>
        <div v-show="!quiz" id="cartzone" class="counter" @dragover="dragover_handler" @drop="drop_handler">
            <!-- 카트의 상품 나열 -->
            <div v-for="c in cart" v-show="c.amount>0">
                <img :src="`${c.src}`" alt="상품" height="50%"
                    draggable @dragstart="dragstart_handler" :id="`cart${c.name}`" :name="c.name"><br>
                <div class="amount">
                    <p>{{ c.amount }}</p>
                </div>
                <div class="sell">
                    <input type="number" v-model.number="c.sell">
                </div>
                <p>{{ c.name }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import QuizChoice from '../quiz/quizChoice.vue';
import QuizMain from '../quiz/quizMain.vue';
import { quiz, quizAnswer, quizComment, rewardDialog } from '@/resources/quiz.js';

export default {
    data(){
        return{
            // 판매 시 cart 초기화
            cart:[],
            // product -> product / cart -> cart를 막기 위한 값. 'prod','cart'
            dragtarget:'',
            quiz:false,
            dialog:quiz[this.quizNum],
            day:Math.floor(Math.random()*10),   // 임의의 일수로 설정(1~10)
        }
    },
    methods:{
        result(ans){
            clearInterval(this.interval);
            if(quizAnswer[this.quizNum]==ans){
                this.dialog='정답입니다.';
                // 사용자가 클릭하면 넘어갈지 일정 시간 뒤 넘어갈지 결정하기 일단 후자로
                setTimeout(() => {
                    this.dialog=rewardDialog[this.day].dialog;
                    if(rewardDialog[this.day].reward==0){
                        // 수익에 +30000원 추가. 내가 추가할 게 있나요?
                    }else if(rewardDialog[this.day].reward>=1 && rewardDialog[this.day].reward<=3){
                        // 영업 종료 후 총 수익에서 n% 증가, 정산서에 표시. 내가 추가할 게 있나요?
                    }else if(rewardDialog[this.day].reward==4){
                        // 뉴스 내용 전달. 내가 추가할 게 있나요?
                    }
                }, 3500);
            }else{
                this.dialog='오답입니다.';
                setTimeout(()=>{
                    this.dialog=quizComment[this.quizNum];
                },3500);
            }
            setTimeout(()=>{
                this.$router.push('/');
            },7000);
        },
        dragstart_handler(ev){
            console.log("drag");
            ev.dataTransfer.setData("text/plain",ev.target.name);   // 드래그 한 태그 name 속성 설정
            // 드래그 한 태그가 product에 있는가 cart에 있는가를 id로 확인
            var img = new Image();
            img.src = ev.target.src;
            ev.dataTransfer.setDragImage(img, 20, 20);
            if(ev.target.id.includes("prod")){ this.dragtarget="prod"; }
            else if(ev.target.id.includes("cart")){ this.dragtarget="cart"; }
            console.log(this.dragtarget);
        },
        dragover_handler(ev){
            ev.preventDefault();
            console.log(ev.dataTransfer);
        },
        drop_handler(ev){
            ev.preventDefault();
            console.log(ev.target.id);  // 'prodzone','cartzone'인지 확인용
            console.log(ev.target.parentElement.parentElement.id);  // 'prodzone','cartzone'위의 상품인지 확인용
            if(ev.target.id=='cartzone' || ev.target.parentElement.parentElement.id=='cartzone'){   // 드롭 이벤트 cartzone 발생
                const data = ev.dataTransfer.getData("text/plain"); // 드래그 한 태그 name 속성값 가져오기(위에서 저장함)
                console.log(data);
                const prod = this.product.find(p=>p.name==data);    // product,cart에 같은 객체가 있는지 확인
                const cartprod = this.cart.find(p=>p.name==data);     // 근데 하루 남은 걸 다른 객체로 봐야 해서 조금 수정이 필요할 것.
                console.log(prod!=null,cartprod!=null);
                if(prod!=null && cartprod==null){       // product에만 있는 경우
                    if(prod.sell<=1){
                        prod.amount--;
                        this.cart.push({ name:prod.name, amount:1, src:prod.src,sell:0 });
                    }else if(prod.sell>1 && prod.sell<=prod.amount){
                        prod.amount-=prod.sell;
                        this.cart.push({ name:prod.name, amount:prod.sell, src:prod.src,sell:0 });
                    }
                }else if(prod!=null && cartprod!=null){     // product, cart에 있는 경우
                    if(prod.amount>0 && this.dragtarget=='prod'){   // prodzone -> cartzone 드래그 & 드래그 한 상품 1개 이상
                        if(prod.sell<=1){
                            prod.amount--;
                            cartprod.amount++;
                        }else if(prod.sell>1 && prod.sell<=prod.amount){
                            prod.amount-=prod.sell;
                            cartprod.amount+=prod.sell;
                        }
                    }
                }
            }
            if(ev.target.id=='prodzone' || ev.target.parentElement.parentElement.id=='prodzone'){   // 드롭 이벤트 prodzone 발생
                const data = ev.dataTransfer.getData("text/plain");
                const prod = this.product.find(p=>p.name==data);        // product, cart에 같은 객체 화인
                const cartprod = this.cart.find(p=>p.name==data);
                console.log(prod!=null,cartprod!=null);
                if(prod==null && cartprod!=null){           // cart에만 있음
                    if(cartprod.sell<=1){
                        cartprod.amount--;
                        this.product.push({ name:cartprod.name, amount:1, src:cartprod.src,sell:0 });
                    }else if(cartprod.sell>1 && cartprod.sell<=cartprod.amount){
                        cartprod.amount-=cartprod.sell;
                        this.product.push({ name:cartprod.name, amount:cartprod.sell, src:cartprod.src,sell:0 });
                    }
                }else if(prod!=null && cartprod!=null){     // product, cart 둘 다 있음
                    if(cartprod.amount>0 && this.dragtarget=='cart'){   // cartzone -> prodzone 드래그 & 드래그 한 카드 상품 1개 이상
                        if(cartprod.sell<=1){
                            cartprod.amount--;
                            prod.amount++;
                        }else if(cartprod.sell>1 && cartprod.sell<=cartprod.amount){
                            cartprod.amount-=cartprod.sell;
                            prod.amount+=cartprod.sell;
                        }
                    }
                }
            }
        },
        quizTime(){
            this.quiz=true;
            this.$emit('quizTime');
        }
    },
    watch:{
        timeleft(curVal, oriVal){
            if(curVal<=0){
                clearInterval(this.interval);
                this.dialog='시간을 초과하였습니다.';
                setTimeout(()=>{
                    this.dialog=quizComment[this.quizNum];
                },3500);
                setTimeout(()=>{
                this.$router.push('/');
                },7000);
            }
        }
    },
    components:{
        QuizMain,QuizChoice,
    },
    props:['quizNum','interval','timeleft']
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
        height:35%;
        overflow-x:auto;
        text-wrap:nowrap;
    }
    #cartzone>div{
        display:inline-block;
        text-align:center;
        width:20%;
        height:100px;
        margin:2.5%;
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
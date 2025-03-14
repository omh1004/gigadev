<template>
    <div class="calculation-container">
        <div style="text-align:center;">
            <div class="calculation-paper">
                <div class="calculation-title"><p style="color:white;font-size:24px;margin:0.8vh 0;">1일차 매출 정산</p></div>
                <div style="display:flex;flex-direction:column;justify-content:space-around;height:22vh;background-color:rgba(140,64,41,0.1);border-radius:20px;">
                    <div>
                        <div class="block-left"><h3>수익</h3></div>
                        <div class="block-right"><h3>{{ profitAll }}원</h3></div>
                    </div>
                    <div>
                        <div class="block-left"><p>판매 수익</p></div>
                        <div class="block-right"><p>{{ profit }}원</p></div>
                    </div>
                    <div>
                        <div v-show="quiz>0" class="block-left"><p style="position:relative;left:2vw;">*퀴즈 혜택</p></div>
                        <div v-show="quiz>0" class="block-right"><p>X 1%</p></div>
                    </div>
                    <div>
                        <div v-show="fever>0" class="block-left"><p style="position:relative;left:2vw;">*FEVER DAY</p></div>
                        <div v-show="fever>0" class="block-right"><p>X 1</p></div>
                    </div>
                    <div>
                        <div class="block-left"><p>폐기 수익(20% 상품 판매 수익)</p></div>
                        <div class="block-right"><p>{{ dispose }}원</p></div>
                    </div>
                </div>
                <div style="display:flex;flex-direction:column;justify-content:space-around;height:14.5vh;background-color:rgba(140,64,41,0.1);border-radius:20px;">
                    <div>
                        <div class="block-left"><h3>지출</h3></div>
                        <div class="block-right"><h3>{{ lossAll }}원</h3></div>
                    </div>
                    <div>
                        <div class="block-left"><p>발주 비용</p></div>
                        <div class="block-right"><p>{{ orderingLoss }}원</p></div>
                    </div>
                    <div>
                        <div class="block-left"><p>운영비</p></div>
                        <div class="block-right"><p>-20,000원</p></div>
                    </div>
                </div>
                <div style="border-top:3px dashed #4C1B0B;"></div>
                <div style="height:3vh;">
                    <div>
                        <div class="block-left"><h3>총계</h3></div>
                        <div class="block-right"><h3>{{ profitAll + lossAll }}원</h3></div>
                    </div>
                </div>
                <div style="height:5.5vh;background-color:#4C1B0B;border-radius:20px;">
                    <div>
                        <div class="block-left" style="color:white;margin:1.5vh 0;"><h3>내 잔고</h3></div>
                        <div class="block-right" style="color:white;margin:1.5vh 0;"><h3>{{ moneyhave + profitAll + lossAll }}원</h3></div>
                    </div>
                </div>
            </div>
            <button class="dayend" @click="convClose">퇴근하기</button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            profitAll:0,
            profit:0,
            quiz:0,     // 1 : +30000, 2 : 1.05, 3 : 1.1, 4 : news(퀴즈 보너스 표시?)
            fever:0,    // true, false로 바꾸기?
            dispose:0,
            ordering:0,
            lossAll:0,
            moneyhave:0,
        }
    },
    methods:{
        convClose(){
            // 게임정보, 수익, 창고 업데이트 하기
            fetch("http://localhost:8080/maingame/gameend",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    // 보내야 할 데이터
                    // revenue db insert
                    // 일차, 판매 수익, 퀴즈 보너스, 피버타임(구현시), 발주 비용, 잔고, 신뢰도(구현시)
                    // storage db update
                    // 창고 물품.
                    "playday":this.day,
                    "salesCount":this.profit,
                    "quizYN":this.quiz, // db:char, this:number 수정이 필요
                    // "feverYN":this.fever,   // db:char, this:number 수정이 필요
                    "salePrice":this.dispose,
                    "orderPriceAll":this.ordering,
                    "cash":this.moneyhave,
                    "cart":this.cart,
                })
            });
            // 다음으로 넘겨야 할 데이터 추가하기
            // 잔고
            // 신뢰도(구현시), 창고 물품
            this.$router.push("/mainMenu");
        }
    },
    mounted(){
        this.profit = history.state.profit;
        this.profitAll += this.profit;
        this.orderingLoss = 0;
        this.lossAll += (this.orderingLoss - 20000);
        this.moneyhave = history.state.moneyhave;
    }
}
</script>
<style scoped>
    .calculation-container{
        width:100vw;
        height:100vh;
        background-image:url("/background/bankbg.png");
        background-size:100% 100%;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .calculation-paper{
        display:flex;
        flex-direction:column;
        justify-content:space-around;
        align-items:center;
        width:50vw;
        height:80vh;
        background-color:#F5F5F5;
        border-radius:20px;
    }
    .dayend{
        width:23vw;
        height:9vh;
        background-image:url("/element/emptydayendbtn.png");
        background-size:100% 100%;
        background-color:rgba(0,0,0,0);
        border:0;
        font-size:24px;
        margin-top:2.2vh;
    }
    .calculation-title{
        max-width:18vw;
        height:5vh;
        background-image:url("/element/Ribbon.png");
        background-size:100% 100%;
    }
    .calculation-paper>div{
        width:40vw;
        margin:auto;
    }
    .calculation-paper>div>div{
        min-height:2.5vh;
    }
    .calculation-paper p,h3{
        margin:0 1vw;
    }
    .block-left{
        display:inline-block;
        width:50%;
        height:2vh;
        text-align:left;
    }
    .block-right{
        display:inline-block;
        width:50%;
        height:2vh;
        text-align:right;
    }
</style>
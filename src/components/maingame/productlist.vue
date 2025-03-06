<template>
    <div class="conv">
        <div style="height:144px;background-color:#FFEFCA;">

        </div>
        <div style="height:50px;border-top:7px solid #4C1B0B;border-bottom:7px solid #4C1B0B;background-color:#FFEFCA;">

        </div>
        <!-- dragover, drop 이벤트가 있어야 drag & drop 가능 -->
        <div id="prodzone" class="product-container" @dragover="dragover_handler" @drop="drop_handler">
            <!-- 가지고 있는 상품 나열 -->
            <div class="product" v-for="p in product" v-show="p.amount>0">
                <!-- draggable로 드래그 가능, dragstart 이벤트가 필요. -->
                <img :src="`${p.src}`" alt="상품" height="50%"
                    draggable @dragstart="dragstart_handler" :id="`prod${p.name}`" :name="p.name"><br>
                <div class="amount">
                    <p>{{ p.amount }}</p>
                </div>
                <div class="sell">
                    <input type="number" v-model.number="p.sell">
                </div>  
                <p>{{ p.name }}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            // 구매, 판매 시에는 product만 수정, 하루가 끝날 때 DB에 저장
            product:[
                { name:"사과",amount:10,src:"/src/assets/apple.png",sell:0 },
                { name:"배",amount:3,src:"/src/assets/pear.png",sell:0 },
                { name:"스위치",amount:3,src:"/src/assets/switch.png",sell:0 },
                { name:"PS5",amount:3,src:"/src/assets/PS5.png",sell:0 },
                { name:"수박",amount:3,src:"/src/assets/watermelon.png",sell:0 },
            ],
            // 판매 시 cart 초기화
            cart:[],
            // product -> product / cart -> cart를 막기 위한 값. 'prod','cart'
            dragtarget:'',
        }
    },
    methods:{
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
    },
}
</script>
<style scoped>
    .conv{
        width:817px;
        height:892px;
        border:7px solid #4C1B0B;
        border-top-left-radius:52px;
        border-top-right-radius:52px;
        border-bottom-left-radius:30px;
        border-bottom-right-radius:30px;
        overflow:hidden;
    }
    .conv p{
        margin:0;
    }
    .product-container{
        width:100%;
        height:100%;
        overflow-y:auto;
        flex-wrap:wrap;
        background-color:#4C1B0B;
    }
    #prodzone>div{
        display:inline-block;
        text-align:center;
        width:170px;
        min-width:170px;
        min-height:190px;
        background-color:white;
        border-radius:30px;
        margin:10px 14px;
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
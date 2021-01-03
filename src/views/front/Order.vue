<template>
<div>
    <Loading v-if="loading"/>
    <Navbar/>
    <Progress :width="width"/>
     <div class="cart-wrapper">
        <h1>訂單確認</h1>
        <div class="cart-container">
            <div class="cart-message">
                <h2>運送</h2>
                <div class="message-content">
                    <h3>重要提醒：海外購買虛實名制</h3>
                    <p>所有顧客透過海外網路購物需先透過易利委（EzWay）平臺完成實名認證作業。為確保包裹於最短時間內送達，此作業請您務必先申請完成。</p>
                    <h3>請注意：訂單收件人姓名與手機號碼務必與您在易利委註冊的資料相符（手機號碼應以09開頭）。</h3>
                </div>
                 <div class="ship">
                <h3>運送方式</h3>
                    <div class="ship-normal " :class="{'active':!isActive}" @click="isActive = false">
                    <h3>標準運送
                         <span>免費</span>
                    </h3>
                    <p>標準運送已含關稅費用並提供追蹤編號預計運送日期: 4-6 天工作日 (不含週末及國定假日</p>
                </div>
                    <div class="ship-fast" :class="{'active':isActive}" @click="isActive = true">
                    <h3>特快運送
                        <span>NT$600</span>
                    </h3>
                    <p>寄出後2至4個工作日送達 (不含週末及國定假日)</p>
                </div>
                </div>
            </div>
            <div class="order-summary">
                <div class="code-form">
                    <input type="text" placeholder="請輸入優惠碼Code" v-model="code"  @keyup.enter="useCoupon">
                    <button @click="useCoupon">完成</button>
                </div>
                <div class="order-confirm">
                    <h2>訂單確認</h2>
                    <div class="price">
                        <span class="price-color">小計</span>
                        <span class="price-color" v-if="final_total">NT{{ final_total | currency }}</span>
                        <span class="price-color" v-else>NT{{ carts.total | currency }}</span>
                    </div>
                    <div class="ship-price">
                        <span class="price-color">運送</span>
                        <span class="price-color">NT${{ shipPrice }}</span>
                    </div>
                    <div class="total-price">
                        <h2 class="price-color">總計</h2>
                         <span class="price-color" v-if="final_total" >NT{{ final_total | currency }}(已使用優惠券)</span>
                        <span class="price-color" v-else>NT{{ price | currency }}</span>
                    </div>
                </div>
                <div class="btn-group">
                     <router-link class="btn" to="/cart">上一步</router-link>
                     <router-link class="btn" to="/customer">下一步</router-link>
                </div>
            </div>
        </div>
    </div>
    <div class="footer-wrapper">
        <Footer/>
    </div>
</div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Progress from '@/components/Progress.vue'
export default {
    data(){
        return{
            carts:{},
            isActive:false,
            width:'50%',
            code:'',
            final_total:'',
            loading:false
        }
    },
    components:{
        Navbar,
        Footer,
        Progress,
    },
    computed:{
        price(){
            const vm = this
            if(vm.isActive){
                return vm.carts.total + 600
            }else{
                return vm.carts.total 
            }
        },
        shipPrice(){
             const vm = this
            if(vm.isActive){
                return 600
            }else{
                return 0
            }
        }
    },
    methods:{
         getCart(){
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
            const vm = this
            vm.loading = true
            this.$http.get(api).then(response =>{
               vm.carts = response.data.data
               vm.loading = false
            })
        },
        useCoupon(){
             const vm = this
            const code ={
                code:this.code
            }
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
            vm.loading = true
            this.$http.post(api,{data:code}).then(response=>{
              if(response.data.success){
                   this.final_total =response.data.data.final_total
                   this.$msg.success(response.data.message)
                   vm.loading = false

              }else{
                  this.$msg.error(response.data.message)
                  vm.loading = false
              }
        })
        }
    },
    created(){
        this.getCart()
    }
}
</script>
<style scoped>
* {
    border-radius: 10px;
    line-height: 2;
}

h1 {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
}

h2,
.total-price>span {
    font-weight: bold;
    font-size: 1.6rem;
    line-height: 3;
    background-color: #F0F0F0;
}

h3 {
    font-weight: bold;
    font-size: 1.4rem;
    
}

p {
    line-height: 6;
    font-size: 1.25rem;
}

span {
    font-size: 1.25rem;
    color: red;
}
.footer-wrapper{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
}
.cart-wrapper{
    width: 100%;
    margin-top: 60px;
}
.cart-container {
    max-width: 1200px;
    margin: auto;
    display: flex;
    background-color: #fff;
    padding:20px;
     position: relative;
}

.cart-message {
    width: 800px;
}

.message-content {
    background-color: #FFE5E5;
    margin: 20px 0 20px 0;
    padding-left: 15px;
}
.ship > h3{
     background-color: #F0F0F0;
}
.ship-normal,
.ship-fast {
    border: 1px solid #333;
    margin-top: 20px;
    background-color: #fff;
    padding-left: 15px;
    cursor: pointer;
    transition:border .3s ;
}
.active{
    border: 2px solid rgba(255, 0, 0, 0.747);
}

.order-summary {
    width: 300px;
    margin-left: 20px;
}

.code-form {
    display: flex;
    background-color: #F0F0F0;
    height:50px;
    padding: 10px;
}

.code-form>input {
    width: 70%;
    height:30px;
    outline: none;
    border-radius: 10px 0 0 10px;
    border: 1px solid #dedede;
}

.code-form>button{
    width: 20%;
    height:30px;
    border: none;
    color: #fff;
    background-color: #3A3A3A;
    border-radius: 0 10px 10px 0;
}

.order-confirm {
    margin-top: 20px;
    background-color: #F0F0F0;
    padding: 10px;
}

.order-confirm>h2 {
    text-align: center;
    border-bottom: 1px solid #dedede;
}

.price,
.ship-price,
.total-price {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
}

.total-price {
    border-top: 1px solid #dedede;
}

.price-color {
    color: #000;
}
.btn-group{
    display: flex;
    justify-content: space-between;
}
.btn{
    display: block;
    width: 70px;
    text-decoration: none;
    text-align: center;
    background-color: #3A3A3A;
    color: #fff;
    padding: 10px;
    margin-top: 10px;
    float: right;
}
@media screen and (max-width: 991px) {

    .cart-container {
        flex-wrap: wrap;
    }

    .cart-message {
        width: 100%;
    }

    .order-summary {
        width: 100%;
    }

    p {
        line-height: 3;
    }

    .code-form {
        margin:10px 15px 0 0;
    }

    .code-form>input {
        width: 300px;
    }

    .code-form>button {
        width: 40px;

    }

    .order-confirm {
        margin-right: 15px;
    }
    .footer-wrapper{
     position: static;
}


}

</style>
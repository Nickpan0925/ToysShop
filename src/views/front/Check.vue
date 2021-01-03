<template>
<div>
    <Navbar/>
    <Progress :width='width'/>
    <div class="order-wrapper">
        <div class="order-container" v-if="!order.is_paid">
            <div class="orders-list">
                <div class="order" v-for="item in order.products" :key="item.id">
                    <div class="order-img" :style="{backgroundImage: 'url(' + item.product.imageUrl + ')' }"></div>
                    <div class="order-content">
                        <h3>{{ item.product.category}}</h3>
                        <p>{{ item.product.description}}</p>
                        <span class="price">NT${{ item.final_total }}</span>
                        <span class="qty">數量 X{{ item.qty }}</span>
                    </div>
                </div>
            </div>
            <div class="orders-message">
                <h3>訂單詳情</h3>
                <div class="ship">
                    <span>運送方式</span>
                    <span>快速出貨</span>
                </div>
                <div class="coupon">
                    <span>優惠券</span>
                    <span>已使用</span>
                </div>
                <div class="date">
                     <span>訂單建立時間</span>
                    <span>{{ order.create_at | convertDate}}</span>
                </div>
                <div class="total-price">
                    <span>總金額</span>
                    <span>{{ order.total}}</span>
                </div>
            </div>
        </div>
        <div class="pay-message" v-else>
            <p>感謝您的購買，歡迎再度光臨~~~</p>
            <img src="@/assets/cry.png" alt="">
        </div>
        <div class="customer-container">
            <Information :restFn="getOrder" :user="user" :order="order" />
        </div>
    </div>
        <Footer/>

</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Progress from '@/components/Progress.vue'
import Information from '@/components/Information.vue'
export default {
    data(){
        return{
            order:{},
            width:'100%',
            user:{}
        }
    },
    filters:{
        convertDate(value){
            let date = new Date(value*1000)
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDate()
            return `${year}-${month}-${day}`
        }
    },
    components:{
        Navbar,
        Footer,
        Progress,
        Information
    },
    methods:{
        getOrder(id = this.$route.query.id){
            const vm = this
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`
            this.$http.get(api).then(response =>{
                vm.order = response.data.order
                vm.user = response.data.order.user
            })
        },
    },
    created(){
        this.getOrder(this.$route.query.id)
    }
}
</script>

<style scoped>
.order-wrapper{
    width: 100%;
    line-height: 1.5;
    min-height:calc(100vh - 200px);
}
.order-container{
     max-width: 1200px;
     margin: 0 auto ;
     padding-top: 20px;
     display: flex;
}
.pay-message{
    max-width: 800px;
    margin: 20px auto 0;
    position: relative;
}
.pay-message p{
    position: absolute;
    bottom: 10%;
    font-size: 5rem;
    font-weight: bold;
    color: #fff;
}
.pay-message img{
    width: 100%;
}
.orders-list{
    width: 70%;
    background-color: #fff;
    border-radius: 20px;
}
.order{
    display: flex;
}
.order:not(:last-child){
     border-bottom: 1px solid rgba(51, 51, 51, 0.233);
}
.order-img{
    width: 100px;
    height: 100px;
    background: center/cover;
    margin: 10px;
}
.order-content{
    width: 70%; 
    padding:10px;
}
.order-content h3{
    font-size: 1.6rem;
}
.order-content p{
font-size: 1.3rem;
color: #918989;
}
.order-content .price{
    font-size: 1.6rem;
    font-weight: bold;
    color: rgba(255, 0, 0, 0.603);
}
.order-content .qty{
    font-size: 1.2rem;
    color: #91898975;
    float: right;
}
.orders-message{
    width: 30%;
    height: 200px;
    font-size: 1.3rem;
    line-height: 2;
    background-color: #3A3A3A;
    margin-left: 20px;
    color: #fff;
    padding:10px ;
    border-radius: 20px;
}
.orders-message h3{
    font-size: 1.5rem;
    text-align: center;
}
.ship,.total-price,.coupon,.date{
    display: flex;
    justify-content: space-between;
}
.customer-container{
    max-width:800px;
    margin: 20px auto 0;
}

@media screen and (max-width: 991px) {
    .order-container {
        flex-wrap: wrap;
    }

    .orders-list {
        width: 100%;
        padding: 10px;
    }

    .orders-message {
        width: 100%;
        height: auto;
        margin: 10px;
    }
}
@media screen and (max-width: 768px){
    .order-img{
    width: 80px;
    height: 80px;
}
}




</style>
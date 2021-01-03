<template>
<div>
    <Loading v-if="loading"/>
    <Navbar/>
    <Progress/>
    <div class="cart-wrapper" >
        <div class="cart-container" v-if="carts.final_total !== 0">
            <table class="cart">
                <thead>
                    <tr>
                        <th scope="col">品名</th>
                        <th scope="col">數量</th>
                        <th scope="col" >單價</th>
                        <th scope="col">小計</th>
                         <th scope="col">刪除</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="txt-center" v-for="item in carts.carts" :key="item.id">
                        <td>
                            <div class="img-container" :style="{backgroundImage: 'url(' + item.product.imageUrl + ')' }">

                        </div>
                        <p>{{ item.product.title}}</p>
                        </td>
                        <td>
                            <select class="form-select" name="count"  v-model="item.qty"  @change="changeCart(item.id,item.qty,item.product_id)">
                                <option v-for="num in 10" :key="num" :value="num">{{num}}</option>
                            </select>
                        </td>
                        <td >{{ item.product.price | currency }}</td>
                        <td >{{ item.final_total | currency}}</td>
                        <td><a href="javascript:;" @click="removeCart(item.id)"><i class="fas fa-times-circle"></i></a></td>
                    </tr>
                </tbody>
                <tfoot>
                     <tr class="price">
                        <td colspan="3" class="txt-right">小計</td>
                        <td colspan="2" class="price-detail">{{ carts.total | currency }}</td>
                    </tr>
                    <tr class="ship-price">
                        <td colspan="3" class="txt-right">運費</td>
                        <td colspan="2" class="price-detail">前往下一步驟計算</td>
                    </tr>
                    <tr>
                        <td colspan="3" scope="row" class="txt-right">總金額</td>
                        <td >${{ carts.total }}</td>
                        <td>
                        <router-link class="shop-btn" to="/order">前往結帳</router-link>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
         <div class="message" v-else>
             <p>購物車沒有商品~~~</p>
               <router-link to="/sales" class="btn">趕緊選購</router-link>
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
            carts:{
               
            },
            loading:false,
            empty:true
       }
    },
    components:{
        Navbar,
        Footer,
        Progress
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
        removeCart(id,message = true){
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
             const vm = this
            vm.loading = true
             this.$http.delete(api).then(response =>{
                 if(message)  this.$msg.success(response.data.message)
                 this.getCart()
                vm.loading = false
            })
        },
        changeCart(id, qty, addID) {
            const addAPI = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
            const vm = this
            console.log(id)
            let cart = {
                product_id: addID,
                qty
            }
            this.$http.all([
                vm.removeCart(id,false),
                this.$http.post(addAPI, {
                    data: cart
                })
            ]).then(this.$http.spread((acct, perms) => {
                vm.getCart()
                this.$msg.success('已更新數量')
            }));
        },
    },
    created(){
        this.getCart()
    }
}

</script>
<style scoped>
.cart-wrapper {
  width : 100%;
  min-height : calc(100vh - 116px);
}
.cart-container, .message {
  max-width : 1200px;
  margin : 70px auto;
  text-align : center;
}
.message p {
  font-size : 8rem;
  font-weight : bold;
  color : #333333;
}
.message a {
  display : block;
  width : 200px;
  margin : 20px auto;
  font-size : 3rem;
  line-height : 1.5;
  text-decoration : none;
  background-color : rgb(161, 41, 41);
  color : #FFFFFF;
  border-radius : 20px;
}
table {
  width : 100%;
  border-collapse : collapse;
  font-size : 1.5rem;
}
a, .price-detail {
  color : red;
}

thead th:nth-child(1) {
  width : 40%;
}

thead th:nth-child(2) {
  width : 15%;
}

thead th:nth-child(3) {
  width : 15%;
}

thead th:nth-child(4) {
  width : 20%;
}
thead th:nth-child(5) {
  width : 10%;
}
thead {
  font-size : 2rem;
  font-weight : bold;
  background-color : #333333;
  color : #FFFFFF;
}
tfoot > :not(:last-child) {
  background-color : #FFFFFF;
}
tfoot > :last-child {
  background-color : #333333;
  color : #FFFFFF;
}
tbody > tr:nth-child(odd) {
  background-color : #FAFAFA;
}
tbody > tr:nth-child(even) {
  background-color : #FFFFFF;
}
th, td {
  padding : 1.5rem;
}
.form-select {
  width : 100%;
}
.shop-btn {
  display : block;
  width : 100px;
  background-color : #FFFFFF;
  outline : none;
  border : none;
  border-radius : 5px;
  font-size : 1.5rem;
  line-height : 2;
  text-decoration : none;
  text-align : center;
  color : #333333;
}
.img-container {
  width : 150px;
  height : 150px;
  float : left;
  background : center/cover;
}
.txt-right {
  text-align : right;
}
.txt-left {
  text-align : left;
}
.txt-center {
  text-align : center;
}
.footer-wrapper {
  height : 60px;
}
@media screen and (max-width: 991px) {
  .img-container {
    width : 100px;
    height : 100px;
    float : none;
    margin : 0 auto;
  }
}

@media screen and (max-width: 768px) {
  .img-container {
    display : none;
  }
}



</style>
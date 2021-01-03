<template>
  <div>
      <Loading v-if="loading"/>
      <div class="shop-img">
          <div class="shop-count" @click="cartOpen = true">
              <span>{{ length }}</span>
          </div>
      </div>
      <div class="shop-wrapper" v-if="cartOpen" >
          <div class="shop-container">
              <h2>我的購物車</h2>
              <a class="close-btn" href="javascript:;" @click="cartOpen = false"><i class="fas fa-times"></i></a>
              <ul class="shop-list">
                  <li class="shop-item clearfix" v-for="item in cart.carts" :key="item.id">
                      <div class="item-img" :style="{backgroundImage: 'url(' + item.product.imageUrl + ')' }"></div>
                      <div class="item-title">
                          <h4>{{ item.product.title }}</h4>
                          <a href="javascript:;" @click="removeCart(item.id)"><i class="fas fa-trash-alt"></i></a>
                      </div>
                      <select  @change="changeCount(item.id,item.qty,item.product_id)" v-model="item.qty">
                          <option  v-for="num in 10" :key="num" :value="num">{{ num }}</option>
                      </select>
                      <span>{{ item.tatal }}</span>
                  </li>
              </ul>
              <div class="total-price">
                  <h3>總金額</h3>
                  <p>${{ cart.final_total }}</p>
              </div>
              <router-link to="/cart" class="pay-btn">前往結帳</router-link>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            data:[],
            cartOpen:false,
            loading:false
        }
    },
    props:['cart','restFN','length'],
    methods:{
        // 更改購物車單品數量
        changeCount(id, qty, addID) {
            const addAPI = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
            const vm = this
            let cart = {
                product_id: addID,
                qty
            }
            vm.loading = true
            // 先刪除再把新數量加入購物車
            this.$http.all([
                vm.removeCart(id,false),
                this.$http.post(addAPI, {
                    data: cart
                })
            ]).then(this.$http.spread((acct, perms) => {
                vm.restFN()
                this.$msg.success('已更新數量')
                vm.loading = false
            }))
        },
        removeCart(id,message = true){
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
             const vm = this
             vm.loading = true
             this.$http.delete(api).then(response =>{
                 if(message){
                    this.$msg.success(response.data.message)
                    this.restFN()
                    vm.loading = false
                 } 
            })
        },
     }

}
</script>

<style scoped>
.clearfix::before,
.clearfix::after{
    content: '';
    display:table;
    clear: both;
}
.shop-img{
    position: fixed;
    right: 5%;
    bottom: 5%;
    z-index: 999;
}
.shop-count{
     width: 80px;
    height: 80px;
    background: url(../assets/Cart.png) center/cover;
    position: relative;
    cursor: pointer;
}
.shop-count span{
    position: absolute;
    width: 25px;
    height: 25px;
    text-align: center;
    font-size: 2rem;
    top: 0%;
    left: -10%;
    background-color: #c1170c;
    color: #fff;
    border-radius: 50%;
}
.shop-wrapper{
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.616);
    z-index: 9999;
}
.shop-container{
    width: 300px;
    background-color: #D2D2D2;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
}
h2{
    font-size: 2.3rem;
    background-color: #333;
    color: #fff;
    line-height: 1.5;
}
.close-btn{
     color: #fff;
     position: absolute;
     top: 5px;
     right: 5px;
     font-size: 1.3rem;
}
.shop-list{
    width: 280px;
    margin: 10px auto 0;
}
.shop-item{
    width: 100%;
    background-color: #fff;
    clear: left;
    padding: 10px;
    margin-bottom: 10px;
}
.item-img{
    width: 60px;
    height: 60px;
    background:center/cover;
    float: left;
}
.item-title{
    display: flex;
    justify-content: space-between;
    font-size: 1.4rem;
    color: #333;
    line-height: 1.5;
}
.item-title a{
    color: rgba(255, 0, 0, 0.699);
}
.shop-item select{
    width: 100%;
    height:30px;
    outline: none;
    border:1px solid #dedede;
    margin-top: 10px;
}
.shop-item  span{
    font-size: 1.7rem;
    line-height: 2.5;
    float:right;
}
.total-price{
    width: 280px;
    margin: 10px auto 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    font-size: 1.8rem;
    line-height: 2;
    background-color: #fff;
}
.total-price p{
    color: rgba(197, 14, 14, 0.911);
}
.pay-btn{
    display: block;
    width: 280px;
    margin: 10px auto 10px;
    text-decoration: none;
    text-align: center;
    background-color: #CB3747;
    color: #fff;
    font-size: 1.5rem;
    line-height: 3.5;
}

</style>
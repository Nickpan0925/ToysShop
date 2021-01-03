<template>
<div>
     <Loading v-if="loading" />
    <a href="javascript:;">
        <div class="card">
            <div class="card-btn">
                <a
                    class="btn-message"
                    @click="detailHandler(item.id)"
                >查看詳情</a>
                <a
                    class="btn-cart"
                    href="javascript:;"
                    @click="addCart(item.id)"
                >加入購物車</a>
            </div>
            <div
                class="card-new"
                v-if="item.unit ==0 "
            ></div>
            <div
                class="card-hot"
                v-else
            ></div>
            <div
                class="card-img"
                :style="{backgroundImage: 'url(' + item.imageUrl + ')' }"
            ></div>
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-content">{{ item.description }}</p>
            <div class="price">
                <h5 class="origin_price">{{ item.origin_price | currency }}</h5>
                <h6 class="selling_price">{{ item.price | currency}}</h6>
            </div>
        </div>
    </a>
</div>

        
</template>
<script>
export default {
    data(){
        return{
            loading:false,
            cart:[]
        }
    },
    props:['item','restFN'],
    methods:{
        // 轉跳到商品的單一訊息
        detailHandler(id){
             this.$router.push(`/detail/${id}`)
        },
        // 加入購物車
        addCart(id, qty = 1) {
            const vm = this
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
            const cart = {
                product_id: id,
                qty
            }
            vm.loading = true
            this.$http.post(api, {
                data: cart
            }).then(response => {
                if (response.data.success) {
                    vm.loading = false
                    vm.restFN()
                    this.$msg.success(response.data.message)
                } else {
                    this.$msg.error(response.data.message)
                }
            })
        },
    },
}
</script>
<style scoped>
.btn-group > a {
  display : inline-block;
  text-decoration : none;
  font-size : 1.6rem;
  color : #666666;
  margin-right : 15px;
}

a {
  display : block;
  text-decoration : none;
}

.card {
  width : 250px;
  box-shadow : 0 0 5px rgba(0, 0, 0, .3);
  line-height : 2;
  color : #333333;
  background-color : #FFFFFF;
  position : relative;
  margin-bottom : 30px;
}

.card:hover > .card-btn {
  transform : scale(1);
}

.card-hot, .card-new {
  width : 100px;
  height : 100px;
  background : url('../assets/hot.png') center/cover;
  position : absolute;
  left : -15%;
  top : -10%;
}

.card-new {
  background : url('../assets/new.png') center/cover;
}

.card-btn {
  position : absolute;
  top : 0;
  left : 0;
  bottom : 0;
  right : 0;
  background-color : rgba(0, 0, 0, .7);
  transform : scale(0);
  transition : all .3s;
}

.card-btn > a {
  display : inline-block;
  text-decoration : none;
  width : 45%;
  position : absolute;
  top : 40%;
  text-align : center;
  font-size : 2rem;
  color : #FFFFFF;
  font-weight : bold;
  border-radius : 20px;
  transition : all .3s;
}

.btn-message {
  left : 0%;
  background-color : rgba(255, 0, 0, .719);
}

.btn-message:hover {
  color : rgba(255, 0, 0, .719);
  background-color : #FFFFFF;
}

.btn-cart {
  left : 53%;
  background-color : rgba(8, 92, 23, .753);
}

.btn-cart:hover {
  color : rgba(8, 92, 23, .753);
  background-color : #FFFFFF;
}

.card-img {
  width : 250px;
  height : 250px;
  margin : 0 auto;
  background : center/cover;
}

.card-title {
  font-size : 1.5rem;
  text-align : center;
  font-weight : bold;
}

.card-content {
  font-size : 1.3rem;
  overflow : hidden;
  white-space : nowrap;
  text-overflow : ellipsis;
  padding : 0 22px 0 22px;
}

.price {
  display : flex;
  justify-content : center;
}

.origin_price {
  text-decoration : line-through;
  margin-right : 20px;
  font-size : 1.5rem;
  line-height : 3;
  color : #747D84;
}

.selling_price {
  font-size : 2.2rem;
  color : rgba(255, 0, 0, .842);
}




</style>
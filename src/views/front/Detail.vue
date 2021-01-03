<template>
<div>
    <Loading v-if="loading"/>
       <Shopcart :cart="cart" :restFN="getCart" :length="length"/>
    <Navbar/>
    <div class="product-wrapper">
         <ol class="breadcrumb">
             <li class="breadcrumb-item"> <router-link to="/home">首頁</router-link></li>
             <li class="breadcrumb-item"><router-link to="/sales">所有商品</router-link></li>
             <li class="breadcrumb-item"><a href="javascript:;" class="active">{{ product.title }}</a></li>
            </ol>
        <div class="product-container">
            <div class="product-img" :style="{backgroundImage: 'url(' + product.imageUrl + ')' }"></div>
            <div class="product-detail">
                <h2>{{ product.title }}</h2>
                <span class="origin_price">{{ product.origin_price | currency}}</span>
                <span class="price">{{ product.price | currency}}</span>
                <div class="form">
                    <button @click="count++">+</button>
                    <input
                        type="text"
                        v-model="count"   
                    >
                    <button  @click="count--" :disabled="count <= 1">-</button>
                </div>
                <button class="cart-btn" @click="addCart(product.id)" >加入購物車</button>
                <div class="product-message">
                    <a href="#" @click.prevent="openContent = false" :class="{'active':!openContent}">商品描述</a>
                    <a href="#" @click.prevent="openContent = true" :class="{'active':openContent}">商品資訊</a>
                    <p v-if="!openContent">{{ product.description }}</p>
                    <p v-if="openContent">{{ product.content }}</p>
                </div>
                <ul class="product-rule">
                    <li>
                        <h3>運送 & 退貨</h3>
                        <p>標準運送: 4 - 6 個工作天送達</p>
                    </li>
                    <li>
                        <h3>優惠活動</h3>
                        <p>所有訂單滿NT$1,500即可享有免費標準運送</p>
                    </li>
                    <li>
                        <h3>運送 & 退貨</h3>
                        <p>標準運送: 4 - 6 個工作天送達</p>
                    </li>
                </ul>
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
import Shopcart from '@/components/Shopcart.vue' 
export default {
    data(){
        return{
            cardId:'',
            product:{},
            count:1,
            loading:false,
            openContent:false,
            cart:{},
            length:''
        }
    },
    components:{
        Navbar,
        Footer,
        Shopcart
    },
    methods:{
        getProduct(id){
            const vm = this
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
            vm.loading = true
           this.$http.get(api).then(response=>{
                vm.product =response.data.product
                vm.loading = false
            })
        },
        addCart(id){
         const vm =this
         const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
          const cart = {
              product_id:id,
              qty:vm.count
          }
          vm.loading = true
          this.$http.post(api,{data:cart}).then(response=>{
              if(response.data.success){
                  vm.loading = false
                   this.$msg.success(response.data.message)
                    vm.getCart()
              }else{
                  this.$msg.error(response.data.message)
              }
          })
        },
          getCart(){
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
            const vm = this
            this.$http.get(api).then(response =>{
               vm.cart = response.data.data
               vm.length = response.data.data.carts.length
            })
        },
    },
    created() {
        const vm = this
        vm.cardId = this.$route.params.cardId
        vm.getProduct(vm.cardId)
        vm.getCart()
    },

}
</script>
<style lang="scss" scoped>
.footer-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
}

.product-wrapper {
    width: 100%;
    margin-top: 100px;

    .breadcrumb {
        max-width: 1100px;
        margin: auto;

        .breadcrumb-item {
            display: inline-block;
            font-size: 1.5rem;

            a {
                text-decoration: none;
                color: #333;
            }

            .active {
                color: rgba(255, 0, 0, 0.829);
            }
        }

        .breadcrumb-item+.breadcrumb-item::before {
            content: '/';
            margin: 0 10px 0;
        }
    }

    .product-container {
        max-width: 1200px;
        margin: 60px auto 0;
        display: flex;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        background-color: #fff;

        .product-img {
            width: 500px;
            height: 400px;
            background: center/cover;
            margin: 50px;
        }

        .product-detail {
            width: 500px;
            line-height: 1.5;

            h2 {
                font-size: 2.5rem;
            }

            .origin_price {
                font-size: 2rem;
                text-decoration: line-through;
                color: #ddd;
                display: block;
            }

            .price {
                font-size: 3rem;
                color: red;
            }

            .form {
                width: 100px;

                button {
                    width: 30%;
                    height: 30px;
                    outline: none;
                    border: none;
                    background-color: #333;
                    color: #fff;
                    cursor: pointer;
                }

                button[disabled] {
                    background-color: rgba(0, 0, 0, 0.425)
                }

                input {
                    width: 30%;
                    height: 25px;
                    border: none;
                    outline: none;
                }
            }

            .cart-btn {
                width: 80%;
                height: 40px;
                margin-top: 20px;
                background-color: #333333;
                color: #fff;
                font-size: 1.5rem;
                border-radius: 20px;
                outline: none;
                border: none;
                cursor: pointer;
            }

            .product-message {
                margin-top: 40px;
                max-width: 400px;

                a {
                    color: #A9ABA9;
                    font-size: 1.6rem;
                    line-height: 2;
                    margin-right: 20px;
                }

                .active {
                    color: #000;
                    font-size: 1.8rem;
                    font-weight: bold;
                }

                p {
                    display: block;
                    font-size: 1.4rem;
                }
            }

            .product-rule {
                margin-top: 20px;
                padding-top: 18px;
                border-top: 2px solid #A9ABA9;

                li {
                    margin-bottom: 15px;

                    h3 {
                        color: rgb(32, 136, 84);
                        font-size: 1.6rem;
                        font-weight: bold;
                    }

                    p {
                        font-size: 1.3rem;
                    }
                }
            }
        }
    }
}


@media screen and (max-width: 991px) {
    .product-wrapper {
        .product-container {
            max-width: 768px;

            .product-img {
                width: 40%;
                background: url(../../assets/card.png) center/cover;
            }

            .product-detail {
                width: 40%;
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .product-wrapper {
        margin-top: 0;

        .product-container {
            flex-wrap: wrap;

            .product-img {
                width: 100%;
                margin: 50px auto 5px;
            }

            .product-detail {
                width: 100%;
                padding-left: 30px;
            }
        }

        .footer-wrapper {
            position: absolute;
        }
    }
}
</style>
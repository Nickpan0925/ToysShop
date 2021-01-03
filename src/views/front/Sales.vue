<template>
    <div>
        <Shopcart :cart="cart" :restFN="getCart" :length="length"/>
       <Navbar/>
       <div class="subnav-wrapper">
           <Subnav @changeCard="changeCard" />
       </div>
         <div class="products-wrapper">
             <div class="products-container">
                  <div class="btn-group">
             <a
                 :class="{'active':sort === 'ascending'}"
                 href="javascript:;"
                 @click="sortPrice(sort = 'ascending')"
             >價格<i class="fas fa-arrow-up"></i></a>
             <a
                 :class="{'active':sort === 'descending'}"
                 href="javascript:;"
                 @click="sortPrice(sort = 'descending')"
             >價格<i class="fas fa-arrow-down"></i></a>
         </div>
                 <div class="card-list">
                      <Card v-for="item in products" :key="item.id" :item="item" :restFN="getCart"/>
                 </div>
             </div>
         </div>
       <div class="footer-wrapper">
           <Footer/>
       </div>
            <Loading v-if="loading" />
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Subnav from '@/components/Subnav.vue'
import Card from '@/components/Card.vue'
import Footer from '@/components/Footer.vue' 
import Shopcart from '@/components/Shopcart.vue' 
export default {
    data(){
        return{
            products:[],
            loading:false,
            title:'所有商品',
            allProducts:[],
            sort:'',
            cart:{},
            length:''
        }
    },
    computed:{
        // unit =0 就是預購商品
        preOrder(){
             return this.allProducts.filter(item =>{
                return item.unit == 0
            })
           
        },
        // 挑出不同類別商品(七龍珠，鬼滅，火影)
        changeTitle(){
             return this.allProducts.filter(item =>{
                return item.category === this.title
            })
        },
        // nuit !=0 就是熱銷商品
        hotProducts(){
            return this.allProducts.filter(itme=>{
                return itme.unit !=0
            })
        },
        // 價錢降序
        descendingPrice(){
           return this.allProducts.sort((a,b) =>{
                return b.price - a.price
            })
        },
        // 價錢升序
         ascendingPrice(){
           return this.allProducts.sort((a,b) =>{
                return a.price - b.price
            })
        }
    },
    components:{
        Navbar,
        Subnav,
        Card,
        Footer,
        Shopcart
    },
    methods:{
        // 取得所有產品
        getProducts() {
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
            const vm = this
            vm.loading = true
            this.$http.get(api).then(response => {
                vm.allProducts = response.data.products
                 vm.allProducts.unit =  vm.allProducts.unit *1
                 vm.products = vm.allProducts.slice(0)
                 vm.loading = false
            })
        },
        // 點擊導航，分別展示不同商品
        changeCard(val){
            const vm =this 
            vm.title = val
             vm.products = []
             let hash ={
                 '所有商品' : vm.allProducts,
                 '熱銷商品' : vm.hotProducts,
                 '預購專區':vm.preOrder,
             }
            vm.products = hash[val] ? hash[val] : vm.changeTitle
        },
        // 對所有商品價錢進行排序
        sortPrice(val) {
            const vm = this
            vm.products = []
            if (val === 'ascending') {
                vm.products = vm.descendingPrice
                this.sortHandler()
            } else {
                vm.products = vm.ascendingPrice
                this.sortHandler()
            }
        },
        // 把對應商品的價錢排序取出來
        sortHandler(){
            const vm = this
            let hash ={
                 '所有商品' : vm.allProducts,
                 '熱銷商品' : vm.hotProducts,
                 '預購專區':vm.preOrder,
                 '所有商品':vm.products,
                 '七龍珠':vm.changeTitle,
                 '鬼滅之刃':vm.changeTitle,
                 '火影忍者':vm.changeTitle
             }
           return  vm.products = [...new Set(hash[vm.title])]
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
    created(){
        this.getProducts()
        this.getCart()
    }
}
</script>

<style scoped>


.subnav-wrapper{
    width: 100%;
    padding-top: 100px;
}
.products-wrapper{
    width: 100%;
}
.products-container {
    max-width: 1200px;
    margin: 50px auto;
}
.card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.btn-group{
    margin-bottom: 40px;
}
.btn-group > a{
    display: inline-block;
    text-decoration: none;
    font-size: 1.6rem;
    color: #666;
    margin-right: 15px;
}
a.active{
    color:rgba(255, 0, 0, 0.781);
}


</style>
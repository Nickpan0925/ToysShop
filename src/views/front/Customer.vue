<template>
    <div>
        <Navbar/>
        <Progress :width="width"/>
        <div class="form-wrapper">
            <ValidationObserver v-slot="{ handleSubmit }">
            <form class="form" @submit.prevent="handleSubmit(createOrder)">
                <span>*星號欄位必填</span>
                <div class="form-group">
                     <label for="name">收件人姓名</label>
                     <validation-provider rules="required" v-slot="{ errors }">
                    <input type="text" name="姓名" id="name" placeholder="*收件人姓名" v-model="order.user.name">
                    <span>{{errors[0]}}</span>
                    </validation-provider>
                </div>
                 <div class="form-group">
                     <label for="email">收件人信箱</label>
                     <validation-provider rules="required|email" v-slot="{ errors }">
                     <input type="text" name="email" id="email" placeholder="*收件人信箱" v-model="order.user.email">
                     <span>{{errors[0]}}</span>
                    </validation-provider>
                </div>
                 <div class="form-group">
                     <label for="phone">收件人電話</label>
                      <validation-provider rules="required" v-slot="{ errors }">
                    <input type="text" name="電話" id="phone" placeholder="*收件人電話" v-model="order.user.tel">
                    <span>{{errors[0]}}</span>
                    </validation-provider>
                </div>
                 <div class="form-group">
                     <label for="address">收件人地址</label>
                     <validation-provider rules="required" v-slot="{ errors }">
                    <input type="text" name="地址" id="address" placeholder="*收件人地址" v-model="order.user.address">
                     <span>{{errors[0]}}</span>
                    </validation-provider>
                </div>
                 <div class="form-group">
                    <label for="message" >備註</label>
                   <textarea name="message" id="message" cols="75" rows="5" placeholder="備註" v-model="order.message"></textarea>
                </div>
                <div class="form-group">
                    <router-link to="/order"><button><i class="fas fa-angle-left "></i>上一步</button></router-link>
                    <button type="submit" >提交<i class="fas fa-angle-right"></i></button>
                </div>
            </form>
             </ValidationObserver>
        </div>
         <Footer/>
    </div>

</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Progress from '@/components/Progress.vue'
export default {
    data(){
        return{
            width:'75%',
            order:{
                user:{
                    name:'',
                    email:'',
                    tel:'',
                    address:''
                },
                message:''
            },
            orderID:''
        }
    },
    components:{
        Navbar,
        Footer,
        Progress,
    },
    methods:{
        createOrder(){
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
            const vm = this
            vm.loading = true
            this.$http.post(api, {
                data: vm.order
            }).then(response => {
                if (response.data.success) {
                    this.$msg.success(response.data.message)
                    vm.orderID = response.data.orderId
                    vm.loading = false
                    this.$router.push({
                        path: '/check',
                        query: {id: vm.orderID}
                    })
                    }else{
                    this.$msg.error(response.data.message)
                    vm.loading = false
                    }
            })
            }
    }
}
</script>
<style scoped>
.form-wrapper{
    width: 100%;
    min-height: calc(100vh - 200px);
}
.form{
    max-width: 550px;
    margin:15px auto 0;
    background-color:rgba(0, 0, 0, 0.13);
    font-size: 1.8rem;
    font-weight: bold;
    padding:20px;
    border-radius: 10px;
}
.form span{
    font-size: 1rem;
    color: rgba(255, 0, 0, 0.685);
}
.form-group input,
.form-group textarea{
    width: 100%;
    font-size: 1.6rem;
    line-height: 2;
    border-radius: 10px;
    border: none;
    outline: none;
}
.form-group:last-child{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
.form-group button{
   display: block;
    text-decoration: none;
    text-align: center;
    background-color: #3A3A3A;
    color: #fff;
    padding: 10px;
    margin-top: 10px;
   border-radius: 10px;
   outline: none;
   border: none;
   cursor: pointer;
}


.form label{
display: block;
margin: 20px 0 10px 0;
}


</style>
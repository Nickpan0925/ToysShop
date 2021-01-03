<template>
<div>
    <Loading v-if="loading" />
    <div class="order-wrapper">
        <div class="order-container">
            <table>
                <thead>
                    <tr>
                        <th>購買時間</th>
                        <th>Email</th>
                        <th>購買款項</th>
                        <th>應付金額</th>
                        <th>是否付款</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item,index) in orders"
                        :key="index"
                    >
                        <td>{{ item.paid_date | convertDate}}</td>
                        <td>
                            <span v-if="item.user === undefined" style="color:red">訂單不成立</span>
                            <span v-else>{{ item.user.email }}</span>
                        </td>
                        <td>
                            <span
                                v-for="(product,index) in item.products"
                                :key="index"
                            >{{product.product.title }}/</span>
                        </td>
                        <td class="text-right">{{ item.total | currency}}</td>
                        <td>
                            <span
                                v-if="item.is_paid"
                                :class="{'pay':item.is_paid}"
                            >已付款</span>
                            <span
                                v-else
                                :class="{'no-pay':!item.is_paid}"
                            >未付款</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="pagination">
                <Pagination
                    @pageChange="pageChange"
                    :pagination="pagination"
                />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
export default {
    data(){
        return{
            orders:[],
            pagination:{},
            loading:false
        }
    },
    components:{
        Pagination
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
    methods:{
        getOrders(page = 1){
            const vm =this
             const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/orders?page=${page}`
             vm.loading = true
             this.$http.get(api).then(response=>{
                 vm.orders = response.data.orders
                 vm.pagination = response.data.pagination
                 vm.loading = false
             })
        },
        pageChange(toPage){
           this.getOrders(toPage)
        }
    },
    created(){
        this.getOrders()
    }
}
</script>

<style  scoped>

.order-wrapper{
    width: 100%;
    padding: 20px 20px 0 250px;
}
.order-container{
     max-width: 1200px;
}
.pay{
    color: rgb(11, 61, 11);
}
.text-right{
    text-align: center;
}
.no-pay{
    color: rgba(192, 25, 25, 0.753);
}
table{
    width: 100%;
    background-color: #fff;
}
table th{
   font-size: 1.6rem;
  font-weight: bold;
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #000;
}
table td{
   font-size: 1.4rem;
   line-height: 1.5;
   border-bottom: 1px solid #000;
   padding: 7px;
}

thead th:nth-child(1) {
  width: 10%;
}

thead th:nth-child(2) {
  width: 20%;
}

thead th:nth-child(3) {
  width: 50%;
}

thead th:nth-child(4) {
  width: 10%;
}
thead th:nth-child(5) {
  width:10%;
}
tbody tr:nth-child(odd) td{
     background-color: #fff;
}
tbody tr:nth-child(even) td {
   background-color: #F8F8F8;
}
.pagination{
    margin-top: 5px;
    float: right;
}
@media screen and (max-width: 991px) {
    .order-wrapper {
        padding-left: 60px;
    }
}




</style>


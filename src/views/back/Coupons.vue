<template>
<div>
    <CouponModal
        v-if="modalOpen"
        :active.sync="modalOpen"
        :isNew = "isNew"
        :deitCoupons = "deitCoupons"
        :resetFn="getCoupons"
    />
    <Loading v-if="loading" />
    <div class="coupon-wrapper">
        <div class="topbar">
            <button class="btn" @click="modalHandler(true)"><i class="fas fa-ticket-alt"></i>新增優惠券</button>
        </div>
        <table class="coupons-list">
            <thead>
                <tr>
                    <th>名稱</th>
                    <th>折扣百分比</th>
                    <th>到期日</th>
                    <th>是否啟用</th>
                    <th>編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in coupons"
                    :key="item.id"
                >
                    <td data-label="名稱">{{ item.title }}</td>
                    <td data-label="折扣百分比">{{ item.percent }}</td>
                    <td data-label="到期日">{{ item.due_date | convertDate }}</td>
                    <td data-label="是否啟用">
                        <span
                            style="color:#42B983"
                            v-if="item.is_enabled ==1"
                        >已啟用</span>
                        <span
                            style="color:red"
                            v-else
                        >未啟用</span>
                    </td>
                    <td data-label="編輯"><button class="btn edit-btn" @click="modalHandler(false,item)">編輯</button>
                        <button
                            class="btn delete-btn"
                            @click="removeCoupon(item.id)"
                        >刪除</button>
                    </td>
                </tr>
            </tbody>
            <Pagination @pageChange="pageChange" :pagination="pagination"/>
        </table>
    </div>
</div>
</template>
<script>
import CouponModal from '@/components/CouponModal.vue'
import Pagination  from '@/components/Pagination.vue'
export default {
    data(){
        return{
            modalOpen:false,
            coupons:[],
            loading:false,
            isNew:false,
            deitCoupons:{},
            pagination:{}
        }
    },
    components:{CouponModal,Pagination},
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
        modalHandler(val,item = {}){
            const vm = this
            vm.modalOpen = true
            vm.isNew = val
            vm.deitCoupons = Object.assign({},item)
        },
        getCoupons(page = 1){
             const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
             const vm =this
             vm.loading = true
             this.$http.get(api).then(response=>{
                 vm.pagination = response.data.pagination
                 vm.coupons = response.data.coupons
                 vm.loading = false
             })
        },
        removeCoupon(id){
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${id}`
             const vm =this
             vm.loading = true
             this.$http.delete(api).then(response => {
                 console.log(response)
                 this.getCoupons()
                 vm.loading = false
             })
        },
        pageChange(page){
           this.getCoupons(page)
        }
    },
    created(){
        this.getCoupons()
    }
}
</script>
<style scoped>
.coupon-wrapper {
  height : 100%;
  background-color : #C8EBDF;
  padding : 20px 20px 0 250px;
  position : fixed;
  top : 0;
  left : 0;
  bottom : 0;
  right : 0;
  z-index : -999;
  overflow : scroll;
}

.topbar > .title {
  float : left;
  font-size : 3rem;
  line-height : 1.5;
}

.mark {
  font-size : 1.3rem;
  color : #42B983;
}

.topbar > .btn {
  float : right;
  color : #FFFFFF;
  background-color : #42B983;
  outline : none;
  border : none;
  font-size : 1.3rem;
  padding : 10px;
  border-radius : 10px;
  cursor : pointer;
}

.coupons-list {
  width : 80%;
  margin : 50px auto;
  font-size : 1.3rem;
  border : 1px solid;
  border-color : #DDDDDD transparent #DDDDDD transparent;
  border-collapse : collapse;
  text-align : center;
  line-height : 1.5;
}

.coupons-list th, .coupons-list td {
  padding : 10px;
  border-bottom : 1px solid #DDDDDD;
  background-color : #FFFFFF;
}

.coupons-list th {
  font-size : 1.6rem;
  font-weight : bold;
}

.btn {
  outline : none;
  background-color : #FFFFFF;
  padding : 5px;
  cursor : pointer;
}
.edit-btn {
  border : 1px solid #42B983;
  color : #42B983;
  border-radius : 5px 0 0 5px;
}
.delete-btn {
  border : 1px solid #DC3545;
  color : #DC3545;
  border-radius : 0 5px 5px 0;
}

.price {
  text-align : right;
}

@media screen and (max-width: 991px) {
  .coupon-wrapper {
    padding-left : 60px;
  }
}

@media screen and (max-width: 768px) {
  .coupons-list {
    border : none;
  }

  .coupons-list > thead {
    display : none;
  }

  .coupons-list td {
    display : block;
    text-align : right;
  }

  .coupons-list td::before {
    content : attr(data-label);
    float : left;
    font-size : 1.5rem;
    font-weight : bold;
  }

  .coupons-list tr {
    border : 1px solid #DDDDDD;
    border-bottom : transparent;
    display : block;
    margin-bottom : 30px;
    box-shadow : 0 0 5px rgba(0, 0, 0, .3);
  }
}


</style>
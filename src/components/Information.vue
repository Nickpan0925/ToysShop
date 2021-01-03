<template>
<div>
    <h2>訂購者資料</h2>
            <table class="customer">
                <tbody>
                    <tr>
                        <td>Email</td>
                        <td>{{ user.email }}</td>
                    </tr>
                     <tr>
                        <td>收件人姓名</td>
                        <td>{{ user.name }}</td>
                    </tr>
                     <tr>
                        <td>收件人電話</td>
                        <td>{{ user.tel }}</td>
                    </tr>
                     <tr>
                        <td>收件人地址</td>
                        <td>{{ user.address }}</td>
                    </tr>
                     <tr>
                        <td>付款狀態</td>
                        <td v-if="!order.is_paid" style="color:red">尚未付款</td>
                        <td v-else  style="color:green">已付款</td>
                    </tr>
                </tbody>
            </table>
            <tr class="btn-group">
                <template v-if="!order.is_paid">
                     <button class="cancle" ><span>取消購買</span></button>
                    <button class="confirm"  @click="payHandler">確認付款</button>
                </template>
              <router-link to="/home" v-else> <button class="confirm">繼續購物</button></router-link>
            </tr>
</div>
</template>

<script>
export default {
    props:['order','user','restFn'],
    methods:{
        payHandler(){
            const vm = this
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.order.id}`
            this.$http.post(api).then(response=>{
                if(response.data.message){
                   this.$msg.success(response.data.message)
                   vm.restFn()
                }else{
                    this.$msg.error(response.data.message)
                }
            })
        },
    }
}
</script>

<style scoped>
.customer-container h2 {
    font-size: 2.5rem;
    text-align: center;
    background-color: #3A3A3A;
    color: #fff;
}

.customer tr {
    background-color: #fff;
    border-bottom: 1px solid rgba(134, 132, 132, 0.726);
    font-size: 1.8rem;

}

.customer tr td:first-child {
    width: 200px;
    font-weight: bold;
    padding: 20px;
}

.customer tr td:last-child {
    width: 600px;
    text-align: left;
}

.btn-group {
    display: flex;
    justify-content: flex-end;
    outline: none;
    border: none;
    margin-top: 10px;
}

.cancle,
.confirm {
    color: #fff;
    outline: none;
    border: none;
    font-size: 1.4rem;
    padding: 10px;
    border-radius: 20px;
    cursor: pointer;
}

.confirm {
    background-color: #3A3A3A;
    margin-left: 10px;
}

.cancle {
    background-color: rgba(255, 0, 0, 0.589);
}

</style>
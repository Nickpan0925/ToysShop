<template>
    <div>
         <div class="modal-wrapper">
              <Loading v-if="loading" />
        <div class="modal">
              <div class="modal-title">
               <span>編輯優惠券</span>
           </div>
            <form action="" class="modla-form" >
                <div class="field-wrap">
                    <label for="tltle">標題</label>
                    <input type="text" id="tltle" name="tltle" placeholder="請輸入標題" v-model="coupon.title">
                </div>
                <div class="field-wrap">
                    <label for="code">優惠碼</label>
                    <input type="text" id="code" name="code"  placeholder="請輸入優惠碼" v-model="coupon.code">
                </div>
                <div class="field-wrap">
                    <label for="date">到期日</label>
                    <input type="date" id="date" name="date" 
                    v-model="coupon.due_date">
                </div>
                <div class="field-wrap">
                    <label for="percent">折扣百分比</label>
                    <input type="number" id="percent" name="percent" min="10" max="90" value="10" v-model="coupon.percent">
                </div>
                <div class="field-wrap">
                    <label class="checkbox-label" for="use">是否啟用</label>
                    <input class="checkbox" type="checkbox" id="use" name="use" true-value="1" false-value="0"   v-model="coupon.is_enabled">
                </div>
                <div class="btn-group">
                    <button class="close" @click="closeHandler">關閉</button>
                    <button class="add" @click.prevent="updateHandler">更新優惠券</button>
                </div>
                
            </form>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            coupon: {
            },
            loading:false
        }
    },
    props:['active','resetFn','isNew','deitCoupons'],
    methods:{
        closeHandler(){
            const vm = this
            this.$emit('update:active',!vm.active)
        },
        updateHandler(){
             let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
             const vm = this
             let httpMethod = 'post'
             vm.loading = true
             vm.coupon.due_date = Math.floor(new Date(vm.coupon.due_date) / 1000)
             vm.coupon.percent  =  vm.coupon.percent*1
             const id = vm.coupon.id
            //  判斷是否為編輯
             if(!vm.isNew){
                  httpMethod = 'put'
                  api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${id}`
             }
            this.$http[httpMethod](api,{data:vm.coupon}).then(response =>{
                this.$emit('update:active',!vm.active)
                vm.resetFn()
                vm.loading = false
            })
        },
    },
    created(){
        const vm = this
        if(!vm.isNew){
            vm.coupon = vm.deitCoupons
        }else{
            vm.coupon = {}
        }
    }
}
</script>
<style scoped>
label {
  display : block;
  margin-bottom : 5px;
  margin-top : 15px;
}

input {
  outline : none;
  height : 2.5rem;
  width : 90%;
}

.checkbox {
  width : auto;
  height : auto;
}

.checkbox-label {
  display : inline;
}

.modal-wrapper {
  background-color : rgba(0, 0, 0, .6);
  position : absolute;
  top : 0;
  bottom : 0;
  left : 0;
  right : 0;
}

.modal {
  max-width : 600px;
  margin : auto;
  border-radius : 10px;
  font-weight : bold;
  background-color : #FFFFFF;
  padding : 30px;
  border-radius : 10px;
  font-weight : bold;
  font-size : 1.6rem;
}

.modal-title {
  font-size : 2rem;
}

.field-wrap {
  margin-top : 10px;
}

.btn-group {
  font-size : 18px;
  text-align : center;
  margin-top : 20px;
}

.btn-group .add, .btn-group .close {
  cursor : pointer;
  outline : none;
  background-color : #FFFFFF;
  padding : .3rem;
  font-size : 1.6rem;
}

.btn-group .add {
  border : 1px solid #42B983;
  color : #42B983;
}

.btn-group .close {
  border : 1px solid #DC3545;
  color : #DC3545;
}

.btn-group .add:hover {
  background-color : #42B983;
  color : #FFFFFF;
}

.btn-group .close:hover {
  background-color : #DC3545;
  color : #FFFFFF;
}


</style>
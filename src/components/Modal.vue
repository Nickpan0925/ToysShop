<template>
<div>
    <div class="modal-wrapper">
        <Loading v-if="loading" />
        <form class="modal">
            <div class="modal-title">
                <span>新增產品</span>
                <a
                    href="javascript:;"
                    @click="closeHandelr"
                ><i class="fas fa-times"></i></a>
            </div>
            <div class="modal-content">
                <div class="img-row">
                    <div class="field-wrap">
                        <label for="imgurl">輸入圖片網址</label>
                        <input
                            type="text"
                            id="imgurl"
                            name="imgurl"
                            placeholder="輸入圖片網址"
                            v-model="tempProduct.imageUrl"
                        >
                    </div>
                    <div class="field-wrap">
                        <label for="img">或上傳圖片</label>
                        <input
                            type="file"
                            id="img"
                            name="img"
                            ref="files"
                            @change="uploadImg"
                        >
                    </div>
                    <div class="img-cotainer">
                        <img :src="tempProduct.imageUrl">
                    </div>
                </div>
                <div class="product-row">
                    <div class="field-wrap">
                        <label for="title">標題</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="輸入圖片網址"
                            v-model="tempProduct.title"
                        >
                    </div>
                    <div class="field-wrap">
                        <label for="category">分類</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            placeholder="輸入分類"
                            v-model="tempProduct.category"
                        >
                        <label for="unit">單位</label>
                        <input
                            type="text"
                            id="unit"
                            name="unit"
                            placeholder="輸入圖片單位"
                            v-model="tempProduct.unit"
                        >
                    </div>
                    <div class="field-wrap ">
                        <label for="original__price">原價</label>
                        <input
                            type="text"
                            id="original__price"
                            name="original__price"
                            placeholder="輸入原價"
                            v-model="tempProduct.origin_price"
                        >
                        <label for="price">售價</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            placeholder="輸入售價"
                            v-model="tempProduct.price"
                        >
                    </div>
                    <div class="field-wrap">
                        <label for="description">產品描述</label>
                        <textarea
                            name="description"
                            id="description"
                            cols="20"
                            rows="5"
                            v-model="tempProduct.description"
                        ></textarea>
                    </div>
                    <div class="field-wrap">
                        <label for="message">說明內容</label>
                        <textarea
                            name="message"
                            id="message"
                            cols="20"
                            rows="5"
                            v-model="tempProduct.content"
                        ></textarea>
                    </div>
                    <div class="field-wrap">
                        <label for="enable">是否啟用</label>
                        <input
                            type="checkbox"
                            name="enable"
                            id="enable"
                            v-model="tempProduct.is_enabled"
                            true-value="1"
                            false-value='0'
                        >
                    </div>
                    <button
                        class="update-btn"
                        @click.prevent="updateProduct()"
                    >確認</button>
                </div>
            </div>
        </form>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            tempProduct:{},
            loading:false,
        }
    },
    props:['active','editProduct','isNew','resetFn'],
    methods:{
        closeHandelr(){
             this.$emit('update:active', !this.active)
        },
        uploadImg(){
            const file = this.$refs.files.files[0]
            const formData  = new FormData()
            formData.append('file-to-upload',file)
            const vm = this
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
            vm.loading =true
            this.$http.post(api,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then(response=>{
                if(response.data.success){
                    vm.$set(vm.tempProduct,'imageUrl',response.data.imageUrl)
                    vm.loading =false
                }else{
                    alert('檔案格式錯誤')
                     vm.loading =false
                }
            })
        },
        updateProduct(){
            const vm = this
            let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
            let httpMethod = 'post'
            let id = vm.tempProduct.id
             vm.loading =true
            //  判斷是否為編輯
            if(!vm.isNew){
                api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${id}`
                httpMethod = 'put'
            }
            this.$http[httpMethod](api,{data:vm.tempProduct}).then(response =>{
                vm.closeHandelr()
                vm.resetFn()
                vm.loading =false

            })
        },
    },
    created(){
        const vm = this
        if(!vm.isNew){
            vm.tempProduct = vm.editProduct
        }else{
             vm.tempProduct = {}
        }
    }
}
</script>
<style scoped>
label {
    display: block;
    margin-bottom: 5px;
    margin-top: 15px;
}
label[for="enable"]{
     display: inline-block;
}
input {
    outline: none;
    width: 80%;
}
input[type="checkbox"]{
   display: inline-block;
   width: 10%;
}
.modal-wrapper {
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
}

.modal {
    max-width: 600px;
    margin: auto;
    font-weight: bold;
}

.modal-title {
    background-color: #2C3E50;
    font-size: 2rem;
    line-height: 2;
    color: #fff;
    padding: 15px;
}

.modal-title>a {
    color: #fff;
    float: right;
}

.modal-content {
    font-size: 1.6rem;
    display: flex;
    justify-content: center;
    padding-top: 30px;
    padding-bottom: 30px;
    background: #fff;
}
.img-row .field-wrap{
    padding-left: 10px;
}
.img-row,
.product-row {
    width: 50%;
}

.img-cotainer {
    width: 90%;
    margin-top: 10px;
    margin-left: 10px;
}

.img-cotainer>img {
    width: 100%;
}

.update-btn {
    color: #fff;
    background-color: #42B983;
    outline: none;
    border: none;
    font-size: 1.6rem;
    float: right;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    margin-right: 20px;
}

@media screen and (max-width: 991px) {
    .modal {
        max-width: 450px;
    }

    .modal-content {
        padding: 20px;
    }
}


















</style>
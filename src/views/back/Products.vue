<template>
<div>
    <Modal
        v-if="modalOpen"
        :active.sync="modalOpen"
        :editProduct ="editProduct"
        :isNew = "isNew"
        :resetFn ="getProduct"
    /> 
    <Loading v-if="lodaing"/>
    <div class="products-wrapper">
        <div class="topbar">
            <span class="title">產品控制台<span class="mark">共{{ ProductsLength }}件產品</span></span>
            <button
                class="btn"
                @click="modalHandler(true)"
            ><i class="fas fa-edit"></i>新增產品</button>
        </div>
        <div class="cotainer">
            <table class="products-list">
                <thead>
                    <tr>
                        <th>分類</th>
                        <th>產品名稱</th>
                        <th>原價</th>
                        <th>售價</th>
                        <th>是否啟用</th>
                        <th>編輯</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in products"
                        :key="item.id"
                    >
                        <td data-label="分類">{{ item.category }}</td>
                        <td data-label="產品名稱">{{ item.title }}</td>
                        <td data-label="原價">{{ item.origin_price | currency }}</td>
                        <td data-label="售價">{{ item.price | currency }}</td>
                        <td data-label="是否啟用">
                            <span v-if="item.is_enabled ">是</span>
                            <span v-else>否</span>
                        </td>
                        <td data-label="編輯">
                            <div class="btn-group">
                                <button class="edit" @click="modalHandler(false,item)">編輯</button>
                                <button class="delete" @click="removeHandler(item.id)">刪除</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="nav-bar">
                  <Pagination @pageChange="pageChange" :pagination="pagination"/>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Modal from '@/components/Modal.vue'
import Pagination from '@/components/Pagination.vue'
export default {
    data(){
        return{
            modalOpen:false,
            editProduct:{},
            products:[],
            ProductsLength:'',
            lodaing:false,
            isNew:false,
            pagination:{},
        }
    },
    components:{
        Modal,
        Pagination
    },
    methods:{
        modalHandler(val,item = {}){
            const vm = this
            vm.modalOpen = true
            vm.editProduct = Object.assign({},item)
            vm.isNew = val
        },
        getProduct(page = 1){
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`
            const vm = this
            vm.lodaing = true
            this.$http.get(api).then(response =>{
                vm.pagination = response.data.pagination
                vm.products = response.data.products
                this.allProduct()
                 vm.lodaing = false
            })
        },
        allProduct(){
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products/all`
            const vm = this
            vm.lodaing = true
            this.$http.get(api).then(response =>{
                vm.ProductsLength =Object.keys( response.data.products).length
            })
        },
        removeHandler(id){
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${id}`
            const vm = this
            vm.lodaing = true
            this.$http.delete(api).then(response =>{
                this.getProduct()
                vm.lodaing = false
            })
        },
        pageChange(toPage){
           this.getProduct(toPage)
        }
    },
    created(){
        this.getProduct()
        this.allProduct()
    }
}
</script>
<style scoped>
.products-wrapper {
    height: 100%;
    background-color: #C8EBDF;
    padding: 20px 20px 0 250px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -999;
    overflow:scroll;

}
.topbar > .title{
    float: left;
    font-size: 3rem;
    line-height: 1.5;
}
.mark{
    font-size: 1.3rem;
    color: #42B983;
}
.topbar > .btn{
    float: right;
    color: #fff;
    background-color: #42B983;
    outline: none;
    border: none;
    font-size: 1.3rem;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
}
.cotainer{
    max-width: 1200px;
}
.products-list {
    width: 100%;
    line-height: 1.5;
    border: 1px solid #ddd;
    border-collapse: collapse;
}
.products-list th{
    background-color:#fff;
}
.products-list tr {
    border: 1px solid #ddd;
}
.products-list tr:nth-child(even) td{
     background-color: #fff;
}
.products-list tr:nth-child(odd) td {
   background-color: #F8F8F8;
}

.products-list th {
    font-size: 1.6rem;
    font-weight: bold;
}

.products-list td {
    font-size: 1.3rem;
    text-align: center;
}

.products-list td,
.products-list th {
    padding: 10px;
}
.nav-bar{
    float:right;
    margin-top: 25px;
}
.btn-group {
    font-size: 0;
}

.btn-group .edit,
.btn-group .delete {
    cursor: pointer;
    outline: none;
    background-color: #fff;
    padding: 0.3rem;
}

.btn-group .edit {
    border: 1px solid #6F42C1;
    border-right: transparent;
    color: #6F42C1;
    border-radius: 5px 0 0 5px;
}

.btn-group .delete {
    border: 1px solid #DC3545;
    color: #DC3545;
    border-radius: 0 5px 5px 0px;
}

.btn-group .edit:hover {
    background-color: #6F42C1;
    color: #fff;
}

.btn-group .delete:hover {
    background-color: #DC3545;
    color: #fff;
}

@media screen and (max-width: 991px) {
    .products-wrapper {
        padding-left: 60px;
    }
}

@media screen and (max-width: 768px) {
    .products-list {
        border: none;
    }

    .products-list thead {
        display: none;
    }

    .products-list tr {
        display: block;
        margin-top: 20px;
    }

    .products-list td {
        display: block;
        text-align: right;
        border-bottom: 1px solid #ddd;
    }

    .products-list td::before {
        content: attr(data-label);
        float: left;
        font-weight: bold;
    }
}



</style>
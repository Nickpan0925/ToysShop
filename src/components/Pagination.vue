<template>
    <ul class="pagination">
        <li><a href="javascript:;" v-if="pagination.has_pre"  @click="pageHandler(toPage-1)">«</a></li>
        <li
            v-for="page in pagination.total_pages"
            :key="page"
        ><a
                href="javascript:;"
                :class="{'active': page === pagination.current_page}"
                @click="pageHandler(page)"
            >{{ page }}</a></li>
        <li><a href="javascript:;" v-if="pagination.has_next"   @click="pageHandler(toPage+1)">»</a></li>
        <li>
            <form action="">
                <span>共{{ pagination.total_pages }}頁，到第</span>
                <input
                    type="number"
                    :max="pagination.total_pages"
                    min="1"
                    value="2"
                    v-model="toPage"
                >
                <span>頁</span>
                <input
                    class="btn"
                    type="button"
                     @click="pageHandler(toPage)"
                    value="確定"
                >
            </form>
        </li>
    </ul>
</template>
<script>
export default {
    data(){
        return{
            toPage:1
        }
    },
    props:['pagination'],
    methods:{
        pageHandler(page){
            const vm = this
            vm.toPage = page
            this.$emit('pageChange',vm.toPage*1)
        }
    }
}
</script>
<style scoped>
 .pagination {
     height: 3.4rem;
     line-height: 3.4rem;
     display: flex;
 }

 .pagination>li>a {
     display: block;
     border: 1px solid #ededed;
     padding: 0 1.2rem;
     color: #3e3e3e;
     background-color: #fff;
     font-size: 1.4rem;
     font-family: tahoma, simsun;
     text-decoration: none;
     transition: background-color 0.3s;
 }

 .pagination a.active,
 .pagination a.active:hover {
     background-color: rgb(8, 92, 24);
     border-color: rgb(8, 92, 24);
     color: #fff;
 }

 .pagination a:hover {
     color: rgb(8, 92, 24);
     border-color: #ddd;
     background-color: #ddd;
 }

 .pagination form span {
     color: #999;
     font-size: 1.3rem;
 }

 .pagination form input {
     width: 30px;
     outline: none;
     border: 1px solid #999;
 }

 .pagination form .btn {
     width: 46px;
     height: 24px;
     cursor: pointer;
     border: 1px solid rgb(8, 92, 24);
     color: rgb(8, 92, 24);
     background-color: #fff;
     border-radius: 5px;
 }

</style>
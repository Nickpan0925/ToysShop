<template>
    <div>
         <Sidebar/>
        <div class="dashboard-wrapper">
           <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
export default {
    components:{
        Sidebar
    },
    created(){
        const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1")
        this.$http.defaults.headers.common.Authorization = `${myCookie}`
    }
}
</script>
<template>
  <div
      class="slde-wrapper"
      :class="{'bar-open':baropen===true}"
  >
      <ul class="sidebar">
          <li
              class="sidebar-item bar"
              @click="barHandler"
          >
              <a href="javascript:;">
                  <i class="fas fa-bars"></i>
              </a>
          </li>
          <li class="sidebar-item">
              <router-link to="/admin/products">
                  <i class="fas fa-box-open "></i>
                  <span :class="{'hidden':baropen===false}">產品列表</span>
              </router-link>
          </li>
          <li class="sidebar-item">
              <router-link to="/admin/form">
                  <i class="fas fa-tasks"></i>
                  <span :class="{'hidden':baropen===false}">訂單列表</span>
              </router-link>
          </li>
          <li class="sidebar-item">
              <router-link to="/admin/coupons">
                  <i class="fas fa-ticket-alt"></i>
                  <span :class="{'hidden':baropen===false}">優惠券</span>
              </router-link>
          </li>
          <li class="sidebar-item">
              <router-link to="/home">
                  <i class="fas fa-home"></i>
                  <span :class="{'hidden':baropen===false}">顧客頁面</span>
              </router-link>
          </li>
          <li class="sidebar-item logout">
              <a
                  href="javascript:;"
                  @click="logout"
              >
                  <i class="fas fa-sign-out-alt"></i>
                  <span :class="{'hidden':baropen===false}">登出</span>
              </a>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
    data(){
        return{
            baropen:false,
            open:true,
            lodaing : false
        }
    },
    methods:{
        barHandler(){
            const vm =this
            if(vm.open){
                 vm.baropen = true
                 vm.open = false
            }else{
                vm.baropen = false
                vm.open = true
            }
        },
        logout(){
              const api = `${process.env.VUE_APP_API}/logout`
              const vm =this
              vm.lodaing =true
            this.$http.post(api).then(response=>{
               if(response.data.success){
                    vm.$router.push('/login')
                     vm.lodaing =false
               }
            })
        }
    }
}
</script>
<style scoped>
 .router-link-active {
     background-color: #F5FBF9;
     color: #42B983;
 }

 .slde-wrapper {
     position: fixed;
     width: 220px;
     bottom: 0;
     left: 0;
     right: 0;
     top: 0;
     box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
     background-color: #fff;
 }

 .sidebar {
     text-align: left;
     font-size: 2rem;
     line-height: 50px;
     margin-top: 20px;
 }

 .sidebar-item {
     width: 100%;
     color: #2C3E50;
 }

 a {
     display: block;
     padding-left: 15px;
     text-decoration: none;
     color: #2C3E50;
 }

 .bar>a {
     display: none;
     font-size: 1.3rem;
     padding-left: 19px;
 }

 .sidebar-item:hover {
     background-color: #EBF8F3;
 }

 .hidden {
     opacity: 1;
 }

 .logout {
     position: absolute;
     bottom: 5%;
     left: 0;
 }

 @media screen and (max-width: 991px) {
     .slde-wrapper {
         width: 50px;
         overflow: hidden;
         white-space: nowrap;
         transition: width .3s;
     }

     .bar>a {
         display: block;
     }

     .bar-open {
         width: 220px;
     }

     .hidden {
         opacity: 0;
         overflow: hidden;
         width: 0;
         height: 0;
         transition: opacity .5s;
     }
 }



</style>

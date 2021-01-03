<template>
    <div class="subnav-container">
               <ul class="subnav-list">
                   <li class="subnav-item" v-for="(item,index) in navTitle" :key="index" :class="{'active':item ===changeTitle }"  @click="valueHandler($event)">
                       <a href="javascript:;" :data-title="item">{{ item }}</a>
                   </li>
               </ul>
           </div>
</template>
<script>
export default {
    data(){
        return {
            changeTitle:'所有商品',
            navTitle:['所有商品','火影忍者','七龍珠','鬼滅之刃','熱銷商品','預購專區']
        }
    },
    methods:{
        valueHandler(event){ 
           const vm =this
            vm.changeTitle = event.target.dataset.title
           this.$emit('changeCard',vm.changeTitle)
        }
    }
}
</script>
<style scoped>
.subnav-container{
    max-width: 1200px;
    margin:0 auto ;
}
.subnav-list{
    display: flex;
    justify-content: space-around;
}
.subnav-item{
    width: 200px;
    margin-left: 10px;
    background-color: #fff;
    text-align:center;
    font-size: 1.7rem;
    font-weight: bold;
    line-height: 5;
    box-shadow: 0 0 4px rgba(0, 0,0, .3);
    border-radius: 10px;
    transition: all .3s;
}
.subnav-item:hover{
     box-shadow: 9px 9px 3px rgba(0, 0,0, .3);
   border: 1px solid #666;
}
.subnav-item > a{
     color: #212529;
     text-decoration: none;
     display: block;
}
.active{
  box-shadow: 9px 9px 3px rgba(0, 0,0, .3);
   border: 1px solid #666;
 

}
@media screen and (max-width: 991px){
    .subnav-list{
    flex-wrap: wrap;
}
.subnav-item{
    width: 30%;
    margin-bottom: 10px;
    margin-left: 0px;
}
}
@media screen and (max-width: 768px) {
    .subnav-item{
    width: 45%;
    margin-bottom: 10px;
    margin-left: 0px;
}
}
</style>
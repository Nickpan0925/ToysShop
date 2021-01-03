<template>
 <div>
   <div
     class="slider-cotainer"
     @mouseover="stopPlay"
     @mouseout="autoPlay"
   >
     <button
       class="btn prev-btn"
       @click="prevHandler"
     ><i class="fas fa-angle-double-left"></i></button>
     <button
       class="btn next-btn"
       @click="nextHandler"
     ><i class="fas fa-angle-double-right"></i></button>
     <ul
       class="image-list"
       :class="{'tran':noLast}"
       ref="sli"
       :style="width"
     >
       <li
         v-for="(item,i) in imgList"
         :key="i"
       >
       <div class="img-content">
           <p>各種新版GK，火熱上市，不買會後悔!</p>
           <router-link to="/sales">趕緊搶購</router-link>
       </div>
       <a href="javascript:;"><img
             :src=item
           ></a>
       </li>
     </ul>
     <ul class="dots">
       <li
         v-for="(item,i) in imgList.length-2"
         :key="i"
         :class="{'active':index === i}"
         @click="index = i"
       ></li>
     </ul>
   </div>
 </div>
</template>

<script>
import banner1 from '@/assets/a1.png'
import banner2 from '@/assets/a2.png'
import banner3 from '@/assets/a3.png'
import banner4 from '@/assets/a4.png'
export default {
  data(){
    return{
      index:0,
      imgList:[banner4,banner1,banner2,banner3,banner4,banner1],
      timer:null,
      noLast:true,
      bar:{
         width: '500%',                
         marginLeft: '0',
      }
    }
  },
  computed:{
    width(){
      this.bar = {
         width: this.imgList.length*100 + '%',                
         marginLeft: -(this.index+1) * 100 + '%',
      }
      return this.bar
    }
  },
  methods:{
    prevHandler(){
      const vm =this
      let length =  vm.imgList.length
      vm.index--
      if( vm.index == -1){
        setTimeout(()=>{
          this.noLast =false
          vm.index = length - 3
        },500)
      }
       this.noLast =true
    },
    nextHandler(){
      const vm =this
      let length =  vm.imgList.length
       vm.index++
      if(vm.index == length - 2 ){
        setTimeout(()=>{
          this.noLast =false
          vm.index = 0
        },700)
      }
        this.noLast =true
    },
    autoPlay(){
      const vm = this
      let length =  vm.imgList.length
      vm.timer = setInterval(()=>{
        vm.nextHandler()
      },2800)
    },
    stopPlay(){
      const vm = this
      clearInterval(vm.timer)
      vm.timer = null
    }
  },
  created(){
    this.autoPlay()
  },
  beforeDestroy(){
    this.stopPlay()
  }
 
 
}
</script>

<style scoped>
.slider-cotainer {
  margin: auto;
  width:100%;
  max-height: 500px;
  overflow: hidden;
  position: relative;
}

.btn {
  background-color: rgba(0, 0, 0, .3);
  outline: none;
  border: none;
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  color: #fff;
}
.btn:hover{
  background-color: rgba(255, 255, 255, 0.637);
  color: rgba(0, 0, 0, .3);
}
.prev-btn {
  position: absolute;
  left: 0;
  bottom: 50%;
  transform: translateY(50%);
}

.next-btn {
  position: absolute;
  right: 0;
  bottom: 50%;
  transform: translateY(50%);
}

.image-list {
  width: 100%;
  display: flex;
  background-color:#F1EFF1 ;
}
.img-content{
  width: 70%;
  height: 100%;
  float: left;
  text-align: center;
  margin-top: 10rem;
}
.img-content p{
  font-size: 3rem;
  color:#DC4405;
  font-weight: bold;
}
.img-content a{
  display: block;
  margin: 6rem auto 0;
  width: 100px;
  text-decoration: none;
  font-size: 2rem;
  line-height: 2;
   color:#DC4405;
  border: 1px solid #DC4405;;
}
.img-content a:hover{
  background-color:#DC4405;
  color: #fff;
}

.tran {
  transition: all 0.7s;
}

.image-list li {
  width: 100%;
}

.image-list img {
  width: 30%;
  height: 70%;
  vertical-align: middle;
  float: right;
}

.dots {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}

.dots>li {
  width: 10px;
  height: 10px;
  border: 3px solid rgba(102, 102, 102, 0.555);
  background-color: rgba(255, 255, 255, 0.616);
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
}

li.active {
  border: 3px solid rgba(255, 255, 255, 0.815);
  background-color: rgba(102, 102, 102, 0.877);
}

@media screen and (max-width: 1200px) {
  .slider-cotainer {
    width: 100%;
  }
}
</style>
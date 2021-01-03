<template>
  <div>
       <Navbar/>
     <div class="slider-wrapper">
        <Slider/> 
      </div>
       <div class="category-wrapper">
        <Category/>
      </div>
      <div class="coupon-wrapper">
        <div class="coupon-container">
          <p>歡慶開幕，輸入優惠碼享7折優惠</p>
          <router-link to="/sales">Code</router-link>
        </div>
      </div>
      <div class="news-wrapper">
        <News/>
      </div>
      <div class="about-wrapper">
        <About/>
      </div>
      <Footer/>
  </div>
</template>


<script>
import Slider from '@/components/Slider.vue'
import Navbar from '@/components/Navbar.vue'
import News from '@/components/News.vue'
import Category from '@/components/Category.vue'
import About from '@/components/About.vue'
import Footer from '@/components/Footer.vue'
export default {
  components:{
    Slider,
    Navbar,
    News,
    Category,
    About,
    Footer
  },
}
</script>

<style  scoped>
.slider-wrapper {
  width: 100%;
  background-color: #fff;
  padding-top: 60px;
}

.news-wrapper {
  background-color: #fff;
  padding-bottom: 25px;
  padding: 10px 0 80px 0;

}

.coupon-wrapper {
  width: 100%;
  background-color: #fff;
  padding: 60px 0 60px 0;

}

.coupon-container {
  max-width: 1200px;
  margin: 0 auto;
  height: 500px;
  background: url(../../assets/coupon.jpg) center/cover;
  text-align: center;
}

.coupon-container p {
  padding-top: 200px;
  font-size: 2rem;
  color: #fff;
  font-weight: bold;
}

.coupon-container a {
  display: block;
  color: #fff;
  font-size: 3rem;
  margin-top: 20px;
}

.coupon-container a:hover {
  color: rgb(11, 196, 125);
}

.category-wrapper {
  width: 100%;
  background-color: #fff;
  padding: 25px 0 70px 0;
  position: relative;
}

.about-wrapper {
  width: 100%;
  height: 100vh;
  background: url(../../assets/bac4.jpg) fixed center/100% 100%;
  position: relative;
  z-index: 3;
}

.about-wrapper::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: inherit;
  filter: blur(4px);
  z-index: 4;
}

</style>
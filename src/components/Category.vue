<template>
    <div class="category-container">
      <h2>商品類別</h2>
      <ul class="category">
        <li class="category-item">
          <div class="category-content">
            <router-link to="/sales"><i class="fas fa-shopping-cart"></i>前往購物</router-link>
          </div>
          <span class="title">火影忍者</span>
          <div class="img"><img
              src="@/assets/b1.png"
              alt=""
            ></div>
        </li>
        <li class="category-item">
          <div class="category-content">
            <router-link to="/sales"><i class="fas fa-shopping-cart"></i>前往購物</router-link>
          </div>
          <span class="title">七龍珠</span>
          <div class="img"><img
              src="@/assets/b2.png"
              alt=""
            ></div>
        </li>
        <li class="category-item">
          <div class="category-content">
            <router-link to="/sales"><i class="fas fa-shopping-cart"></i>前往購物</router-link>
          </div>
          <span class="title">鬼滅之刃</span>
          <div class="img"><img
              src="@/assets/b3.png"
              alt=""
            ></div>
        </li>
      </ul>
    </div>
</template>
<style scoped>
.category-container {
  max-width : 1200px;
  margin : auto ;
}
.category-container > h2 {
  text-align : center;
  font-size : 4.5rem;
  font-weight : bold;
  line-height : 1.5;
}
.category {
  display : flex;
  justify-content : space-around;
}
.category-item:hover > .category-content {
  transform : scale(1);
}
.category-content {
  display : block;
  position : absolute;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
  background-color : rgba(0, 0, 0, .7);
  text-align : center;
  line-height : 50px;
  font-size : 2rem;
  border-radius : 20px;
  transform : scale(0);
  transition : transform .5s;
}
.category-content > a {
  display : block;
  width : 150px;
  height : 50px;
  border-radius : 50px;
  color : #FFFFFF;
  text-decoration : none;
  background-color : #42B983;
  margin : auto;
  position : absolute;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
}
.category-content > a:hover {
  color : #42B983;
  background-color : #FFFFFF;
}
.category-item {
  width : 250px;
  height : 350px;
  background-color : #FFFFFF;
  cursor : pointer;
  position : relative;
  border-radius : 20px;
  box-shadow : 0 0 5px  rgba(0, 0, 0, .2);
}
.category-item:hover > .img {
  animation : none;
}
.category-item > .title {
  display : block;
  font-size : 3rem;
  line-height : 1.6;
  text-align : center;
  color : #FFFFFF;
  background-color : rgba(27, 168, 168, .747);;
  border-radius : 10px 10px 0 0;
}
.category-item > .img {
  width : 200px;
  height : 300px;
  margin : 0 auto;
  vertical-align : top;
}
.img > img {
  width : 100%;
  height : 100%;
}
@media screen and (max-width: 991px) {
  .category-item {
    width : 100%;
    margin : 0 5px 0 5px;
  }
}
@media screen and (max-width: 768px) {
  .category {
    flex-wrap : wrap;
  }
  .category-item {
    width : 100%;
    margin-bottom : 15px;
  }
}



</style>
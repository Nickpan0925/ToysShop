<template>
    <div class="about-us">
      <h2 class="title">關於我們</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem natus eaque excepturi modi illo quos
        sint omnis, commodi assumenda at sapiente, est, architecto qui totam! Nobis consequuntur quae exercitationem
        corporis?</p>
      <router-link to="/sales">前往消費</router-link>
    </div>
</template>
<style scoped>
.about-wrapper::before {
  content : '';
  width : 100%;
  height : 100%;
  position : absolute;
  left : 0;
  top : 0;
  background : inherit;
  filter : blur(4px);
  z-index : 2;
}

.about-us {
  max-width : 400px;
  text-align : center;
  font-size : 2rem;
  line-height : 1.5;
  color : #FFFFFF;
  position : absolute;
  left : 0;
  right : 0;
  bottom : 50%;
  margin : auto;
  z-index : 999;
}
.about-us > .title {
  font-size : 5rem;
  font-weight : bold;
}
.about-us > a {
  display : block;
  width : 100px;
  margin : 70px auto 0;
  font-size : 1.5rem;
  line-height : 2.5;
  color : #FFFFFF;
  background-color : rgba(0, 0, 0, .6);
  text-decoration : none;
  border-radius : 20px;
}
.about-us > a:hover {
  background-color : rgba(255, 255, 255, .774);;
  color : rgba(0, 0, 0, .6);
}



</style>
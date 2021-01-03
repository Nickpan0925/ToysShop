<template>
   <div class="news-container">
          <h2 class="news-title">NEWS</h2>
          <ul class="news-list">
               <li class="news-item" v-for="(item,i) in news" :key="i">
              <a href="javascript:;"><span class="news-date">{{ item.date }}</span><span class="news-content">{{ item.content }}</span></a>
            </li>
          </ul>
        </div> 
</template>
<script>
export default {
    data(){
        return{
            news:[
                {
                    date:'2020/12/2',
                    content:'訂購規範'
                },
                {
                    date:'2020/12/5',
                    content:'延遲交貨'
                },
                {
                    date:'2020/1/25',
                    content:'下單日期更改到1月'
                },
                {
                    date:'2021/1/15',
                    content:'預購盡快付款'
                }
            ]
        }
    }
}
</script>
<style scoped>
.news-container{
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 7rem;
}
.news-title{
    font-size: 5rem;
    font-weight: bold;
}
.news-list{
    margin-top: 25px;
}
.news-item{
    font-size: 2rem;
    line-height: 2.5;
}
.news-item > a{
    width: 100%;
    display: block;
    color: #000;
    text-decoration: none;
    transition: transform .3s;
}
.news-date{
    margin-right: 20px;
}
.news-item:hover > a{
    color:red;
    text-decoration: underline;
    transform: translateY(-1.5rem);
    font-style: italic;
}

</style>
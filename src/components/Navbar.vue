<template>
<div>
    <div
        class="header"
        :class="{'bar-oepn':barOpen}"
    >
        <div class="header-wrapper">
            <ul
                class="mainnav-icon"
                :class="{'bar-rotat':barOpen}"
                @click="barOpen = !barOpen"
            >
                <i class="fas fa-bars "></i>
            </ul>
            <h1 class="logo">
                <a href="javascript:;">
                    <img
                        src="@/assets/logo1.png"
                        alt="阿潘玩具間"
                    >
                </a>
            </h1>
            <ul class="mainnav">
                <li class="mainnav-item">
                    <router-link to="/home"><i class="fas fa-home"></i>首頁</router-link>
                </li>
                <li class="mainnav-item">
                    <router-link to="/sales">
                    <i class="fas fa-gift"></i>所有商品
                    </router-link>
                <li class="mainnav-item">
                      <router-link to="/cart">
                      <i class="fas fa-shopping-cart"></i>購物車
                      </router-link>
                </li>
                <li class="mainnav-item">
                    <router-link to="/login">
                    <i class="fas fa-user-cog"></i>管理者登入
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            barOpen:false
        }
    }
}
</script>

<style  scoped>
.router-link-active {
    color: rgba(255, 0, 0, 0.589) !important;
}

.header {
    width: 100%;
    height: 58px;
    box-shadow: 0 0px 5px rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    background-color:#fff;
    z-index: 999;
    overflow: hidden;
    transition: height 0.5s;
}

.header-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}

.logo>a {
    display: block;
    width: 140px;
    height: 56px;
}

.logo>a>img {
    width: 100%;
    overflow: hidden;
}

.mainnav-icon {
    display: none;
    cursor: pointer;
    transition: transform .3s;
}

.mainnav {
    width: 70%;
    display: flex;
    justify-content: space-around;
    line-height: 58px;
}


.mainnav>li:hover>a {
    text-decoration: underline;
    color: red;
}

.mainnav-item>a {
    text-decoration: none;
    font-weight: 700;
    font-size: 15px;
    color: rgba(0, 0, 0, .5);
}




@media screen and (max-width: 991px) {
    .bar-oepn {
        height: 290px;
    }

    .bar-rotat {
        transform: rotate(90deg);
    }

    .header-wrapper {
        position: relative;

    }

    .mainnav-icon {
        display: block;
        font-size: 3rem;
        line-height: 49px;
        margin-left: 10px;
    }

    .logo>a {
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
    }

    .mainnav {
        width: 100%;
        position: absolute;
        top: 56px;
        flex-direction: column;
    }

    .mainnav>.mainnav-item {
        text-align: center;
    }
}
</style>
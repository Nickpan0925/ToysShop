<template>
    <div>
        <div class="progress-wrapper">
        <ul class="title">
                    <li>
                        <span>1</span>購物車
                    </li>
                    <li>
                        <span>2</span>訂單確認
                    </li>
                    <li>
                        <span>3</span>填寫資料
                    </li>
                    <li>
                        <span>4</span>訂單完成
                    </li>
                </ul>
        <div class="progress-container">
            <div class="progress" :style="{width:width}"></div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    props:['width']
}
</script>
<style scoped>
.progress-wrapper {
    width: 100%;
    margin-top: 80px;
}

.progress-container {
    max-width: 800px;
    margin: 0 auto;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, .25);
}

.progress {
    width: 25%;
    height: 3rem;
    border-radius: 20px;
    position: relative;
    background: #207ba9;
}

.progress:after {
    content: '|||||||||||||||||||||||||||||||||||||||||||';
    display: block;
    position: absolute;
    width: 95%;
    height: 3rem;
    transform: skewX(-30deg);
    letter-spacing: -6px;
    font: bold 120px/80px sans-serif;
    overflow: hidden;
    color: #000;
    opacity: 0.06;
}

.title {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    text-align: center;
    font-size: 1.5rem;
}

.title>li {
    width: 25%;
    color: #212529;
}

.title>li>span {
    display: block;
    color: #00796B;
}

</style>
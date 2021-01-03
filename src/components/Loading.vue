<template>
<div class="bac">
    <div class="cotainer"></div>
 </div>
</template>

<style scoped>
.bac {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .6);
    z-index: 9999;
}

.cotainer {
    width: 69px;
    height: 60px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-image: url('../assets/vegeta.png');
    background-repeat: no-repeat;
    animation: vegeta 0.3s steps(3) infinite;
}

@keyframes vegeta {
    form {
        background-position: 0px;
    }

    to {
        background-position: -206px;
    }
}





</style>
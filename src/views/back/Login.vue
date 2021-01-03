<template>
    <div>
        <div
            class="loading"
            v-if="loading"
        >
            <Loading />
        </div>
        <div class="bac">
            <div class="pic"></div>
        </div>
        <div class="login-wrapper">
            <form
                action=""
                class="login"
            >
                <h1 class="title">管理者登入</h1>
                <div class="field-wrap">
                    <label for="email">帳號</label>
                    <input
                        type="email"
                        id="emali"
                        name="email"
                        required
                        v-model="user.username"
                    >
                </div>
                <div class="field-wrap">
                    <label for="password">密碼</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        v-model="user.password"
                    >
                </div>
                <button
                    class="login-btn"
                    @click.prevent="login"
                >登入</button>
            </form>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Login',
        data() {
            return {
                user: {
                    username: 'pan840925@gmail.com',
                    password: '840925',
                },
                loading: false
            }
        },
        methods: {
            login() {
                const api = `${process.env.VUE_APP_API}/admin/signin`
                const vm = this
                vm.loading = true
                this.$http.post(api, vm.user).then(response => {
                    if (response.data.success) {
                       const expired = response.data.expired
                       const token = response.data.token
                       document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
                        vm.$router.push('/admin/products')
                        vm.loading = false
                    }
                })
            }
        },
    }
</script>

<style scoped>
.loading {
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: 9999;
}

.bac {
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: -9999;
}

.bac>.pic {
    background-image: url('../../assets/bac3.jpg');
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    filter: blur(5px);
}

.title {
    text-align: center;
    font-size: 2rem;
}

label {
    display: block;
    margin-bottom: 10px;
    font-size: 1.6rem;
}

.login {
    color: #fff;
    font-weight: bold;
    max-width: 400px;
    height: 400px;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.field-wrap {
    width: 80%;
}

input {
    height: 25px;
    outline: none;
    width: 100%;
}

.login-btn {
    width: 60px;
    height: 30px;
    cursor: pointer;
    background-color: #1AB188;
    outline: none;
    color: #fff;
    border: none;
}


</style>
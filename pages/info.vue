<template>
    <div class="admin">
        <div class="logo">Monzun</div>
        <div class="login">
            <form class="form-horizontal">
                <div class="heading">Введите электронную почту</div>
                <div class="form-group">
                    <input
                        type="email"
                        v-model="email"
                        class="form-control"
                        id="inputEmail"
                    />
                </div>
                <div class="form-group">
                    <div class="forgot-password btn-default" @click="reset">
                        Восстановить
                    </div>
                    <div
                        class="cancel"
                        @click="$router.push({ name: 'login' })"
                    >
                        Отмена
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    layout: "empty",
    data() {
        return {
            email: "",
        };
    },
    methods: {
        reset() {
            this.$axios.request(
                "https://monzun.herokuapp.com/api/me/resetPassword",
                {
                    method: "post",
                    params: {
                        email: this.email,
                    },
                }
            );
        },
    },
};
</script>

<style scoped>
.admin {
    margin: auto;
}
.heading {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 25px;
    line-height: 23px;
    margin-top: 50px;
    margin-bottom: 30px;
    color: #000000;
}
.logo {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 55px;
    line-height: 64px;
    text-align: center;

    color: #ffffff;
    padding-top: 100px;
}
.form-horizontal {
    background: #ffffff;
    border-radius: 5px;
    padding: 35px 15px;
    width: 740px;
    margin: auto;
    margin-top: 30px;
    text-align: center;
}

.form-group input {
    padding: 25px;
    background: #c4c4c4;
    border-radius: 5px;
    border: none;
    width: 70%;
    margin: auto;
}
.form-group {
    margin-bottom: 50px;
}
.forgot-password {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 14px;
    color: #000000;
    margin-top: 30px;
    cursor: pointer;
}
.text-form {
    font-family: Roboto;
    color: #000000;
    text-align: left;
}
.registration {
    display: none;
}
.registration-active {
    display: block;
}
.login-active {
    display: none;
}
.cancel {
    cursor: pointer;
}
.btn-default {
    background: #106466;
    border-radius: 5px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 14px;
    display: flex;
    align-items: center;
    text-align: center;
    text-decoration: none;
    color: #ffffff;
    padding: 10px 37px;
    margin: auto;
    width: 180px;
}
</style>
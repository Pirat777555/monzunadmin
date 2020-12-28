<template>
    <div class="admin">
        <div class="logo">Monzun</div>
        <form class="form-horizontal">
            <div class="heading">Вход Администратора</div>
            <div class="form-group">
                <div class="text-form">Электронная почта</div>
                <input type="email" class="form-control" id="inputEmail" />
            </div>
            <div class="form-group help">
                <div class="text-form">Пароль</div>
                <input
                    type="password"
                    class="form-control"
                    id="inputPassword"
                />
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-default">
                    <a href="/"> Вход</a>
                </button>
                <div class="forgot-password">Забыли пароль?</div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    layout: "empty",
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
.btn-default a {
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
}
input {
    padding: 25px;
    margin-bottom: 20px;
    background: #c4c4c4;
    border-radius: 5px;
    border: none;
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
</style>
<template>
    <div class="row admin-panel">
        <div class="col-12 admin d-flex">
            <div class="avatar">
                <img src="/images/avatar.png" alt="" />
            </div>
            <div class="name">{{ user.name }}</div>
            <div class="open-toggle">
                <img src="/images/dropdown-toggle.png" alt="" />
            </div>
        </div>
        <div class="col-12 admin d-flex">
            <div class="panel">
                <ul>
                    <li><nuxt-link :to="{name: 'admin'}" @click.native="$cookies.set('token', ''); $store.commit('setUser', null)">Выход</nuxt-link></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            isActive: false,
        };
    },
    computed: {
        user() {
            return this.$store.state.user; 
        }
    },
    // methods: {
    //     getPost() {
    //         this.user; получить данные user-a  авторизованного пользователля системы
    //     }
    // }
};
</script>
<style scoped>
.admin-panel {
    margin-bottom: 50px;
}
.name {
    font-size: 18px;
    line-height: 115%;
    font-family: Futura PT;
    color: #77797d;
    margin-right: 5px;
}
.admin {
    align-items: center;
    justify-content: flex-end;
}
.admin .avatar {
    margin-right: 10px;
}
.avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50px;
}
.open-toggle {
    cursor: pointer;
}
.admin-panel:hover .panel {
    opacity: 1;
}
.panel {
    border: 1px solid #e2e2e2;
    padding: 7px;
    background: #f3f1f1;
    padding-left: 20px;
    opacity: 0;
    width: 160px;
}
.panel-active {
    opacity: 1;
}
.panel li {
    list-style-type: none;
    border-bottom: 1px solid #e2e2e2;
}
.panel li a {
    color: #000000;
    text-decoration: none;
}
.panel ul {
    padding: 0;
    margin: 0;
    text-align: center;
}
</style>
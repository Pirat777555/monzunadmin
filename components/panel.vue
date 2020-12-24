<template>
    <div class="panel">
        <div class="logo ml-3"><a href="/">monzun</a></div>
        <div class="items">
            <ul>
                <li class="item">
                    <nuxt-link
                        exact
                        no-prefetch
                        active-class="active"
                        class="nav-link"
                        to="/"
                    >
                        Все пользователи
                    </nuxt-link>
                </li>
                <li class="item">
                    <nuxt-link
                        active-class="active"
                        class="nav-link"
                        to="/startups"
                    >
                        Стартапы
                    </nuxt-link>
                </li>
                <li class="item">
                    <nuxt-link
                        active-class="active"
                        class="nav-link"
                        to="/sets"
                    >
                        Наборы
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap");
/* montserrat-500 - latin */
.panel {
    border-right: 1px solid #e2e2e2;
    height: 100%;
    margin-top: 30px;
}
.logo a {
    font-family: Comfortaa;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 20px;
    text-decoration: none;
    color: #000000;
}
.items ul {
    margin-top: 140px;
    padding: 0;
}
.items .active {
    border-left: 3px solid #106466;
    margin-left: -3px;
}
.item {
    list-style-type: none;
    margin-top: 23px;
    padding-left: 20px;
}
.item a:hover {
    border-left: 3px solid #106466;
    margin-left: -3px;
}
.item a {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color: #000000;
    text-decoration: none;
}
</style>
<script>
export default {};
</script>
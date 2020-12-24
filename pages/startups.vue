<template>
    <div class="main">
        <div class="row">
            <div class="col-12 admin d-flex">
                <div class="avatar">
                    <img src="/images/avatar.png" alt="" />
                </div>
                <div class="name">Максим Белоусов</div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 control-tracker">
                <div class="users">Все стартапы</div>
            </div>
        </div>
        <div class="row">
            <Startup
                v-for="(startup, index) in startups"
                :key="index"
                :name="startup.name"
                :photo="startup.photo"
                :id="startup.id"
            ></Startup>
        </div>
        <b-modal
            centered
            hide-header
            ok-only
            ok-title="Готово"
            id="modal-2"
            @hidden="$router.push({ query })"
        >
            <div class="add-tracker">
                <div class="tracker">
                    <div class="text">Просмотр стартапа</div>
                    <div class="avatar">
                        <img :src="activeStartup.photo" alt="" />
                    </div>
                </div>
                <form class="d-flex justify-content-between">
                    <div class="info">
                        <div class="name">
                            <div class="text-form">Имя</div>
                            <div class="text-info">
                                {{ activeStartup.name }}
                            </div>
                        </div>
                        <div class="own">
                            <div class="text-form">Кому пренадлежит</div>
                            <div class="text-info">{{ activeStartup.own }}</div>
                        </div>
                        <div class="description">
                            <div class="text-form">Описание</div>
                            <div class="text-info">
                                {{ activeStartup.description }}
                            </div>
                        </div>
                        <div class="target">
                            <div class="text-form">Цели стартапа</div>
                            <div class="text-info">
                                {{ activeStartup.target }}
                            </div>
                        </div>
                        <div class="plan-commercial">
                            <div class="text-form">Коммерческий план</div>
                            <div class="text-info">
                                {{ activeStartup.plancommercial }}
                            </div>
                        </div>
                        <div class="plan-grow">
                            <div class="text-form">План роста</div>
                            <div class="text-info">
                                {{ activeStartup.planGrow }}
                            </div>
                        </div>
                        <div class="area">
                            <div class="text-form">Область применения</div>
                            <div class="text-info">
                                {{ activeStartup.area }}
                            </div>
                        </div>
                        <div class="tasks">
                            <div class="text-form">Задачи</div>
                            <div class="text-info">
                                {{ activeStartup.tasks }}
                            </div>
                        </div>
                    </div>
                    <div class="block">
                        <div class="user-block d-flex mb-5">
                            <div class="text-form">Загруженный файл</div>
                        </div>
                    </div>
                </form>
                <div class="close" @click="$bvModal.hide('modal-2')">
                    <img src="/images/close-modal.svg" alt="" />
                </div>
            </div>
        </b-modal>
        <b-modal
            centered
            hide-header
            ok-title="Да"
            cancel-title="Нет"
            id="modal-delete"
            @hidden="$router.push({ query })"
            @ok="deleteStartup($route.query.id)"
        >
            <div class="delete-tracker">
                <div class="text">Вы действительно хотите удалить ?</div>

                <div class="close" @click="$bvModal.hide('modal-delete')">
                    <img src="/images/close-modal.svg" alt="" />
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import Startup from "~/components/startup.vue";
export default {
    name: "startups",
    components: { Startup },
    data: function () {
        return {
            activeStartup: {
                id: 1,
                name: "Цифровой баян",
                photo: "/images/startup1.png",
                own: "dfsdfd",
                description: "dsfdsf",
                target: "sdfsd",
                plancommercial: "dsfsd",
                planGrow: "dsfsd",
                area: "sdfds",
                tasks: "sfsd",
            },
            startups: [
                {
                    id: 1,
                    name: "Цифровой баян",
                    photo: "/images/startup1.png",
                    own: "dfsdfd",
                    description: "dsfdsf",
                    target: "sdfsd",
                    plancommercial: "dsfsd",
                    planGrow: "dsfsd",
                    area: "sdfds",
                    tasks: "sfsd",
                },
                {
                    id: 32,
                    name: "Цифровой баян1",
                    photo: "/images/startup1.png",
                    own: "dfsdfd",
                    description: "dsfdsf",
                    target: "sdfsd",
                    plancommercial: "dsfsd",
                    planGrow: "dsfsd",
                    area: "sdfds",
                    tasks: "sfsd",
                },
                {
                    id: 4,
                    name: "Цифровой баян2",
                    photo: "/images/startup1.png",
                    own: "dfsdfd",
                    description: "dsfdsf",
                    target: "sdfsd",
                    plancommercial: "dsfsd",
                    planGrow: "dsfsd",
                    area: "sdfds",
                    tasks: "sfsd",
                },
                {
                    id: 51,
                    name: "Цифровой баян3",
                    photo: "/images/startup1.png",
                },
                {
                    id: 55,
                    name: "Цифровой баян4",
                    photo: "/images/startup1.png",
                },
                {
                    id: 54,
                    name: "Цифровой баян5",
                    photo: "/images/startup1.png",
                },
            ],
        };
    },
    methods: {
        deleteStartup(index) {
            this.startups.forEach((value, item) =>
                value.id == index ? this.startups.splice(item, 1) : null
            );
        },
    },
};
</script>
<style scoped>
.main {
    margin-top: 30px;
}
.name {
    font-size: 18px;
    line-height: 115%;

    color: #77797d;
}
.admin {
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 90px;
}
.admin .avatar {
    margin-right: 10px;
}
.control-tracker {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
}
.control-tracker .users {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 120%;
    letter-spacing: -0.03em;
    color: #333333;
}
.btn-add {
    background: #106466;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    padding: 13px 25px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #ffffff;
    border-radius: 0 !important;
}
.tracker {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
}
.add-tracker .text {
    font-family: Roboto;
    font-size: 20px;
    line-height: 21px;
    display: flex;
    align-items: center;

    color: #000000;
}
.add-tracker .avatar {
    width: 120px;
    height: 120px;
    background: #c4c4c4;
    border: 1px solid #000000;
    border-radius: 50%;
    overflow: hidden;
}
.add-tracker .close {
    position: absolute;
    top: 10px;
    right: 10px;
}
.add-tracker .avatar img {
    width: 100%;
}
form .text-form {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 16px;
    color: #000000;
    margin-bottom: 10px;
}
form input {
    width: 400px;
    margin-bottom: 50px;
    padding: 10px;
}
.user-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.check-block {
    width: 40px;
    height: 40px;
    border: 1px solid #000000;
    margin-left: 10px;
    text-align: center;
}
form {
    align-items: flex-end;
}
.text-info {
    font-family: Roboto;
    font-size: 18px;
    line-height: 16px;
    color: #000000 !important;
    border: 1px solid black;
    padding: 10px;
    margin-bottom: 30px;
    width: 100%;
}
.delete-tracker .text {
    font-family: Roboto;
    font-size: 20px;
    line-height: 21px;
    color: #000000;
    text-align: center;
    margin-bottom: 30px;
    margin-top: 20px;
}
.delete-tracker .close {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>
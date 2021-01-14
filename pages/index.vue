<template>
    <div class="main">
        <Admin></Admin>
        <div class="row">
            <div class="col-12 col-lg-12 control-tracker">
                <div class="users">Все пользователи</div>
                <b-button class="btn btn-add" v-b-modal.modal-1>
                    Добавить трекера</b-button
                >

                <b-modal
                    centered
                    hide-header
                    ok-title="Добавить"
                    cancel-title="Отмена"
                    id="modal-1"
                    @ok="addUser"
                >
                    <div class="add-tracker">
                        <div class="tracker">
                            <div class="text">Добавление трекера</div>
                            <div>
                                <div>
                                    <img
                                        src="/images/noname.jpg"
                                        alt=""
                                        class="avatar mb-2"
                                    />
                                </div>
                            </div>
                        </div>
                        <form>
                            <div class="name">
                                <div class="text-form">Имя</div>
                                <input type="text" v-model="newUser.login" />
                            </div>
                            <div class="telephone">
                                <div class="text-form">Номер телефона</div>
                                <input type="tel" v-model="newUser.telephone" />
                            </div>
                            <div class="email">
                                <div class="text-form">Электронная почта</div>
                                <input type="email" v-model="newUser.email" />
                            </div>
                        </form>
                        <div class="close" @click="$bvModal.hide('modal-1')">
                            <img src="/images/close-modal.svg" alt="" />
                        </div>
                    </div>
                </b-modal>
                <b-modal
                    centered
                    hide-header
                    ok-only
                    ok-title="Ок"
                    id="modal-2"
                    @hidden="$router.push({ query: {} })"
                >
                    <div class="add-tracker">
                        <div class="tracker">
                            <div class="text">Просмотр</div>
                            <div class="avatar">
                                <img src="/images/photo.png" alt="" />
                            </div>
                        </div>
                        <form class="d-flex justify-content-between">
                            <div class="info">
                                <div class="name">
                                    <div class="text-form">Имя</div>
                                    <input
                                        type="text"
                                        v-model="activeUser.name"
                                        readonly
                                    />
                                </div>
                                <div class="telephone">
                                    <div class="text-form">Номер телефона</div>
                                    <input
                                        type="tel"
                                        v-model="activeUser.telephone"
                                        readonly
                                    />
                                </div>
                                <div class="email">
                                    <div class="text-form">
                                        Электронная почта
                                    </div>
                                    <input
                                        type="email"
                                        v-model="activeUser.email"
                                        readonly
                                    />
                                </div>
                            </div>
                            <div class="block">
                                <div class="user-block d-flex mb-5">
                                    <div class="text-form">
                                        Блокирование пользователя
                                    </div>
                                    <div class="check-block">
                                        <img
                                            src="/images/block.png"
                                            alt=""
                                            v-if="activeUser.isBlock"
                                        />
                                    </div>
                                </div>
                                <div class="matter">
                                    <div class="text-form">
                                        Причина блокировки
                                    </div>
                                    <textarea
                                        name=""
                                        id=""
                                        cols="40"
                                        rows="8"
                                        v-model="activeUser.reasonBlock"
                                        readonly
                                    ></textarea>
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
                    ok-title="Изменить"
                    cancel-title="Отмена"
                    id="modal-3"
                    @hidden="$router.push({ query: {} })"
                >
                    <div class="add-tracker">
                        <div class="tracker">
                            <div class="text">Редактирование</div>
                            <div class="avatar">
                                <img src="/images/photo.png" alt="" />
                            </div>
                        </div>
                        <form class="d-flex justify-content-between">
                            <div class="info">
                                <div class="name">
                                    <div class="text-form">Имя</div>
                                    <input
                                        type="text"
                                        v-model="activeUser.name"
                                    />
                                </div>
                                <div class="telephone">
                                    <div class="text-form">Номер телефона</div>
                                    <input
                                        type="tel"
                                        v-model="activeUser.telephone"
                                    />
                                </div>
                                <div class="email">
                                    <div class="text-form">
                                        Электронная почта
                                    </div>
                                    <input
                                        type="email"
                                        v-model="activeUser.email"
                                    />
                                </div>
                            </div>
                            <div class="block">
                                <div class="user-block d-flex mb-5">
                                    <div class="text-form">
                                        Блокирование пользователя
                                    </div>
                                    <div
                                        class="check-block"
                                        @click="
                                            activeUser.isBlock = !activeUser.isBlock
                                        "
                                    >
                                        <img
                                            src="/images/block.png"
                                            alt=""
                                            v-if="activeUser.isBlock"
                                        />
                                    </div>
                                </div>
                                <div class="matter">
                                    <div class="text-form">
                                        Причина блокировки
                                    </div>
                                    <textarea
                                        name=""
                                        id=""
                                        cols="40"
                                        rows="8"
                                        v-model="activeUser.reasonBlock"
                                    ></textarea>
                                </div>
                            </div>
                        </form>
                        <div class="close" @click="$bvModal.hide('modal-3')">
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
                    @hidden="removedUserId = ''"
                    @ok="deleteUser(removedUserId)"
                >
                    <div class="delete-tracker">
                        <div class="text">
                            Вы действительно хотите удалить ?
                        </div>
                        <div
                            class="close"
                            @click="$bvModal.hide('modal-delete')"
                        >
                            <img src="/images/close-modal.svg" alt="" />
                        </div>
                    </div>
                </b-modal>
            </div>
        </div>

        <div class="row">
            <User
                v-for="(user, index) in users"
                :key="index"
                :login="user.login"
                :photo="user.photo"
                :id="user.id"
                :isBlock="user.isBlock"
                :reasonBlock="user.reasonBlock"
                @removeUser="removedUserId = user.id"
            ></User>
        </div>
    </div>
</template>

<script>
import User from "~/components/user.vue";
import Admin from "./admin.vue";
export default {
    name: "index",
    components: { User },
    middleware: 'authenticated', 
    data: function () {
        return {
            removedUserId: "",
            activeUser: {
                id: null,
                name: "fdsfs",
                login: "dfsfs",
                photo: "dfsd",
                telephone: "dsfds",
                email: "dfsd",
                isBlock: true,
                reasonBlock: "egfwegsgvsdvsdvevbewbvs4rh",
            },
            newUser: {},
            activeIndex: {},
            files: [],
            users: [
                {
                    id: 1,
                    name: "Фамилия Имя",
                    login: "user 1",
                    photo: "/images/noname.jpg",
                    telephone: "89226378232",
                    email: "email@mail.ru",
                    isBlock: true,
                    reasonBlock: "dfewfsafsa",
                },
                {
                    id: 2,
                    name: "Фамилия Имя2",
                    login: "user 2",
                    photo: "/images/noname.jpg",
                    telephone: "89226378232",
                    email: "email@mail.ru",
                    isBlock: false,
                    reasonBlock: "",
                },
                {
                    id: 3,
                    name: "Фамилия Имя3",
                    login: "user 3",
                    photo: "/images/noname.jpg",
                    telephone: "89226378232",
                    email: "email@mail.ru",
                    isBlock: false,
                    reasonBlock: "",
                },
                {
                    id: 4,
                    name: "Фамилия Имя4",
                    login: "user 4",
                    photo: "/images/noname.jpg",
                    telephone: "89226378232",
                    email: "email@mail.ru",
                    isBlock: true,
                    reasonBlock: "dfewfsafsa",
                },
                {
                    id: 53,
                    name: "Фамилия Имя5",
                    login: "user 5",
                    photo: "/images/noname.jpg",
                    telephone: "89226378232",
                    email: "email@mail.ru",
                    isBlock: false,
                    reasonBlock: "",
                },
                {
                    id: 67,
                    name: "Фамилия Имя6",
                    login: "user 6",
                    photo: "/images/noname.jpg",
                    telephone: "89226378232",
                    email: "email@mail.ru",
                    isBlock: false,
                    reasonBlock: "",
                },
            ],
        };
    },
    computed: {
        user() {
            return this.$store.state.user; 
        }
    },
    methods: {
        addUser() {
            this.users.push(this.newUser);
            this.newUser = {};
        },
        deleteUser(index) {
            this.users.forEach((value, item) =>
                value.id == index ? this.users.splice(item, 1) : null
            );
            this.removedUserId = "";
        },
    },
    async mounted() {
        this.users = await this.$axios.$get(
            "https://jsonplaceholder.typicode.com/users"
        );
    },
};
</script>

<style>
.main {
    margin-top: 30px;
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
.delete-tracker .text {
    font-family: Roboto;
    font-size: 20px;
    line-height: 21px;
    color: #000000;
    text-align: center;
    margin-bottom: 30px;
    margin-top: 20px;
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
.delete-tracker .close {
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
    width: 100%;
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
</style>

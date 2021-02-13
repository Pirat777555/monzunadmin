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
                                <input type="text" v-model="newUser.name" />
                            </div>
                            <div class="telephone">
                                <div class="text-form">Номер телефона</div>
                                <input type="tel" v-model="newUser.phone" />
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
                    ref="user"
                >
                    <div class="add-tracker">
                        <div class="tracker">
                            <div class="text">Просмотр</div>
                            <div class="avatar">
                                <img
                                    :src="activeUser.logo.url"
                                    v-if="activeUser.logo"
                                    alt=""
                                />
                                <img
                                    v-if="!activeUser.logo"
                                    src="images/photo.png"
                                    alt=""
                                />
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
                                        v-model="activeUser.phone"
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
                                            v-if="activeUser.blocked"
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
                                        v-model="activeUser.blockReason"
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
                    ref="editUser"
                    id="modal-3"
                    @ok="editUser(activeUser.id)"
                >
                    <div class="add-tracker">
                        <div class="tracker">
                            <div class="text">Редактирование</div>
                            <div class="avatar">
                                <img
                                    :src="activeUser.logo.url"
                                    v-if="activeUser.logo"
                                    alt=""
                                />
                                <img
                                    v-if="!activeUser.logo"
                                    src="images/photo.png"
                                    alt=""
                                />
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
                                        v-model="activeUser.phone"
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
                                            activeUser.blocked = !activeUser.blocked
                                        "
                                    >
                                        <img
                                            src="/images/block.png"
                                            alt=""
                                            v-if="activeUser.blocked"
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
                                        v-model="activeUser.blockReason"
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
                :login="user.name"
                :photo="user.logo"
                :id="user.id"
                :isBlock="user.isBlock"
                :reasonBlock="user.reasonBlock"
                @getUser="getUser(user.id)"
                @getUserEdit="getUserEdit(user.id)"
                @removeUser="removedUserId = index"
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
    middleware: "authenticated",
    data: function () {
        return {
            removedUserId: "",
            activeUser: {},
            newUser: {},
            activeIndex: {},
            files: [],
            users: [],
        };
    },
    async created() {
        this.users = await this.$axios.$get(
            "https://monzun-admin.herokuapp.com/api/users",
            {
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                },
            }
        );
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        async getUser(id) {
            try {
                this.activeUser = await this.$axios.$get(
                    `https://monzun-admin.herokuapp.com/api/users/${id}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("token"),
                        },
                    }
                );
                this.$refs["user"].show();
            } catch {
                this.$bvToast.toast(
                    "Не удалось получить данные пользователя.",
                    {
                        title: "пользователь не найден.",
                        variant: "danger",
                        solid: true,
                    }
                );
            }
        },
        async getUserEdit(id) {
            try {
                this.activeUser = await this.$axios.$get(
                    `https://monzun-admin.herokuapp.com/api/users/${id}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("token"),
                        },
                    }
                );
                this.$refs["editUser"].show();
            } catch {
                this.$bvToast.toast(
                    "Не удалось получить данные пользователя.",
                    {
                        title: "пользователь не найден.",
                        variant: "danger",
                        solid: true,
                    }
                );
            }
        },
        addUser() {
            this.$axios
                .$post(
                    "https://monzun-admin.herokuapp.com/api/users",
                    this.newUser,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("token"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("Пользователь добавлен!", {
                        title: "Добавление пользователя",
                        variant: "success",
                    });
                    this.users.push(response);
                })
                .catch((err) => {
                    if (!this.newUser.name) {
                        this.$bvToast.toast("ошибка", {
                            title: "Введите имя пользователя!",
                            variant: "danger",
                            solid: true,
                        });
                    }
                    if (!this.newUser.email) {
                        this.$bvToast.toast("ошибка", {
                            title: "Укажите электронную почту!",
                            variant: "danger",
                            solid: true,
                        });
                    } else if (!this.validEmail(this.newUser.email)) {
                        this.$bvToast.toast("ошибка", {
                            title:
                                "Укажите корректный адрес электронной почты!",
                            variant: "danger",
                            solid: true,
                        });
                    }
                    if (!this.newUser.phone) {
                        this.$bvToast.toast("ошибка", {
                            title: "Укажите номер телефона!",
                            variant: "danger",
                            solid: true,
                        });
                    } else if (!this.validPhone(this.newUser.phone)) {
                        this.$bvToast.toast("ошибка", {
                            title: "Укажите корректный номер телефона!",
                            variant: "danger",
                            solid: true,
                        });
                    }
                });
        },
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        validPhone: function (phone) {
            var re = /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
            return re.test(phone);
        },
        editUser(id) {
            this.$axios
                .$put(
                    `https://monzun-admin.herokuapp.com/api/users/${id}`,
                    this.activeUser,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("token"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("Пользователь изменен!", {
                        title: "Изменение пользователя",
                        variant: "success",
                    });
                    this.user = {};
                    this.updateUser();
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось изменить пользователя",
                        variant: "danger",
                        solid: true,
                    });
                });
            this.activeUser = {};
        },
        deleteUser(index) {
            // this.users.forEach((value, item) =>
            //     value.id == index ? this.users.splice(item, 1) : null
            // );
            this.$axios
                .$delete(
                    `https://monzun-admin.herokuapp.com/api/users/${this.users[index].id}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("token"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("Пользователь удален!", {
                        title: "удаление пользователя",
                        variant: "success",
                    });
                    this.users.splice(index, 1);
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось удалить пользователя",
                        variant: "danger",
                        solid: true,
                    });
                });
            this.removedUserId = "";
        },
        async updateUser() {
            this.users = await this.$axios.$get(
                "https://monzun-admin.herokuapp.com/api/users",
                {
                    headers: {
                        Authorization: "Bearer " + this.$cookies.get("token"),
                    },
                }
            );
        },
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

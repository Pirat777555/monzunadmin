<template>
    <div class="view-set">
        <Admin></Admin>
        <div class="row">
            <div class="col-12 d-flex justify-content-end">
                <button class="btn-back" @click.prevent="$router.go(-1)">
                    Назад
                </button>
            </div>
        </div>
        <div class="row align-items-center">
            <div class="col-lg-3">Просмотр набора</div>
            <div class="col-lg-3 d-flex align-items-center">
                <div class="photo">
                    <img
                        :src="activeSet.logo.url"
                        v-if="activeSet.logo"
                        alt=""
                        class="image-set"
                    />
                    <img
                        src="/images/set1.png"
                        v-if="!activeSet.logo"
                        alt=""
                        class="image-set"
                    />
                </div>
                <div class="name-set">
                    {{ activeSet.name }}
                </div>
            </div>
            <div class="col-lg-3">
                Дата начала: <br />
                {{ activeSet.startedAt }}
            </div>
            <div class="col-lg-3">
                Дата завершения: <br />
                {{ activeSet.endedAt }}
            </div>
        </div>
        <div class="row mt-4 align-items-center">
            <div class="col-lg-6">
                <div class="text mb-3">Описание</div>
                <div class="description">{{ activeSet.description }}</div>
            </div>
            <div class="col-lg-6 d-flex justify-content-end align-items-center">
                <div class="active" v-if="activeSet.active">Набор активен</div>
                <button
                    class="btn-proposal"
                    @click.prevent="getProposal(activeSet.id)"
                >
                    Заявки на набор
                </button>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-lg-12">
                <table class="table table-bordered">
                    <tbody>
                        <tr
                            v-for="(startup, index) in activeSet.startups"
                            :key="index"
                        >
                            <th scope="row">
                                <b-button
                                    class="startup"
                                    @click="openStartup(startup.id)"
                                >
                                    {{ startup.name }}</b-button
                                >
                            </th>
                            <td>
                                <button
                                    type="button"
                                    class="delete btn btn-secondary"
                                    @click="openStatic(startup.id)"
                                >
                                    <img src="/images/statistic.png" alt="" />
                                </button>
                            </td>
                            <td>
                                <b-button
                                    class="delete"
                                    @click="changeTracker(startup.id)"
                                >
                                    <img src="/images/user.png" alt=""
                                /></b-button>
                            </td>
                            <td>
                                <b-button
                                    class="delete"
                                    v-b-modal.modal-delete
                                    @click="removedStartupId = startup.id"
                                >
                                    <img src="/images/delete.png" alt=""
                                /></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <b-modal
                    centered
                    hide-header
                    ok-title="Да"
                    cancel-title="Нет"
                    id="modal-delete"
                    @ok="deleteStartup(removedStartupId)"
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
                <b-modal
                    centered
                    hide-header
                    ok-only
                    ok-title="Готово"
                    id="modal-startup"
                    ref="startup"
                >
                    <div class="add-tracker">
                        <div class="tracker">
                            <div class="text">Просмотр стартапа</div>
                            <div class="avatar">
                                <img
                                    :src="activeStartup.logo"
                                    v-if="activeStartup.logo"
                                    alt=""
                                    class="avatar"
                                />
                                <img
                                    src="/images/defaultStartup.jpg"
                                    alt=""
                                    class="avatar"
                                />
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
                                    <div class="text-form">
                                        Кому пренадлежит
                                    </div>
                                    <div class="text-info">
                                        {{ activeStartup.owner }}
                                    </div>
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
                                        {{ activeStartup.points }}
                                    </div>
                                </div>
                                <div class="plan-commercial">
                                    <div class="text-form">
                                        Коммерческий план
                                    </div>
                                    <div class="text-info">
                                        {{ activeStartup.businessPlan }}
                                    </div>
                                </div>
                                <div class="plan-grow">
                                    <div class="text-form">План роста</div>
                                    <div class="text-info">
                                        {{ activeStartup.growthPlan }}
                                    </div>
                                </div>
                                <div class="area">
                                    <div class="text-form">
                                        Область применения
                                    </div>
                                    <div class="text-info">
                                        {{ activeStartup.useArea }}
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
                                <div
                                    class="mb-5"
                                    v-for="(
                                        file, index
                                    ) in activeStartup.attachments"
                                    :key="index"
                                >
                                    <div class="image">
                                        <img src="images/file.png" alt="" />
                                    </div>
                                    <div class="text-form mt-3">
                                        <a :href="file.url">{{
                                            file.originalFilename
                                        }}</a>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div
                            class="close"
                            @click="$bvModal.hide('modal-startup')"
                        >
                            <img src="/images/close-modal.svg" alt="" />
                        </div>
                    </div>
                </b-modal>
                <b-modal
                    centered
                    hide-header
                    ok-only
                    ok-title="Ок"
                    ref="changeTracker"
                    @ok="change()"
                    id="modal-2"
                >
                    <div class="view-accept">
                        <div>
                            <div class="text">Стартап</div>
                        </div>
                        <div class="avatar">
                            <img
                                :src="activeStartup.logo"
                                v-if="activeStartup.logo"
                                alt=""
                                class="avatar"
                            />
                            <img
                                src="/images/defaultStartup.jpg"
                                alt=""
                                class="avatar"
                            />
                        </div>
                        <div>
                            <div class="name">
                                {{ this.activeStartup.name }}
                            </div>
                        </div>
                        <div
                            class="close"
                            @click.prevent="$bvModal.hide('modal-accept')"
                        >
                            <img src="/images/close-modal.svg" alt="" />
                        </div>
                    </div>
                    <div class="choose-tracker">
                        <div class="text">Выберите трекера</div>
                        <select @change="onChange($event)">
                            <option value="0"></option>
                            <option
                                :value="tracker.id"
                                v-for="(tracker, index) in trackers"
                                :key="index"
                            >
                                {{ tracker.name }}
                            </option>
                        </select>
                    </div>
                    <div class="close" @click="$bvModal.hide('modal-2')">
                        <img src="/images/close-modal.svg" alt="" />
                    </div>
                </b-modal>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            removedStartupId: "",
            activeStartup: {},
            activeSet: {},
            trackers: [],
            tracker: { id: null },
        };
    },
    async created() {
        this.activeSet = await this.$axios.$get(
            `https://monzun-admin.herokuapp.com/api/trackings/${this.$route.params.id}`,
            {
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                },
            }
        );
    },
    methods: {
        //просмотр стартапа в модалке
        async openStartup(id) {
            try {
                this.activeStartup = await this.$axios.$get(
                    `https://monzun-admin.herokuapp.com/api/startups/${id}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("token"),
                        },
                    }
                );
                this.$refs["startup"].show();
            } catch {
                this.$bvToast.toast("Не удалось получить данные стартапа.", {
                    title: "Стартап не найден.",
                    variant: "danger",
                    solid: true,
                });
            }
        },
        //перейти на страницу с статистикой
        openStatic(id) {
            this.$router.push({
                name: "sets-statistic",
                params: { idSt: id, idTr: this.$route.params.id },
            });
        },
        //перейти на страницы заявок
        getProposal(id) {
            this.$router.push("/sets/" + this.$route.params.id + "/proposal");
        },
        //удалить стартап из набора
        deleteStartup(id) {
            this.$axios
                .$delete(
                    `https://monzun-admin.herokuapp.com/api/trackings/${this.activeSet.id}/startups/${id}`,

                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("token"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("стартап удален!", {
                        title: "удаление стартапа",
                        variant: "success",
                    });
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось удалить стартап",
                        variant: "danger",
                        solid: true,
                    });
                });
            this.removedUserId = "";
        },

        //открыть окно с выбором трекера
        async changeTracker(id) {
            try {
                this.activeStartup = await this.$axios.$get(
                    `https://monzun-admin.herokuapp.com/api/startups/${id}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("token"),
                        },
                    }
                );
            } catch {
                this.$bvToast.toast("Не удалось получить данные стартапа.", {
                    title: "Стартап не найден.",
                    variant: "danger",
                    solid: true,
                });
            }
            try {
                this.trackers = await this.$axios.$get(
                    `https://monzun-admin.herokuapp.com/api/trackings/tracker-list`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("token"),
                        },
                    }
                );
                this.$refs["changeTracker"].show();
            } catch {
                this.$bvToast.toast("ошибка", {
                    title: "ошибка",
                    variant: "danger",
                    solid: true,
                });
            }
        },
        //отправить на сервер запись о новом трекере
        async change() {
            this.$axios
                .$put(
                    `https://monzun-admin.herokuapp.com/api/trackings/${this.activeSet.id}/startups/${this.activeStartup.id}/setTracker/${this.tracker.id}`,
                    {},
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("token"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("трекер выбран!", {
                        title: "выбор трекера",
                        variant: "success",
                    });
                    this.user = {};
                    this.updateUser();
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось выбрать трекера",
                        variant: "danger",
                        solid: true,
                    });
                });
        },
        //запись выбранного трекера в переменную
        onChange(event) {
            this.tracker.id = event.target.value;
        },
    },
};
</script>
<style scoped >
.view-set {
    margin-top: 30px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
}
.name {
    font-family: Futura PT;
    font-size: 18px;
    line-height: 115%;

    color: #77797d;
}
.admin {
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 50px;
}
.admin .avatar {
    margin-right: 10px;
}
.btn-back {
    background: #c4c4c4;
    border: none;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    padding: 10px 30px;
    margin-bottom: 40px;
}
.image-set {
    background: #c4c4c4;
    background-size: auto;
    border: 1px solid #000000;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    margin-right: 5px;
}
.text {
    font-size: 16px;
}
.btn-proposal {
    background: #106466;
    border: 1px solid #000000;
    padding: 22px 25px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
    margin-left: 90px;
}
.table td {
    text-align: center;
}
.delete {
    background: transparent;
    border: none;
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
.startup {
    background: transparent;
    border: none;
    padding: 0;
    font-family: Roboto;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;

    color: #000000;
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
.close {
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
.view-accept {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.view-accept .close {
    position: absolute;
    top: 10px;
    right: 10px;
}
.view-accept .avatar {
    width: 120px;
    height: 120px;
    background: #c4c4c4;
    border: 1px solid #000000;
    border-radius: 50%;
    overflow: hidden;
}
.view-accept .text {
    color: #000000;
}
.choose-tracker .text {
    color: #000000;
    margin-right: 90px;
}
.choose-tracker {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-top: 60px;
    margin-bottom: 100px;
}
select {
    width: 261px;
    height: 46px;
}
</style>
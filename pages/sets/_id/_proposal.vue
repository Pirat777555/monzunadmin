<template>
    <div class="proposal">
        <div class="row">
            <div class="col-12">
                <div class="header">
                    <div class="text">Заявки на набор</div>
                    <button class="btn-back" @click.prevent="$router.go(-1)">
                        Назад
                    </button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <table class="table table-bordered">
                    <tbody>
                        <tr v-for="(request, index) in requests" :key="index">
                            <th scope="row" width="50%">
                                <b-button
                                    class="startup"
                                    @click="openStartup(index)"
                                >
                                    {{ request.startup.name }}</b-button
                                >
                            </th>
                            <td>
                                <b-button
                                    class="delete btn btn-secondary"
                                    @click="acceptStartup(request.id, index)"
                                >
                                    Принять
                                </b-button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    class="delete btn btn-secondary"
                                    @click="rejectStartup(request.id, index)"
                                >
                                    Отклонить
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <b-modal
                    centered
                    hide-header
                    ok-only
                    ok-title="Ок"
                    ref="acceptStartup"
                    @ok="accept"
                    id="modal-accept"
                >
                    <div class="view-accept">
                        <div>
                            <div class="text">Стартап</div>
                        </div>
                        <div class="avatar">
                            <img
                                :src="activeStartup.logo.url"
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
                            <div class="name">{{ activeStartup.name }}</div>
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
                    <div class="close" @click="$bvModal.hide('modal-accept')">
                        <img src="/images/close-modal.svg" alt="" />
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
                                    :src="activeStartup.logo.url"
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
                                        {{ activeStartup.owner.name }}
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
            </div>
        </div>
    </div>
</template>

<script>
export default {
    middleware: "authenticated",
    data: function () {
        return {
            activeStartup: { owner: { name: "" } },
            requests: [],
            activeRequest: {},
            trackers: [],
            tracker: { id: null },
        };
    },
    async created() {
        this.requests = await this.$axios.$get(
            `https://monzun-admin.herokuapp.com/api/requests/${this.$route.params.id}`,
            {
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                },
            }
        );
    },
    methods: {
        openStartup(index) {
            this.activeStartup = this.requests[index].startup;
            this.$refs["startup"].show();
        },
        rejectStartup(id, index) {
            this.activeRequest = this.requests[index];
            this.$axios
                .$post(
                    `https://monzun-admin.herokuapp.com/api/requests/${id}`,
                    this.activeRequest,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("token"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("Стартап отклонен!", {
                        title: "Отклонение",
                        variant: "success",
                    });
                    this.request.splice(index, 1);
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Невозможно отклонить",
                        variant: "danger",
                        solid: true,
                    });
                });
        },
        async acceptStartup(id, index) {
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
                this.activeRequest = this.requests[index];
                this.activeStartup = {};
                this.activeStartup = this.requests[index].startup;
                this.$refs["acceptStartup"].show();
            } catch {
                this.$bvToast.toast("ошибка", {
                    title: "ошибка",
                    variant: "danger",
                    solid: true,
                });
            }
        },
        accept() {
            this.$axios
                .$post(
                    `https://monzun-admin.herokuapp.com/api/requests/${this.activeRequest.id}/${this.tracker.id}`,
                    this.activeRequest,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("token"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("Стартап принят", {
                        title: "Принять",
                        variant: "success",
                    });
                    this.upload();
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Невозможно принять",
                        variant: "danger",
                        solid: true,
                    });
                });
        },
        async upload() {
            this.requests = await this.$axios.$get(
                `https://monzun-admin.herokuapp.com/api/requests/${this.$route.params.id}`,
                {
                    headers: {
                        Authorization: "Bearer " + this.$cookies.get("token"),
                    },
                }
            );
        },
        onChange(event) {
            this.tracker.id = event.target.value;
        },
    },
};
</script>

<style scoped>
.proposal {
    background: #106466;
    width: 100%;
    height: 100%;
    margin-left: -30px;
    padding: 30px;
}
.text {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;

    color: #ffffff;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}
.table {
    background: #ffffff;
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
}
.table td {
    text-align: center;
}
.btn {
    background: transparent;
    border: none;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;

    color: #000000;
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
.close {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>
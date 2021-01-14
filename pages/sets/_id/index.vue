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
                    <img :src="activeSet.photo" alt="" class="image-set" />
                </div>
                <div class="name-set">
                    {{ activeSet.name }}
                </div>
            </div>
            <div class="col-lg-3">Дата начала: {{ activeSet.startData }}</div>
            <div class="col-lg-3">Дата завершения: {{ activeSet.endData }}</div>
        </div>
        <div class="row mt-4 align-items-center">
            <div class="col-lg-6">
                <div class="text mb-3">Описание</div>
                <div class="description">{{ activeSet.description }}</div>
            </div>
            <div class="col-lg-6 d-flex justify-content-end align-items-center">
                <div class="active" v-if="activeSet.active">
                    Набор активен
                </div>
                <button
                    class="btn-proposal"
                    @click.prevent="
                        $router.push('/sets/' + activeSet.id + '/proposal')
                    "
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
                            v-for="(set, index) in activeSet.startup"
                            :key="index"
                        >
                            <th scope="row">
                                <b-button
                                    class="startup"
                                    v-b-modal.modal-startup
                                >
                                    {{ set.name }}</b-button
                                >
                            </th>
                            <td>
                                <button
                                    type="button"
                                    class="delete btn btn-secondary"
                                    @click="
                                        $router.push(
                                            '/sets/statistic/' + set.id
                                        )
                                    "
                                >
                                    <img src="/images/statistic.png" alt="" />
                                </button>
                            </td>
                            <td>
                                <b-button class="delete" v-b-modal.modal-2>
                                    <img src="/images/user.png" alt=""
                                /></b-button>
                            </td>
                            <td>
                                <b-button
                                    class="delete"
                                    v-b-modal.modal-delete
                                    @click="removedStartupId = set.id"
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
                                    <div class="text-form">
                                        Кому пренадлежит
                                    </div>
                                    <div class="text-info">
                                        {{ activeStartup.own }}
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
                                        {{ activeStartup.target }}
                                    </div>
                                </div>
                                <div class="plan-commercial">
                                    <div class="text-form">
                                        Коммерческий план
                                    </div>
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
                                    <div class="text-form">
                                        Область применения
                                    </div>
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
                                    <div class="text-form">
                                        Загруженный файл
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
                    id="modal-2"
                >
                    <div class="view-accept">
                        <div>
                            <div class="text">Стартап</div>
                        </div>
                        <div class="avatar">
                            <img :src="activeSet.startup.photo" alt="" />
                        </div>
                        <div>
                            <div class="name">gfhffgh</div>
                        </div>
                        <div
                            class="close"
                            @click.prevent="$bvModal.hide('modal-accept')"
                        >
                            <img src="images/close-modal.svg" alt="" />
                        </div>
                    </div>
                    <div class="choose-tracker">
                        <div class="text">Выберите трекера</div>
                        <select>
                            <option>tracker1</option>
                            <option>tracker2</option>
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
            activeStartup: {
                id: 1,
                name: "Цифровой баян",
                photo: "images/startup1.png",
                own: "dfsdfd",
                description: "dsfdsf",
                target: "sdfsd",
                plancommercial: "dsfsd",
                planGrow: "dsfsd",
                area: "sdfds",
                tasks: "sfsd",
            },
            activeSet: {
                id: 22,
                name: "Зимний набор1",
                photo: "/images/set1.png",
                description: "vxcvxcvxc",
                startData: "01.01.2021",
                endData: "31.03.2021",
                active: true,
                startup: [
                    {
                        id: 32,
                        name: "Цифровой баян32",
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
                        id: 12,
                        name: "Цифровой баян3",
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
                        id: 12,
                        name: "Цифровой баян3",
                        photo: "/images/startup1.png",
                        own: "dfsdfd",
                        description: "dsfdsf",
                        target: "sdfsd",
                        plancommercial: "dsfsd",
                        planGrow: "dsfsd",
                        area: "sdfds",
                        tasks: "sfsd",
                    },
                ],
            },
        };
    },
    methods: {
        deleteStartup(index) {
            this.activeSet.startup.forEach((value, item) =>
                value.id == index
                    ? this.activeSet.startup.splice(item, 1)
                    : null
            );
            this.removedStartupId = "";
        },
    },
};
</script>
<style scoped>
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
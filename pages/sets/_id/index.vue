<template>
    <div class="view-set">
        <div class="row">
            <div class="col-12 admin d-flex">
                <div class="avatar">
                    <img src="/images/avatar.png" alt="" />
                </div>
                <div class="name">Максим Белоусов</div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 d-flex justify-content-end">
                <button class="btn-back" @click.prevent="$router.push('/sets')">
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
                    Стартап активен
                </div>
                <button
                    class="btn-proposal"
                    @click.prevent="
                        $router.push(
                            '/sets/' + activeSet.id + '/' + activeSet.startup.id
                        )
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
                        <tr v-for="index in activeSet.startup" :key="index">
                            <th scope="row">{{ index.name }}</th>
                            <td>
                                <button
                                    type="button"
                                    class="delete btn btn-secondary"
                                    @click="
                                        $router.push(
                                            '/sets/statistic/' + index.id
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
                                <b-button class="delete" v-b-modal.modal-delete>
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
                    @hidden="$router.push({ query })"
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
    </div>
</template>
<script>
export default {
    data: function () {
        return {
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
</style>
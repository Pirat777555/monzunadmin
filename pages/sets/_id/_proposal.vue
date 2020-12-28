<template>
    <div class="proposal">
        <div class="row">
            <div class="col-12">
                <div class="header">
                    <div class="text">Заявки на набор</div>
                    <button
                        class="btn-back"
                        @click.prevent="$router.push('/sets/' + activeSet.id)"
                    >
                        Назад
                    </button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <th scope="row" width="50%">
                                <b-button
                                    class="startup"
                                    v-b-modal.modal-startup
                                    @click="
                                        $router.push({
                                            query: { id: activeStartup.id },
                                        })
                                    "
                                >
                                    zxzxz</b-button
                                >
                            </th>
                            <td>
                                <b-button
                                    class="delete btn btn-secondary"
                                    v-b-modal.modal-accept
                                >
                                    Принять</b-button
                                >
                            </td>
                            <td>
                                <button
                                    type="button"
                                    class="delete btn btn-secondary"
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
                    id="modal-accept"
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
                            <img src="/images/close-modal.svg" alt="" />
                        </div>
                    </div>
                    <div class="choose-tracker">
                        <div class="text">Выберите трекера</div>
                        <select>
                            <option>tracker1</option>
                            <option>tracker2</option>
                        </select>
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
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
</style>
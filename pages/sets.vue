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
                <div class="users">Все наборы</div>
                <b-button class="btn btn-add" v-b-modal.modal-1>
                    Добавить набор</b-button
                >
            </div>
        </div>
        <div class="row">
            <Set
                v-for="(sets, index) in sets"
                :key="index"
                :name="sets.name"
                :photo="sets.photo"
            ></Set>
        </div>
        <b-modal
            centered
            hide-header
            ok-title="Добавить"
            cancel-title="Отмена"
            id="modal-1"
            @ok="addSet"
        >
            <div class="add-tracker">
                <div class="tracker">
                    <div class="text">Добавление набора</div>
                    <div>
                        <div>
                            <img
                                src="/images/photo.png"
                                alt=""
                                class="avatar mb-2"
                            />
                        </div>
                        <input type="file" />
                    </div>
                </div>
                <form>
                    <div class="name">
                        <div class="text-form">Название набора</div>
                        <input type="text" v-model="newSet.name" />
                    </div>
                    <div class="description">
                        <div class="text-form">Описание</div>
                        <textarea
                            name="description"
                            id=""
                            cols="80"
                            rows="10"
                            v-model="newSet.description"
                        ></textarea>
                    </div>
                    <div class="date d-flex justify-content-around">
                        <div class="start-date">
                            <div class="text-form">Дата начала:</div>
                            <input
                                type="date"
                                name=""
                                v-model="newSet.startData"
                            />
                        </div>
                        <div class="end-date">
                            <div class="text-form">Дата конца:</div>
                            <input
                                type="date"
                                name=""
                                v-model="newSet.endData"
                            />
                        </div>
                    </div>
                </form>
                <div class="close" @click="closeModal1">
                    <img src="/images/close-modal.svg" alt="" />
                </div>
            </div>
        </b-modal>
        <!-- <b-modal
            centered
            hide-header
            ok-title="Изменить"
            cancel-title="Отмена"
            id="modal-2"
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
                            <div class="text-form">ФИО</div>
                            <input type="text" />
                        </div>
                        <div class="telephone">
                            <div class="text-form">Номер телефона</div>
                            <input type="tel" />
                        </div>
                        <div class="email">
                            <div class="text-form">Электронная почта</div>
                            <input type="email" />
                        </div>
                    </div>
                    <div class="block">
                        <div class="user-block d-flex mb-5">
                            <div class="text-form">
                                Блокирование пользователя
                            </div>
                            <div class="check-block"></div>
                        </div>
                        <div class="matter">
                            <div class="text-form">Причина блокировки</div>
                            <textarea
                                name=""
                                id=""
                                cols="40"
                                rows="8"
                            ></textarea>
                        </div>
                    </div>
                </form>
                <div class="close" @click="closeModal2">
                    <img src="/images/close-modal.svg" alt="" />
                </div>
            </div>
        </b-modal> -->
    </div>
</template>

<script>
import Set from "~/components/set.vue";
export default {
    name: "startups",
    components: { Set },
    data: function () {
        return {
            newSet: {},
            sets: [
                {
                    name: "Зимний набор",
                    photo: "/images/set1.png",
                    description: "",
                    startData: "",
                    endData: "",
                },
                {
                    name: "Зимний набор1",
                    photo: "/images/set1.png",
                    description: "",
                    startData: "",
                    endData: "",
                },
                {
                    name: "Зимний набор2",
                    photo: "/images/set1.png",
                    description: "",
                    startData: "",
                    endData: "",
                },
                {
                    name: "Зимний набор3",
                    photo: "/images/set1.png",
                    description: "",
                    startData: "",
                    endData: "",
                },
                {
                    name: "Зимний набор4",
                    photo: "/images/set1.png",
                    description: "",
                    startData: "",
                    endData: "",
                },
                {
                    name: "Зимний набор5",
                    photo: "/images/set1.png",
                    description: "",
                    startData: "",
                    endData: "",
                },
            ],
        };
    },
    methods: {
        closeModal1() {
            this.$bvModal.hide("modal-1");
        },
        closeModal2() {
            this.$bvModal.hide("modal-2");
        },
        addSet() {
            this.sets.push(this.newSet);
            this.newSet = {};
        },
    },
};
</script>

<style scoped>
.main {
    margin-top: 30px;
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
    width: 250px;
    margin-bottom: 50px;
    padding: 10px;
}
form textarea {
    margin-bottom: 50px;
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
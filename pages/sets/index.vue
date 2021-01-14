<template>
    <div class="main">
        <Admin></Admin>
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
                v-for="(set, index) in sets"
                :key="index"
                :name="set.name"
                :photo="set.photo"
                :id="set.id"
                @removeSet="removedSetId = set.id"
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
                                src="/images/set1.png"
                                v-if="!url"
                                alt=""
                                class="avatar mb-2"
                            />
                            <img v-if="url" :src="url" class="avatar mb-2" />
                        </div>
                        <input
                            type="file"
                            :v-model="newSet.photo"
                            @change="onFileChange"
                            accept="image/x-png,image/gif,image/jpeg"
                        />
                    </div>
                </div>
                <form>
                    <div class="name d-flex justify-content-between">
                        <div>
                            <div class="text-form">Название набора</div>
                            <input type="text" v-model="newSet.name" />
                        </div>
                        <div>Активен <input type="checkbox" checked /></div>
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
                <div class="close" @click="$bvModal.hide('modal-1')">
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
            @hidden="removedSetId = ''"
            @ok="deleteSet(removedSetId)"
        >
            <div class="delete-tracker">
                <div class="text">Вы действительно хотите удалить ?</div>
                <div class="close" @click="$bvModal.hide('modal-delete')">
                    <img src="/images/close-modal.svg" alt="" />
                </div>
            </div>
        </b-modal>
        <b-modal
            centered
            hide-header
            ok-title="Изменить"
            cancel-title="Отмена"
            id="modal-2"
            @ok="addSet"
        >
            <div class="add-tracker">
                <div class="tracker">
                    <div class="text">Редактирование набора</div>
                    <div>
                        <div>
                            <img
                                src="/images/set1.png"
                                v-if="!url"
                                alt=""
                                class="avatar mb-2"
                            />
                            <img v-if="url" :src="url" class="avatar mb-2" />
                        </div>
                        <input
                            type="file"
                            :v-model="newSet.photo"
                            @change="onFileChange"
                            accept="image/x-png,image/gif,image/jpeg"
                        />
                    </div>
                </div>
                <form>
                    <div class="name">
                        <div class="text-form">Название набора</div>
                        <input type="text" v-model="activeSet.name" />
                    </div>
                    <div class="description">
                        <div class="text-form">Описание</div>
                        <textarea
                            name="description"
                            id=""
                            cols="80"
                            rows="10"
                            v-model="activeSet.description"
                        ></textarea>
                    </div>
                    <div class="date d-flex justify-content-around">
                        <div class="start-date">
                            <div class="text-form">Дата начала:</div>
                            <input
                                type="date"
                                name=""
                                v-model="activeSet.startData"
                            />
                        </div>
                        <div class="end-date">
                            <div class="text-form">Дата конца:</div>
                            <input
                                type="date"
                                name=""
                                v-model="activeSet.endData"
                            />
                        </div>
                    </div>
                </form>
                <div class="close" @click="$bvModal.hide('modal-2')">
                    <img src="/images/close-modal.svg" alt="" />
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import Set from "~/components/set.vue";
export default {
    name: "sets",
    components: { Set },
    data: function () {
        return {
            url: null,
            removedSetId: "",
            newSet: {},
            activeSet: {
                id: 22,
                name: "Зимний набор1",
                photo: "images/set1.png",
                description: "vxcvxcvxc",
                startData: "2020-12-26",
                endData: "2020-12-29",
                active: true,
            },
            sets: [
                {
                    id: 2,
                    name: "Зимний набор",
                    photo: "images/set1.png",
                    description: "",
                    startData: "",
                    endData: "",
                },
                {
                    id: 22,
                    name: "Зимний набор1",
                    photo: "images/set1.png",
                    description: "",
                    startData: "",
                    endData: "",
                },
                {
                    id: 23,
                    name: "Зимний набор2",
                    photo: "images/set1.png",
                    description: "",
                    startData: "",
                    endData: "",
                },
                {
                    id: 24,
                    name: "Зимний набор3",
                    photo: "images/set1.png",
                    description: "",
                    startData: "",
                    endData: "",
                },
                {
                    id: 25,
                    name: "Зимний набор4",
                    photo: "images/set1.png",
                    description: "",
                    startData: "",
                    endData: "",
                },
                {
                    id: 26,
                    name: "Зимний набор5",
                    photo: "images/set1.png",
                    description: "",
                    startData: "",
                    endData: "",
                },
            ],
        };
    },
    methods: {
        addSet() {
            this.sets.push(this.newSet);
            console.log(this.newSet);
            this.newSet = {};
        },
        deleteSet(index) {
            this.sets.forEach((value, item) =>
                value.id == index ? this.sets.splice(item, 1) : null
            );
            this.removedSetId = "";
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
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
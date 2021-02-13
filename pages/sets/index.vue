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
                :photo="set.logo"
                :id="set.id"
                @getSet="getSet(set.id)"
                @getSetEdit="getSetEdit(set.id)"
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
                        <div class="d-flex">
                            <input
                                type="file"
                                id="file"
                                ref="file"
                                @change="onFileChange"
                                accept="image/x-png,image/gif,image/jpeg"
                            />
                            <div class="dlt" @click="deleteImage">
                                <img src="/images/delete.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <form>
                    <div class="name d-flex justify-content-between">
                        <div>
                            <div class="text-form">Название набора</div>
                            <input type="text" v-model="newSet.name" />
                        </div>

                        <div>
                            Активен
                            <input
                                type="checkbox"
                                checked
                                v-model="newSet.active"
                            />
                        </div>
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
                                v-model="newSet.startedAt"
                            />
                        </div>
                        <div class="end-date">
                            <div class="text-form">Дата конца:</div>
                            <input
                                type="date"
                                name=""
                                v-model="newSet.endedAt"
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
            ref="editSet"
            @ok="editSet(activeSet.id)"
        >
            <div class="add-tracker">
                <div class="tracker">
                    <div class="text">Редактирование набора</div>
                    <div>
                        <div>
                            <img
                                src="/images/set1.png"
                                v-if="!activeSet.logo"
                                alt=""
                                class="avatar mb-2"
                            />
                            <img
                                v-if="activeSet.logo"
                                :src="activeSet.logo.url"
                                class="avatar mb-2"
                            />
                        </div>
                        <div class="d-flex">
                            <input
                                type="file"
                                id="file"
                                ref="file"
                                @change="onFileChange"
                                accept="image/x-png,image/gif,image/jpeg"
                            />
                            <div class="dlt" @click="deleteImage">
                                <img src="/images/delete.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <form>
                    <div class="name d-flex justify-content-between">
                        <div class="name">
                            <div class="text-form">Название набора</div>
                            <input type="text" v-model="activeSet.name" />
                        </div>
                        <div>
                            Активен
                            <input
                                type="checkbox"
                                checked
                                v-model="activeSet.active"
                            />
                        </div>
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
                                v-model="activeSet.startedAt"
                            />
                        </div>
                        <div class="end-date">
                            <div class="text-form">Дата конца:</div>
                            <input
                                type="date"
                                name=""
                                v-model="activeSet.endedAt"
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
     middleware: "authenticated",
    data: function () {
        return {
            url: null,
            file: "",
            removedSetId: "",
            newSet: { logo: {} },
            activeSet: {},
            sets: [],
            logo: {},
        };
    },
    async created() {
        this.sets = await this.$axios.$get(
            "https://monzun-admin.herokuapp.com/api/trackings",
            {
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                },
            }
        );
        console.log(this.sets);
    },
    methods: {
        addSet() {
            this.$axios //отправка данных набора на сервер
                .$post(
                    "https://monzun-admin.herokuapp.com/api/trackings",
                    this.newSet,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("token"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("Набор добавлен!", {
                        title: "Добавление Набора",
                        variant: "success",
                    });
                    this.sets = {};
                    this.updateSet();
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось добавить набор",
                        variant: "danger",
                        solid: true,
                    });
                });

            this.newSet = {};
        },
        getSet(id) {
            this.$router.push({ name: "sets-id", params: { id: id } });
        },
        async getSetEdit(id) {
            try {
                this.activeSet = await this.$axios.$get(
                    `https://monzun-admin.herokuapp.com/api/trackings/${id}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("token"),
                        },
                    }
                );
                this.$refs["editSet"].show();
            } catch {
                this.$bvToast.toast("Не удалось получить данные набора.", {
                    title: "набор не найден.",
                    variant: "danger",
                    solid: true,
                });
            }
        },
        editSet(id) {
            this.$axios
                .$put(
                    `https://monzun-admin.herokuapp.com/api/trackings/${id}`,
                    this.activeSet,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("token"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("Набор изменен!", {
                        title: "Изменение набора",
                        variant: "success",
                    });
                    this.sets = {};
                    this.updateSet();
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось изменить набор",
                        variant: "danger",
                        solid: true,
                    });
                });
            this.activeSet = {};
        },
        deleteSet(index) {
            this.$axios
                .$delete(
                    `https://monzun-admin.herokuapp.com/api/trackings/${index}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("token"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("Набор удален!", {
                        title: "удаление набора",
                        variant: "success",
                    });
                    this.sets = {};
                    this.updateSet();
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось удалить набор",
                        variant: "danger",
                        solid: true,
                    });
                });
            this.removedSetId = "";
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
            if (e.target.files[0].size > 5000000) {
                alert("File is too big!");
                this.$refs.file.value = null;
            }
            this.file = this.$refs.file.files[0];
            let formData = new FormData();
            formData.append("files", this.file);
            this.$axios //отправка изображения на сервер
                .$post(
                    "https://monzun-admin.herokuapp.com/api/attachment/upload-image",
                    formData,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("token"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("Изображение добавлено!", {
                        title: "Добавление изображения",
                        variant: "success",
                    });

                    this.logo = response;
                    this.newSet.logoId = this.logo.id;
                    this.activeSet.logoId = this.logo.id;
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось отправить изображение",
                        variant: "danger",
                        solid: true,
                    });
                });
        },
        deleteImage() {
            console.log(this.activeSet);
            this.$axios
                .$delete(
                    `https://monzun-admin.herokuapp.com/api/attachment/delete/${this.logo.uuid}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("token"),
                        },
                    }
                )
                .then((response) => {
                    this.$bvToast.toast("Изображение удалено!", {
                        title: "удаление изображений",
                        variant: "success",
                    });
                    this.$refs.file.value = null;
                })
                .catch((err) => {
                    this.$bvToast.toast("ошибка", {
                        title: "Не удалось удалить изображение",
                        variant: "danger",
                        solid: true,
                    });
                });
        },
        async updateSet() {
            this.sets = await this.$axios.$get(
                "https://monzun-admin.herokuapp.com/api/trackings",
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
.dlt {
    cursor: pointer;
}
</style>
<template>
    <div class="statistic">
        <Admin></Admin>
        <div class="row">
            <div
                class="col-12 d-flex justify-content-between align-items-center"
            >
                <div class="photo">
                    <img
                        :src="activeStartup.logo.url"
                        v-if="activeStartup.logo"
                        alt=""
                        class="image-set"
                    />
                    <img
                        src="/images/defaultStartup.jpg"
                        v-if="!activeStartup.logo"
                        alt=""
                        class="image-set"
                    />
                </div>
                <button class="btn-back" @click.prevent="$router.go(-1)">
                    Назад
                </button>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-4">{{ activeStartup.name }}</div>
            <div class="col-4">Текущая неделя: {{ week }}</div>
            <div class="col-4">
                Итоговая оценка: {{ statistic.avgEstimate }}
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Недели</th>
                            <th scope="col">Оценки</th>
                            <th scope="col">Отчет</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(st, index) in statistic.weeks" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ st.estimate }}</td>
                            <td>
                                <span v-if="!st.reportId">Отчёта нет</span>
                                <b-button
                                    class="link"
                                    v-if="st.reportId"
                                    @click="getReport(st.reportId)"
                                >
                                    Отчёт</b-button
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
                <b-modal
                    centered
                    hide-header
                    ok-only
                    ok-title="Ок"
                    ref="report"
                    id="modal-report"
                >
                    <div class="view-report">
                        <div>
                            <div class="text">Коментарий</div>
                            <div class="comment">
                                {{ activeReport.comment }}
                            </div>
                        </div>
                        <div>
                            <div class="mark mb-5" v-if="activeReport.estimate">
                                Оценка: {{ activeReport.estimate.score }}
                                {{ activeReport.estimate.description }}
                            </div>
                            <div
                                class="file"
                                v-for="(
                                    file, index
                                ) in activeReport.attachments"
                                :key="index"
                            >
                                <a :href="file.url" target="_blank"
                                    ><img
                                        src="/images/file.png"
                                        alt=""
                                        class="mb-2"
                                /></a>
                                {{ file.originalFilename }}
                            </div>
                        </div>
                        <div
                            class="close"
                            @click="$bvModal.hide('modal-report')"
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
            statistic: [],
            activeStartup: {},
            activeReport: {},
            week: null,
        };
    },
    async created() {
        this.statistic = await this.$axios.$get(
            `https://monzun-admin.herokuapp.com/api/stats/${this.$route.params.idTr}/${this.$route.params.idSt}`,
            {
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                },
            }
        );
        this.activeStartup = await this.$axios.$get(
            `https://monzun-admin.herokuapp.com/api/startups/${this.$route.params.idSt}`,
            {
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                },
            }
        );
        console.log(this.statistic);
        this.week = this.statistic.weeks.length;
    },
    methods: {
        async getReport(id) {
            try {
                this.activeReport = await this.$axios.$get(
                    `https://monzun-admin.herokuapp.com/api/week-reports/${id}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + this.$cookies.get("token"),
                        },
                    }
                );
                console.log(this.activeReport);
                this.$refs["report"].show();
            } catch {
                this.$bvToast.toast("Не удалось получить данные отчета.", {
                    title: "отчет не найден",
                    variant: "danger",
                    solid: true,
                });
            }
        },
    },
};
</script>
<style scoped>
.statistic {
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
    width: 100px;
    height: 35px;
}
.image-set {
    background: #c4c4c4;
    background-size: auto;
    border: 1px solid #000000;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    margin-right: 5px;
}
.table {
    text-align: center;
    margin-left: 5%;
    width: 90%;
}
.link {
    background: transparent;
    border: none;
    color: #000000;
    padding: 0;
}
.view-report {
    display: flex;
    justify-content: space-between;
}
.view-report .close {
    position: absolute;
    top: 10px;
    right: 10px;
}
.view-report .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
}
.view-report .comment {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;

    color: #000000;
    margin-top: 15px;
}
.view-report .file a {
    font-family: Roboto;
    font-size: 14px;
    line-height: 16px;
    color: #000000;
    text-decoration: none;
}
.view-report .file {
    text-align: center;
}
</style>
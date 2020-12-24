<template>
    <div class="col-12 col-lg-3 mb-3">
        <div class="user">
            <div class="edit">
                <b-button class="change" v-b-modal.modal-3>
                    <img src="/images/edit.svg" alt=""
                /></b-button>
                <b-button
                    class="delete"
                    v-b-modal.modal-delete
                    @click="$router.push({ query: { id: id } })"
                >
                    <img src="/images/delete.svg" alt=""
                /></b-button>
            </div>
            <div class="user-photo">
                <img :src="photo" alt="" />
            </div>
            <div class="user-login">{{ login }}</div>
            <b-button
                class="details"
                v-b-modal.modal-2
                @click="$router.push({ query: { id: id } })"
            >
                Подробнее <img src="/images/arrow.svg" alt=""
            /></b-button>
        </div>
    </div>
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
.user {
    background: #3a3a3a;
    padding: 10px;
    text-align: left;
    height: 100%;
}
.user:hover .edit {
    opacity: 1;
}
.user:hover .details {
    opacity: 1;
}
.user:hover {
    box-shadow: 0px 2px 22px rgba(27, 32, 44, 0.25);
    background: #535353;
}
.user-login {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    margin-top: 60px;
    text-align: left;
    cursor: pointer;
}
.user-photo img {
    text-align: center;
    width: 100%;
}
.details {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    margin-top: 10px;
    color: #ffffff;
    text-align: left;
    cursor: pointer;
    opacity: 0;
    border: none;
    background: transparent;
}
.btn {
    padding: 0;
}
.edit {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
    opacity: 0;
}
.edit .change {
    margin-right: 10px;
    cursor: pointer;
    border: none;
    background: transparent;
    padding: 0;
}
.edit .delete {
    cursor: pointer;
    border: none;
    background: transparent;
    padding: 0;
}
</style>
<script>
export default {
    name: "user",
    props: {
        id: {
            type: Number,
            default: null,
        },
        name: {
            type: String,
            default: "",
        },
        login: {
            type: String,
            default: "",
        },
        photo: {
            type: String,
            default: "/images/noname.jpg",
        },
        telephone: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            default: "",
        },
        isBlock: {
            type: Boolean,
            default: true,
        },
        reasonBlock: {
            type: String,
            default: "",
        },
    },
};
</script>
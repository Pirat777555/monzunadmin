export const state = () => ({
    user: null,
});

export const actions = {
    async nuxtServerInit({commit, dispatch}) {
        await dispatch('getUser');
    },
    async getUser({commit}) {
        console.log(this.$cookies.get('token'))
        try {
            
            const response = await this.$axios.$get("https://monzun-admin.herokuapp.com/api/me", {
                headers: {
                    Authorization: 'Bearer ' + this.$cookies.get('token')
                }
            });
            console.log(response)
            commit('setUser', response);
            this.$router.push({
                name: "index",
            });
        } catch {
            if(this.$cookies.get('token')) {
                this.$cookies.set('token', '');
            }
        }
    }
}

export const mutations = {
    setUser: (state, user) => {
        state.user = user;
    }
}
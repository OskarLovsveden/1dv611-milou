import { createStore, Commit } from 'vuex'

import AxiosHelper from '../helpers/AxiosHelper';
const axios = new AxiosHelper();

interface IUserState {
  email: string,
  isAuthenticated: boolean
}

const user = {
  state: (): IUserState => ({
    email: '',
    isAuthenticated: false
  }),
  mutations: {
    FLIP_IS_AUTHENTICATED(state: IUserState) {
      state.isAuthenticated = !state.isAuthenticated
    },
    SET_IS_AUTHENTICATED(state: IUserState, isAuthenticated: boolean) {
      state.isAuthenticated = isAuthenticated
    },
    SET_EMAIL(state: IUserState, email: string) {
      state.email = email
    }
  },
  actions: {
    async checkUser({ commit }: { commit: Commit }) {
      const response = await axios.post('/auth/authenticate');

      commit('SET_EMAIL', response?.data?.authenticatedUser);
      commit('SET_IS_AUTHENTICATED', response.status === 200);  
    }
  },
}

// interface IPagesState {
//   list: Array<Record<string, unknown>>
// }

// const pages = {
//   state: (): IPagesState => ({
//     list: []
//   }),
//   mutations: {


//   },
//   actions: {

//   },
// }


export default createStore({
  modules: {
    user: user,
    // pages: pages
  }
})

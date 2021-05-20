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

interface IModalState {
  measureWebpage: boolean,
  addWebpage: boolean
  editWebpage: boolean
}

const modal = {
  state: (): IModalState => ({
    measureWebpage: false,
    addWebpage: false,
    editWebpage: false
  }),
  mutations: {
    FLIP_MEASURE_WEBPAGE_MODAL(state: IModalState) {
      state.measureWebpage = !state.measureWebpage
    },
    FLIP_ADD_WEBPAGE_FORM_MODAL(state: IModalState) {
      state.addWebpage = !state.addWebpage
    },
    FLIP_EDIT_DELETE_WEBPAGE_FORM_MODAL(state: IModalState) {
      state.editWebpage = !state.editWebpage
    }
  },
  actions: {

  },
}

// interface IPagesState {
//   pages: Array<T>,
//   domains: boolean
// }

const pages = {
  state: (): any => ({
    list: [],
    domain: ''
  }),
  mutations: {
    SET_PAGES(state: any, value: any) {
      state.list = value
    },
    SET_DOMAIN(state: any, value: string) {
      state.domain = value
    }
  },
  actions: {
    async loadPages({ commit }: { commit: Commit }) {
      console.log('loadPages')
      const response = await axios.get('/pages');
      console.log(response.data)
      commit('SET_PAGES', response.data);
    },
  },
}

export default createStore({
  modules: {
    user: user,
    modal: modal,
    pages: pages
  }
})

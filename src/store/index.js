import user from './modules/user'
import getters from './getters'

export default createStore({
  getters,
  modules: {
    user
  }
})

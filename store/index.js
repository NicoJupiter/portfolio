import Vuex from 'vuex'
import Axios from 'axios'
import axios from "axios";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedProjects: [],
      isInitialLoaded: false
    },
    mutations: {
      setProjects(state, projects) {
        state.loadedProjects = projects
      },
      addProject(state, project) {
        state.loadedProjects.push(project)
      },
      editProject(state, editProject) {
        const projectIndex = state.loadedProjects.findIndex(
          project => project.id === editProject.id
        )
        state.loadedProjects[projectIndex] = editProject
      },
      setInitialLoaded(state, isInitialLoaded) {
        state.isInitialLoaded = isInitialLoaded
      }
    },
    actions: {
      //method from nuxt who executed only one time
      nuxtServerInit(vuexContext, context) {
      return Axios.get('https://portfolio-55714-default-rtdb.firebaseio.com/projects.json')
         .then(res => {
           const postProjects = []
           for (const key in res.data) {
             postProjects.push({ ...res.data[key], id: key})
           }
           postProjects.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
           vuexContext.commit('setProjects', postProjects)
           //vuexContext.commit('setInitialLoaded', true)

         })
         .catch(e => context.error(e))

      },
      setProjects(context, projects) {
        context.commit('setProjects', projects)
      },
      addProject(vuexContext, project) {
        return Axios.post('https://portfolio-55714-default-rtdb.firebaseio.com/projects.json', project)
          .then(result => {
            vuexContext.commit('setProjects', {... project, id: result.data.name})
          })
          .catch(e => console.log(e))
      },
      editProject(vuexContext, editedProject) {
        return Axios.put('https://portfolio-55714-default-rtdb.firebaseio.com/projects/'+
        editedProject.id +
        '.json', editedProject)
          .then(result => {
            vuexContext.commit('editProject', editedProject)
          })
          .catch(e => console.log(e))
      },
      setInitialLoaded(vuexContext, isInitialLoaded) {
        vuexContext.commit('setInitialLoaded', isInitialLoaded)
      }
    },
    getters: {
      loadedProjects(state) {
        return state.loadedProjects
      },
      isInitialLoaded(state) {
        return state.isInitialLoaded
      }
    }
  })
}

export default createStore

import Vuex from 'vuex'
import Axios from 'axios'
import axios from "axios";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedProjects: []
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
           vuexContext.commit('setProjects', postProjects)
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
      }
    },
    getters: {
      loadedProjects(state) {
        return state.loadedProjects
      }
    }
  })
}

export default createStore

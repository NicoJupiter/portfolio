<template>
  <div class="project">
    <ClassicPage v-if="loadedProject.loadedProjectType === 1" :page-content="loadedProject"/>
    <NoTextPage v-if="loadedProject.loadedProjectType === 2" :page-content="loadedProject"/>
  </div>
</template>

<script>
import ClassicPage from "@/components/PageType/ClassicPage";
import NoTextPage from "@/components/PageType/NoTextPage";
import axios from 'axios'
export default {
  components: {NoTextPage, ClassicPage},
  data() {
    return {
      loadedProject: null
    }
  },
  asyncData(context) {
    return axios.get('https://portfolio-55714-default-rtdb.firebaseio.com/projects/'+context.params.id+'.json')
      .then(res => {
        return {
          loadedProject : res.data
        }
      }).catch(e => console.log('eeeoororrorro'))
  },
  //difference entre async et fetch async va sauvergarder
  //les datas récup dans un object propre au composant
  //et fectch lui va permettre de tout sauvegarder dans un store
  /*validate({ params }) {
    console.log(params)
    return /^\d+$/.test(params.id)
  },*/
  //layout: 'projects'
}
</script>

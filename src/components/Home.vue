<template lang="html">
  <div class="">
    <p> {{mensaje}} </p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Main',
  data(){
    return {
      mensaje: 'Nuevo mensaje desde Vue JS'
    }
  },
  methods: {
    getMensaje(){
      const path = 'http://flask-ixa37fbfva-uc.a.run.app/api/v1/list'
      axios.get(path).then((respuesta) => {
        this.mensaje = " asdasda " + respuesta.data + " asdasdasd "
      })
    }
  },
  created() {
    this.getMensaje()
  },
}
</script>

<style lang="css" scoped>
  
</style>
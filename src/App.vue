<template>
  <div id="app">
    <Spinner />
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Spinner from '@/components/Spinner'
import '@/assets/css/custom.css'

export default {
  name: 'App',
  components: { NavBar, Spinner }
}
</script>

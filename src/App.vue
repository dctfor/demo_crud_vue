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

window['jQuery'] = $

export default {
  name: 'App',
  components: { NavBar, Spinner },
  mounted () {
    // $('#overlay').fadeOut(500)
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.profile-img {
  width: 100%;
  margin: auto;
  max-width: 230px;
  border-radius: 50%;
}

p {
  text-align: justify;
  text-justify: inter-word;
}

.a-s-box {
  -webkit-transition: box-shadow 0.5s ease-out;
  -moz-transition: box-shadow 0.5s ease-out;
  -o-transition: box-shadow 0.5s ease-out;
  transition: box-shadow 0.5s ease-out;
  -webkit-transition: background-color 0.5s ease-out;
  -moz-transition: background-color 0.5s ease-out;
  -o-transition: background-color 0.5s ease-out;
  transition: background-color 0.5s ease-out;
}

.a-s-box:hover {
  box-shadow: 0 0rem 0.5rem rgba(0, 0, 0, 0.35) !important;
  background: #4444aa;
}

.a-s-box:hover::after {
  /* box-shadow: 0 0 15px rgba(33,33,33,.4); */
  box-shadow: 10rem 1rem 4rem rgba(0, 0, 0, 1) !important;
}
</style>

<template>
  <div id='app'>
    <Spinner/>
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import Spinner from '@/components/Spinner';

export default {
  name: 'App',
  components: { NavBar, Spinner},
  mounted () {
      $("#overlay").fadeOut(500);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.profile-img{
  width: 100%;
  max-width: 230px;
  border-radius: 50%;
}

p{
  text-align: justify;
  text-justify: inter-word;
}
</style>

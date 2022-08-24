<template>
  <nav class="navbar navbar-dark bg-primary " v-if="isNotLogin">
    <div class="container-fluid">
      <!-- <router-link to="/contacts" class="btn btn-light">
        <i class="fa fa-home" aria-hidden="true"></i> Return Home
      </router-link> -->
      <button class="learn-more">Return Home</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    isNotLogin () {
      return !['LoginForm', 'ContactManager'].includes(this.$route.name)
    }
  }
}
</script>
<style Scoped></style>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary" v-if="isNotLogin">
    <a class="navbar-brand" href="#">VUE CRUD Example</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#">Contacts<span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" data-toggle="modal" data-target="#aboutModal">About This</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" data-toggle="modal" data-target="#pricingModal">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click="logout()"><b>LogOut</b></a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    isNotLogin () {
      return !['LoginForm'].includes(this.$route.name)
    }
  },
  methods: {
    logout: function () {
      const router = this.$router
      $('#app').fadeOut(1000, function () {
        localStorage['a_t'] = null
        router.push('/login')
      }).fadeIn(1000)
    }
  }
}
</script>
<style Scoped>
ul.navbar-nav{
  width: 100% !important;
}

.nav-item:last-child {
  margin-left: auto;
}
</style>

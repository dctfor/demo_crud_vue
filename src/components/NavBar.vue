<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary" v-if="isNotLogin">
    <a class="navbar-brand" href="#">VUE CRUD Example</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <button class="nav-link btn btn-info" href="#" data-toggle="modal" data-target="#addModal" @click="clear">New Contact<span class="sr-only">(current)</span></button>
        </li>
        <li class="nav-item">
          <button class="nav-link btn btn-primary" href="#" data-toggle="modal" data-target="#aboutModal">About This</button>
        </li>
        <li class="nav-item">
          <button class="nav-link btn btn-primary" href="#" data-toggle="modal" data-target="#pricingModal">Pricing</button>
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
    },
    clear: function () {
      document.getElementById('modalAddName').value = ''
      document.getElementById('modalAddEmail').value = ''
      document.getElementById('modalAddMobile').value = ''
      document.getElementById('modalAddCompany').value = ''
      document.getElementById('modalAddTitle').value = ''
      document.getElementById('modalAddDepartment').value = ''
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

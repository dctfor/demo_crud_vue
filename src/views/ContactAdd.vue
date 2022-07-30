<template>
  <div class="container-fluid pt-4">
    <div class="row">
      <div class="col-12">
        <p class="h3 text-primary fw-bold">Add Contact</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <form @submit.prevent="submitCreate()">
          <div class="row col-lg-6 col-md-8 col-sm-12">
            <div class="col-12 pt-2">
              <input
                v-model="contact.name"
                type="text"
                class="form-control"
                placeholder="Name"
                name="name"
                id="f_name"
                aria-describedby="helpId"
              />
            </div>
            <div class="col-12 pt-2">
              <input
                v-model="contact.email"
                type="text"
                class="form-control"
                placeholder="Email"
                name="email"
                id="f_email"
                aria-describedby="helpId"
              />
            </div>
            <div class="col-12 pt-2">
              <input
                v-model="contact.mobile"
                type="text"
                class="form-control"
                placeholder="Mobile"
                name="mobile"
                id="f_mobile"
                aria-describedby="helpId"
              />
            </div>
            <div class="col-12 pt-2">
              <input
                v-model="contact.company"
                type="text"
                class="form-control"
                placeholder="Company"
                name="company"
                id="f_company"
                aria-describedby="helpId"
              />
            </div>
            <div class="col-12 pt-2">
              <input
                v-model="contact.title"
                type="text"
                class="form-control"
                placeholder="Title"
                name="title"
                id="f_title"
                aria-describedby="helpId"
              />
            </div>
            <div class="col-12 pt-2">
              <select
                v-model="contact.departmentId"
                class="form-control"
                name="department"
                id="f_department"
              >
                <option value="">Select Department</option>
                <option
                  :value="department.id"
                  v-for="department of departments"
                  :key="department.id"
                >
                  {{ department.name }}
                </option>
              </select>
            </div>
            <div class="col-12 pt-2 text-right">
              <router-link to="/" class="btn btn-info">
                <i class="fa fa-home" aria-hidden="true"></i> Return
              </router-link>
              <button type="submit" class="btn btn-success">
                <i class="fas fa-save"></i> Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'AddContact',
  data: function () {
    return {
      contact: {
        name: '',
        email: '',
        mobile: '',
        company: '',
        title: '',
        departmentId: ''
      },
      departments: []
    }
  },
  mounted: async function () {
    $('#overlay').fadeIn(300)
    try {
      await axios
        .get('https://flask-ixa37fbfva-uc.a.run.app/api/v1/vue/departments')
        .then((response) => {
          this.departments = response.data
        })
        .catch((e) => {
          console.error(e)
        })
    } catch (error) {
      console.debug(`ContactService ${error}`)
    }
    $('#overlay').fadeOut(300)
  },
  methods: {
    submitCreate: function () {
      $('#overlay').fadeIn(300)
      try {
        console.error(this.contact)
        axios
          .post(
            'https://flask-ixa37fbfva-uc.a.run.app/api/v1/vue/contacts/add',
            this.contact
          )
          .then((response) => {
            return this.$router.push('/')
          })
          .catch((e) => {
            console.error(e)
            return this.$router.push('/contacts/add')
          })
      } catch (error) {
        console.debug(`ContactService ${error}`)
      }
      $('#overlay').fadeOut(300)
    }
  }
}
</script>

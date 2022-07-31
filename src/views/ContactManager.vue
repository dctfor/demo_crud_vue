<template>
  <div>
    <div class="container-fluid pt-4">
      <div class="row">
        <div class="col">
          <p class="h3 text-primary fw-bold">Contact Manager</p>
        </div>
        <div class="col" style="text-align: right">
          <router-link to="/contacts/add" class="btn btn-primary btn-sm">
            <i class="fa fa-plus-circle" aria-hidden="true"></i> Create contact
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </div>
    <div class="container-fluid p-4" v-if="contacts.length > 0">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        <div
          :id="contact.id"
          class="col-xl-3 col-sm-6 col-xs-12 mb-4"
          v-for="(contact, idx) of contacts"
          :key="idx"
        >
          <div class="card h-100 list-group-item-primary a-s-box shadow">
            <div class="card-img-top pt-3">
              <img
                src="./../assets/profile.webp"
                class="profile-img"
                height="100%"
                width="100%"
                :alt='"Profile foto of " + contact.name'
              />
            </div>
            <div class="card-body">
              <input
                type="hidden"
                class="form-control"
                name="contactid"
                id="contactid"
                placeholder=""
                value=""
              />
              <ul class="list-group">
                <li class="list-group-item text-wrap">
                  <b>Name:</b> <span class="fw-bold">{{ contact.name }}</span>
                </li>
                <li class="list-group-item text-wrap">
                  <b>Email:</b> <span class="fw-bold">{{ contact.email }}</span>
                </li>
                <li class="list-group-item text-wrap">
                  <b>Mobile:</b> <span class="fw-bold">{{ contact.mobile }}</span>
                </li>
              </ul>
            </div>
            <div class="card-footer" style="display: inline">
              <router-link
                :to="`/contacts/view/${contact.id}`"
                class="btn btn-light col-3"
                style="min-width: 20px"
                :alt='"Button View Details of " + contact.name'
              >
                <i class="fa fa-eye" aria-hidden="true"></i>
              </router-link>
              <router-link
                :to="`/contacts/edit/${contact.id}`"
                class="btn btn-primary col-3"
                style="min-width: 20px"
                :alt='"Button Edit Details of " + contact.name'
              >
                <i class="fa fa-pen"></i>
              </router-link>
              <button
                @click="deleteContact(contact.id)"
                class="btn btn-danger col-3"
                style="min-width: 20px"
                :alt='"Button Delete profile of " + contact.name'
              >
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ContactService from './services/ContactService.js'
import axios from 'axios'


export default {
  name: 'ContactManager',
  data: function () {
    return {
      contacts: []
    }
  },
  mounted: async function () {
    $('#overlay').fadeIn(300)
    try {
      await axios
        .get('https://flask-ixa37fbfva-uc.a.run.app/api/v1/vue/contacts')
        .then((response) => {
          this.contacts = response.data
          this.contacts.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
          $('#overlay').fadeOut(300)
        })
        .catch((e) => {
          console.error(e)
          $('#overlay').fadeOut(300)
        })
    } catch (error) {
      console.error(`ContactService ${error}`)
      $('#overlay').fadeOut(300)
    }
  },
  methods: {
    deleteContact: function (id) {
      $('#overlay').fadeIn(300)
      try {
        axios
          .delete(
            'https://flask-ixa37fbfva-uc.a.run.app/api/v1/vue/contacts/delete/' + id
          )
          .then((response) => {
            document.getElementById(id).remove()
          })
          .catch((e) => {
            console.error(e)
          })
      } catch (error) {
        console.debug(`ContactService ${error}`)
      }
      $('#overlay').fadeOut(300)
    }
  }
}
</script>

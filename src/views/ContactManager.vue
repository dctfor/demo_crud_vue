<template>
  <div>
    <div class="container-fluid pt-4">
      <div class="row">
        <div class="col text-center">
          <p class="h3 text-primary fw-bold animate-da-text">Contacts Viewer Simplified v0.1.3a</p>
          <!-- <button class="glow_btn"> Contacts Viewer Simplified v0.1.3a</button> -->
        </div>
        <div class="col" style="text-align: right">
          <!-- <router-link to="/contacts/add" class="learn-more">.</router-link> -->
          <button class="learn-more"> Add Contact </button>
          <button type="button" class="learn-more" data-toggle="modal" data-target="#exampleModal">About Me </button>
          <button class="learn-more"> LogMeOut </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <p>
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
          <div class="card h-100 list-group-item-light a-s-box shadow">
            <div class="card-img-top pt-3">
              <img
                src="@/assets/img/profile.webp"
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
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">About this simple <b>VUE.JS</b> project ...</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                        <p>This is a simple CRUD example using VUE.JS 3 as Frontend, As a backend I use another Code Repo in Flask which stores data in FireBase, no secrets are shared in the repo, they are stored in "Google Secrets"</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ContactService from './services/ContactService.js'
import axios from 'axios'
import $ from 'jquery'

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

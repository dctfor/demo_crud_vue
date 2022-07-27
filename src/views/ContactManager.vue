<template>
  <div>
    <div class="container pt-4">
      <div class="row">
        <div class="col">
          <p class="h3 text-primary fw-bold">Contact Manager</p>
        </div>
        <div class="col" style="text-align: right">
          <router-link to="/contacts/add" class="btn btn-success btn-sm">
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
    <div class="container" v-if="contacts.length > 0">
      <div class="row">
        <div
          :id="contact.id"
          class="card col-md-5 col-sm-12 m-1 list-group-item-primary custom-user-card"
          v-for="(contact, idx) of contacts"
          :key="idx"
        >
          <div class="card-body">
            <div class="row">
              <div class="col-lg-4 col-md-12 col-sm-12 my-1">
                <img
                  src="https://img.icons8.com/external-kmg-design-outline-color-kmg-design/344/external-profile-ui-essential-kmg-design-outline-color-kmg-design.png "
                  class="profile-img"
                  alt=""
                />
              </div>
              <div class="col-lg-7 col-md-12 col-sm-12 my-1">
                <input
                  type="hidden"
                  class="form-control"
                  name="contactid"
                  id="contactid"
                  placeholder=""
                  value=""
                />
                <ul class="list-group">
                  <li class="list-group-item">
                    Name: <span class="fw-bold">{{ contact.name }}</span>
                  </li>
                  <li class="list-group-item">
                    Email: <span class="fw-bold">{{ contact.email }}</span>
                  </li>
                  <li class="list-group-item">
                    Mobile: <span class="fw-bold">{{ contact.mobile }}</span>
                  </li>
                </ul>
              </div>
              <div
                class="col-lg-1 col-md-12 col-sm-12 my-1 d-flex flex-column justify-content-center px-1"
              >
                <router-link
                  :to="`/contacts/view/${contact.id}`"
                  class="btn btn-warning my-1 px-1"
                >
                  <i class="fa fa-eye" aria-hidden="true"></i>
                </router-link>
                <router-link
                  :to="`/contacts/edit/${contact.id}`"
                  class="btn btn-primary my-1 px-1"
                >
                  <i class="fa fa-pen"></i>
                </router-link>
                <button
                  @click="deleteContact(contact.id)"
                  class="btn btn-danger my-1 px-1"
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ContactService from './services/ContactService.js'
import axios from "axios";

export default {
  name: "ContactManager",
  data: function () {
    return {
      contacts: [],
    };
  },
  created: async function () {
    $("#overlay").fadeIn(300);
    try {
      axios
        .get("https://flask-ixa37fbfva-uc.a.run.app/api/v1/vue/contacts")
        .then((response) => {
          this.contacts = response.data;
          this.contacts.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
        })
        .catch((e) => {
          console.error(e);
        });
    } catch (error) {
      console.error(`ContactService ${error}`);
    }
    $("#overlay").fadeOut(300);
  },
  methods: {
    deleteContact: function (id) {
      $("#overlay").fadeIn(300);
      try {
        axios
          .delete(
            "https://flask-ixa37fbfva-uc.a.run.app/api/v1/vue/contacts/delete/" + id
          )
          .then((response) => {
            document.getElementById(id).remove();
          })
          .catch((e) => {
            console.error(e);
          });
      } catch (error) {
        console.debug(`ContactService ${error}`);
      }
      $("#overlay").fadeOut(300);
    },
  },
};
</script>

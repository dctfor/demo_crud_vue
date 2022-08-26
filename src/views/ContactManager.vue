<template>
  <div>
    <div class="container-fluid p-4" v-if="contacts.length > 0">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        <div
          :id="contact.id"
          class="col-xl-3 col-sm-6 col-xs-12 mb-4 c-card-col"
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
            <div class="card-footer d-flex overflow-hidden" role="group">
            <button class="btn btn-theme w-100 c_f_btn"
                    type="button" @click="viewContact(contact.id)">Check
            </button>
            <button class="btn btn-theme w-100 c_f_btn"
                    type="button">Edit
            </button>
            <button class="btn btn-theme w-100 c_f_btn_delete"
                    type="button" @click="confirmDelete(contact)">Delete
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ABOUT MODAL -->
    <div class="modal fade" id="aboutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content mc-info">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">About this simple <b>VUE.JS</b> project ...</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                        <p>This is a simple CRUD example using VUE.JS 2 as Frontend, As a backend I use another Code Repo in Flask which stores data in FireBase, no secrets are shared in the repo, they are stored in "Google Secrets"</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- CHECK MODAL -->
    <div class="modal fade" id="checkModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content mc-info">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">View</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-2 mr-sm-2">
              <div class="input-group-prepend">
                <div class="input-group-text">Name</div>
              </div>
              <input type="text" class="form-control" id="modalInfoName" placeholder="Notice: Without Name" disabled>
            </div>
            <div class="input-group mb-2 mr-sm-2">
              <div class="input-group-prepend">
                <div class="input-group-text">Email</div>
              </div>
              <input type="text" class="form-control" id="modalInfoEmail" placeholder="Notice: Without Email" disabled>
            </div>
            <div class="input-group mb-2 mr-sm-2">
              <div class="input-group-prepend">
                <div class="input-group-text">Mobile</div>
              </div>
              <input type="text" class="form-control" id="modalInfoMobile" placeholder="Notice: Without Mobile" disabled>
            </div>
            <div class="input-group mb-2 mr-sm-2">
              <div class="input-group-prepend">
                <div class="input-group-text">Company</div>
              </div>
              <input type="text" class="form-control" id="modalInfoCompany" placeholder="Notice: Without Company" disabled>
            </div>
            <div class="input-group mb-2 mr-sm-2">
              <div class="input-group-prepend">
                <div class="input-group-text">Title</div>
              </div>
              <input type="text" class="form-control" id="modalInfoTitle" placeholder="Notice: Without Title" disabled>
            </div>
            <div class="input-group mb-2 mr-sm-2">
              <div class="input-group-prepend">
                <div class="input-group-text">Department</div>
              </div>
              <input type="text" class="form-control" id="modalInfoDepartment" placeholder="Notice: Without Department" disabled>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- DELETE MODAL -->
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content mc-warning">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Warning</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            You're about to delete the record of <span id="del_me"></span>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary w-100" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger w-100" id="btnCounter" disabled>Delete <span id="count"></span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ContactManager',
  data: function () {
    return {
      contacts: [],
      contact: {
        name: '',
        email: '',
        mobile: '',
        company: '',
        title: '',
        department: ''
      },
      department: '',
      config: {
        headers: {
          Authorization: `JWT ${localStorage['a_t']}`
        }
      }
    }
  },
  mounted: async function () {
    $('#overlay').fadeIn(300)
    try {
      await axios
        .get(this.$apiUrl + this.$apiRoute + 'contacts', this.config)
        .then((response) => {
          this.contacts = response.data
          this.contacts.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
          $('#overlay').fadeOut(300)
        })
        .catch((e) => {
          console.error(e.response.data.error)
          console.error('access token: ' + localStorage['a_t'])
          localStorage['a_t'] = null
          return this.$router.push('/login')
        })
    } catch (error) {
      console.error(`ContactService ${error}`)
      $('#overlay').fadeOut(300)
    }
  },
  methods: {
    /* eslint-disable */
    confirmDelete: function (contact) {
      $('#del_me').html(contact.name + ' with phone number ' + contact.mobile)
      var spn = document.getElementById('count')
      var btn = document.getElementById('btnCounter')
      btn.setAttribute('disabled', '')
      $('#deleteModal').modal('show')
      var count = 3
      var timer = null
      // TODO: handle properly the queue for this count down
      ( function countDown () {
        spn.textContent = 'in ' + count
        if (count !== 0) {
          timer = setTimeout(countDown, 1000)
          count--
        } else {
          spn.textContent = ''
          btn.removeAttribute('disabled')
        }
      }()) 
      /* eslint-enable */
    },
    viewContact: async function (id) {
      $('#overlay').fadeIn(300)
      try {
        let miName = document.getElementById('modalInfoName')
        let miEmail = document.getElementById('modalInfoEmail')
        let miMobile = document.getElementById('modalInfoMobile')
        let miCompany = document.getElementById('modalInfoCompany')
        let miTitle = document.getElementById('modalInfoTitle')
        let miDepartment = document.getElementById('modalInfoDepartment')
        await axios
          .get(
            this.$apiUrl + this.$apiRoute + 'contacts/' + id, this.config
          )
          .then((response) => {
            this.contact = response.data
          })
          .catch((e) => {
            console.error(e)
            $('#overlay').fadeOut(300)
          })
        console.log('contact:' + this.contact)
        console.log('department:' + this.department)
        miName.value = this.contact.name
        miEmail.value = this.contact.email
        miMobile.value = this.contact.mobile
        miCompany.value = this.contact.company
        miTitle.value = this.contact.title
        miDepartment.value = this.contact.department
        $('#overlay').fadeOut(300)
        $('#checkModal').modal('show')
      } catch (error) {
        console.debug(`ContactService ${error}`)
        $('#overlay').fadeOut(300)
      }
    },
    deleteContact: function (id) {
      $('#overlay').fadeIn(300)
      try {
        axios
          .delete(
            this.$apiUrl + this.$apiRoute + 'contacts/delete/' + id
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

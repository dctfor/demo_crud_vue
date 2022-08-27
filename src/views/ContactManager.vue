<template>
  <div>
    <div class="container-fluid p-4" v-if="contacts.length > 0">
      <div id="card_container" class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        <div :id="'cardid_'+contact.id" class="col-xl-3 col-sm-6 col-xs-12 mb-4 c-card-col" v-for="(contact, idx) of contacts" :key="idx">
          <div class="card h-100 list-group-item-light a-s-box shadow">
            <div class="card-img-top pt-3">
              <img src="@/assets/img/profile.webp" class="profile-img" height="100%" width="100%" :alt='"Profile foto of " + contact.name'/>
            </div>
            <div class="card-body">
              <input type="hidden" class="form-control" name="contactid" :id="'contactid_'+contact.id" placeholder="" value=""/>
              <ul class="list-group">
                <li class="list-group-item text-wrap">
                  <b>Name:</b> <span class="fw-bold" :id="'spanName_'+contact.id">{{ contact.name }}</span>
                </li>
                <li class="list-group-item text-wrap">
                  <b>Email:</b> <span class="fw-bold" :id="'spanEmail_'+contact.id">{{ contact.email }}</span>
                </li>
                <li class="list-group-item text-wrap">
                  <b>Mobile:</b> <span class="fw-bold" :id="'spanMobile_'+contact.id">{{ contact.mobile }}</span>
                </li>
              </ul>
            </div>
            <div class="card-footer d-flex overflow-hidden" role="group">
              <button class="btn btn-theme w-100 c_f_btn"
                      type="button" @click="viewContact(contact.id)">Check
              </button>
              <button class="btn btn-theme w-100 c_f_btn"
                      type="button" @click="editContact(contact.id)">Edit
              </button>
              <button class="btn btn-theme w-100 c_f_btn_delete"
                      type="button" @click="confirmDelete(contact)">Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MainModals @submitEdit="submitUpdate" @submitDelete="deleteContact" @submitNew="createContact"/>
  </div>
</template>

<script>
import axios from 'axios'
import MainModals from '@/components/MainModals'

export default {
  name: 'ContactManager',
  components: {MainModals},
  data: function () {
    return {
      contacts: [],
      contact: {
        name: '',
        email: '',
        mobile: '',
        company: '',
        title: '',
        department: '',
        departmentId: ''
      },
      departments: [],
      config: {
        headers: {
          Authorization: `JWT ${localStorage['a_t']}`
        }
      }
    }
  },
  created () {
    $('.modal-backdrop.show').fadeOut()
  },
  beforeMount: async function () {
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
          setInterval(this.$toast.open({
            message: 'Notice: Your session was closed by the system',
            type: 'info',
            position: 'top',
            dismissible: true,
            duration: 5000
          }), 1000)
          return this.$router.push('/login')
        })
      axios
        .get(this.$apiUrl + this.$apiRoute + 'departments', this.config)
        .then((response) => {
          this.departments = response.data
        })
        .catch((e) => {
          console.error(e.response.data.error)
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
      this.contact = contact
      $('#del_me').html(contact.name + ' with phone number ' + contact.mobile)
      $('#deleteModal').modal('show')
    },
    viewContact: async function (id) {
      $('#overlay').fadeIn(300)
      try {
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
        document.getElementById('modalInfoName').value = this.contact.name
        document.getElementById('modalInfoEmail').value = this.contact.email
        document.getElementById('modalInfoMobile').value = this.contact.mobile
        document.getElementById('modalInfoCompany').value = this.contact.company
        document.getElementById('modalInfoTitle').value = this.contact.title
        document.getElementById('modalInfoDepartment').value = this.contact.department
        $('#overlay').fadeOut(300)
        $('#checkModal').modal('show')
      } catch (error) {
        console.debug(`ContactService ${error}`)
        $('#overlay').fadeOut(300)
      }
    },
    createContact: async function () {
      $('#overlay').fadeIn(300)
      try {
        this.contact.name = document.getElementById('modalAddName').value
        this.contact.email = document.getElementById('modalAddEmail').value
        this.contact.mobile = document.getElementById('modalAddMobile').value
        this.contact.company = document.getElementById('modalAddCompany').value
        this.contact.title = document.getElementById('modalAddTitle').value
        this.contact.departmentId = document.getElementById('modalAddDepartment').value
        axios
          .post(
            this.$apiUrl + this.$apiRoute + 'contacts/add',
            this.contact, 
            this.config
          )
          .then((response) => {
            this.$toast.open({
              message: 'Contact ' + this.contact.name + ' created',
              type: 'success',
              position: 'top-right',
              dismissible: true,
              duration: 5000
            })
            this.$router.push('/contacts')
          })
          .catch((e) => {
            console.error(e)
            this.$toast.open({
              message: 'Contact ' + this.contact.name + ' was not created',
              type: 'warning',
              position: 'top-right',
              dismissible: true,
              duration: 5000
            })
          })
      } catch (error) {
        console.debug(`ContactService ${error}`)
      }
      $('#overlay').fadeOut(300)
    },
    editContact: async function (id) {
      $('#overlay').fadeIn(300)
      try {
        await axios
          .get(
            this.$apiUrl + this.$apiRoute + 'contacts/' + id, this.config
          )
          .then((response) => {
            this.contact = response.data
            document.getElementById('modalEditName').value = this.contact.name
            document.getElementById('modalEditEmail').value = this.contact.email
            document.getElementById('modalEditMobile').value = this.contact.mobile
            document.getElementById('modalEditCompany').value = this.contact.company
            document.getElementById('modalEditTitle').value = this.contact.title
            document.getElementById('modalEditDepartment').value = this.contact.departmentId
          })
          .catch((e) => {
            console.error(e)
            $('#overlay').fadeOut(300)
          })
        $('#overlay').fadeOut(300)
        $('#editModal').modal('show')
      } catch (error) {
        console.debug(`ContactService ${error}`)
        $('#overlay').fadeOut(300)
      }
    },
    submitUpdate: async function () {
      $('#overlay').fadeIn(300)
      try {
        this.contact.name = document.getElementById('modalEditName').value
        this.contact.email = document.getElementById('modalEditEmail').value
        this.contact.mobile = document.getElementById('modalEditMobile').value
        this.contact.company = document.getElementById('modalEditCompany').value
        this.contact.title = document.getElementById('modalEditTitle').value
        this.contact.departmentId = document.getElementById('modalEditDepartment').value
        await axios
          .post(
            this.$apiUrl + this.$apiRoute + 'contacts/update',
            this.contact,
            this.config
          )
          .then((response) => {
            document.getElementById('spanName_'+this.contact.id).textContent = this.contact.name
            document.getElementById('spanEmail_'+this.contact.id).textContent = this.contact.email
            document.getElementById('spanMobile_'+this.contact.id).textContent = this.contact.mobile
            this.$toast.open({
              message: 'Contact ' + this.contact.name + ' updated',
              type: 'success',
              position: 'top-right',
              dismissible: true,
              duration: 5000
            })
          })
          .catch((e) => {
            this.$toast.open({
              message: 'Contact was not updated',
              type: 'warning',
              position: 'top-right',
              dismissible: true,
              duration: 5000
            })
            console.error(e)
          })
      } catch (error) {
        console.debug(`ContactService ${error}`)
      }
      $('#overlay').fadeOut(300)
    },
    deleteContact: function () {
      $('#overlay').fadeIn(300)
      try {
        axios
          .delete(
            this.$apiUrl + this.$apiRoute + 'contacts/delete/' + this.contact.id,
            this.config
          )
          .then((response) => {
            $('#deleteModal').modal('hide')
            $('#cardid_'+this.contact.id).animate({
                    width: "toggle"
                });
            this.$toast.open({
              message: 'The contact was deleted',
              type: 'warning',
              position: 'top-right',
              dismissible: true,
              duration: 5000
            })
          })
          .catch((e) => {
            this.$toast.open({
              message: 'We couldn\'t delete the contact',
              type: 'warning',
              position: 'top-right',
              dismissible: true,
              duration: 5000
            })
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

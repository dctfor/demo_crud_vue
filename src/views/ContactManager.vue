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

    <MainModals @submitEdit="submitUpdate" />

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
    editContact: async function (id) {
      $('#overlay').fadeIn(300)
      try {
        // let miDepartment = document.getElementById('modalEditDepartment')
        await axios
          .get(
            this.$apiUrl + this.$apiRoute + 'contacts/' + id, this.config
          )
          .then((response) => {
            console.log(response.data)
            this.contact = response.data
          })
          .catch((e) => {
            console.error(e)
            $('#overlay').fadeOut(300)
          })
        document.getElementById('modalEditName').value = this.contact.name
        document.getElementById('modalEditEmail').value = this.contact.email
        document.getElementById('modalEditMobile').value = this.contact.mobile
        document.getElementById('modalEditCompany').value = this.contact.company
        document.getElementById('modalEditTitle').value = this.contact.title
        console.log(this.contact.deparmentId)
        document.getElementById('modalEditDepartment').value = this.contact.departmentId
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
    deleteContact: function (id) {
      $('#overlay').fadeIn(300)
      try {
        axios
          .delete(
            this.$apiUrl + this.$apiRoute + 'contacts/delete/' + id,
            this.config
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

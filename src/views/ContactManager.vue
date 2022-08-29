<template>
  <div>
    <div class="container-fluid p-4" v-if="contacts.length > 0">
      <div id="card_container" class="row row-cols-1 row-cols-sm-2 row-cols-md-4" ref="container">
        <ContactCard v-for="(contact, idx) of contacts" :key="idx" :contact="contact" />
      </div>
    </div>
    <MainModals @signalEdit="submitUpdate" @signalDelete="deleteContact" @signalNew="createContact"/>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import MainModals from '@/components/MainModals'
import ContactCard from '@/components/ContactCard'

export default {
  name: 'ContactManager',
  components: {MainModals, ContactCard},
  data: function () {
    return {
      bErr: false,
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
        })
        .catch((e) => {
          this.bErr = true
          console.error(e.response.data.error)
          localStorage['a_t'] = null
        })
      axios
        .get(this.$apiUrl + this.$apiRoute + 'departments', this.config)
        .then((response) => {
          this.departments = response.data
          $('#overlay').fadeOut(300)
        })
        .catch((e) => {
          this.bErr = true
          console.error(e.response.data.error)
        })
    } catch (error) {
      this.bErr = true
      console.error(`ContactManagerService: Notice - ${error}`)
    }
    if (this.bErr) {
      this.$toast.open({
        message: 'Notice: Your session was closed by the system',
        type: 'info',
        position: 'top',
        dismissible: true,
        duration: 5000
      })
      setInterval(
        window.location.href = '/'
        , 7000)
    }
  },
  methods: {
    /* eslint-disable */
    confirmDelete: function (contact) {
      this.contact = contact
      $('#del_me').html(contact.name + ' with phone number ' + contact.mobile)
      $('#deleteModal').modal('show')
    },
    createContact: async function () {
      $('#overlay').fadeIn(300)
      this.bErr = false
      try {
        this.contact.name = document.getElementById('modalAddName').value
        this.contact.email = document.getElementById('modalAddEmail').value
        this.contact.mobile = document.getElementById('modalAddMobile').value
        this.contact.company = document.getElementById('modalAddCompany').value
        this.contact.title = document.getElementById('modalAddTitle').value
        this.contact.departmentId = document.getElementById('modalAddDepartment').value
        if (document.getElementById('modalAddName').value.trim() == ''){
          this.$toast.open({
            message: 'Please, write a name',
            type: 'warning',
            position: 'top-right',
            dismissible: true,
            duration: 5000
          })
          $('#overlay').fadeOut(300)
          return 
        }
        if (document.getElementById('modalAddDepartment').value == ''){
          this.$toast.open({
            message: 'Please, choose a department',
            type: 'warning',
            position: 'top-right',
            dismissible: true,
            duration: 5000
          })
          $('#overlay').fadeOut(300)
          return 
        }
        axios
          .post(
            this.$apiUrl + this.$apiRoute + 'contacts/add',
            this.contact, 
            this.config
          )
          .then((response) => {
            this.contact.id = response.data.id
            console.log(this.contact.id)
            this.$toast.open({
              message: 'Contact ' + this.contact.name + ' created',
              type: 'success',
              position: 'top-right',
              dismissible: true,
              duration: 5000
            })
            var contactCard = Vue.extend(ContactCard)
            var instance = new contactCard({
              propsData: {
                contact: this.contact
              }
            })
            instance.$mount()
            this.$refs.container.appendChild(instance.$el)
            $('#addModal').modal('hide')
          })
          .catch((e) => {
            console.error(e)
            this.bErr = true
            this.$toast.open({
              message: 'Contact ' + this.contact.name + ' was not created',
              type: 'warning',
              position: 'top-right',
              dismissible: true,
              duration: 5000
            })
          })
      } catch (error) {
        this.bErr = true
        console.debug(`ContactService ${error}`)
      }
      if (this.bErr) {
        this.$toast.open({
          message: 'Notice: Your session was closed by the system',
          type: 'info',
          position: 'top',
          dismissible: true,
          duration: 5000
        })
        setInterval(
          window.location.href = '/'
          , 7000)
      }

      $('#overlay').fadeOut(300)
    },
    submitUpdate: async function () {
      $('#overlay').fadeIn(300)
      this.bErr = false
      try {
        this.contact.name = document.getElementById('modalEditName').value
        this.contact.email = document.getElementById('modalEditEmail').value
        this.contact.mobile = document.getElementById('modalEditMobile').value
        this.contact.company = document.getElementById('modalEditCompany').value
        this.contact.title = document.getElementById('modalEditTitle').value
        this.contact.departmentId = document.getElementById('modalEditDepartment').value
        this.contact.id = document.getElementById('id2Edit').value
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
            this.bErr = true
            console.error(e)
          })
      } catch (error) {
        this.bErr = true
        console.debug(`ContactService ${error}`)
      }
      if (this.bErr) {
        this.$toast.open({
          message: 'Notice: Your session was closed by the system',
          type: 'info',
          position: 'top',
          dismissible: true,
          duration: 5000
        })
        setInterval(
          window.location.href = '/'
          , 7000)
      }
      $('#overlay').fadeOut(300)
    },
    deleteContact: function () {
      $('#overlay').fadeIn(300)
      this.bErr = false
      var id = document.getElementById('id2Del').value
      try {
        axios
          .delete(
            this.$apiUrl + this.$apiRoute + 'contacts/delete/' + id,
            this.config
          )
          .then((response) => {
            console.log(response)
            $('#deleteModal').modal('hide')
            $('#cardid_'+ id).remove();
            this.$toast.open({
              message: 'The contact was deleted',
              type: 'success',
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
            this.bErr = true
            console.error(e)
          })
      } catch (error) {
        console.debug(`ContactService ${error}`)
        this.bErr = true
      }
      if (this.bErr) {
        this.$toast.open({
          message: 'Notice: Your session was closed by the system',
          type: 'info',
          position: 'top',
          dismissible: true,
          duration: 5000
        })
        setInterval(
          window.location.href = '/'
          , 7000)
      }
      $('#overlay').fadeOut(300)
    }
  }
}
</script>

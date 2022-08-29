<template>
  <div :id="'cardid_' + contact.id" class="col-xl-3 col-sm-6 col-xs-12 mb-4 c-card-col">
    <div class="card h-100 list-group-item-light a-s-box shadow">
      <div class="card-img-top pt-3">
        <img src="@/assets/img/profile.webp" class="profile-img" height="100%" width="100%"
          :alt='"Profile foto of " + contact.name' />
      </div>
      <div class="card-body">
        <input type="hidden" class="form-control" name="contactid" :id="'contactid_' + contact.id" placeholder=""
          :value="contact" />
        <ul class="list-group">
          <li class="list-group-item text-wrap">
            <b>Name:</b> <span class="fw-bold" :id="'spanName_' + contact.id">{{ contact.name }}</span>
          </li>
          <li class="list-group-item text-wrap">
            <b>Email:</b> <span class="fw-bold" :id="'spanEmail_' + contact.id">{{ contact.email }}</span>
          </li>
          <li class="list-group-item text-wrap">
            <b>Mobile:</b> <span class="fw-bold" :id="'spanMobile_' + contact.id">{{ contact.mobile }}</span>
          </li>
        </ul>
      </div>
      <div class="card-footer d-flex overflow-hidden" role="group">
        <button class="btn btn-theme w-100 c_f_btn" type="button" @click="viewContact(contact)">Check
        </button>
        <button class="btn btn-theme w-100 c_f_btn" type="button" @click="editContact(contact)">Edit
        </button>
        <button class="btn btn-theme w-100 c_f_btn_delete" type="button" @click="confirmDelete(contact)">Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['contact'],
  data: function () {
    return {
      config: {
        headers: {
          Authorization: `JWT ${localStorage['a_t']}`
        }
      }
    }
  },
  methods: {
    confirmDelete: function (contact) {
      document.getElementById('id2Del').value = contact.id
      $('#del_me').html(contact.name + ' with phone number ' + contact.mobile)
      $('#deleteModal').modal('show')
    },
    editContact: async function (contact) {
      $('#overlay').fadeIn(300)
      console.log(contact)
      document.getElementById('id2Edit').value = contact.id
      try {
        document.getElementById('modalEditName').value = contact.name
        document.getElementById('modalEditEmail').value = contact.email
        document.getElementById('modalEditMobile').value = contact.mobile
        document.getElementById('modalEditCompany').value = contact.company
        document.getElementById('modalEditTitle').value = contact.title
        document.getElementById('modalEditDepartment').value = contact.departmentId
        $('#overlay').fadeOut(300)
        $('#editModal').modal('show')
      } catch (error) {
        console.debug(`ContactService ${error}`)
        $('#overlay').fadeOut(300)
      }
    },
    viewContact: async function (contact) {
      $('#overlay').fadeIn(300)
      try {
        await axios
          .get(
            this.$apiUrl + this.$apiRoute + 'contacts/' + contact.id, this.config
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
    }
  }
}
</script>

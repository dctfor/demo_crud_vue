<template>
  <div :id="'cardid_' + contact.id" class="col-xl-3 col-sm-6 col-xs-12 mb-4 c-card-col">
    <div class="card h-100 list-group-item-light a-s-box shadow">
      <div class="card-img-top pt-3">
        <img src="@/assets/img/profile.webp" class="profile-img" height="100%" width="100%"
          :alt='"Profile foto of " + contact.name' />
      </div>
      <div class="card-body">
        <input type="hidden" class="form-control" name="contactid" :id="'contactid_' + contact.id" placeholder=""
          value="" />
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
        <button class="btn btn-theme w-100 c_f_btn" type="button" @click="signalViewContact(contact.id)">Check
        </button>
        <button class="btn btn-theme w-100 c_f_btn" type="button" @click="signalEditContact(contact.id)">Edit
        </button>
        <button class="btn btn-theme w-100 c_f_btn_delete" type="button" @click="signalConfirmDelete(contact)">Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['contact'],
  methods: {
    signalViewContact: function (id) {
      this.$emit('signalViewContact', id)
    },
    signalEditContact: function (id) {
      this.$emit('signalEditContact', id)
    },
    signalConfirmDelete: function (contact) {
      this.$emit('signalConfirmDelete', contact)
    }
  }
}
</script>

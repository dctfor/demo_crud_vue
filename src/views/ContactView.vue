<template>
  <div class="container-fluid pt-4">
    <div class="row">
      <div class="col-12">
        <p class="h3 text-primary fw-bold">View Contact</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <div class="card my-2 list-group-item-primary">
          <div class="card-body">
            <div class="row">
              <div class="col-md-4 col-sm-12 my-1 align-middle">
                <img
                  src="https://img.icons8.com/external-kmg-design-outline-color-kmg-design/344/external-profile-ui-essential-kmg-design-outline-color-kmg-design.png "
                  class="profile-img"
                  alt=""
                />
              </div>
              <div class="col-md-7 col-sm-12 my-1">
                <ul class="list-group">
                  <li class="list-group-item">
                    Name: <span id="s-Name" class="fw-bold">{{ contact.name }}</span>
                  </li>
                  <li class="list-group-item">
                    Email: <span id="s-Email" class="fw-bold">{{ contact.email }}</span>
                  </li>
                  <li class="list-group-item">
                    Mobile:
                    <span id="s-Mobile" class="fw-bold">{{ contact.mobile }}</span>
                  </li>
                  <li class="list-group-item">
                    Company:
                    <span id="s-Company" class="fw-bold">{{ contact.company }}</span>
                  </li>
                  <li class="list-group-item">
                    Title: <span id="s-Title" class="fw-bold">{{ contact.title }}</span>
                  </li>
                  <li class="list-group-item">
                    Department: <span id="s-Group" class="fw-bold">{{ department }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="text-right">
          <!-- <router-link to="/contacts" class="btn btn-info">
            <i class="fa fa-home" aria-hidden="true"></i> Return
          </router-link> -->
          <button class="learn-more">Return Home</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ContactView',
  data: function () {
    return {
      contactId: this.$route.params.contactId,
      contact: {
        name: '',
        email: '',
        mobile: '',
        company: '',
        title: '',
        departmentId: ''
      },
      department: ''
    }
  },
  mounted: async function () {
    $('#overlay').fadeIn(300)
    try {
      await axios
        .get(
          this.$apiUrl + this.$apiRoute + 'contacts/' + this.contactId
        )
        .then((response) => {
          this.contact = response.data
          axios
            .get(
              this.$apiUrl + this.$apiRoute + 'departments/' +
                this.contact.departmentId
            )
            .then((response) => {
              this.department = response.data.name
              $('#overlay').fadeOut(300)
            })
            .catch((e) => {
              console.error(e)
              $('#overlay').fadeOut(300)
            })
        })
        .catch((e) => {
          console.error(e)
          $('#overlay').fadeOut(300)
        })
    } catch (error) {
      console.debug(`ContactService ${error}`)
      $('#overlay').fadeOut(300)
    }
  }
}
</script>

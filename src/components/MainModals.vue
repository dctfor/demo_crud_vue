<template>
    <div>
        <!-- ABOUT MODAL -->
        <div class="modal fade" id="aboutModal" tabindex="-1" role="dialog" aria-labelledby="aboutModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content mc-info">
                <div class="modal-header">
                    <h5 class="modal-title" id="aboutModalLabel">About this simple <b>VUE.JS</b> project ...</h5>
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
        <!-- PRICING MODAL -->
        <div class="modal fade" id="pricingModal" tabindex="-1" role="dialog" aria-labelledby="pricingModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content mc-success">
                <div class="modal-header">
                    <h5 class="modal-title" id="pricingModalLabel">I'm open to <b>SELL</b> my services</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col">
                            <p>There's always a gap usually in between what can be offered and the final price</p>
                            <p>But as far I can get paid better, I don't mind become a firefighter in prod projects</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col text-center">
                            <img src="@/assets/img/greedy_cat.gif">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
        <!-- ADD MODAL -->
        <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content mc-success">
                <div class="modal-header">
                    <h5 class="modal-title" id="addModalLabel">Add</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Name</div>
                    </div>
                    <input type="text" class="form-control" id="modalAddName" placeholder=" Name">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Email</div>
                    </div>
                    <input type="text" class="form-control" id="modalAddEmail" placeholder=" Email">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Mobile</div>
                    </div>
                    <input type="text" class="form-control" id="modalAddMobile" placeholder=" Mobile">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Company</div>
                    </div>
                    <input type="text" class="form-control" id="modalAddCompany" placeholder=" Company">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">Title</div>
                        </div>
                    <input type="text" class="form-control" id="modalAddTitle" placeholder=" Title">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">Department</div>
                        </div>
                        <select class="form-control" name="modalAddDepartment" id="modalAddDepartment"  aria-label="modalAddDepartment">
                            <option value="">Select Department</option>
                            <option :value="department.id" v-for="department of departments" :key="department.id" >
                                {{ department.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-dismiss="modal" @click="signalNew()" >Save</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
        <!-- EDIT MODAL -->
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content mc-info">
                <div class="modal-header">
                    <h5 class="modal-title" id="editModalLabel">Edit</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Name</div>
                    </div>
                    <input type="text" class="form-control" id="modalEditName" placeholder="Notice: Without Name">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Email</div>
                    </div>
                    <input type="text" class="form-control" id="modalEditEmail" placeholder="Notice: Without Email">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Mobile</div>
                    </div>
                    <input type="text" class="form-control" id="modalEditMobile" placeholder="Notice: Without Mobile">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Company</div>
                    </div>
                    <input type="text" class="form-control" id="modalEditCompany" placeholder="Notice: Without Company">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">Title</div>
                        </div>
                    <input type="text" class="form-control" id="modalEditTitle" placeholder="Notice: Without Title">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">Department</div>
                        </div>
                        <select class="form-control" name="modalEditDepartment" id="modalEditDepartment"  aria-label="modalEditDepartment">
                            <option value="">Select Department</option>
                            <option :value="department.id" v-for="department of departments" :key="department.id" >
                                {{ department.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-dismiss="modal" @click="signalEdit()" >Update</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
        <!-- VIEW MODAL -->
        <div class="modal fade" id="checkModal" tabindex="-1" role="dialog" aria-labelledby="checkModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content mc-light">
                <div class="modal-header">
                    <h5 class="modal-title" id="checkModalLabel">View</h5>
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
                    <button type="button" class="btn btn-danger w-100" id="btnCounter" @click="signalDelete()">Delete <span id="count"></span></button>
                </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MainModals',
  data: function () {
    return {
      departments: [],
      config: {
        headers: {
          Authorization: `JWT ${localStorage['a_t']}`
        }
      }
    }
  },
  beforeMount: function () {
    axios
      .get(this.$apiUrl + this.$apiRoute + 'departments', this.config)
      .then((response) => {
        this.departments = response.data
      })
      .catch((e) => {
        console.error(e.response.data.error)
      })
  },
  methods: {
    signalNew () {
      this.$emit('signalNew')
    },
    signalEdit () {
      this.$emit('signalEdit')
    },
    signalDelete () {
      if (window.confirm('Do you really want to delete this?')) {
        this.$emit('signalDelete')
      }
    }
  }
}

</script>

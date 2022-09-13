export default class DomHooks {
  static generalHooks() {
    this.editForm = document.getElementById("edit-form")
    this.addForm = document.getElementById("add-form")
    return {
      editForm: this.editForm,
      editInputs: this.editForm.querySelectorAll("input, select"),
      addForm: this.addForm,
      addInputs: this.addForm.querySelectorAll("input[type=text], input[type= number], input[type=checkbox], select"),
      moduleBg: document.querySelector(".confirm-delete-bg"),
      deleteModule: document.querySelector(".confirm-delete-module"),
      deleteOptions: document.querySelector(".delete-actions"),
      deleteMsgHook: document.querySelector(".delete-msg"),
      editBtns: document.querySelectorAll(".edit-btn"),
      activityOptions: document.getElementById("edit-activity-options"),
      updateBtn: document.getElementById("update"),
      cancelEditBtn: document.getElementById("cancel-edit"),
    }
  }

  static formHooks(action) {
    return {
      fNameHook: document.getElementById(`${action}-first-name`),
      lNameHook: document.getElementById(`${action}-last-name`),
      addressHook: document.getElementById(`${action}-address`),
      zipHook: document.getElementById(`${action}-zip`),
      cityHook: document.getElementById(`${action}-city`),
      countryHook: document.getElementById(`${action}-country`),
      genderHook: document.getElementById(`${action}-gender`),
      ageHook: document.getElementById(`${action}-age`),
      activityHook: document.querySelector(`input[name="${action}-activity"]:checked`),
      sportsHook: document.querySelectorAll(`.${action}-sports-option`)
    }
  }
}

import Fetch from "./components/Fetch.js";
import UsersList from "./components/UsersList.js";
import FormHandler from "./components/FormHandler.js";
import ToastHandler from "./components/ToastHandler.js";

export default class App {
  static async init() {
    this.fetch = new Fetch();
    this.usersList = new UsersList();
    this.formHandler = new FormHandler();

    let toastId = ToastHandler.updateToast("loading","we are loading the users list, please hold");

    const data = await this.fetch.callFetch("GET", "");
    this.usersList.render(data);
    ToastHandler.updateToast("done", "the users list is now loaded!", toastId);

    this.formHandler.initAdd();
  }

  static disableForm = () => {
    const editForm = document.getElementById("edit-form");
    const editInputs = editForm.querySelectorAll("input, select");
    editInputs.forEach((input) => {
      if (input.type !== "radio" && input.type !== "checkbox") {
        input.value = "";
    } else {input.checked = false;}
    });
  };

  static async add(newUser) {
    const addForm = document.getElementById("add-form");
    const addInputs = addForm.querySelectorAll("input[type =text], input[type= number], input[type = checkbox], select");

    let toastId = ToastHandler.updateToast("loading", `we are adding ${newUser.firstName} ${newUser.lastName} please hold!`);
    await this.fetch.callFetch("POST", "", newUser);
    this.disableForm(addInputs)
    const newUsersList = await this.fetch.callFetch("GET", "");
    this.usersList.render(newUsersList);
    ToastHandler.updateToast("done", `the user ${newUser.firstName} ${newUser.lastName} has been added successfully!`,toastId);
  }

  static async delete(user) {
    const bg = document.querySelector(".confirm-delete-bg");
    const module = document.querySelector(".confirm-delete-module");
    const deleteOptions = document.querySelector(".delete-actions");
    const deleteMsgHook = document.querySelector(".delete-msg");

    deleteMsgHook.innerText = `Are you sure you want to delete this user: ${user.firstName} ${user.lastName}?`;

    const toggleModule = () => {
      bg.classList.toggle("hidden");
      module.classList.toggle("hidden");
    }

    this.toggleForm(true)
    this.disableForm()
    toggleModule()

    let confirmHandler = () => {
      return new Promise((resolve) => {
        let clickHandler = (e) => {
          if (e.target.id == "confirm") resolve(true);
          else if (e.target.id == "cancel") resolve(false);
        };
        deleteOptions.onclick = clickHandler;
        bg.onclick = () => resolve(false);
      });
    };

    let result = await confirmHandler();
    toggleModule()

    if (result) {
      let toastId = ToastHandler.updateToast("loading","sending delete request");

      await this.fetch.callFetch("delete", user.id);
      this.usersList.delete(user);

      ToastHandler.updateToast("done", `the user "${user.firstName} ${user.lastName}" has been deleted successfully!`, toastId);
    }
  }

  static toggleForm = (checkIfclosed) => {
    const addForm = document.getElementById("add-form");
    const editBtns = document.querySelectorAll(".edit-btn");
    const activityOptions = document.getElementById("edit-activity-options");
    const editForm = document.getElementById("edit-form");
    const editInputs = editForm.querySelectorAll("input, select");
    const updateBtn = document.getElementById("update");
    const cancelEditBtn = document.getElementById("cancel-edit");

    if(checkIfclosed && updateBtn.disabled == true) {return}

    editBtns.forEach((btn) => {btn.toggleAttribute('disabled')});
    editInputs.forEach((input) => input.disabled = !input.disabled);
    editForm.classList.toggle("tablet-hidden");
    addForm.classList.toggle("tablet-hidden");
    activityOptions.classList.toggle("disabled");
    updateBtn.disabled = !updateBtn.disabled;
    cancelEditBtn.disabled = !cancelEditBtn.disabled;
  }

  static edit(user) {
    this.formHandler.edit(user);
    const updateBtn = document.getElementById("update");
    const cancelEditBtn = document.getElementById("cancel-edit");

    this.toggleForm()

    let confirmEditListner = async (e) => {
      e.preventDefault();
      let status = this.formHandler.validateForm("edit");

      if (status == false) {
        ToastHandler.updateToast("invalid","make sure to complete all the required fields!");
        return;
      }

      let updatedUser = this.formHandler.generateUser("edit", user.id);
      this.disableForm();
      this.toggleForm()

      let toastId = ToastHandler.updateToast("loading", `we are updating the user ${user.firstName} ${user.lastName}, please hold!`);

      await this.fetch.callFetch("PUT", user.id, updatedUser);

      ToastHandler.updateToast("done", `the user ${user.firstName} ${user.lastName} has been successfully updated!`, toastId);

      this.usersList.edit(user, updatedUser);
    };

    let cancelEditListner = (e) => {
      e.preventDefault();
      this.formHandler.validateForm('edit', true)
      this.disableForm();
      this.toggleForm()
    };

    updateBtn.onclick = confirmEditListner;
    cancelEditBtn.onclick = cancelEditListner
  }
}

App.init();

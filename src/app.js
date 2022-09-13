import Fetch from "./components/Fetch.js";
import UsersList from "./components/UsersList.js";
import FormHandler from "./components/FormHandler.js";
import ToastHandler from "./components/ToastHandler.js";
import DomHooks from "./components/DomHooks.js";

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



  static async add(newUser) {
    const hooks = DomHooks.generalHooks();

    let toastId = ToastHandler.updateToast("loading",`we are adding ${newUser.firstName} ${newUser.lastName} please hold!`);
    await this.fetch.callFetch("POST", "", newUser);
    this.formHandler.disableForm(hooks.addInputs);
    const newUsersList = await this.fetch.callFetch("GET", "");
    this.usersList.render(newUsersList);
    ToastHandler.updateToast("done",`the user ${newUser.firstName} ${newUser.lastName} has been added successfully!`,toastId);
  }

  static async delete(user) {
    const hooks = DomHooks.generalHooks();

    hooks.deleteMsgHook.innerText = `Are you sure you want to delete this user: ${user.firstName} ${user.lastName}?`;

    const toggleModule = () => {
      hooks.moduleBg.classList.toggle("hidden");
      hooks.deleteModule.classList.toggle("hidden");
    };

    this.formHandler.toggleForm(true);
    this.formHandler.disableForm(hooks.editInputs);
    toggleModule();

    let confirmHandler = () => {
      return new Promise((resolve) => {
        let clickHandler = (e) => {
          if (e.target.id == "confirm") resolve(true);
          else if (e.target.id == "cancel") resolve(false);
        };
        hooks.deleteOptions.onclick = clickHandler;
        hooks.moduleBg.onclick = () => resolve(false);
      });
    };
    let result = await confirmHandler();
    toggleModule();

    if (result) {
      let toastId = ToastHandler.updateToast("loading","sending delete request");
      await this.fetch.callFetch("delete", user.id);
      this.usersList.delete(user);
      ToastHandler.updateToast("done",`the user "${user.firstName} ${user.lastName}" has been deleted successfully!`,toastId);
    }
  }

  static edit(user) {
    this.formHandler.edit(user);
    const hooks = DomHooks.generalHooks();

    this.formHandler.toggleForm();

    let confirmEditHandler = async (e) => {
      e.preventDefault();
      let status = this.formHandler.validateForm("edit");

      if (status == false) {
        ToastHandler.updateToast("invalid","make sure to complete all the required fields!");
        return;
      }

      let updatedUser = this.formHandler.generateUser("edit", user.id);
      this.formHandler.disableForm(hooks.editInputs);
      this.formHandler.toggleForm();

      let toastId = ToastHandler.updateToast("loading",`we are updating the user ${user.firstName} ${user.lastName}, please hold!`);
      await this.fetch.callFetch("PUT", user.id, updatedUser);
      ToastHandler.updateToast("done",`the user ${user.firstName} ${user.lastName} has been successfully updated!`,toastId);
      this.usersList.edit(user, updatedUser);
    };

    let cancelEditHandler = (e) => {
      e.preventDefault();
      this.formHandler.validateForm("edit", true);
      this.formHandler.disableForm(hooks.editInputs);
      this.formHandler.toggleForm();
    };

    hooks.updateBtn.onclick = confirmEditHandler;
    hooks.cancelEditBtn.onclick = cancelEditHandler;
  }
}

App.init();
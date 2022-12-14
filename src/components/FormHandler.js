import User from "./User.js";
import DomHooks from "./DomHooks.js";
import App from "../app.js";
import ToastHandler from "./ToastHandler.js";

export default class FormHandler {
  disableForm = (inputs) => {
    inputs.forEach((input) => {
      if (input.type !== "radio" && input.type !== "checkbox") {
        input.value = "";
      } else {input.checked = false;}
    });
  };

  toggleForm = (checkIfclosed) => {
    const hooks = DomHooks.generalHooks();

    if (checkIfclosed && hooks.updateBtn.disabled == true) {return;}

    hooks.editBtns.forEach((btn) => {btn.toggleAttribute("disabled");});
    hooks.editInputs.forEach((input) => (input.disabled = !input.disabled));
    hooks.editForm.classList.toggle("tablet-hidden");
    hooks.addForm.classList.toggle("tablet-hidden");
    hooks.activityOptions.classList.toggle("disabled");
    hooks.updateBtn.disabled = hooks.updateBtn.toggleAttribute("disabled");
    hooks.cancelEditBtn.disabled = hooks.cancelEditBtn.toggleAttribute("disabled");
  };

  generateUser(action, userId) {
    const hooks = DomHooks.formHooks(action);
    let sportsList = [];
    hooks.sportsHook.forEach((option) => {
      if (option.checked == true) sportsList.push(option.name);
    });
    return new User(
      hooks.fNameHook.value,
      hooks.lNameHook.value,
      hooks.addressHook.value,
      hooks.zipHook.value,
      hooks.cityHook.value,
      hooks.countryHook.value,
      sportsList,
      hooks.genderHook.value,
      hooks.ageHook.value,
      hooks.activityHook.dataset.title,
      userId
    );
  }

  validateForm(action, cancel) {
    const hooks = DomHooks.formHooks(action);
    let status = true;

    let errHooks = document.querySelectorAll(".errHook");
    errHooks.forEach((hook) => (hook.innerHTML = ""));
    let errMsg = "this field is required!";

    for (let hook in hooks) {
      if ("value" in hooks[hook] && hooks[hook].value == "") {
        let parent = hooks[hook].parentElement;
        let errHook = parent.querySelector(".errHook");
        status = false;

        errHook.innerText = errMsg;
      }
    }

    let sports = Array.from(hooks.sportsHook);

    if (sports.every((hook) => hook.checked == false)) {
      status = false;
      let parent = sports[0].parentElement;
      let errHook = parent.querySelector(".errHook");
      errHook.innerText = errMsg;
    }

    if(cancel) {
        errHooks.forEach((hook) => (hook.innerHTML = ""));
      }

    return status;
  }

  initAdd() {
    let saveBtn = document.getElementById("save");
    saveBtn.disabled = false;

    const addListner = async (e) => {
      e.preventDefault();
      let status = this.validateForm("add");
      if (status == false) {
        ToastHandler.updateToast(
          "invalid",
          "make sure to complete all the required fields!"
        );
        return;
      }
      let tempId = Math.random();
      const newUser = this.generateUser("add", tempId);
      App.add(newUser);
    };

    saveBtn.onclick = addListner;
  }

  edit(user) {
    const hooks = DomHooks.formHooks("edit");
    hooks.sportsHook.forEach((hook) => (hook.checked = false));

    hooks.fNameHook.value = user.firstName;
    hooks.lNameHook.value = user.lastName;
    hooks.addressHook.value = user.address.streetAndNumber;
    hooks.zipHook.value = user.address.postalCode;
    hooks.cityHook.value = user.address.city;
    hooks.countryHook.value = user.address.country;
    hooks.genderHook.value = user.gender;
    hooks.ageHook.value = user.age;

    document.querySelector(`#edit-${user.activity_class}`).checked = true;

    user.sports.forEach((sport) => {
      let sportHook = document.querySelector(`#edit-${sport}`);
      sportHook.checked = true;
    });
  }
}

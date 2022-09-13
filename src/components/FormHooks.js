export default class FormHooks {
  constructor(action) {
    this.fNameHook = document.getElementById(`${action}-first-name`);
    this.lNameHook = document.getElementById(`${action}-last-name`);
    this.addressHook = document.getElementById(`${action}-address`);
    this.zipHook = document.getElementById(`${action}-zip`);
    this.cityHook = document.getElementById(`${action}-city`);
    this.countryHook = document.getElementById(`${action}-country`);
    this.genderHook = document.getElementById(`${action}-gender`);
    this.ageHook = document.getElementById(`${action}-age`);
    this.activityHook = document.querySelector(`input[name="${action}-activity"]:checked`);
    this.sportsHook = document.querySelectorAll(`.${action}-sports-option`);
  }
}

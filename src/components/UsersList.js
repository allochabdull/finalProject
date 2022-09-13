import UserEl from "./UserEl.js";

export default class UsersList {
  render(usersList) {
    this.usersList = usersList;
    this.renderHook = document.querySelector("aside");
    this.renderHook.innerHTML = "";

    for (const user of this.usersList) {
      const userEl = new UserEl().render(user);
      this.renderHook.appendChild(userEl);
    }
  }

  delete(user) {
    const userEl = document.getElementById(user.id);
    this.usersList  = this.usersList.filter((el) => el.id !== user.id);
    userEl.remove();
  }

  edit(user, updatedUser) {
    this.usersList = this.usersList.map((item) => {
      if (item.id == user.id) {
        return updatedUser;
      } else return item;
    });
    const userEl = document.getElementById(user.id);

    userEl.querySelector(
      ".user-name"
    ).innerText = `${updatedUser.firstName} ${updatedUser.lastName}`;
    userEl.querySelector(
      ".user-mail"
    ).innerText = `${updatedUser.firstName}.${updatedUser.lastName}@gmail.com`;
  }
}

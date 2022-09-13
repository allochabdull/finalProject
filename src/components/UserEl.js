import App from "../app.js";

export default class UserEl {
  render(user) {
    const template = document.getElementById("user-template");
    const userContent = template.content.cloneNode(true);
    const userEl = document.createElement("div");
    const userIcon = userContent.querySelector('.user-icon')

    let rgb = []

    for (let i = 0; i <3; i++) {
        let val = Math.floor(Math.random() * (255 - 100 + 1) + 100)
        rgb.push(val)
    }

    rgb[Math.floor(Math.random() * (2 - 0 + 1) + 0)] = 255

    userIcon.style.background = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`

    userEl.className = "user-card";
    userEl.id = user.id;
    userEl.appendChild(userContent);

    const deleteBtn = userEl.querySelector(".delete-btn");
    const editBtn = userEl.querySelector(".edit-btn");

    deleteBtn.addEventListener("click", () => {
      App.delete(user);
    });

    editBtn.addEventListener("click", () => {
      App.edit(user);
    });

    userEl.querySelector(".user-icon").innerText = user.firstName.charAt(0);

    userEl.querySelector(
      ".user-name"
    ).innerText = `${user.firstName} ${user.lastName}`;
    userEl.querySelector(".user-id").innerText =
      "ID: " + Math.floor(Math.random() * (9999999 - 1000000) + 1000000);
    userEl.querySelector(
      ".user-mail"
    ).innerText = `${user.firstName}.${user.lastName}@gmail.com`;

    return userEl;
  }
}

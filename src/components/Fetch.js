export default class Fetch {
  async callFetch(method, id, addedBody) {
    let methods = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: method,
      mode: "cors",
      cache: "no-cache",
    };

    let postMethods = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: method,
      mode: "cors",
      cache: "no-cache",
      body: JSON.stringify(addedBody),
    };

    let response = await fetch(
      `http://localhost:3000/users/${id ? id : ""}`,
      addedBody ? postMethods : methods
    );

    if (method == "GET") {
      let data = await response.json();
      return data;
    }
  }
}

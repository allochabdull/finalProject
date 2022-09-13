export default class ToastHandler {
    static updateToast(status, msg, id) {
      let toastContainer = document.querySelector(".toast-msg-container");
  
      let toastEl = document.createElement("div");
      let toastId = id ? id : Math.random();
  
      toastEl.id = toastId;
      toastEl.classList.add("toastMsg", "enter");
  
      const handleFade = (toast) => {
        toast.classList.add("fade");
  
        let fadeTimeout = setTimeout(() => {
          toast.remove();
        }, 4000);
  
        toast.onmouseenter = () => {
          toast.classList.remove("fade");
          clearTimeout(fadeTimeout);
        };
  
        toast.onmouseout = () => {
          toast.classList.add("fade");
          fadeTimeout = setTimeout(() => {
            toast.remove();
          }, 4000);
        };
      };
  
      if (status == "done") {
        let toast = document.getElementById(id);
        toast.style.background = "green";
        toast.innerText = msg;
  
        handleFade(toast);
      } else if (status == "loading") {
        toastEl.innerText = msg;
        toastEl.classList.add("loading");
        toastContainer.appendChild(toastEl);
  
        setTimeout(() => {
          toastEl.classList.remove("enter");
        }, 400);
      } else if (status == "invalid") {
        toastEl.innerText = msg;
        toastEl.classList.add("errToast");
        setTimeout(() => {
          handleFade(toastEl);
          toastEl.classList.remove("enter");
        }, 400);
        toastContainer.appendChild(toastEl);
      }
  
      return toastId;
    }
  }
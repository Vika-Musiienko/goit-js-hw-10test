import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

document.querySelector(".form").addEventListener("submit", (event) => {
  event.preventDefault();
  
  const delay = parseInt(document.querySelector('input[name="delay"]').value);
  const state = document.querySelector('input[name="state"]:checked').value;

  createPromise(delay, state)
    .then((delay) => {
 iziToast.success({
        title: "Success",
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: "Error",
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});
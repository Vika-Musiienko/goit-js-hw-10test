import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
      });
      document.getElementById("start-btn").disabled = true;
    } else {
      document.getElementById("start-btn").disabled = false;
    }
  },
};
const datetimePicker = flatpickr("#datetime-picker", options);
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}
function updateTimer(targetDate) {
  const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      clearInterval(timerInterval);
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";
      iziToast.success({
        title: "Success",
        message: "Countdown finished!",
      });
      document.getElementById("datetime-picker").disabled = false;
      document.getElementById("start-btn").disabled = true;
    } else {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("days").textContent = addLeadingZero(days);
      document.getElementById("hours").textContent = addLeadingZero(hours);
      document.getElementById("minutes").textContent = addLeadingZero(minutes);
      document.getElementById("seconds").textContent = addLeadingZero(seconds);
    }
  }, 1000);
}

document.getElementById("start-btn").addEventListener("click", () => {
  const targetDate = datetimePicker.selectedDates[0].getTime();
  updateTimer(targetDate);
  document.getElementById("datetime-picker").disabled = true;
  document.getElementById("start-btn").disabled = true;
});
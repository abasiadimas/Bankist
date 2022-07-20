"use strict";

// Removing the scroll bars
document.body.style.overflow = "hidden";

///////////////////////////////////////
// 1. Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  // Prevents the default button reaction to # href
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Opens the Modal window with every button
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// 2. Cookies message
const header = document.querySelector(".header");

const cookiesMessage = document.createElement("div");
cookiesMessage.classList.add("cookie-message");
cookiesMessage.innerHTML =
  "We use cookies for improved functionality and analytics. <button class='btn btn--close--cookies'>Got it!</button>";

header.append(cookiesMessage);

// Removing cookies message
document
  .querySelector(".btn--close--cookies")
  .addEventListener("click", function () {
    cookiesMessage.remove();
  });

// Styling the message
cookiesMessage.style.backgroundColor = "#37383d";
cookiesMessage.style.width = "120%";
cookiesMessage.style.height =
  // We parsing the number of the computed style and then adding 30 px to it!!
  Number.parseFloat(getComputedStyle(cookiesMessage).height, 10) + 30 + "px";

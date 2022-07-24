"use strict";

// Removing the scroll bars
document.body.style.overflowX = "hidden";

// Query Selectors

// 1.
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
// 2.
const header = document.querySelector(".header");
// 3.
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.getElementById("section--1");

///////////////////////////////////////
// 1. Modal window

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

// 3. Learn more button Smooth Scrolling

// Taking the coordinates from the section we want to scroll to and adding the event listener to the button
btnScrollTo.addEventListener("click", function (e) {
  const s1Coords = section1.getBoundingClientRect();

  // Scrolling to section 1 (new modern way)
  section1.scrollIntoView({ behavior: "smooth" });
});

// 4. Navigation Smooth Scrolling with Event Delegation

// i. Add event listener to common parent element (the navbar element)
document.querySelector(".nav__links").addEventListener("click", function (e) {
  // Preventing the default scrolling
  e.preventDefault();

  // ii. Determine what element originated the event (Check if our click matches to a nav link)
  if (e.target.classList.contains("nav__link")) {
    // We are extracting the section info for each navigation link
    const sectionID = e.target.getAttribute("href");
    // Setting the smooth scrolling based on each section ID
    document.querySelector(sectionID).scrollIntoView({ behavior: "smooth" });
  }
});

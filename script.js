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
// 5.
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
// 6.
const navbar = document.querySelector(".nav");

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

// 5. Tab Component

tabsContainer.addEventListener("click", function (e) {
  /* Selecting always the closest class to the button witch is the "operations__tab" no matter
  if we click to the actual button or to the span section */
  const btnClicked = e.target.closest(".operations__tab");

  // Ignoring the clicks outside of the button area (Guard clause)
  if (!btnClicked) return;

  /* If the clik exist then first we are clearing the active classes "tab--active" and "content--active" from all the tabs and then we attaching them to the one we want to be active (vissible tab content) */

  // Removing the active classes
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );

  // Activating the content area by setting back the active classes
  btnClicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${btnClicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// 6. Menu Face Animation

const mouseHover = function (e) {
  // Find if our mouse is hovering over a nav link
  if (e.target.classList.contains("nav__link")) {
    // We are finding the nav links, their siblings and the logo
    const navLink = e.target;
    const navLinkSiblings = navLink
      .closest(".nav")
      .querySelectorAll(".nav__link");
    const navLogo = navLink.closest(".nav").querySelector("img");

    // We are setting the opacity of the other elements to 0.5 in order to be faded out
    navLinkSiblings.forEach((el) => {
      if (el !== navLink) {
        el.style.opacity = this;
        navLogo.style.opacity = this;
      }
    });
  }
};

navbar.addEventListener("mouseover", mouseHover.bind(0.5));

navbar.addEventListener("mouseout", mouseHover.bind(1));

// 7. Sticky Navigation Bar

const stickyNav = function (entries) {
  // Deconstructing where the entries are just the array (if we have any) of the threshold
  const [entry] = entries;
  // or const entry = entries[0];

  // IntersectionObserverEntry object
  console.log(entry);

  // Adding the sticky class only when we are not intersect with the desired section (see only the desired section and not the header anymore)
  // The "isIntersecting" property we can find it at the IntersectionObserverEntry object
  if (!entry.isIntersecting) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
};

// Findinh the height of the navbar
const navHeight = navbar.getBoundingClientRect();

const obserevOptions = {
  // Null means the entire viewport of our screen
  root: null,
  /* The percentage of the section we want to interesect with
  Null means after the entire section has gone out of our viewport */
  threshold: 0,
  // The position we want to see the effect as a visual margin (The height of the navbar is 90px)
  rootMargin: `-${navHeight.height}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, obserevOptions);
headerObserver.observe(header);

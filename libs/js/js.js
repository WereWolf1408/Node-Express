
const radius = 220; // Adjust this value to control the radius of the circle

const menu = document.querySelector(".menu");
const circleMenuPlace = document.querySelector(".circle-menu-place");
const videos = document.querySelectorAll(".myVideo");
const getAllUsersBth = document.querySelector(".button-1");
const getUserByIdBth = document.querySelector(".button-4");
const clearAllBth = document.querySelector(".button-5");
const updateUserBth = document.querySelector(".button-3");
const addNewUserBth = document.querySelector(".button-2");
const addEmptyInputsBth = document.querySelector(".button-6");
const showMenuBth = document.querySelector(".show-menu-button");
const listContainer = document.querySelector(".results");
const messageInput = document.querySelector(".message");
const picsItemMenu = document.getElementById("sub-menu-pics");
const subMenu = document.querySelector(".sub-menu");
const logOut = document.getElementById('logout');
const videoMenuBth = document.getElementById('Videos');


videoMenuBth?.addEventListener('click', () => {
  window.location.href = "http://localhost:3000/media"
})


// Add click event listeners to menu items
circleMenuPlace?.addEventListener("click", ({ target }) => {
  console.log(target);
});

picsItemMenu?.addEventListener("click", () => {
  console.log(`111`);
  placeInACircle(menuItemsData.pics, radius, circleMenuPlace);
});

// playVideosInSequence(videos);

const openAppropriateMenu = (menuId) => {
  switch (menuId) {
    case "1":
      console.log(`case 1`);
      getNode("place-1").classList.add("active");
      break;

    default:
      getNode("active").classList.remove("active");
      break;
  }
};

showMenuBth?.addEventListener("click", ({ target }) => {
  console.log(target);
  if (target && target.classList.contains("show-menu-button-text")) {
    subMenu?.classList.contains("show")
      ? subMenu?.classList.remove("show")
      : subMenu?.classList.add("show");
    
      circleMenuPlace.innerHTML = "";
  }
});








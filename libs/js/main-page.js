const radius = 220;
const menuItemBth = document.querySelectorAll(".menu-item");
const circleMenu = document.querySelector(".circle-menu");

const placeInACircle = (items, radius) => {
  const totalItems = items.length;
  const angle = (Math.PI * 2) / totalItems;
  items.forEach((item, index) => {
    const x = Math.cos(angle * index) * radius;
    const y = Math.sin(angle * index) * radius;
    item.style.transform = `translate(${x}px, ${y}px)`;
  });
};

placeInACircle(menuItemBth, radius);

const pageSwitcher = (path) => {
  switch (path) {
    case "user-page":
      console.log(`must be redirected to user page`);
      window.location.href = "http://localhost:3000/users";
      break;
    case "file-upload":
      window.location.href = "http://localhost:3000/file_upload";
      break;
    default:
      break;
  }
};

circleMenu.addEventListener("click", ({ target }) => {
  console.log(target);
  const path = target.dataset.path;
  pageSwitcher(path);
  console.log(path);
});

const radius = 220;
const menuItemBth = document.querySelectorAll('.menu-item');

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
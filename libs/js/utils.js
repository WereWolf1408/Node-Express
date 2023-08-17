const crateTable = () => {};

// const placeInACircle = (items, radius) => {
//   const totalItems = items.length;
//   const angle = (Math.PI * 2) / totalItems;
//   items.forEach((item, index) => {
//     const x = Math.cos(angle * index) * radius;
//     const y = Math.sin(angle * index) * radius;
//     item.style.transform = `translate(${x}px, ${y}px)`;
//   });
// };

const _crateNode = (nodeName, options) => {
  const node = document.createElement(nodeName);
  options?.classes?.forEach((item) => {
    node.classList.add(item);
  });

  options?.props?.forEach(({key, value}) => {
    node.setAttribute(`data-${key}`, value);
  });

  return node;
};

const placeInACircle = (items, radius, container) => {
  const totalItems = items.length;
  const angle = (Math.PI * 2) / totalItems;

  const menu = _crateNode("div", {
    classes: ["menu"],
  });
  const menuSurface = _crateNode(`div`, {classes: ["menu-surface"]});
  menu.appendChild(menuSurface);

  items.forEach((item, index) => {
    const menuItem = _crateNode('div', {classes: ["menu-item"]});
    const fas = _crateNode('li');
    menuItem.appendChild(fas);
    fas.className = "fas";
    const image = _crateNode('img');
    fas.appendChild(image);
    image.className = "image";
    image.dataset.id = index;
    image.src = item;

    const x = Math.cos(angle * index) * radius;
    const y = Math.sin(angle * index) * radius;
    menuItem.style.transform = `translate(${x}px, ${y}px)`;
    menu.appendChild(menuItem);
  });

  

  container.innerHTML = '';
  container.appendChild(menu);
};

function playVideosInSequence(videos) {
  let currentVideoIndex = 0;

  function playNextVideo() {
    const video = videos[currentVideoIndex];
    video.play();
    video.addEventListener("ended", () => {
      video.pause();
      currentVideoIndex++;
      if (currentVideoIndex === videos.length) {
        currentVideoIndex = 0;
      }
      playNextVideo();
    });
  }
  playNextVideo();
}

const getNode = (selector) => document.querySelector(`.${selector}`);

function createListWithInputs(data) {
  const list = document.createElement("ul");

  data.forEach((obj) => {
    const listItem = document.createElement("li");
    const inputs = [];

    for (const key in obj) {
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("value", obj[key]);
      input.className = 'input-field';
      inputs.push(input);
    }

    inputs.forEach((input, index) => {
      if (index === 0) {
        input.setAttribute("readonly", "true");
      }
      listItem.appendChild(input);
    });

    list.appendChild(listItem);
  });

  return list;
}

function createEmptyInputs() {
  const list = document.createElement("ul");

  const listItem = document.createElement("li");
  const inputs = [];
  const obj = {
    login: "login",
    password: "password",
    age: "age",
  };

  for (const key in obj) {
    const input = document.createElement("input");
    input.setAttribute("placeholder", obj[key]);
    input.className = 'input-field';
    inputs.push(input);
  }

  inputs.forEach((input) => {
    listItem.appendChild(input);
  });

  list.appendChild(listItem);

  return list;
}

const createUserObject = () => {
  const inputs = document.querySelectorAll(".results li input");
  const user = {
    id: null,
    login: null,
    password: null,
    age: null,
  };
  let i = 0;
  for (const [key, value] of Object.entries(user)) {
    console.log(`${key}: ${value}`);
    user[key] = inputs[i].value;
    i++;
  }
  return user;
};
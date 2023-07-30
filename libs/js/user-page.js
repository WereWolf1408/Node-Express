const menu = document.querySelector(".menu");
const getAllUsersBth = document.querySelector(".button-1");
const getUserByIdBth = document.querySelector(".button-4");
const clearAllBth = document.querySelector(".button-5");
const updateUserBth = document.querySelector(".button-3");
const addNewUserBth = document.querySelector(".button-2");
const addEmptyInputsBth = document.querySelector(".button-6");
const deleteUserBth = document.querySelector(".button-7");
const listContainer = document.querySelector(".results");
const messageInput = document.querySelector(".message");
const logOut = document.getElementById("logout");

deleteUserBth?.addEventListener("click", async () => {
  const userId = document.getElementById("search").value;
  if (userId.trim().length > 0) {
    console.log(userId);
    const response = await deleteUserService({
      url: urls.deleteUser,
      data: {
        userId,
      },
    });
    updateResultsMiddleWare(response);
  }
});

logOut?.addEventListener("click", async () => {
  console.log(`logout click`);
  let result = await logout({
    url: urls.logout,
    options: {},
  });
  if (result) {
    window.location.href = "http://localhost:3000/login";
  } else {
    console.error(`logout failed: ${result}`);
  }
});

getAllUsersBth?.addEventListener("click", async () => {
  const response = await getAllUsersService({
    url: urls.allUsersURL,
    options: {},
  });
  updateResultsMiddleWare(response);
});

clearAllBth?.addEventListener("click", () => {
  listContainer.innerHTML = "";
  messageInput.innerHTML = "";
});

getUserByIdBth?.addEventListener("click", async () => {
  const id = document.querySelector("#search")?.value;
  if (id.trim().length > 0) {
    const response = await getUserByIdService({
      url: urls.userByIdURL,
      data: {
        id,
      },
    });
    updateResultsMiddleWare(response);
  }
});

updateUserBth?.addEventListener("click", async () => {
  const id = document.querySelector(".results input")?.value;
  if (id && id.trim().length > 0) {
    const modifiedUser = createUserObject();
    const response = await updateUserService({
      url: urls.updateUserByIdURL,
      data: {
        ...modifiedUser,
      },
    });
    updateResultsMiddleWare(response);
  }
});

addNewUserBth?.addEventListener("click", async () => {
  const newUser = createUserObject();
  console.log(newUser);
  const response = await addNewUserService({
    url: urls.addNewUserURL,
    data: {
      ...newUser,
    },
  });
  updateResultsMiddleWare(response);
});

addEmptyInputsBth?.addEventListener("click", () => {
  addEmptyInput();
});

const updateResultsMiddleWare = ({ state, message, data }) => {
  if (state === 400) {
    messageInput.innerHTML = "";
    messageInput.innerHTML = message;
    return;
  }
  messageInput.innerHTML = "";
  messageInput.innerHTML = message;
  if (data) {
    updateResultWidow(data);
  }
};

const updateResultWidow = (data) => {
  const generatedList = createListWithInputs(data);
  listContainer.appendChild(generatedList);
};

const addEmptyInput = () => {
  const generatedList = createEmptyInputs();
  listContainer.appendChild(generatedList);
};

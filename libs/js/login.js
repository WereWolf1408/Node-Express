const loginBth = document.querySelector(".login-bth");
const userNameInp = document.getElementById("login");
const passwordInp = document.getElementById("pass");
const suggestionsList = document.getElementById("autosuggestion");


userNameInp?.addEventListener('focusout', () => {
  suggestionsList.style.display = 'none';
});

userNameInp?.addEventListener("input", async (event) => {
  const { value } = userNameInp;
  console.log(value);

  if (value.trim() === "") {
    suggestionsList.innerHTML = "";
    return;
  }
  
  const { suggestionData } = await autosuggestion({
    url: urls.autosuggestion,
    data: {
      username: value,
      limit: 5,
    },
  });

  console.log(suggestionData);

  suggestionsList.innerHTML = "";

  // Create new suggestion list items
  suggestionData.forEach((suggestion) => {
    const li = document.createElement("li");
    li.textContent = suggestion;
    suggestionsList.appendChild(li);
  });

  suggestionsList.style.display = suggestionData.length > 0 ? "block" : "none";
});

loginBth?.addEventListener("click", async () => {
  const username = userNameInp.value;
  const password = passwordInp.value;

  console.log(`login =  ${username}, password = ${password}`);

  if (username.trim().length > 0 && password.trim().length > 0) {
    const { accessToken, message } = await loginService({
      url: urls.login,
      data: {
        username: username,
        password: password,
      },
    });

    if (accessToken) {
      window.location.href = "http://localhost:3000/users";
    } else {
      console.log(message);
    }
  }
});

window.addEventListener('click', () => {
  suggestionsList.style.display = 'none';
});

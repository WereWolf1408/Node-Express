const postFetchConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const getFetch = async ({ url, options }) => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getAllUsersService = async ({ url, options }) =>
  getFetch({ url, options });
const getUserByIdService = async ({ url, data }) => {
  console.log(JSON.stringify(data));
  const options = Object.assign(postFetchConfig, {
    body: JSON.stringify(data),
  });
  return getFetch({ url, options });
};

const updateUserService = async ({ url, data }) => {
  console.log(JSON.stringify(data));
  const options = Object.assign(postFetchConfig, {
    body: JSON.stringify(data),
  });
  return getFetch({ url, options });
};

const addNewUserService = async ({ url, data }) => {
  const options = Object.assign(postFetchConfig, {
    body: JSON.stringify(data),
  });
  return getFetch({ url, options });
};

const logout = async ({ url }) => {
  return getFetch({url, options: {}});
};

const getAllVideos = async ({ url }) => {
  return getFetch({url, options: {}});
};

const loginService = async ({ url, data }) => {
  const options = Object.assign(postFetchConfig, {
    body: JSON.stringify(data),
  });
  return getFetch({ url, options });
}

const deleteUserService = async ({ url, data }) => {
  const options = Object.assign(postFetchConfig, {
    body: JSON.stringify(data),
  });
  return getFetch({ url, options });
}

const autosuggestion = async ({ url, data }) => {
  const options = Object.assign(postFetchConfig, {
    body: JSON.stringify(data),
  });
  return getFetch({ url, options });
}

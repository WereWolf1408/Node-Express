const uploadInput = document.querySelector('input[type="file"]');
const form = document.getElementById("myForm");
const actionButton = document.getElementById("action-button");
const image = document.getElementById("image");
const fileActions = document.querySelector("#file-actions");
const uploadPreviewSection = document.getElementById("upload-preview-section");
const removeSelectedBth = document.querySelector(".remove-selected");

const formData = new FormData();
let selectedImages = [];

const getSelectedImagesIndex = () => {
  const removeImage = Array.from(document.querySelectorAll(".preview-images-list li.selected img"));
  return removeImage.map((img) => Number(img.dataset.index));
}

function generateImageList(images) {
  const removeChild = document.querySelector(".image-list");
  if (removeChild) {
    uploadPreviewSection.innerHTML = "";
  }

  const ul = document.createElement("ul");
  ul.className = "image-list";

  images.forEach((imageUrl) => {
    const li = document.createElement("li");
    const section = document.createElement("section");
    const img = document.createElement("img");
    const selectItemImg = document.createElement("img");

    section.className = "quick-action-panel";
    selectItemImg.className = "select-tem";
    selectItemImg.src = "/icons/select.png";

    img.src = imageUrl;
    img.alt = "Image";
    img.setAttribute("loading", "lazy");

    section.appendChild(selectItemImg);
    li.appendChild(img);
    ul.appendChild(li);
  });

  uploadPreviewSection.innerHTML = "";
  uploadPreviewSection.appendChild(ul);
}

/** result may include file or folder so this function crate preview depend on response */
function createResponsePreview (images) {
  const removeChild = document.querySelector(".image-list");
  if (removeChild) {
    uploadPreviewSection.innerHTML = "";
  }

  const ul = document.createElement("ul");
  ul.className = "image-list";

  images.forEach((imgObj) => {
    console.log(imgObj);   
  });

}

const imagePreview = (images) => {
  uploadPreviewSection.innerHTML = "";

  const ul = document.createElement("ul");
  ul.className = "preview-images-list";

  for (let i = 0; i < images.length; i++) {
    const li = document.createElement("li");
    const img = document.createElement("img");

    img.src = URL.createObjectURL(images[i]);
    img.dataset.index = i;
    li.appendChild(img);
    ul.appendChild(li);
  }

  uploadPreviewSection.appendChild(ul);
};

const defineCurrentAction = () => {
  var value = fileActions.value;
  return fileActions.options[fileActions.selectedIndex].value;
};

const removeSelectedImages = (removeImageIndexes) => {
  selectedImages = selectedImages.filter(
    (_, index) => !removeImageIndexes.includes(index)
  );
  imagePreview(selectedImages);
};

const updateFormData = () => {
  formData.delete("filetoupload");

  for (let i = 0; i < selectedImages.length; i++) {
    formData.append("filetoupload", selectedImages[i]);
  }
};

actionButton?.addEventListener("click", () => {
  const action = defineCurrentAction();
  console.log(action);
  switch (action) {
    case "get-all-images":
      getAllImages();
      break;
    case "delete-selected":
      deleteSelectedFiles();
      break;
    case 'get-folder-structure':
      getFolderStructure();
      break;  

    default:
      break;
  }
});

const getAllImages = () => {
  fetch("http://localhost:3000/get_all_uploaded_file", {
    method: "get",
  }).then(async (response) => {
    const res = await response.json();
    console.log(response);
    if (res.files) {
      console.log(res.files);
      generateImageList(res.files);
    } else {
      console.warn(res.message);
    }
  });
};

const deleteSelectedFiles = () => {
  fetch("http://localhost:3000/delete_selected_files", {
    method: "post",
  }).then(async (response) => {
    const res = await response.json();
    console.log(response);
  });
};

const getFolderStructure = async () => {
  fetch("http://localhost:3000/get_folder_structure", {
    method: "get",
  }).then(async (response) => {
    const res = await response.json();
    console.log(res);
    createResponsePreview(res.files)
  });
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  fetch("http://localhost:3000/file_upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log(response);
      return response.text();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

uploadInput?.addEventListener("change", ({ target }) => {
  formData.delete("filetoupload");
  selectedImages = [];

  const files = target.files;
  for (let i = 0; i < files.length; i++) {
    formData.append("filetoupload", files[i]);
    selectedImages.push(files[i]);
  }

  imagePreview(selectedImages);
});

uploadPreviewSection.addEventListener("click", ({ target }) => {
  if (target.tagName === "IMG") {
    const parent = target.parentNode;
    parent.classList.toggle("selected");
  }
});

removeSelectedBth.addEventListener("click", (e) => {
  e.preventDefault();

  const indexes = getSelectedImagesIndex();

  if (indexes.length > 0) {
    removeSelectedImages(indexes);
    updateFormData();
  }
});

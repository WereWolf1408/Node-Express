const uploadInput = document.querySelector('input[type="file"]');
const form = document.getElementById("myForm");
const getImageBth = document.getElementById('getAll');
const image = document.getElementById('image');

const formData = new FormData();


getImageBth?.addEventListener('click', () => {
  fetch("http://localhost:3000/getfiles", {
    method: "get",
  }).then(async (response) => {
    const result = await response.json();
    console.log(result);
    image.src = result[0].filename;
  })
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(formData);


  fetch("http://localhost:3000/fileupload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      // Handle the response data
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch request
      console.error("Error:", error);
    });
});

uploadInput?.addEventListener("change", ({target}) => {
  console.log(`change event`);
  const files = target.files;

  console.log(files);

  for (let i = 0; i < files.length; i++) {
    formData.append('manga_image', files[i]);
  }

  console.log(formData.getAll('manga_image'));

});

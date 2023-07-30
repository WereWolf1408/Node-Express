const container = document.querySelector('.main-place');


const createListOfVideos = (videos) => {
  const ul = document.createElement('ul');
  for (let i = 0; i < videos.length; i++) {
    const li = document.createElement('li');
    const video = document.createElement('video');
    video.classList.add('my-video');
    video.src = `videos/${videos[i]}`;
    li.appendChild(video);
    ul.appendChild(li);
  }
  container.appendChild(ul);
}

const loadVideos = async () => {
  const response = await getAllVideos({
    url: urls.getAllVideosURL
  });

  if (response.videos.length > 0) {
    createListOfVideos(response.videos);
  }
};

loadVideos();
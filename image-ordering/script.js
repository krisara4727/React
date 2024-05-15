const imageInput = document.getElementById("imageInput");
const photoContainer = document.getElementById("photoContainer");

const renderPhoto = (imageUrl) => {
  //   const photo = document.createElement("div");
  //   photo.className = "photo";
  //   photo.draggable = true;
  //   photo.style.backgroundImage = `url(${imageUrl})`;
  const img = document.createElement("img");
  img.src = imageUrl;
  //   photo.id = imageUrl;
  img.id = imageUrl;
  img.className = "photo";

  //   photo.appendChild(img);
  img.addEventListener("dragstart", handleDragStart);
  img.addEventListener("dragover", handleDragOver);
  img.addEventListener("drop", handleDrop);
  photoContainer.appendChild(img);
};

function handleDragStart(e) {
  console.log("drag state e", e);
  e.dataTransfer.setData("text/plain", e.target.id);
}
function handleDragOver(e) {
  e.preventDefault();
}
function handleDrop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text/plain");
  const droppedPhoto = document.getElementById(data);
  const targetPhoto = e.target;
  if (droppedPhoto && droppedPhoto !== targetPhoto) {
    photoContainer.insertBefore(droppedPhoto, targetPhoto);
  }
}

const handleImageInput = (e) => {
  const images = e.target.files;
  for (let i = 0; i < images.length; i++) {
    if (images[i].type.match("image.*")) {
      const reader = new FileReader();
      reader.readAsDataURL(images[i]);
      reader.onload = function (e) {
        const imageUrl = e.target.result;
        renderPhoto(imageUrl);
      };
    }
  }
};

imageInput.addEventListener("change", handleImageInput);

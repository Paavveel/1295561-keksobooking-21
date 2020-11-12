'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const Photo = {
  PHOTO_SIZE: 70,
  ALT: `Фотография жилья`
};

const previewAvatar = document.querySelector(`.ad-form-header__preview img`);
const previewPhoto = document.querySelector(`.ad-form__photo`);

function loadPreview(evt, preview) {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, function () {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
}

function loadAvatarHandler(evt) {
  loadPreview(evt, previewAvatar);
}

function loadPhotosHandler(evt) {
  const roomsImg = document.createElement(`img`);

  roomsImg.width = Photo.PHOTO_SIZE;
  roomsImg.height = Photo.PHOTO_SIZE;
  roomsImg.alt = Photo.ALT;

  previewPhoto.appendChild(roomsImg);

  loadPreview(evt, roomsImg);
}

function resetPreviews() {
  previewAvatar.src = `img/muffin-grey.svg`;
  previewPhoto.textContent = ``;
}

window.preview = {
  loadAvatarHandler,
  loadPhotosHandler,
  resetPreviews
};

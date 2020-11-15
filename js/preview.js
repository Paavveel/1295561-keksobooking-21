'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const Photo = {
  PHOTO_SIZE: 70,
  ALT: `Фотография жилья`
};

const previewAvatar = document.querySelector(`.ad-form-header__preview img`);
const previewPhoto = document.querySelector(`.ad-form__photo`);

const loadPreview = (evt, preview) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

const onAvatarLoad = (evt) => {
  loadPreview(evt, previewAvatar);
};

const onPhotosLoad = (evt) => {
  const roomsImg = document.createElement(`img`);

  roomsImg.width = Photo.PHOTO_SIZE;
  roomsImg.height = Photo.PHOTO_SIZE;
  roomsImg.alt = Photo.ALT;

  previewPhoto.appendChild(roomsImg);

  loadPreview(evt, roomsImg);
};

const resetPreviews = () => {
  previewAvatar.src = `img/muffin-grey.svg`;
  previewPhoto.textContent = ``;
};

window.preview = {
  onAvatarLoad,
  onPhotosLoad,
  resetPreviews
};

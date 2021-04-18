import images from "./gallery-items.js";

const refs = {
  galleryList: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  lightboxImg: document.querySelector(".lightbox__image"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
  lightboxCloseBtn: document.querySelector(
    'button[data-action="close-lightbox"]'
  ),
};

const imgLinksArray = [];

function createGalleryMarkup(items) {
  return items.map(({ preview, original, description }) => {
      imgLinksArray.push(original);
        return `
        <li class="gallery__item">
          <a
            class="gallery__link"
            href="${original}"
          >
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
        `;
    }).join('');
}

const galleryMarkup = createGalleryMarkup(images);
refs.galleryList.insertAdjacentHTML('beforeend', galleryMarkup);

refs.galleryList.addEventListener('click', onImageClick);
function onImageClick(e) {
  e.preventDefault();
  if (!e.target.classList.contains('gallery__image')) {
        return;
  }

  window.addEventListener('keydown', onEscClose);
  refs.lightboxImg.src = e.target.dataset.source;
  refs.lightboxImg.alt = e.target.alt;
  refs.lightbox.classList.add("is-open");
}

refs.lightbox.addEventListener('click', closeLightboxBtn);
function closeLightboxBtn() {
    if (!refs.lightboxCloseBtn || !refs.lightboxOverlay) {
        return;
    }
    
    window.removeEventListener('keydown', onEscClose);
    refs.lightboxImg.src = "";
    refs.lightboxImg.alt = "";

    refs.lightbox.classList.remove("is-open");
}

function onEscClose(e) {

    if (e.code === 'Escape') {
        closeLightboxBtn();
  }

   const linkNumberOfArray = imgLinksArray.indexOf(refs.lightboxImg.getAttribute('src'));

  if (e.code === 'ArrowRight' && (linkNumberOfArray + 1) < imgLinksArray.length) {
    refs.lightboxImg.setAttribute('src', imgLinksArray[linkNumberOfArray + 1]);
  };

  if (e.code === 'ArrowLeft' && linkNumberOfArray !== 0) {
  refs.lightboxImg.setAttribute('src', imgLinksArray[linkNumberOfArray - 1])
  };
}



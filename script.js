(function () {
  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  if (!gallery || !lightbox || !lightboxImg) return;

  const items = Array.from(gallery.querySelectorAll('.gallery-item img'));
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const img = items[index];
    if (!img || !img.src) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || 'Photo';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    openLightbox(currentIndex);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % items.length;
    openLightbox(currentIndex);
  }

  items.forEach((img, index) => {
    img.closest('.gallery-item').addEventListener('click', () => openLightbox(index));
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
  lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') === 'true') return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
})();

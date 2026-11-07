/* Shared navigation and image viewer; no external dependencies. */
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  navigation.classList.toggle('is-open', open);
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  navigation.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuButton.focus();
    }
  });
}

const lightbox = document.createElement('dialog');
lightbox.className = 'image-lightbox';
lightbox.setAttribute('aria-label', '作品画像の拡大表示');
lightbox.innerHTML = `
  <button type="button" class="lightbox-close" aria-label="拡大表示を閉じる">×</button>
  <button type="button" class="lightbox-mode" aria-pressed="false">幅に合わせて読む</button>
  <button type="button" class="lightbox-arrow lightbox-prev" aria-label="前の画像">‹</button>
  <div class="lightbox-viewport"><img alt=""></div>
  <button type="button" class="lightbox-arrow lightbox-next" aria-label="次の画像">›</button>
  <div class="lightbox-footer"><p></p><span class="lightbox-count" aria-live="polite"></span></div>`;
document.body.append(lightbox);

const image = lightbox.querySelector('img');
const viewport = lightbox.querySelector('.lightbox-viewport');
const caption = lightbox.querySelector('.lightbox-footer p');
const count = lightbox.querySelector('.lightbox-count');
const modeButton = lightbox.querySelector('.lightbox-mode');
let imageSet = [];
let activeIndex = 0;
let previousFocus;

function showImage(index) {
  if (!imageSet.length) return;
  activeIndex = (index + imageSet.length) % imageSet.length;
  image.src = imageSet[activeIndex].src;
  image.alt = imageSet[activeIndex].alt;
  caption.textContent = image.alt;
  count.textContent = `${activeIndex + 1} / ${imageSet.length}`;
  viewport.scrollTop = 0;
  lightbox.querySelectorAll('.lightbox-arrow').forEach(arrow => {
    arrow.hidden = imageSet.length < 2;
  });
}

function openImages(elements, clicked) {
  const controls = Array.from(elements);
  imageSet = controls.map(control => ({
    src: control.dataset.full,
    alt: control.querySelector('img').alt
  }));
  previousFocus = document.activeElement;
  lightbox.classList.remove('is-reading');
  modeButton.setAttribute('aria-pressed', 'false');
  modeButton.textContent = '幅に合わせて読む';
  showImage(controls.indexOf(clicked));
  lightbox.showModal();
  document.body.classList.add('has-lightbox');
  lightbox.querySelector('.lightbox-close').focus();
}

lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showImage(activeIndex - 1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => showImage(activeIndex + 1));
modeButton.addEventListener('click', () => {
  const reading = lightbox.classList.toggle('is-reading');
  modeButton.setAttribute('aria-pressed', String(reading));
  modeButton.textContent = reading ? '画像全体を表示' : '幅に合わせて読む';
  viewport.scrollTop = 0;
});
lightbox.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showImage(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
lightbox.addEventListener('click', event => {
  if (event.target !== lightbox) return;
  const rect = lightbox.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom) lightbox.close();
});
lightbox.addEventListener('close', () => {
  document.body.classList.remove('has-lightbox');
  image.removeAttribute('src');
  previousFocus?.focus();
});

document.addEventListener('click', event => {
  const trigger = event.target.closest('.zoom-trigger');
  if (trigger) {
    const group = trigger.closest('.detail-content, .work-grid, .hero-photo');
    if (group) openImages(group.querySelectorAll('.zoom-trigger'), trigger);
    return;
  }
  const archiveImage = event.target.closest('.archive-grid a[data-full]');
  if (archiveImage) {
    event.preventDefault();
    openImages(archiveImage.closest('.archive-grid').querySelectorAll('a[data-full]'), archiveImage);
  }
});

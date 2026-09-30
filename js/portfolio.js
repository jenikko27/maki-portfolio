const button=document.querySelector('.menu-toggle');const nav=document.querySelector('#primary-nav');if(button&&nav){button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');nav.classList.toggle('is-open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','メニューを開く');nav.classList.remove('is-open')}));document.addEventListener('keydown',e=>{if(e.key==='Escape'){button.setAttribute('aria-expanded','false');nav.classList.remove('is-open')}})}

/* 作品画像の全体表示 */
const lightbox=document.createElement('dialog');
lightbox.className='image-lightbox';
lightbox.setAttribute('aria-label','作品画像の拡大表示');
lightbox.innerHTML=`<button type="button" class="lightbox-close" aria-label="拡大表示を閉じる">×</button><button type="button" class="lightbox-arrow lightbox-prev" aria-label="前の画像">‹</button><img alt=""><button type="button" class="lightbox-arrow lightbox-next" aria-label="次の画像">›</button><div class="lightbox-footer"><p></p><span class="lightbox-count"></span></div>`;
document.body.append(lightbox);
const lightboxImage=lightbox.querySelector('img');
const lightboxCaption=lightbox.querySelector('p');
const lightboxCount=lightbox.querySelector('.lightbox-count');
let imageSet=[];let activeImage=0;let previousFocus;
function showImage(index){
  activeImage=(index+imageSet.length)%imageSet.length;
  const item=imageSet[activeImage];
  lightboxImage.src=item.src;
  lightboxImage.alt=item.alt;
  lightboxCaption.textContent=item.alt;
  lightboxCount.textContent=`${activeImage+1} / ${imageSet.length}`;
  lightbox.querySelectorAll('.lightbox-arrow').forEach(arrow=>{arrow.hidden=imageSet.length<2});
}
function openImages(items,index){
  imageSet=items;previousFocus=document.activeElement;
  showImage(index);lightbox.showModal();lightbox.querySelector('.lightbox-close').focus();
}
function closeImages(){lightbox.close()}
lightbox.querySelector('.lightbox-close').addEventListener('click',closeImages);
lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>showImage(activeImage-1));
lightbox.querySelector('.lightbox-next').addEventListener('click',()=>showImage(activeImage+1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeImages()});
lightbox.addEventListener('keydown',e=>{
  if(e.key==='ArrowLeft'){e.preventDefault();showImage(activeImage-1)}
  if(e.key==='ArrowRight'){e.preventDefault();showImage(activeImage+1)}
});
lightbox.addEventListener('close',()=>{lightboxImage.removeAttribute('src');previousFocus?.focus()});
function activateGroup(elements,clicked,toItem){
  const items=Array.from(elements);openImages(items.map(toItem),items.indexOf(clicked));
}
document.addEventListener('click',e=>{
  const trigger=e.target.closest('.zoom-trigger');
  if(trigger){
    const group=trigger.closest('.detail-content')||trigger.closest('.work-grid')||trigger.closest('.hero-photo');
    activateGroup(group.querySelectorAll('.zoom-trigger'),trigger,el=>({src:el.dataset.full,alt:el.querySelector('img').alt}));
    return;
  }
  const archive=e.target.closest('.archive-grid a[data-full]');
  if(archive){
    e.preventDefault();
    activateGroup(archive.closest('.archive-grid').querySelectorAll('a[data-full]'),archive,el=>({src:el.dataset.full,alt:el.querySelector('img').alt}));
  }
});

// 初期版の詳細HTMLにも自動で拡大操作を追加する。
document.querySelectorAll('.detail-content figure img').forEach(img=>{
  if(img.closest('.zoom-trigger'))return;
  const control=document.createElement('button');
  control.type='button';control.className='zoom-trigger detail-zoom';control.dataset.full=img.src;
  control.setAttribute('aria-label',img.alt+'を拡大して見る');
  img.before(control);control.append(img);
  const label=document.createElement('span');label.className='zoom-label';label.setAttribute('aria-hidden','true');label.textContent='＋ 拡大して見る';control.append(label);
});
// 古いCSSが残っていても、拡大表示と操作ボタンを使えるようにする。
const lightboxStyles=document.createElement('style');
lightboxStyles.textContent=`
.detail-content .detail-zoom{position:relative;display:block;width:100%;height:auto;padding:0;border:0;background:#eee8e0;cursor:zoom-in}
.detail-content .detail-zoom img{display:block;width:100%;height:auto;aspect-ratio:auto;object-fit:contain}
.zoom-label{position:absolute;right:10px;bottom:10px;background:#302e2bee;color:#fff;padding:7px 12px;font-size:12px;line-height:1.4;border-radius:2px}
.image-lightbox{box-sizing:border-box;position:fixed;inset:0;width:min(96vw,1200px);height:96vh;max-width:none;max-height:none;margin:auto;border:0;background:#f5f2ec;padding:65px 78px 18px;text-align:center}
.image-lightbox::backdrop{background:#141311dd}
.image-lightbox>img{width:100%;height:calc(100% - 45px);object-fit:contain;aspect-ratio:auto}
.lightbox-close{position:absolute;top:12px;right:16px;width:46px;height:46px;border:0;border-radius:50%;background:#302e2b;color:white;font:32px/1 Arial;cursor:pointer}
.lightbox-arrow{position:absolute;top:50%;transform:translateY(-50%);width:48px;height:48px;border:0;border-radius:50%;background:#302e2b;color:white;font:38px/1 Arial;cursor:pointer}
.lightbox-prev{left:15px}.lightbox-next{right:15px}.lightbox-arrow[hidden]{display:none}
.lightbox-footer{display:flex;justify-content:center;align-items:center;gap:20px;min-height:32px}.lightbox-footer p{margin:0;font-size:13px}.lightbox-count{font:12px Arial;white-space:nowrap}
@media(max-width:680px){.image-lightbox{width:100vw;height:100dvh;padding:62px 12px 40px}.lightbox-arrow{width:42px;height:42px}.lightbox-prev{left:6px}.lightbox-next{right:6px}}
`;
document.head.append(lightboxStyles);

const groups=[
{title:'EC商品画像',note:'画像制作 / レタッチ / 一部文章',items:[['20-0020-000.jpg','チーズケーキ 商品トップ'],['20-0020-001.jpg','チーズケーキ 商品説明'],['14080_001.jpg','ホールケーキ 商品トップ'],['14080_003.jpg','ホールケーキ 商品説明'],['32001_01.jpg','チョコレート 商品トップ'],['32001_02.jpg','チョコレート 商品説明'],['90086_00.jpg','焼き菓子セット 商品トップ'],['90086_01.jpg','焼き菓子セット 商品説明']]},
{title:'販促バナー',note:'画像制作 / レタッチ / 一部キャッチコピー',items:[['bana_curry-20off.jpg','キャンペーン'],['bana_keirou2025.jpg','敬老の日'],['bana_top_printemps_867x468.jpg','春のキャンペーン'],['bana_Kisei_ver.jpg','季節のバナー'],['bana_14111_867x468.jpg','洋菓子のバナー'],['bana_pain2.jpg','パンのバナー'],['bana_13067_867x468.jpg','洋菓子のバナー'],['bana_Iledespins_2024.jpg','季節のバナー']]},
{title:'ランディングページ',note:'画像制作 / レタッチ / 一部文章 / コーディング',items:[['lp_cheesecake.jpg','2023年 チーズケーキ特集','cheesecake/index.html'],['lp_noel2023.jpg','2023年 クリスマス特集','noel_2023/index.html'],['lp_wd2024.jpg','2024年 ホワイトデー特集','wd_2024/index.html'],['lp_wd2025.jpg','2025年 ホワイトデー特集','wd_2025/index.html']]}
];
const root=document.querySelector('#archive-content');
for(const group of groups){
  const section=document.createElement('section');section.className='archive-group';
  const h=document.createElement('h2');h.textContent=group.title;
  const note=document.createElement('p');note.textContent=group.note;
  const grid=document.createElement('div');grid.className='archive-grid';
  for(const [file,label,page] of group.items){
    const item=document.createElement('div');item.className='archive-item';
    const a=document.createElement('a');a.href=`images_gallery/${file}`;a.dataset.full=a.href;a.setAttribute('aria-label',label+'を拡大して見る');
    const img=document.createElement('img');img.src=`images_gallery/${file}`;img.alt=label;img.loading='lazy';
    const caption=document.createElement('span');caption.textContent=label;
    a.append(img,caption);item.append(a);
    if(page){const pageLink=document.createElement('a');pageLink.href=page;pageLink.className='archive-page-link';pageLink.textContent='制作したページを見る ↗';item.append(pageLink)}
    grid.append(item);
  }
  section.append(h,note,grid);root.append(section);
}

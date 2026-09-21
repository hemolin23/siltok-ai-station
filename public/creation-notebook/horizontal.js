'use strict';
const main=document.querySelector('main');
const get=s=>document.querySelector(s);
const deck=document.createElement('div');deck.className='deck';deck.setAttribute('aria-label','横向创作手记');deck.tabIndex=0;
const pages=[];
function page(id,label,nodes){const el=document.createElement('section');el.className='slide';el.id=id;el.setAttribute('aria-label',label);nodes.filter(Boolean).forEach(n=>el.append(n));deck.append(el);pages.push({el,label});return el;}
function heading(k,title,desc=''){const el=document.createElement('div');el.className='section-heading';const a=document.createElement('p');a.className='eyebrow';a.textContent=k;const h=document.createElement('h2');h.textContent=title;el.append(a,h);if(desc){const p=document.createElement('p');p.textContent=desc;el.append(p)}return el}
const hero=get('.hero');hero.id='cover';hero.classList.add('slide');deck.append(hero);pages.push({el:hero,label:'封面'});
page('idea','故事起点',[get('#story .section-heading'),get('.premise'),get('.editor-note')]);
page('story','六场故事',[heading('02 / STORY STRUCTURE','六场戏，一次情感转变。','点击场次，查看剧情、情绪和镜头的作用。'),get('.story-browser')]);
page('meaning','情感落点',[heading('03 / THE MEANING','它想送到的，是一份心意。'),get('.meaning')]);
const workflow=get('.workflow');const secondHalf=document.createElement('div');secondHalf.className='workflow';[...workflow.children].slice(3).forEach(n=>secondHalf.append(n));
page('craft','创作与准备',[get('#craft .section-heading'),workflow]);
page('production','生成与剪辑',[heading('MAKING / 04—06','让画面动起来，再把故事接起来。'),secondHalf,get('.loop')]);
page('assets','制作资产',[get('.asset-board')]);
page('cases','镜头案例',[get('#cases .section-heading'),get('.case-tabs'),get('.case-panel')]);
page('methods','选择方法',[get('.method-picker'),get('#cases>.caption')]);
page('finish','后期制作',[get('#finish .section-heading'),get('.finish-grid')]);
page('sound','声音设计',[heading('SOUND DESIGN','把世界补完整，把感受听清楚。'),get('.sound-track')]);
page('feedback','观众反馈',[heading('AUDIENCE FEEDBACK','留一点距离，再看自己的作品。'),get('.review')]);
page('scale','投入与排期',[get('.production .section-heading'),get('.stats'),get('.production-note'),get('.schedule')]);
page('festival','走向观众',[heading('10 / AFTER THE EXPORT','从电脑里的文件，到观众的心里。'),get('.festival')]);
page('closing','创作原则',[...get('.closing').children]);
const sources=get('footer');sources.classList.add('slide');sources.setAttribute('aria-label','资料来源');deck.append(sources);pages.push({el:sources,label:'资料来源'});
main.replaceChildren(deck);
const bar=document.createElement('div');bar.className='deck-controls';bar.innerHTML='<span class="swipe-hint">横向滑动 · 左右方向键</span><div class="page-dots" aria-label="跳转章节"></div><div class="page-actions"><span class="page-status" aria-live="polite"></span><button class="prev" aria-label="上一页">←</button><button class="next" aria-label="下一页">→</button></div>';document.body.append(bar);
let current=0;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function go(i){i=Math.max(0,Math.min(pages.length-1,i));deck.scrollTo({left:i*deck.clientWidth,behavior:reduced?'instant':'smooth'})}
pages.forEach((p,i)=>{const b=document.createElement('button');b.title=p.label;b.setAttribute('aria-label',`第 ${i+1} 页：${p.label}`);b.onclick=()=>go(i);get('.page-dots').append(b)});
function update(){current=Math.round(deck.scrollLeft/deck.clientWidth);current=Math.max(0,Math.min(pages.length-1,current));get('.page-status').textContent=`${String(current+1).padStart(2,'0')} / ${pages.length} · ${pages[current].label}`;get('.prev').disabled=current===0;get('.next').disabled=current===pages.length-1;[...get('.page-dots').children].forEach((b,i)=>b.setAttribute('aria-current',i===current?'step':'false'));document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+pages[current].el.id));pages.forEach((p,i)=>{p.el.inert=Math.abs(i-current)>0});}
let frame;deck.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update)});
get('.prev').onclick=()=>go(current-1);get('.next').onclick=()=>go(current+1);
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const hash=a.getAttribute('href');const i=hash==='#'?0:pages.findIndex(p=>p.el.id===hash.slice(1));if(i>=0){e.preventDefault();go(i)}}));
document.addEventListener('keydown',e=>{if(e.target.closest('[role="tablist"],input,textarea,select,summary')||e.ctrlKey||e.metaKey||e.altKey)return;if(e.key==='ArrowRight'){e.preventDefault();go(current+1)}else if(e.key==='ArrowLeft'){e.preventDefault();go(current-1)}});
let wheelSum=0,lastWheel=0,lockUntil=0;deck.addEventListener('wheel',e=>{if(e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;const slide=pages[current].el;const canScroll=slide.scrollHeight>slide.clientHeight+2;const within=e.deltaY>0?slide.scrollTop+slide.clientHeight<slide.scrollHeight-2:slide.scrollTop>2;if(canScroll&&within)return;e.preventDefault();const now=Date.now();if(now<lockUntil)return;if(now-lastWheel>180)wheelSum=0;lastWheel=now;wheelSum+=e.deltaY;if(Math.abs(wheelSum)>55){go(current+(wheelSum>0?1:-1));wheelSum=0;lockUntil=now+650}},{passive:false});
window.addEventListener('resize',()=>{deck.scrollTo({left:current*deck.clientWidth,behavior:'instant'})});
update();

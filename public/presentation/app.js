(() => {
const slides=[...document.querySelectorAll('.slide')], controls=document.getElementById('controls'), overview=document.getElementById('overview');
let index=0, auto=false, timer=null, hideTimer=null, motion=!matchMedia('(prefers-reduced-motion: reduce)').matches, paused=false;
const durations=[12,14,20,12,15,17,17,15,14,18,18,23,19,15,17,20,17,12];
function resize(){document.documentElement.style.setProperty('--studio-scale',Math.min(innerWidth/1600,innerHeight/900));}addEventListener('resize',resize);resize();
function media(){slides.forEach((s,i)=>s.querySelectorAll('video').forEach(v=>{if(i===index&&!paused&&motion){v.play().catch(()=>{});}else v.pause();}));}
function schedule(){clearTimeout(timer);if(auto&&!paused&&!document.hidden&&overview.hidden)timer=setTimeout(()=>{if(index===slides.length-1){auto=false;updateButtons();}else go(index+1);},durations[index]*1000);}
const exitTimers=new Map(), entranceTimers=new Map();
let initialized=false;
function go(next,replay=false){
 next=Math.max(0,Math.min(slides.length-1,next));
 if(initialized&&next===index&&!replay)return;
 const old=slides[index], current=slides[next];
 if(initialized&&old!==current){
  old.classList.remove('active','entering');
  old.classList.add('exiting');
  clearTimeout(exitTimers.get(old));
  exitTimers.set(old,setTimeout(()=>{old.classList.remove('exiting');exitTimers.delete(old);},550));
 }
 clearTimeout(exitTimers.get(current));exitTimers.delete(current);
 clearTimeout(entranceTimers.get(current));
 current.classList.remove('exiting','entering');
 index=next;
 current.classList.add('active');
 // Replay only when explicitly requested, not on same-page navigation.
 if(replay)void current.offsetWidth;
 if(motion){
  current.classList.add('entering');
  const delay=Math.max(0,...[...current.querySelectorAll('.reveal')].map(el=>parseFloat(el.style.getPropertyValue('--delay'))||0));
  entranceTimers.set(current,setTimeout(()=>{current.classList.remove('entering');entranceTimers.delete(current);},(delay+1.8)*1000));
 }
 initialized=true;
 slides.forEach((s,i)=>{s.inert=i!==index;s.setAttribute('aria-hidden',String(i!==index));});
 document.getElementById('progress').style.width=((index+1)/slides.length*100)+'%';
 document.title=current.dataset.title+' · Siltok';history.replaceState(null,'','#'+(index+1));
 media();schedule();
 document.querySelectorAll('.overview-grid button').forEach((b,i)=>b.classList.toggle('current',i===index));
 document.getElementById('previous').disabled=index===0;
 document.getElementById('next').disabled=index===slides.length-1;
}
function updateButtons(){const b=document.getElementById('autoplay');b.textContent=auto?'停止自动播放':'自动播放';b.setAttribute('aria-pressed',auto);document.getElementById('motion').textContent=motion?'动效：开':'动效：关';document.getElementById('motion').setAttribute('aria-pressed',motion);document.body.classList.toggle('motion-off',!motion);}
function showControls(){document.body.classList.remove('controls-hidden');clearTimeout(hideTimer);if(overview.hidden)hideTimer=setTimeout(()=>{if(!controls.matches(':hover')&&!controls.contains(document.activeElement))document.body.classList.add('controls-hidden');},2600);}
function toggleOverview(show){overview.hidden=!show;if(show){clearTimeout(timer);slides[index].querySelectorAll('video').forEach(v=>v.pause());document.getElementById('close-overview').focus();}else{media();schedule();document.getElementById('browse').focus();}showControls();}
document.querySelector('.overview-grid').innerHTML=slides.map((s,i)=>`<button data-slide="${i}">${s.dataset.title}</button>`).join('');document.querySelectorAll('[data-slide]').forEach(b=>b.onclick=()=>{go(+b.dataset.slide);toggleOverview(false);});
document.getElementById('previous').onclick=()=>go(index-1);document.getElementById('next').onclick=()=>go(index+1);document.getElementById('replay').onclick=()=>go(index,true);document.getElementById('autoplay').onclick=()=>{auto=!auto;updateButtons();schedule();};document.getElementById('motion').onclick=()=>{motion=!motion;updateButtons();media();};document.getElementById('browse').onclick=()=>toggleOverview(true);document.getElementById('close-overview').onclick=()=>toggleOverview(false);document.getElementById('fullscreen').onclick=()=>{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen?.().catch(()=>{});};
addEventListener('keydown',e=>{if(!overview.hidden){if(e.key==='Escape')toggleOverview(false);return;}if(e.target.closest('button')&&['Enter',' '].includes(e.key))return;if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();go(index+1);}if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(index-1);}if(e.key==='Home')go(0);if(e.key==='End')go(slides.length-1);if(e.key.toLowerCase()==='r')go(index,true);if(e.key.toLowerCase()==='g')toggleOverview(true);if(e.key.toLowerCase()==='f')document.getElementById('fullscreen').click();if(e.key.toLowerCase()==='p'){paused=!paused;document.body.classList.toggle('paused',paused);media();schedule();}showControls();});
addEventListener('hashchange',()=>go(Math.max(0,(parseInt(location.hash.slice(1))||1)-1)));
let touchX=0;document.getElementById('stage').addEventListener('touchstart',e=>touchX=e.changedTouches[0].screenX,{passive:true});document.getElementById('stage').addEventListener('touchend',e=>{const d=e.changedTouches[0].screenX-touchX;if(Math.abs(d)>65)go(index+(d<0?1:-1));},{passive:true});
addEventListener('pointermove',showControls);addEventListener('visibilitychange',()=>{if(document.hidden){clearTimeout(timer);slides[index].querySelectorAll('video').forEach(v=>v.pause());}else{media();schedule();}});updateButtons();go(Math.max(0,(parseInt(location.hash.slice(1))||1)-1));showControls();setTimeout(()=>document.getElementById('hint').classList.add('off'),6500);
})();

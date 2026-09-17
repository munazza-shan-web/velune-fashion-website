const body=document.body,overlay=document.querySelector('[data-overlay]'),drawers=document.querySelectorAll('.drawer'),searchPanel=document.querySelector('.search-panel');
function closePanels(){drawers.forEach(d=>{d.classList.remove('open');d.setAttribute('aria-hidden','true')});searchPanel.classList.remove('open');searchPanel.setAttribute('aria-hidden','true');overlay.classList.remove('open');body.classList.remove('lock')}
function openPanel(panel){closePanels();panel.classList.add('open');panel.setAttribute('aria-hidden','false');overlay.classList.add('open');body.classList.add('lock')}
document.querySelector('.menu-button').addEventListener('click',()=>openPanel(document.querySelector('.menu-drawer')));
document.querySelector('[data-open-bag]').addEventListener('click',()=>openPanel(document.querySelector('.bag-drawer')));
document.querySelector('[data-open-search]').addEventListener('click',()=>{openPanel(searchPanel);setTimeout(()=>document.querySelector('#search').focus(),450)});
document.querySelectorAll('.close').forEach(b=>b.addEventListener('click',closePanels));overlay.addEventListener('click',closePanels);document.addEventListener('keydown',e=>{if(e.key==='Escape')closePanels()});
document.querySelectorAll('.menu-drawer a').forEach(a=>a.addEventListener('click',closePanels));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));button.classList.add('active');const filter=button.dataset.filter;document.querySelectorAll('.product-card').forEach(card=>card.classList.toggle('hidden',filter!=='all'&&card.dataset.category!==filter))}));

const dialog=document.querySelector('.product-dialog'),dialogImage=dialog.querySelector('img'),dialogName=dialog.querySelector('h2'),dialogPrice=dialog.querySelector('.dialog-price'),dialogDescription=dialog.querySelector('.dialog-description');let activeProduct=null,bag=[];
document.querySelectorAll('.product-card').forEach(card=>card.querySelector('.product-image').addEventListener('click',()=>{activeProduct=card;dialogImage.src=card.querySelector('img').src;dialogImage.alt=card.querySelector('img').alt;dialogName.textContent=card.dataset.name;dialogPrice.textContent=card.dataset.price;dialogDescription.textContent=card.dataset.description;dialog.querySelectorAll('.sizes button').forEach(b=>b.classList.remove('selected'));dialog.showModal()}));
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.querySelectorAll('.sizes button').forEach(b=>b.addEventListener('click',()=>{dialog.querySelectorAll('.sizes button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')}));
dialog.querySelector('.add-button').addEventListener('click',()=>{if(!activeProduct)return;bag.push({name:activeProduct.dataset.name,price:activeProduct.dataset.price});renderBag();dialog.close();openPanel(document.querySelector('.bag-drawer'))});
function renderBag(){document.querySelector('[data-bag-count]').textContent=`(${bag.length})`;const items=document.querySelector('.bag-items');items.innerHTML=bag.length?bag.map(item=>`<div class="bag-line"><span>${item.name}</span><span>${item.price}</span></div>`).join(''):'<p>Your bag is currently empty.</p>';const total=bag.reduce((sum,item)=>sum+Number(item.price.replace(/[^0-9.]/g,'')),0);document.querySelector('.bag-total strong').textContent=`$${total}`}

document.querySelector('#newsletter-form').addEventListener('submit',e=>{e.preventDefault();const input=e.currentTarget.querySelector('input'),message=document.querySelector('.form-message');message.textContent=`Thank you. A private note will be sent to ${input.value}.`;input.value=''});

const search=document.querySelector('#search');search.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();document.querySelectorAll('.product-card').forEach(card=>card.classList.toggle('search-match',q&&card.dataset.name.toLowerCase().includes(q)))});

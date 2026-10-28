// Mobile menu
var t=document.getElementById('menuToggle'),m=document.getElementById('navMenu');
if(t&&m){
  t.addEventListener('click',function(){var o=m.classList.toggle('show');t.setAttribute('aria-expanded',o);});
  m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){m.classList.remove('show');t.setAttribute('aria-expanded','false');});});
}

// Web3Forms submit -> thank-you page
document.querySelectorAll('form.js-form').forEach(function(f){
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var s=f.querySelector('.form-status'),b=f.querySelector('button[type=submit]'),old=b.textContent;
    s.className='form-status';s.textContent='Sending...';b.disabled=true;b.textContent='Sending...';
    fetch(f.action,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(f)))})
    .then(function(r){return r.json();})
    .then(function(d){
      if(d.success){window.location.href=f.dataset.redirect||'thank-you.html';}
      else{throw new Error(d.message||'Error');}
    })
    .catch(function(){
      s.className='form-status err';
      s.innerHTML='Could not send. Please try again or message us on <a href="https://wa.me/919625959146" target="_blank" rel="noopener">WhatsApp</a>.';
      b.disabled=false;b.textContent=old;
    });
  });
});

// Thank-you page text for feedback form
if(location.search.indexOf('type=feedback')>-1){
  var h=document.getElementById('ty-title'),p=document.getElementById('ty-text');
  if(h&&p){h.textContent='Thank you for your feedback!';p.textContent='Your feedback has been received. After a quick review it will be added to the Testimonials page.';}
}

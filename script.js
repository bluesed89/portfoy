
// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('primaryNav');
menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

// Typing effect (rotating words)
const typing = document.getElementById('typing');
const roles = [
  'Web Developer',
  'Developer',
  'Web Design',
  'Script Writing',
  'İşlerini Yapabiliyorum'
];
let ri = 0, ci = 0, del = false;
function typeLoop(){
  const word = roles[ri % roles.length];
  typing.textContent = (del ? word.slice(0, ci--) : word.slice(0, ci++));
  if(!del && ci === word.length + 2){ del = true; }
  if(del && ci === 0){ del = false; ri++; }
  const speed = del ? 50 : 80;
  setTimeout(typeLoop, speed);
}
if(typing) typeLoop();

// Scroll reveal + skill bars
const observer = new IntersectionObserver((entries)=>{
  for(const e of entries){
    if(e.isIntersecting){
      e.target.classList.add('revealed');
      // animate bars inside
      e.target.querySelectorAll('.bar > span').forEach(el=>{
        const w = el.style.getPropertyValue('--w') || '0%';
        requestAnimationFrame(()=> el.style.width = w);
      });
    }
  }
}, { threshold: .15 });
document.querySelectorAll('.will-reveal, #beceriler .panel').forEach(el=>observer.observe(el));

// Simple form handler (no backend)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get('name');
  const email = data.get('email');
  const msg = data.get('message');
  // Open mailto as a quick hand-off
  const body = encodeURIComponent(`${msg}\n\n— ${name} <${email}>`);
  window.location.href = `mailto:merhaba@example.com?subject=Portföy%20İletişim&body=${body}`;
  statusEl.textContent = 'E-posta istemcin açıldı. Eğer açılmadıysa, yukarıdaki mail adresine manuel olarak gönderebilirsin.';
  form.reset();
});

// Year
document.getElementById('y').textContent = new Date().getFullYear();

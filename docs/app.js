(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const menu = $('.menu-button');
  const header = $('.site-header');
  const nav = $('#main-nav');
  const mobileNav = matchMedia('(max-width: 1024px)');
  function setMenu(open, restoreFocus = false) {
    header.classList.toggle('menu-open', open);
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.querySelector('span').textContent = open ? '×' : '+';
    if (restoreFocus) menu.focus();
  }
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header.classList.contains('menu-open')) setMenu(false, true);
  });
  document.addEventListener('click', event => {
    if (header.classList.contains('menu-open') && !header.contains(event.target)) setMenu(false);
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a') && mobileNav.matches) setMenu(false);
  });
  mobileNav.addEventListener('change', () => setMenu(false));
  let memoryName = '';
  const getName = () => { try { return sessionStorage.getItem('reconstruct-demo-name') || memoryName; } catch { return memoryName; } };
  const setName = name => { memoryName = name; try { name ? sessionStorage.setItem('reconstruct-demo-name', name) : sessionStorage.removeItem('reconstruct-demo-name'); } catch { /* Browser storage may be disabled. */ } };
  function updateAccount() {
    const name = getName();
    $('#account-link').textContent = name ? `Hi, ${name}` : 'Demo account ↗';
  }
  updateAccount();
  const gallery = $('#gallery-image');
  if (gallery) {
    const images = [
      { src:'assets/original-home.png', alt:'Original homepage banner showing a man holding his lower back', caption:'The original homepage image' },
      { src:'assets/original-banner.png', alt:'Original Reconstruct Back Belt product banner', caption:'The Reconstruct Back Belt' },
      { src:'assets/belt.png', alt:'Original Reconstruct back belt product view', caption:'The original product design' },
      { src:'assets/dial.png', alt:"Close-up of the belt's adjustment dial", caption:'Reel-based adjustment system' }
    ];
    let index = 0;
    const dots = [...document.querySelectorAll('[data-slide]')];
    function show(next) {
      index = (next + images.length) % images.length;
      const entry = images[index];
      gallery.src = entry.src;
      gallery.alt = entry.alt;
      gallery.dataset.slide = String(index);
      $('#gallery-caption').textContent = entry.caption;
      $('#gallery-count').textContent = `${String(index + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;
      dots.forEach((dot, number) => dot.setAttribute('aria-pressed', String(number === index)));
    }
    $('#gallery-prev').addEventListener('click', () => show(index - 1));
    $('#gallery-next').addEventListener('click', () => show(index + 1));
    dots.forEach(dot => dot.addEventListener('click', () => show(Number(dot.dataset.slide))));
    gallery.closest('.original-gallery').addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault(); show(index + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
  }
  const currency = cents => '$' + (cents / 100).toFixed(2);
  const order = $('#order-form');
  if (order) {
    const result = $('#order-result');
    const country = $('#country');
    const phone = $('#phone');
    const email = $('#email');
    const confirm = $('#confirm-email');
    function updateTotal() {
      const quantity = Number($('#quantity').value);
      const shipping = Number(order.querySelector('[name="shipping"]:checked').value) * 100;
      $('#items-price').textContent = currency(quantity * 7895);
      $('#delivery-price').textContent = currency(shipping);
      $('#total-price').textContent = currency(quantity * 7895 + shipping);
    }
    function updatePhone() {
      phone.pattern = `[0-9]{${country.value}}`;
      $('#phone-hint').textContent = `Enter ${country.value} digits.`;
      phone.setCustomValidity(phone.value && !new RegExp(`^[0-9]{${country.value}}$`).test(phone.value) ? `Enter exactly ${country.value} digits for the selected country.` : '');
    }
    function updateEmail() {
      confirm.setCustomValidity(confirm.value && confirm.value !== email.value ? 'The email addresses must match.' : '');
    }
    country.addEventListener('change', updatePhone);
    phone.addEventListener('input', updatePhone);
    email.addEventListener('input', updateEmail);
    confirm.addEventListener('input', updateEmail);
    order.addEventListener('change', () => { updateTotal(); result.hidden = true; });
    order.addEventListener('input', () => { result.hidden = true; });
    $('#sample-details').addEventListener('click', () => {
      $('#customer-name').value = 'Demo Visitor';
      country.selectedIndex = 0;
      phone.value = '00000000';
      email.value = 'visitor@example.com';
      confirm.value = 'visitor@example.com';
      $('#lucky-number').value = '42';
      updatePhone(); updateEmail(); result.hidden = true;
    });
    order.addEventListener('submit', event => {
      event.preventDefault();
      updatePhone(); updateEmail();
      if (!order.reportValidity()) return;
      const heading = document.createElement('h3');
      heading.textContent = 'Your demo order';
      const summary = document.createElement('p');
      const quantity = Number($('#quantity').value);
      const colour = order.querySelector('[name="colour"]:checked').value;
      summary.textContent = `${quantity} × Reconstruct back belt · ${colour} · Total ${$('#total-price').textContent}`;
      const note = document.createElement('p');
      note.textContent = 'This is a preview. No order has been placed, no payment taken and no email sent.';
      result.replaceChildren(heading, summary, note);
      result.hidden = false;
      result.focus();
    });
    order.addEventListener('reset', () => setTimeout(() => {
      phone.setCustomValidity(''); confirm.setCustomValidity('');
      updatePhone(); updateEmail(); updateTotal(); result.hidden = true;
    }, 0));
    updatePhone(); updateTotal();
  }
  const contact = $('#contact-form');
  if (contact) {
    const result = $('#contact-result');
    contact.addEventListener('submit', event => {
      event.preventDefault();
      if (!contact.reportValidity()) return;
      result.textContent = `Thanks, ${$('#contact-name').value.trim()}. The form is complete. This demo has not sent a message or saved your details.`;
      result.hidden = false;
      result.focus();
    });
    contact.addEventListener('input', () => { result.hidden = true; });
    contact.addEventListener('reset', () => { result.hidden = true; });
  }
  const account = $('#account-form');
  if (account) {
    const result = $('#account-result');
    $('#display-name').value = getName();
    account.addEventListener('submit', event => {
      event.preventDefault();
      const name = $('#display-name').value.trim();
      $('#display-name').setCustomValidity(name ? '' : 'Enter a display name.');
      if (!account.reportValidity()) return;
      setName(name); updateAccount();
      result.textContent = `Welcome, ${name}. Demo member mode is active in this browser tab.`;
      result.hidden = false;
    });
    $('#display-name').addEventListener('input', () => { $('#display-name').setCustomValidity(''); });
    $('#sign-out').addEventListener('click', () => {
      setName(''); updateAccount(); account.reset();
      $('#display-name').value = '';
      result.textContent = 'You have left demo member mode.';
      result.hidden = false;
    });
  }
})();

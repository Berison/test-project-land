"use strict";

// Menu mob
var menuBtnOpen = document.querySelector('.header-inner__menu button'),
    menuInnerMob = document.querySelector('.menu-mob'),
    menuBtnClose = document.querySelector('.menu-mob__head button');

var addActive = function addActive() {
  for (var _len = arguments.length, elems = new Array(_len), _key = 0; _key < _len; _key++) {
    elems[_key] = arguments[_key];
  }

  return elems.forEach(function (elem) {
    return elem.classList.add('active');
  });
};

var removeActive = function removeActive() {
  for (var _len2 = arguments.length, elems = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    elems[_key2] = arguments[_key2];
  }

  return elems.forEach(function (elem) {
    return elem.classList.remove('active');
  });
};

menuBtnOpen.addEventListener('click', function () {
  return addActive(menuInnerMob, document.body, document.documentElement);
});
menuBtnClose.addEventListener('click', function () {
  return removeActive(menuInnerMob, document.body, document.documentElement);
}); // Swiper 

var swiperDecision = new Swiper('.swiper-decision', {
  slidesPerView: 3,
  loop: false,
  breakpoints: {
    320: {
      slidesPerView: 'auto',
      spaceBetween: 20,
      loop: true,
      centeredSlides: true
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40
    },
    992: {
      slidesPerView: 3
    }
  }
});
var swiperReviews = new Swiper('.swiper-reviews', {
  slidesPerView: 3,
  loop: false,
  spaceBetween: 50,
  breakpoints: {
    320: {
      slidesPerView: 'auto',
      spaceBetween: 20,
      loop: true,
      centeredSlides: true
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40
    },
    1200: {
      slidesPerView: 3
    }
  }
}); // Popup

var btnPopupOpen = document.querySelectorAll('.btn-popup'),
    overlay = document.querySelector('.overlay'),
    popup = document.querySelector('.popup'),
    btnPopupClose = document.querySelector('.btn-close'),
    formInner = document.getElementById('popup-form'),
    thankInner = document.querySelector('.thank'),
    thankClose = document.querySelector('.thank .btn');
btnPopupOpen.forEach(function (elem) {
  return elem.addEventListener('click', function () {
    return addActive(overlay, popup, document.body, document.documentElement);
  });
});
overlay.addEventListener('click', function () {
  return removeActive(overlay, popup, document.body, document.documentElement);
});
btnPopupClose.addEventListener('click', function () {
  return removeActive(overlay, popup, document.body, document.documentElement, menuInnerMob);
});
thankClose.addEventListener('click', function () {
  return removeActive(overlay, popup, document.body, document.documentElement, menuInnerMob, thankInner);
}); // Mask phone

var maskPhone = function maskPhone(event) {
  var keyCode;
  event.keyCode && (keyCode = event.keyCode);
  var pos = event.target.selectionStart;
  if (pos < 3) event.preventDefault();
  var matrix = "+380 (__) ___-__-__",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = event.target.value.replace(/\D/g, ""),
      newValue = matrix.replace(/[_\d]/g, function (a) {
    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
  });
  i = newValue.indexOf("_");

  if (i != -1) {
    i < 5 && (i = 3);
    newValue = newValue.slice(0, i);
  }

  var reg = matrix.substr(0, event.target.value.length).replace(/_+/g, function (a) {
    return "\\d{1," + a.length + "}";
  }).replace(/[+()]/g, "\\$&");
  reg = new RegExp("^" + reg + "$");
  if (!reg.test(event.target.value) || event.target.value.length < 5 || keyCode > 47 && keyCode < 58) event.target.value = newValue;
  if (event.type == "blur" && event.target.value.length < 5) event.target.value = "";
};

document.querySelectorAll('.tel-label input').forEach(function (elem) {
  return elem.addEventListener("input", maskPhone, false);
});
document.querySelectorAll('.tel-label input').forEach(function (elem) {
  return elem.addEventListener("focus", maskPhone, false);
});
document.querySelectorAll('.tel-label input').forEach(function (elem) {
  return elem.addEventListener("blur", maskPhone, false);
});
document.querySelectorAll('.tel-label input').forEach(function (elem) {
  return elem.addEventListener("keydown", maskPhone, false);
});
formInner.addEventListener('submit', function (e) {
  var name = formInner.querySelector('input[name="name"]'),
      lastname = formInner.querySelector('input[name="lastname"]'),
      phone = formInner.querySelector('input[name="phone"]'),
      mail = formInner.querySelector('input[name="mail"]'),
      mailRadio = formInner.querySelector('.inputs-radio input:checked'),
      city = formInner.querySelector('input[name="city"]'),
      comment = formInner.querySelector('input[name="comment"]'),
      checkbox = formInner.querySelector('.checkbox-label input');
  var data = [];
  var errorText = 'Текст должен быть не короче 3 символов';
  name.value.length >= 3 ? data.push({
    'Имя: ': name.value
  }) : formInner.querySelector('.name-label .error').innerHTML = errorText;
  lastname.value.length >= 3 ? data.push({
    'Фамилия: ': lastname.value
  }) : formInner.querySelector('.lastname-label .error').innerHTML = errorText;
  phone.value.length >= 3 ? data.push({
    'Номер телефона: ': phone.value
  }) : formInner.querySelector('.tel-label .error').innerHTML = errorText;

  if (mail.value) {
    mail.value.length >= 3 ? data.push({
      'E-mail: ': mail.value
    }) : formInner.querySelector('.email .error').innerHTML = errorText;
  }

  data.push({
    'Выбраная почта: ': mailRadio.value
  });
  city.value.length >= 3 ? data.push({
    'Город: ': city.value
  }) : formInner.querySelector('.city-label .error').innerHTML = errorText;

  if (comment.value) {
    comment.value.length >= 3 ? data.push({
      'Комментарий: ': comment.value
    }) : formInner.querySelector('.comment-label .error').innerHTML = errorText;
  }

  checkbox.checked ? data.push({
    'Первезвонить мне: ': 'Да'
  }) : data.push({
    'Первезвонить мне: ': 'Нет'
  });
  addActive(thankInner);
  removeActive(popup);
  console.log(data);
});
document.querySelectorAll('.header-inner__links a[href^="#"], .menu-mob__links a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    removeActive(menuInnerMob, document.body, document.documentElement);
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
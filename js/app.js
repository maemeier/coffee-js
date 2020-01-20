//hide placeloader

// window even list

addEventListeners();
function addEventListeners() {
  const ui = new UI();
  window.addEventListener("load", function() {
    ui.hidePreloader();
  });

  // nav btn
  document.querySelector(".navBtn").addEventListener("click", function() {
    ui.showNav();
  });

  // turn video
  document
    .querySelector(".video__switch")
    .addEventListener("click", function() {
      ui.videoControls();
    });

  // submit form__title
  document
    .querySelector(".drink-form")
    .addEventListener("submit", function(event) {
      event.preventDefault();
      const name = document.querySelector(".input-name").value;
      const lastname = document.querySelector(".input-lastname").value;
      const email = document.querySelector(".input-email").value;

      let value = ui.checkEmpty(name, lastname, email);
      console.log(value);

      if (value) {
      } else {
        ui.showFeedback("please fill all form", "error");
      }
    });
}

function UI() {}

UI.prototype.hidePreloader = function() {
  document.querySelector(".preloader").style.display = "none";
};
UI.prototype.showNav = function() {
  document.querySelector(".nav").classList.toggle("nav--show");
};
UI.prototype.videoControls = function() {
  let btn = document.querySelector(".video__switch-btn");
  if (!btn.classList.contains("btnSlide")) {
    btn.classList.add("btnSlide");
    document.querySelector(".video__item").pause();
  } else {
    btn.classList.remove("btnSlide");
    document.querySelector(".video__item").play();
  }
};
// check empty value
UI.prototype.checkEmpty = function(name, lastname, email) {
  let result;
  if (name === "" || lastname === "" || email === "") {
    result = false;
  } else {
    result = true;
  }
  return result;
};

UI.prototype.showFeedback = function(text, type) {
  if (type === "sucess") {
  } else if (type === "error") {
    let feedback = document.querySelector(".drink-form__feedback");
    feedback.classList.add("error");
    feedback.innerText = text;
    this.removeAlert("error");
  }
};
// remove color error
UI.prototype.removeAlert = function(type) {
  setTimeout(function() {
    document.querySelector(".drink-form__feedback").classList.remove(type);
  }, 3000);
};

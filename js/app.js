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
        let customer = new Customer(name, lastname, email);
        console.log(customer);

        ui.addCustomer(customer);

        ui.showFeedback(" customer added to the list", "sucess");
        ui.clearFileds();
      } else {
        ui.showFeedback("please fill all form", "error");
      }
    });

  //display modal
  const links = document.querySelectorAll(".work-item__icon");

  links.forEach(function(item) {
    item.addEventListener("click", function(event) {
      ui.showModal(event);
    });
  });

  // hide modal
  document
    .querySelector(".work-modal__close")
    .addEventListener("click", function() {
      ui.closeModal();
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
    const feedback = document.querySelector(".drink-form__feedback");
    feedback.classList.add("sucess");
    feedback.innerText = text;
    this.removeAlert("sucess");
  } else if (type === "error") {
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
// add Customer
UI.prototype.addCustomer = function(customer) {
  const images = [1, 2, 3, 4, 5];
  let random = Math.floor(Math.random() * images.length);
  const div = document.createElement("div");
  div.classList.add(".person");
  div.innerHTML = `<img
    src="img/person-${random}.jpeg"
    alt="profile"
    class="person_thumbnail"
  />
  <h4 class="person__name">${customer.name}</h4>
  <h4 class="person__last-name">${customer.lastname}</h4>`;
  document.querySelector(".drink-card__list").appendChild(div);
};
// clear
UI.prototype.clearFileds = function() {
  document.querySelector(".input-name").value = "";
  document.querySelector(".input-lastname").value = "";
  document.querySelector(".input-email").value = "";
};

// show modal
UI.prototype.showModal = function(event) {
  event.preventDefault();
  if (event.target.parentElement.classList.contains("work-item__icon")) {
    let id = event.target.parentElement.dataset.id;
    console.log(id);

    const modal = document.querySelector(".work-modal");
    const modalItem = document.querySelector(".work-modal__item");

    modal.classList.add("work-modal--show");
    modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`;
  }
};
// close modal
UI.prototype.closeModal = function() {
  document.querySelector(".work-modal").classList.remove("work-modal--show");
};

//
function Customer(name, lastname, email) {
  this.name = name;
  this.lastname = lastname;
  this.email = email;
}

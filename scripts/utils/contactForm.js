function displayModal() {
  const btnClose = document.getElementById("cross-close");
  btnClose.addEventListener("keypress", function close() {
    if (event.key == "Enter") closeModal();
  });
  const modal = document.getElementById("contact_modal");
  let prenom = document.getElementById("prenom");
  let main = document.getElementById("main-container");
  main.classList.add("modal-opened");
  modal.style.display = "flex";
  trapFocus(modal);
  prenom.focus();
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

function trapFocus(element) {
  var focusableEls = element.querySelectorAll("#cross-close, #contact-button"
  );
  var firstElement = focusableEls[0];
  var lastElement = focusableEls[focusableEls.length - 1];

  document.addEventListener("keydown", function (e) {
    var isTabPressed = e.key === "Tab";

    if (isTabPressed && !e.shiftKey) {
      if (document.activeElement === lastElement) {
        console.log("tab");

        firstElement.focus();
        e.preventDefault();
      }
    }
    if (e.shiftKey) {
      if (isTabPressed) {
        /* shift + tab */ if (document.activeElement === firstElement) {
          console.log("shift tab");
          lastElement.focus();
          e.preventDefault();
        }
      }
    }
  });
}

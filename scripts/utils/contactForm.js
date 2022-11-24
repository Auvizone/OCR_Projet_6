function displayModal() {
    const btnClose = document.getElementById("cross-close");
    btnClose.addEventListener('keypress', function close() {
        if(event.key == "Enter")
        closeModal();
    })
    const modal = document.getElementById("contact_modal");
    let prenom = document.getElementById("prenom");
	modal.style.display = "flex";
    prenom.focus();
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

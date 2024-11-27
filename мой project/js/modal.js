const modal = document.querySelector(".modal");
const triggerButton = document.querySelector("#btn-gets");
const closeButton = document.querySelector(".modal_close");

const startModal = () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
};
const closeModal = () => {
  modal.style.display = "none";
  document.body.style.overflow = "";
};

triggerButton.onclick = () => startModal();
closeButton.onclick = () => closeModal();
modal.onclick = (event) => {
  if (event.target === modal) {
    closeModal();
  }
};

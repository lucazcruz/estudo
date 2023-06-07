const collums = document.querySelectorAll(".collum");

function onDragstart({ target }) {
  target.classList.add("dragging");
}

function onDragend({ target }) {
  target.classList.remove("dragging");
}

function getNewPosition(collum, posY) {
  const cards = collum.querySelectorAll(".item:not(.dragging)");
  let result;

  for (card_refer of cards) {
    const box = card_refer.getBoundingClientRect();
    const cardCenterY = box.y + box.height / 2;
    
    if (posY >= cardCenterY) result = card_refer;
  }

  return result;
}

collums.forEach(collum => {
  collum.addEventListener("dragover", (e) => {
    const dragging = document.querySelector(".dragging");
    const applyAfter = getNewPosition(collum, e.clientY);

    if (applyAfter) {
      applyAfter.insertAdjacentElement("afterend", dragging);
    } else {
      collum.prepend(dragging);
    }
  });
});

document.addEventListener("dragstart", onDragstart);
document.addEventListener("dragend", onDragend);

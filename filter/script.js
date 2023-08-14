const filterElement = document.querySelector('#filter');
const cardsElements = document.querySelectorAll('.cards li');

filterElement.addEventListener('input', filter);

function filter() {
  const filterText = filterElement.value.toLowerCase();
  
  if (filterElement.value !== '') {
    cardsElements.forEach((card) => {
      const title = card.querySelector('.header h2').textContent.toLowerCase();

      if (!title.includes(filterText)) card.style.display = 'none'
      else card.style.display= 'block'
    })

  } else {
    cardsElements.forEach( card => card.style.display= 'block');
  }
}

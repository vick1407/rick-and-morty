document.addEventListener('DOMContentLoaded', function () {
  const charsContainer = document.querySelector('.chars-container');
  const loadMoreButton = document.getElementById('load-more');
  const nameFilterInput = document.getElementById('name');
  const speciesFilterSelect = document.getElementById('species');
  const genderFilterSelect = document.getElementById('gender');
  const statusFilterSelect = document.getElementById('status');

  let page = 1;

  const loadCharacters = async () => {
      try {
          const filters = buildFilters();
          const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}${filters}`);
          const data = await response.json();

          if (data.results.length > 0) {
              data.results.forEach(character => {
                  const charElement = createCharacterElement(character);
                  charsContainer.appendChild(charElement);
              });

              page++;
          } else {
              loadMoreButton.disabled = true;
          }
      } catch (error) {
          console.error('Erro ao carregar personagens:', error);
      }
  };

  const createCharacterElement = character => {
      const charElement = document.createElement('div');
      charElement.classList.add('char');

      const imgElement = document.createElement('img');
      imgElement.src = character.image;
      imgElement.alt = character.name;

      const charInfoElement = document.createElement('div');
      charInfoElement.classList.add('char-info');

      const nameElement = document.createElement('h3');
      nameElement.textContent = character.name;

      const speciesElement = document.createElement('span');
      speciesElement.textContent = character.species;

      charInfoElement.appendChild(nameElement);
      charInfoElement.appendChild(speciesElement);

      charElement.appendChild(imgElement);
      charElement.appendChild(charInfoElement);

      return charElement;
  };

  const buildFilters = () => {
      const nameFilter = nameFilterInput.value.trim().toLowerCase();
      const speciesFilter = speciesFilterSelect.value;
      const genderFilter = genderFilterSelect.value;
      const statusFilter = statusFilterSelect.value;

      let filters = '';

      if (nameFilter !== '') filters += `&name=${nameFilter}`;
      if (speciesFilter !== '') filters += `&species=${encodeURIComponent(speciesFilter)}`;
      if (genderFilter !== '') filters += `&gender=${genderFilter}`;
      if (statusFilter !== '') filters += `&status=${statusFilter}`;

      return filters;
  };

  const filterCharacters = async () => {
      charsContainer.innerHTML = '';
      page = 1;

      await loadCharacters();
  };

  nameFilterInput.addEventListener('input', filterCharacters);
  speciesFilterSelect.addEventListener('change', filterCharacters);
  genderFilterSelect.addEventListener('change', filterCharacters);
  statusFilterSelect.addEventListener('change', filterCharacters);

  loadMoreButton.addEventListener('click', loadCharacters);
  loadCharacters();
});


const textInput = document.getElementById('name');

textInput.addEventListener('input', function() {
    const inputValue = textInput.value;
    if (inputValue.trim() !== '') {
        textInput.style.color = 'white';
    } else {
        textInput.style.color = 'black';
    }
});
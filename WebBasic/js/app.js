function preRender() {
    let countVisibleCards = getCountVisibleCards()
    updateResults(countVisibleCards)
  }
  
  function getCountVisibleCards() {
    return Array.from(document.getElementsByClassName('card')).filter(
      (card) =>
        !card.getElementsByClassName.display ||
        card.getElementsByClassName.display !== 'none',
    ).length
  }
  
  function updateResults(count) {
    document.getElementById('countResults').textContent = count
  }
  
  function filter() {
    let { search, operation, languages } = getFilterProperties()
    let interval = setInterval((_) => {
      let [containerEl] = document.getElementsByClassName('container')
      let changedText = search !== getSearchValue()
      if (!changedText) clearInterval(interval)
      if (containerEl && containerEl.children && !changedText) {
        let visibleCards = updateVisibleCards(
          containerEl,
          search,
          operation,
          languages,
        )
      }
    }, 1000)
  }
  
  function getFilterProperties() {
    let search = getSearchValue()
    let [radio] = getSelectedRadio()
    let operation = radio.id == '1' ? 'AND' : 'OR'
    let languages = Array.from(getSelectedLanguages()).map((lang) => lang.name)
    return {
      search,
      operation,
      languages,
    }
  }
  
  function getSearchValue() {
    let inputSearchEl = document.getElementById('nameSearch')
    return inputSearchEl.value
  }
  
  function getSelectedRadio() {
    return Array.from(
      document.querySelectorAll('header input[type="radio"]:checked'),
    )
  }
  
  function getSelectedLanguages() {
    return Array.from(
      document.querySelectorAll('header input[type="checkbox"]:checked'),
    )
  }
  
  function updateVisibleCards(containerEl, search, operation, selectedLanguages) {
    let countVisibleCards = 0
    Array.from(containerEl.children).forEach((cardEl) => {
      let [titleEl] = cardEl.getElementsByClassName('card-title')
      let cardLanguages = Array.from(
        cardEl.getElementsByClassName('iconLanguage'),
      ).map((image) => image.name)
      if (titleEl) {
        let isMatchName = isMatchByName(titleEl.textContent, search)
        if (!isMatchName && operation == 'AND') {
          hideCard(cardEl)
        } else if (isMatchName && operation == 'OR') {
          showCard(cardEl)
          countVisibleCards++ //atualizei aqui
        } else if (isMatchName && operation == 'AND') {
          let isMatchLanguage = isMatchByLanguage(
            cardLanguages,
            selectedLanguages,
          )
          if (isMatchLanguage) {
            showCard(cardEl)
            countVisibleCards++ //atualizei aqui
          } else {
            hideCard(cardEl)
          }
        } else if (!isMatchName && operation == 'OR') {
          let isMatchLanguage = isMatchByLanguage(
            cardLanguages,
            selectedLanguages,
          )
          if (isMatchLanguage) {
            showCard(cardEl)
            countVisibleCards++ //atualizei aqui
          } else {
            hideCard(cardEl)
          }
        }
      }
    })
    return updateResults(countVisibleCards) //atualizei aqui
  }
  
  function isMatchByName(textCard, textInput) {
    return textCard.toLowerCase().includes(textInput.toLowerCase())
  }
  
  function isMatchByLanguage(cardLanguages, selectedLanguages) {
    return cardLanguages.some((cardLang) => selectedLanguages.includes(cardLang))
  }
  
  function hideCard(card) {
    card.style.display = 'none'
  }
  
  function showCard(card) {
    card.style.display = 'flex'
  }


  const modalTemplate = `<div class="modal">
                            <button class="fechar">x</button>
                            <div class="profilePictureModal">
                              <img class="image" name = "imageProfile" src = "__DEV_IMAGE__" alt="deselvonvedor"/>
                            </div>
                            <div class = "profileDescriptionModal">
                              <div style="display: flex; flex-direction: colunm">
                                <h2 class="cardTitle" name = "devname">__DEV_NAME__</h2>
                                <span name="age">__DEV_AGE__</span>
                                <span name="description">__DEV_DESCRIPTION__</span>
                                <span name="description">__DEV_DESCRIPTION_ABILITY__</span>
                                <h3>Contato</h3>
                                <span name="mail">Email: <a href="#">__DEV_MAIL__</a></small>
                                <span name="git">GitHub: <a href="#">__DEV_GIT__</a>5</span>
                                <span name="phone">Telefone:__DEV_PHONE__</span>
                              </div>
                              <div class="languages">
                                <h3>Linguagens</h3>
                                __DEV_LANGUAGES__
                              </div>
                            </div>
                          </div>`;



Array.from(document.querySelectorAll('.card')).forEach(card => {
  card.addEventListener('click', () => iniciaModal('modalProfile', event.currentTarget.id));
});


function iniciaModal(modalID,cardID){
  fillModal(getUserInfo(cardID));
  const modal = document.getElementById(modalID);
  if(modal){
    modal.classList.add('mostrar');
    modal.addEventListener("click",(e)=>{

      if(e.target.id == modalID || e.target.className == "fechar"){
        modal.classList.remove('mostrar');
      }

    })
  }
}

function getUserInfo(id){
  let cardUser = document.getElementById(id);
  let userData = {};

  if(cardUser){
    userData = ['age', 'mail', 'phone', 'github', 'username', 'description', 'descriptionAbility'].
                                                reduce((acc,name) => {

                                                  acc[name] = getTextContentByName(cardUser,name);
                                                  return acc;

                                                }, {});
  }
}
  
//Using local storage that we created in index.js script
var likedHeros = JSON.parse(localStorage.getItem('likedHerosUniqueID'))
//Adding container to place all favourite cards in it
let FavouriteCardsContainer = document.getElementById('FavouriteCards')
var heroCounting = 1

for (let thisHeroUniqueID of likedHeros) {
  var thisHeroUniqueURL =
    `https://superheroapi.com/api.php/4824088724386168/ ` + thisHeroUniqueID

  //Creating new XMLHttpRequest
  var xhr = new XMLHttpRequest()
  //It'll show results as soon as we type anything to the search placeholder (i.e Whenever the ReadyState property of the XMLHttpRequest change)
  xhr.onreadystatechange = function () {
    //xhr.readyState = 4, when onLoad is Done
    //status code = 200, when request has succeeded
    if (this.readyState == 4 && this.status == 200) {
      //responseText returns the text received from a server
      var thisHero = JSON.parse(this.responseText)
      console.log('Hero', heroCounting++, thisHero)

      //Creating HTML element for hero card container
      let thisHeroContainer = document.createElement('div')
      //Adding particular Hero ID card from bootstrap
      thisHeroContainer.id = thisHeroUniqueID
      //Adding class name card from bootstrap
      thisHeroContainer.className += 'card'
      //Adding class name card from favourites.css
      thisHeroContainer.className += 'favouriteCardBackground'
      //Adding style for the whole card
      thisHeroContainer.style =
        'width: 18rem;min-width:18rem;height:465px;min-height:465px; margin:1rem;margin-bottom:1.5rem; border-radius:30px;background-image:linear-gradient(45deg, red, pink, blue);cursor: pointer;border-width: thick'

      //Show current hero details whenever we click on that hero
      thisHeroContainer.onclick = function () {
        localStorage.setItem('RedirectToThisHeroPage', thisHeroUniqueID)
        // console.log(
        //   'getFavHero',
        //   localStorage.getItem('RedirectToThisHeroPage')
        // )
        window.location.assign('aboutHero.html')
      }

      //Create image element to put hero's image in it
      let thisHeroImage = document.createElement('img')
      //Using bootstrap card image top to put image in it
      thisHeroImage.className = 'card-img-top'
      //Image source URL
      thisHeroImage.setAttribute('src', thisHero.image.url)
      thisHeroImage.style = `width: 18rem; height:25rem;border-radius:50px;justify-content:center;align-items: center; color:white;padding:30px 30px 0px 30px;`

      thisHeroImage.onerror = function () {
        //Hide Image if error occurs
        thisHeroImage.style.display = 'none'
        // thisHeroImage.alt = `Sadly, we don't own the copyrights for this image :(`
        thisHeroImage.alt = ``
        //If don't want to hide image, but wants to show error image instead
        thisHeroImage.style = `width: 18rem; height:25rem;border-radius:30px;justify-content:center;align-items: center; background-image:url('/images/404.png');background-size: cover;`
      }

      //Creating span element for hero name and adding text node for its name
      let thisHeroName = document.createElement('span')
      thisHeroName.style = `width: 18rem;font-weight: 900; font-size:1.5rem;justify-content: center;align-items: center; margin-top:5px; margin-bottom:5px;font-family: papyrus; font-size: 1.4rem;letter-spacing: 2px;`
      thisHeroName.className += 'card-title col d-flex justify-content-center'
      let infoOfHero = document.createTextNode(thisHero.name)
      thisHeroName.appendChild(infoOfHero)

      //Creating trash button to delete items from favourites
      let trashButton = document.createElement('button')
      //Adding bootstrap card button class to trash button
      trashButton.className += 'btn btn-primary'
      trashButton.style = `width: 10rem;font-weight: 600; font-size:1rem;border-radius:30px;color:lightgrey; cursor: grabbing;`
      trashButton.innerHTML = '<span> <i class = "fas fa-trash"> </i> </span>'

      //Added Mouse over and out events to every trash card for animation on trash icon
      function deleteOver () {
        trashButton.innerHTML = `<span>  <i class = "fas fa-trash fa-shake"
                        style="--fa-animation-duration: 3s; animation-iteration-count: 1;"> </i></span>`
      }
      function deleteOut () {
        trashButton.innerHTML = `<span>  <i class = "fas fa-trash"> </i></span>`
      }
      trashButton.addEventListener('mouseover', deleteOver, false)
      trashButton.addEventListener('mouseout', deleteOut, false)

      //Delete hero from the liked list when clicked on trash icon of particular hero
      trashButton.onclick = function (event) {
        deleteThisHeroFromFavourites(
          event,
          thisHeroUniqueID,
          thisHeroContainer.id
        )
      }

      //Append all information about hero to the particular hero container and finally update the FavouriteCardsContainer
      thisHeroContainer.appendChild(thisHeroImage)
      thisHeroContainer.appendChild(thisHeroName)
      thisHeroContainer.appendChild(trashButton)
      FavouriteCardsContainer.appendChild(thisHeroContainer)
    }
  }
  xhr.open('get', thisHeroUniqueURL, true)
  xhr.send()
}

function deleteThisHeroFromFavourites (
  event,
  DeleteThisHeroID,
  thisHeroContainer
) {
  // console.log('event:', event, 'ID', DeleteThisHeroID, 'likedHeros', likedHeros)
  console.log('deleteThisHeroFromFavourites')

  //Deleting from array list
  for (let heroID in likedHeros) {
    if (likedHeros[heroID] == DeleteThisHeroID) {
      likedHeros.splice(heroID, 1)
      break
    }
  }

  //Setting updated hero list to the liked unique ID storage
  localStorage.setItem('likedHerosUniqueID', JSON.stringify(likedHeros))

  //Removing card from the container
  var RemoveThisHeroCard = document.getElementById(thisHeroContainer)
  // RemoveThisHeroCard.style = `width=0px;height=0px; transition-duration:5s`
  RemoveThisHeroCard.remove()

  //Adding Event stop propagation, so that it'll not open the hero page along with it
  event.stopPropagation()
}

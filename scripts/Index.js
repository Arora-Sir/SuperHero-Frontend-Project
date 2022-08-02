//Local storage (for favourites and refreshing the page)
let localStorage = window.localStorage
var likedHeros = JSON.parse(localStorage.getItem('likedHerosUniqueID'))

//If local storage isn't created yet, then creating storage for the first time
if (!localStorage.getItem('likedHerosUniqueID')) {
  let likedHeros = [] //As no hero is liked yet, so creating empty array
  localStorage.setItem('likedHerosUniqueID', JSON.stringify(likedHeros)) //Setting up single ID for all liked heros
}

//Add key in local storage for every hero click to show its information page
localStorage.setItem('RedirectToThisHeroPage', '')

//Adding keyup (when key is released) event to the Hero search Box (placeholder)
let heroSearchPlaceholder = document.getElementById('heroSearchPlaceholder')
heroSearchPlaceholder.addEventListener(
  'keyup',
  heroSearchPlaceholderKeyUpRefresh
)

//TODO: Added Mouse over and out events to every card heart for animation, but not implemented yet because font awesome isn't supporting the double animation yet (will implement in future)
function mOver () {
  thisHeroFavouriteButton.innerHTML = `<span class="LeftEnd">  <i class="fa-regular fa-heart fa-shake"
        style="--fa-animation-duration: 3s;"> </i></span>`
}

function mOut () {
  thisHeroFavouriteButton.innerHTML = `<span class="LeftEnd">  <i class="fa-regular fa-heart"> </i></span>`
}

//Show results as soon as we type anything to the search placeholder
function heroSearchPlaceholderKeyUpRefresh () {
  //Creating container to place all heros in it when searched
  var HerosContainer = document.getElementById('HerosContainer')

  //Text shown to user, until the result is fetching from the database
  HerosContainer.innerHTML = `<h2 er' er' style="background-color:green;border-radius:30px;padding:10px"> Your Heros are on the way <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i> </h2>`

  //Search hero be name using superheroapi
  //Have to add api.php in case PHP applications needs to communicate with databases
  let searchHeroURL =
    `https://www.superheroapi.com/api.php/4824088724386168/search/` +
    heroSearchPlaceholder.value

  //Creating new XMLHttpRequest
  var xhr = new XMLHttpRequest()

  //It'll show results as soon as we type anything to the search placeholder (i.e Whenever the ReadyState property of the XMLHttpRequest change)
  xhr.onreadystatechange = function () {
    //xhr.readyState = 4, when onLoad is Done
    //status code = 200, when request has succeeded
    if (this.readyState == 4 && this.status == 200) {
      //responseText returns the text received from a server
      var requiredData = JSON.parse(this.responseText)
      console.log('requiredData:', requiredData)

      //Handling error either if hero doesn't exist in database or if nothing is entered in search placeholder or pressed the backspace in the start of search
      if (requiredData.response === 'error') {
        if (requiredData.error === 'bad name search request') {
          HerosContainer.innerHTML = `<h2 class = 'noHeroFound justify-content-center flex-wrap d-flex text-center' style="background-color:yellow;border-radius:30px;padding:10px"><span> Type something my Lord, </span> <br> <span> We are eager to show you some cool heros <i class="fa-regular fa-face-laugh-beam"></i></span></h2> `
        } else {
          // HerosContainer.style.background = 'white'
          // HerosContainer.style.border = '50px '
          HerosContainer.innerHTML = `<h2 class = 'noHeroFound justify-content-center flex-wrap d-flex text-center' style="background-color:red;border-radius:30px;padding:10px"><span> Apologies my Lord, </span> <br> <span> We are unable to find your hero <i class="fa-regular fa-face-frown"></i> </span></h2> `
        }
        return
      }

      //No text shown to user when we are showing hero cards on screen
      HerosContainer.innerHTML = ''

      //Creating cards for all our heros
      for (let thisHero of requiredData.results) {
        //Creating HTML element for hero card container
        let thisHeroContainer = document.createElement('div')
        thisHeroContainer.setAttribute('id', 'thisHeroContainer')

        //Adding class name card from bootstrap
        thisHeroContainer.className += 'card'
        //Adding style for the whole card
        thisHeroContainer.style = `width: 18rem;min-width:18rem;height:100%;min-height:500px; margin:1rem; border-radius:30px;background-color:lightgrey;cursor: pointer;`

        //Show current hero details whenever we click on that hero
        thisHeroContainer.onclick = function () {
          localStorage.setItem('RedirectToThisHeroPage', thisHero.id)
          // console.log('getHero', localStorage.getItem('RedirectToThisHeroPage'))
          document.getElementById('heroSearchPlaceholder').value = ''
          window.location.assign('aboutHero.html')
        }

        //Create image element to put hero's image in it
        let thisHeroImage = document.createElement('img')
        //Using bootstrap card image top to put image in it
        thisHeroImage.className = 'card-img-top'
        //Image source URL
        thisHeroImage.setAttribute('src', thisHero.image.url)
        thisHeroImage.style = `width: 18rem; height:25rem;border-radius:30px;justify-content:center;align-items: center; color:white;`
        //If Heros image doesn't exist, hide the error image, and shows new error image instead
        thisHeroImage.onerror = function () {
          //Hide error image
          thisHeroImage.style.display = 'none'
          thisHeroImage.alt = ``
          //Adding another image if current image doesn't exist
          thisHeroImage.style = `width: 18rem; height:25rem;border-radius:30px;justify-content:center;align-items: center; background-image:url('images/404.png');background-size: cover;`

          // ThisHeroDoesNotExist = document.createElement('img')
          // ThisHeroDoesNotExist.className += 'card'
          // ThisHeroDoesNotExist.className += 'card-img-top'
          // ThisHeroDoesNotExist.setAttribute(
          //   'src',
          //   'images/404.png'
          // )
          // ThisHeroDoesNotExist.style = `width: 18rem; height:25rem;border-radius:30px;justify-content:center;align-items: center; background-image:url('images/404.png');background-size: cover;`
          // thisHeroContainer.appendChild(ThisHeroDoesNotExist)
          // console.log(ThisHeroDoesNotExist)
        }

        //Creating span element for hero name and adding text node for its name
        let thisHeroName = document.createElement('span')
        thisHeroName.style = `width: 18rem;font-weight: 900; font-size:1.5rem;justify-content: center;align-items: center; margin-top:5px; margin-bottom:5px;font-family: papyrus;font-size: 1.4rem;letter-spacing: 2px;text-shadow: 2px 1px 2px cyan`
        thisHeroName.className += 'card-title col d-flex justify-content-center'
        let thisHeroNameInText = document.createTextNode(thisHero.name)
        thisHeroName.appendChild(thisHeroNameInText)

        //Favourite button for every hero
        let thisHeroFavouriteButton = document.createElement('button')
        //Adding bootstrap card button class to favourite button
        thisHeroFavouriteButton.className += 'btn btn-primary'
        thisHeroFavouriteButton.style = `width: 18rem;font-weight: 600; font-size:1rem;margin-bottom: 0px;border-radius:30px;cursor: grabbing;`

        //Check if hero is exists in our favourites or not
        if (likedHeros.includes(thisHero.id)) {
          thisHeroFavouriteButton.style.backgroundColor = 'gold'
          thisHeroFavouriteButton.style.color = '#darkred'
          thisHeroFavouriteButton.innerHTML = `<span class="RightEnd">  <i class="fa-solid fa-heart fa-beat"
            style="--fa-animation-duration: 1s;"> </i></span>`
        } else {
          thisHeroFavouriteButton.style.backgroundColor = 'darkred'
          thisHeroFavouriteButton.style.color = 'white'
          thisHeroFavouriteButton.innerHTML = `<span class="LeftEnd"> <i class="fa-regular fa-heart"></i> </span>`
          // thisHeroFavouriteButton.addEventListener('mouseover', mOver, false)
          // thisHeroFavouriteButton.addEventListener('mouseout', mOut, false)
        }

        //Toogle between Like and Dislike button
        thisHeroFavouriteButton.onclick = function (event) {
          LikeDislikeToggle(event, thisHero.id, thisHeroFavouriteButton)
        }

        //Append all information about hero to the particular hero card container and finally update the whole HerosContainer
        thisHeroContainer.appendChild(thisHeroImage)
        thisHeroContainer.appendChild(thisHeroName)
        thisHeroContainer.appendChild(thisHeroFavouriteButton)
        HerosContainer.appendChild(thisHeroContainer)
      }
    }
  }
  xhr.open('get', searchHeroURL, true)
  xhr.send()
}

//Like Dislike function toggle when clicked on heart button
function LikeDislikeToggle (event, thisHeroID, thisHeroFavouriteButton) {
  // function mOver () {
  //   thisHeroFavouriteButton.innerHTML = `<span class="LeftEnd">  <i class="fa-regular fa-heart fa-shake"
  //         style="--fa-animation-duration: 3s;"> </i></span>`
  // }
  // function mOut () {
  //   thisHeroFavouriteButton.innerHTML = `<span class="LeftEnd">  <i class="fa-regular fa-heart"> </i></span>`
  // }

  //Getting all liked heros from the ID we created above
  var likedRequiredData = JSON.parse(localStorage.getItem('likedHerosUniqueID'))
  // console.log(likedRequiredData)
  // console.log(thisHeroID)
  //Dislike button will work if hero is already liked and vice versa
  if (likedRequiredData.includes(thisHeroID)) {
    console.log('Dislike')
    // thisHeroFavouriteButton.addEventListener('mouseover', mOver, false)
    // thisHeroFavouriteButton.addEventListener('mouseout', mOut, false)
    // circle.classList.add('margin-left-95Percent')
    thisHeroFavouriteButton.style = `color:white; background-color:darkred; transition-duration: 1s; border-radius:30px;cursor: grabbing;`
    thisHeroFavouriteButton.innerHTML = `<span class="LeftEnd"> <i class="fa-regular fa-heart"  style="transition-duration: 1s;"></i> </span>`
    deleteThisHeroFromFavourites(event, thisHeroID, likedRequiredData)
  } else {
    console.log('Like')
    // thisHeroFavouriteButton.removeEventListener('mouseover', mOver, false)
    // thisHeroFavouriteButton.removeEventListener('mouseout', mOut, false)
    // circle.classList.remove('margin-left-95Percent')
    thisHeroFavouriteButton.style = `color:white; background-color:gold; transition-duration: 1s; border-radius:30px; cursor: grabbing;`
    thisHeroFavouriteButton.innerHTML = `<span class="RightEnd">  <i class="fa-solid fa-heart fa-beat"
    style="--fa-animation-duration: 1s; transition-duration: 1s;"> </i></span>`

    //Adding hero's ID to the liked array list
    likedRequiredData.push(thisHeroID)
  }
  //Setting updated hero list to the liked unique ID storage
  localStorage.setItem('likedHerosUniqueID', JSON.stringify(likedRequiredData))
  //Adding Event stop propagation, so that it'll not open the hero page along with it
  event.stopPropagation()
}

//Function to delete hero from our favourites
function deleteThisHeroFromFavourites (event, DeleteThisHeroID, likedHeros) {
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

  //Adding Event stop propagation, so that it'll not open the hero page along with it
  event.stopPropagation()
}

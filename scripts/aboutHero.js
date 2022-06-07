//Creating new XMLHttpRequest
var xhr = new XMLHttpRequest()

//Getting Hero Unique ID from local storage
let thisHeroUniqueID = localStorage.getItem('RedirectToThisHeroPage')
console.log('HeroUniqueID:', thisHeroUniqueID)

//Getting Hero Unique URL from local storage
var thisHeroUniqueURL =
  `https://superheroapi.com/api.php/4824088724386168/` + thisHeroUniqueID

//It'll show results as soon as the ReadyState property of the XMLHttpRequest change
xhr.onreadystatechange = function () {
  //xhr.readyState = 4, when onLoad is Done
  //status code = 200, when request has succeeded

  if (this.readyState == 4 && this.status == 200) {
    //responseText returns the text received from a server
    var requiredData = JSON.parse(this.responseText)
    console.log('AboutThisHero:', requiredData)

    //Hero image from the server
    let HeroImage = document.getElementById('heroImage')
    HeroImage.setAttribute('src', requiredData.image.url)

    HeroImage.onerror = function () {
      //Hide Image if error occurs
      HeroImage.style.display = 'none'
      // thisHeroImage.alt = `Sadly, we don't own the copyrights for this image :(`
      HeroImage.alt = ``
      //If don't want to hide image, but wants to show error image instead
      HeroImage.style = `background-image:url('/images/404.png');background-size: cover;`
    }

    //Set name of the superhero to inner text
    if (
      requiredData.name.length != 0 &&
      requiredData.biography['full-name'].length != 0 &&
      requiredData.name == requiredData.biography['full-name']
    ) {
      // document.getElementById('SuperHeroName').innerText = requiredData.name
      document.getElementById('SuperHeroNameContainer').innerText =
        'Hero Name: '
      document.getElementById('SuperHeroName').innerText = requiredData.name
      document.getElementById('RealNameContainer').innerText = ''
    } else {
      if (requiredData.name.length == 0) {
        document.getElementById('SuperHeroNameContainer').innerText = ''
      } else {
        document.getElementById('SuperHeroName').innerText = requiredData.name
      }

      if (requiredData.biography['full-name'].length == 0) {
        document.getElementById('RealNameContainer').innerText = ''
      } else {
        document.getElementById('RealName').innerText =
          requiredData.biography['full-name']
      }
    }

    // Check if superhero is good or bad and set its image accordingly
    let GoodOrBad = document.getElementById('GoodOrBad')
    if (requiredData.biography.alignment == 'good') {
      GoodOrBad.setAttribute('src', './images/heaven.png')
    } else if (requiredData.biography.alignment == 'bad') {
      GoodOrBad.setAttribute('src', './images/evil.png')
    }

    //Getting Hero's appearance characteristics
    let gender = document.getElementById('genderOfPerticularHero')
    if (requiredData.appearance.gender == 'Male') {
      gender.innerText = 'Gender: ' + 'Male'
    } else if (requiredData.appearance.gender == 'Female') {
      gender.innerText = 'Gender: ' + 'Female'
    } else {
      gender.innerText = 'Gender: Other'
    }

    let race = document.getElementById('raceOfPerticularHero')
    if (requiredData.appearance.race != 'null') {
      race.innerText = 'Race: ' + requiredData.appearance.race
    } else {
      race.innerText = 'Race: undefined'
    }

    let height = document.getElementById('heightOfPerticularHero')
    if (requiredData.appearance.height[0] != 'null') {
      height.innerText =
        'Height: ' +
        requiredData.appearance.height[0] +
        ' / ' +
        requiredData.appearance.height[1]
    } else {
      height.innerText = 'Height: undefined'
    }

    let weight = document.getElementById('weightOfPerticularHero')
    if (requiredData.appearance.weight[1] != 'null') {
      weight.innerText =
        'Weight: ' +
        requiredData.appearance.weight[0] +
        ' / ' +
        requiredData.appearance.weight[1]
    } else {
      weight.innerText = 'Weight: undefined'
    }

    let eyeColor = document.getElementById('eyeColorOfPerticularHero')
    if (requiredData.appearance['eye-color'] != 'null') {
      eyeColor.innerText = 'Eyes: ' + requiredData.appearance['eye-color']
    } else {
      eyeColor.innerText = 'Eyes: undefined'
    }

    let hairColor = document.getElementById('hairColorOfPerticularHero')
    if (requiredData.appearance['hair-color'] != 'null') {
      hairColor.innerText = 'Hair: ' + requiredData.appearance['hair-color']
    } else {
      hairColor.innerText = 'Hair: undefined'
    }

    //Getting Hero's Powerstat characteristics
    let combat = document.getElementById('combatOfPerticularHero')
    if (requiredData.powerstats.combat != 'null') {
      combat.innerHTML = 'Combat: ' + requiredData.powerstats.combat
    } else {
      combat.innerHTML = 'Combat: undefined'
    }

    let durability = document.getElementById('durabilityOfPerticularHero')
    if (requiredData.powerstats.durability != 'null') {
      durability.innerHTML = 'Durability: ' + requiredData.powerstats.durability
    } else {
      durability.innerHTML = 'Durability: undefined'
    }

    let intelligence = document.getElementById('intelligenceOfPerticularHero')
    if (requiredData.powerstats.intelligence != 'null') {
      intelligence.innerHTML =
        'Intelligence: ' + requiredData.powerstats.intelligence
    } else {
      intelligence.innerHTML = 'Intelligence: undefined'
    }

    let power = document.getElementById('powerOfPerticularHero')
    if (requiredData.powerstats.power != 'null') {
      power.innerHTML = 'Power: ' + requiredData.powerstats.power
    } else {
      power.innerHTML = 'Power: undefined'
    }

    let speed = document.getElementById('speedOfPerticularHero')
    if (requiredData.powerstats.speed != 'null') {
      speed.innerHTML = 'Speed: ' + requiredData.powerstats.speed
    } else {
      speed.innerHTML = 'Speed: undefined'
    }

    let strength = document.getElementById('strengthOfPerticularHero')
    if (requiredData.powerstats.strength != 'null') {
      strength.innerHTML = 'Strength: ' + requiredData.powerstats.strength
    } else {
      strength.innerHTML = 'Strength: undefined'
    }
  }
}

xhr.open('get', thisHeroUniqueURL, true)
xhr.send()

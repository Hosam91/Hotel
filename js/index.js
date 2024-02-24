// sidebar for navigation

document.addEventListener('DOMContentLoaded', function () {
  const menuBar = document.querySelector('.menu-bar')
  const sidebar = document.getElementById('sidebar-nav')

  // Toggle sidebar on menu bar click
  menuBar.addEventListener('click', function (event) {
    sidebar.classList.toggle('active')
    event.stopPropagation() // Prevent click from immediately propagating to document
  })

  // Close sidebar when clicking outside
  document.addEventListener('click', function (event) {
    const isClickInsideSidebar = sidebar.contains(event.target)
    const isClickInsideMenuBar = menuBar.contains(event.target)

    if (
      !isClickInsideSidebar &&
      !isClickInsideMenuBar &&
      sidebar.classList.contains('active')
    ) {
      sidebar.classList.remove('active')
    }
  })
})

//Toogling drop down menu

document.addEventListener('DOMContentLoaded', function () {
  var avatar = document.querySelector('.user-avatar')
  var dropdown = document.querySelector('.user-menu-dropdown')

  avatar.addEventListener('click', function (event) {
    dropdown.style.display =
      dropdown.style.display === 'none' ? 'block' : 'none'
    event.stopPropagation() // Prevent click from immediately propagating to the document
  })

  document.addEventListener('click', function (event) {
    var isClickInside =
      avatar.contains(event.target) || dropdown.contains(event.target)

    if (!isClickInside) {
      dropdown.style.display = 'none'
    }
  })

  dropdown.addEventListener('click', function (event) {
    event.stopPropagation() // Prevent clicks within the dropdown from propagating to the document
  })
})

// Dark Mode Toggle Button

document.addEventListener('DOMContentLoaded', function () {
  const body = document.body
  const darkModeToggle = document.getElementById('dark-mode-toggle')

  // Function to apply dark mode
  function applyDarkMode() {
    body.classList.add('dark-mode')
    localStorage.setItem('darkMode', 'enabled')
  }

  // Function to remove dark mode
  function removeDarkMode() {
    body.classList.remove('dark-mode')
    localStorage.removeItem('darkMode')
  }

  // Check for saved user preference, if any
  if (localStorage.getItem('darkMode') === 'enabled') {
    applyDarkMode()
  }

  // Toggle dark mode on button click
  darkModeToggle.addEventListener('click', function () {
    if (body.classList.contains('dark-mode')) {
      removeDarkMode()
    } else {
      applyDarkMode()
    }
  })
})

//Auto Compleate Functions

let cities = ['Cairo', 'Alexandria', 'Aswan', 'Dubai', 'Ryadah', 'Abu Dabi']
let nationalites = [
  {
    name: 'Egyptian',
    flag: 'egypt.png',
  },
  {
    name: 'American',
    flag: 'usa.png',
  },
   
  {
    name: 'German',
    flag: 'german.png',
  },
  
]

const destination = document.getElementById('destination')
const nationality = document.getElementById('nationality')
const destinationWrapper = document.querySelector('.destination-wrapper')
const nationalityWrapper = document.querySelector('.nationality-wrapper')
const resultsWrapper = document.querySelector('.results')

function autoCmpleate(inputName, searchWrapper, searchable) {
  let results = []
  let input = inputName.value.toLowerCase()
  if (input.length >= 2) {
    results = searchable.filter((item) => {
      //nationality Case
      if (item.name) {
        if (item.name.toLowerCase().startsWith(input)) {
          return item
        }
      } else {
        return item.toLowerCase().startsWith(input)
      }
    })
  }

  renderResults(results, searchWrapper, inputName)
}

function renderResults(results, searchWrapper, inputName) {
  if (!results.length) {
    return searchWrapper.classList.remove('show')
  }

  const content = results
    .map((item) => {
      //nationality Case
      if (item.name) {
        const { name, flag } = item
        inputName.value = name
        return `<li onclick="fillInput('${name}','${inputName}'   )">
        <span>${name}</span> <img src="./images/flags/${flag}" style= 'width:50px;height:20px'  > </li>`
      }
      inputName.value = item
      return `<li onclick="fillInput('${item}','${inputName}' )">${item}</li>`
    })
    .join('')
  searchWrapper.classList.add('show')
  searchWrapper.querySelector('ul').innerHTML = content
}

function fillInput(listItem, inputName) {
  inputName.value = listItem.textContent
  const resultsWrapper = document.querySelector('.results')
  resultsWrapper.innerHTML = '' // Hide results after selection
}

destination.addEventListener('keyup', () =>
  autoCmpleate(destination, destinationWrapper, cities),
)
nationality.addEventListener('keyup', () =>
  autoCmpleate(nationality, nationalityWrapper, nationalites),
)

// Dates Functions
// Get the input elements
const checkInInput = document.getElementById('check-in')
const checkOutInput = document.getElementById('check-out')
const nightsInput = document.getElementById('nights')

const calculateNights = () => {
  // Get the values from the inputs
  const checkInDate = new Date(checkInInput.value)
  const checkOutDate = new Date(checkOutInput.value)

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = checkOutDate - checkInDate

  // Convert milliseconds to days (1000 milliseconds * 60 seconds * 60 minutes * 24 hours)
  const countNights = differenceInMilliseconds / (1000 * 60 * 60 * 24)
  nightsInput.value = countNights
}

// Function to update the check-out date based on nights input
function updateCheckOutDate() {
  // Check if the check-in date is valid
  if (checkInInput.value) {
    // Get the check-in date
    const checkInDate = new Date(checkInInput.value)

    // Calculate the check-out date by adding the number of nights to the check-in date
    const numberOfNights = parseInt(nightsInput.value, 10)
    if (!isNaN(numberOfNights)) {
      const checkOutDate = new Date(checkInDate)
      checkOutDate.setDate(checkInDate.getDate() + numberOfNights)

      // Update the check-out date input
      // Format the date as YYYY-MM-DD for the date input value
      const formattedCheckOutDate = checkOutDate.toISOString().split('T')[0]
      checkOutInput.value = formattedCheckOutDate
    }
  } else {
    alert('Please select a check-in date first.')
  }
}

// Event listener for the nights input
checkOutInput.addEventListener('input', calculateNights)
checkInInput.addEventListener('input', calculateNights)
nightsInput.addEventListener('input', updateCheckOutDate)

// Get the modal
const modal = document.getElementById('myModal')

const btn = document.getElementById('myBtn')

const span = document.getElementsByClassName('close')[0]

btn.onclick = function () {
  modal.style.display = 'block'
}

//close Modal
const confirtBtn = document.querySelector('.modal-btn')
const closeX = document.querySelector('.close')

function closeModal() {
  modal.style.display = 'none'
}
span.onclick = function () {
  modal.style.display = 'none'
}
confirtBtn.addEventListener('click', closeModal)
closeX.addEventListener('click', closeModal)

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}

//Room Type Functions

document.getElementById('persons').addEventListener('change', updateRoomTypes)
document.getElementById('beds').addEventListener('change', updateRoomTypes)

function updateRoomTypes() {
  var persons = document.getElementById('persons').value
  var beds = document.getElementById('beds').value
  var roomTypeSelect = document.getElementById('roomType')

  roomTypeSelect.innerHTML = ''

  var roomTypes = getRoomTypes(persons, beds)

  roomTypes.forEach(function (type) {
    var option = document.createElement('option')
    option.value = type
    option.textContent = type
    roomTypeSelect.appendChild(option)
  })
}

function getRoomTypes(persons, beds) {
  var types = []
  if (persons == 1 && beds == 1) {
    types = ['Single']
  } else if (persons <= 2 && beds == 1) {
    types = ['Double']
  } else if (persons <= 2 && beds == 2) {
    types = ['Twin']
  } else if (persons > 2) {
    types = ['Suite', 'Family Room']
  }

  return types.length > 0 ? types : ['No available room types']
}

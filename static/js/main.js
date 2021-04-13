// mobile menu
// mobile menu button
const mobileMenuBtn = document.getElementById('mobile-navigation-btn');
// mobile header
const mobileHeader = document.getElementById('header');
// mobile menu
const mobileMenu = document.getElementById('mobile-menu');
// mobile icon open
const menuIconOpen = document.getElementById('mobile-menu-icon-open');
// mene icon closed
const menuIconClosed = document.getElementById('mobile-menu-icon-closed');

// recipe page

// breakfast menu button
const buttonMenuBreakfast = document.getElementById('button-menu-breakfast');
// lunch menu button
const buttonMenuLunch = document.getElementById('button-menu-lunch');
// snacks menu buttom
const buttonMenuSnacks = document.getElementById('button-menu-snacks');
// accordion list
const recipeDataDiv = document.querySelectorAll('#accordion-recipe-list');
// accordion icons
const buttonAccordionDropdown = document.querySelectorAll(
  '#button-accordion-dropdown'
);
//accordion inner container
const recipeData = document.querySelectorAll('#recipe-data');

const breakfastContainer = document.getElementById('breakfast-container');
const lunchContainer = document.getElementById('lunch-container');
const snacksContainer = document.getElementById('snacks-container');

// users recipe page
// recipe container first div element
const userRecipeContainerDiv = document.querySelectorAll(
  '#user-recipe-container > div'
);
// recipe container ul element
const userRecipeContainerUl = document.querySelectorAll(
  '#user-recipe-container ul'
);
// recipe container first div element
const fadeSectionDiv = document.querySelectorAll('#fade-section');
// expand text button
const buttonExpandText = document.querySelectorAll('#button-expand-text');
// expand text image
const buttonExpandImage = document.querySelectorAll('#expand-text-img');
// close expand text image
const buttonCloseExpandImage = document.querySelectorAll('#expand-text-close');

// Delete button users recipe
const buttonDeleteRecipe = document.querySelectorAll('#button-delete-recipe');
// cancel button users recipe
const buttonCancelDelete = document.querySelectorAll('#button-cancel-delete');
// confirm delete button users recipe
const UserRecipeDeleteContainer = document.querySelectorAll(
  '#recipe-delete-container'
);

// mobile menu dropdown
mobileMenuBtn.onclick = () => {
  mobileHeader.classList.toggle('mobile-menu-expand');
  menuIconOpen.classList.toggle('hidden');
  menuIconClosed.classList.toggle('hidden');
  mobileMenu.classList.toggle('h-5/6');
};

// users recipe page
// displays hidden recipe info
for (let i = 0; i < userRecipeContainerUl.length; i++) {
  buttonExpandText[i].onclick = () => {
    userRecipeContainerUl[i].classList.toggle('recipe-container-expand');
    userRecipeContainerDiv[i].classList.toggle('recipe-container-space');
    fadeSectionDiv[i].classList.toggle('remove-height');
    buttonExpandImage[i].classList.toggle('hidden');
    buttonCloseExpandImage[i].classList.toggle('hidden');
  };
}

for (let i = 0; i < buttonDeleteRecipe.length; i++) {
  buttonDeleteRecipe[i].onclick = () => {
    UserRecipeDeleteContainer[i].classList.remove('hidden');
  };
}

for (let i = 0; i < buttonCancelDelete.length; i++) {
  buttonCancelDelete[i].onclick = () => {
    UserRecipeDeleteContainer[i].classList.add('hidden');
  };
}

//recipes page
// displays hidden recipes from menu

buttonMenuBreakfast.onclick = () => {
  if (breakfastContainer.classList.contains('hidden')) {
    breakfastContainer.classList.toggle('hidden');
  }
  buttonMenuBreakfast.classList.add('menu-button-active');

  lunchContainer.classList.add('hidden');
  snacksContainer.classList.add('hidden');

  buttonMenuLunch.classList.remove('menu-button-active');
  buttonMenuSnacks.classList.remove('menu-button-active');
};

buttonMenuLunch.onclick = () => {
  if (lunchContainer.classList.contains('hidden')) {
    lunchContainer.classList.toggle('hidden');
  }
  buttonMenuLunch.classList.add('menu-button-active');

  breakfastContainer.classList.add('hidden');
  snacksContainer.classList.add('hidden');

  buttonMenuBreakfast.classList.remove('menu-button-active');
  buttonMenuSnacks.classList.remove('menu-button-active');
};

buttonMenuSnacks.onclick = () => {
  if (snacksContainer.classList.contains('hidden')) {
    snacksContainer.classList.toggle('hidden');
  }
  buttonMenuSnacks.classList.add('menu-button-active');

  breakfastContainer.classList.add('hidden');
  lunchContainer.classList.add('hidden');

  buttonMenuBreakfast.classList.remove('menu-button-active');
  buttonMenuLunch.classList.remove('menu-button-active');
};

// displays accordion recipe hidden content
for (let i = 0; i < buttonAccordionDropdown.length; i++) {
  buttonAccordionDropdown[i].onclick = () => {
    recipeData[i].classList.toggle('accordion-recipe-list-expand');
    buttonAccordionDropdown[i].classList.toggle('accordion-icon-active');
  };
}

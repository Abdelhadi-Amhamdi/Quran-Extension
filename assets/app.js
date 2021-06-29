// selects

const section = document.querySelector(".quran-text");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
const menu = document.querySelector(".menu");
const bars = document.querySelector(".bars");
const close = document.querySelector(".close");
const sura_selection = document.querySelector(".sura_selection");
const Backgrounds_images = document.querySelectorAll(".bg");
const background_image = document.querySelector(".bg-image");
const language_selection = document.querySelector(".lang_selection");
const number_of_ayat_selection = document.querySelector(".num_selection");
const select = document.querySelector('#number')
const allOption = select.querySelectorAll('option')
const numberofayat = localStorage.getItem('numofaya')
const optionsec = document.getElementById(`op${numberofayat}`)

// local variables

let currentText;
let arr;
let R;
let sura;
let src ;
let numofAya

// events

// get content
document.addEventListener("DOMContentLoaded", () => {
  
  allOption.forEach(option => {
    option.removeAttribute('selected')
  })
  optionsec.setAttribute('selected' , 'selected')
  
  R = (Math.random() * 100).toFixed();
  import("../data/content.js").then((text) => {
    arr = text.content;
    if(Number(numberofayat) == 1) {
      currentText = arr[R].aya
      section.textContent = currentText;
    }
    if(Number(numberofayat) == 2) {
      currentText = arr[R].aya + arr[Number(R) + 1].aya
      section.textContent = currentText;
    }
    if(Number(numberofayat) == 3) {
      currentText = arr[R].aya + arr[Number(R) + 1].aya + arr[Number(R) + 2].aya
      section.innerText = currentText;
    }
    if(Number(numberofayat) == null) {
      currentText = arr[R].aya
      section.textContent = currentText;
    }
    
    const img = document.querySelector('.bg-image')
    src = localStorage.getItem('backgound')
    img.setAttribute('src', src)
  });
});

number_of_ayat_selection.addEventListener("change", getMulAya);

// change background image
Backgrounds_images.forEach((item) => {
  item.addEventListener("click", (e) => {
    const new_src = e.target.src;
    background_image.setAttribute("src", new_src);
    const image = localStorage.getItem('background')
    if(image === null )  {
      localStorage.setItem('backgound' , new_src)
    }
    Backgrounds_images.forEach((img) => {
      img.classList.remove("active");
    });
    if (!item.classList.contains("active")) {
      item.classList.add("active");
    }
  });
});

sura_selection.addEventListener("change", getAyat);

// get specific sura content
function getAyat(e) {
  const data = e.target.value;
  if (data === "Random") {
    currentText = arr[R].aya;
    section.textContent = currentText;
  } else {
    const spc = arr.filter((item) => item.sura === data);
    R = 0;
    currentText = spc[R].aya;
    section.textContent = currentText;
  }
}

// get multiple ayat
function getMulAya(e) {
  numofAya = e.target.value;
  localStorage.setItem('numofaya' , numofAya)
  if (numofAya === "1") {
    currentText = arr[R].aya;
    section.textContent = currentText;
  }
  if (numofAya === "2") {
    currentText = arr[R].aya + arr[Number(R) + 1].aya;
    section.textContent = currentText;
  }
  if (numofAya === "3") {
    currentText = arr[R].aya + arr[Number(R) + 1].aya + arr[Number(R) + 2].aya;
    section.textContent = currentText;
  }
  console.log(currentText);
}

language_selection.addEventListener("change", getEnAyat);

// get english content
function getEnAyat(e) {
  const data = e.target.value;
  if (data === "English") {
    currentText = arr[R].ayaEn;
    section.textContent = currentText;
  } else {
    currentText = arr[R].aya;
    section.textContent = currentText;
  }
}

// btn open menu
bars.addEventListener("click", () => {
  menu.classList.add("show");
  close.classList.add("show");
});

// btn close menu
close.addEventListener("click", () => {
  menu.classList.remove("show");
  close.classList.remove("show");
});

// next btn to go the next aya
nextButton.addEventListener("click", () => {
  if (R < arr.length) {
    R = Number(R) + 1;
    currentText = arr[R].aya;
    section.textContent = currentText;
  }
});

// previous btn to back to first state
prevButton.addEventListener("click", () => {
  if (R > 0) {
    R = Number(R) - 1;
    currentText = arr[R].aya;
    section.textContent = currentText;
  } else {
    R = 0;
  }
});

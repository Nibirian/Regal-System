const footerYear = document.querySelector(".footer__year");

const cookieBox = document.querySelector(".cookie-box");
const cookieBtn = document.querySelector(".cookie-btn");

const navMobile = document.querySelector(".nav-mobile");
const navBtn = document.querySelector(".hamburger");
const allNavItems = document.querySelectorAll(".nav-link");

const sliderBox = document.querySelector(".slider-box");
const leftBtn = document.querySelector(".btn-slider-left");
const rightBtn = document.querySelector(".btn-slider-right");
const carouselImages = document.querySelectorAll(".slider-img");

const navBar = document.querySelector(".nav-bar");
const nav = document.querySelector(".nav");

const belt = document.querySelector(".upper-belt");

const handleNav = () => {
	navMobile.classList.toggle("nav-mobile--active");

	navBtn.classList.toggle("is-active");

	belt.style.zIndex = "1";

	allNavItems.forEach((item) => {
		item.addEventListener("click", () => {
			navBtn.classList.remove("is-active");
			belt.style.zIndex = "2000";
		});
	});
	allNavItems.forEach((item) => {
		item.addEventListener("click", () => {
			navMobile.classList.remove("nav-mobile--active");
		});
	});
};

navBtn.addEventListener("click", handleNav);

//=================================================================

const handleCurrentYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = year;
};
handleCurrentYear();

//================================================================
const images = document.querySelectorAll(".product__boxes img");
let imgSrc;
// get images src onclick
images.forEach((img) => {
	img.addEventListener("click", (e) => {
		imgSrc = e.target.src;
		//run modal function
		imgModal(imgSrc);
	});
});
//creating the modal
let imgModal = (src) => {
	const modal = document.createElement("div");
	modal.setAttribute("class", "modal");
	//add the modal to the main section or the parent element
	document.querySelector(".product__bigbox").append(modal);
	//adding image to modal
	const newImage = document.createElement("img");
	newImage.setAttribute("src", src);
	//creating the close button
	const closeBtn = document.createElement("i");
	closeBtn.setAttribute("class", "fas fa-times closeBtn");
	//close function
	closeBtn.onclick = () => {
		modal.remove();
	};
	modal.append(newImage, closeBtn);
};
//================================================================
const showCookie = () => {
	const cookieEaten = localStorage.getItem("cookie");
	if (cookieEaten) {
		cookieBox.classList.add("hide");
	}
};

const handleCookieBox = () => {
	localStorage.setItem("cookie", "true");
	cookieBox.classList.add("hide");
};

cookieBtn.addEventListener("click", handleCookieBox);
showCookie();

//================================================================
let mybutton = document.getElementById("goToTopBtn");

window.onscroll = function () {
	scrollFunction();
};

function scrollFunction() {
	if (
		document.body.scrollTop > 370 ||
		document.documentElement.scrollTop > 370
	) {
		mybutton.style.display = "block";
	} else {
		mybutton.style.display = "none";
	}
}

function topFunction() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}



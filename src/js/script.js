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

const elts = {
	text1: document.getElementById("text1"),
	text2: document.getElementById("text2"),
};

const texts = [
	"Organizujemy przestrzeń",
	"Dbamy o bezpieczeństwo",
	"Gwarantujemy najwyższą jakość",
];

const morphTime = 1;
const cooldownTime = 2;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
	morph -= cooldown;
	cooldown = 0;

	let fraction = morph / morphTime;

	if (fraction > 1) {
		cooldown = cooldownTime;
		fraction = 1;
	}

	setMorph(fraction);
}

function setMorph(fraction) {
	elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

	fraction = 1 - fraction;
	elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

	elts.text1.textContent = texts[textIndex % texts.length];
	elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
	morph = 0;

	elts.text2.style.filter = "";
	elts.text2.style.opacity = "100%";

	elts.text1.style.filter = "";
	elts.text1.style.opacity = "0%";
}

function animate() {
	requestAnimationFrame(animate);

	let newTime = new Date();
	let shouldIncrementIndex = cooldown > 0;
	let dt = (newTime - time) / 1000;
	time = newTime;

	cooldown -= dt;

	if (cooldown <= 0) {
		if (shouldIncrementIndex) {
			textIndex++;
		}

		doMorph();
	} else {
		doCooldown();
	}
}

animate();

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
//=====================================================================

const buttoncheckbox = document.querySelector(".contact__form-btnbox");

const navBar = document.querySelector(".nav-bar");
const nav = document.querySelector(".nav");

const belt = document.querySelector(".upper-belt");

let box = document.querySelector(".slider");
const carouselWidth = box.offsetWidth;
const carouselSpeed = 2500;

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

let index = 0;

const handleCarousel = () => {
	index++;
	changeImage();
};

let startCarousel = setInterval(handleCarousel, carouselSpeed);

const changeImage = () => {
	if (index > carouselImages.length - 1) {
		index = 0;
	} else if (index < 0) {
		index = carouselImages.length - 1;
	}

	sliderBox.style.transform = `translateX(${-index * carouselWidth}px)`;
};

const handleRightArrow = () => {
	index++;
	resetInterval();
};

const handleLeftArrow = () => {
	index--;
	resetInterval();
};

const resetInterval = () => {
	changeImage();
	clearInterval(startCarousel);
	startCarousel = setInterval(handleCarousel, carouselSpeed);
};

rightBtn.addEventListener("click", handleRightArrow);

leftBtn.addEventListener("click", handleLeftArrow);

//=======================================================

let checkbox = document.getElementById("accept");
checkbox.addEventListener("change", () => {
	if (checkbox.checked) {
		buttoncheckbox.classList.remove("disabled");
	} else {
		buttoncheckbox.classList.add("disabled");
	}
});

const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
	const formData = new FormData(form);
	e.preventDefault();
	var object = {};
	formData.forEach((value, key) => {
		object[key] = value;
	});
	var json = JSON.stringify(object);
	result.classList.add("response-text");
	result.innerHTML = "Proszę czekać...";

	fetch("https://api.web3forms.com/submit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: json,
	})
		.then(async (response) => {
			let json = await response.json();
			if (response.status == 200) {
				result.innerHTML = json.message;
				result.classList.remove("response-text");
				result.innerHTML = "Dziękujemy. Skontaktujemy się z Tobą niebawem!";
				result.classList.add("response-text--color");
			} else {
				console.log(response);
				result.innerHTML = json.message;
				result.classList.remove("response-text");
				result.classList.add("response-text--red");
			}
		})
		.catch((error) => {
			console.log(error);
			result.innerHTML =
				"Coś poszło nie tak. Prosimy o sprawdzenie poprawności danych bądź kontakt telefoniczny.";
		})
		.then(function () {
			form.reset();
			setTimeout(() => {
				result.style.display = "none";
			}, 5000);
		});
});

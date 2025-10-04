const openBtn = document.querySelector(".openBtn");
const hdr = document.querySelector("header");

const closeBtn = document.querySelector(".closeButton");

const body = document.querySelector("body");
const allLi = document.querySelectorAll("li");

allLi.forEach((li) => {
	li.addEventListener("click", (e) => {
		alert(`You have clicked ${e.target.innerText}`);
		hdr.classList.remove("active");
	});
});

openBtn.addEventListener("click", (e) => {
	hdr.classList.add("active");
	e.stopPropagation();

	body.addEventListener("click", handleOutsideClick);
});

closeBtn.addEventListener("click", (e) => {
	hdr.classList.remove("active");
	e.stopPropagation();

	body.removeEventListener("click", handleOutsideClick);
});

function handleOutsideClick(e) {
	if (!hdr.contains(e.target)) {
		e.stopPropagation();
		console.log("Inside dddddbody");

		hdr.classList.remove("active");
	}

	body.removeEventListener("click", handleOutsideClick);
}

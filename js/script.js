console.clear();
const sliderProps = {
	fill: "#0B1EDF",
	background: "rgba(255, 255, 255, 0.214)",
};
const slider = document.querySelector(".range__slider");
const sliderValue = document.querySelector(".length__title");
slider.querySelector("input").addEventListener("input", event => {
	sliderValue.setAttribute("data-length", event.target.value);
	applyFill(event.target);
});
applyFill(slider.querySelector("input"));
function applyFill(slider) {
	const percentage = (100 * (slider.value - slider.min)) / (slider.max - slider.min);
	const bg = `linear-gradient(90deg, ${sliderProps.fill} ${percentage}%, ${sliderProps.background} ${percentage +
		0.1}%)`;
	slider.style.background = bg;
	sliderValue.setAttribute("data-length", slider.value);
}
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("slider");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy-btn");
const resultContainer = document.querySelector(".result");
const copyInfo = document.querySelector(".result__info.right");
const copiedInfo = document.querySelector(".result__info.left");
let resultContainerBound = {
	left: resultContainer.getBoundingClientRect().left,
	top: resultContainer.getBoundingClientRect().top,
};
resultContainer.addEventListener("mousemove", e => {
	copyBtn.style.setProperty("--x", `${e.x - resultContainerBound.left}px`);
	copyBtn.style.setProperty("--y", `${e.y - resultContainerBound.top}px`);
});
window.addEventListener("resize", e => {
	resultContainerBound = {
		left: resultContainer.getBoundingClientRect().left,
		top: resultContainer.getBoundingClientRect().top,
	};
});

copyBtn.addEventListener("click", () => {
	const textarea = document.createElement("textarea");
	const password = resultEl.innerText;
	if (!password || password == "CLICK GENERATE") {
		return;
	}
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	textarea.remove();

	copyInfo.style.transform = "translateY(200%)";
	copyInfo.style.opacity = "0";
	copiedInfo.style.transform = "translateY(0%)";
	copiedInfo.style.opacity = "0.75";
});

generateBtn.addEventListener("click", () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numberEl.checked;
	const hasSymbol = symbolEl.checked;
	resultEl.innerText = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
	copyInfo.style.transform = "translateY(0%)";
	copyInfo.style.opacity = "0.75";
	copiedInfo.style.transform = "translateY(200%)";
	copiedInfo.style.opacity = "0";
});

function generatePassword(length, lower, upper, number, symbol) {
	let generatedPassword = "";
	let symbols = "";
	const typesCount = lower + upper + number + symbol;
	
	if(lower){
		symbols += 'abcdefghijklmnopqrstuvwxyz';
	}
	if(upper){
		symbols += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	}
	if(number){
		symbols += '0123456789';
	}
	if(symbol){
		symbols += '~!@#$%^&*()_+{}":?><;.,';
	}
	if (typesCount === 0) {
		symbols += '0123456789';
	}
	for (let i = 0; i < length; i++) {
			generatedPassword += symbols[Math.floor(Math.random() * symbols.length)];
	}
	return generatedPassword.slice(0, length);
}
function getRandom(range) {
	return Math.floor(Math.random() * range);
}

function pickRGB() {
	return {
		r: getRandom(255),
		g: getRandom(255),
		b: getRandom(255)
	};
}

export { pickRGB };

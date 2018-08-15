function setup() {
	createCanvas(windowWidth, windowHeight);
	img = loadImage("./flower.jpg")
	// loadPixels(img)
	// c = img.get(0,0,img.width,img.height)
	// console.log(c)
	cols = []
	// console.log(pixels)
	for (x=0;x<=img.width;x++) {
		for (y=0;y<=img.height;y++) {
			cols.push(img.get(x,y))
			console.log(img.get(x,y))
		}
	}
	// console.log("COLORS ARE: ", cols)

}

function draw() {
	

}
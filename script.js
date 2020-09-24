const images = document.querySelector('.content')
const loader = document.querySelector('.loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photos = []
let initialLoad = true

let count = 5
const apiKey = 'q4MDzD6aKB45Ysqhr05BYA_CCllHVwt6P-vh69_7HiI'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

const imageLoaded = () => {
	imagesLoaded++
	if (imagesLoaded === totalImages) {
		ready = true
		loader.hidden = true
		initialLoad = false
		count = 30
	}
}

function displayPhotos() {
	imagesLoaded = 0
	totalImages = photos.length

	photos.forEach(photo => {
		const item = document.createElement('a')
		item.setAttribute('href', photo.links.html)
		item.setAttribute('target', '_blank')

		const img = document.createElement('img')
		img.setAttribute('src', photo.urls.regular)
		img.setAttribute('alt', photo.alt_description)
		img.setAttribute('title', photo.alt_description)
		img.classList.add('image')

		img.addEventListener('load', imageLoaded())

		item.appendChild(img)
		images.appendChild(img)
	})
	
}

async function getPhotos() {
	try {
		const response = await fetch(apiUrl)
		photos = await response.json()
		displayPhotos(photos)
	} catch (err) {
		
	}
}

window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
		ready = false
		getPhotos()
	} 
})

getPhotos()

const validSpecialChars = '~`!@#$%^&*()_-+={[}]|\\:;"\'<,>.?/'

const visualKeys = [
	// Animals
	{name: 'Bat', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Big-eared-townsend-fledermaus.jpg/440px-Big-eared-townsend-fledermaus.jpg'},
	{name: 'Cat', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/440px-Kittyply_edit1.jpg'},
	{name: 'Dog', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Terrier_mixed-breed_dog.jpg/440px-Terrier_mixed-breed_dog.jpg'},
	{name: 'Duck', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Bucephala-albeola-010.jpg/440px-Bucephala-albeola-010.jpg'},
	{name: 'Elephant', img: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/African_Forest_Elephant.jpg'},
	{name: 'Frog', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Groene_kikker_achter_Bekaert-draad-detail_oog.jpg/440px-Groene_kikker_achter_Bekaert-draad-detail_oog.jpg'},
	{name: 'Giraffe', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Giraffe08_-_melbourne_zoo.jpg/440px-Giraffe08_-_melbourne_zoo.jpg'},
	{name: 'Rabbit', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/JumpingRabbit.JPG/440px-JumpingRabbit.JPG'},
	{name: 'Squirrel', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Squirrel_from_the_Jungle_of_Alwar%2C_Rajasthan.jpg/440px-The_Squirrel_from_the_Jungle_of_Alwar%2C_Rajasthan.jpg'},

	// Superheros
	{name: 'Superman', img: 'https://upload.wikimedia.org/wikipedia/en/e/eb/SupermanRoss.png'},
	{name: 'Batman', img: 'https://upload.wikimedia.org/wikipedia/en/7/75/Comic_Art_-_Batman_by_Jim_Lee_%282002%29.png'},
	{name: 'Wonder Woman', img: 'https://upload.wikimedia.org/wikipedia/en/9/93/Wonder_Woman.jpg'},
	{name: 'Green Lantern', img: 'https://upload.wikimedia.org/wikipedia/en/8/80/Green_Lantern_Rebirth_6.jpg'},
	{name: 'Punisher', img: 'https://upload.wikimedia.org/wikipedia/en/4/46/Punisher_%28Frank_Castle%29.jpg'},
	{name: 'Hulk', img: 'https://upload.wikimedia.org/wikipedia/en/5/59/Hulk_%28comics_character%29.png'},
	{name: 'Flash', img: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Barry_Allen_Flash.jpg'},
	{name: 'Iron Man', img: 'https://upload.wikimedia.org/wikipedia/en/e/e0/Iron_Man_bleeding_edge.jpg'},
	{name: 'Captain America', img: 'https://upload.wikimedia.org/wikipedia/en/9/91/CaptainAmerica109.jpg'},

	// Numbers
	{name: '1', img: 'http://images.freeimages.com/images/thumbs/81e/number-one-1504449.jpg'},
	{name: '2', img: 'http://images.freeimages.com/images/thumbs/d63/two-1233942.jpg'},
	{name: '3', img: 'http://images.freeimages.com/images/thumbs/dda/one-two-three-3-1184066.jpg'},
	{name: '4', img: 'http://images.freeimages.com/images/thumbs/d99/number-4-1520644.jpg'},
	{name: '5', img: 'http://images.freeimages.com/images/thumbs/394/5-in-stone-1555558.jpg'},
	{name: '6', img: 'http://images.freeimages.com/images/thumbs/aba/bus-stop-number-6-1523498.jpg'},
	{name: '7', img: 'http://images.freeimages.com/images/thumbs/0fc/seven-1256357.jpg'},
	{name: '8', img: 'http://images.freeimages.com/images/thumbs/b24/ruler-8-1536225.jpg'},
	{name: '9', img: 'http://images.freeimages.com/images/thumbs/a9f/number-9-1154368.jpg'}
]

let chosenImageKeys = []

// DOM Elements
const lowercase = document.getElementById('lowercase')
const capitals = document.getElementById('capitals')
const numbers = document.getElementById('numbers')
const special = document.getElementById('special')
const pwlength = document.getElementById('pwlength')
const passwordBox = document.getElementById('password_box')
const keyCount = document.getElementById('keycount')
const visualKeyContainer = document.getElementById('visual_key_container')
const keys = document.getElementById('keys')
const pwinfo = document.getElementById('pwinfo')
const outputHash = document.getElementById('output-hash')

// Credit: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976
const shuffle = array => {
	let currentIndex = array.length
	let temporaryValue
	let randomIndex

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1

		// And swap it with the current element.
		temporaryValue = array[currentIndex]
		array[currentIndex] = array[randomIndex]
		array[randomIndex] = temporaryValue
	}

	return array
}

const checkValidPassword = password => {
	let lower
	let caps
	let nums
	let spec
	let pwlen

	for (let j = 0, k = password.length; j < k; j += 1) {
		const charCode = password.charCodeAt(j)

		if (charCode >= 97 && charCode <= 122) {
			lower = true
		}

		if (charCode >= 65 && charCode <= 90) {
			caps = true
		}

		if (charCode >= 48 && charCode <= 57) {
			nums = true
		}

		for (let n = 0, o = validSpecialChars.length; n < o; n += 1) {
			if (charCode === validSpecialChars.charCodeAt(n)) {
				spec = true
			}
		}
	}

	if (password.length >= 12) {
		pwlen = true
	}

	lowercase.setAttribute('fulfilled', lower)
	capitals.setAttribute('fulfilled', caps)
	numbers.setAttribute('fulfilled', nums)
	special.setAttribute('fulfilled', spec)
	pwlength.setAttribute('fulfilled', pwlen)

	if (lower && caps && nums && spec && pwlen) {
		return true
	}

	return false
}

const shaObj = new jsSHA('SHA-512', 'TEXT', {
	numRounds: 2
})

shaObj.update('password')

console.log(shaObj.getHash('HEX'))

const update = () => {
	const password = passwordBox.value

	const isPassValid = checkValidPassword(password)

	if (!isPassValid) {
		pwinfo.innerHTML = '<span class="red">Your password is not yet valid :(</span>'
		return
	}
	pwinfo.innerHTML = '<span class="green">Great password!</span>'

	const shaObj = new jsSHA('SHA-512', 'TEXT', {
		numRounds: 4321
	})

	shaObj.update(password)

	const passwordHash = shaObj.getHash('HEX')

	// Seed the random by the hash. Now the randomization steps
	// will always be the same, but be difficult to "know"
	Math.seedrandom(passwordHash)

	// Make a random hex word
	// (use cryptographically secure random in real world)
	const makeWord = () => {
		const word = Math.random().toString(16).substr(2, 8)
		return word
	}

	// Each person sees the list in a different order. The order
	// is based on the hash of their password. This should
	// reduce placement selection bias.
	const makeItemElem = (item, idx) => {
		const elem = document.createElement('div')
		elem.className = 'key-item'

		elem.data = item
		elem.data.word = makeWord()
		elem.data.selected = false
		elem.data.uid = idx

		elem.setAttribute('style',
			`background-image: url(${item.img}); background-size: cover;`
		)

		elem.onclick = function () {
			if (this.data.selected) {
				return
			}
			this.data.selected = true
			this.setAttribute('selected', this.data.selected)

			chosenImageKeys.push(this.data)
			this.index = chosenImageKeys.length - 1
			this.li = document.createElement('li')
			this.li.innerHTML = this.data.name
			keys.appendChild(this.li)

			let combinedPasswordKeyHash = ''

			if (chosenImageKeys.length < 3) {
				keyCount.innerHTML = '<span class="red">&#10008 You must choose 3 or more keys!</span>'
				combinedPasswordKeyHash = ''
			} else {
				keyCount.innerHTML = '<span class="green"> &#10004; You have chosen ay least 3 keys</span>'

				const keySentence = chosenImageKeys.map(key => {
					return key.word
				})
				// .sort()
				.join('')

				const passwordKeyCombo = passwordHash + keySentence

				const shaObj = new jsSHA('SHA-512', 'TEXT', {
					numRounds: 4321
				})

				shaObj.update(passwordKeyCombo)

				combinedPasswordKeyHash = shaObj.getHash('HEX')

				outputHash.innerHTML = combinedPasswordKeyHash
			}

			console.log(combinedPasswordKeyHash)
		}

		return elem
	}

	let keyStack = []

	// We loop through the keys and set their words
	// using the seeded-random, so that the keys
	// will always be the same when based of the
	// hash of he password.
	const visualKeyStack = visualKeys.slice()
	for (let i = 0, l = visualKeys.length; i < l; i += 1) {
		const visualKeyDef = visualKeyStack.shift()
		const elem = makeItemElem(visualKeyDef, i)
		keyStack.push(elem)
	}

	// Clear the old elements
	visualKeyContainer.innerHTML = ''

	// Shuffle the key stack so that the ordering
	// is different every time the user comes to
	// the page. This is done to offset human
	// visual bias. We seed the random from the
	// clock to make this truly random.
	Math.seedrandom(Number(new Date()))

	keyStack = shuffle(keyStack)

	// Add the elements to the DOM
	for (let i = 0, l = keyStack.length; i < l; i += 1) {
		const elem = keyStack.shift()
		visualKeyContainer.appendChild(elem)
	}

	// Clear the chosen keys array
	chosenImageKeys = []
}

passwordBox.addEventListener('keyup', update)

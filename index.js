const canvas = document.querySelector('canvas')
const canvasContext = canvas.getContext('2d')

//size the canvas
canvas.width = innerWidth
canvas.height = innerHeight

// create the player
class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }
        this.rotation = 0
        // create html image
        const image = new Image()
        image.src = './asset/spaceship.png'
        image.onload = () => {
            const scale = .15
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width/2 - this.width/2,
                y: canvas.height - this.height - 20
            }
        }
    }
    draw() {
        canvasContext.save()
        canvasContext.translate(
            player.position.x + player.width/2, 
            player.position.y + player.height/2)
        canvasContext.rotate(this.rotation)
        canvasContext.translate(
            -player.position.x - player.width/2, 
            -player.position.y - player.height/2)
        canvasContext.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height)
        canvasContext.restore()
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
        }
    }
}

// initiate player
const player = new Player()
const keys = {
    q: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

// create anumation to give time to the image to load, 60/fps
function animate() {
    requestAnimationFrame(animate)
    canvasContext.fillStyle = 'black'
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
    player.update()

    if(keys.q.pressed && player.position.x >= 0) {
        player.velocity.x = -5
        player.rotation = -.15
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 5
        player.rotation = .15
    } else {
        player.velocity.x = 0
        player.rotation = 0
    }
}
animate()

// make the player moove
addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'q': 
            keys.q.pressed = true
            break
        case 'd': 
            keys.d.pressed = true
            break
        case ' ': 
            console.log('shoot')
            break
    }
})

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'q': 
            keys.q.pressed = false
            break
        case 'd': 
            keys.d.pressed = false
            break
        case ' ': 
            console.log('shoot')
            break
    }
})
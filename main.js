const { log, error, info } = globalThis.console || console;
const ctx = new globalThis.AudioContext();
const { body } = document;



let freq = 100;
let status = "starting";
let osc = ctx.createOscillator();
osc.connect(ctx.destination);
osc.type = "sawtooth";

if (status == "starting") {
    osc.start();
    status = "playing";
}



error('%cREMEMBER TO UNCOMMENT osc.start() !!!!!!', 'font-size: 3em; color: #f00; font-family: monospace; font-weight: bold;');



const input = document.querySelector(".lifesaver");

input.addEventListener("input", e => {
    if (input.value == "stop") {
        status = "plzstopmyearsarebleeding";
    } else if (input.value == "start") {
        osc = ctx.createOscillator();
        osc.connect(ctx.destination);
        osc.type = "sawtooth";
        osc.start();
        status = "playing";
    } else if (input.value == "halt") {
        status = "halt";
    }
});

document.querySelector(".freq-input").addEventListener("input", e => {
    if (parseInt(e.target.value)) {
        freq = parseInt(e.target.value);
    }
});

const checkifearsarebleeding = () => {
    if (status == "plzstopmyearsarebleeding") {
        osc.stop();
    } else if (status == "playing") {
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        freq += 1;
        document.querySelector("h4").innerHTML = `${freq} hertz`;
    } else if (status == "halt") {
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        document.querySelector("h4").innerHTML = `${freq} hertz`;
    }

    requestAnimationFrame(checkifearsarebleeding);
}

checkifearsarebleeding();







let gravity = 0.1;


class bouncyboi {
    constructor (color) {
        this.x = Math.random() * canvas.width;
        this.y = -200;
        this.vx = 0;
        this.vy = 0;
        this.r = Math.random() * (30 - 10 + 1) + 10; 
        this.colors = ["#8109ff", "#2ec194", "#e0466b", "#000000", "#6c18f3", "#009bff"];
        this.color = color;
        this.angle = 0;
    }

    Render() {
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        c.closePath();
        c.fill();

        this.vx += Math.sin(this.angle * 80);
        this.vy += gravity;
        this.x += this.vx;
        this.y += this.vy;

        if (this.y > canvas.height-this.r) {
            this.vy *= -1;
        }

        this.angle += 0.01;
    }
}

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
let fallingbois = [];
let rate = .5;



function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    setInterval(() => {
        fallingbois = [
            ...fallingbois,
            new bouncyboi()
        ];
    }, (rate * 1000))
}


function loop() {
    c.fillStyle = "rgba(255, 255, 255, 0.05)";
    c.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < fallingbois.length; i++) {
        fallingbois[i].color = fallingbois[i].colors[i];
        fallingbois[i].Render();
    }

    requestAnimationFrame(loop);
}



init();
loop();
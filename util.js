const PARAMS = {
    BLOCKWIDTH : 8,
    DEBUG : false,
    DEBUG_WIDTH : 1,
    DEBUG_COLOR: "Red",
    CANVAS_DIMENSION : 1000,
    SCALE : 4,
    OVERWORLD_SCALE: 6,
    GUI_SCALE : 6,
    MMAP_SCALE: 0.4625,
    GAMEOVER: false,
    LIFE_ID: 0,
    SHOT_ID: 0,
    LOW_HP_COLOR: "Red",
    MED_HP_COLOR: "Orange",
    HIGH_HP_COLOR: "Green"  
};

const WEAPONS = {
    0 : { base_damage: 50, base_dexterity: 0.1, range: 6, projectileType: 0 },
    1 : { base_damage: 75, base_dexterity: 0.125, range: 6, projectileType: 0 },
    2 : { base_damage: 40, base_dexterity: 0.065, range: 14, projectileType: 0 },
    3 : { base_damage: 65, base_dexterity: 0.085, range: 14, projectileType: 0 },
    4 : { base_damage: 30, base_dexterity: 0.045, projectileType: 1 },
    5 : { base_damage: 55, base_dexterity: 0.065, projectileType: 0 },
};

const PROJECTILES = {
    0: { spritesheet: "./sprites/projectiles/arrow.png" },
    1: { spritesheet: "./sprites/projectiles/arrow.png" }
};

// returns a random integer between 0 and n-1
function randomInt(n) {
    return Math.floor(Math.random() * n);
};

// returns a string that can be used as a rgb web color
function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
};

// returns a string that can be used as a rgba web color
function rgba(r, g, b, a) {
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};

// returns a string that can be used as a hsl web color
function hsl(h, s, l) {
    return "hsl(" + h + "," + s + "%," + l + "%)";
};

function distance(pt1, pt2) {
    return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
};

function magnitude(vector) {
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
};

function unitVector(vector) {
    return {x: vector.x / magnitude(vector), y: vector.y / magnitude(vector)};
};

function oscillate(input, min, max) {
    let range = max - min;
    return min + Math.abs(((input + range) % (range * 2)) - range);
};

function toDegrees(radians) {
    return radians * 180 / Math.PI;
};

function toRadians(degrees) {
    return degrees * Math.PI / 180;
};

function rotateImage(spritesheet, xStart, yStart, width, height, theta, scale) {
    let offscreenCanvas = document.createElement('canvas');
    let dimension = Math.max(width, height) * scale;
    offscreenCanvas.width = dimension;
    offscreenCanvas.height = dimension;
    let offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.imageSmoothingEnabled = false;
    offscreenCtx.save();
    offscreenCtx.translate(offscreenCanvas.width / 2, offscreenCanvas.height / 2);
    offscreenCtx.rotate(theta);
    offscreenCtx.translate(-offscreenCanvas.width / 2, -offscreenCanvas.height / 2);
    offscreenCtx.drawImage(spritesheet, xStart, yStart, width, height, 
                           width * scale < dimension ? (dimension - width * scale) / 2 : 0, 
                           height * scale < dimension ? (dimension - height * scale) / 2 : 0, width * scale, height * scale);
    offscreenCtx.restore();
    return offscreenCanvas;
};

function flipImage(spritesheet, xStart, yStart, width, height, horizontal) {
    let offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = width;
    offscreenCanvas.height = height;
    let offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.imageSmoothingEnabled = false;
    offscreenCtx.save();
    offscreenCtx.scale(horizontal === 0 ? 1 : -1, horizontal === 0 ? -1 : 1);
    offscreenCtx.drawImage(spritesheet, xStart, yStart, width, height, horizontal === 0 ? 0 : -width, horizontal === 0 ? -height : 0, width, height);
    offscreenCtx.restore();
    return offscreenCanvas;
};

function mMapDimension() {
    return 34 * PARAMS.GUI_SCALE;
};

function statsDisplayDimension() {
    return 25 * PARAMS.GUI_SCALE;
};

function abilityDisplayDimension() {
    return 18 * PARAMS.GUI_SCALE;
};

// creates an alias for requestAnimationFrame for backwards compatibility
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();








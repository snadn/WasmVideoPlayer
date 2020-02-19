import {
    Logger,
} from './common.mjs';
import { Player, playerStatePlaying } from "./player.js";

var defaultProtos = {
    http: {
        url: "https://roblin.cn/wasm/video/h265_high.mp4",
        waitLength: 512 * 1024,
        stream: false,
    },
    ws: {
        url: "wss://roblin.cn/wss/h265_high.mp4",
        waitLength: 512 * 1024,
        stream: false,
    },
    httpFlv: {
        url: "https://data.vod.itc.cn/bee/qf/wasm?tok=e4da89d923e4e2af4d622a0edb717f88827b422a&format=flv&direct=1",
        waitLength: 512 * 1024,
        stream: true,
    }
};
let inputUrl = document.getElementById("inputUrl");
inputUrl.value = defaultProtos["http"]["url"];

//Player object.
const player = new Player();

var loadingDiv = document.getElementById("loading");
player.setLoadingDiv(loadingDiv);

//Formated logger.
var logger = new Logger("Page");

player.on('playing', () => {
    var el = document.getElementById("btnPlayVideo");
    el.src = "img/pause.png";
});
player.on('pause', () => {
    var el = document.getElementById("btnPlayVideo");
    el.src = "img/play.png";
});
player.on('ended', () => {
    var el = document.getElementById("btnPlayVideo");
    el.src = "img/play.png";
});
var timeTrack = document.getElementById("timeTrack");
var timeLabel = document.getElementById("timeLabel");
player.setTrack(timeTrack, timeLabel);

const canvas = document.getElementById('playCanvas');

function playVideo() {
    var protoList = document.getElementById("protocol");
    var proto = protoList.options[protoList.selectedIndex].value;
    var protoObj = defaultProtos[proto];
    var inputUrl = document.getElementById("inputUrl");
    var url = inputUrl.value;

    var currentState = player.getState();
    if (currentState != playerStatePlaying) {
        if (!canvas) {
            logger.logError("No Canvas with id " + canvasId + "!");
            return false;
        }

        player.play(url, canvas, function(e) {
            console.log("play error " + e.error + " status " + e.status + ".");
            if (e.error == 1) {
                logger.logInfo("Finished.");
            }
        }, protoObj.waitLength, protoObj.stream);
    } else {
        player.pause();
    }

    return true;
}

function stopVideo() {
    player.stop();
}

function fullscreen() {
    if (canvas.RequestFullScreen) {
        canvas.RequestFullScreen();
    } else if (canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen();
    } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
    } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
    } else {
        alert("This browser doesn't supporter fullscreen");
    }
}

function onSelectProto() {
    var protoList = document.getElementById("protocol");
    var proto = protoList.options[protoList.selectedIndex].value;
    var protoObj = defaultProtos[proto];
    var inputUrl = document.getElementById("inputUrl");
    inputUrl.value = protoObj["url"];
}

Object.assign(window, {
    playVideo,
    stopVideo,
    fullscreen,
    onSelectProto,
})
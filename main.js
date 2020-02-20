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
const inputUrl = document.getElementById("inputUrl");
inputUrl.value = defaultProtos["http"]["url"];

const el = document.querySelector('.canvasDiv');

//Player object.
const player = new Player({
    el,
    // src: /* 'video/C31-1.mp4', //  */defaultProtos.http.url,
});

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
player.on('error', (e) => {
    console.log("play error " + e.error + " status " + e.status + ".");
    if (e.error == 1) {
        logger.logInfo("Finished.");
    }
});

var timeTrack = document.getElementById("timeTrack");
var timeLabel = document.getElementById("timeLabel");
player.setTrack(timeTrack, timeLabel);

function playVideo() {
    var protoList = document.getElementById("protocol");
    var proto = protoList.options[protoList.selectedIndex].value;
    var protoObj = defaultProtos[proto];
    var inputUrl = document.getElementById("inputUrl");
    var url = inputUrl.value;

    var currentState = player.getState();
    if (currentState != playerStatePlaying) {
        player.src = url;
        player.play(/* url, protoObj.waitLength, protoObj.stream */);
    } else {
        player.pause();
    }

    return true;
}

function stopVideo() {
    player.stop();
}

function fullscreen() {
    if (el.RequestFullScreen) {
        el.RequestFullScreen();
    } else if (el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen();
    } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
    } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
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

    player.src = protoObj.url;
    player.isStream = protoObj.stream;
}

Object.assign(window, {
    playVideo,
    stopVideo,
    fullscreen,
    onSelectProto,
    player,
})
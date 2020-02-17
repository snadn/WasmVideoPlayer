import {
    Logger,
} from './common.mjs';
import { Player, playerStatePlaying } from "./player.js";

var defaultProtos = {
	http: {
		url: "https://roblin.cn/wasm/video/h265_high.mp4",
		waitLength : 512 * 1024,
		stream: false,
	},
	ws: {
		url: "wss://roblin.cn/wss/h265_high.mp4",
		waitLength : 512 * 1024,
		stream: false,
	},
	httpFlv: {
		url: "https://data.vod.itc.cn/bee/qf/wasm?tok=e4da89d923e4e2af4d622a0edb717f88827b422a&format=flv&direct=1",
		waitLength : 512 * 1024,
		stream: true,
	}
};
let inputUrl = document.getElementById("inputUrl");
inputUrl.value = defaultProtos["http"]["url"];

//Player object.
self.player = new Player();

var loadingDiv = document.getElementById("loading");
self.player.setLoadingDiv(loadingDiv);

//Formated logger.
var logger = new Logger("Page");

function playVideo() {
	var protoList = document.getElementById("protocol");
	var proto = protoList.options[protoList.selectedIndex].value;
	var protoObj = defaultProtos[proto];
	var inputUrl = document.getElementById("inputUrl");
	var url = inputUrl.value;

	var el = document.getElementById("btnPlayVideo");
	var currentState = self.player.getState();
	if (currentState == playerStatePlaying) {
		el.src = "img/play.png";
	} else {
		el.src = "img/pause.png";
	}

	if (currentState != playerStatePlaying) {
		const canvasId = "playCanvas";
		var canvas = document.getElementById(canvasId);
		if (!canvas) {
			logger.logError("No Canvas with id " + canvasId + "!");
			return false;
		}

		self.player.play(url, canvas, function (e) {
			console.log("play error " + e.error + " status " + e.status + ".");
			if (e.error == 1) {
				logger.logInfo("Finished.");
			}
		}, protoObj.waitLength, protoObj.stream);

		var timeTrack = document.getElementById("timeTrack");
		var timeLabel = document.getElementById("timeLabel");
		self.player.setTrack(timeTrack, timeLabel);
	} else {
		self.player.pause();
	}

	return true;
}

function stopVideo() {
	self.player.stop();
	var button = document.getElementById("btnPlayVideo");
	button.value = "Play";
	button.src = "img/play.png";
}

function fullscreen() {
	self.player.fullscreen();
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
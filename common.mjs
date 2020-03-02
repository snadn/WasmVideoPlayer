export const kError = -1;
//Player request.
const kPlayVideoReq         = 0;
const kPauseVideoReq        = 1;
const kStopVideoReq         = 2;

//Player response.
const kPlayVideoRsp         = 0;
const kAudioInfo            = 1;
const kVideoInfo            = 2;
const kAudioData            = 3;
const kVideoData            = 4;

//Downloader request.
export const kGetFileInfoReq       = 0;
export const kDownloadFileReq      = 1;
export const kCloseDownloaderReq   = 2;

//Downloader response.
export const kGetFileInfoRsp       = 0;
export const kFileData             = 1;

//Downloader Protocol.
export const kProtoHttp            = 0;
export const kProtoWebsocket       = 1;

//Decoder request.
export const kInitDecoderReq       = 0;
export const kUninitDecoderReq     = 1;
export const kOpenDecoderReq       = 2;
export const kCloseDecoderReq      = 3;
export const kFeedDataReq          = 4;
export const kStartDecodingReq     = 5;
export const kPauseDecodingReq     = 6;
export const kSeekToReq            = 7;

//Decoder response.
export const kInitDecoderRsp       = 0;
export const kUninitDecoderRsp     = 1;
export const kOpenDecoderRsp       = 2;
export const kCloseDecoderRsp      = 3;
export const kVideoFrame           = 4;
export const kAudioFrame           = 5;
const kStartDecodingRsp     = 6;
const kPauseDecodingRsp     = 7;
export const kDecodeFinishedEvt    = 8;
export const kRequestDataEvt       = 9;
export const kSeekToRsp            = 10;

export function Logger(module) {
    this.module = module;
}

Logger.prototype.log = function (line) {
    console.log("[" + this.currentTimeStr() + "][" + this.module + "]" + line);
}

Logger.prototype.logError = function (line) {
    console.error("[" + this.currentTimeStr() + "][" + this.module + "][ER] " + line);
}

Logger.prototype.logInfo = function (line) {
    console.log("[" + this.currentTimeStr() + "][" + this.module + "][IF] " + line);
}

Logger.prototype.logDebug = function (line) {
    console.log("[" + this.currentTimeStr() + "][" + this.module + "][DT] " + line);
}

Logger.prototype.currentTimeStr = function () {
    var now = new Date(Date.now());
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var ms = now.getMilliseconds();
    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec + ":" + ms;
}


<template>
    <div class="v-snow">
        <div class="v-music-background" :class="status === 'loading' ? 'v-change' : ''" :style="curSong && curSong.avatar ? `background-image: url(${curSong.avatar});` : ''">   
            <audio ref="audio" :src="curSong && curSong.src" :autoplay="autoplay"></audio>
            <link href="https://fonts.googleapis.com/css?family=Barlow+Condensed:300,400,700" rel="stylesheet">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
        </div>
        <div class="v-music-screen">
            <div class="v-i-info">
                <div class="v-i-song">{{ curSong && curSong.name }}</div>
                <div class="v-i-singer">{{ curSong && curSong.singer }}</div>
            </div>
            <div class="v-i-control" :class="control ? '' : 'v-i-hide'" @mouseover="() => { this.control = true;this.mouseOverControl = true; }" @mouseleave="onHideControl">
                <div class="v-i-progress" @click="onChangeProgress" ref="progress">
                    <div class="v-i-fill" :style="`width: ${playedRate}%;`">
                        <div class="v-i-drager"></div>
                    </div>
                </div>
                <div class="v-i-playtoggle v-i-button">
                    <div class="v-i-loading" :class="status === 'loading' ? '' : 'v-i-hide'"><i class="fas fa-spinner" aria-hidden="true"></i></div>
                    <div class="v-i-play" :class="status === 'playing' ? '' : 'v-i-hide'" @click="onPlayPause"><i class="fas fa-pause" aria-hidden="true"></i></div>
                    <div class="v-i-pause" :class="status === 'paused' ? '' : 'v-i-hide'" @click="onPlayPause"><i class="fas fa-play" aria-hidden="true"></i></div>
                </div>
                <div class="v-i-button" @click="onForward"><i class="fas fa-forward" aria-hidden="true"></i></div>
                <div class="v-i-playmodetoggle v-i-button" @click="onPlayMode">
                    <div class="v-i-loopset" :class="playMode === 'loopset' ? '' : 'v-i-hide'"><i class="fas fa-retweet" aria-hidden="true"></i></div>
                    <div class="v-i-loopone" :class="playMode === 'loopone' ? '' : 'v-i-hide'" style="font-weight: bold;">1</div>
                    <div class="v-i-random" :class="playMode === 'random' ? '' : 'v-i-hide'"><i class="fas fa-random" aria-hidden="true"></i></div>
                </div>
                <div class="v-i-volumetoggle v-i-button" @click="onVolume(true)">
                    <div class="v-i-muted" :class="muted ? '' : 'v-i-hide'"><i class="fas fa-volume-mute" aria-hidden="true"></i></div>
                    <div class="v-i-off" :class="!muted && volume === 0 ? '' : 'v-i-hide'"><i class="fas fa-volume-off" aria-hidden="true"></i></div>
                    <div class="v-i-down" :class="!muted && volume > 0 && volume <= 0.5 ? '' : 'v-i-hide'"><i class="fas fa-volume-down" aria-hidden="true"></i></div>
                    <div class="v-i-up" :class="!muted && volume > 0.5 && volume <= 1 ? '' : 'v-i-hide'"><i class="fas fa-volume-up" aria-hidden="true"></i></div>
                    <div class="v-i-progress" @click="onVolume" ref="volume-progress">
                        <div class="v-i-fill" :style="`height: ${volume * 100}%;`">
                            <div class="v-i-drager"></div>
                        </div>
                    </div>
                </div>
                <div class="v-i-time">
                    <div class="v-i-current">{{ currentTime }}</div>
                    <div>/</div>
                    <div class="v-i-end">{{ duration }}</div>
                </div>
            </div>
            <div class="v-i-sets" >
                <div class="v-i-set">
                    <div class="v-i-song"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Util from '../lib/util'
import Resource from '../lib/resource'
export default {
    props: {
        resource: {
            type: Object,
            default: null,
        },
        sets: {
            type: Array,
            default: null,
        },
        curSet: {
            type: Object,
            default: null,
        },
        curSong: {
            type: Object,
            default: null,
        },

        autoplay: {
            type: Boolean,
            default: false,
        },
        playMode: {
            type: String,
            default: "random",
        },
        showMode: {
            type: String,
            default: "screen",
        },
        muted: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            playedRate: 0,
            currentTime: "-:--",
            duration: "-:--",
            status: "loading",
            volume: 0.5,

            control: true,

            mouseOverControl: false,
        }
    },

    methods: {
        
        onChangeProgress(e) {
            var rate = e.offsetX / this.$refs.progress.offsetWidth;
            this.$refs.audio.currentTime = this.$refs.audio.duration * rate;
            if (this.$refs.audio.paused) {
                this.onPlayPause();
            }
        },

        onPlay() {
            if (this.$refs.audio.paused) {
                this.onPlayPause();
            }
        },

        onPause() {
            if (!this.$refs.audio.paused) {
                this.onPlayPause();
            }
        },

        onPlayPause() {
            var audio = this.$refs.audio;
            if (!audio.src) {
                return;
            }
            if (audio.paused) {
                document.title = `${this.curSong.name} - ${this.curSong.singer}`;
                this.autoplay = true;
                this.$refs.audio.play();
                this.status = "playing";

                var volume = 0;
                var i = this.volume / 8;
                var timer = setInterval(() => {
                    if (volume === this.volume) {
                        clearInterval(timer);
                        return;
                    } else {
                        volume += i;
                        if (volume > this.volume) {
                            volume = this.volume;
                        }
                        this.$refs.audio.volume = volume;
                    }
                }, 100);
            } else {
                this.status = "paused";
                var volume = this.volume;
                var i = volume / 8;
                var timer = setInterval(() => {
                    if (volume === 0) {
                        this.$refs.audio.pause();
                        clearInterval(timer);
                        return;
                    } else {
                        volume -= i;
                        if (volume < 0) {
                            volume = 0;
                        }
                        this.$refs.audio.volume = volume;
                    }
                }, 100);
            }
        },

        onForward() {
            this.changeSong(this.getSong("next"));
        },

        onPlayMode() {
            this.playMode = this.getPlayMode();
        },

        onVolume(tap=false) {
            if (tap) {
                var audio = this.$refs.audio;
                if (!audio.src) {
                    return;
                }
                this.muted = !this.muted;
                if (!this.muted) {
                    this.$refs.audio.muted = this.muted;
                    var volume = 0;
                    var i = this.volume / 8;
                    var timer = setInterval(() => {
                        if (volume === this.volume) {
                            clearInterval(timer);
                            return;
                        } else {
                            volume += i;
                            if (volume > this.volume) {
                                volume = this.volume;
                            }
                            this.$refs.audio.volume = volume;
                        }
                    }, 100);
                } else {
                    var volume = this.volume;
                    var i = volume / 8;
                    var timer = setInterval(() => {
                        if (volume === 0) {
                            this.$refs.audio.muted = this.muted;
                            clearInterval(timer);
                            return;
                        } else {
                            volume -= i;
                            if (volume < 0) {
                                volume = 0;
                            }
                            this.$refs.audio.volume = volume;
                        }
                    }, 100);
                }
                return;
            }

            var rate = e.offsetY / this.$refs.volume-progress.offsetHeight;
            this.$refs.audio.volume = 1 * rate;
            this.volume = this.$refs.audio.volume;
        },

        onInterval() {
            var that = this;
            var timer = setInterval(() => {
                that.resetSong();
            }, 500);
        },

        getPlayMode() {
            switch (this.playMode) {
                case "loopset":
                    return "loopone";
                case "loopone":
                    return "random";
                case "random":
                    return "loopset";
            }
        },

        getSong(type) {
            switch (this.playMode) {
                case "loopset":
                    type = type || "next";
                    var index = this.curSong.index + (type === "next" ? 1 : (type === "pre" ? -1 : 0));
                    return index + 1 >= this.curSet.songs.length ? this.curSet.songs[0] : this.curSet.songs[index];
                case "loopone":
                    var index = this.curSong.index + (type === "next" ? 1 : (type === "pre" ? -1 : 0));
                    return index + 1 >= this.curSet.songs.length ? this.curSet.songs[0] : this.curSet.songs[index];
                case "random":
                    type = type || "next";
                    var index = parseInt(Math.random() * this.curSet.songs.length - 1);
                    return this.curSet.songs[index];
            }
        },

        changeSong(song) {
            this.onPause();
            this.status = "loading";
            setTimeout(async () => {
                if (!song.src) {
                    console.log("warn src is", song.src);
                    return;
                }
                await Util.loadImage(song.avatar);
                this.curSong = song;
                this.resetSong();
                this.onPlay();
            }, 1000);
            this.$forceUpdate();
        },
        
        resetSong() {
            this.currentTime = this.$refs.audio.duration ? Util.getFormatedDateTime("m:ss", this.$refs.audio.currentTime) : this.currentTime;
            this.duration = this.$refs.audio.duration ? Util.getFormatedDateTime("m:ss", this.$refs.audio.duration) : this.duration;
            this.playedRate = this.$refs.audio.duration ? this.$refs.audio.currentTime / this.$refs.audio.duration * 100 : 0;
        },
        onHideControl() {
            var that = this;
            that.mouseOverControl = false;
            setTimeout(() => {
                if (that.mouseOverControl) {
                    return;
                }
                that.control = false;
            }, 3000);
        },

        async readyPlay() {
            if (this.curSong) {
                return;
            }
            if (this.curSet && this.curSet.songs && this.curSet.songs[0]) {
                this.curSong = this.curSet.songs[0];
                return;
            }
            if (this.sets && this.sets[0] && this.sets[0].songs && this.sets[0].songs[0]) {
                this.curSet = this.sets[0];
                this.curSong = this.curSet.songs[0];
                return;
            }
            if (this.resource) {
                let data = await Resource.get(
                    this.resource,
                );
                this.sets = this.rowFormated(data);
                if (this.sets && this.sets[0] && this.sets[0].songs && this.sets[0].songs[0]) {
                    this.curSet = this.sets[0];
                    this.curSong = this.curSet.songs[0];
                    return;
                }
            }
            console.log(this.curSong, this.curSet, this.sets, this.resource);
            console.warn("snow music player init fail~");
        },

        rowFormated(data) {
            var sets = [];
            var setIndex = 0;
            data.rhythm_sets.forEach(set => {
                var songs = [];
                var songIndex = 0;
                set.rhythms.forEach(song => {
                    songs.push({
                        index: songIndex ++,
                        avatar: song.avatar,
                        lyric: song.lyric,
                        name: song.name,
                        playedCount: song.played_count,
                        singer: song.singer_name,
                        translatedLyric: song.translated_lyric,
                        src: song.url,
                    });
                });
                sets.push({
                    index: setIndex ++,
                    avatar: set.avatar,
                    name: set.name,
                    playedCount: set.played_count,
                    songs: songs,
                });
            });
            return sets;
        },
    },

    async beforeMount() {
        await this.readyPlay();
    },

    mounted() {
        document.title = "Snow Music Player";

        var that = this;
        
        this.$refs.audio.volume = this.volume;
        this.$refs.audio.muted = this.muted;
        this.status = this.autoplay ? "playing" : "paused";
        this.onInterval();
        this.onHideControl();

        that.$refs.audio.addEventListener("ended",function(){
            console.log('ended');
            that.status = 'paused';
            that.changeSong(that.getSong());
        });
        that.$forceUpdate();
    }
}
</script>

<style lang="scss" scoped>
    .v-music-background{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-image: url(http://www.17sucai.com/preview/1424582/2018-10-14/music/earth-space.jpg);
        background-position: center;
        background-size: cover;
        filter: blur(10px);
        transform: scale(1.1);
        transition: 0.4s all;
    }
    .v-change{
        filter: blur(20px);
    }
    .v-music-screen{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        font-family: 'Barlow Condensed', sans-serif;
        .v-i-info{
            right: 0;
            padding: 1rem;
            color: #fff;
            animation: bounce-in-right 1s ease-in;
            .v-i-song{
                text-align: right;
                font-size: 2rem;
                padding: 0.2rem;
            }
            .v-i-singer{
                text-align: right;
                font-size: 1.5rem;
                padding: 0.2rem;
            }
        }
        .v-i-control{
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 50px;
            color: #fff;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
            transition: all 0.4s;
            display: flex;
            .v-i-button{
                width: 50px;
                height: 50px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: 0.4s all;
            }
            .v-i-button:active{
                transform: scale(0.8);
            }
            .v-i-playtoggle{
                .v-i-play, .v-i-pause{
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    transition: 0.4s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .v-i-loading{
                    position: absolute;
                    transition: 0.4s;
                    animation: trans 2s linear infinite;
                }
                .v-i-hide{
                    opacity: 0;
                    transform: scale(0.25);
                }
            }
            .v-i-playmodetoggle{
                .v-i-loopset, .v-i-loopone, .v-i-random{
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    transition: 0.4s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .v-i-hide{
                    opacity: 0;
                    transform: scale(0.25);
                }
            }
            .v-i-volumetoggle{
                position: relative;
                .v-i-muted, .v-i-off, .v-i-down, .v-i-up{
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    transition: 0.4s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .v-i-progress{
                    position: absolute;
                    left: 0;
                    bottom: 50px;
                    width: 4px;
                    height: 100%;
                    opacity: 0;
                    background-color: rgba(255, 255, 255, 0.2);
                    transition: 0.4s opacity;
                    cursor: pointer;
                    .v-i-fill{
                        background-color:#c62828;
                        position: relative;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        transition: 0.2s all;
                        .v-i-drager{
                            opacity: 0.8;
                            background-color:#c62828;
                            position: absolute;
                            top: -8px;
                            width: 16px;
                            height: 16px;
                            border-radius: 50%;
                            transition: 0.4s all;
                        }
                    }
                }

                .v-i-hide{
                    opacity: 0;
                    transform: scale(0.25);
                }
            }

            .v-i-volumetoggle:hover{
                .v-i-progress{
                    width: 4px;
                    opacity: 1;
                }
            }

            .v-i-time{
                display: flex;
                align-items: center;
                justify-content: center;
                .v-i-current{
                    padding: 0 0.5rem;
                    width: 1.5rem;
                }
                .v-i-end{
                    padding: 0 0.5rem;
                    width: 1.5rem;
                }
            }
            .v-i-progress{
                position: absolute;
                left: 0;
                bottom: 50px;
                height: 4px;
                width: 100%;
                background-color: rgba(255, 255, 255, 0.2);
                transition: 0.4s all;
                cursor: pointer;
                .v-i-fill{
                    background-color:#c62828;
                    position: relative;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    transition: 0.2s all;
                    .v-i-drager{
                        opacity: 0;
                        background-color:#c62828;
                        position: absolute;
                        right: -8px;
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        transition: 0.4s all;
                    }
                }
            }
            .v-i-progress:hover{
                height: 6px;
                .v-i-fill{
                    .v-i-drager{
                        opacity: 0.8;
                    }
                }
            }
        }
        .v-i-hide{
            transform: translateY(100%);
        }
    }

    @keyframes bounce-in-right {
        0%, 60%, 75%, 90%, 100% {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        0% {
            opacity: 0;
            transform: translate3d(3000px, 0, 0);
        }
        60% {
            opacity: 1;
            transform: translate3d(-25px, 0, 0);
        }
        75% {
            transform: translate3d(10px, 0, 0);
        }
        90% {
            transform: translate3d(-5px, 0, 0);
        }
        100% {
            transform: none;
        }
    }

    @keyframes trans{
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>

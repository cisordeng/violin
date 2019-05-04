<template>
    <div class="v-music-background" :style="curSong && curSong.avatar ? `background-image: url(${curSong.avatar});` : ''">
        <div class="v-music-screen">
            <div class="v-i-info">
                <div class="v-i-song">{{ curSong && curSong.name }}</div>
                <div class="v-i-singer">{{ curSong && curSong.singer }}</div>
            </div>
            <div class="v-i-control" :class="control ? '' : 'v-i-hide'" @mouseover="() => { this.control = true;this.mouseOverControl = true; }" @mouseleave="onHideControl">
                <progress class="v-i-progress" :value="playedRate" max="100" @click="onChangeProgress"></progress>
                <div class="v-i-playtoggle v-i-button">
                    <div class="v-i-loading" :class="status === 'loading' ? '' : 'v-i-hide'"><i class="fa fa-spinner" aria-hidden="true"></i></div>
                    <div class="v-i-play" :class="status === 'playing' ? '' : 'v-i-hide'" @click="onPlayPause"><i class="fa fa-pause" aria-hidden="true"></i></div>
                    <div class="v-i-pause" :class="status === 'paused' ? '' : 'v-i-hide'" @click="onPlayPause"><i class="fa fa-play" aria-hidden="true"></i></div>
                </div>
                <div class="v-i-button" @click="onForward"><i class="fa fa-forward" aria-hidden="true"></i></div>
                <div class="v-i-time">
                    <div class="v-i-current">{{ currentTime }}</div>
                    <div>/</div>
                    <div class="v-i-end">{{ duration }}</div>
                </div>
            </div>
        </div>
        <div class="v-i-sets" >
            <div class="v-i-set">
                <div class="v-i-song"></div>
            </div>
        </div>
        <audio ref="audio" :src="curSong && curSong.src" :autoplay="autoplay" :multed="multed"></audio>
        <link href="https://fonts.googleapis.com/css?family=Barlow+Condensed:300,400,700" rel="stylesheet">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
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
            default: "looplist",
        },
        showMode: {
            type: String,
            default: "screen",
        },
        multed: {
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
            var rate = e.offsetX / e.target.offsetWidth;
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
            var index = this.curSong.index + 1;
            if (index + 1 >= this.curSet.songs.length) {
                index = 0;
            }
            this.changeSong(this.curSet.songs[index]);
        },

        onInterval() {
            var that = this;
            var timer = setInterval(() => {
                that.resetSong();
            }, 500);
        },

        changeSong(song) {
            this.onPause();
            this.status = "loading";
            setTimeout(() => {
                if (!song.src) {
                    console.log("warn src is", song.src);
                    return;
                }
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
            console(this.curSong, this.curSet, this.sets, this.resource);
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
            console.log(sets);
            return sets;
        },
    },

    async beforeMount() {
        await this.readyPlay();
    },

    mounted() {
        document.title = "Snow Music Player";

        console.log(this.sets);

        var that = this;
        this.$refs.audio.volume = this.volume;
        this.status = this.autoplay ? "playing" : "paused";
        this.onInterval();
        this.onHideControl();

        that.$refs.audio.addEventListener("ended",function(){
            console.log('ended');
            that.status = 'paused';
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
                    transition: 0.4s;
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
                transition: 0.4s;
                cursor: pointer;
            }
            .v-i-progress::-webkit-progress-value{
                background-color:#c62828;
            }
            .v-i-progress:hover{
                height: 6px;
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

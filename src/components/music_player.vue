<template>
  <div
    class="wrapper"
    :class="(showPlayer ? '' : 'v-i-hide') + (fixed ? ' v-i-fixed' : '')"
    @click="() => { if (!this.onceClicked) { this.loadSpectrum();} this.onceClicked = true; }"
  >
    <div class="v-list" :class="showList ? 'v-i-active' : ''">
      <div class="v-set" v-show="listMode == 'sets'">
        <div class="v-i-sets">
          <div v-for="(set, index) in sets" :key="index" class="v-i-set" @click="onClickSet(index)">
            <img class="v-i-avatar" :src="set.avatar" />
            <div class="v-i-name">{{set.name}}</div>
          </div>
        </div>
        <page :pageInfo.sync="setPageInfo" v-on:changePage="onChangeSetPage"></page>
      </div>
      <div class="v-song" v-show="listMode == 'songs'">
        <div class="v-i-songs">
          <div class="v-i-song v-i-title">
            <div class="v-i-avatar"></div>
            <div class="v-i-name">音乐标题</div>
            <div class="v-i-singer">歌手</div>
          </div>
          <div
            v-for="(song, index) in songs"
            :key="index"
            class="v-i-song"
            :class="currentSong && currentSong.id == song.id ? 'v-i-active' : ''"
            @click="onClickSong(index)"
          >
            <img class="v-i-avatar" :src="song.avatar" />
            <div class="v-i-name" :title="song.name">{{song.name}}</div>
            <div class="v-i-singer" :title="song.singer_name">{{song.singer_name}}</div>
          </div>
        </div>
        <page :pageInfo.sync="songPageInfo" v-on:changePage="onChangeSongPage"></page>
      </div>
      <div class="v-swap" :title="listMode == 'sets' ? '歌曲列表' : '歌单列表'" @click="onClickListMode">
        <svg class="icon" :class="listMode == 'sets' ? 'v-i-right' : 'v-i-left'">
          <use xlink:href="#icon-left" />
        </svg>
      </div>
    </div>
    <div class="player">
      <div class="player__top">
        <div class="player-cover">
          <transition-group :name="transitionName">
            <div
              v-for="(track, index) in songs"
              :key="track.avatar"
              class="player-cover__item"
              :style="`background-image: url(${(index == currentSongIndex || index == (currentSongIndex - 1 < 0 ? songs.length - 1 : currentSongIndex - 1) || index == (currentSongIndex + 1 > songs.length - 1 ? 0 : currentSongIndex + 1)) ? track.avatar : ''});`"
              v-show="index == currentSongIndex"
            ></div>
          </transition-group>
          <div class="v-i-bars">
            <div
              v-for="(bar, index) in spectrumBars"
              :key="index"
              class="v-i-bar"
              :style="`width: ${100 / spectrumBars.length}%;height: ${bar * spectrumBarSensitivity}px`"
            ></div>
          </div>
          <div v-if="currentSong && currentSong.second2lyric" class="v-i-lyrics">
            <transition-group name="scale-in" style="align-self: flex-end;">
              <div
                v-for="lyric in currentSong.second2lyric"
                :key="lyric[0]"
                class="v-i-lyric"
                v-show="$refs.audio.currentTime >= parseFloat(lyric[0])"
              >{{lyric[1]}}</div>
            </transition-group>
          </div>
        </div>
        <div class="player-controls">
          <div
            class="player-controls__item -favorite"
            :class="currentSong && currentSong.favorited ? 'active' : ''"
            @click="favorite"
          >
            <svg class="icon">
              <use xlink:href="#icon-heart-o" />
            </svg>
          </div>
          <div
            class="player-controls__item -list"
            :class="showList ? 'active' : ''"
            @click="onClickList"
          >
            <svg class="icon">
              <use xlink:href="#icon-list" />
            </svg>
          </div>
          <div class="player-controls__item" @click="prevTrack">
            <svg class="icon">
              <use xlink:href="#icon-prev" />
            </svg>
          </div>
          <div class="player-controls__item" @click="nextTrack">
            <svg class="icon">
              <use xlink:href="#icon-next" />
            </svg>
          </div>
          <div class="player-controls__item -xl js-play" @click="play">
            <svg class="icon">
              <use :xlink:href="isTimerPlaying ? '#icon-pause' : '#icon-play'" />
            </svg>
          </div>
        </div>
      </div>
      <div class="progress">
        <div class="progress__top">
          <div class="album-info">
            <div class="album-info__name">{{currentSong && currentSong.singer_name}}</div>
            <div class="album-info__track">{{currentSong && currentSong.name}}</div>
          </div>
          <div class="progress__duration">{{duration}}</div>
        </div>
        <div ref="progress" class="progress__bar" @click="clickProgress">
          <div class="progress__current" :style="`width: ${barWidth};`"></div>
        </div>
        <div class="progress__time">{{currentTime}}</div>
      </div>
      <div></div>
    </div>
    <audio ref="audio" crossorigin="anonymous"></audio>
    <div
      v-if="showCtrl"
      class="v-i-music"
      :class="isTimerPlaying ? 'v-i-active' : ''"
      @click="onClickCtrl"
    >
      <svg class="icon">
        <use xlink:href="#icon-music" />
      </svg>
    </div>

    <svg
      style="display: none;"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <symbol id="icon-heart-o" viewBox="0 0 32 32">
          <title>icon-heart-o</title>
          <path
            d="M22.88 1.952c-2.72 0-5.184 1.28-6.88 3.456-1.696-2.176-4.16-3.456-6.88-3.456-4.48 0-9.024 3.648-9.024 10.592 0 7.232 7.776 12.704 15.072 17.248 0.256 0.16 0.544 0.256 0.832 0.256s0.576-0.096 0.832-0.256c7.296-4.544 15.072-10.016 15.072-17.248 0-6.944-4.544-10.592-9.024-10.592zM16 26.56c-4.864-3.072-12.736-8.288-12.736-14.016 0-5.088 3.040-7.424 5.824-7.424 2.368 0 4.384 1.504 5.408 4.032 0.256 0.608 0.832 0.992 1.472 0.992s1.248-0.384 1.472-0.992c1.024-2.528 3.040-4.032 5.408-4.032 2.816 0 5.824 2.304 5.824 7.424 0.064 5.728-7.808 10.976-12.672 14.016z"
          />
          <path
            d="M16 30.144c-0.32 0-0.64-0.096-0.896-0.256-7.296-4.576-15.104-10.048-15.104-17.344 0-7.008 4.576-10.688 9.12-10.688 2.656 0 5.152 1.216 6.88 3.392 1.728-2.144 4.224-3.392 6.88-3.392 4.544 0 9.12 3.68 9.12 10.688 0 7.296-7.808 12.768-15.104 17.344-0.256 0.16-0.576 0.256-0.896 0.256zM9.12 2.048c-4.448 0-8.928 3.616-8.928 10.496 0 7.168 7.744 12.64 15.008 17.152 0.48 0.288 1.12 0.288 1.568 0 7.264-4.544 15.008-9.984 15.008-17.152 0-6.88-4.48-10.496-8.928-10.496-2.656 0-5.088 1.216-6.816 3.392l-0.032 0.128-0.064-0.096c-1.696-2.176-4.192-3.424-6.816-3.424zM16 26.688l-0.064-0.032c-3.808-2.4-12.768-8.032-12.768-14.112 0-5.152 3.072-7.52 5.952-7.52 2.432 0 4.48 1.536 5.504 4.096 0.224 0.576 0.768 0.928 1.376 0.928s1.152-0.384 1.376-0.928c1.024-2.56 3.072-4.096 5.504-4.096 2.848 0 5.952 2.336 5.952 7.52 0 6.080-8.96 11.712-12.768 14.112l-0.064 0.032zM9.12 5.248c-2.752 0-5.728 2.304-5.728 7.328 0 5.952 8.8 11.488 12.608 13.92 3.808-2.4 12.608-7.968 12.608-13.92 0-5.024-2.976-7.328-5.728-7.328-2.336 0-4.32 1.472-5.312 3.968-0.256 0.64-0.864 1.056-1.568 1.056s-1.312-0.416-1.568-1.056c-0.992-2.496-2.976-3.968-5.312-3.968z"
          />
          <path
            d="M6.816 20.704c0.384 0.288 0.512 0.704 0.48 1.12 0.224 0.256 0.384 0.608 0.384 0.96 0 0.032 0 0.032 0 0.064 0.16 0.128 0.32 0.256 0.48 0.384 0.128 0.064 0.256 0.16 0.384 0.256 0.096 0.064 0.192 0.16 0.256 0.224 0.8 0.576 1.632 1.12 2.496 1.664 0.416 0.128 0.8 0.256 1.056 0.32 1.984 0.576 4.064 0.8 6.112 0.928 2.688-1.92 5.312-3.904 8-5.792 0.896-1.088 1.92-2.080 2.912-3.104v-7.552c-0.096-0.128-0.192-0.288-0.32-0.416-0.768-1.024-1.184-2.176-1.6-3.296-0.768-0.416-1.536-0.8-2.336-1.12-0.128-0.064-0.256-0.096-0.384-0.16h-21.568v12.992c1.312 0.672 2.496 1.6 3.648 2.528z"
          />
        </symbol>
        <symbol id="icon-heart" viewBox="0 0 32 32">
          <title>icon-heart</title>
          <path
            d="M22.88 1.952c-2.72 0-5.184 1.28-6.88 3.456-1.696-2.176-4.16-3.456-6.88-3.456-4.48 0-9.024 3.648-9.024 10.592 0 7.232 7.776 12.704 15.072 17.248 0.256 0.16 0.544 0.256 0.832 0.256s0.576-0.096 0.832-0.256c7.296-4.544 15.072-10.016 15.072-17.248 0-6.944-4.544-10.592-9.024-10.592zM16 26.56c-4.864-3.072-12.736-8.288-12.736-14.016 0-5.088 3.040-7.424 5.824-7.424 2.368 0 4.384 1.504 5.408 4.032 0.256 0.608 0.832 0.992 1.472 0.992s1.248-0.384 1.472-0.992c1.024-2.528 3.040-4.032 5.408-4.032 2.816 0 5.824 2.304 5.824 7.424 0.064 5.728-7.808 10.976-12.672 14.016z"
          />
          <path
            d="M16 30.144c-0.32 0-0.64-0.096-0.896-0.256-7.296-4.576-15.104-10.048-15.104-17.344 0-7.008 4.576-10.688 9.12-10.688 2.656 0 5.152 1.216 6.88 3.392 1.728-2.144 4.224-3.392 6.88-3.392 4.544 0 9.12 3.68 9.12 10.688 0 7.296-7.808 12.768-15.104 17.344-0.256 0.16-0.576 0.256-0.896 0.256zM9.12 2.048c-4.448 0-8.928 3.616-8.928 10.496 0 7.168 7.744 12.64 15.008 17.152 0.48 0.288 1.12 0.288 1.568 0 7.264-4.544 15.008-9.984 15.008-17.152 0-6.88-4.48-10.496-8.928-10.496-2.656 0-5.088 1.216-6.816 3.392l-0.032 0.128-0.064-0.096c-1.696-2.176-4.192-3.424-6.816-3.424zM16 26.688l-0.064-0.032c-3.808-2.4-12.768-8.032-12.768-14.112 0-5.152 3.072-7.52 5.952-7.52 2.432 0 4.48 1.536 5.504 4.096 0.224 0.576 0.768 0.928 1.376 0.928s1.152-0.384 1.376-0.928c1.024-2.56 3.072-4.096 5.504-4.096 2.848 0 5.952 2.336 5.952 7.52 0 6.080-8.96 11.712-12.768 14.112l-0.064 0.032zM9.12 5.248c-2.752 0-5.728 2.304-5.728 7.328 0 5.952 8.8 11.488 12.608 13.92 3.808-2.4 12.608-7.968 12.608-13.92 0-5.024-2.976-7.328-5.728-7.328-2.336 0-4.32 1.472-5.312 3.968-0.256 0.64-0.864 1.056-1.568 1.056s-1.312-0.416-1.568-1.056c-0.992-2.496-2.976-3.968-5.312-3.968z"
          />
        </symbol>
        <symbol id="icon-infinity" viewBox="0 0 32 32">
          <title>icon-infinity</title>
          <path
            d="M29.312 20.832c-1.28 1.28-3.008 1.984-4.832 1.984s-3.52-0.704-4.832-1.984c-0.032-0.032-0.224-0.224-0.256-0.256v0 1.28c0 0.448-0.352 0.8-0.8 0.8s-0.8-0.352-0.8-0.8v-3.168c0-0.448 0.352-0.8 0.8-0.8h3.168c0.448 0 0.8 0.352 0.8 0.8s-0.352 0.8-0.8 0.8h-1.28c0.032 0.032 0.224 0.224 0.256 0.256 0.992 0.992 2.304 1.536 3.68 1.536 1.408 0 2.72-0.544 3.68-1.536 0.992-0.992 1.536-2.304 1.536-3.68s-0.544-2.72-1.536-3.68c-0.992-0.992-2.304-1.536-3.68-1.536-1.408 0-2.72 0.544-3.68 1.536l-8.416 8.448c-1.312 1.312-3.072 1.984-4.832 1.984s-3.488-0.672-4.832-1.984c-2.656-2.656-2.656-6.976 0-9.632s6.976-2.656 9.632 0c0.032 0.032 0.16 0.16 0.192 0.192l0.064 0.064v-1.28c0-0.448 0.352-0.8 0.8-0.8s0.8 0.352 0.8 0.8v3.168c0 0.448-0.352 0.8-0.8 0.8h-3.168c-0.448 0-0.8-0.352-0.8-0.8s0.352-0.8 0.8-0.8h1.28l-0.096-0.064c-0.032-0.032-0.16-0.16-0.192-0.192-0.992-0.992-2.304-1.536-3.68-1.536s-2.72 0.544-3.68 1.536c-2.048 2.048-2.048 5.344 0 7.392 0.992 0.992 2.304 1.536 3.68 1.536s2.72-0.544 3.68-1.536l8.512-8.512c1.28-1.28 3.008-1.984 4.832-1.984s3.52 0.704 4.832 1.984c2.624 2.656 2.624 7.008-0.032 9.664z"
          />
          <path
            d="M24.512 23.488c-1.6 0-3.136-0.512-4.416-1.44-0.128 0.704-0.736 1.248-1.44 1.248-0.8 0-1.472-0.672-1.472-1.472v-3.168c0-0.8 0.672-1.472 1.472-1.472h3.168c0.8 0 1.472 0.672 1.472 1.472 0 0.608-0.384 1.152-0.928 1.376 0.64 0.352 1.376 0.544 2.144 0.544 1.216 0 2.368-0.48 3.2-1.344 0.864-0.864 1.344-1.984 1.344-3.2s-0.48-2.368-1.344-3.2c-0.864-0.864-1.984-1.344-3.2-1.344s-2.368 0.48-3.2 1.344l-8.512 8.48c-1.408 1.408-3.296 2.176-5.312 2.176s-3.872-0.768-5.312-2.176c-2.912-2.912-2.912-7.68 0-10.592 1.408-1.408 3.296-2.176 5.312-2.176 0 0 0 0 0 0 1.6 0 3.136 0.512 4.416 1.44 0.128-0.704 0.736-1.248 1.472-1.248 0.8 0 1.472 0.672 1.472 1.472v3.168c0 0.8-0.672 1.472-1.472 1.472h-3.168c-0.8 0-1.472-0.672-1.472-1.472 0-0.608 0.384-1.152 0.928-1.376-0.64-0.352-1.376-0.544-2.144-0.544-1.216 0-2.368 0.48-3.2 1.344-1.76 1.76-1.76 4.64 0 6.432 0.864 0.864 2.016 1.344 3.2 1.344 1.216 0 2.368-0.48 3.2-1.344l8.48-8.544c1.408-1.408 3.296-2.208 5.312-2.208s3.872 0.768 5.312 2.208c1.408 1.408 2.176 3.296 2.176 5.312s-0.768 3.872-2.208 5.312v0c0 0 0 0 0 0-1.408 1.408-3.296 2.176-5.28 2.176zM18.752 18.912l1.44 1.44c1.152 1.152 2.688 1.792 4.32 1.792s3.168-0.64 4.32-1.792v0c1.152-1.152 1.792-2.688 1.792-4.32s-0.64-3.168-1.792-4.32c-1.152-1.152-2.688-1.792-4.352-1.792-1.632 0-3.168 0.64-4.32 1.792l-8.48 8.448c-1.12 1.12-2.592 1.728-4.16 1.728s-3.072-0.608-4.16-1.728c-2.304-2.304-2.304-6.048 0-8.352 1.12-1.12 2.592-1.728 4.16-1.728s3.072 0.608 4.16 1.728l1.44 1.408h-2.912c-0.064 0-0.128 0.064-0.128 0.128s0.064 0.128 0.128 0.128h3.168c0.064 0 0.128-0.064 0.128-0.128v-3.168c0-0.064-0.064-0.128-0.128-0.128s-0.128 0.064-0.128 0.128v2.912l-1.408-1.408c-1.152-1.152-2.688-1.792-4.352-1.792-1.632 0-3.168 0.64-4.32 1.792-2.4 2.4-2.4 6.272 0 8.672 1.152 1.152 2.688 1.792 4.32 1.792s3.168-0.64 4.32-1.792l8.512-8.512c1.12-1.12 2.592-1.728 4.16-1.728s3.072 0.608 4.16 1.728c1.12 1.12 1.728 2.592 1.728 4.16s-0.608 3.072-1.728 4.16c-1.12 1.12-2.592 1.728-4.16 1.728s-3.072-0.608-4.16-1.728l-1.408-1.408h2.912c0.064 0 0.128-0.064 0.128-0.128s-0.064-0.128-0.128-0.128h-3.168c-0.064 0-0.128 0.064-0.128 0.128v3.168c0 0.064 0.064 0.128 0.128 0.128s0.128-0.064 0.128-0.128v-2.88z"
          />
        </symbol>
        <symbol id="icon-pause" viewBox="0 0 32 32">
          <title>icon-pause</title>
          <path
            d="M16 0.32c-8.64 0-15.68 7.040-15.68 15.68s7.040 15.68 15.68 15.68 15.68-7.040 15.68-15.68-7.040-15.68-15.68-15.68zM16 29.216c-7.296 0-13.216-5.92-13.216-13.216s5.92-13.216 13.216-13.216 13.216 5.92 13.216 13.216-5.92 13.216-13.216 13.216z"
          />
          <path
            d="M16 32c-8.832 0-16-7.168-16-16s7.168-16 16-16 16 7.168 16 16-7.168 16-16 16zM16 0.672c-8.448 0-15.328 6.88-15.328 15.328s6.88 15.328 15.328 15.328c8.448 0 15.328-6.88 15.328-15.328s-6.88-15.328-15.328-15.328zM16 29.568c-7.488 0-13.568-6.080-13.568-13.568s6.080-13.568 13.568-13.568c7.488 0 13.568 6.080 13.568 13.568s-6.080 13.568-13.568 13.568zM16 3.104c-7.104 0-12.896 5.792-12.896 12.896s5.792 12.896 12.896 12.896c7.104 0 12.896-5.792 12.896-12.896s-5.792-12.896-12.896-12.896z"
          />
          <path
            d="M12.16 22.336v0c-0.896 0-1.6-0.704-1.6-1.6v-9.472c0-0.896 0.704-1.6 1.6-1.6v0c0.896 0 1.6 0.704 1.6 1.6v9.504c0 0.864-0.704 1.568-1.6 1.568z"
          />
          <path
            d="M19.84 22.336v0c-0.896 0-1.6-0.704-1.6-1.6v-9.472c0-0.896 0.704-1.6 1.6-1.6v0c0.896 0 1.6 0.704 1.6 1.6v9.504c0 0.864-0.704 1.568-1.6 1.568z"
          />
        </symbol>
        <symbol id="icon-play" viewBox="0 0 32 32">
          <title>icon-play</title>
          <path
            d="M21.216 15.168l-7.616-5.088c-0.672-0.416-1.504 0.032-1.504 0.832v10.176c0 0.8 0.896 1.248 1.504 0.832l7.616-5.088c0.576-0.416 0.576-1.248 0-1.664z"
          />
          <path
            d="M13.056 22.4c-0.224 0-0.416-0.064-0.608-0.16-0.448-0.224-0.704-0.672-0.704-1.152v-10.176c0-0.48 0.256-0.928 0.672-1.152s0.928-0.224 1.344 0.064l7.616 5.088c0.384 0.256 0.608 0.672 0.608 1.088s-0.224 0.864-0.608 1.088l-7.616 5.088c-0.192 0.16-0.448 0.224-0.704 0.224zM13.056 10.272c-0.096 0-0.224 0.032-0.32 0.064-0.224 0.128-0.352 0.32-0.352 0.576v10.176c0 0.256 0.128 0.48 0.352 0.576 0.224 0.128 0.448 0.096 0.64-0.032l7.616-5.088c0.192-0.128 0.288-0.32 0.288-0.544s-0.096-0.416-0.288-0.544l-7.584-5.088c-0.096-0.064-0.224-0.096-0.352-0.096z"
          />
          <path
            d="M16 0.32c-8.64 0-15.68 7.040-15.68 15.68s7.040 15.68 15.68 15.68 15.68-7.040 15.68-15.68-7.040-15.68-15.68-15.68zM16 29.216c-7.296 0-13.216-5.92-13.216-13.216s5.92-13.216 13.216-13.216 13.216 5.92 13.216 13.216-5.92 13.216-13.216 13.216z"
          />
          <path
            d="M16 32c-8.832 0-16-7.168-16-16s7.168-16 16-16 16 7.168 16 16-7.168 16-16 16zM16 0.672c-8.448 0-15.328 6.88-15.328 15.328s6.88 15.328 15.328 15.328c8.448 0 15.328-6.88 15.328-15.328s-6.88-15.328-15.328-15.328zM16 29.568c-7.488 0-13.568-6.080-13.568-13.568s6.080-13.568 13.568-13.568c7.488 0 13.568 6.080 13.568 13.568s-6.080 13.568-13.568 13.568zM16 3.104c-7.104 0-12.896 5.792-12.896 12.896s5.792 12.896 12.896 12.896c7.104 0 12.896-5.792 12.896-12.896s-5.792-12.896-12.896-12.896z"
          />
        </symbol>
        <symbol id="icon-list" viewBox="0 0 1024 1024">
          <title>list</title>
          <path
            d="M960 160a74.24 74.24 0 0 0-74.24-73.92c-391.04 0-542.08 64-556.8 71.68A74.56 74.56 0 0 0 288 224v418.24c-122.56-24-224 53.76-224 155.52 0 88.32 86.08 160 192 160s189.12-69.44 192-155.84V340.48A1251.52 1251.52 0 0 1 800 288v279.68a181.44 181.44 0 0 0-224 166.4c0 88.32 86.08 160 192 160s188.8-68.8 192-154.88z"
          />
        </symbol>
        <symbol id="icon-next" viewBox="0 0 32 32">
          <title>next</title>
          <path
            d="M2.304 18.304h14.688l-4.608 4.576c-0.864 0.864-0.864 2.336 0 3.232 0.864 0.864 2.336 0.864 3.232 0l8.448-8.48c0.864-0.864 0.864-2.336 0-3.232l-8.448-8.448c-0.448-0.448-1.056-0.672-1.632-0.672s-1.184 0.224-1.632 0.672c-0.864 0.864-0.864 2.336 0 3.232l4.64 4.576h-14.688c-1.248 0-2.304 0.992-2.304 2.272s1.024 2.272 2.304 2.272z"
          />
          <path
            d="M29.696 26.752c1.248 0 2.304-1.024 2.304-2.304v-16.928c0-1.248-1.024-2.304-2.304-2.304s-2.304 1.024-2.304 2.304v16.928c0.064 1.28 1.056 2.304 2.304 2.304z"
          />
        </symbol>
        <symbol id="icon-prev" viewBox="0 0 32 32">
          <title>prev</title>
          <path
            d="M29.696 13.696h-14.688l4.576-4.576c0.864-0.864 0.864-2.336 0-3.232-0.864-0.864-2.336-0.864-3.232 0l-8.448 8.48c-0.864 0.864-0.864 2.336 0 3.232l8.448 8.448c0.448 0.448 1.056 0.672 1.632 0.672s1.184-0.224 1.632-0.672c0.864-0.864 0.864-2.336 0-3.232l-4.608-4.576h14.688c1.248 0 2.304-1.024 2.304-2.304s-1.024-2.24-2.304-2.24z"
          />
          <path
            d="M2.304 5.248c-1.248 0-2.304 1.024-2.304 2.304v16.928c0 1.248 1.024 2.304 2.304 2.304s2.304-1.024 2.304-2.304v-16.928c-0.064-1.28-1.056-2.304-2.304-2.304z"
          />
        </symbol>

        <symbol id="icon-left" viewBox="0 0 1024 1024">
          <path
            d="M879.6 648.5h-40.9 16.2c13.8-0.8 24.7-12.2 24.7-26.2v26.2zM483.7 327.5v-40.9 16.2c0.8 13.8 12.2 24.7 26.2 24.7h-26.2zM879.6 408.6v40.9-16.2c-0.8-13.8-12.2-24.7-26.2-24.7h26.2z"
          />
          <path
            d="M141.3 530.1l260.9-260.9v80.1c3.2 29.6 25.3 53.6 54.1 59.4h423v239.1H443.1c-22.6 0-41 18.3-41 41s18.3 41 41 41h464.5c27.8-5.7 49.5-28.5 53.6-56.8V388.2c-3.5-34.3-32.5-61.1-67.7-61.1h-0.5v-0.1h-54.1v-0.1H484V170.4c0-0.7 0-1.3-0.1-2 0-0.3 0-0.6-0.1-1 0-0.3 0-0.7-0.1-1 0-0.4-0.1-0.8-0.1-1.2 0-0.3-0.1-0.5-0.1-0.8-0.1-0.4-0.1-0.9-0.2-1.3 0-0.2-0.1-0.4-0.1-0.7-0.1-0.4-0.2-0.9-0.3-1.3 0-0.2-0.1-0.4-0.1-0.6l-0.3-1.2c-0.1-0.2-0.1-0.5-0.2-0.7-0.1-0.4-0.2-0.8-0.4-1.1-0.1-0.3-0.2-0.5-0.3-0.8-0.1-0.3-0.3-0.7-0.4-1l-0.3-0.9c-0.1-0.3-0.3-0.6-0.4-0.9-0.1-0.3-0.3-0.7-0.4-1-0.1-0.2-0.2-0.5-0.4-0.7-0.2-0.4-0.4-0.7-0.5-1.1-0.1-0.2-0.2-0.4-0.4-0.6-0.2-0.4-0.4-0.7-0.6-1.1-0.1-0.2-0.2-0.4-0.4-0.6-0.2-0.4-0.5-0.7-0.7-1.1-0.1-0.2-0.3-0.4-0.4-0.6-0.2-0.4-0.5-0.7-0.8-1.1-0.2-0.2-0.3-0.4-0.5-0.6-0.2-0.3-0.5-0.6-0.7-0.9-0.2-0.3-0.5-0.5-0.7-0.8-0.2-0.2-0.4-0.5-0.6-0.7-0.5-0.5-0.9-1-1.4-1.5-0.5-0.5-1-0.9-1.5-1.4-0.2-0.2-0.5-0.4-0.7-0.6-0.3-0.2-0.5-0.5-0.8-0.7-0.3-0.3-0.6-0.5-0.9-0.7-0.2-0.2-0.4-0.3-0.6-0.5-0.4-0.3-0.7-0.5-1.1-0.8-0.2-0.1-0.4-0.3-0.6-0.4-0.4-0.2-0.7-0.5-1.1-0.7-0.2-0.1-0.4-0.2-0.6-0.4-0.4-0.2-0.7-0.4-1.1-0.6-0.2-0.1-0.4-0.2-0.6-0.4-0.4-0.2-0.7-0.4-1.1-0.5-0.2-0.1-0.5-0.2-0.7-0.4-0.3-0.2-0.7-0.3-1-0.4-0.3-0.1-0.6-0.3-0.9-0.4l-0.9-0.3c-0.3-0.1-0.7-0.3-1-0.4-0.3-0.1-0.5-0.2-0.8-0.3-0.4-0.1-0.8-0.3-1.1-0.4-0.2-0.1-0.5-0.1-0.7-0.2l-1.2-0.3c-0.2-0.1-0.4-0.1-0.7-0.2-0.4-0.1-0.9-0.2-1.3-0.3-0.2 0-0.4-0.1-0.7-0.1-0.4-0.1-0.9-0.2-1.3-0.2-0.3 0-0.5-0.1-0.8-0.1-0.4-0.1-0.8-0.1-1.2-0.1-0.3 0-0.7-0.1-1-0.1-0.3 0-0.6-0.1-0.9-0.1-1.3-0.1-2.7-0.1-4.1 0-0.3 0-0.6 0-0.9 0.1-0.3 0-0.7 0-1 0.1-0.4 0-0.8 0.1-1.2 0.1-0.3 0-0.5 0.1-0.8 0.1-0.4 0.1-0.9 0.1-1.3 0.2-0.2 0-0.4 0.1-0.7 0.1-0.4 0.1-0.9 0.2-1.3 0.3-0.2 0.1-0.4 0.1-0.7 0.2l-1.2 0.3c-0.2 0.1-0.5 0.1-0.7 0.2-0.4 0.1-0.8 0.2-1.1 0.4-0.3 0.1-0.5 0.2-0.8 0.3-0.3 0.1-0.7 0.3-1 0.4-0.3 0.1-0.6 0.2-0.9 0.4-0.3 0.1-0.6 0.3-0.9 0.4-0.3 0.1-0.7 0.3-1 0.4-0.2 0.1-0.5 0.2-0.7 0.4-0.4 0.2-0.7 0.4-1.1 0.6-0.2 0.1-0.4 0.2-0.6 0.4-0.4 0.2-0.8 0.4-1.1 0.6-0.2 0.1-0.4 0.2-0.6 0.4-0.4 0.2-0.8 0.5-1.1 0.7-0.2 0.1-0.4 0.3-0.6 0.4-0.4 0.2-0.7 0.5-1.1 0.8-0.2 0.2-0.4 0.3-0.6 0.5-0.3 0.2-0.6 0.5-1 0.7-0.3 0.2-0.5 0.4-0.8 0.7-0.2 0.2-0.5 0.4-0.7 0.6-0.5 0.4-1 0.9-1.4 1.4L55.3 500.3l-0.9 0.9c-8 8-12 18.5-12 29s4 21 12 29l0.9 0.9 358.8 358.8c16 16 41.9 16 57.9 0s16-41.9 0-57.9L141.3 530.1z"
          />
        </symbol>

        <symbol id="icon-music" viewBox="0 0 1024 1024">
          <title>music</title>
          <path
            d="M427.52 961.92c-96 0-178.56-49.28-197.76-125.44-9.6-38.4-3.2-78.72 19.2-115.84 31.36-52.48 89.6-92.16 160-108.16 16.64-3.84 32.64-6.4 49.28-7.68L348.16 271.36c-7.68-23.04-5.12-48 6.4-69.12 11.52-21.76 32.64-38.4 56.96-44.8L748.8 67.2c18.56-5.12 38.4-0.64 52.48 12.16 14.08 12.16 20.48 30.72 17.92 49.28l-19.84 128c-4.48 28.8-25.6 52.48-54.4 60.16l-224.64 58.88c-17.28 4.48-34.56-5.76-39.04-23.04-4.48-17.28 5.76-34.56 23.04-39.04l224.64-58.88c3.84-1.28 7.04-3.84 7.68-7.68l17.92-115.2-327.04 87.68c-7.68 1.92-13.44 7.04-17.28 13.44-3.2 5.76-3.84 12.8-1.92 19.2L533.12 627.2c3.2 10.24 1.28 21.76-5.76 30.08-7.04 8.32-17.28 12.8-28.16 11.52-24.96-2.56-50.56-0.64-75.52 5.12-52.48 12.8-97.28 42.24-119.68 79.36-9.6 15.36-19.2 39.68-12.16 67.2 15.36 59.52 101.76 92.16 188.8 71.04 52.48-12.8 97.28-42.24 119.68-79.36 9.6-15.36 19.2-39.68 12.16-67.2-1.28-3.84-15.36-46.72-92.8-277.76-5.76-16.64 3.2-35.2 20.48-40.32 16.64-5.76 35.2 3.2 40.32 20.48 91.52 273.28 92.8 279.68 94.08 282.24 9.6 38.4 3.2 78.72-19.2 115.84-31.36 52.48-89.6 92.16-160 108.16-23.04 5.76-46.08 8.32-67.84 8.32z"
          />
        </symbol>
      </defs>
    </svg>
  </div>
</template>

<script>
import Util from "../lib/util";
import Resource from "../lib/resource";
import Page from "../components/page";
import RhythmService from "../services/rhythm_service";
export default {
  props: {
    showCtrl: {
      type: Boolean,
      default: true
    },
    showPlayer: {
      type: Boolean,
      default: false
    },
    showList: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: true
    }
  },
  components: {
    page: Page
  },
  data() {
    return {
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      currentSong: null,
      currentSongIndex: 0,
      transitionName: null,
      isShowCover: false,

      onceClicked: false,
      volume: 0.5,
      listMode: "songs",
      currentSet: null,
      sets: [],
      setPageInfo: {},
      songs: [],
      songPageInfo: {},

      spectrumBars: [],
      spectrumBarNumber: 32,
      spectrumBarSensitivity: 0.8
    };
  },
  methods: {
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.$refs.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width =
        (100 / this.$refs.audio.duration) * this.$refs.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.$refs.audio.duration / 60);
      let dursec = Math.floor(this.$refs.audio.duration - durmin * 60);
      let curmin = Math.floor(this.$refs.audio.currentTime / 60);
      let cursec = Math.floor(this.$refs.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(e) {
      let progress = this.$refs.progress;
      let maxduration = this.$refs.audio.duration;
      let percentage = (100 * e.offsetX) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.$refs.audio.currentTime = (maxduration * percentage) / 100;
      this.$refs.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.$refs.audio.pause();
      this.updateBar(e);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentSongIndex > 0) {
        this.currentSongIndex--;
      } else {
        this.currentSongIndex = this.songs.length - 1;
      }
      this.currentSong = this.songs[this.currentSongIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentSongIndex < this.songs.length - 1) {
        this.currentSongIndex++;
      } else {
        this.currentSongIndex = 0;
      }
      this.currentSong = this.songs[this.currentSongIndex];
      this.resetPlayer();
    },
    async resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.$refs.audio.currentTime = 0;
      this.currentSong = await RhythmService.getRhythm(this.currentSong.id);
      this.$refs.audio.src = this.currentSong.url;
      setTimeout(() => {
        if (this.isTimerPlaying) {
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.songs[this.currentSongIndex].favorited = !this.songs[
        this.currentSongIndex
      ].favorited;
    },
    onClickCtrl() {
      this.showPlayer = !this.showPlayer;
    },
    onClickList() {
      this.showList = !this.showList;
      if (this.showList) {
        this.showPlayer = false;
      }
    },
    async onClickSet(index) {
      this.listMode = "songs";
      this.currentSet = this.sets[index];
      await this.loadSongs();
      this.currentSong = this.songs[0];
      this.currentSong = await RhythmService.getRhythm(this.currentSong.id);
      this.$refs.audio.src = this.currentSong.url;
      this.play();
    },

    async onClickSong(index) {
      this.currentSongIndex = index;
      this.currentSong = this.songs[index];
      this.currentSong = await RhythmService.getRhythm(this.currentSong.id);
      this.$refs.audio.src = this.currentSong.url;
      this.play();
    },

    onClickListMode() {
      switch (this.listMode) {
        case "sets":
          this.listMode = "songs";
          break;
        case "songs":
          this.listMode = "sets";
          break;
      }
    },

    async onChangeSetPage(action) {
      switch (action) {
        case "prev":
          await this.loadSets(this.setPageInfo.prev);
          break;
        case "next":
          await this.loadSets(this.setPageInfo.next);
          break;
      }
    },

    async onChangeSongPage(action) {
      switch (action) {
        case "prev":
          await this.loadSongs(this.songPageInfo.prev);
          break;
        case "next":
          await this.loadSongs(this.songPageInfo.next);
          break;
      }
    },

    async loadSets(page = 1) {
      let data = await RhythmService.getRhythmSets(page);
      this.sets = data.rhythm_sets;
      this.currentSet = this.sets[0];
      this.setPageInfo = data.page_info;
    },

    async loadSongs(page = 1) {
      let data = await RhythmService.getRhythms(this.currentSet.id, page);
      this.songs = data.rhythms.map(rhythm => {
        rhythm.second2lyric = this.loadLyric(rhythm.lyric);

        return rhythm;
      });
      this.songPageInfo = data.page_info;
    },

    loadLyric(str) {
      var regex = /\[\d+:\d+.\d+\]/g;
      let lyrics = str
        .trim()
        .split("\n")
        .filter(lyric => {
          let times = lyric.match(regex);
          return times && lyric.replace(regex, "").trim().length > 0;
        });
      let second2lyric = new Map();
      lyrics.forEach(lyric => {
        let times = lyric
          .match(regex)[0]
          .slice(1, -1)
          .split(":");
        let second = parseFloat(times[0]) * 60 + parseFloat(times[1]);
        let l = lyric.replace(regex, "").trim();
        second2lyric.set(second, l);
      });

      return second2lyric;
    },

    loadSpectrum() {
      var vm = this;
      if (!window.AudioContext) {
        console.log("您的浏览器不支持AudioContext");
      } else {
        var atx = new AudioContext();
        // this.$refs.audio.crossOrigin = "anonymous";

        var request = new XMLHttpRequest();
        request.open("GET", this.$refs.audio.src, true);
        request.responseType = "arraybuffer";
        request.send();
        request.onload = () => {
          atx.decodeAudioData(request.response).then(buffer => {
            var analyser = atx.createAnalyser();
            var source = atx.createMediaElementSource(this.$refs.audio);
            source.connect(analyser);
            analyser.connect(atx.destination);
            source.buffer = buffer;
            atx.resume();
            var drawMeter = function() {
              var array = new Uint8Array(analyser.frequencyBinCount);
              analyser.getByteFrequencyData(array);
              array = array.slice(0, -256);
              var step = array.length / vm.spectrumBarNumber;
              for (var i = 0; i < vm.spectrumBarNumber; i++) {
                if (vm.spectrumBars.length < vm.spectrumBarNumber) {
                  vm.spectrumBars.push(
                    array[parseInt(step * i + step / 2 - 1)]
                  );
                } else {
                  vm.spectrumBars[i] = array[parseInt(step * i + step / 2 - 1)];
                }
              }
              vm.$forceUpdate();
              requestAnimationFrame(drawMeter);
            };
            requestAnimationFrame(drawMeter);
          });
        };
      }
    }
  },

  watch: {
  },

  async created() {
    let vm = this;
    await vm.loadSets();
    await vm.loadSongs();

    this.currentSong = this.songs[0];
    this.currentSong = await RhythmService.getRhythm(this.currentSong.id);
    this.$refs.audio.src = this.currentSong.url;
    this.$refs.audio.volume = this.volume;
    this.$refs.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.$refs.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.$refs.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    // for (let index = 0; index < this.songs.length; index++) {
    //   const element = this.songs[index];
    //   let link = document.createElement("link");
    //   link.rel = "prefetch";
    //   link.href = element.cover;
    //   link.as = "image";
    //   document.head.appendChild(link);
    // }
  },
  mounted() {
    if (!this.showPlayer) {
      this.showPlayer = true;
      setTimeout(() => {
        this.showPlayer = false;
      }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  transform: rotate(0deg);
  transition: 0.3s;
  &.v-i-left {
    transform: rotate(0deg);
  }
  &.v-i-right {
    transform: rotate(180deg);
  }
}

.wrapper {
  // width: 100%;
  // height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  // background: #dfe7ef;
  font-family: "Bitter", serif;
  pointer-events: none;
  margin: 0 0 0 50px;
}
.v-i-fixed {
  position: fixed;
  z-index: 999;
  left: 0;
  transition: 0.3s;
  height: 100%;
}
.v-i-hide {
  left: -460px;
}
@media screen and (max-width: 700px), (max-height: 500px) {
  .wrapper {
    flex-wrap: wrap;
    flex-direction: column;
  }
}

@media screen and (max-width: 700px), (max-height: 500px) {
  .v-i-fixed {
    left: 0;
    top: 0;
    width: 100%;
    height: initial;
    margin: 0;
  }
}

@media screen and (max-width: 700px), (max-height: 500px) {
  .v-i-hide {
    top: calc(-532px);
  }
}

.v-list {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgba($color: #f0f0f0, $alpha: 0.9);
  opacity: 0;
  pointer-events: none;
  transition: 0.3s;
  &.v-i-active {
    pointer-events: auto;
    opacity: 1;
  }
  .v-set {
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    padding: 200px 0;
    .v-i-sets {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      margin: 0 50px;
      .v-i-set {
        cursor: pointer;
        margin: 20px 50px;
        &:hover {
          .v-i-avatar {
            transform: scale(1.1);
          }
          .v-i-name {
            font-weight: bold;
          }
        }
        .v-i-avatar {
          display: block;
          width: 180px;
          height: 180px;
          border-radius: 5px;
          box-shadow: 0px 5px 10px 0px rgba(76, 70, 124, 0.2);
          transform: scale(1);
          transition: 0.3s;
        }
        .v-i-name {
          color: #808080;
          font-size: 12px;
          margin: 10px 0 0 0;
          font-weight: inherit;
          transition: 0.3s;
        }
      }
    }
  }
  .v-song {
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    padding: 200px 0;
    .v-i-songs {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin: 0 50px;
      .v-i-song {
        cursor: pointer;
        margin: 10px 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #808080;
        background: inherit;
        transition: 0.3s;
        &.v-i-title {
          font-weight: bold;
          .v-i-avatar {
            transform: scale(0);
          }
        }
        &.v-i-active {
          color: inherit;
        }
        &:hover {
          color: inherit;
        }
        .v-i-avatar {
          display: block;
          width: 45px;
          height: 45px;
          border-radius: 3px;
          box-shadow: 0px 5px 10px 0px rgba(76, 70, 124, 0.2);
          transform: scale(1);
          transition: 0.3s;
        }
        .v-i-name {
          width: 180px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 12px;
          margin: 0 20px;
          font-weight: inherit;
          transition: 0.3s;
        }
        .v-i-singer {
          width: 180px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 12px;
          font-weight: inherit;
          transition: 0.3s;
        }
      }
    }
  }
  .v-swap {
    font-size: 20px;
    width: 50px;
    height: 50px;
    background: #fff;
    border-radius: 100%;
    color: #4b3f90;
    box-shadow: 0px 5px 10px 0px rgba(76, 70, 124, 0.2);
    position: fixed;
    bottom: 50px;
    right: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transform: scale(1);
    transition: 0.5s all;
    &:hover {
      transform: scale(1.2);
    }
  }
}

.player {
  background: #eef3f7;
  width: 410px;
  min-height: 480px;
  box-shadow: 0px -5px 35px 15px rgba(50, 88, 130, 0.32);
  border-radius: 15px;
  padding: 30px;
  z-index: 8;
  pointer-events: auto;
}
@media screen and (max-width: 700px), (max-height: 500px) {
  .player {
    width: 85%;
    padding: 20px;
    margin-top: 75px;
    min-height: initial;
    padding-bottom: 30px;
    max-width: 400px;
  }
}
.player__top {
  display: flex;
  align-items: flex-start;
  position: relative;
  z-index: 4;
}
@media screen and (max-width: 700px), (max-height: 500px) {
  .player__top {
    flex-wrap: wrap;
  }
}
.player-cover {
  width: 300px;
  height: 300px;
  margin-left: -70px;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  border-radius: 15px;
  z-index: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  .v-i-bars {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    overflow: hidden;
    z-index: 3;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    .v-i-bar {
      border-radius: 3px 3px 0 0;
      background: #532ab9;
      opacity: 0.7;
      filter: blur(3px);
    }
  }
  .v-i-lyrics {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 4;
    font-size: 12px;
    color: #ffffff;
    background: rgba($color: #000, $alpha: 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    .v-i-lyric {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0;
    }
  }
}
@media screen and (max-width: 700px), (max-height: 500px) {
  .player-cover {
    margin-top: -70px;
    margin-bottom: 25px;
    width: 290px;
    height: 230px;
    margin-left: auto;
    margin-right: auto;
  }
}
.player-cover__item {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  position: absolute;
  left: 0;
  top: 0;
}
.player-cover__item:before {
  content: "";
  background: inherit;
  width: 100%;
  height: 100%;
  box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
  display: block;
  z-index: 1;
  position: absolute;
  top: 30px;
  transform: scale(0.9);
  filter: blur(10px);
  opacity: 0.9;
  border-radius: 15px;
}
.player-cover__item:after {
  content: "";
  background: inherit;
  width: 100%;
  height: 100%;
  box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
  display: block;
  z-index: 2;
  position: absolute;
  border-radius: 15px;
}
.player-cover__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
  user-select: none;
  pointer-events: none;
}
.player-controls {
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media screen and (max-width: 700px), (max-height: 500px) {
  .player-controls {
    flex-direction: row;
    padding-left: 0;
    width: 100%;
    flex: unset;
  }
}
.player-controls__item {
  display: inline-flex;
  font-size: 30px;
  padding: 5px;
  margin-bottom: 10px;
  color: #acb8cc;
  cursor: pointer;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease-in-out;
}
@media screen and (max-width: 700px), (max-height: 500px) {
  .player-controls__item {
    font-size: 26px;
    padding: 5px;
    margin-right: 10px;
    color: #acb8cc;
    cursor: pointer;
    width: 40px;
    height: 40px;
    margin-bottom: 0;
  }
}
.player-controls__item::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #fff;
  transform: scale(0.5);
  opacity: 0;
  box-shadow: 0px 5px 10px 0px rgba(76, 70, 124, 0.2);
  transition: all 0.3s ease-in-out;
  transition: all 0.4s cubic-bezier(0.35, 0.57, 0.13, 0.88);
}
@media screen and (min-width: 500px) {
  .player-controls__item:hover {
    color: #532ab9;
  }
  .player-controls__item:hover::before {
    opacity: 1;
    transform: scale(1.3);
  }
}
@media screen and (max-width: 700px), (max-height: 500px) {
  .player-controls__item:active {
    color: #532ab9;
  }
  .player-controls__item:active::before {
    opacity: 1;
    transform: scale(1.3);
  }
}
.player-controls__item .icon {
  position: relative;
  z-index: 2;
}
.player-controls__item.-xl {
  margin-bottom: 0;
  font-size: 95px;
  filter: drop-shadow(0 11px 6px rgba(172, 184, 204, 0.45));
  color: #fff;
  width: auto;
  height: auto;
  display: inline-flex;
}
@media screen and (max-width: 700px), (max-height: 500px) {
  .player-controls__item.-xl {
    margin-left: auto;
    font-size: 75px;
    margin-right: 0;
  }
}
.player-controls__item.-xl:before {
  display: none;
}
.player-controls__item.-favorite.active {
  color: red;
}
.player-controls__item.-list.active {
  color: red;
}
.player-controls__item.-list.active::before {
  opacity: 1;
  transform: scale(1.3);
}

[v-cloak] {
  display: none;
}

[v-cloak] > * {
  display: none;
}

.progress {
  width: 100%;
  margin-top: -15px;
  user-select: none;
  text-align: left;
}
.progress__top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.progress__duration {
  color: #71829e;
  font-weight: 700;
  font-size: 20px;
  opacity: 0.5;
}
.progress__time {
  margin-top: 2px;
  color: #71829e;
  font-weight: 700;
  font-size: 16px;
  opacity: 0.7;
}

.progress__bar {
  height: 6px;
  width: 100%;
  cursor: pointer;
  background-color: #d0d8e6;
  display: inline-block;
  border-radius: 10px;
}

.progress__current {
  height: inherit;
  width: 0%;
  background-color: #a3b3ce;
  border-radius: 10px;
}

.album-info {
  color: #71829e;
  flex: 1;
  padding-right: 60px;
  user-select: none;
  overflow: hidden;
}
@media screen and (max-width: 700px), (max-height: 500px) {
  .album-info {
    padding-right: 30px;
  }
}
.album-info__name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
  line-height: 1.3em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media screen and (max-width: 700px), (max-height: 500px) {
  .album-info__name {
    font-size: 18px;
    margin-bottom: 9px;
  }
}
.album-info__track {
  font-weight: 400;
  font-size: 20px;
  opacity: 0.7;
  line-height: 1.3em;
  min-height: 52px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media screen and (max-width: 700px), (max-height: 500px) {
  .album-info__track {
    font-size: 18px;
    min-height: 50px;
  }
}

.v-i-music {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: #fff;
  margin: 0 0 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 30px;
  box-shadow: 0 5px 10px 0 rgba(76, 70, 124, 0.2);
  cursor: pointer;
  pointer-events: auto;
  color: #532ab9;
  transform: scale(1);
  transition: 0.3s;
  animation: trans 10s linear infinite;
  animation-fill-mode: forwards;
  animation-play-state: paused;
  &.v-i-active {
    animation-play-state: running;
    transform: scale(1.2);
    color: #532ab9;
  }
  &:hover {
    transform: scale(1.2) rotate(360deg);
    color: #532ab9;
  }
}

@media screen and (max-width: 700px), (max-height: 500px) {
  .v-i-music {
    align-self: flex-end;
    margin: 40px 30px 0 0;
  }
}

.scale-out-enter-active {
  transition: all 0.35s ease-in-out;
}

.scale-out-leave-active {
  transition: all 0.35s ease-in-out;
}

.scale-out-enter {
  transform: scale(0.55);
  pointer-events: none;
  opacity: 0;
}

.scale-out-leave-to {
  transform: scale(1.2);
  pointer-events: none;
  opacity: 0;
}

.scale-in-enter-active {
  transition: all 0.35s ease-in-out;
}

.scale-in-leave-active {
  transition: all 0.35s ease-in-out;
}

.scale-in-enter {
  transform: scale(1.2);
  pointer-events: none;
  opacity: 0;
}

.scale-in-leave-to {
  transform: scale(0.55);
  pointer-events: none;
  opacity: 0;
}

@keyframes trans {
  from {
    transform: rotate(0deg) scale(1);
  }
  to {
    transform: rotate(360deg) scale(1);
  }
}
</style>

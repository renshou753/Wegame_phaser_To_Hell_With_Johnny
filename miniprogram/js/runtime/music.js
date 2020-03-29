let instance

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if (instance)
      return instance

    instance = this

    this.bgmAudio = new Audio()
    this.bgmAudio.loop = true
    this.bgmAudio.src = 'audio/bgm.mp3'

    this.touchAudio = new Audio()
    this.touchAudio.src = 'audio/touch.mp3'

    this.playBgm()
  }

  playBgm() {
    this.bgmAudio.play()
  }

  playCorrectAnswer(){
    this.touchAudio.play()
  }

  playTouch(floor) {
    if (floor.touched === false){
      this.touchAudio.currentTime = 0
      this.touchAudio.play()
    }

  }
}
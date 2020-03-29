require('./js/libs/weapp-adapter')
window.p2 = require('./js/libs/p2')
window.PIXI = require('./js/libs/pixi')
window.Phaser = require('./js/libs/phaser-split')

// 定义全局常量
window.WIDTH = 375                     // 游戏界面宽度
// 游戏宽度canvas宽度
window.SCALE = WIDTH / canvas.width    
window.HEIGHT = canvas.height * SCALE  // 游戏高度

// 设置被动转发信息
wx.onShareAppMessage(() => {
  return {
    title: '小博大作战'
  }
})
// 显示右上角菜单中的转发选项
wx.showShareMenu({
  withShareTicket: false
})

// 设置离屏 canvas 尺寸
let openDataContext = wx.getOpenDataContext()
let sharedCanvas = openDataContext.canvas
sharedCanvas.width = WIDTH
sharedCanvas.height = HEIGHT

// go: Global Object 用于在 state 之间共享数据和方法
window.go = {
  context: canvas.getContext('2d'),
  game: null,                       // 游戏实例
  userInfo: null,                   // 玩家信息
  common: require('js/common'),     // 公共函数
  blood: 3,                         // 玩家生命
  scores: 0                        // 玩家得分
}

// 初始化游戏
const config = {
  width: WIDTH,
  height: HEIGHT,
  renderer: Phaser.CANVAS,
  canvas: canvas
}
localStorage.debug = '*';

const game = new Phaser.Game(config)
// 全局对象中保存一个 game 的引用
go.game = game
// 注册游戏场景
game.state.add('start', require('./js/states/start'))
game.state.add('menu', require('./js/states/menu'))
game.state.add('practice', require('./js/states/practice'))
game.state.add('ansQuestion', require('./js/states/ansQuestion'))

// 进入 start 场景
game.state.start('start')
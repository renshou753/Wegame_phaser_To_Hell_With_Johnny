/**
 * 主菜单
 */

/**
 * 单机练习按钮回调
 */
function practice() { 
  go.game.state.start('practice')
 }

/**
 * 好友对战按钮回调
 */
function battle() { 
  go.game.state.start('ansQuestion')
 }
 
/**
 * 排行榜按钮回调
 */
function rank() { console.log('rank') }

/**
 * 添加主菜单
 */
function addMenu() {
  [
    // x    y     按钮文本    回调函数
    [124, 375, "单机练习", practice],
    [124, 450, "好友约战", battle],
    [124, 525, "好友排行", rank],
  ].map((btnConfig) => {
    // 调用 common 中的 addBtn 函数创建按钮
    go.common.addBtn({
      x: btnConfig[0],
      y: btnConfig[1],
      text: btnConfig[2],
      callback: btnConfig[3],
    })
  })
}

class Menu extends Phaser.State {
  create() {
    // 背景图
    var bg_menu = this.add.image(0, 0, 'bg_menu')
    bg_menu.width = WIDTH
    bg_menu.height = HEIGHT
    // 添加主菜单
    addMenu()
  }
}

module.exports = Menu
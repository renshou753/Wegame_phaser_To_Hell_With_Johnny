/**
 * 创建“开始”按钮，点击后获取用户基本信息并调用回调，若用户拒绝则没有任何效果
 */

function addStartBtn(cb) {
  const config = {
    type: "Image",
    image: "images/btn_start.png",
    style: {
      left: 124 / SCALE, // 除以 SCALE 是为了将设计稿尺寸转为 canvas 实际尺寸
      top: 435 / SCALE,
      width: 126 / SCALE,
      height: 45 / SCALE
    }
  };
  // wx.createUserInfoButton() 是小游戏 API ，用于创建获取用户信息的按钮，
  // 文档链接：https://developers.weixin.qq.com/minigame/dev/document/open-api/user-info/wx.createUserInfoButton.html
  const startBtn = wx.createUserInfoButton(config);
  startBtn.onTap(res => {
    // 若用户拒绝授权，则返回值没有 userInfo 值
    if (res.userInfo) {
      cb(res.userInfo);
    }
  });
  return startBtn;
}

class Start extends Phaser.State {
  /**
   * Phaser state 的 preload 生命周期可以用来预加载游戏资源
   */
  preload() {
    // 配置画面缩放
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // 预加载资源
    this.load.image("bg_menu", "images/back.png");
    this.load.image("btn", "images/btn_menu.png");
    this.load.image("background", "images/back.png");
    this.load.image("floorNormal", "images/floor0.png");
    this.load.spritesheet("floorIce", "images/floor1.png", 100, 20);
    this.load.spritesheet("floorBounce", "images/floor2.png", 100, 20);
    this.load.image("floorAttack", "images/floor3.png");
    this.load.image("heart", "images/heart.png");
    this.load.image("box", "images/box.png");
    this.load.spritesheet("floorLeft", "images/floor4.png", 100, 20);
    this.load.spritesheet("player", "images/player.png", 40, 50);
    this.load.image("progressBar", "images/progress-bar.png");
    this.load.image("before-select", "images/before-select.png");
  }

  /**
   * Phaser create 生命周期用来初始化游戏场景
   */
  create() {
    // 添加一个图片作为背景
    var bg_menu = this.game.add.image(0, 0, "bg_menu");
    bg_menu.width = WIDTH;
    bg_menu.height = HEIGHT;
    // 添加“开始游戏”按钮
    const startBtn = addStartBtn(userInfo => {
      // 销毁开始按钮
      startBtn.destroy();
      // 将玩家信息存入 global object
      go.userInfo = userInfo;
      // 预加载玩家头像，微信头像为空则不加载
      if (go.userInfo.avatarUrl !== "") {
        this.load.image(go.userInfo.avatarUrl, go.userInfo.avatarUrl);
        // 在 preload 生命周期函数以外进行的资源加载必须手动开始加载
        this.load.start();
      }
      // 跳转主菜单场景
      this.game.state.start("menu");
    });
  }
}

module.exports = Start;

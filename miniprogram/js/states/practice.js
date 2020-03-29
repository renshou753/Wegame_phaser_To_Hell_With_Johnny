import FloorNormal from "../floor/floorNormal.js";
import FloorIce from "../floor/floorIce.js";
import FloorAttack from "../floor/floorAttack.js";
import FloorBounce from "../floor/floorBounce.js";
import FloorLeft from "../floor/floorLeft.js";
import FloorRight from "../floor/floorRight.js";
import FloorQuestion from "../floor/floorQuestion.js"
import QuestionBox from "../box/questionBox.js"
import Music from '../runtime/music'

var player
var platforms
var gameinfoBlood
var questionBox
var playerSpeed = 150
var floorWidth = 100
var floorFrequency = 1.5
var floorType = [
  FloorNormal,
  FloorIce,
  FloorLeft,
  FloorRight,
  FloorBounce,
  FloorAttack,
  FloorQuestion
];


class Practice extends Phaser.State {
  init(currentIndex){
    if(currentIndex){
      this.currentIndex = currentIndex
    }else{
      this.currentIndex = 0
    }
  }
  create() {
    // enable arcade physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // background for our game
    var background = this.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background')
    background.autoScroll(0, 30)

    // init first floor
    this.initFirstFloor()

    // The player and its settings
    player = this.game.add.sprite(WIDTH / 2, 30, 'player');

    //  We need to enable physics on the player
    this.game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = true;
    this.game.physics.arcade.checkCollision.down = false
    this.game.physics.arcade.checkCollision.up = false

    //  Our two animations, walking left and right.
    player.animations.add('right', [2, 3, 4, 5, 6, 7, 8, 9], 10, true);
    player.animations.add('left', [10, 11, 12, 13, 14, 15, 16, 17], 10, true);

    //enable touch event for user to control
    this.initEvent()

    //set timer to generate floor every second
    this.floorTimer = this.game.time.events.loop(Phaser.Timer.SECOND * floorFrequency, this.generateFloors, this)

    // render player blood
    gameinfoBlood = this.add.group()
    this.renderBlood()

    // render player scores
    var textStyle = {
      font: '20px Arial',
      fill: '#000'
    }
    this.scoreText = this.game.add.text(15, 20, '', textStyle)
    this.refreshStat()

    // initiate music
    this.music = new Music()

  }

  update() {

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.isJump = true

    //  Collide the player with the platforms
    this.game.physics.arcade.collide(player, platforms, this.checkCollide, null, this);

    // overlap the player with the question box
    this.game.physics.arcade.overlap(player, questionBox, this.gotoQuestion, null, this);

    if (this.moveType === "left") {
      //  Move to the left
      player.body.velocity.x = -playerSpeed;

      player.animations.play('left');
    } else if (this.moveType === "right") {
      //  Move to the right
      player.body.velocity.x = playerSpeed;

      player.animations.play('right');
    } else if (player.isJump == false) {
      //  Stand still
      player.animations.stop();
      player.frame = 0;
    } else {
      // jump 
      player.frame = 1;
    }

    this.checkGameover()

  }


  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      this.moveType = x > WIDTH / 2 ? "right" : "left"


    }).bind(this))
    canvas.addEventListener('touchend', ((e) => {
      this.moveType = null
      e.preventDefault()

    }).bind(this))
  }

  initFirstFloor() {
    //  The platforms group contains various floor types
    platforms = this.game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the first floor.
    var floor = new FloorNormal(this.game, 130, 300)
    platforms.add(floor)

    platforms.setAll('body.immovable', true)
  }

  generateFloors() {
    let index = Math.ceil(Math.random() * 7 - 1);
    let mstage = floorType[index];
    let posX = go.common.rnd(0, WIDTH - floorWidth)
    let floor = new mstage(this.game, posX, HEIGHT)
    platforms.add(floor)

    // If it's question floor, render a box on top of it
    if (index === 6) {
      questionBox = new QuestionBox(this.game, posX + 35, HEIGHT - 25)
      this.game.add.existing(questionBox)
    }

    // accumulate player scores, the longer player lasts the higher the score is
    go.scores += 1
    this.refreshStat()
  }

  checkCollide(pler, floor) {
    this.music.playTouch(floor);
    floor.touched = true
    pler.isJump = false
    // if hit method exists, pass down player to hit method
    if (floor.hitFloor) {
      floor.hitFloor(pler)
      this.renderBlood()
    }
  }

  renderBlood() {
    gameinfoBlood.killAll()
    for (let i = 0; i < go.blood; i++) {
      let playerBlood = gameinfoBlood.getFirstExists(false)
      if (!playerBlood) {
        playerBlood = gameinfoBlood.create(50 + i * 25, 20, 'heart')
      } else {
        playerBlood.reset(50 + i * 25, 20)
      }
    }
  }

  refreshStat() {
    this.scoreText.text = go.scores
  }

  checkGameover() {
    if (player.y < -50 || player.y > HEIGHT || go.blood <= 0) {
      go.blood = 3
      go.scores = 0
      go.game.state.start('practice')
    }
  }

  gotoQuestion = (pler, ques) => {
    this.currentIndex += 1
    ques.touched = true
    this.game.state.start('ansQuestion', true, false, this.currentIndex)
  }


}



module.exports = Practice
import Question from '../runtime/question';
import Music from '../runtime/music'


class AnsQuestion extends Phaser.State {
  init(currentIndex){
    if(currentIndex){
      this.currentIndex = currentIndex
    }else{
      this.currentIndex = 0
    }
  }
  /**
   * Phaser create 生命周期用来初始化游戏场景
   */
  create() {
    // background for our game
    var background = this.game.add.sprite(0, 0, 'background')
    background.width = WIDTH
    background.height = HEIGHT

    //offset for x axis
    this.offset_x = 0
    this.currentPosY = 0

    // button group
    this.buttonGroup = this.game.add.group();

    // initiate music
    this.music = new Music()

    // retrieve question
    this.question = Question.getInstance().currentList[this.currentIndex]
    this.initQues(this.question)

    // render question title
    this.titleTextStyle = {
      font: '20px Arial',
      fill: '#000',
      wordWrap: true,
      wordWrapWidth: WIDTH,
      align: "left",
    }

    this.answerTextStyle = {
      font: '20px Arial',
      fill: '#000',
      wordWrap: true,
      wordWrapWidth: WIDTH,
      align: "left",
      backgroundColor: '#ff0'
    }

    this.drawHeaderImage()
    this.drawTitle()
    this.drawChoice()

  }

  initQues(data) {
    this.img = data.pic;
    this.title = data.title;
    this.choices = data.choices;
    this.answer = data.answer;
  }

  drawHeaderImage() {
    let img = this.game.add.sprite(this.offset_x, 0, 'progressBar')
    img.scale.setTo(WIDTH / img.width)
  }

  drawTitle() {
    this.drawText(this.title, this.offset_x, 50, WIDTH - 20, go.context, SCALE, this.titleTextStyle);
  }

  drawChoiceItem(index, callback) {

    let buttonConfig = {
      x: this.offset_x,
      y: this.currentPosY + 60 * (index + 1),
      callback: this.selectAnswer,
      context: go.context,
      text: this.choices[index],
      index: index
    }

    let btn = go.common.addBtn(buttonConfig)
    this.buttonGroup.add(btn)

  }

  drawChoice() {
    console.log(this.question)
    for (let i = 0; i < this.choices.length; i++) {
      this.drawChoiceItem(i);
    }
  }

  drawText(t, x, y, w, context, scale, style) {
    var chr = t.split("");
    var temp = "";
    var row = [];

    context.font = style.font;

    for (var a = 0; a < chr.length; a++) {
      if (context.measureText(temp).width < w) {
        ;
      } else {
        row.push(temp);
        temp = "";
      }
      temp += chr[a];
    }

    row.push(temp);

    for (var b = 0; b < row.length; b++) {
      go.common.curState().add.text(x, y + (b + 1) * 20 * scale, row[b], style)
    }

    // reset current y position in order to render next element
    this.currentPosY = y + row.length * 20 * scale

  }

  selectAnswer = (btn) => {
    // loop arr to show corrent answer to the player
    this.buttonGroup.forEach(element => {
      if(element.index!=this.question.answer){
        element.kill()
      }
    })

    // if user selects corrent answer adds score
    if (btn.index == this.question.answer) {
      this.music.playCorrectAnswer()
      go.scores += 10
    }

    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.gotoJump, this);

  }

  gotoJump(){
    this.game.state.start('practice', true, false, this.currentIndex)
  }

}

module.exports = AnsQuestion
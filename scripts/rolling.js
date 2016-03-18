var MAX_FREQ = 22;
var FONT_SIZE = 75;
var WAIT_COEFFICIENT = 1.1;
var SPACING = 8;

function Rolling(list, width, height) {
  var that = this; 

  this.list = list;
  this.width = width;
  this.height = height;
  this.nowPos = 0;
  this.toNext = function(ratio) {
    this.nowPos = (this.nowPos + 1) % list.length;
    var time = 1000 / (MAX_FREQ * ratio);
    this.prevDiv.stop(false, true);
    this.nextDiv.stop(false, true);
    this.prevDiv.animate({
      top: height + 'px'
    }, time, function(){
      that.prevDiv.css('top', '0px');
      that.prevDiv.children().html(list[that.nowPos]);
    });
    this.nextDiv.animate({
      bottom: '0px'
    }, time, function(){
      that.nextDiv.css('bottom', height + 'px');
      that.nextDiv.children().html(list[(that.nowPos + 1) % list.length])
    });
  };
  this.box = $('<div></div>');
  this.prevDiv = $('<div><div class="content">' + list[0] + '</div></div>');
  this.nextDiv = $('<div><div class="content">' + list[1] + '</div></div>');
  this.box.appendTo($('body'));
  this.box.css({
    'width': width + 'px',
    'height': height + 'px',
    'font-size': FONT_SIZE + 'px',
    'letter-spacing': SPACING + 'px',
    'position': 'relative',
    'overflow': 'hidden'
  });
  this.prevDiv.css({
    //'background': 'blue',
    'width': '100%',
    'height': '100%',
    'position': 'absolute'
  }).appendTo(this.box);
  this.nextDiv.css({
    //'background': 'pink',
    'width': '100%',
    'height': '100%',
    'position': 'absolute',
    'bottom': height + 'px'
  }).appendTo(this.box);
  var content = $('.content');
  content.css({
    'text-align': 'center',
    'position': 'relative',
    'top': (that.height - content.height()) / 2 +'px',
    'color':'#222',
    'text-shadow': '0px 2px 3px #555'
  });
  var playing = false, sh;
  $(window).bind('anotherKeydown', function(event, keyCode) {
    if (keyCode != 32) return;
    if (!playing) {
      playing = true;
      setTimeout(function() {
        that.toNext(0.2);
        setTimeout(function () {
          that.toNext(0.3);
          setTimeout(function() {
            that.toNext(0.4);
            setTimeout(function() {
              that.toNext(0.6);
              sh = setInterval(function() {that.toNext(1);}, 1000 / MAX_FREQ * WAIT_COEFFICIENT);
            }, 1000 / (MAX_FREQ * 0.6) * WAIT_COEFFICIENT);
          }, 1000 / (MAX_FREQ * 0.4) * WAIT_COEFFICIENT);
        }, 1000 / (MAX_FREQ * 0.3) * WAIT_COEFFICIENT);
      }, 1000 / (MAX_FREQ * 0.2) * WAIT_COEFFICIENT);
    }
    else {
      clearInterval(sh);
      /*
      var nowRatio = 0.8;
      sh = setInterval(function() {
        that.toNext(nowRatio);
        nowRatio -= 0.2;
        if (nowRatio < 0.1) clearInterval(sh);
      }, 1000 / (MAX_FREQ * nowRatio) * WAIT_COEFFICIENT);
      */
      playing = false;
      setTimeout(function() {
        that.toNext(0.8);
        setTimeout(function () {
          that.toNext(0.6);
          setTimeout(function() {
            that.toNext(0.4);
            setTimeout(function() {
              that.toNext(0.2);
            }, 1000 / (MAX_FREQ * 0.2) * WAIT_COEFFICIENT);
          }, 1000 / (MAX_FREQ * 0.4) * WAIT_COEFFICIENT);
        }, 1000 / (MAX_FREQ * 0.6) * WAIT_COEFFICIENT);
      }, 1000 / (MAX_FREQ * 0.8) * WAIT_COEFFICIENT);
    }
  });
  return this.box;
}
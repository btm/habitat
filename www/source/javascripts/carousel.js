function Carousel(slides, nav, opts) {
  $slides = $(slides);
  $nav = [].concat(nav).map(function(nav) { return $(nav); });

  this.dom = {
    slideParent: $slides.parent(),
    slides: $slides,
    navParent: $nav[0].parent(),
    nav: $nav,
    window: $(window)
  }
  this.current = 0;
  this.len = this.dom.slides.length;

  this.opts = Object.assign({
    smallBreakpoint: 640,
    activeClass: 'is-active',
    intervalLength: 10000,
    onRotate: function() {},
    navArrows: opts.navArrows ? [].concat(opts.navArrows).map(function(nav) { return $(nav); }) : undefined
  }, opts);

  this.rotators = this.dom.nav.concat(this.dom.slides);
  this.dom.window.resize(this.resizeParent.bind(this));

  this.timeout;
  this.init();
}

Carousel.prototype.init = function() {
  $(this.dom.nav).each(function(_navIdx, navArray) {
    navArray.each(function(idx, el) {
      $(el).attr('data-idx', idx).on('click', this.rotate.bind(this, idx));
    }.bind(this));
  }.bind(this));

  $(this.dom.slideParent).mouseenter(this.stop.bind(this)).mouseleave(this.start.bind(this, this.opts.intervalLength));

  if (this.opts.navArrows) {
    console.log(this.opts.navArrows)
    // this.opts.navArrows.forEach(function(el) {

    // })
  }

  this.resizeParent();
  this.rotate(0, true);
}

Carousel.prototype.start = function(delay) {
  this.stop();
  this.timeout = setTimeout(this.rotate.bind(this), delay || 1)
}

Carousel.prototype.stop = function() {
  clearTimeout(this.timeout);
}

Carousel.prototype.rotate = function(target, initialRotate) {
  var next = target !== undefined ? target :
    this.current + 1 === this.len ? 0 : this.current + 1;

  this.rotators.forEach(function(rotatorArray) {
    $(rotatorArray[this.current]).removeClass(this.opts.activeClass);
    $(rotatorArray[next]).addClass(this.opts.activeClass);
  }.bind(this));

  this.dom.slideParent.attr('data-currentIdx', next);
  this.dom.navParent.attr('data-currentIdx', next);
  this.current = next;

  this.opts.onRotate.call(this);

  this.start(target !== undefined && initialRotate !== true ? this.opts.intervalLength * 6 : this.opts.intervalLength);
}

Carousel.prototype.resizeParent = function() {
  var height = 0;

  this.dom.slides.each(function() {
    if ($(this).height() > height) {
      height = $(this).height();
    }
  })
  this.dom.slideParent.height(height);
  this.dom.slides.height(height);
}
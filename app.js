gsap.registerPlugin(ScrollTrigger);

class HorizontalScroll {
  constructor(options, callback) {
    this.defaultOptions = {
      wrapperElem: ".horizontalScroll",
      bodyElem: ".horizontalScroll__body",
      itemElem: ".horizontalScroll__item",
      ease: "none",
    };

    this.options = Object.assign(this.defaultOptions, options);

    // DOM
    this.DOM = {
      wrapper: document.querySelector(this.options.wrapperElem),
      body: document.querySelector(this.options.bodyElem),
      items: gsap.utils.toArray(this.options.itemElem),
    };

    this.callback = callback;

    this._init();
  }

  _init() {
    if (!this.DOM.wrapper) {
      return false;
    }

    // bodyの幅を取得
    this.HorizontalScrollWidth = this.DOM.body.clientWidth;

    gsap.to(this.DOM.body, {
      xPercent: -100 * (this.DOM.items.length - 1), // itemの数だけ translateXを -100%する
      ease: this.options.ease,
      scrollTrigger: {
        trigger: this.DOM.body,
        pin: true,
        scrub: 1,
        end: () => `+=${this.HorizontalScrollWidth * (this.DOM.items.length - 1)}`, // Itemの数まで
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }
}

new HorizontalScroll();

const anchors = document.querySelectorAll("a[href^='#']");

anchors.forEach((anchor) => {
  const id = anchor.getAttribute("href");
  const element = document.querySelector(id);
  const targetDOMRect = element.offsetLeft;
  element.setAttribute("data-x", targetDOMRect);

  anchor.addEventListener("click", () => {
    const x = Number(element.getAttribute("data-x"));

    const targetTop = x;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  });
});

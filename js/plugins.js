// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;
  var noop = function noop() {};
  var methods = [
    "assert",
    "clear",
    "count",
    "debug",
    "dir",
    "dirxml",
    "error",
    "exception",
    "group",
    "groupCollapsed",
    "groupEnd",
    "info",
    "log",
    "markTimeline",
    "profile",
    "profileEnd",
    "table",
    "time",
    "timeEnd",
    "timeStamp",
    "trace",
    "warn",
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});
  while (length--) {
    method = methods[length];
    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
})();

/*!
 * jquery.counterup.js
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Date: Nov 26, 2013
 */ (function (e) {
  "use strict";
  e.fn.counterUp = function (t) {
    var n = e.extend({ time: 400, delay: 10 }, t);
    return this.each(function () {
      var t = e(this),
        r = n,
        i = function () {
          var e = [],
            n = r.time / r.delay,
            i = t.text(),
            s = /[0-9]+,[0-9]+/.test(i);
          i = i.replace(/,/g, "");
          var o = /^[0-9]+$/.test(i),
            u = /^[0-9]+\.[0-9]+$/.test(i),
            a = u ? (i.split(".")[1] || []).length : 0;
          for (var f = n; f >= 1; f--) {
            var l = parseInt((i / n) * f);
            u && (l = parseFloat((i / n) * f).toFixed(a));
            if (s)
              while (/(\d+)(\d{3})/.test(l.toString()))
                l = l.toString().replace(/(\d+)(\d{3})/, "$1,$2");
            e.unshift(l);
          }
          t.data("counterup-nums", e);
          t.text("0");
          var c = function () {
            t.text(t.data("counterup-nums").shift());
            if (t.data("counterup-nums").length)
              setTimeout(t.data("counterup-func"), r.delay);
            else {
              delete t.data("counterup-nums");
              t.data("counterup-nums", null);
              t.data("counterup-func", null);
            }
          };
          t.data("counterup-func", c);
          setTimeout(t.data("counterup-func"), r.delay);
        };
      t.waypoint(i, { offset: "100%", triggerOnce: !0 });
    });
  };
})(jQuery);

// Owl Carousel js

!(function (a, b, c, d) {
  function e(b, c) {
    (this.settings = null),
      (this.options = a.extend({}, e.Defaults, c)),
      (this.$element = a(b)),
      (this.drag = a.extend({}, m)),
      (this.state = a.extend({}, n)),
      (this.e = a.extend({}, o)),
      (this._plugins = {}),
      (this._supress = {}),
      (this._current = null),
      (this._speed = null),
      (this._coordinates = []),
      (this._breakpoint = null),
      (this._width = null),
      (this._items = []),
      (this._clones = []),
      (this._mergers = []),
      (this._invalidated = {}),
      (this._pipe = []),
      a.each(
        e.Plugins,
        a.proxy(function (a, b) {
          this._plugins[a[0].toLowerCase() + a.slice(1)] = new b(this);
        }, this)
      ),
      a.each(
        e.Pipe,
        a.proxy(function (b, c) {
          this._pipe.push({ filter: c.filter, run: a.proxy(c.run, this) });
        }, this)
      ),
      this.setup(),
      this.initialize();
  }
  function f(a) {
    if (a.touches !== d)
      return { x: a.touches[0].pageX, y: a.touches[0].pageY };
    if (a.touches === d) {
      if (a.pageX !== d) return { x: a.pageX, y: a.pageY };
      if (a.pageX === d) return { x: a.clientX, y: a.clientY };
    }
  }
  function g(a) {
    var b,
      d,
      e = c.createElement("div"),
      f = a;
    for (b in f)
      if (((d = f[b]), "undefined" != typeof e.style[d]))
        return (e = null), [d, b];
    return [!1];
  }
  function h() {
    return g([
      "transition",
      "WebkitTransition",
      "MozTransition",
      "OTransition",
    ])[1];
  }
  function i() {
    return g([
      "transform",
      "WebkitTransform",
      "MozTransform",
      "OTransform",
      "msTransform",
    ])[0];
  }
  function j() {
    return g([
      "perspective",
      "webkitPerspective",
      "MozPerspective",
      "OPerspective",
      "MsPerspective",
    ])[0];
  }
  function k() {
    return "ontouchstart" in b || !!navigator.msMaxTouchPoints;
  }
  function l() {
    return b.navigator.msPointerEnabled;
  }
  var m, n, o;
  (m = {
    start: 0,
    startX: 0,
    startY: 0,
    current: 0,
    currentX: 0,
    currentY: 0,
    offsetX: 0,
    offsetY: 0,
    distance: null,
    startTime: 0,
    endTime: 0,
    updatedX: 0,
    targetEl: null,
  }),
    (n = {
      isTouch: !1,
      isScrolling: !1,
      isSwiping: !1,
      direction: !1,
      inMotion: !1,
    }),
    (o = {
      _onDragStart: null,
      _onDragMove: null,
      _onDragEnd: null,
      _transitionEnd: null,
      _resizer: null,
      _responsiveCall: null,
      _goToLoop: null,
      _checkVisibile: null,
    }),
    (e.Defaults = {
      items: 3,
      loop: !1,
      center: !1,
      mouseDrag: !0,
      touchDrag: !0,
      pullDrag: !0,
      freeDrag: !1,
      margin: 0,
      stagePadding: 0,
      merge: !1,
      mergeFit: !0,
      autoWidth: !1,
      startPosition: 0,
      rtl: !1,
      smartSpeed: 250,
      fluidSpeed: !1,
      dragEndSpeed: !1,
      responsive: {},
      responsiveRefreshRate: 200,
      responsiveBaseElement: b,
      responsiveClass: !1,
      fallbackEasing: "swing",
      info: !1,
      nestedItemSelector: !1,
      itemElement: "div",
      stageElement: "div",
      themeClass: "owl-theme",
      baseClass: "owl-carousel",
      itemClass: "owl-item",
      centerClass: "center",
      activeClass: "active",
    }),
    (e.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
    (e.Plugins = {}),
    (e.Pipe = [
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          a.current = this._items && this._items[this.relative(this._current)];
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          var a = this._clones,
            b = this.$stage.children(".cloned");
          (b.length !== a.length || (!this.settings.loop && a.length > 0)) &&
            (this.$stage.children(".cloned").remove(), (this._clones = []));
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          var a,
            b,
            c = this._clones,
            d = this._items,
            e = this.settings.loop
              ? c.length - Math.max(2 * this.settings.items, 4)
              : 0;
          for (a = 0, b = Math.abs(e / 2); b > a; a++)
            e > 0
              ? (this.$stage
                  .children()
                  .eq(d.length + c.length - 1)
                  .remove(),
                c.pop(),
                this.$stage.children().eq(0).remove(),
                c.pop())
              : (c.push(c.length / 2),
                this.$stage.append(
                  d[c[c.length - 1]].clone().addClass("cloned")
                ),
                c.push(d.length - 1 - (c.length - 1) / 2),
                this.$stage.prepend(
                  d[c[c.length - 1]].clone().addClass("cloned")
                ));
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          var a,
            b,
            c,
            d = this.settings.rtl ? 1 : -1,
            e = (this.width() / this.settings.items).toFixed(3),
            f = 0;
          for (
            this._coordinates = [],
              b = 0,
              c = this._clones.length + this._items.length;
            c > b;
            b++
          )
            (a = this._mergers[this.relative(b)]),
              (a =
                (this.settings.mergeFit && Math.min(a, this.settings.items)) ||
                a),
              (f +=
                (this.settings.autoWidth
                  ? this._items[this.relative(b)].width() + this.settings.margin
                  : e * a) * d),
              this._coordinates.push(f);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          var b,
            c,
            d = (this.width() / this.settings.items).toFixed(3),
            e = {
              width:
                Math.abs(this._coordinates[this._coordinates.length - 1]) +
                2 * this.settings.stagePadding,
              "padding-left": this.settings.stagePadding || "",
              "padding-right": this.settings.stagePadding || "",
            };
          if (
            (this.$stage.css(e),
            (e = {
              width: this.settings.autoWidth
                ? "auto"
                : d - this.settings.margin,
            }),
            (e[this.settings.rtl ? "margin-left" : "margin-right"] =
              this.settings.margin),
            !this.settings.autoWidth &&
              a.grep(this._mergers, function (a) {
                return a > 1;
              }).length > 0)
          )
            for (b = 0, c = this._coordinates.length; c > b; b++)
              (e.width =
                Math.abs(this._coordinates[b]) -
                Math.abs(this._coordinates[b - 1] || 0) -
                this.settings.margin),
                this.$stage.children().eq(b).css(e);
          else this.$stage.children().css(e);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          a.current && this.reset(this.$stage.children().index(a.current));
        },
      },
      {
        filter: ["position"],
        run: function () {
          this.animate(this.coordinates(this._current));
        },
      },
      {
        filter: ["width", "position", "items", "settings"],
        run: function () {
          var a,
            b,
            c,
            d,
            e = this.settings.rtl ? 1 : -1,
            f = 2 * this.settings.stagePadding,
            g = this.coordinates(this.current()) + f,
            h = g + this.width() * e,
            i = [];
          for (c = 0, d = this._coordinates.length; d > c; c++)
            (a = this._coordinates[c - 1] || 0),
              (b = Math.abs(this._coordinates[c]) + f * e),
              ((this.op(a, "<=", g) && this.op(a, ">", h)) ||
                (this.op(b, "<", g) && this.op(b, ">", h))) &&
                i.push(c);
          this.$stage
            .children("." + this.settings.activeClass)
            .removeClass(this.settings.activeClass),
            this.$stage
              .children(":eq(" + i.join("), :eq(") + ")")
              .addClass(this.settings.activeClass),
            this.settings.center &&
              (this.$stage
                .children("." + this.settings.centerClass)
                .removeClass(this.settings.centerClass),
              this.$stage
                .children()
                .eq(this.current())
                .addClass(this.settings.centerClass));
        },
      },
    ]),
    (e.prototype.initialize = function () {
      if (
        (this.trigger("initialize"),
        this.$element
          .addClass(this.settings.baseClass)
          .addClass(this.settings.themeClass)
          .toggleClass("owl-rtl", this.settings.rtl),
        this.browserSupport(),
        this.settings.autoWidth && this.state.imagesLoaded !== !0)
      ) {
        var b, c, e;
        if (
          ((b = this.$element.find("img")),
          (c = this.settings.nestedItemSelector
            ? "." + this.settings.nestedItemSelector
            : d),
          (e = this.$element.children(c).width()),
          b.length && 0 >= e)
        )
          return this.preloadAutoWidthImages(b), !1;
      }
      this.$element.addClass("owl-loading"),
        (this.$stage = a(
          "<" + this.settings.stageElement + ' class="owl-stage"/>'
        ).wrap('<div class="owl-stage-outer">')),
        this.$element.append(this.$stage.parent()),
        this.replace(this.$element.children().not(this.$stage.parent())),
        (this._width = this.$element.width()),
        this.refresh(),
        this.$element.removeClass("owl-loading").addClass("owl-loaded"),
        this.eventsCall(),
        this.internalEvents(),
        this.addTriggerableEvents(),
        this.trigger("initialized");
    }),
    (e.prototype.setup = function () {
      var b = this.viewport(),
        c = this.options.responsive,
        d = -1,
        e = null;
      c
        ? (a.each(c, function (a) {
            b >= a && a > d && (d = Number(a));
          }),
          (e = a.extend({}, this.options, c[d])),
          delete e.responsive,
          e.responsiveClass &&
            this.$element
              .attr("class", function (a, b) {
                return b.replace(/\b owl-responsive-\S+/g, "");
              })
              .addClass("owl-responsive-" + d))
        : (e = a.extend({}, this.options)),
        (null === this.settings || this._breakpoint !== d) &&
          (this.trigger("change", { property: { name: "settings", value: e } }),
          (this._breakpoint = d),
          (this.settings = e),
          this.invalidate("settings"),
          this.trigger("changed", {
            property: { name: "settings", value: this.settings },
          }));
    }),
    (e.prototype.optionsLogic = function () {
      this.$element.toggleClass("owl-center", this.settings.center),
        this.settings.loop &&
          this._items.length < this.settings.items &&
          (this.settings.loop = !1),
        this.settings.autoWidth &&
          ((this.settings.stagePadding = !1), (this.settings.merge = !1));
    }),
    (e.prototype.prepare = function (b) {
      var c = this.trigger("prepare", { content: b });
      return (
        c.data ||
          (c.data = a("<" + this.settings.itemElement + "/>")
            .addClass(this.settings.itemClass)
            .append(b)),
        this.trigger("prepared", { content: c.data }),
        c.data
      );
    }),
    (e.prototype.update = function () {
      for (
        var b = 0,
          c = this._pipe.length,
          d = a.proxy(function (a) {
            return this[a];
          }, this._invalidated),
          e = {};
        c > b;

      )
        (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) &&
          this._pipe[b].run(e),
          b++;
      this._invalidated = {};
    }),
    (e.prototype.width = function (a) {
      switch ((a = a || e.Width.Default)) {
        case e.Width.Inner:
        case e.Width.Outer:
          return this._width;
        default:
          return (
            this._width - 2 * this.settings.stagePadding + this.settings.margin
          );
      }
    }),
    (e.prototype.refresh = function () {
      if (0 === this._items.length) return !1;
      new Date().getTime();
      this.trigger("refresh"),
        this.setup(),
        this.optionsLogic(),
        this.$stage.addClass("owl-refresh"),
        this.update(),
        this.$stage.removeClass("owl-refresh"),
        (this.state.orientation = b.orientation),
        this.watchVisibility(),
        this.trigger("refreshed");
    }),
    (e.prototype.eventsCall = function () {
      (this.e._onDragStart = a.proxy(function (a) {
        this.onDragStart(a);
      }, this)),
        (this.e._onDragMove = a.proxy(function (a) {
          this.onDragMove(a);
        }, this)),
        (this.e._onDragEnd = a.proxy(function (a) {
          this.onDragEnd(a);
        }, this)),
        (this.e._onResize = a.proxy(function (a) {
          this.onResize(a);
        }, this)),
        (this.e._transitionEnd = a.proxy(function (a) {
          this.transitionEnd(a);
        }, this)),
        (this.e._preventClick = a.proxy(function (a) {
          this.preventClick(a);
        }, this));
    }),
    (e.prototype.onThrottledResize = function () {
      b.clearTimeout(this.resizeTimer),
        (this.resizeTimer = b.setTimeout(
          this.e._onResize,
          this.settings.responsiveRefreshRate
        ));
    }),
    (e.prototype.onResize = function () {
      return this._items.length
        ? this._width === this.$element.width()
          ? !1
          : this.trigger("resize").isDefaultPrevented()
          ? !1
          : ((this._width = this.$element.width()),
            this.invalidate("width"),
            this.refresh(),
            void this.trigger("resized"))
        : !1;
    }),
    (e.prototype.eventsRouter = function (a) {
      var b = a.type;
      "mousedown" === b || "touchstart" === b
        ? this.onDragStart(a)
        : "mousemove" === b || "touchmove" === b
        ? this.onDragMove(a)
        : "mouseup" === b || "touchend" === b
        ? this.onDragEnd(a)
        : "touchcancel" === b && this.onDragEnd(a);
    }),
    (e.prototype.internalEvents = function () {
      var c = (k(), l());
      this.settings.mouseDrag
        ? (this.$stage.on(
            "mousedown",
            a.proxy(function (a) {
              this.eventsRouter(a);
            }, this)
          ),
          this.$stage.on("dragstart", function () {
            return !1;
          }),
          (this.$stage.get(0).onselectstart = function () {
            return !1;
          }))
        : this.$element.addClass("owl-text-select-on"),
        this.settings.touchDrag &&
          !c &&
          this.$stage.on(
            "touchstart touchcancel",
            a.proxy(function (a) {
              this.eventsRouter(a);
            }, this)
          ),
        this.transitionEndVendor &&
          this.on(
            this.$stage.get(0),
            this.transitionEndVendor,
            this.e._transitionEnd,
            !1
          ),
        this.settings.responsive !== !1 &&
          this.on(b, "resize", a.proxy(this.onThrottledResize, this));
    }),
    (e.prototype.onDragStart = function (d) {
      var e, g, h, i;
      if (
        ((e = d.originalEvent || d || b.event),
        3 === e.which || this.state.isTouch)
      )
        return !1;
      if (
        ("mousedown" === e.type && this.$stage.addClass("owl-grab"),
        this.trigger("drag"),
        (this.drag.startTime = new Date().getTime()),
        this.speed(0),
        (this.state.isTouch = !0),
        (this.state.isScrolling = !1),
        (this.state.isSwiping = !1),
        (this.drag.distance = 0),
        (g = f(e).x),
        (h = f(e).y),
        (this.drag.offsetX = this.$stage.position().left),
        (this.drag.offsetY = this.$stage.position().top),
        this.settings.rtl &&
          (this.drag.offsetX =
            this.$stage.position().left +
            this.$stage.width() -
            this.width() +
            this.settings.margin),
        this.state.inMotion && this.support3d)
      )
        (i = this.getTransformProperty()),
          (this.drag.offsetX = i),
          this.animate(i),
          (this.state.inMotion = !0);
      else if (this.state.inMotion && !this.support3d)
        return (this.state.inMotion = !1), !1;
      (this.drag.startX = g - this.drag.offsetX),
        (this.drag.startY = h - this.drag.offsetY),
        (this.drag.start = g - this.drag.startX),
        (this.drag.targetEl = e.target || e.srcElement),
        (this.drag.updatedX = this.drag.start),
        ("IMG" === this.drag.targetEl.tagName ||
          "A" === this.drag.targetEl.tagName) &&
          (this.drag.targetEl.draggable = !1),
        a(c).on(
          "mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents",
          a.proxy(function (a) {
            this.eventsRouter(a);
          }, this)
        );
    }),
    (e.prototype.onDragMove = function (a) {
      var c, e, g, h, i, j;
      this.state.isTouch &&
        (this.state.isScrolling ||
          ((c = a.originalEvent || a || b.event),
          (e = f(c).x),
          (g = f(c).y),
          (this.drag.currentX = e - this.drag.startX),
          (this.drag.currentY = g - this.drag.startY),
          (this.drag.distance = this.drag.currentX - this.drag.offsetX),
          this.drag.distance < 0
            ? (this.state.direction = this.settings.rtl ? "right" : "left")
            : this.drag.distance > 0 &&
              (this.state.direction = this.settings.rtl ? "left" : "right"),
          this.settings.loop
            ? this.op(
                this.drag.currentX,
                ">",
                this.coordinates(this.minimum())
              ) && "right" === this.state.direction
              ? (this.drag.currentX -=
                  (this.settings.center && this.coordinates(0)) -
                  this.coordinates(this._items.length))
              : this.op(
                  this.drag.currentX,
                  "<",
                  this.coordinates(this.maximum())
                ) &&
                "left" === this.state.direction &&
                (this.drag.currentX +=
                  (this.settings.center && this.coordinates(0)) -
                  this.coordinates(this._items.length))
            : ((h = this.coordinates(
                this.settings.rtl ? this.maximum() : this.minimum()
              )),
              (i = this.coordinates(
                this.settings.rtl ? this.minimum() : this.maximum()
              )),
              (j = this.settings.pullDrag ? this.drag.distance / 5 : 0),
              (this.drag.currentX = Math.max(
                Math.min(this.drag.currentX, h + j),
                i + j
              ))),
          (this.drag.distance > 8 || this.drag.distance < -8) &&
            (c.preventDefault !== d ? c.preventDefault() : (c.returnValue = !1),
            (this.state.isSwiping = !0)),
          (this.drag.updatedX = this.drag.currentX),
          (this.drag.currentY > 16 || this.drag.currentY < -16) &&
            this.state.isSwiping === !1 &&
            ((this.state.isScrolling = !0),
            (this.drag.updatedX = this.drag.start)),
          this.animate(this.drag.updatedX)));
    }),
    (e.prototype.onDragEnd = function (b) {
      var d, e, f;
      if (this.state.isTouch) {
        if (
          ("mouseup" === b.type && this.$stage.removeClass("owl-grab"),
          this.trigger("dragged"),
          this.drag.targetEl.removeAttribute("draggable"),
          (this.state.isTouch = !1),
          (this.state.isScrolling = !1),
          (this.state.isSwiping = !1),
          0 === this.drag.distance && this.state.inMotion !== !0)
        )
          return (this.state.inMotion = !1), !1;
        (this.drag.endTime = new Date().getTime()),
          (d = this.drag.endTime - this.drag.startTime),
          (e = Math.abs(this.drag.distance)),
          (e > 3 || d > 300) && this.removeClick(this.drag.targetEl),
          (f = this.closest(this.drag.updatedX)),
          this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
          this.current(f),
          this.invalidate("position"),
          this.update(),
          this.settings.pullDrag ||
            this.drag.updatedX !== this.coordinates(f) ||
            this.transitionEnd(),
          (this.drag.distance = 0),
          a(c).off(".owl.dragEvents");
      }
    }),
    (e.prototype.removeClick = function (c) {
      (this.drag.targetEl = c),
        a(c).on("click.preventClick", this.e._preventClick),
        b.setTimeout(function () {
          a(c).off("click.preventClick");
        }, 300);
    }),
    (e.prototype.preventClick = function (b) {
      b.preventDefault ? b.preventDefault() : (b.returnValue = !1),
        b.stopPropagation && b.stopPropagation(),
        a(b.target).off("click.preventClick");
    }),
    (e.prototype.getTransformProperty = function () {
      var a, c;
      return (
        (a = b
          .getComputedStyle(this.$stage.get(0), null)
          .getPropertyValue(this.vendorName + "transform")),
        (a = a.replace(/matrix(3d)?\(|\)/g, "").split(",")),
        (c = 16 === a.length),
        c !== !0 ? a[4] : a[12]
      );
    }),
    (e.prototype.closest = function (b) {
      var c = -1,
        d = 30,
        e = this.width(),
        f = this.coordinates();
      return (
        this.settings.freeDrag ||
          a.each(
            f,
            a.proxy(function (a, g) {
              return (
                b > g - d && g + d > b
                  ? (c = a)
                  : this.op(b, "<", g) &&
                    this.op(b, ">", f[a + 1] || g - e) &&
                    (c = "left" === this.state.direction ? a + 1 : a),
                -1 === c
              );
            }, this)
          ),
        this.settings.loop ||
          (this.op(b, ">", f[this.minimum()])
            ? (c = b = this.minimum())
            : this.op(b, "<", f[this.maximum()]) && (c = b = this.maximum())),
        c
      );
    }),
    (e.prototype.animate = function (b) {
      this.trigger("translate"),
        (this.state.inMotion = this.speed() > 0),
        this.support3d
          ? this.$stage.css({
              transform: "translate3d(" + b + "px,0px, 0px)",
              transition: this.speed() / 1e3 + "s",
            })
          : this.state.isTouch
          ? this.$stage.css({ left: b + "px" })
          : this.$stage.animate(
              { left: b },
              this.speed() / 1e3,
              this.settings.fallbackEasing,
              a.proxy(function () {
                this.state.inMotion && this.transitionEnd();
              }, this)
            );
    }),
    (e.prototype.current = function (a) {
      if (a === d) return this._current;
      if (0 === this._items.length) return d;
      if (((a = this.normalize(a)), this._current !== a)) {
        var b = this.trigger("change", {
          property: { name: "position", value: a },
        });
        b.data !== d && (a = this.normalize(b.data)),
          (this._current = a),
          this.invalidate("position"),
          this.trigger("changed", {
            property: { name: "position", value: this._current },
          });
      }
      return this._current;
    }),
    (e.prototype.invalidate = function (a) {
      this._invalidated[a] = !0;
    }),
    (e.prototype.reset = function (a) {
      (a = this.normalize(a)),
        a !== d &&
          ((this._speed = 0),
          (this._current = a),
          this.suppress(["translate", "translated"]),
          this.animate(this.coordinates(a)),
          this.release(["translate", "translated"]));
    }),
    (e.prototype.normalize = function (b, c) {
      var e = c ? this._items.length : this._items.length + this._clones.length;
      return !a.isNumeric(b) || 1 > e
        ? d
        : (b = this._clones.length
            ? ((b % e) + e) % e
            : Math.max(this.minimum(c), Math.min(this.maximum(c), b)));
    }),
    (e.prototype.relative = function (a) {
      return (
        (a = this.normalize(a)),
        (a -= this._clones.length / 2),
        this.normalize(a, !0)
      );
    }),
    (e.prototype.maximum = function (a) {
      var b,
        c,
        d,
        e = 0,
        f = this.settings;
      if (a) return this._items.length - 1;
      if (!f.loop && f.center) b = this._items.length - 1;
      else if (f.loop || f.center)
        if (f.loop || f.center) b = this._items.length + f.items;
        else {
          if (!f.autoWidth && !f.merge)
            throw "Can not detect maximum absolute position.";
          for (
            revert = f.rtl ? 1 : -1,
              c = this.$stage.width() - this.$element.width();
            (d = this.coordinates(e)) && !(d * revert >= c);

          )
            b = ++e;
        }
      else b = this._items.length - f.items;
      return b;
    }),
    (e.prototype.minimum = function (a) {
      return a ? 0 : this._clones.length / 2;
    }),
    (e.prototype.items = function (a) {
      return a === d
        ? this._items.slice()
        : ((a = this.normalize(a, !0)), this._items[a]);
    }),
    (e.prototype.mergers = function (a) {
      return a === d
        ? this._mergers.slice()
        : ((a = this.normalize(a, !0)), this._mergers[a]);
    }),
    (e.prototype.clones = function (b) {
      var c = this._clones.length / 2,
        e = c + this._items.length,
        f = function (a) {
          return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2;
        };
      return b === d
        ? a.map(this._clones, function (a, b) {
            return f(b);
          })
        : a.map(this._clones, function (a, c) {
            return a === b ? f(c) : null;
          });
    }),
    (e.prototype.speed = function (a) {
      return a !== d && (this._speed = a), this._speed;
    }),
    (e.prototype.coordinates = function (b) {
      var c = null;
      return b === d
        ? a.map(
            this._coordinates,
            a.proxy(function (a, b) {
              return this.coordinates(b);
            }, this)
          )
        : (this.settings.center
            ? ((c = this._coordinates[b]),
              (c +=
                ((this.width() - c + (this._coordinates[b - 1] || 0)) / 2) *
                (this.settings.rtl ? -1 : 1)))
            : (c = this._coordinates[b - 1] || 0),
          c);
    }),
    (e.prototype.duration = function (a, b, c) {
      return (
        Math.min(Math.max(Math.abs(b - a), 1), 6) *
        Math.abs(c || this.settings.smartSpeed)
      );
    }),
    (e.prototype.to = function (c, d) {
      if (this.settings.loop) {
        var e = c - this.relative(this.current()),
          f = this.current(),
          g = this.current(),
          h = this.current() + e,
          i = 0 > g - h ? !0 : !1,
          j = this._clones.length + this._items.length;
        h < this.settings.items && i === !1
          ? ((f = g + this._items.length), this.reset(f))
          : h >= j - this.settings.items &&
            i === !0 &&
            ((f = g - this._items.length), this.reset(f)),
          b.clearTimeout(this.e._goToLoop),
          (this.e._goToLoop = b.setTimeout(
            a.proxy(function () {
              this.speed(this.duration(this.current(), f + e, d)),
                this.current(f + e),
                this.update();
            }, this),
            30
          ));
      } else
        this.speed(this.duration(this.current(), c, d)),
          this.current(c),
          this.update();
    }),
    (e.prototype.next = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) + 1, a);
    }),
    (e.prototype.prev = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) - 1, a);
    }),
    (e.prototype.transitionEnd = function (a) {
      return a !== d &&
        (a.stopPropagation(),
        (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))
        ? !1
        : ((this.state.inMotion = !1), void this.trigger("translated"));
    }),
    (e.prototype.viewport = function () {
      var d;
      if (this.options.responsiveBaseElement !== b)
        d = a(this.options.responsiveBaseElement).width();
      else if (b.innerWidth) d = b.innerWidth;
      else {
        if (!c.documentElement || !c.documentElement.clientWidth)
          throw "Can not detect viewport width.";
        d = c.documentElement.clientWidth;
      }
      return d;
    }),
    (e.prototype.replace = function (b) {
      this.$stage.empty(),
        (this._items = []),
        b && (b = b instanceof jQuery ? b : a(b)),
        this.settings.nestedItemSelector &&
          (b = b.find("." + this.settings.nestedItemSelector)),
        b
          .filter(function () {
            return 1 === this.nodeType;
          })
          .each(
            a.proxy(function (a, b) {
              (b = this.prepare(b)),
                this.$stage.append(b),
                this._items.push(b),
                this._mergers.push(
                  1 *
                    b
                      .find("[data-merge]")
                      .andSelf("[data-merge]")
                      .attr("data-merge") || 1
                );
            }, this)
          ),
        this.reset(
          a.isNumeric(this.settings.startPosition)
            ? this.settings.startPosition
            : 0
        ),
        this.invalidate("items");
    }),
    (e.prototype.add = function (a, b) {
      (b = b === d ? this._items.length : this.normalize(b, !0)),
        this.trigger("add", { content: a, position: b }),
        0 === this._items.length || b === this._items.length
          ? (this.$stage.append(a),
            this._items.push(a),
            this._mergers.push(
              1 *
                a
                  .find("[data-merge]")
                  .andSelf("[data-merge]")
                  .attr("data-merge") || 1
            ))
          : (this._items[b].before(a),
            this._items.splice(b, 0, a),
            this._mergers.splice(
              b,
              0,
              1 *
                a
                  .find("[data-merge]")
                  .andSelf("[data-merge]")
                  .attr("data-merge") || 1
            )),
        this.invalidate("items"),
        this.trigger("added", { content: a, position: b });
    }),
    (e.prototype.remove = function (a) {
      (a = this.normalize(a, !0)),
        a !== d &&
          (this.trigger("remove", { content: this._items[a], position: a }),
          this._items[a].remove(),
          this._items.splice(a, 1),
          this._mergers.splice(a, 1),
          this.invalidate("items"),
          this.trigger("removed", { content: null, position: a }));
    }),
    (e.prototype.addTriggerableEvents = function () {
      var b = a.proxy(function (b, c) {
        return a.proxy(function (a) {
          a.relatedTarget !== this &&
            (this.suppress([c]),
            b.apply(this, [].slice.call(arguments, 1)),
            this.release([c]));
        }, this);
      }, this);
      a.each(
        {
          next: this.next,
          prev: this.prev,
          to: this.to,
          destroy: this.destroy,
          refresh: this.refresh,
          replace: this.replace,
          add: this.add,
          remove: this.remove,
        },
        a.proxy(function (a, c) {
          this.$element.on(a + ".owl.carousel", b(c, a + ".owl.carousel"));
        }, this)
      );
    }),
    (e.prototype.watchVisibility = function () {
      function c(a) {
        return a.offsetWidth > 0 && a.offsetHeight > 0;
      }
      function d() {
        c(this.$element.get(0)) &&
          (this.$element.removeClass("owl-hidden"),
          this.refresh(),
          b.clearInterval(this.e._checkVisibile));
      }
      c(this.$element.get(0)) ||
        (this.$element.addClass("owl-hidden"),
        b.clearInterval(this.e._checkVisibile),
        (this.e._checkVisibile = b.setInterval(a.proxy(d, this), 500)));
    }),
    (e.prototype.preloadAutoWidthImages = function (b) {
      var c, d, e, f;
      (c = 0),
        (d = this),
        b.each(function (g, h) {
          (e = a(h)),
            (f = new Image()),
            (f.onload = function () {
              c++,
                e.attr("src", f.src),
                e.css("opacity", 1),
                c >= b.length && ((d.state.imagesLoaded = !0), d.initialize());
            }),
            (f.src =
              e.attr("src") || e.attr("data-src") || e.attr("data-src-retina"));
        });
    }),
    (e.prototype.destroy = function () {
      this.$element.hasClass(this.settings.themeClass) &&
        this.$element.removeClass(this.settings.themeClass),
        this.settings.responsive !== !1 && a(b).off("resize.owl.carousel"),
        this.transitionEndVendor &&
          this.off(
            this.$stage.get(0),
            this.transitionEndVendor,
            this.e._transitionEnd
          );
      for (var d in this._plugins) this._plugins[d].destroy();
      (this.settings.mouseDrag || this.settings.touchDrag) &&
        (this.$stage.off("mousedown touchstart touchcancel"),
        a(c).off(".owl.dragEvents"),
        (this.$stage.get(0).onselectstart = function () {}),
        this.$stage.off("dragstart", function () {
          return !1;
        })),
        this.$element.off(".owl"),
        this.$stage.children(".cloned").remove(),
        (this.e = null),
        this.$element.removeData("owlCarousel"),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$stage.unwrap();
    }),
    (e.prototype.op = function (a, b, c) {
      var d = this.settings.rtl;
      switch (b) {
        case "<":
          return d ? a > c : c > a;
        case ">":
          return d ? c > a : a > c;
        case ">=":
          return d ? c >= a : a >= c;
        case "<=":
          return d ? a >= c : c >= a;
      }
    }),
    (e.prototype.on = function (a, b, c, d) {
      a.addEventListener
        ? a.addEventListener(b, c, d)
        : a.attachEvent && a.attachEvent("on" + b, c);
    }),
    (e.prototype.off = function (a, b, c, d) {
      a.removeEventListener
        ? a.removeEventListener(b, c, d)
        : a.detachEvent && a.detachEvent("on" + b, c);
    }),
    (e.prototype.trigger = function (b, c, d) {
      var e = { item: { count: this._items.length, index: this.current() } },
        f = a.camelCase(
          a
            .grep(["on", b, d], function (a) {
              return a;
            })
            .join("-")
            .toLowerCase()
        ),
        g = a.Event(
          [b, "owl", d || "carousel"].join(".").toLowerCase(),
          a.extend({ relatedTarget: this }, e, c)
        );
      return (
        this._supress[b] ||
          (a.each(this._plugins, function (a, b) {
            b.onTrigger && b.onTrigger(g);
          }),
          this.$element.trigger(g),
          this.settings &&
            "function" == typeof this.settings[f] &&
            this.settings[f].apply(this, g)),
        g
      );
    }),
    (e.prototype.suppress = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          this._supress[b] = !0;
        }, this)
      );
    }),
    (e.prototype.release = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          delete this._supress[b];
        }, this)
      );
    }),
    (e.prototype.browserSupport = function () {
      if (((this.support3d = j()), this.support3d)) {
        this.transformVendor = i();
        var a = [
          "transitionend",
          "webkitTransitionEnd",
          "transitionend",
          "oTransitionEnd",
        ];
        (this.transitionEndVendor = a[h()]),
          (this.vendorName = this.transformVendor.replace(/Transform/i, "")),
          (this.vendorName =
            "" !== this.vendorName
              ? "-" + this.vendorName.toLowerCase() + "-"
              : "");
      }
      this.state.orientation = b.orientation;
    }),
    (a.fn.owlCarousel = function (b) {
      return this.each(function () {
        a(this).data("owlCarousel") ||
          a(this).data("owlCarousel", new e(this, b));
      });
    }),
    (a.fn.owlCarousel.Constructor = e);
})(window.Zepto || window.jQuery, window, document),
  (function (a, b) {
    var c = function (b) {
      (this._core = b),
        (this._loaded = []),
        (this._handlers = {
          "initialized.owl.carousel change.owl.carousel": a.proxy(function (b) {
            if (
              b.namespace &&
              this._core.settings &&
              this._core.settings.lazyLoad &&
              ((b.property && "position" == b.property.name) ||
                "initialized" == b.type)
            )
              for (
                var c = this._core.settings,
                  d = (c.center && Math.ceil(c.items / 2)) || c.items,
                  e = (c.center && -1 * d) || 0,
                  f =
                    ((b.property && b.property.value) || this._core.current()) +
                    e,
                  g = this._core.clones().length,
                  h = a.proxy(function (a, b) {
                    this.load(b);
                  }, this);
                e++ < d;

              )
                this.load(g / 2 + this._core.relative(f)),
                  g && a.each(this._core.clones(this._core.relative(f++)), h);
          }, this),
        }),
        (this._core.options = a.extend({}, c.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (c.Defaults = { lazyLoad: !1 }),
      (c.prototype.load = function (c) {
        var d = this._core.$stage.children().eq(c),
          e = d && d.find(".owl-lazy");
        !e ||
          a.inArray(d.get(0), this._loaded) > -1 ||
          (e.each(
            a.proxy(function (c, d) {
              var e,
                f = a(d),
                g =
                  (b.devicePixelRatio > 1 && f.attr("data-src-retina")) ||
                  f.attr("data-src");
              this._core.trigger("load", { element: f, url: g }, "lazy"),
                f.is("img")
                  ? f
                      .one(
                        "load.owl.lazy",
                        a.proxy(function () {
                          f.css("opacity", 1),
                            this._core.trigger(
                              "loaded",
                              { element: f, url: g },
                              "lazy"
                            );
                        }, this)
                      )
                      .attr("src", g)
                  : ((e = new Image()),
                    (e.onload = a.proxy(function () {
                      f.css({
                        "background-image": "url(" + g + ")",
                        opacity: "1",
                      }),
                        this._core.trigger(
                          "loaded",
                          { element: f, url: g },
                          "lazy"
                        );
                    }, this)),
                    (e.src = g));
            }, this)
          ),
          this._loaded.push(d.get(0)));
      }),
      (c.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Lazy = c);
  })(window.Zepto || window.jQuery, window, document),
  (function (a) {
    var b = function (c) {
      (this._core = c),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function () {
            this._core.settings.autoHeight && this.update();
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            this._core.settings.autoHeight &&
              "position" == a.property.name &&
              this.update();
          }, this),
          "loaded.owl.lazy": a.proxy(function (a) {
            this._core.settings.autoHeight &&
              a.element.closest("." + this._core.settings.itemClass) ===
                this._core.$stage.children().eq(this._core.current()) &&
              this.update();
          }, this),
        }),
        (this._core.options = a.extend({}, b.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (b.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
      (b.prototype.update = function () {
        this._core.$stage
          .parent()
          .height(
            this._core.$stage.children().eq(this._core.current()).height()
          )
          .addClass(this._core.settings.autoHeightClass);
      }),
      (b.prototype.destroy = function () {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoHeight = b);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c) {
    var d = function (b) {
      (this._core = b),
        (this._videos = {}),
        (this._playing = null),
        (this._fullscreen = !1),
        (this._handlers = {
          "resize.owl.carousel": a.proxy(function (a) {
            this._core.settings.video &&
              !this.isInFullScreen() &&
              a.preventDefault();
          }, this),
          "refresh.owl.carousel changed.owl.carousel": a.proxy(function () {
            this._playing && this.stop();
          }, this),
          "prepared.owl.carousel": a.proxy(function (b) {
            var c = a(b.content).find(".owl-video");
            c.length && (c.css("display", "none"), this.fetch(c, a(b.content)));
          }, this),
        }),
        (this._core.options = a.extend({}, d.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        this._core.$element.on(
          "click.owl.video",
          ".owl-video-play-icon",
          a.proxy(function (a) {
            this.play(a);
          }, this)
        );
    };
    (d.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
      (d.prototype.fetch = function (a, b) {
        var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube",
          d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"),
          e = a.attr("data-width") || this._core.settings.videoWidth,
          f = a.attr("data-height") || this._core.settings.videoHeight,
          g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (
          ((d = g.match(
            /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
          )),
          d[3].indexOf("youtu") > -1)
        )
          c = "youtube";
        else {
          if (!(d[3].indexOf("vimeo") > -1))
            throw new Error("Video URL not supported.");
          c = "vimeo";
        }
        (d = d[6]),
          (this._videos[g] = { type: c, id: d, width: e, height: f }),
          b.attr("data-video", g),
          this.thumbnail(a, this._videos[g]);
      }),
      (d.prototype.thumbnail = function (b, c) {
        var d,
          e,
          f,
          g =
            c.width && c.height
              ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"'
              : "",
          h = b.find("img"),
          i = "src",
          j = "",
          k = this._core.settings,
          l = function (a) {
            (e = '<div class="owl-video-play-icon"></div>'),
              (d = k.lazyLoad
                ? '<div class="owl-video-tn ' +
                  j +
                  '" ' +
                  i +
                  '="' +
                  a +
                  '"></div>'
                : '<div class="owl-video-tn" style="opacity:1;background-image:url(' +
                  a +
                  ')"></div>'),
              b.after(d),
              b.after(e);
          };
        return (
          b.wrap('<div class="owl-video-wrapper"' + g + "></div>"),
          this._core.settings.lazyLoad && ((i = "data-src"), (j = "owl-lazy")),
          h.length
            ? (l(h.attr(i)), h.remove(), !1)
            : void ("youtube" === c.type
                ? ((f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg"),
                  l(f))
                : "vimeo" === c.type &&
                  a.ajax({
                    type: "GET",
                    url: "http://vimeo.com/api/v2/video/" + c.id + ".json",
                    jsonp: "callback",
                    dataType: "jsonp",
                    success: function (a) {
                      (f = a[0].thumbnail_large), l(f);
                    },
                  }))
        );
      }),
      (d.prototype.stop = function () {
        this._core.trigger("stop", null, "video"),
          this._playing.find(".owl-video-frame").remove(),
          this._playing.removeClass("owl-video-playing"),
          (this._playing = null);
      }),
      (d.prototype.play = function (b) {
        this._core.trigger("play", null, "video"), this._playing && this.stop();
        var c,
          d,
          e = a(b.target || b.srcElement),
          f = e.closest("." + this._core.settings.itemClass),
          g = this._videos[f.attr("data-video")],
          h = g.width || "100%",
          i = g.height || this._core.$stage.height();
        "youtube" === g.type
          ? (c =
              '<iframe width="' +
              h +
              '" height="' +
              i +
              '" src="http://www.youtube.com/embed/' +
              g.id +
              "?autoplay=1&v=" +
              g.id +
              '" frameborder="0" allowfullscreen></iframe>')
          : "vimeo" === g.type &&
            (c =
              '<iframe src="http://player.vimeo.com/video/' +
              g.id +
              '?autoplay=1" width="' +
              h +
              '" height="' +
              i +
              '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),
          f.addClass("owl-video-playing"),
          (this._playing = f),
          (d = a(
            '<div style="height:' +
              i +
              "px; width:" +
              h +
              'px" class="owl-video-frame">' +
              c +
              "</div>"
          )),
          e.after(d);
      }),
      (d.prototype.isInFullScreen = function () {
        var d =
          c.fullscreenElement ||
          c.mozFullScreenElement ||
          c.webkitFullscreenElement;
        return (
          d &&
            a(d).parent().hasClass("owl-video-frame") &&
            (this._core.speed(0), (this._fullscreen = !0)),
          d && this._fullscreen && this._playing
            ? !1
            : this._fullscreen
            ? ((this._fullscreen = !1), !1)
            : this._playing && this._core.state.orientation !== b.orientation
            ? ((this._core.state.orientation = b.orientation), !1)
            : !0
        );
      }),
      (d.prototype.destroy = function () {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Video = d);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this.core = b),
        (this.core.options = a.extend({}, e.Defaults, this.core.options)),
        (this.swapping = !0),
        (this.previous = d),
        (this.next = d),
        (this.handlers = {
          "change.owl.carousel": a.proxy(function (a) {
            "position" == a.property.name &&
              ((this.previous = this.core.current()),
              (this.next = a.property.value));
          }, this),
          "drag.owl.carousel dragged.owl.carousel translated.owl.carousel":
            a.proxy(function (a) {
              this.swapping = "translated" == a.type;
            }, this),
          "translate.owl.carousel": a.proxy(function () {
            this.swapping &&
              (this.core.options.animateOut || this.core.options.animateIn) &&
              this.swap();
          }, this),
        }),
        this.core.$element.on(this.handlers);
    };
    (e.Defaults = { animateOut: !1, animateIn: !1 }),
      (e.prototype.swap = function () {
        if (1 === this.core.settings.items && this.core.support3d) {
          this.core.speed(0);
          var b,
            c = a.proxy(this.clear, this),
            d = this.core.$stage.children().eq(this.previous),
            e = this.core.$stage.children().eq(this.next),
            f = this.core.settings.animateIn,
            g = this.core.settings.animateOut;
          this.core.current() !== this.previous &&
            (g &&
              ((b =
                this.core.coordinates(this.previous) -
                this.core.coordinates(this.next)),
              d
                .css({ left: b + "px" })
                .addClass("animated owl-animated-out")
                .addClass(g)
                .one(
                  "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                  c
                )),
            f &&
              e
                .addClass("animated owl-animated-in")
                .addClass(f)
                .one(
                  "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                  c
                ));
        }
      }),
      (e.prototype.clear = function (b) {
        a(b.target)
          .css({ left: "" })
          .removeClass("animated owl-animated-out owl-animated-in")
          .removeClass(this.core.settings.animateIn)
          .removeClass(this.core.settings.animateOut),
          this.core.transitionEnd();
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Animate = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c) {
    var d = function (b) {
      (this.core = b),
        (this.core.options = a.extend({}, d.Defaults, this.core.options)),
        (this.handlers = {
          "translated.owl.carousel refreshed.owl.carousel": a.proxy(
            function () {
              this.autoplay();
            },
            this
          ),
          "play.owl.autoplay": a.proxy(function (a, b, c) {
            this.play(b, c);
          }, this),
          "stop.owl.autoplay": a.proxy(function () {
            this.stop();
          }, this),
          "mouseover.owl.autoplay": a.proxy(function () {
            this.core.settings.autoplayHoverPause && this.pause();
          }, this),
          "mouseleave.owl.autoplay": a.proxy(function () {
            this.core.settings.autoplayHoverPause && this.autoplay();
          }, this),
        }),
        this.core.$element.on(this.handlers);
    };
    (d.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1,
    }),
      (d.prototype.autoplay = function () {
        this.core.settings.autoplay && !this.core.state.videoPlay
          ? (b.clearInterval(this.interval),
            (this.interval = b.setInterval(
              a.proxy(function () {
                this.play();
              }, this),
              this.core.settings.autoplayTimeout
            )))
          : b.clearInterval(this.interval);
      }),
      (d.prototype.play = function () {
        return c.hidden === !0 ||
          this.core.state.isTouch ||
          this.core.state.isScrolling ||
          this.core.state.isSwiping ||
          this.core.state.inMotion
          ? void 0
          : this.core.settings.autoplay === !1
          ? void b.clearInterval(this.interval)
          : void this.core.next(this.core.settings.autoplaySpeed);
      }),
      (d.prototype.stop = function () {
        b.clearInterval(this.interval);
      }),
      (d.prototype.pause = function () {
        b.clearInterval(this.interval);
      }),
      (d.prototype.destroy = function () {
        var a, c;
        b.clearInterval(this.interval);
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.autoplay = d);
  })(window.Zepto || window.jQuery, window, document),
  (function (a) {
    "use strict";
    var b = function (c) {
      (this._core = c),
        (this._initialized = !1),
        (this._pages = []),
        (this._controls = {}),
        (this._templates = []),
        (this.$element = this._core.$element),
        (this._overrides = {
          next: this._core.next,
          prev: this._core.prev,
          to: this._core.to,
        }),
        (this._handlers = {
          "prepared.owl.carousel": a.proxy(function (b) {
            this._core.settings.dotsData &&
              this._templates.push(
                a(b.content)
                  .find("[data-dot]")
                  .andSelf("[data-dot]")
                  .attr("data-dot")
              );
          }, this),
          "add.owl.carousel": a.proxy(function (b) {
            this._core.settings.dotsData &&
              this._templates.splice(
                b.position,
                0,
                a(b.content)
                  .find("[data-dot]")
                  .andSelf("[data-dot]")
                  .attr("data-dot")
              );
          }, this),
          "remove.owl.carousel prepared.owl.carousel": a.proxy(function (a) {
            this._core.settings.dotsData &&
              this._templates.splice(a.position, 1);
          }, this),
          "change.owl.carousel": a.proxy(function (a) {
            if (
              "position" == a.property.name &&
              !this._core.state.revert &&
              !this._core.settings.loop &&
              this._core.settings.navRewind
            ) {
              var b = this._core.current(),
                c = this._core.maximum(),
                d = this._core.minimum();
              a.data =
                a.property.value > c
                  ? b >= c
                    ? d
                    : c
                  : a.property.value < d
                  ? c
                  : a.property.value;
            }
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            "position" == a.property.name && this.draw();
          }, this),
          "refreshed.owl.carousel": a.proxy(function () {
            this._initialized || (this.initialize(), (this._initialized = !0)),
              this._core.trigger("refresh", null, "navigation"),
              this.update(),
              this.draw(),
              this._core.trigger("refreshed", null, "navigation");
          }, this),
        }),
        (this._core.options = a.extend({}, b.Defaults, this._core.options)),
        this.$element.on(this._handlers);
    };
    (b.Defaults = {
      nav: !1,
      navRewind: !0,
      navText: ["prev", "next"],
      navSpeed: !1,
      navElement: "div",
      navContainer: !1,
      navContainerClass: "owl-nav",
      navClass: ["owl-prev", "owl-next"],
      slideBy: 1,
      dotClass: "owl-dot",
      dotsClass: "owl-dots",
      dots: !0,
      dotsEach: !1,
      dotData: !1,
      dotsSpeed: !1,
      dotsContainer: !1,
      controlsClass: "owl-controls",
    }),
      (b.prototype.initialize = function () {
        var b,
          c,
          d = this._core.settings;
        d.dotsData ||
          (this._templates = [
            a("<div>")
              .addClass(d.dotClass)
              .append(a("<span>"))
              .prop("outerHTML"),
          ]),
          (d.navContainer && d.dotsContainer) ||
            (this._controls.$container = a("<div>")
              .addClass(d.controlsClass)
              .appendTo(this.$element)),
          (this._controls.$indicators = d.dotsContainer
            ? a(d.dotsContainer)
            : a("<div>")
                .hide()
                .addClass(d.dotsClass)
                .appendTo(this._controls.$container)),
          this._controls.$indicators.on(
            "click",
            "div",
            a.proxy(function (b) {
              var c = a(b.target).parent().is(this._controls.$indicators)
                ? a(b.target).index()
                : a(b.target).parent().index();
              b.preventDefault(), this.to(c, d.dotsSpeed);
            }, this)
          ),
          (b = d.navContainer
            ? a(d.navContainer)
            : a("<div>")
                .addClass(d.navContainerClass)
                .prependTo(this._controls.$container)),
          (this._controls.$next = a("<" + d.navElement + ">")),
          (this._controls.$previous = this._controls.$next.clone()),
          this._controls.$previous
            .addClass(d.navClass[0])
            .html(d.navText[0])
            .hide()
            .prependTo(b)
            .on(
              "click",
              a.proxy(function () {
                this.prev(d.navSpeed);
              }, this)
            ),
          this._controls.$next
            .addClass(d.navClass[1])
            .html(d.navText[1])
            .hide()
            .appendTo(b)
            .on(
              "click",
              a.proxy(function () {
                this.next(d.navSpeed);
              }, this)
            );
        for (c in this._overrides) this._core[c] = a.proxy(this[c], this);
      }),
      (b.prototype.destroy = function () {
        var a, b, c, d;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (b.prototype.update = function () {
        var a,
          b,
          c,
          d = this._core.settings,
          e = this._core.clones().length / 2,
          f = e + this._core.items().length,
          g = d.center || d.autoWidth || d.dotData ? 1 : d.dotsEach || d.items;
        if (
          ("page" !== d.slideBy && (d.slideBy = Math.min(d.slideBy, d.items)),
          d.dots || "page" == d.slideBy)
        )
          for (this._pages = [], a = e, b = 0, c = 0; f > a; a++)
            (b >= g || 0 === b) &&
              (this._pages.push({ start: a - e, end: a - e + g - 1 }),
              (b = 0),
              ++c),
              (b += this._core.mergers(this._core.relative(a)));
      }),
      (b.prototype.draw = function () {
        var b,
          c,
          d = "",
          e = this._core.settings,
          f =
            (this._core.$stage.children(),
            this._core.relative(this._core.current()));
        if (
          (!e.nav ||
            e.loop ||
            e.navRewind ||
            (this._controls.$previous.toggleClass("disabled", 0 >= f),
            this._controls.$next.toggleClass(
              "disabled",
              f >= this._core.maximum()
            )),
          this._controls.$previous.toggle(e.nav),
          this._controls.$next.toggle(e.nav),
          e.dots)
        ) {
          if (
            ((b =
              this._pages.length -
              this._controls.$indicators.children().length),
            e.dotData && 0 !== b)
          ) {
            for (c = 0; c < this._controls.$indicators.children().length; c++)
              d += this._templates[this._core.relative(c)];
            this._controls.$indicators.html(d);
          } else
            b > 0
              ? ((d = new Array(b + 1).join(this._templates[0])),
                this._controls.$indicators.append(d))
              : 0 > b &&
                this._controls.$indicators.children().slice(b).remove();
          this._controls.$indicators.find(".active").removeClass("active"),
            this._controls.$indicators
              .children()
              .eq(a.inArray(this.current(), this._pages))
              .addClass("active");
        }
        this._controls.$indicators.toggle(e.dots);
      }),
      (b.prototype.onTrigger = function (b) {
        var c = this._core.settings;
        b.page = {
          index: a.inArray(this.current(), this._pages),
          count: this._pages.length,
          size:
            c &&
            (c.center || c.autoWidth || c.dotData ? 1 : c.dotsEach || c.items),
        };
      }),
      (b.prototype.current = function () {
        var b = this._core.relative(this._core.current());
        return a
          .grep(this._pages, function (a) {
            return a.start <= b && a.end >= b;
          })
          .pop();
      }),
      (b.prototype.getPosition = function (b) {
        var c,
          d,
          e = this._core.settings;
        return (
          "page" == e.slideBy
            ? ((c = a.inArray(this.current(), this._pages)),
              (d = this._pages.length),
              b ? ++c : --c,
              (c = this._pages[((c % d) + d) % d].start))
            : ((c = this._core.relative(this._core.current())),
              (d = this._core.items().length),
              b ? (c += e.slideBy) : (c -= e.slideBy)),
          c
        );
      }),
      (b.prototype.next = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
      }),
      (b.prototype.prev = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
      }),
      (b.prototype.to = function (b, c, d) {
        var e;
        d
          ? a.proxy(this._overrides.to, this._core)(b, c)
          : ((e = this._pages.length),
            a.proxy(this._overrides.to, this._core)(
              this._pages[((b % e) + e) % e].start,
              c
            ));
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Navigation = b);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b) {
    "use strict";
    var c = function (d) {
      (this._core = d),
        (this._hashes = {}),
        (this.$element = this._core.$element),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function () {
            "URLHash" == this._core.settings.startPosition &&
              a(b).trigger("hashchange.owl.navigation");
          }, this),
          "prepared.owl.carousel": a.proxy(function (b) {
            var c = a(b.content)
              .find("[data-hash]")
              .andSelf("[data-hash]")
              .attr("data-hash");
            this._hashes[c] = b.content;
          }, this),
        }),
        (this._core.options = a.extend({}, c.Defaults, this._core.options)),
        this.$element.on(this._handlers),
        a(b).on(
          "hashchange.owl.navigation",
          a.proxy(function () {
            var a = b.location.hash.substring(1),
              c = this._core.$stage.children(),
              d = (this._hashes[a] && c.index(this._hashes[a])) || 0;
            return a ? void this._core.to(d, !1, !0) : !1;
          }, this)
        );
    };
    (c.Defaults = { URLhashListener: !1 }),
      (c.prototype.destroy = function () {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this))
          "function" != typeof this[d] && (this[d] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Hash = c);
  })(window.Zepto || window.jQuery, window, document);

// jquery easing js
(jQuery.easing.jswing = jQuery.easing.swing),
  jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (n, e, t, r, u) {
      return jQuery.easing[jQuery.easing.def](n, e, t, r, u);
    },
    easeInQuad: function (n, e, t, r, u) {
      return r * (e /= u) * e + t;
    },
    easeOutQuad: function (n, e, t, r, u) {
      return -r * (e /= u) * (e - 2) + t;
    },
    easeInOutQuad: function (n, e, t, r, u) {
      return (e /= u / 2) < 1
        ? (r / 2) * e * e + t
        : (-r / 2) * (--e * (e - 2) - 1) + t;
    },
    easeInCubic: function (n, e, t, r, u) {
      return r * (e /= u) * e * e + t;
    },
    easeOutCubic: function (n, e, t, r, u) {
      return r * ((e = e / u - 1) * e * e + 1) + t;
    },
    easeInOutCubic: function (n, e, t, r, u) {
      return (e /= u / 2) < 1
        ? (r / 2) * e * e * e + t
        : (r / 2) * ((e -= 2) * e * e + 2) + t;
    },
    easeInQuart: function (n, e, t, r, u) {
      return r * (e /= u) * e * e * e + t;
    },
    easeOutQuart: function (n, e, t, r, u) {
      return -r * ((e = e / u - 1) * e * e * e - 1) + t;
    },
    easeInOutQuart: function (n, e, t, r, u) {
      return (e /= u / 2) < 1
        ? (r / 2) * e * e * e * e + t
        : (-r / 2) * ((e -= 2) * e * e * e - 2) + t;
    },
    easeInQuint: function (n, e, t, r, u) {
      return r * (e /= u) * e * e * e * e + t;
    },
    easeOutQuint: function (n, e, t, r, u) {
      return r * ((e = e / u - 1) * e * e * e * e + 1) + t;
    },
    easeInOutQuint: function (n, e, t, r, u) {
      return (e /= u / 2) < 1
        ? (r / 2) * e * e * e * e * e + t
        : (r / 2) * ((e -= 2) * e * e * e * e + 2) + t;
    },
    easeInSine: function (n, e, t, r, u) {
      return -r * Math.cos((e / u) * (Math.PI / 2)) + r + t;
    },
    easeOutSine: function (n, e, t, r, u) {
      return r * Math.sin((e / u) * (Math.PI / 2)) + t;
    },
    easeInOutSine: function (n, e, t, r, u) {
      return (-r / 2) * (Math.cos((Math.PI * e) / u) - 1) + t;
    },
    easeInExpo: function (n, e, t, r, u) {
      return 0 == e ? t : r * Math.pow(2, 10 * (e / u - 1)) + t;
    },
    easeOutExpo: function (n, e, t, r, u) {
      return e == u ? t + r : r * (-Math.pow(2, (-10 * e) / u) + 1) + t;
    },
    easeInOutExpo: function (n, e, t, r, u) {
      return 0 == e
        ? t
        : e == u
        ? t + r
        : (e /= u / 2) < 1
        ? (r / 2) * Math.pow(2, 10 * (e - 1)) + t
        : (r / 2) * (-Math.pow(2, -10 * --e) + 2) + t;
    },
    easeInCirc: function (n, e, t, r, u) {
      return -r * (Math.sqrt(1 - (e /= u) * e) - 1) + t;
    },
    easeOutCirc: function (n, e, t, r, u) {
      return r * Math.sqrt(1 - (e = e / u - 1) * e) + t;
    },
    easeInOutCirc: function (n, e, t, r, u) {
      return (e /= u / 2) < 1
        ? (-r / 2) * (Math.sqrt(1 - e * e) - 1) + t
        : (r / 2) * (Math.sqrt(1 - (e -= 2) * e) + 1) + t;
    },
    easeInElastic: function (n, e, t, r, u) {
      var a = 1.70158,
        i = 0,
        s = r;
      if (0 == e) return t;
      if (1 == (e /= u)) return t + r;
      if ((i || (i = 0.3 * u), s < Math.abs(r))) {
        s = r;
        var a = i / 4;
      } else var a = (i / (2 * Math.PI)) * Math.asin(r / s);
      return (
        -(
          s *
          Math.pow(2, 10 * (e -= 1)) *
          Math.sin(((e * u - a) * (2 * Math.PI)) / i)
        ) + t
      );
    },
    easeOutElastic: function (n, e, t, r, u) {
      var a = 1.70158,
        i = 0,
        s = r;
      if (0 == e) return t;
      if (1 == (e /= u)) return t + r;
      if ((i || (i = 0.3 * u), s < Math.abs(r))) {
        s = r;
        var a = i / 4;
      } else var a = (i / (2 * Math.PI)) * Math.asin(r / s);
      return (
        s * Math.pow(2, -10 * e) * Math.sin(((e * u - a) * (2 * Math.PI)) / i) +
        r +
        t
      );
    },
    easeInOutElastic: function (n, e, t, r, u) {
      var a = 1.70158,
        i = 0,
        s = r;
      if (0 == e) return t;
      if (2 == (e /= u / 2)) return t + r;
      if ((i || (i = u * (0.3 * 1.5)), s < Math.abs(r))) {
        s = r;
        var a = i / 4;
      } else var a = (i / (2 * Math.PI)) * Math.asin(r / s);
      return 1 > e
        ? -0.5 *
            (s *
              Math.pow(2, 10 * (e -= 1)) *
              Math.sin(((e * u - a) * (2 * Math.PI)) / i)) +
            t
        : s *
            Math.pow(2, -10 * (e -= 1)) *
            Math.sin(((e * u - a) * (2 * Math.PI)) / i) *
            0.5 +
            r +
            t;
    },
    easeInBack: function (n, e, t, r, u, a) {
      return (
        void 0 == a && (a = 1.70158), r * (e /= u) * e * ((a + 1) * e - a) + t
      );
    },
    easeOutBack: function (n, e, t, r, u, a) {
      return (
        void 0 == a && (a = 1.70158),
        r * ((e = e / u - 1) * e * ((a + 1) * e + a) + 1) + t
      );
    },
    easeInOutBack: function (n, e, t, r, u, a) {
      return (
        void 0 == a && (a = 1.70158),
        (e /= u / 2) < 1
          ? (r / 2) * (e * e * (((a *= 1.525) + 1) * e - a)) + t
          : (r / 2) * ((e -= 2) * e * (((a *= 1.525) + 1) * e + a) + 2) + t
      );
    },
    easeInBounce: function (n, e, t, r, u) {
      return r - jQuery.easing.easeOutBounce(n, u - e, 0, r, u) + t;
    },
    easeOutBounce: function (n, e, t, r, u) {
      return (e /= u) < 1 / 2.75
        ? r * (7.5625 * e * e) + t
        : 2 / 2.75 > e
        ? r * (7.5625 * (e -= 1.5 / 2.75) * e + 0.75) + t
        : 2.5 / 2.75 > e
        ? r * (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375) + t
        : r * (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375) + t;
    },
    easeInOutBounce: function (n, e, t, r, u) {
      return u / 2 > e
        ? 0.5 * jQuery.easing.easeInBounce(n, 2 * e, 0, r, u) + t
        : 0.5 * jQuery.easing.easeOutBounce(n, 2 * e - u, 0, r, u) +
            0.5 * r +
            t;
    },
  });

// Waypoints js
// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function () {
  var t =
      [].indexOf ||
      function (t) {
        for (var e = 0, n = this.length; e < n; e++) {
          if (e in this && this[e] === t) return e;
        }
        return -1;
      },
    e = [].slice;
  (function (t, e) {
    if (typeof define === "function" && define.amd) {
      return define("waypoints", ["jquery"], function (n) {
        return e(n, t);
      });
    } else {
      return e(t.jQuery, t);
    }
  })(this, function (n, r) {
    var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
    i = n(r);
    c = t.call(r, "ontouchstart") >= 0;
    s = { horizontal: {}, vertical: {} };
    f = 1;
    a = {};
    u = "waypoints-context-id";
    p = "resize.waypoints";
    y = "scroll.waypoints";
    v = 1;
    w = "waypoints-waypoint-ids";
    g = "waypoint";
    m = "waypoints";
    o = (function () {
      function t(t) {
        var e = this;
        this.$element = t;
        this.element = t[0];
        this.didResize = false;
        this.didScroll = false;
        this.id = "context" + f++;
        this.oldScroll = { x: t.scrollLeft(), y: t.scrollTop() };
        this.waypoints = { horizontal: {}, vertical: {} };
        t.data(u, this.id);
        a[this.id] = this;
        t.bind(y, function () {
          var t;
          if (!(e.didScroll || c)) {
            e.didScroll = true;
            t = function () {
              e.doScroll();
              return (e.didScroll = false);
            };
            return r.setTimeout(t, n[m].settings.scrollThrottle);
          }
        });
        t.bind(p, function () {
          var t;
          if (!e.didResize) {
            e.didResize = true;
            t = function () {
              n[m]("refresh");
              return (e.didResize = false);
            };
            return r.setTimeout(t, n[m].settings.resizeThrottle);
          }
        });
      }
      t.prototype.doScroll = function () {
        var t,
          e = this;
        t = {
          horizontal: {
            newScroll: this.$element.scrollLeft(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left",
          },
          vertical: {
            newScroll: this.$element.scrollTop(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up",
          },
        };
        if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
          n[m]("refresh");
        }
        n.each(t, function (t, r) {
          var i, o, l;
          l = [];
          o = r.newScroll > r.oldScroll;
          i = o ? r.forward : r.backward;
          n.each(e.waypoints[t], function (t, e) {
            var n, i;
            if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
              return l.push(e);
            } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
              return l.push(e);
            }
          });
          l.sort(function (t, e) {
            return t.offset - e.offset;
          });
          if (!o) {
            l.reverse();
          }
          return n.each(l, function (t, e) {
            if (e.options.continuous || t === l.length - 1) {
              return e.trigger([i]);
            }
          });
        });
        return (this.oldScroll = {
          x: t.horizontal.newScroll,
          y: t.vertical.newScroll,
        });
      };
      t.prototype.refresh = function () {
        var t,
          e,
          r,
          i = this;
        r = n.isWindow(this.element);
        e = this.$element.offset();
        this.doScroll();
        t = {
          horizontal: {
            contextOffset: r ? 0 : e.left,
            contextScroll: r ? 0 : this.oldScroll.x,
            contextDimension: this.$element.width(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left",
            offsetProp: "left",
          },
          vertical: {
            contextOffset: r ? 0 : e.top,
            contextScroll: r ? 0 : this.oldScroll.y,
            contextDimension: r
              ? n[m]("viewportHeight")
              : this.$element.height(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up",
            offsetProp: "top",
          },
        };
        return n.each(t, function (t, e) {
          return n.each(i.waypoints[t], function (t, r) {
            var i, o, l, s, f;
            i = r.options.offset;
            l = r.offset;
            o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
            if (n.isFunction(i)) {
              i = i.apply(r.element);
            } else if (typeof i === "string") {
              i = parseFloat(i);
              if (r.options.offset.indexOf("%") > -1) {
                i = Math.ceil((e.contextDimension * i) / 100);
              }
            }
            r.offset = o - e.contextOffset + e.contextScroll - i;
            if ((r.options.onlyOnScroll && l != null) || !r.enabled) {
              return;
            }
            if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
              return r.trigger([e.backward]);
            } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
              return r.trigger([e.forward]);
            } else if (l === null && e.oldScroll >= r.offset) {
              return r.trigger([e.forward]);
            }
          });
        });
      };
      t.prototype.checkEmpty = function () {
        if (
          n.isEmptyObject(this.waypoints.horizontal) &&
          n.isEmptyObject(this.waypoints.vertical)
        ) {
          this.$element.unbind([p, y].join(" "));
          return delete a[this.id];
        }
      };
      return t;
    })();
    l = (function () {
      function t(t, e, r) {
        var i, o;
        r = n.extend({}, n.fn[g].defaults, r);
        if (r.offset === "bottom-in-view") {
          r.offset = function () {
            var t;
            t = n[m]("viewportHeight");
            if (!n.isWindow(e.element)) {
              t = e.$element.height();
            }
            return t - n(this).outerHeight();
          };
        }
        this.$element = t;
        this.element = t[0];
        this.axis = r.horizontal ? "horizontal" : "vertical";
        this.callback = r.handler;
        this.context = e;
        this.enabled = r.enabled;
        this.id = "waypoints" + v++;
        this.offset = null;
        this.options = r;
        e.waypoints[this.axis][this.id] = this;
        s[this.axis][this.id] = this;
        i = (o = t.data(w)) != null ? o : [];
        i.push(this.id);
        t.data(w, i);
      }
      t.prototype.trigger = function (t) {
        if (!this.enabled) {
          return;
        }
        if (this.callback != null) {
          this.callback.apply(this.element, t);
        }
        if (this.options.triggerOnce) {
          return this.destroy();
        }
      };
      t.prototype.disable = function () {
        return (this.enabled = false);
      };
      t.prototype.enable = function () {
        this.context.refresh();
        return (this.enabled = true);
      };
      t.prototype.destroy = function () {
        delete s[this.axis][this.id];
        delete this.context.waypoints[this.axis][this.id];
        return this.context.checkEmpty();
      };
      t.getWaypointsByElement = function (t) {
        var e, r;
        r = n(t).data(w);
        if (!r) {
          return [];
        }
        e = n.extend({}, s.horizontal, s.vertical);
        return n.map(r, function (t) {
          return e[t];
        });
      };
      return t;
    })();
    d = {
      init: function (t, e) {
        var r;
        if (e == null) {
          e = {};
        }
        if ((r = e.handler) == null) {
          e.handler = t;
        }
        this.each(function () {
          var t, r, i, s;
          t = n(this);
          i = (s = e.context) != null ? s : n.fn[g].defaults.context;
          if (!n.isWindow(i)) {
            i = t.closest(i);
          }
          i = n(i);
          r = a[i.data(u)];
          if (!r) {
            r = new o(i);
          }
          return new l(t, r, e);
        });
        n[m]("refresh");
        return this;
      },
      disable: function () {
        return d._invoke(this, "disable");
      },
      enable: function () {
        return d._invoke(this, "enable");
      },
      destroy: function () {
        return d._invoke(this, "destroy");
      },
      prev: function (t, e) {
        return d._traverse.call(this, t, e, function (t, e, n) {
          if (e > 0) {
            return t.push(n[e - 1]);
          }
        });
      },
      next: function (t, e) {
        return d._traverse.call(this, t, e, function (t, e, n) {
          if (e < n.length - 1) {
            return t.push(n[e + 1]);
          }
        });
      },
      _traverse: function (t, e, i) {
        var o, l;
        if (t == null) {
          t = "vertical";
        }
        if (e == null) {
          e = r;
        }
        l = h.aggregate(e);
        o = [];
        this.each(function () {
          var e;
          e = n.inArray(this, l[t]);
          return i(o, e, l[t]);
        });
        return this.pushStack(o);
      },
      _invoke: function (t, e) {
        t.each(function () {
          var t;
          t = l.getWaypointsByElement(this);
          return n.each(t, function (t, n) {
            n[e]();
            return true;
          });
        });
        return this;
      },
    };
    n.fn[g] = function () {
      var t, r;
      (r = arguments[0]),
        (t = 2 <= arguments.length ? e.call(arguments, 1) : []);
      if (d[r]) {
        return d[r].apply(this, t);
      } else if (n.isFunction(r)) {
        return d.init.apply(this, arguments);
      } else if (n.isPlainObject(r)) {
        return d.init.apply(this, [null, r]);
      } else if (!r) {
        return n.error(
          "jQuery Waypoints needs a callback function or handler option."
        );
      } else {
        return n.error(
          "The " + r + " method does not exist in jQuery Waypoints."
        );
      }
    };
    n.fn[g].defaults = {
      context: r,
      continuous: true,
      enabled: true,
      horizontal: false,
      offset: 0,
      triggerOnce: false,
    };
    h = {
      refresh: function () {
        return n.each(a, function (t, e) {
          return e.refresh();
        });
      },
      viewportHeight: function () {
        var t;
        return (t = r.innerHeight) != null ? t : i.height();
      },
      aggregate: function (t) {
        var e, r, i;
        e = s;
        if (t) {
          e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0;
        }
        if (!e) {
          return [];
        }
        r = { horizontal: [], vertical: [] };
        n.each(r, function (t, i) {
          n.each(e[t], function (t, e) {
            return i.push(e);
          });
          i.sort(function (t, e) {
            return t.offset - e.offset;
          });
          r[t] = n.map(i, function (t) {
            return t.element;
          });
          return (r[t] = n.unique(r[t]));
        });
        return r;
      },
      above: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "vertical", function (t, e) {
          return e.offset <= t.oldScroll.y;
        });
      },
      below: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "vertical", function (t, e) {
          return e.offset > t.oldScroll.y;
        });
      },
      left: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "horizontal", function (t, e) {
          return e.offset <= t.oldScroll.x;
        });
      },
      right: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "horizontal", function (t, e) {
          return e.offset > t.oldScroll.x;
        });
      },
      enable: function () {
        return h._invoke("enable");
      },
      disable: function () {
        return h._invoke("disable");
      },
      destroy: function () {
        return h._invoke("destroy");
      },
      extendFn: function (t, e) {
        return (d[t] = e);
      },
      _invoke: function (t) {
        var e;
        e = n.extend({}, s.vertical, s.horizontal);
        return n.each(e, function (e, n) {
          n[t]();
          return true;
        });
      },
      _filter: function (t, e, r) {
        var i, o;
        i = a[n(t).data(u)];
        if (!i) {
          return [];
        }
        o = [];
        n.each(i.waypoints[e], function (t, e) {
          if (r(i, e)) {
            return o.push(e);
          }
        });
        o.sort(function (t, e) {
          return t.offset - e.offset;
        });
        return n.map(o, function (t) {
          return t.element;
        });
      },
    };
    n[m] = function () {
      var t, n;
      (n = arguments[0]),
        (t = 2 <= arguments.length ? e.call(arguments, 1) : []);
      if (h[n]) {
        return h[n].apply(null, t);
      } else {
        return h.aggregate.call(null, n);
      }
    };
    n[m].settings = { resizeThrottle: 100, scrollThrottle: 30 };
    return i.load(function () {
      return n[m]("refresh");
    });
  });
}).call(this);

// Magnific-popup js
/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
!(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : a(
        "object" == typeof exports
          ? require("jquery")
          : window.jQuery || window.Zepto
      );
})(function (a) {
  var b,
    c,
    d,
    e,
    f,
    g,
    h = "Close",
    i = "BeforeClose",
    j = "AfterClose",
    k = "BeforeAppend",
    l = "MarkupParse",
    m = "Open",
    n = "Change",
    o = "mfp",
    p = "." + o,
    q = "mfp-ready",
    r = "mfp-removing",
    s = "mfp-prevent-close",
    t = function () {},
    u = !!window.jQuery,
    v = a(window),
    w = function (a, c) {
      b.ev.on(o + a + p, c);
    },
    x = function (b, c, d, e) {
      var f = document.createElement("div");
      return (
        (f.className = "mfp-" + b),
        d && (f.innerHTML = d),
        e ? c && c.appendChild(f) : ((f = a(f)), c && f.appendTo(c)),
        f
      );
    },
    y = function (c, d) {
      b.ev.triggerHandler(o + c, d),
        b.st.callbacks &&
          ((c = c.charAt(0).toLowerCase() + c.slice(1)),
          b.st.callbacks[c] &&
            b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
    },
    z = function (c) {
      return (
        (c === g && b.currTemplate.closeBtn) ||
          ((b.currTemplate.closeBtn = a(
            b.st.closeMarkup.replace("%title%", b.st.tClose)
          )),
          (g = c)),
        b.currTemplate.closeBtn
      );
    },
    A = function () {
      a.magnificPopup.instance ||
        ((b = new t()), b.init(), (a.magnificPopup.instance = b));
    },
    B = function () {
      var a = document.createElement("p").style,
        b = ["ms", "O", "Moz", "Webkit"];
      if (void 0 !== a.transition) return !0;
      for (; b.length; ) if (b.pop() + "Transition" in a) return !0;
      return !1;
    };
  (t.prototype = {
    constructor: t,
    init: function () {
      var c = navigator.appVersion;
      (b.isLowIE = b.isIE8 = document.all && !document.addEventListener),
        (b.isAndroid = /android/gi.test(c)),
        (b.isIOS = /iphone|ipad|ipod/gi.test(c)),
        (b.supportsTransition = B()),
        (b.probablyMobile =
          b.isAndroid ||
          b.isIOS ||
          /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
            navigator.userAgent
          )),
        (d = a(document)),
        (b.popupsCache = {});
    },
    open: function (c) {
      var e;
      if (c.isObj === !1) {
        (b.items = c.items.toArray()), (b.index = 0);
        var g,
          h = c.items;
        for (e = 0; e < h.length; e++)
          if (((g = h[e]), g.parsed && (g = g.el[0]), g === c.el[0])) {
            b.index = e;
            break;
          }
      } else
        (b.items = a.isArray(c.items) ? c.items : [c.items]),
          (b.index = c.index || 0);
      if (b.isOpen) return void b.updateItemHTML();
      (b.types = []),
        (f = ""),
        c.mainEl && c.mainEl.length ? (b.ev = c.mainEl.eq(0)) : (b.ev = d),
        c.key
          ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}),
            (b.currTemplate = b.popupsCache[c.key]))
          : (b.currTemplate = {}),
        (b.st = a.extend(!0, {}, a.magnificPopup.defaults, c)),
        (b.fixedContentPos =
          "auto" === b.st.fixedContentPos
            ? !b.probablyMobile
            : b.st.fixedContentPos),
        b.st.modal &&
          ((b.st.closeOnContentClick = !1),
          (b.st.closeOnBgClick = !1),
          (b.st.showCloseBtn = !1),
          (b.st.enableEscapeKey = !1)),
        b.bgOverlay ||
          ((b.bgOverlay = x("bg").on("click" + p, function () {
            b.close();
          })),
          (b.wrap = x("wrap")
            .attr("tabindex", -1)
            .on("click" + p, function (a) {
              b._checkIfClose(a.target) && b.close();
            })),
          (b.container = x("container", b.wrap))),
        (b.contentContainer = x("content")),
        b.st.preloader &&
          (b.preloader = x("preloader", b.container, b.st.tLoading));
      var i = a.magnificPopup.modules;
      for (e = 0; e < i.length; e++) {
        var j = i[e];
        (j = j.charAt(0).toUpperCase() + j.slice(1)), b["init" + j].call(b);
      }
      y("BeforeOpen"),
        b.st.showCloseBtn &&
          (b.st.closeBtnInside
            ? (w(l, function (a, b, c, d) {
                c.close_replaceWith = z(d.type);
              }),
              (f += " mfp-close-btn-in"))
            : b.wrap.append(z())),
        b.st.alignTop && (f += " mfp-align-top"),
        b.fixedContentPos
          ? b.wrap.css({
              overflow: b.st.overflowY,
              overflowX: "hidden",
              overflowY: b.st.overflowY,
            })
          : b.wrap.css({ top: v.scrollTop(), position: "absolute" }),
        (b.st.fixedBgPos === !1 ||
          ("auto" === b.st.fixedBgPos && !b.fixedContentPos)) &&
          b.bgOverlay.css({ height: d.height(), position: "absolute" }),
        b.st.enableEscapeKey &&
          d.on("keyup" + p, function (a) {
            27 === a.keyCode && b.close();
          }),
        v.on("resize" + p, function () {
          b.updateSize();
        }),
        b.st.closeOnContentClick || (f += " mfp-auto-cursor"),
        f && b.wrap.addClass(f);
      var k = (b.wH = v.height()),
        n = {};
      if (b.fixedContentPos && b._hasScrollBar(k)) {
        var o = b._getScrollbarSize();
        o && (n.marginRight = o);
      }
      b.fixedContentPos &&
        (b.isIE7
          ? a("body, html").css("overflow", "hidden")
          : (n.overflow = "hidden"));
      var r = b.st.mainClass;
      return (
        b.isIE7 && (r += " mfp-ie7"),
        r && b._addClassToMFP(r),
        b.updateItemHTML(),
        y("BuildControls"),
        a("html").css(n),
        b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)),
        (b._lastFocusedEl = document.activeElement),
        setTimeout(function () {
          b.content
            ? (b._addClassToMFP(q), b._setFocus())
            : b.bgOverlay.addClass(q),
            d.on("focusin" + p, b._onFocusIn);
        }, 16),
        (b.isOpen = !0),
        b.updateSize(k),
        y(m),
        c
      );
    },
    close: function () {
      b.isOpen &&
        (y(i),
        (b.isOpen = !1),
        b.st.removalDelay && !b.isLowIE && b.supportsTransition
          ? (b._addClassToMFP(r),
            setTimeout(function () {
              b._close();
            }, b.st.removalDelay))
          : b._close());
    },
    _close: function () {
      y(h);
      var c = r + " " + q + " ";
      if (
        (b.bgOverlay.detach(),
        b.wrap.detach(),
        b.container.empty(),
        b.st.mainClass && (c += b.st.mainClass + " "),
        b._removeClassFromMFP(c),
        b.fixedContentPos)
      ) {
        var e = { marginRight: "" };
        b.isIE7 ? a("body, html").css("overflow", "") : (e.overflow = ""),
          a("html").css(e);
      }
      d.off("keyup" + p + " focusin" + p),
        b.ev.off(p),
        b.wrap.attr("class", "mfp-wrap").removeAttr("style"),
        b.bgOverlay.attr("class", "mfp-bg"),
        b.container.attr("class", "mfp-container"),
        !b.st.showCloseBtn ||
          (b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0) ||
          (b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach()),
        b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(),
        (b.currItem = null),
        (b.content = null),
        (b.currTemplate = null),
        (b.prevHeight = 0),
        y(j);
    },
    updateSize: function (a) {
      if (b.isIOS) {
        var c = document.documentElement.clientWidth / window.innerWidth,
          d = window.innerHeight * c;
        b.wrap.css("height", d), (b.wH = d);
      } else b.wH = a || v.height();
      b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize");
    },
    updateItemHTML: function () {
      var c = b.items[b.index];
      b.contentContainer.detach(),
        b.content && b.content.detach(),
        c.parsed || (c = b.parseEl(b.index));
      var d = c.type;
      if (
        (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]),
        (b.currItem = c),
        !b.currTemplate[d])
      ) {
        var f = b.st[d] ? b.st[d].markup : !1;
        y("FirstMarkupParse", f),
          f ? (b.currTemplate[d] = a(f)) : (b.currTemplate[d] = !0);
      }
      e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
      var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](
        c,
        b.currTemplate[d]
      );
      b.appendContent(g, d),
        (c.preloaded = !0),
        y(n, c),
        (e = c.type),
        b.container.prepend(b.contentContainer),
        y("AfterChange");
    },
    appendContent: function (a, c) {
      (b.content = a),
        a
          ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0
            ? b.content.find(".mfp-close").length || b.content.append(z())
            : (b.content = a)
          : (b.content = ""),
        y(k),
        b.container.addClass("mfp-" + c + "-holder"),
        b.contentContainer.append(b.content);
    },
    parseEl: function (c) {
      var d,
        e = b.items[c];
      if (
        (e.tagName
          ? (e = { el: a(e) })
          : ((d = e.type), (e = { data: e, src: e.src })),
        e.el)
      ) {
        for (var f = b.types, g = 0; g < f.length; g++)
          if (e.el.hasClass("mfp-" + f[g])) {
            d = f[g];
            break;
          }
        (e.src = e.el.attr("data-mfp-src")),
          e.src || (e.src = e.el.attr("href"));
      }
      return (
        (e.type = d || b.st.type || "inline"),
        (e.index = c),
        (e.parsed = !0),
        (b.items[c] = e),
        y("ElementParse", e),
        b.items[c]
      );
    },
    addGroup: function (a, c) {
      var d = function (d) {
        (d.mfpEl = this), b._openClick(d, a, c);
      };
      c || (c = {});
      var e = "click.magnificPopup";
      (c.mainEl = a),
        c.items
          ? ((c.isObj = !0), a.off(e).on(e, d))
          : ((c.isObj = !1),
            c.delegate
              ? a.off(e).on(e, c.delegate, d)
              : ((c.items = a), a.off(e).on(e, d)));
    },
    _openClick: function (c, d, e) {
      var f =
        void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
      if (
        f ||
        !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)
      ) {
        var g =
          void 0 !== e.disableOn
            ? e.disableOn
            : a.magnificPopup.defaults.disableOn;
        if (g)
          if (a.isFunction(g)) {
            if (!g.call(b)) return !0;
          } else if (v.width() < g) return !0;
        c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()),
          (e.el = a(c.mfpEl)),
          e.delegate && (e.items = d.find(e.delegate)),
          b.open(e);
      }
    },
    updateStatus: function (a, d) {
      if (b.preloader) {
        c !== a && b.container.removeClass("mfp-s-" + c),
          d || "loading" !== a || (d = b.st.tLoading);
        var e = { status: a, text: d };
        y("UpdateStatus", e),
          (a = e.status),
          (d = e.text),
          b.preloader.html(d),
          b.preloader.find("a").on("click", function (a) {
            a.stopImmediatePropagation();
          }),
          b.container.addClass("mfp-s-" + a),
          (c = a);
      }
    },
    _checkIfClose: function (c) {
      if (!a(c).hasClass(s)) {
        var d = b.st.closeOnContentClick,
          e = b.st.closeOnBgClick;
        if (d && e) return !0;
        if (
          !b.content ||
          a(c).hasClass("mfp-close") ||
          (b.preloader && c === b.preloader[0])
        )
          return !0;
        if (c === b.content[0] || a.contains(b.content[0], c)) {
          if (d) return !0;
        } else if (e && a.contains(document, c)) return !0;
        return !1;
      }
    },
    _addClassToMFP: function (a) {
      b.bgOverlay.addClass(a), b.wrap.addClass(a);
    },
    _removeClassFromMFP: function (a) {
      this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
    },
    _hasScrollBar: function (a) {
      return (
        (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
      );
    },
    _setFocus: function () {
      (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
    },
    _onFocusIn: function (c) {
      return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target)
        ? void 0
        : (b._setFocus(), !1);
    },
    _parseMarkup: function (b, c, d) {
      var e;
      d.data && (c = a.extend(d.data, c)),
        y(l, [b, c, d]),
        a.each(c, function (c, d) {
          if (void 0 === d || d === !1) return !0;
          if (((e = c.split("_")), e.length > 1)) {
            var f = b.find(p + "-" + e[0]);
            if (f.length > 0) {
              var g = e[1];
              "replaceWith" === g
                ? f[0] !== d[0] && f.replaceWith(d)
                : "img" === g
                ? f.is("img")
                  ? f.attr("src", d)
                  : f.replaceWith(
                      a("<img>").attr("src", d).attr("class", f.attr("class"))
                    )
                : f.attr(e[1], d);
            }
          } else b.find(p + "-" + c).html(d);
        });
    },
    _getScrollbarSize: function () {
      if (void 0 === b.scrollbarSize) {
        var a = document.createElement("div");
        (a.style.cssText =
          "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
          document.body.appendChild(a),
          (b.scrollbarSize = a.offsetWidth - a.clientWidth),
          document.body.removeChild(a);
      }
      return b.scrollbarSize;
    },
  }),
    (a.magnificPopup = {
      instance: null,
      proto: t.prototype,
      modules: [],
      open: function (b, c) {
        return (
          A(),
          (b = b ? a.extend(!0, {}, b) : {}),
          (b.isObj = !0),
          (b.index = c || 0),
          this.instance.open(b)
        );
      },
      close: function () {
        return a.magnificPopup.instance && a.magnificPopup.instance.close();
      },
      registerModule: function (b, c) {
        c.options && (a.magnificPopup.defaults[b] = c.options),
          a.extend(this.proto, c.proto),
          this.modules.push(b);
      },
      defaults: {
        disableOn: 0,
        key: null,
        midClick: !1,
        mainClass: "",
        preloader: !0,
        focus: "",
        closeOnContentClick: !1,
        closeOnBgClick: !0,
        closeBtnInside: !0,
        showCloseBtn: !0,
        enableEscapeKey: !0,
        modal: !1,
        alignTop: !1,
        removalDelay: 0,
        prependTo: null,
        fixedContentPos: "auto",
        fixedBgPos: "auto",
        overflowY: "auto",
        closeMarkup:
          '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
        tClose: "Close (Esc)",
        tLoading: "Loading...",
        autoFocusLast: !0,
      },
    }),
    (a.fn.magnificPopup = function (c) {
      A();
      var d = a(this);
      if ("string" == typeof c)
        if ("open" === c) {
          var e,
            f = u ? d.data("magnificPopup") : d[0].magnificPopup,
            g = parseInt(arguments[1], 10) || 0;
          f.items
            ? (e = f.items[g])
            : ((e = d), f.delegate && (e = e.find(f.delegate)), (e = e.eq(g))),
            b._openClick({ mfpEl: e }, d, f);
        } else
          b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
      else
        (c = a.extend(!0, {}, c)),
          u ? d.data("magnificPopup", c) : (d[0].magnificPopup = c),
          b.addGroup(d, c);
      return d;
    });
  var C,
    D,
    E,
    F = "inline",
    G = function () {
      E && (D.after(E.addClass(C)).detach(), (E = null));
    };
  a.magnificPopup.registerModule(F, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found",
    },
    proto: {
      initInline: function () {
        b.types.push(F),
          w(h + "." + F, function () {
            G();
          });
      },
      getInline: function (c, d) {
        if ((G(), c.src)) {
          var e = b.st.inline,
            f = a(c.src);
          if (f.length) {
            var g = f[0].parentNode;
            g &&
              g.tagName &&
              (D || ((C = e.hiddenClass), (D = x(C)), (C = "mfp-" + C)),
              (E = f.after(D).detach().removeClass(C))),
              b.updateStatus("ready");
          } else b.updateStatus("error", e.tNotFound), (f = a("<div>"));
          return (c.inlineElement = f), f;
        }
        return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
      },
    },
  });
  var H,
    I = "ajax",
    J = function () {
      H && a(document.body).removeClass(H);
    },
    K = function () {
      J(), b.req && b.req.abort();
    };
  a.magnificPopup.registerModule(I, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.',
    },
    proto: {
      initAjax: function () {
        b.types.push(I),
          (H = b.st.ajax.cursor),
          w(h + "." + I, K),
          w("BeforeChange." + I, K);
      },
      getAjax: function (c) {
        H && a(document.body).addClass(H), b.updateStatus("loading");
        var d = a.extend(
          {
            url: c.src,
            success: function (d, e, f) {
              var g = { data: d, xhr: f };
              y("ParseAjax", g),
                b.appendContent(a(g.data), I),
                (c.finished = !0),
                J(),
                b._setFocus(),
                setTimeout(function () {
                  b.wrap.addClass(q);
                }, 16),
                b.updateStatus("ready"),
                y("AjaxContentAdded");
            },
            error: function () {
              J(),
                (c.finished = c.loadError = !0),
                b.updateStatus(
                  "error",
                  b.st.ajax.tError.replace("%url%", c.src)
                );
            },
          },
          b.st.ajax.settings
        );
        return (b.req = a.ajax(d)), "";
      },
    },
  });
  var L,
    M = function (c) {
      if (c.data && void 0 !== c.data.title) return c.data.title;
      var d = b.st.image.titleSrc;
      if (d) {
        if (a.isFunction(d)) return d.call(b, c);
        if (c.el) return c.el.attr(d) || "";
      }
      return "";
    };
  a.magnificPopup.registerModule("image", {
    options: {
      markup:
        '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.',
    },
    proto: {
      initImage: function () {
        var c = b.st.image,
          d = ".image";
        b.types.push("image"),
          w(m + d, function () {
            "image" === b.currItem.type &&
              c.cursor &&
              a(document.body).addClass(c.cursor);
          }),
          w(h + d, function () {
            c.cursor && a(document.body).removeClass(c.cursor),
              v.off("resize" + p);
          }),
          w("Resize" + d, b.resizeImage),
          b.isLowIE && w("AfterChange", b.resizeImage);
      },
      resizeImage: function () {
        var a = b.currItem;
        if (a && a.img && b.st.image.verticalFit) {
          var c = 0;
          b.isLowIE &&
            (c =
              parseInt(a.img.css("padding-top"), 10) +
              parseInt(a.img.css("padding-bottom"), 10)),
            a.img.css("max-height", b.wH - c);
        }
      },
      _onImageHasSize: function (a) {
        a.img &&
          ((a.hasSize = !0),
          L && clearInterval(L),
          (a.isCheckingImgSize = !1),
          y("ImageHasSize", a),
          a.imgHidden &&
            (b.content && b.content.removeClass("mfp-loading"),
            (a.imgHidden = !1)));
      },
      findImageSize: function (a) {
        var c = 0,
          d = a.img[0],
          e = function (f) {
            L && clearInterval(L),
              (L = setInterval(function () {
                return d.naturalWidth > 0
                  ? void b._onImageHasSize(a)
                  : (c > 200 && clearInterval(L),
                    c++,
                    void (3 === c
                      ? e(10)
                      : 40 === c
                      ? e(50)
                      : 100 === c && e(500)));
              }, f));
          };
        e(1);
      },
      getImage: function (c, d) {
        var e = 0,
          f = function () {
            c &&
              (c.img[0].complete
                ? (c.img.off(".mfploader"),
                  c === b.currItem &&
                    (b._onImageHasSize(c), b.updateStatus("ready")),
                  (c.hasSize = !0),
                  (c.loaded = !0),
                  y("ImageLoadComplete"))
                : (e++, 200 > e ? setTimeout(f, 100) : g()));
          },
          g = function () {
            c &&
              (c.img.off(".mfploader"),
              c === b.currItem &&
                (b._onImageHasSize(c),
                b.updateStatus("error", h.tError.replace("%url%", c.src))),
              (c.hasSize = !0),
              (c.loaded = !0),
              (c.loadError = !0));
          },
          h = b.st.image,
          i = d.find(".mfp-img");
        if (i.length) {
          var j = document.createElement("img");
          (j.className = "mfp-img"),
            c.el &&
              c.el.find("img").length &&
              (j.alt = c.el.find("img").attr("alt")),
            (c.img = a(j).on("load.mfploader", f).on("error.mfploader", g)),
            (j.src = c.src),
            i.is("img") && (c.img = c.img.clone()),
            (j = c.img[0]),
            j.naturalWidth > 0 ? (c.hasSize = !0) : j.width || (c.hasSize = !1);
        }
        return (
          b._parseMarkup(d, { title: M(c), img_replaceWith: c.img }, c),
          b.resizeImage(),
          c.hasSize
            ? (L && clearInterval(L),
              c.loadError
                ? (d.addClass("mfp-loading"),
                  b.updateStatus("error", h.tError.replace("%url%", c.src)))
                : (d.removeClass("mfp-loading"), b.updateStatus("ready")),
              d)
            : (b.updateStatus("loading"),
              (c.loading = !0),
              c.hasSize ||
                ((c.imgHidden = !0),
                d.addClass("mfp-loading"),
                b.findImageSize(c)),
              d)
        );
      },
    },
  });
  var N,
    O = function () {
      return (
        void 0 === N &&
          (N = void 0 !== document.createElement("p").style.MozTransform),
        N
      );
    };
  a.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function (a) {
        return a.is("img") ? a : a.find("img");
      },
    },
    proto: {
      initZoom: function () {
        var a,
          c = b.st.zoom,
          d = ".zoom";
        if (c.enabled && b.supportsTransition) {
          var e,
            f,
            g = c.duration,
            j = function (a) {
              var b = a
                  .clone()
                  .removeAttr("style")
                  .removeAttr("class")
                  .addClass("mfp-animated-image"),
                d = "all " + c.duration / 1e3 + "s " + c.easing,
                e = {
                  position: "fixed",
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  "-webkit-backface-visibility": "hidden",
                },
                f = "transition";
              return (
                (e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d),
                b.css(e),
                b
              );
            },
            k = function () {
              b.content.css("visibility", "visible");
            };
          w("BuildControls" + d, function () {
            if (b._allowZoom()) {
              if (
                (clearTimeout(e),
                b.content.css("visibility", "hidden"),
                (a = b._getItemToZoom()),
                !a)
              )
                return void k();
              (f = j(a)),
                f.css(b._getOffset()),
                b.wrap.append(f),
                (e = setTimeout(function () {
                  f.css(b._getOffset(!0)),
                    (e = setTimeout(function () {
                      k(),
                        setTimeout(function () {
                          f.remove(), (a = f = null), y("ZoomAnimationEnded");
                        }, 16);
                    }, g));
                }, 16));
            }
          }),
            w(i + d, function () {
              if (b._allowZoom()) {
                if ((clearTimeout(e), (b.st.removalDelay = g), !a)) {
                  if (((a = b._getItemToZoom()), !a)) return;
                  f = j(a);
                }
                f.css(b._getOffset(!0)),
                  b.wrap.append(f),
                  b.content.css("visibility", "hidden"),
                  setTimeout(function () {
                    f.css(b._getOffset());
                  }, 16);
              }
            }),
            w(h + d, function () {
              b._allowZoom() && (k(), f && f.remove(), (a = null));
            });
        }
      },
      _allowZoom: function () {
        return "image" === b.currItem.type;
      },
      _getItemToZoom: function () {
        return b.currItem.hasSize ? b.currItem.img : !1;
      },
      _getOffset: function (c) {
        var d;
        d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
        var e = d.offset(),
          f = parseInt(d.css("padding-top"), 10),
          g = parseInt(d.css("padding-bottom"), 10);
        e.top -= a(window).scrollTop() - f;
        var h = {
          width: d.width(),
          height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f,
        };
        return (
          O()
            ? (h["-moz-transform"] = h.transform =
                "translate(" + e.left + "px," + e.top + "px)")
            : ((h.left = e.left), (h.top = e.top)),
          h
        );
      },
    },
  });
  var P = "iframe",
    Q = "//about:blank",
    R = function (a) {
      if (b.currTemplate[P]) {
        var c = b.currTemplate[P].find("iframe");
        c.length &&
          (a || (c[0].src = Q),
          b.isIE8 && c.css("display", a ? "block" : "none"));
      }
    };
  a.magnificPopup.registerModule(P, {
    options: {
      markup:
        '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1",
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1",
        },
        gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
      },
    },
    proto: {
      initIframe: function () {
        b.types.push(P),
          w("BeforeChange", function (a, b, c) {
            b !== c && (b === P ? R() : c === P && R(!0));
          }),
          w(h + "." + P, function () {
            R();
          });
      },
      getIframe: function (c, d) {
        var e = c.src,
          f = b.st.iframe;
        a.each(f.patterns, function () {
          return e.indexOf(this.index) > -1
            ? (this.id &&
                (e =
                  "string" == typeof this.id
                    ? e.substr(
                        e.lastIndexOf(this.id) + this.id.length,
                        e.length
                      )
                    : this.id.call(this, e)),
              (e = this.src.replace("%id%", e)),
              !1)
            : void 0;
        });
        var g = {};
        return (
          f.srcAction && (g[f.srcAction] = e),
          b._parseMarkup(d, g, c),
          b.updateStatus("ready"),
          d
        );
      },
    },
  });
  var S = function (a) {
      var c = b.items.length;
      return a > c - 1 ? a - c : 0 > a ? c + a : a;
    },
    T = function (a, b, c) {
      return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
    };
  a.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup:
        '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%",
    },
    proto: {
      initGallery: function () {
        var c = b.st.gallery,
          e = ".mfp-gallery";
        return (
          (b.direction = !0),
          c && c.enabled
            ? ((f += " mfp-gallery"),
              w(m + e, function () {
                c.navigateByImgClick &&
                  b.wrap.on("click" + e, ".mfp-img", function () {
                    return b.items.length > 1 ? (b.next(), !1) : void 0;
                  }),
                  d.on("keydown" + e, function (a) {
                    37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
                  });
              }),
              w("UpdateStatus" + e, function (a, c) {
                c.text &&
                  (c.text = T(c.text, b.currItem.index, b.items.length));
              }),
              w(l + e, function (a, d, e, f) {
                var g = b.items.length;
                e.counter = g > 1 ? T(c.tCounter, f.index, g) : "";
              }),
              w("BuildControls" + e, function () {
                if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                  var d = c.arrowMarkup,
                    e = (b.arrowLeft = a(
                      d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")
                    ).addClass(s)),
                    f = (b.arrowRight = a(
                      d
                        .replace(/%title%/gi, c.tNext)
                        .replace(/%dir%/gi, "right")
                    ).addClass(s));
                  e.click(function () {
                    b.prev();
                  }),
                    f.click(function () {
                      b.next();
                    }),
                    b.container.append(e.add(f));
                }
              }),
              w(n + e, function () {
                b._preloadTimeout && clearTimeout(b._preloadTimeout),
                  (b._preloadTimeout = setTimeout(function () {
                    b.preloadNearbyImages(), (b._preloadTimeout = null);
                  }, 16));
              }),
              void w(h + e, function () {
                d.off(e),
                  b.wrap.off("click" + e),
                  (b.arrowRight = b.arrowLeft = null);
              }))
            : !1
        );
      },
      next: function () {
        (b.direction = !0), (b.index = S(b.index + 1)), b.updateItemHTML();
      },
      prev: function () {
        (b.direction = !1), (b.index = S(b.index - 1)), b.updateItemHTML();
      },
      goTo: function (a) {
        (b.direction = a >= b.index), (b.index = a), b.updateItemHTML();
      },
      preloadNearbyImages: function () {
        var a,
          c = b.st.gallery.preload,
          d = Math.min(c[0], b.items.length),
          e = Math.min(c[1], b.items.length);
        for (a = 1; a <= (b.direction ? e : d); a++)
          b._preloadItem(b.index + a);
        for (a = 1; a <= (b.direction ? d : e); a++)
          b._preloadItem(b.index - a);
      },
      _preloadItem: function (c) {
        if (((c = S(c)), !b.items[c].preloaded)) {
          var d = b.items[c];
          d.parsed || (d = b.parseEl(c)),
            y("LazyLoad", d),
            "image" === d.type &&
              (d.img = a('<img class="mfp-img" />')
                .on("load.mfploader", function () {
                  d.hasSize = !0;
                })
                .on("error.mfploader", function () {
                  (d.hasSize = !0), (d.loadError = !0), y("LazyLoadError", d);
                })
                .attr("src", d.src)),
            (d.preloaded = !0);
        }
      },
    },
  });
  var U = "retina";
  a.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function (a) {
        return a.src.replace(/\.\w+$/, function (a) {
          return "@2x" + a;
        });
      },
      ratio: 1,
    },
    proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var a = b.st.retina,
            c = a.ratio;
          (c = isNaN(c) ? c() : c),
            c > 1 &&
              (w("ImageHasSize." + U, function (a, b) {
                b.img.css({
                  "max-width": b.img[0].naturalWidth / c,
                  width: "100%",
                });
              }),
              w("ElementParse." + U, function (b, d) {
                d.src = a.replaceSrc(d, c);
              }));
        }
      },
    },
  }),
    A();
});

// Scrollup js
/*!
 * scrollup v2.4.1
 * Url: http://markgoodyear.com/labs/scrollup/
 * Copyright (c) Mark Goodyear — @markgdyr — http://markgoodyear.com
 * License: MIT
 */
!(function (l, o, e) {
  "use strict";
  (l.fn.scrollUp = function (o) {
    l.data(e.body, "scrollUp") ||
      (l.data(e.body, "scrollUp", !0), l.fn.scrollUp.init(o));
  }),
    (l.fn.scrollUp.init = function (r) {
      var s,
        t,
        c,
        i,
        n,
        a,
        d = (l.fn.scrollUp.settings = l.extend({}, l.fn.scrollUp.defaults, r)),
        p = !1;
      switch (
        ((a = d.scrollTrigger
          ? l(d.scrollTrigger)
          : l("<a/>", { id: d.scrollName, href: "#top" })),
        d.scrollTitle && a.attr("title", d.scrollTitle),
        a.appendTo("body"),
        d.scrollImg || d.scrollTrigger || a.html(d.scrollText),
        a.css({ display: "none", position: "fixed", zIndex: d.zIndex }),
        d.activeOverlay &&
          l("<div/>", { id: d.scrollName + "-active" })
            .css({
              position: "absolute",
              top: d.scrollDistance + "px",
              width: "100%",
              borderTop: "1px dotted" + d.activeOverlay,
              zIndex: d.zIndex,
            })
            .appendTo("body"),
        d.animation)
      ) {
        case "fade":
          (s = "fadeIn"), (t = "fadeOut"), (c = d.animationSpeed);
          break;
        case "slide":
          (s = "slideDown"), (t = "slideUp"), (c = d.animationSpeed);
          break;
        default:
          (s = "show"), (t = "hide"), (c = 0);
      }
      (i =
        "top" === d.scrollFrom
          ? d.scrollDistance
          : l(e).height() - l(o).height() - d.scrollDistance),
        l(o).scroll(function () {
          l(o).scrollTop() > i
            ? p || (a[s](c), (p = !0))
            : p && (a[t](c), (p = !1));
        }),
        d.scrollTarget
          ? "number" == typeof d.scrollTarget
            ? (n = d.scrollTarget)
            : "string" == typeof d.scrollTarget &&
              (n = Math.floor(l(d.scrollTarget).offset().top))
          : (n = 0),
        a.click(function (o) {
          o.preventDefault(),
            l("html, body").animate(
              { scrollTop: n },
              d.scrollSpeed,
              d.easingType
            );
        });
    }),
    (l.fn.scrollUp.defaults = {
      scrollName: "scrollUp",
      scrollDistance: 300,
      scrollFrom: "top",
      scrollSpeed: 300,
      easingType: "easeOutElastic",
      animation: "fade",
      animationSpeed: 500,
      scrollTrigger: !1,
      scrollTarget: !1,
      scrollText: "Scroll to top",
      scrollTitle: !1,
      scrollImg: !1,
      activeOverlay: !1,
      zIndex: 2147483647,
    }),
    (l.fn.scrollUp.destroy = function (r) {
      l.removeData(e.body, "scrollUp"),
        l("#" + l.fn.scrollUp.settings.scrollName).remove(),
        l("#" + l.fn.scrollUp.settings.scrollName + "-active").remove(),
        l.fn.jquery.split(".")[1] >= 7
          ? l(o).off("scroll", r)
          : l(o).unbind("scroll", r);
    }),
    (l.scrollUp = l.fn.scrollUp);
})(jQuery, window, document);

// WOW js

/*! WOW - v1.1.2 - 2015-04-07
 * Copyright (c) 2015 Matthieu Aussaguel; Licensed MIT */ (function () {
  var a,
    b,
    c,
    d,
    e,
    f = function (a, b) {
      return function () {
        return a.apply(b, arguments);
      };
    },
    g =
      [].indexOf ||
      function (a) {
        for (var b = 0, c = this.length; c > b; b++)
          if (b in this && this[b] === a) return b;
        return -1;
      };
  (b = (function () {
    function a() {}
    return (
      (a.prototype.extend = function (a, b) {
        var c, d;
        for (c in b) (d = b[c]), null == a[c] && (a[c] = d);
        return a;
      }),
      (a.prototype.isMobile = function (a) {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          a
        );
      }),
      (a.prototype.createEvent = function (a, b, c, d) {
        var e;
        return (
          null == b && (b = !1),
          null == c && (c = !1),
          null == d && (d = null),
          null != document.createEvent
            ? ((e = document.createEvent("CustomEvent")),
              e.initCustomEvent(a, b, c, d))
            : null != document.createEventObject
            ? ((e = document.createEventObject()), (e.eventType = a))
            : (e.eventName = a),
          e
        );
      }),
      (a.prototype.emitEvent = function (a, b) {
        return null != a.dispatchEvent
          ? a.dispatchEvent(b)
          : b in (null != a)
          ? a[b]()
          : "on" + b in (null != a)
          ? a["on" + b]()
          : void 0;
      }),
      (a.prototype.addEvent = function (a, b, c) {
        return null != a.addEventListener
          ? a.addEventListener(b, c, !1)
          : null != a.attachEvent
          ? a.attachEvent("on" + b, c)
          : (a[b] = c);
      }),
      (a.prototype.removeEvent = function (a, b, c) {
        return null != a.removeEventListener
          ? a.removeEventListener(b, c, !1)
          : null != a.detachEvent
          ? a.detachEvent("on" + b, c)
          : delete a[b];
      }),
      (a.prototype.innerHeight = function () {
        return "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.clientHeight;
      }),
      a
    );
  })()),
    (c =
      this.WeakMap ||
      this.MozWeakMap ||
      (c = (function () {
        function a() {
          (this.keys = []), (this.values = []);
        }
        return (
          (a.prototype.get = function (a) {
            var b, c, d, e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
              if (((c = f[b]), c === a)) return this.values[b];
          }),
          (a.prototype.set = function (a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
              if (((d = g[c]), d === a)) return void (this.values[c] = b);
            return this.keys.push(a), this.values.push(b);
          }),
          a
        );
      })())),
    (a =
      this.MutationObserver ||
      this.WebkitMutationObserver ||
      this.MozMutationObserver ||
      (a = (function () {
        function a() {
          "undefined" != typeof console &&
            null !== console &&
            console.warn("MutationObserver is not supported by your browser."),
            "undefined" != typeof console &&
              null !== console &&
              console.warn(
                "WOW.js cannot detect dom mutations, please call .sync() after loading new content."
              );
        }
        return (a.notSupported = !0), (a.prototype.observe = function () {}), a;
      })())),
    (d =
      this.getComputedStyle ||
      function (a) {
        return (
          (this.getPropertyValue = function (b) {
            var c;
            return (
              "float" === b && (b = "styleFloat"),
              e.test(b) &&
                b.replace(e, function (a, b) {
                  return b.toUpperCase();
                }),
              (null != (c = a.currentStyle) ? c[b] : void 0) || null
            );
          }),
          this
        );
      }),
    (e = /(\-([a-z]){1})/g),
    (this.WOW = (function () {
      function e(a) {
        null == a && (a = {}),
          (this.scrollCallback = f(this.scrollCallback, this)),
          (this.scrollHandler = f(this.scrollHandler, this)),
          (this.resetAnimation = f(this.resetAnimation, this)),
          (this.start = f(this.start, this)),
          (this.scrolled = !0),
          (this.config = this.util().extend(a, this.defaults)),
          (this.animationNameCache = new c()),
          (this.wowEvent = this.util().createEvent(this.config.boxClass));
      }
      return (
        (e.prototype.defaults = {
          boxClass: "wow",
          animateClass: "animated",
          offset: 0,
          mobile: !0,
          live: !0,
          callback: null,
        }),
        (e.prototype.init = function () {
          var a;
          return (
            (this.element = window.document.documentElement),
            "interactive" === (a = document.readyState) || "complete" === a
              ? this.start()
              : this.util().addEvent(document, "DOMContentLoaded", this.start),
            (this.finished = [])
          );
        }),
        (e.prototype.start = function () {
          var b, c, d, e;
          if (
            ((this.stopped = !1),
            (this.boxes = function () {
              var a, c, d, e;
              for (
                d = this.element.querySelectorAll("." + this.config.boxClass),
                  e = [],
                  a = 0,
                  c = d.length;
                c > a;
                a++
              )
                (b = d[a]), e.push(b);
              return e;
            }.call(this)),
            (this.all = function () {
              var a, c, d, e;
              for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++)
                (b = d[a]), e.push(b);
              return e;
            }.call(this)),
            this.boxes.length)
          )
            if (this.disabled()) this.resetStyle();
            else
              for (e = this.boxes, c = 0, d = e.length; d > c; c++)
                (b = e[c]), this.applyStyle(b, !0);
          return (
            this.disabled() ||
              (this.util().addEvent(window, "scroll", this.scrollHandler),
              this.util().addEvent(window, "resize", this.scrollHandler),
              (this.interval = setInterval(this.scrollCallback, 50))),
            this.config.live
              ? new a(
                  (function (a) {
                    return function (b) {
                      var c, d, e, f, g;
                      for (g = [], c = 0, d = b.length; d > c; c++)
                        (f = b[c]),
                          g.push(
                            function () {
                              var a, b, c, d;
                              for (
                                c = f.addedNodes || [],
                                  d = [],
                                  a = 0,
                                  b = c.length;
                                b > a;
                                a++
                              )
                                (e = c[a]), d.push(this.doSync(e));
                              return d;
                            }.call(a)
                          );
                      return g;
                    };
                  })(this)
                ).observe(document.body, { childList: !0, subtree: !0 })
              : void 0
          );
        }),
        (e.prototype.stop = function () {
          return (
            (this.stopped = !0),
            this.util().removeEvent(window, "scroll", this.scrollHandler),
            this.util().removeEvent(window, "resize", this.scrollHandler),
            null != this.interval ? clearInterval(this.interval) : void 0
          );
        }),
        (e.prototype.sync = function () {
          return a.notSupported ? this.doSync(this.element) : void 0;
        }),
        (e.prototype.doSync = function (a) {
          var b, c, d, e, f;
          if ((null == a && (a = this.element), 1 === a.nodeType)) {
            for (
              a = a.parentNode || a,
                e = a.querySelectorAll("." + this.config.boxClass),
                f = [],
                c = 0,
                d = e.length;
              d > c;
              c++
            )
              (b = e[c]),
                g.call(this.all, b) < 0
                  ? (this.boxes.push(b),
                    this.all.push(b),
                    this.stopped || this.disabled()
                      ? this.resetStyle()
                      : this.applyStyle(b, !0),
                    f.push((this.scrolled = !0)))
                  : f.push(void 0);
            return f;
          }
        }),
        (e.prototype.show = function (a) {
          return (
            this.applyStyle(a),
            (a.className = a.className + " " + this.config.animateClass),
            null != this.config.callback && this.config.callback(a),
            this.util().emitEvent(a, this.wowEvent),
            this.util().addEvent(a, "animationend", this.resetAnimation),
            this.util().addEvent(a, "oanimationend", this.resetAnimation),
            this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation),
            this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation),
            a
          );
        }),
        (e.prototype.applyStyle = function (a, b) {
          var c, d, e;
          return (
            (d = a.getAttribute("data-wow-duration")),
            (c = a.getAttribute("data-wow-delay")),
            (e = a.getAttribute("data-wow-iteration")),
            this.animate(
              (function (f) {
                return function () {
                  return f.customStyle(a, b, d, c, e);
                };
              })(this)
            )
          );
        }),
        (e.prototype.animate = (function () {
          return "requestAnimationFrame" in window
            ? function (a) {
                return window.requestAnimationFrame(a);
              }
            : function (a) {
                return a();
              };
        })()),
        (e.prototype.resetStyle = function () {
          var a, b, c, d, e;
          for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
            (a = d[b]), e.push((a.style.visibility = "visible"));
          return e;
        }),
        (e.prototype.resetAnimation = function (a) {
          var b;
          return a.type.toLowerCase().indexOf("animationend") >= 0
            ? ((b = a.target || a.srcElement),
              (b.className = b.className
                .replace(this.config.animateClass, "")
                .trim()))
            : void 0;
        }),
        (e.prototype.customStyle = function (a, b, c, d, e) {
          return (
            b && this.cacheAnimationName(a),
            (a.style.visibility = b ? "hidden" : "visible"),
            c && this.vendorSet(a.style, { animationDuration: c }),
            d && this.vendorSet(a.style, { animationDelay: d }),
            e && this.vendorSet(a.style, { animationIterationCount: e }),
            this.vendorSet(a.style, {
              animationName: b ? "none" : this.cachedAnimationName(a),
            }),
            a
          );
        }),
        (e.prototype.vendors = ["moz", "webkit"]),
        (e.prototype.vendorSet = function (a, b) {
          var c, d, e, f;
          d = [];
          for (c in b)
            (e = b[c]),
              (a["" + c] = e),
              d.push(
                function () {
                  var b, d, g, h;
                  for (
                    g = this.vendors, h = [], b = 0, d = g.length;
                    d > b;
                    b++
                  )
                    (f = g[b]),
                      h.push(
                        (a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] =
                          e)
                      );
                  return h;
                }.call(this)
              );
          return d;
        }),
        (e.prototype.vendorCSS = function (a, b) {
          var c, e, f, g, h, i;
          for (
            h = d(a),
              g = h.getPropertyCSSValue(b),
              f = this.vendors,
              c = 0,
              e = f.length;
            e > c;
            c++
          )
            (i = f[c]), (g = g || h.getPropertyCSSValue("-" + i + "-" + b));
          return g;
        }),
        (e.prototype.animationName = function (a) {
          var b;
          try {
            b = this.vendorCSS(a, "animation-name").cssText;
          } catch (c) {
            b = d(a).getPropertyValue("animation-name");
          }
          return "none" === b ? "" : b;
        }),
        (e.prototype.cacheAnimationName = function (a) {
          return this.animationNameCache.set(a, this.animationName(a));
        }),
        (e.prototype.cachedAnimationName = function (a) {
          return this.animationNameCache.get(a);
        }),
        (e.prototype.scrollHandler = function () {
          return (this.scrolled = !0);
        }),
        (e.prototype.scrollCallback = function () {
          var a;
          return !this.scrolled ||
            ((this.scrolled = !1),
            (this.boxes = function () {
              var b, c, d, e;
              for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
                (a = d[b]), a && (this.isVisible(a) ? this.show(a) : e.push(a));
              return e;
            }.call(this)),
            this.boxes.length || this.config.live)
            ? void 0
            : this.stop();
        }),
        (e.prototype.offsetTop = function (a) {
          for (var b; void 0 === a.offsetTop; ) a = a.parentNode;
          for (b = a.offsetTop; (a = a.offsetParent); ) b += a.offsetTop;
          return b;
        }),
        (e.prototype.isVisible = function (a) {
          var b, c, d, e, f;
          return (
            (c = a.getAttribute("data-wow-offset") || this.config.offset),
            (f = window.pageYOffset),
            (e =
              f +
              Math.min(this.element.clientHeight, this.util().innerHeight()) -
              c),
            (d = this.offsetTop(a)),
            (b = d + a.clientHeight),
            e >= d && b >= f
          );
        }),
        (e.prototype.util = function () {
          return null != this._util ? this._util : (this._util = new b());
        }),
        (e.prototype.disabled = function () {
          return (
            !this.config.mobile && this.util().isMobile(navigator.userAgent)
          );
        }),
        e
      );
    })());
}).call(this);

/*Credits:
 * https://www.developphp.com/video/JavaScript/Circular-Progress-Loader-Canvas-JavaScript-Programming-Tutorial
 */

(function () {
  var Progress = function (element) {
    this.context = element.getContext("2d");
    this.refElement = element.parentNode;
    this.loaded = 0;
    this.start = 4.72;
    this.width = this.context.canvas.width;
    this.height = this.context.canvas.height;
    this.total = parseInt(this.refElement.dataset.percent, 10);
    this.timer = null;
    this.diff = 0;
    this.init();
  };
  Progress.prototype = {
    init: function () {
      var self = this;
      self.timer = setInterval(function () {
        self.run();
      }, 25);
    },
    run: function () {
      var self = this;
      self.diff = ((self.loaded / 100) * Math.PI * 2 * 10).toFixed(2);
      self.context.clearRect(0, 0, self.width, self.height);
      self.context.lineWidth = 5;
      self.context.fillStyle = "#000000";
      self.context.strokeStyle = "#1d1d1d";
      self.context.textAlign = "center";
      self.context.fillText(
        self.loaded + "%",
        self.width * 0.5,
        self.height * 0.5 + 2,
        self.width
      );
      self.context.beginPath();
      self.context.arc(
        50,
        50,
        45,
        self.start,
        self.diff / 10 + self.start,
        false
      );
      self.context.stroke();
      if (self.loaded >= self.total) {
        clearInterval(self.timer);
      }
      self.loaded++;
    },
  };
  var CircularSkillBar = function (elements) {
    this.bars = document.querySelectorAll(elements);
    if (this.bars.length > 0) {
      this.init();
    }
  };
  CircularSkillBar.prototype = {
    init: function () {
      this.tick = 25;
      this.progress();
    },
    progress: function () {
      var self = this;
      var index = 0;
      var firstCanvas = self.bars[0].querySelector("canvas");
      var firstProg = new Progress(firstCanvas);
      var timer = setInterval(function () {
        index++;
        var canvas = self.bars[index].querySelector("canvas");
        var prog = new Progress(canvas);
        if (index == self.bars.length) {
          clearInterval(timer);
        }
      }, self.tick * 100);
    },
  };
  document.addEventListener("DOMContentLoaded", function () {
    var circularBars = new CircularSkillBar(".single-pie-bar");
  });
})();

// Imageloaded
/*!
 * imagesLoaded PACKAGED v4.1.3
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
!(function (e, t) {
  "function" == typeof define && define.amd
    ? define("ev-emitter/ev-emitter", t)
    : "object" == typeof module && module.exports
    ? (module.exports = t())
    : (e.EvEmitter = t());
})("undefined" != typeof window ? window : this, function () {
  function e() {}
  var t = e.prototype;
  return (
    (t.on = function (e, t) {
      if (e && t) {
        var i = (this._events = this._events || {}),
          n = (i[e] = i[e] || []);
        return -1 == n.indexOf(t) && n.push(t), this;
      }
    }),
    (t.once = function (e, t) {
      if (e && t) {
        this.on(e, t);
        var i = (this._onceEvents = this._onceEvents || {}),
          n = (i[e] = i[e] || {});
        return (n[t] = !0), this;
      }
    }),
    (t.off = function (e, t) {
      var i = this._events && this._events[e];
      if (i && i.length) {
        var n = i.indexOf(t);
        return -1 != n && i.splice(n, 1), this;
      }
    }),
    (t.emitEvent = function (e, t) {
      var i = this._events && this._events[e];
      if (i && i.length) {
        var n = 0,
          o = i[n];
        t = t || [];
        for (var r = this._onceEvents && this._onceEvents[e]; o; ) {
          var s = r && r[o];
          s && (this.off(e, o), delete r[o]),
            o.apply(this, t),
            (n += s ? 0 : 1),
            (o = i[n]);
        }
        return this;
      }
    }),
    (t.allOff = t.removeAllListeners =
      function () {
        delete this._events, delete this._onceEvents;
      }),
    e
  );
}),
  (function (e, t) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["ev-emitter/ev-emitter"], function (i) {
          return t(e, i);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = t(e, require("ev-emitter")))
      : (e.imagesLoaded = t(e, e.EvEmitter));
  })("undefined" != typeof window ? window : this, function (e, t) {
    function i(e, t) {
      for (var i in t) e[i] = t[i];
      return e;
    }
    function n(e) {
      var t = [];
      if (Array.isArray(e)) t = e;
      else if ("number" == typeof e.length)
        for (var i = 0; i < e.length; i++) t.push(e[i]);
      else t.push(e);
      return t;
    }
    function o(e, t, r) {
      return this instanceof o
        ? ("string" == typeof e && (e = document.querySelectorAll(e)),
          (this.elements = n(e)),
          (this.options = i({}, this.options)),
          "function" == typeof t ? (r = t) : i(this.options, t),
          r && this.on("always", r),
          this.getImages(),
          h && (this.jqDeferred = new h.Deferred()),
          void setTimeout(
            function () {
              this.check();
            }.bind(this)
          ))
        : new o(e, t, r);
    }
    function r(e) {
      this.img = e;
    }
    function s(e, t) {
      (this.url = e), (this.element = t), (this.img = new Image());
    }
    var h = e.jQuery,
      a = e.console;
    (o.prototype = Object.create(t.prototype)),
      (o.prototype.options = {}),
      (o.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (o.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e),
          this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && d[t]) {
          for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
            var o = i[n];
            this.addImage(o);
          }
          if ("string" == typeof this.options.background) {
            var r = e.querySelectorAll(this.options.background);
            for (n = 0; n < r.length; n++) {
              var s = r[n];
              this.addElementBackgroundImages(s);
            }
          }
        }
      });
    var d = { 1: !0, 9: !0, 11: !0 };
    return (
      (o.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);
        if (t)
          for (
            var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage);
            null !== n;

          ) {
            var o = n && n[2];
            o && this.addBackground(o, e), (n = i.exec(t.backgroundImage));
          }
      }),
      (o.prototype.addImage = function (e) {
        var t = new r(e);
        this.images.push(t);
      }),
      (o.prototype.addBackground = function (e, t) {
        var i = new s(e, t);
        this.images.push(i);
      }),
      (o.prototype.check = function () {
        function e(e, i, n) {
          setTimeout(function () {
            t.progress(e, i, n);
          });
        }
        var t = this;
        return (
          (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? void this.images.forEach(function (t) {
                t.once("progress", e), t.check();
              })
            : void this.complete()
        );
      }),
      (o.prototype.progress = function (e, t, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded),
          this.emitEvent("progress", [this, e, t]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, e),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && a && a.log("progress: " + i, e, t);
      }),
      (o.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
          this.emitEvent(e, [this]),
          this.emitEvent("always", [this]),
          this.jqDeferred)
        ) {
          var t = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[t](this);
        }
      }),
      (r.prototype = Object.create(t.prototype)),
      (r.prototype.check = function () {
        var e = this.getIsImageComplete();
        return e
          ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            void (this.proxyImage.src = this.img.src));
      }),
      (r.prototype.getIsImageComplete = function () {
        return this.img.complete && void 0 !== this.img.naturalWidth;
      }),
      (r.prototype.confirm = function (e, t) {
        (this.isLoaded = e), this.emitEvent("progress", [this, this.img, t]);
      }),
      (r.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
      }),
      (r.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (r.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype = Object.create(r.prototype)),
      (s.prototype.check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url);
        var e = this.getIsImageComplete();
        e &&
          (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
          this.unbindEvents());
      }),
      (s.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype.confirm = function (e, t) {
        (this.isLoaded = e),
          this.emitEvent("progress", [this, this.element, t]);
      }),
      (o.makeJQueryPlugin = function (t) {
        (t = t || e.jQuery),
          t &&
            ((h = t),
            (h.fn.imagesLoaded = function (e, t) {
              var i = new o(this, e, t);
              return i.jqDeferred.promise(h(this));
            }));
      }),
      o.makeJQueryPlugin(),
      o
    );
  });

// Isotope
/*!
 * Isotope PACKAGED v3.0.2
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 * http://isotope.metafizzy.co
 * Copyright 2016 Metafizzy
 */
!(function (t, e) {
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
        return e(t, i);
      })
    : "object" == typeof module && module.exports
    ? (module.exports = e(t, require("jquery")))
    : (t.jQueryBridget = e(t, t.jQuery));
})(window, function (t, e) {
  "use strict";
  function i(i, s, a) {
    function u(t, e, n) {
      var o,
        s = "$()." + i + '("' + e + '")';
      return (
        t.each(function (t, u) {
          var h = a.data(u, i);
          if (!h)
            return void r(
              i + " not initialized. Cannot call methods, i.e. " + s
            );
          var d = h[e];
          if (!d || "_" == e.charAt(0))
            return void r(s + " is not a valid method");
          var l = d.apply(h, n);
          o = void 0 === o ? l : o;
        }),
        void 0 !== o ? o : t
      );
    }
    function h(t, e) {
      t.each(function (t, n) {
        var o = a.data(n, i);
        o ? (o.option(e), o._init()) : ((o = new s(n, e)), a.data(n, i, o));
      });
    }
    (a = a || e || t.jQuery),
      a &&
        (s.prototype.option ||
          (s.prototype.option = function (t) {
            a.isPlainObject(t) &&
              (this.options = a.extend(!0, this.options, t));
          }),
        (a.fn[i] = function (t) {
          if ("string" == typeof t) {
            var e = o.call(arguments, 1);
            return u(this, t, e);
          }
          return h(this, t), this;
        }),
        n(a));
  }
  function n(t) {
    !t || (t && t.bridget) || (t.bridget = i);
  }
  var o = Array.prototype.slice,
    s = t.console,
    r =
      "undefined" == typeof s
        ? function () {}
        : function (t) {
            s.error(t);
          };
  return n(e || t.jQuery), i;
}),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("ev-emitter/ev-emitter", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.EvEmitter = e());
  })("undefined" != typeof window ? window : this, function () {
    function t() {}
    var e = t.prototype;
    return (
      (e.on = function (t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            n = (i[t] = i[t] || []);
          return n.indexOf(e) == -1 && n.push(e), this;
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e);
          var i = (this._onceEvents = this._onceEvents || {}),
            n = (i[t] = i[t] || {});
          return (n[e] = !0), this;
        }
      }),
      (e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = i.indexOf(e);
          return n != -1 && i.splice(n, 1), this;
        }
      }),
      (e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = 0,
            o = i[n];
          e = e || [];
          for (var s = this._onceEvents && this._onceEvents[t]; o; ) {
            var r = s && s[o];
            r && (this.off(t, o), delete s[o]),
              o.apply(this, e),
              (n += r ? 0 : 1),
              (o = i[n]);
          }
          return this;
        }
      }),
      t
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("get-size/get-size", [], function () {
          return e();
        })
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.getSize = e());
  })(window, function () {
    "use strict";
    function t(t) {
      var e = parseFloat(t),
        i = t.indexOf("%") == -1 && !isNaN(e);
      return i && e;
    }
    function e() {}
    function i() {
      for (
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          e = 0;
        e < h;
        e++
      ) {
        var i = u[e];
        t[i] = 0;
      }
      return t;
    }
    function n(t) {
      var e = getComputedStyle(t);
      return (
        e ||
          a(
            "Style returned " +
              e +
              ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"
          ),
        e
      );
    }
    function o() {
      if (!d) {
        d = !0;
        var e = document.createElement("div");
        (e.style.width = "200px"),
          (e.style.padding = "1px 2px 3px 4px"),
          (e.style.borderStyle = "solid"),
          (e.style.borderWidth = "1px 2px 3px 4px"),
          (e.style.boxSizing = "border-box");
        var i = document.body || document.documentElement;
        i.appendChild(e);
        var o = n(e);
        (s.isBoxSizeOuter = r = 200 == t(o.width)), i.removeChild(e);
      }
    }
    function s(e) {
      if (
        (o(),
        "string" == typeof e && (e = document.querySelector(e)),
        e && "object" == typeof e && e.nodeType)
      ) {
        var s = n(e);
        if ("none" == s.display) return i();
        var a = {};
        (a.width = e.offsetWidth), (a.height = e.offsetHeight);
        for (
          var d = (a.isBorderBox = "border-box" == s.boxSizing), l = 0;
          l < h;
          l++
        ) {
          var f = u[l],
            c = s[f],
            m = parseFloat(c);
          a[f] = isNaN(m) ? 0 : m;
        }
        var p = a.paddingLeft + a.paddingRight,
          y = a.paddingTop + a.paddingBottom,
          g = a.marginLeft + a.marginRight,
          v = a.marginTop + a.marginBottom,
          _ = a.borderLeftWidth + a.borderRightWidth,
          I = a.borderTopWidth + a.borderBottomWidth,
          z = d && r,
          x = t(s.width);
        x !== !1 && (a.width = x + (z ? 0 : p + _));
        var S = t(s.height);
        return (
          S !== !1 && (a.height = S + (z ? 0 : y + I)),
          (a.innerWidth = a.width - (p + _)),
          (a.innerHeight = a.height - (y + I)),
          (a.outerWidth = a.width + g),
          (a.outerHeight = a.height + v),
          a
        );
      }
    }
    var r,
      a =
        "undefined" == typeof console
          ? e
          : function (t) {
              console.error(t);
            },
      u = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ],
      h = u.length,
      d = !1;
    return s;
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("desandro-matches-selector/matches-selector", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.matchesSelector = e());
  })(window, function () {
    "use strict";
    var t = (function () {
      var t = Element.prototype;
      if (t.matches) return "matches";
      if (t.matchesSelector) return "matchesSelector";
      for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
        var n = e[i],
          o = n + "MatchesSelector";
        if (t[o]) return o;
      }
    })();
    return function (e, i) {
      return e[t](i);
    };
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["desandro-matches-selector/matches-selector"],
          function (i) {
            return e(t, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("desandro-matches-selector")))
      : (t.fizzyUIUtils = e(t, t.matchesSelector));
  })(window, function (t, e) {
    var i = {};
    (i.extend = function (t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }),
      (i.modulo = function (t, e) {
        return ((t % e) + e) % e;
      }),
      (i.makeArray = function (t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if (t && "number" == typeof t.length)
          for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e;
      }),
      (i.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        i != -1 && t.splice(i, 1);
      }),
      (i.getParent = function (t, i) {
        for (; t != document.body; )
          if (((t = t.parentNode), e(t, i))) return t;
      }),
      (i.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t;
      }),
      (i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (i.filterFindElements = function (t, n) {
        t = i.makeArray(t);
        var o = [];
        return (
          t.forEach(function (t) {
            if (t instanceof HTMLElement) {
              if (!n) return void o.push(t);
              e(t, n) && o.push(t);
              for (var i = t.querySelectorAll(n), s = 0; s < i.length; s++)
                o.push(i[s]);
            }
          }),
          o
        );
      }),
      (i.debounceMethod = function (t, e, i) {
        var n = t.prototype[e],
          o = e + "Timeout";
        t.prototype[e] = function () {
          var t = this[o];
          t && clearTimeout(t);
          var e = arguments,
            s = this;
          this[o] = setTimeout(function () {
            n.apply(s, e), delete s[o];
          }, i || 100);
        };
      }),
      (i.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e
          ? setTimeout(t)
          : document.addEventListener("DOMContentLoaded", t);
      }),
      (i.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i;
          })
          .toLowerCase();
      });
    var n = t.console;
    return (
      (i.htmlInit = function (e, o) {
        i.docReady(function () {
          var s = i.toDashed(o),
            r = "data-" + s,
            a = document.querySelectorAll("[" + r + "]"),
            u = document.querySelectorAll(".js-" + s),
            h = i.makeArray(a).concat(i.makeArray(u)),
            d = r + "-options",
            l = t.jQuery;
          h.forEach(function (t) {
            var i,
              s = t.getAttribute(r) || t.getAttribute(d);
            try {
              i = s && JSON.parse(s);
            } catch (a) {
              return void (
                n &&
                n.error("Error parsing " + r + " on " + t.className + ": " + a)
              );
            }
            var u = new e(t, i);
            l && l.data(t, o, u);
          });
        });
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "outlayer/item",
          ["ev-emitter/ev-emitter", "get-size/get-size"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("ev-emitter"), require("get-size")))
      : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)));
  })(window, function (t, e) {
    "use strict";
    function i(t) {
      for (var e in t) return !1;
      return (e = null), !0;
    }
    function n(t, e) {
      t &&
        ((this.element = t),
        (this.layout = e),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    function o(t) {
      return t.replace(/([A-Z])/g, function (t) {
        return "-" + t.toLowerCase();
      });
    }
    var s = document.documentElement.style,
      r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
      a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
      u = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend",
      }[r],
      h = {
        transform: a,
        transition: r,
        transitionDuration: r + "Duration",
        transitionProperty: r + "Property",
        transitionDelay: r + "Delay",
      },
      d = (n.prototype = Object.create(t.prototype));
    (d.constructor = n),
      (d._create = function () {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: "absolute" });
      }),
      (d.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (d.getSize = function () {
        this.size = e(this.element);
      }),
      (d.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
          var n = h[i] || i;
          e[n] = t[i];
        }
      }),
      (d.getPosition = function () {
        var t = getComputedStyle(this.element),
          e = this.layout._getOption("originLeft"),
          i = this.layout._getOption("originTop"),
          n = t[e ? "left" : "right"],
          o = t[i ? "top" : "bottom"],
          s = this.layout.size,
          r =
            n.indexOf("%") != -1
              ? (parseFloat(n) / 100) * s.width
              : parseInt(n, 10),
          a =
            o.indexOf("%") != -1
              ? (parseFloat(o) / 100) * s.height
              : parseInt(o, 10);
        (r = isNaN(r) ? 0 : r),
          (a = isNaN(a) ? 0 : a),
          (r -= e ? s.paddingLeft : s.paddingRight),
          (a -= i ? s.paddingTop : s.paddingBottom),
          (this.position.x = r),
          (this.position.y = a);
      }),
      (d.layoutPosition = function () {
        var t = this.layout.size,
          e = {},
          i = this.layout._getOption("originLeft"),
          n = this.layout._getOption("originTop"),
          o = i ? "paddingLeft" : "paddingRight",
          s = i ? "left" : "right",
          r = i ? "right" : "left",
          a = this.position.x + t[o];
        (e[s] = this.getXValue(a)), (e[r] = "");
        var u = n ? "paddingTop" : "paddingBottom",
          h = n ? "top" : "bottom",
          d = n ? "bottom" : "top",
          l = this.position.y + t[u];
        (e[h] = this.getYValue(l)),
          (e[d] = ""),
          this.css(e),
          this.emitEvent("layout", [this]);
      }),
      (d.getXValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e
          ? (t / this.layout.size.width) * 100 + "%"
          : t + "px";
      }),
      (d.getYValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e
          ? (t / this.layout.size.height) * 100 + "%"
          : t + "px";
      }),
      (d._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x,
          n = this.position.y,
          o = parseInt(t, 10),
          s = parseInt(e, 10),
          r = o === this.position.x && s === this.position.y;
        if ((this.setPosition(t, e), r && !this.isTransitioning))
          return void this.layoutPosition();
        var a = t - i,
          u = e - n,
          h = {};
        (h.transform = this.getTranslate(a, u)),
          this.transition({
            to: h,
            onTransitionEnd: { transform: this.layoutPosition },
            isCleaning: !0,
          });
      }),
      (d.getTranslate = function (t, e) {
        var i = this.layout._getOption("originLeft"),
          n = this.layout._getOption("originTop");
        return (
          (t = i ? t : -t),
          (e = n ? e : -e),
          "translate3d(" + t + "px, " + e + "px, 0)"
        );
      }),
      (d.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition();
      }),
      (d.moveTo = d._transitionTo),
      (d.setPosition = function (t, e) {
        (this.position.x = parseInt(t, 10)),
          (this.position.y = parseInt(e, 10));
      }),
      (d._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
      }),
      (d.transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration))
          return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to)
          (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
          this.css(t.from);
          var n = this.element.offsetHeight;
          n = null;
        }
        this.enableTransition(t.to),
          this.css(t.to),
          (this.isTransitioning = !0);
      });
    var l = "opacity," + o(a);
    (d.enableTransition = function () {
      if (!this.isTransitioning) {
        var t = this.layout.options.transitionDuration;
        (t = "number" == typeof t ? t + "ms" : t),
          this.css({
            transitionProperty: l,
            transitionDuration: t,
            transitionDelay: this.staggerDelay || 0,
          }),
          this.element.addEventListener(u, this, !1);
      }
    }),
      (d.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t);
      }),
      (d.onotransitionend = function (t) {
        this.ontransitionend(t);
      });
    var f = { "-webkit-transform": "transform" };
    (d.ontransitionend = function (t) {
      if (t.target === this.element) {
        var e = this._transn,
          n = f[t.propertyName] || t.propertyName;
        if (
          (delete e.ingProperties[n],
          i(e.ingProperties) && this.disableTransition(),
          n in e.clean &&
            ((this.element.style[t.propertyName] = ""), delete e.clean[n]),
          n in e.onEnd)
        ) {
          var o = e.onEnd[n];
          o.call(this), delete e.onEnd[n];
        }
        this.emitEvent("transitionEnd", [this]);
      }
    }),
      (d.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(u, this, !1),
          (this.isTransitioning = !1);
      }),
      (d._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e);
      });
    var c = {
      transitionProperty: "",
      transitionDuration: "",
      transitionDelay: "",
    };
    return (
      (d.removeTransitionStyles = function () {
        this.css(c);
      }),
      (d.stagger = function (t) {
        (t = isNaN(t) ? 0 : t), (this.staggerDelay = t + "ms");
      }),
      (d.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: "" }),
          this.emitEvent("remove", [this]);
      }),
      (d.remove = function () {
        return r && parseFloat(this.layout.options.transitionDuration)
          ? (this.once("transitionEnd", function () {
              this.removeElem();
            }),
            void this.hide())
          : void this.removeElem();
      }),
      (d.reveal = function () {
        delete this.isHidden, this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("visibleStyle");
        (e[i] = this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (d.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal");
      }),
      (d.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i;
      }),
      (d.hide = function () {
        (this.isHidden = !0), this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        (e[i] = this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (d.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({ display: "none" }), this.emitEvent("hide"));
      }),
      (d.destroy = function () {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: "",
        });
      }),
      n
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "outlayer/outlayer",
          [
            "ev-emitter/ev-emitter",
            "get-size/get-size",
            "fizzy-ui-utils/utils",
            "./item",
          ],
          function (i, n, o, s) {
            return e(t, i, n, o, s);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("ev-emitter"),
          require("get-size"),
          require("fizzy-ui-utils"),
          require("./item")
        ))
      : (t.Outlayer = e(
          t,
          t.EvEmitter,
          t.getSize,
          t.fizzyUIUtils,
          t.Outlayer.Item
        ));
  })(window, function (t, e, i, n, o) {
    "use strict";
    function s(t, e) {
      var i = n.getQueryElement(t);
      if (!i)
        return void (
          u &&
          u.error(
            "Bad element for " + this.constructor.namespace + ": " + (i || t)
          )
        );
      (this.element = i),
        h && (this.$element = h(this.element)),
        (this.options = n.extend({}, this.constructor.defaults)),
        this.option(e);
      var o = ++l;
      (this.element.outlayerGUID = o), (f[o] = this), this._create();
      var s = this._getOption("initLayout");
      s && this.layout();
    }
    function r(t) {
      function e() {
        t.apply(this, arguments);
      }
      return (
        (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        e
      );
    }
    function a(t) {
      if ("number" == typeof t) return t;
      var e = t.match(/(^\d*\.?\d*)(\w*)/),
        i = e && e[1],
        n = e && e[2];
      if (!i.length) return 0;
      i = parseFloat(i);
      var o = m[n] || 1;
      return i * o;
    }
    var u = t.console,
      h = t.jQuery,
      d = function () {},
      l = 0,
      f = {};
    (s.namespace = "outlayer"),
      (s.Item = o),
      (s.defaults = {
        containerStyle: { position: "relative" },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" },
      });
    var c = s.prototype;
    n.extend(c, e.prototype),
      (c.option = function (t) {
        n.extend(this.options, t);
      }),
      (c._getOption = function (t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e]
          ? this.options[e]
          : this.options[t];
      }),
      (s.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer",
      }),
      (c._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          n.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize();
      }),
      (c.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      }),
      (c._itemize = function (t) {
        for (
          var e = this._filterFindItemElements(t),
            i = this.constructor.Item,
            n = [],
            o = 0;
          o < e.length;
          o++
        ) {
          var s = e[o],
            r = new i(s, this);
          n.push(r);
        }
        return n;
      }),
      (c._filterFindItemElements = function (t) {
        return n.filterFindElements(t, this.options.itemSelector);
      }),
      (c.getItemElements = function () {
        return this.items.map(function (t) {
          return t.element;
        });
      }),
      (c.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
          e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), (this._isLayoutInited = !0);
      }),
      (c._init = c.layout),
      (c._resetLayout = function () {
        this.getSize();
      }),
      (c.getSize = function () {
        this.size = i(this.element);
      }),
      (c._getMeasurement = function (t, e) {
        var n,
          o = this.options[t];
        o
          ? ("string" == typeof o
              ? (n = this.element.querySelector(o))
              : o instanceof HTMLElement && (n = o),
            (this[t] = n ? i(n)[e] : o))
          : (this[t] = 0);
      }),
      (c.layoutItems = function (t, e) {
        (t = this._getItemsForLayout(t)),
          this._layoutItems(t, e),
          this._postLayout();
      }),
      (c._getItemsForLayout = function (t) {
        return t.filter(function (t) {
          return !t.isIgnored;
        });
      }),
      (c._layoutItems = function (t, e) {
        if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
          var i = [];
          t.forEach(function (t) {
            var n = this._getItemLayoutPosition(t);
            (n.item = t), (n.isInstant = e || t.isLayoutInstant), i.push(n);
          }, this),
            this._processLayoutQueue(i);
        }
      }),
      (c._getItemLayoutPosition = function () {
        return { x: 0, y: 0 };
      }),
      (c._processLayoutQueue = function (t) {
        this.updateStagger(),
          t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e);
          }, this);
      }),
      (c.updateStagger = function () {
        var t = this.options.stagger;
        return null === t || void 0 === t
          ? void (this.stagger = 0)
          : ((this.stagger = a(t)), this.stagger);
      }),
      (c._positionItem = function (t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i));
      }),
      (c._postLayout = function () {
        this.resizeContainer();
      }),
      (c.resizeContainer = function () {
        var t = this._getOption("resizeContainer");
        if (t) {
          var e = this._getContainerSize();
          e &&
            (this._setContainerMeasure(e.width, !0),
            this._setContainerMeasure(e.height, !1));
        }
      }),
      (c._getContainerSize = d),
      (c._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
          var i = this.size;
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft +
                i.paddingRight +
                i.borderLeftWidth +
                i.borderRightWidth
              : i.paddingBottom +
                i.paddingTop +
                i.borderTopWidth +
                i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? "width" : "height"] = t + "px");
        }
      }),
      (c._emitCompleteOnItems = function (t, e) {
        function i() {
          o.dispatchEvent(t + "Complete", null, [e]);
        }
        function n() {
          r++, r == s && i();
        }
        var o = this,
          s = e.length;
        if (!e || !s) return void i();
        var r = 0;
        e.forEach(function (e) {
          e.once(t, n);
        });
      }),
      (c.dispatchEvent = function (t, e, i) {
        var n = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, n), h))
          if (((this.$element = this.$element || h(this.element)), e)) {
            var o = h.Event(e);
            (o.type = t), this.$element.trigger(o, i);
          } else this.$element.trigger(t, i);
      }),
      (c.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
      }),
      (c.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
      }),
      (c.stamp = function (t) {
        (t = this._find(t)),
          t &&
            ((this.stamps = this.stamps.concat(t)),
            t.forEach(this.ignore, this));
      }),
      (c.unstamp = function (t) {
        (t = this._find(t)),
          t &&
            t.forEach(function (t) {
              n.removeFrom(this.stamps, t), this.unignore(t);
            }, this);
      }),
      (c._find = function (t) {
        if (t)
          return (
            "string" == typeof t && (t = this.element.querySelectorAll(t)),
            (t = n.makeArray(t))
          );
      }),
      (c._manageStamps = function () {
        this.stamps &&
          this.stamps.length &&
          (this._getBoundingRect(),
          this.stamps.forEach(this._manageStamp, this));
      }),
      (c._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(),
          e = this.size;
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
        };
      }),
      (c._manageStamp = d),
      (c._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(),
          n = this._boundingRect,
          o = i(t),
          s = {
            left: e.left - n.left - o.marginLeft,
            top: e.top - n.top - o.marginTop,
            right: n.right - e.right - o.marginRight,
            bottom: n.bottom - e.bottom - o.marginBottom,
          };
        return s;
      }),
      (c.handleEvent = n.handleEvent),
      (c.bindResize = function () {
        t.addEventListener("resize", this), (this.isResizeBound = !0);
      }),
      (c.unbindResize = function () {
        t.removeEventListener("resize", this), (this.isResizeBound = !1);
      }),
      (c.onresize = function () {
        this.resize();
      }),
      n.debounceMethod(s, "onresize", 100),
      (c.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (c.needsResizeLayout = function () {
        var t = i(this.element),
          e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth;
      }),
      (c.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
      }),
      (c.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
      }),
      (c.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          var i = this.items.slice(0);
          (this.items = e.concat(i)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i);
        }
      }),
      (c.reveal = function (t) {
        if ((this._emitCompleteOnItems("reveal", t), t && t.length)) {
          var e = this.updateStagger();
          t.forEach(function (t, i) {
            t.stagger(i * e), t.reveal();
          });
        }
      }),
      (c.hide = function (t) {
        if ((this._emitCompleteOnItems("hide", t), t && t.length)) {
          var e = this.updateStagger();
          t.forEach(function (t, i) {
            t.stagger(i * e), t.hide();
          });
        }
      }),
      (c.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e);
      }),
      (c.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e);
      }),
      (c.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
          var i = this.items[e];
          if (i.element == t) return i;
        }
      }),
      (c.getItems = function (t) {
        t = n.makeArray(t);
        var e = [];
        return (
          t.forEach(function (t) {
            var i = this.getItem(t);
            i && e.push(i);
          }, this),
          e
        );
      }),
      (c.remove = function (t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e),
          e &&
            e.length &&
            e.forEach(function (t) {
              t.remove(), n.removeFrom(this.items, t);
            }, this);
      }),
      (c.destroy = function () {
        var t = this.element.style;
        (t.height = ""),
          (t.position = ""),
          (t.width = ""),
          this.items.forEach(function (t) {
            t.destroy();
          }),
          this.unbindResize();
        var e = this.element.outlayerGUID;
        delete f[e],
          delete this.element.outlayerGUID,
          h && h.removeData(this.element, this.constructor.namespace);
      }),
      (s.data = function (t) {
        t = n.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && f[e];
      }),
      (s.create = function (t, e) {
        var i = r(s);
        return (
          (i.defaults = n.extend({}, s.defaults)),
          n.extend(i.defaults, e),
          (i.compatOptions = n.extend({}, s.compatOptions)),
          (i.namespace = t),
          (i.data = s.data),
          (i.Item = r(o)),
          n.htmlInit(i, t),
          h && h.bridget && h.bridget(t, i),
          i
        );
      });
    var m = { ms: 1, s: 1e3 };
    return (s.Item = o), s;
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope/js/item", ["outlayer/outlayer"], e)
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("outlayer")))
      : ((t.Isotope = t.Isotope || {}), (t.Isotope.Item = e(t.Outlayer)));
  })(window, function (t) {
    "use strict";
    function e() {
      t.Item.apply(this, arguments);
    }
    var i = (e.prototype = Object.create(t.Item.prototype)),
      n = i._create;
    (i._create = function () {
      (this.id = this.layout.itemGUID++), n.call(this), (this.sortData = {});
    }),
      (i.updateSortData = function () {
        if (!this.isIgnored) {
          (this.sortData.id = this.id),
            (this.sortData["original-order"] = this.id),
            (this.sortData.random = Math.random());
          var t = this.layout.options.getSortData,
            e = this.layout._sorters;
          for (var i in t) {
            var n = e[i];
            this.sortData[i] = n(this.element, this);
          }
        }
      });
    var o = i.destroy;
    return (
      (i.destroy = function () {
        o.apply(this, arguments), this.css({ display: "" });
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "isotope/js/layout-mode",
          ["get-size/get-size", "outlayer/outlayer"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("get-size"), require("outlayer")))
      : ((t.Isotope = t.Isotope || {}),
        (t.Isotope.LayoutMode = e(t.getSize, t.Outlayer)));
  })(window, function (t, e) {
    "use strict";
    function i(t) {
      (this.isotope = t),
        t &&
          ((this.options = t.options[this.namespace]),
          (this.element = t.element),
          (this.items = t.filteredItems),
          (this.size = t.size));
    }
    var n = i.prototype,
      o = [
        "_resetLayout",
        "_getItemLayoutPosition",
        "_manageStamp",
        "_getContainerSize",
        "_getElementOffset",
        "needsResizeLayout",
        "_getOption",
      ];
    return (
      o.forEach(function (t) {
        n[t] = function () {
          return e.prototype[t].apply(this.isotope, arguments);
        };
      }),
      (n.needsVerticalResizeLayout = function () {
        var e = t(this.isotope.element),
          i = this.isotope.size && e;
        return i && e.innerHeight != this.isotope.size.innerHeight;
      }),
      (n._getMeasurement = function () {
        this.isotope._getMeasurement.apply(this, arguments);
      }),
      (n.getColumnWidth = function () {
        this.getSegmentSize("column", "Width");
      }),
      (n.getRowHeight = function () {
        this.getSegmentSize("row", "Height");
      }),
      (n.getSegmentSize = function (t, e) {
        var i = t + e,
          n = "outer" + e;
        if ((this._getMeasurement(i, n), !this[i])) {
          var o = this.getFirstItemSize();
          this[i] = (o && o[n]) || this.isotope.size["inner" + e];
        }
      }),
      (n.getFirstItemSize = function () {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element);
      }),
      (n.layout = function () {
        this.isotope.layout.apply(this.isotope, arguments);
      }),
      (n.getSize = function () {
        this.isotope.getSize(), (this.size = this.isotope.size);
      }),
      (i.modes = {}),
      (i.create = function (t, e) {
        function o() {
          i.apply(this, arguments);
        }
        return (
          (o.prototype = Object.create(n)),
          (o.prototype.constructor = o),
          e && (o.options = e),
          (o.prototype.namespace = t),
          (i.modes[t] = o),
          o
        );
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e)
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("outlayer"), require("get-size")))
      : (t.Masonry = e(t.Outlayer, t.getSize));
  })(window, function (t, e) {
    var i = t.create("masonry");
    return (
      (i.compatOptions.fitWidth = "isFitWidth"),
      (i.prototype._resetLayout = function () {
        this.getSize(),
          this._getMeasurement("columnWidth", "outerWidth"),
          this._getMeasurement("gutter", "outerWidth"),
          this.measureColumns(),
          (this.colYs = []);
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0;
      }),
      (i.prototype.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var t = this.items[0],
            i = t && t.element;
          this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
        }
        var n = (this.columnWidth += this.gutter),
          o = this.containerWidth + this.gutter,
          s = o / n,
          r = n - (o % n),
          a = r && r < 1 ? "round" : "floor";
        (s = Math[a](s)), (this.cols = Math.max(s, 1));
      }),
      (i.prototype.getContainerWidth = function () {
        var t = this._getOption("fitWidth"),
          i = t ? this.element.parentNode : this.element,
          n = e(i);
        this.containerWidth = n && n.innerWidth;
      }),
      (i.prototype._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
          i = e && e < 1 ? "round" : "ceil",
          n = Math[i](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        for (
          var o = this._getColGroup(n),
            s = Math.min.apply(Math, o),
            r = o.indexOf(s),
            a = { x: this.columnWidth * r, y: s },
            u = s + t.size.outerHeight,
            h = this.cols + 1 - o.length,
            d = 0;
          d < h;
          d++
        )
          this.colYs[r + d] = u;
        return a;
      }),
      (i.prototype._getColGroup = function (t) {
        if (t < 2) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; n < i; n++) {
          var o = this.colYs.slice(n, n + t);
          e[n] = Math.max.apply(Math, o);
        }
        return e;
      }),
      (i.prototype._manageStamp = function (t) {
        var i = e(t),
          n = this._getElementOffset(t),
          o = this._getOption("originLeft"),
          s = o ? n.left : n.right,
          r = s + i.outerWidth,
          a = Math.floor(s / this.columnWidth);
        a = Math.max(0, a);
        var u = Math.floor(r / this.columnWidth);
        (u -= r % this.columnWidth ? 0 : 1), (u = Math.min(this.cols - 1, u));
        for (
          var h = this._getOption("originTop"),
            d = (h ? n.top : n.bottom) + i.outerHeight,
            l = a;
          l <= u;
          l++
        )
          this.colYs[l] = Math.max(d, this.colYs[l]);
      }),
      (i.prototype._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = { height: this.maxY };
        return (
          this._getOption("fitWidth") &&
            (t.width = this._getContainerFitWidth()),
          t
        );
      }),
      (i.prototype._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
        return (this.cols - t) * this.columnWidth - this.gutter;
      }),
      (i.prototype.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth;
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "isotope/js/layout-modes/masonry",
          ["../layout-mode", "masonry/masonry"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          require("../layout-mode"),
          require("masonry-layout")
        ))
      : e(t.Isotope.LayoutMode, t.Masonry);
  })(window, function (t, e) {
    "use strict";
    var i = t.create("masonry"),
      n = i.prototype,
      o = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 };
    for (var s in e.prototype) o[s] || (n[s] = e.prototype[s]);
    var r = n.measureColumns;
    n.measureColumns = function () {
      (this.items = this.isotope.filteredItems), r.call(this);
    };
    var a = n._getOption;
    return (
      (n._getOption = function (t) {
        return "fitWidth" == t
          ? void 0 !== this.options.isFitWidth
            ? this.options.isFitWidth
            : this.options.fitWidth
          : a.apply(this.isotope, arguments);
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e)
      : "object" == typeof exports
      ? (module.exports = e(require("../layout-mode")))
      : e(t.Isotope.LayoutMode);
  })(window, function (t) {
    "use strict";
    var e = t.create("fitRows"),
      i = e.prototype;
    return (
      (i._resetLayout = function () {
        (this.x = 0),
          (this.y = 0),
          (this.maxY = 0),
          this._getMeasurement("gutter", "outerWidth");
      }),
      (i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
          i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && ((this.x = 0), (this.y = this.maxY));
        var n = { x: this.x, y: this.y };
        return (
          (this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight)),
          (this.x += e),
          n
        );
      }),
      (i._getContainerSize = function () {
        return { height: this.maxY };
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e)
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("../layout-mode")))
      : e(t.Isotope.LayoutMode);
  })(window, function (t) {
    "use strict";
    var e = t.create("vertical", { horizontalAlignment: 0 }),
      i = e.prototype;
    return (
      (i._resetLayout = function () {
        this.y = 0;
      }),
      (i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e =
            (this.isotope.size.innerWidth - t.size.outerWidth) *
            this.options.horizontalAlignment,
          i = this.y;
        return (this.y += t.size.outerHeight), { x: e, y: i };
      }),
      (i._getContainerSize = function () {
        return { height: this.y };
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          [
            "outlayer/outlayer",
            "get-size/get-size",
            "desandro-matches-selector/matches-selector",
            "fizzy-ui-utils/utils",
            "isotope/js/item",
            "isotope/js/layout-mode",
            "isotope/js/layout-modes/masonry",
            "isotope/js/layout-modes/fit-rows",
            "isotope/js/layout-modes/vertical",
          ],
          function (i, n, o, s, r, a) {
            return e(t, i, n, o, s, r, a);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("outlayer"),
          require("get-size"),
          require("desandro-matches-selector"),
          require("fizzy-ui-utils"),
          require("isotope/js/item"),
          require("isotope/js/layout-mode"),
          require("isotope/js/layout-modes/masonry"),
          require("isotope/js/layout-modes/fit-rows"),
          require("isotope/js/layout-modes/vertical")
        ))
      : (t.Isotope = e(
          t,
          t.Outlayer,
          t.getSize,
          t.matchesSelector,
          t.fizzyUIUtils,
          t.Isotope.Item,
          t.Isotope.LayoutMode
        ));
  })(window, function (t, e, i, n, o, s, r) {
    function a(t, e) {
      return function (i, n) {
        for (var o = 0; o < t.length; o++) {
          var s = t[o],
            r = i.sortData[s],
            a = n.sortData[s];
          if (r > a || r < a) {
            var u = void 0 !== e[s] ? e[s] : e,
              h = u ? 1 : -1;
            return (r > a ? 1 : -1) * h;
          }
        }
        return 0;
      };
    }
    var u = t.jQuery,
      h = String.prototype.trim
        ? function (t) {
            return t.trim();
          }
        : function (t) {
            return t.replace(/^\s+|\s+$/g, "");
          },
      d = e.create("isotope", {
        layoutMode: "masonry",
        isJQueryFiltering: !0,
        sortAscending: !0,
      });
    (d.Item = s), (d.LayoutMode = r);
    var l = d.prototype;
    (l._create = function () {
      (this.itemGUID = 0),
        (this._sorters = {}),
        this._getSorters(),
        e.prototype._create.call(this),
        (this.modes = {}),
        (this.filteredItems = this.items),
        (this.sortHistory = ["original-order"]);
      for (var t in r.modes) this._initLayoutMode(t);
    }),
      (l.reloadItems = function () {
        (this.itemGUID = 0), e.prototype.reloadItems.call(this);
      }),
      (l._itemize = function () {
        for (
          var t = e.prototype._itemize.apply(this, arguments), i = 0;
          i < t.length;
          i++
        ) {
          var n = t[i];
          n.id = this.itemGUID++;
        }
        return this._updateItemsSortData(t), t;
      }),
      (l._initLayoutMode = function (t) {
        var e = r.modes[t],
          i = this.options[t] || {};
        (this.options[t] = e.options ? o.extend(e.options, i) : i),
          (this.modes[t] = new e(this));
      }),
      (l.layout = function () {
        return !this._isLayoutInited && this._getOption("initLayout")
          ? void this.arrange()
          : void this._layout();
      }),
      (l._layout = function () {
        var t = this._getIsInstant();
        this._resetLayout(),
          this._manageStamps(),
          this.layoutItems(this.filteredItems, t),
          (this._isLayoutInited = !0);
      }),
      (l.arrange = function (t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        (this.filteredItems = e.matches),
          this._bindArrangeComplete(),
          this._isInstant
            ? this._noTransition(this._hideReveal, [e])
            : this._hideReveal(e),
          this._sort(),
          this._layout();
      }),
      (l._init = l.arrange),
      (l._hideReveal = function (t) {
        this.reveal(t.needReveal), this.hide(t.needHide);
      }),
      (l._getIsInstant = function () {
        var t = this._getOption("layoutInstant"),
          e = void 0 !== t ? t : !this._isLayoutInited;
        return (this._isInstant = e), e;
      }),
      (l._bindArrangeComplete = function () {
        function t() {
          e &&
            i &&
            n &&
            o.dispatchEvent("arrangeComplete", null, [o.filteredItems]);
        }
        var e,
          i,
          n,
          o = this;
        this.once("layoutComplete", function () {
          (e = !0), t();
        }),
          this.once("hideComplete", function () {
            (i = !0), t();
          }),
          this.once("revealComplete", function () {
            (n = !0), t();
          });
      }),
      (l._filter = function (t) {
        var e = this.options.filter;
        e = e || "*";
        for (
          var i = [], n = [], o = [], s = this._getFilterTest(e), r = 0;
          r < t.length;
          r++
        ) {
          var a = t[r];
          if (!a.isIgnored) {
            var u = s(a);
            u && i.push(a),
              u && a.isHidden ? n.push(a) : u || a.isHidden || o.push(a);
          }
        }
        return { matches: i, needReveal: n, needHide: o };
      }),
      (l._getFilterTest = function (t) {
        return u && this.options.isJQueryFiltering
          ? function (e) {
              return u(e.element).is(t);
            }
          : "function" == typeof t
          ? function (e) {
              return t(e.element);
            }
          : function (e) {
              return n(e.element, t);
            };
      }),
      (l.updateSortData = function (t) {
        var e;
        t ? ((t = o.makeArray(t)), (e = this.getItems(t))) : (e = this.items),
          this._getSorters(),
          this._updateItemsSortData(e);
      }),
      (l._getSorters = function () {
        var t = this.options.getSortData;
        for (var e in t) {
          var i = t[e];
          this._sorters[e] = f(i);
        }
      }),
      (l._updateItemsSortData = function (t) {
        for (var e = t && t.length, i = 0; e && i < e; i++) {
          var n = t[i];
          n.updateSortData();
        }
      });
    var f = (function () {
      function t(t) {
        if ("string" != typeof t) return t;
        var i = h(t).split(" "),
          n = i[0],
          o = n.match(/^\[(.+)\]$/),
          s = o && o[1],
          r = e(s, n),
          a = d.sortDataParsers[i[1]];
        return (t = a
          ? function (t) {
              return t && a(r(t));
            }
          : function (t) {
              return t && r(t);
            });
      }
      function e(t, e) {
        return t
          ? function (e) {
              return e.getAttribute(t);
            }
          : function (t) {
              var i = t.querySelector(e);
              return i && i.textContent;
            };
      }
      return t;
    })();
    (d.sortDataParsers = {
      parseInt: function (t) {
        return parseInt(t, 10);
      },
      parseFloat: function (t) {
        return parseFloat(t);
      },
    }),
      (l._sort = function () {
        var t = this.options.sortBy;
        if (t) {
          var e = [].concat.apply(t, this.sortHistory),
            i = a(e, this.options.sortAscending);
          this.filteredItems.sort(i),
            t != this.sortHistory[0] && this.sortHistory.unshift(t);
        }
      }),
      (l._mode = function () {
        var t = this.options.layoutMode,
          e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return (e.options = this.options[t]), e;
      }),
      (l._resetLayout = function () {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout();
      }),
      (l._getItemLayoutPosition = function (t) {
        return this._mode()._getItemLayoutPosition(t);
      }),
      (l._manageStamp = function (t) {
        this._mode()._manageStamp(t);
      }),
      (l._getContainerSize = function () {
        return this._mode()._getContainerSize();
      }),
      (l.needsResizeLayout = function () {
        return this._mode().needsResizeLayout();
      }),
      (l.appended = function (t) {
        var e = this.addItems(t);
        if (e.length) {
          var i = this._filterRevealAdded(e);
          this.filteredItems = this.filteredItems.concat(i);
        }
      }),
      (l.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          this._resetLayout(), this._manageStamps();
          var i = this._filterRevealAdded(e);
          this.layoutItems(this.filteredItems),
            (this.filteredItems = i.concat(this.filteredItems)),
            (this.items = e.concat(this.items));
        }
      }),
      (l._filterRevealAdded = function (t) {
        var e = this._filter(t);
        return (
          this.hide(e.needHide),
          this.reveal(e.matches),
          this.layoutItems(e.matches, !0),
          e.matches
        );
      }),
      (l.insert = function (t) {
        var e = this.addItems(t);
        if (e.length) {
          var i,
            n,
            o = e.length;
          for (i = 0; i < o; i++)
            (n = e[i]), this.element.appendChild(n.element);
          var s = this._filter(e).matches;
          for (i = 0; i < o; i++) e[i].isLayoutInstant = !0;
          for (this.arrange(), i = 0; i < o; i++) delete e[i].isLayoutInstant;
          this.reveal(s);
        }
      });
    var c = l.remove;
    return (
      (l.remove = function (t) {
        t = o.makeArray(t);
        var e = this.getItems(t);
        c.call(this, t);
        for (var i = e && e.length, n = 0; i && n < i; n++) {
          var s = e[n];
          o.removeFrom(this.filteredItems, s);
        }
      }),
      (l.shuffle = function () {
        for (var t = 0; t < this.items.length; t++) {
          var e = this.items[t];
          e.sortData.random = Math.random();
        }
        (this.options.sortBy = "random"), this._sort(), this._layout();
      }),
      (l._noTransition = function (t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var n = t.apply(this, e);
        return (this.options.transitionDuration = i), n;
      }),
      (l.getFilteredItemElements = function () {
        return this.filteredItems.map(function (t) {
          return t.element;
        });
      }),
      d
    );
  });

/*
jquery.nicescroll v3.7.6
InuYaksa - MIT
https://nicescroll.areaaperta.com
*/

!(function (e) {
  "function" == typeof define && define.amd
    ? define(["jquery"], e)
    : "object" == typeof exports
    ? (module.exports = e(require("jquery")))
    : e(jQuery);
})(function (e) {
  "use strict";
  var o = !1,
    t = !1,
    r = 0,
    i = 2e3,
    s = 0,
    n = e,
    l = document,
    a = window,
    c = n(a),
    d = [],
    u =
      a.requestAnimationFrame ||
      a.webkitRequestAnimationFrame ||
      a.mozRequestAnimationFrame ||
      !1,
    h =
      a.cancelAnimationFrame ||
      a.webkitCancelAnimationFrame ||
      a.mozCancelAnimationFrame ||
      !1;
  if (u) a.cancelAnimationFrame || (h = function (e) {});
  else {
    var p = 0;
    (u = function (e, o) {
      var t = new Date().getTime(),
        r = Math.max(0, 16 - (t - p)),
        i = a.setTimeout(function () {
          e(t + r);
        }, r);
      return (p = t + r), i;
    }),
      (h = function (e) {
        a.clearTimeout(e);
      });
  }
  var m = a.MutationObserver || a.WebKitMutationObserver || !1,
    f =
      Date.now ||
      function () {
        return new Date().getTime();
      },
    g = {
      zindex: "auto",
      cursoropacitymin: 0,
      cursoropacitymax: 1,
      cursorcolor: "#424242",
      cursorwidth: "6px",
      cursorborder: "1px solid #fff",
      cursorborderradius: "5px",
      scrollspeed: 40,
      mousescrollstep: 27,
      touchbehavior: !1,
      emulatetouch: !1,
      hwacceleration: !0,
      usetransition: !0,
      boxzoom: !1,
      dblclickzoom: !0,
      gesturezoom: !0,
      grabcursorenabled: !0,
      autohidemode: !0,
      background: "",
      iframeautoresize: !0,
      cursorminheight: 32,
      preservenativescrolling: !0,
      railoffset: !1,
      railhoffset: !1,
      bouncescroll: !0,
      spacebarenabled: !0,
      railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
      disableoutline: !0,
      horizrailenabled: !0,
      railalign: "right",
      railvalign: "bottom",
      enabletranslate3d: !0,
      enablemousewheel: !0,
      enablekeyboard: !0,
      smoothscroll: !0,
      sensitiverail: !0,
      enablemouselockapi: !0,
      cursorfixedheight: !1,
      directionlockdeadzone: 6,
      hidecursordelay: 400,
      nativeparentscrolling: !0,
      enablescrollonselection: !0,
      overflowx: !0,
      overflowy: !0,
      cursordragspeed: 0.3,
      rtlmode: "auto",
      cursordragontouch: !1,
      oneaxismousemode: "auto",
      scriptpath: (function () {
        var e =
            l.currentScript ||
            (function () {
              var e = l.getElementsByTagName("script");
              return !!e.length && e[e.length - 1];
            })(),
          o = e ? e.src.split("?")[0] : "";
        return o.split("/").length > 0
          ? o.split("/").slice(0, -1).join("/") + "/"
          : "";
      })(),
      preventmultitouchscrolling: !0,
      disablemutationobserver: !1,
      enableobserver: !0,
      scrollbarid: !1,
    },
    v = !1,
    w = function () {
      if (v) return v;
      var e = l.createElement("DIV"),
        o = e.style,
        t = navigator.userAgent,
        r = navigator.platform,
        i = {};
      return (
        (i.haspointerlock =
          "pointerLockElement" in l ||
          "webkitPointerLockElement" in l ||
          "mozPointerLockElement" in l),
        (i.isopera = "opera" in a),
        (i.isopera12 = i.isopera && "getUserMedia" in navigator),
        (i.isoperamini =
          "[object OperaMini]" === Object.prototype.toString.call(a.operamini)),
        (i.isie = "all" in l && "attachEvent" in e && !i.isopera),
        (i.isieold = i.isie && !("msInterpolationMode" in o)),
        (i.isie7 =
          i.isie &&
          !i.isieold &&
          (!("documentMode" in l) || 7 === l.documentMode)),
        (i.isie8 = i.isie && "documentMode" in l && 8 === l.documentMode),
        (i.isie9 = i.isie && "performance" in a && 9 === l.documentMode),
        (i.isie10 = i.isie && "performance" in a && 10 === l.documentMode),
        (i.isie11 = "msRequestFullscreen" in e && l.documentMode >= 11),
        (i.ismsedge = "msCredentials" in a),
        (i.ismozilla = "MozAppearance" in o),
        (i.iswebkit = !i.ismsedge && "WebkitAppearance" in o),
        (i.ischrome = i.iswebkit && "chrome" in a),
        (i.ischrome38 = i.ischrome && "touchAction" in o),
        (i.ischrome22 = !i.ischrome38 && i.ischrome && i.haspointerlock),
        (i.ischrome26 = !i.ischrome38 && i.ischrome && "transition" in o),
        (i.cantouch =
          "ontouchstart" in l.documentElement || "ontouchstart" in a),
        (i.hasw3ctouch =
          (a.PointerEvent || !1) &&
          (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)),
        (i.hasmstouch = !i.hasw3ctouch && (a.MSPointerEvent || !1)),
        (i.ismac = /^mac$/i.test(r)),
        (i.isios = i.cantouch && /iphone|ipad|ipod/i.test(r)),
        (i.isios4 = i.isios && !("seal" in Object)),
        (i.isios7 = i.isios && "webkitHidden" in l),
        (i.isios8 = i.isios && "hidden" in l),
        (i.isios10 = i.isios && a.Proxy),
        (i.isandroid = /android/i.test(t)),
        (i.haseventlistener = "addEventListener" in e),
        (i.trstyle = !1),
        (i.hastransform = !1),
        (i.hastranslate3d = !1),
        (i.transitionstyle = !1),
        (i.hastransition = !1),
        (i.transitionend = !1),
        (i.trstyle = "transform"),
        (i.hastransform =
          "transform" in o ||
          (function () {
            for (
              var e = [
                  "msTransform",
                  "webkitTransform",
                  "MozTransform",
                  "OTransform",
                ],
                t = 0,
                r = e.length;
              t < r;
              t++
            )
              if (void 0 !== o[e[t]]) {
                i.trstyle = e[t];
                break;
              }
            i.hastransform = !!i.trstyle;
          })()),
        i.hastransform &&
          ((o[i.trstyle] = "translate3d(1px,2px,3px)"),
          (i.hastranslate3d = /translate3d/.test(o[i.trstyle]))),
        (i.transitionstyle = "transition"),
        (i.prefixstyle = ""),
        (i.transitionend = "transitionend"),
        (i.hastransition =
          "transition" in o ||
          (function () {
            i.transitionend = !1;
            for (
              var e = [
                  "webkitTransition",
                  "msTransition",
                  "MozTransition",
                  "OTransition",
                  "OTransition",
                  "KhtmlTransition",
                ],
                t = ["-webkit-", "-ms-", "-moz-", "-o-", "-o", "-khtml-"],
                r = [
                  "webkitTransitionEnd",
                  "msTransitionEnd",
                  "transitionend",
                  "otransitionend",
                  "oTransitionEnd",
                  "KhtmlTransitionEnd",
                ],
                s = 0,
                n = e.length;
              s < n;
              s++
            )
              if (e[s] in o) {
                (i.transitionstyle = e[s]),
                  (i.prefixstyle = t[s]),
                  (i.transitionend = r[s]);
                break;
              }
            i.ischrome26 && (i.prefixstyle = t[1]),
              (i.hastransition = i.transitionstyle);
          })()),
        (i.cursorgrabvalue = (function () {
          var e = ["grab", "-webkit-grab", "-moz-grab"];
          ((i.ischrome && !i.ischrome38) || i.isie) && (e = []);
          for (var t = 0, r = e.length; t < r; t++) {
            var s = e[t];
            if (((o.cursor = s), o.cursor == s)) return s;
          }
          return "url(https://cdnjs.cloudflare.com/ajax/libs/slider-pro/1.3.0/css/images/openhand.cur),n-resize";
        })()),
        (i.hasmousecapture = "setCapture" in e),
        (i.hasMutationObserver = !1 !== m),
        (e = null),
        (v = i),
        i
      );
    },
    b = function (e, p) {
      function v() {
        var e = T.doc.css(P.trstyle);
        return (
          !(!e || "matrix" != e.substr(0, 6)) &&
          e
            .replace(/^.*\((.*)\)$/g, "$1")
            .replace(/px/g, "")
            .split(/, +/)
        );
      }
      function b() {
        var e = T.win;
        if ("zIndex" in e) return e.zIndex();
        for (; e.length > 0; ) {
          if (9 == e[0].nodeType) return !1;
          var o = e.css("zIndex");
          if (!isNaN(o) && 0 !== o) return parseInt(o);
          e = e.parent();
        }
        return !1;
      }
      function x(e, o, t) {
        var r = e.css(o),
          i = parseFloat(r);
        if (isNaN(i)) {
          var s =
            3 == (i = I[r] || 0)
              ? t
                ? T.win.outerHeight() - T.win.innerHeight()
                : T.win.outerWidth() - T.win.innerWidth()
              : 1;
          return T.isie8 && i && (i += 1), s ? i : 0;
        }
        return i;
      }
      function S(e, o, t, r) {
        T._bind(
          e,
          o,
          function (r) {
            var i = {
              original: (r = r || a.event),
              target: r.target || r.srcElement,
              type: "wheel",
              deltaMode: "MozMousePixelScroll" == r.type ? 0 : 1,
              deltaX: 0,
              deltaZ: 0,
              preventDefault: function () {
                return (
                  r.preventDefault ? r.preventDefault() : (r.returnValue = !1),
                  !1
                );
              },
              stopImmediatePropagation: function () {
                r.stopImmediatePropagation
                  ? r.stopImmediatePropagation()
                  : (r.cancelBubble = !0);
              },
            };
            return (
              "mousewheel" == o
                ? (r.wheelDeltaX && (i.deltaX = -0.025 * r.wheelDeltaX),
                  r.wheelDeltaY && (i.deltaY = -0.025 * r.wheelDeltaY),
                  !i.deltaY && !i.deltaX && (i.deltaY = -0.025 * r.wheelDelta))
                : (i.deltaY = r.detail),
              t.call(e, i)
            );
          },
          r
        );
      }
      function z(e, o, t, r) {
        T.scrollrunning ||
          ((T.newscrolly = T.getScrollTop()),
          (T.newscrollx = T.getScrollLeft()),
          (D = f()));
        var i = f() - D;
        if (
          ((D = f()),
          i > 350 ? (A = 1) : (A += (2 - A) / 10),
          (e = (e * A) | 0),
          (o = (o * A) | 0),
          e)
        ) {
          if (r)
            if (e < 0) {
              if (T.getScrollLeft() >= T.page.maxw) return !0;
            } else if (T.getScrollLeft() <= 0) return !0;
          var s = e > 0 ? 1 : -1;
          X !== s &&
            (T.scrollmom && T.scrollmom.stop(),
            (T.newscrollx = T.getScrollLeft()),
            (X = s)),
            (T.lastdeltax -= e);
        }
        if (o) {
          if (
            (function () {
              var e = T.getScrollTop();
              if (o < 0) {
                if (e >= T.page.maxh) return !0;
              } else if (e <= 0) return !0;
            })()
          ) {
            if (M.nativeparentscrolling && t && !T.ispage && !T.zoomactive)
              return !0;
            var n = T.view.h >> 1;
            T.newscrolly < -n
              ? ((T.newscrolly = -n), (o = -1))
              : T.newscrolly > T.page.maxh + n
              ? ((T.newscrolly = T.page.maxh + n), (o = 1))
              : (o = 0);
          }
          var l = o > 0 ? 1 : -1;
          B !== l &&
            (T.scrollmom && T.scrollmom.stop(),
            (T.newscrolly = T.getScrollTop()),
            (B = l)),
            (T.lastdeltay -= o);
        }
        (o || e) &&
          T.synched("relativexy", function () {
            var e = T.lastdeltay + T.newscrolly;
            T.lastdeltay = 0;
            var o = T.lastdeltax + T.newscrollx;
            (T.lastdeltax = 0), T.rail.drag || T.doScrollPos(o, e);
          });
      }
      function k(e, o, t) {
        var r, i;
        return (
          !(t || !q) ||
          (0 === e.deltaMode
            ? ((r = (-e.deltaX * (M.mousescrollstep / 54)) | 0),
              (i = (-e.deltaY * (M.mousescrollstep / 54)) | 0))
            : 1 === e.deltaMode &&
              ((r = ((-e.deltaX * M.mousescrollstep * 50) / 80) | 0),
              (i = ((-e.deltaY * M.mousescrollstep * 50) / 80) | 0)),
          o &&
            M.oneaxismousemode &&
            0 === r &&
            i &&
            ((r = i),
            (i = 0),
            t &&
              (r < 0
                ? T.getScrollLeft() >= T.page.maxw
                : T.getScrollLeft() <= 0) &&
              ((i = r), (r = 0))),
          T.isrtlmode && (r = -r),
          z(r, i, t, !0)
            ? void (t && (q = !0))
            : ((q = !1), e.stopImmediatePropagation(), e.preventDefault()))
        );
      }
      var T = this;
      (this.version = "3.7.6"), (this.name = "nicescroll"), (this.me = p);
      var E = n("body"),
        M = (this.opt = { doc: E, win: !1 });
      if ((n.extend(M, g), (M.snapbackspeed = 80), e))
        for (var L in M) void 0 !== e[L] && (M[L] = e[L]);
      if (
        (M.disablemutationobserver && (m = !1),
        (this.doc = M.doc),
        (this.iddoc = this.doc && this.doc[0] ? this.doc[0].id || "" : ""),
        (this.ispage = /^BODY|HTML/.test(
          M.win ? M.win[0].nodeName : this.doc[0].nodeName
        )),
        (this.haswrapper = !1 !== M.win),
        (this.win = M.win || (this.ispage ? c : this.doc)),
        (this.docscroll = this.ispage && !this.haswrapper ? c : this.win),
        (this.body = E),
        (this.viewport = !1),
        (this.isfixed = !1),
        (this.iframe = !1),
        (this.isiframe =
          "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName),
        (this.istextarea = "TEXTAREA" == this.win[0].nodeName),
        (this.forcescreen = !1),
        (this.canshowonmouseevent = "scroll" != M.autohidemode),
        (this.onmousedown = !1),
        (this.onmouseup = !1),
        (this.onmousemove = !1),
        (this.onmousewheel = !1),
        (this.onkeypress = !1),
        (this.ongesturezoom = !1),
        (this.onclick = !1),
        (this.onscrollstart = !1),
        (this.onscrollend = !1),
        (this.onscrollcancel = !1),
        (this.onzoomin = !1),
        (this.onzoomout = !1),
        (this.view = !1),
        (this.page = !1),
        (this.scroll = { x: 0, y: 0 }),
        (this.scrollratio = { x: 0, y: 0 }),
        (this.cursorheight = 20),
        (this.scrollvaluemax = 0),
        "auto" == M.rtlmode)
      ) {
        var C = this.win[0] == a ? this.body : this.win,
          N =
            C.css("writing-mode") ||
            C.css("-webkit-writing-mode") ||
            C.css("-ms-writing-mode") ||
            C.css("-moz-writing-mode");
        "horizontal-tb" == N || "lr-tb" == N || "" === N
          ? ((this.isrtlmode = "rtl" == C.css("direction")),
            (this.isvertical = !1))
          : ((this.isrtlmode =
              "vertical-rl" == N || "tb" == N || "tb-rl" == N || "rl-tb" == N),
            (this.isvertical =
              "vertical-rl" == N || "tb" == N || "tb-rl" == N));
      } else (this.isrtlmode = !0 === M.rtlmode), (this.isvertical = !1);
      if (
        ((this.scrollrunning = !1),
        (this.scrollmom = !1),
        (this.observer = !1),
        (this.observerremover = !1),
        (this.observerbody = !1),
        !1 !== M.scrollbarid)
      )
        this.id = M.scrollbarid;
      else
        do {
          this.id = "ascrail" + i++;
        } while (l.getElementById(this.id));
      (this.rail = !1),
        (this.cursor = !1),
        (this.cursorfreezed = !1),
        (this.selectiondrag = !1),
        (this.zoom = !1),
        (this.zoomactive = !1),
        (this.hasfocus = !1),
        (this.hasmousefocus = !1),
        (this.railslocked = !1),
        (this.locked = !1),
        (this.hidden = !1),
        (this.cursoractive = !0),
        (this.wheelprevented = !1),
        (this.overflowx = M.overflowx),
        (this.overflowy = M.overflowy),
        (this.nativescrollingarea = !1),
        (this.checkarea = 0),
        (this.events = []),
        (this.saved = {}),
        (this.delaylist = {}),
        (this.synclist = {}),
        (this.lastdeltax = 0),
        (this.lastdeltay = 0),
        (this.detected = w());
      var P = n.extend({}, this.detected);
      (this.canhwscroll = P.hastransform && M.hwacceleration),
        (this.ishwscroll = this.canhwscroll && T.haswrapper),
        this.isrtlmode
          ? this.isvertical
            ? (this.hasreversehr = !(P.iswebkit || P.isie || P.isie11))
            : (this.hasreversehr = !(
                P.iswebkit ||
                (P.isie && !P.isie10 && !P.isie11)
              ))
          : (this.hasreversehr = !1),
        (this.istouchcapable = !1),
        P.cantouch || (!P.hasw3ctouch && !P.hasmstouch)
          ? !P.cantouch ||
            P.isios ||
            P.isandroid ||
            (!P.iswebkit && !P.ismozilla) ||
            (this.istouchcapable = !0)
          : (this.istouchcapable = !0),
        M.enablemouselockapi ||
          ((P.hasmousecapture = !1), (P.haspointerlock = !1)),
        (this.debounced = function (e, o, t) {
          T &&
            (T.delaylist[e] ||
              !1 ||
              ((T.delaylist[e] = {
                h: u(function () {
                  T.delaylist[e].fn.call(T), (T.delaylist[e] = !1);
                }, t),
              }),
              o.call(T)),
            (T.delaylist[e].fn = o));
        }),
        (this.synched = function (e, o) {
          T.synclist[e]
            ? (T.synclist[e] = o)
            : ((T.synclist[e] = o),
              u(function () {
                T &&
                  (T.synclist[e] && T.synclist[e].call(T),
                  (T.synclist[e] = null));
              }));
        }),
        (this.unsynched = function (e) {
          T.synclist[e] && (T.synclist[e] = !1);
        }),
        (this.css = function (e, o) {
          for (var t in o) T.saved.css.push([e, t, e.css(t)]), e.css(t, o[t]);
        }),
        (this.scrollTop = function (e) {
          return void 0 === e ? T.getScrollTop() : T.setScrollTop(e);
        }),
        (this.scrollLeft = function (e) {
          return void 0 === e ? T.getScrollLeft() : T.setScrollLeft(e);
        });
      var R = function (e, o, t, r, i, s, n) {
        (this.st = e),
          (this.ed = o),
          (this.spd = t),
          (this.p1 = r || 0),
          (this.p2 = i || 1),
          (this.p3 = s || 0),
          (this.p4 = n || 1),
          (this.ts = f()),
          (this.df = o - e);
      };
      if (
        ((R.prototype = {
          B2: function (e) {
            return 3 * (1 - e) * (1 - e) * e;
          },
          B3: function (e) {
            return 3 * (1 - e) * e * e;
          },
          B4: function (e) {
            return e * e * e;
          },
          getPos: function () {
            return (f() - this.ts) / this.spd;
          },
          getNow: function () {
            var e = (f() - this.ts) / this.spd,
              o = this.B2(e) + this.B3(e) + this.B4(e);
            return e >= 1 ? this.ed : (this.st + this.df * o) | 0;
          },
          update: function (e, o) {
            return (
              (this.st = this.getNow()),
              (this.ed = e),
              (this.spd = o),
              (this.ts = f()),
              (this.df = this.ed - this.st),
              this
            );
          },
        }),
        this.ishwscroll)
      ) {
        (this.doc.translate = { x: 0, y: 0, tx: "0px", ty: "0px" }),
          P.hastranslate3d &&
            P.isios &&
            this.doc.css("-webkit-backface-visibility", "hidden"),
          (this.getScrollTop = function (e) {
            if (!e) {
              var o = v();
              if (o) return 16 == o.length ? -o[13] : -o[5];
              if (T.timerscroll && T.timerscroll.bz)
                return T.timerscroll.bz.getNow();
            }
            return T.doc.translate.y;
          }),
          (this.getScrollLeft = function (e) {
            if (!e) {
              var o = v();
              if (o) return 16 == o.length ? -o[12] : -o[4];
              if (T.timerscroll && T.timerscroll.bh)
                return T.timerscroll.bh.getNow();
            }
            return T.doc.translate.x;
          }),
          (this.notifyScrollEvent = function (e) {
            var o = l.createEvent("UIEvents");
            o.initUIEvent("scroll", !1, !1, a, 1),
              (o.niceevent = !0),
              e.dispatchEvent(o);
          });
        var _ = this.isrtlmode ? 1 : -1;
        P.hastranslate3d && M.enabletranslate3d
          ? ((this.setScrollTop = function (e, o) {
              (T.doc.translate.y = e),
                (T.doc.translate.ty = -1 * e + "px"),
                T.doc.css(
                  P.trstyle,
                  "translate3d(" +
                    T.doc.translate.tx +
                    "," +
                    T.doc.translate.ty +
                    ",0)"
                ),
                o || T.notifyScrollEvent(T.win[0]);
            }),
            (this.setScrollLeft = function (e, o) {
              (T.doc.translate.x = e),
                (T.doc.translate.tx = e * _ + "px"),
                T.doc.css(
                  P.trstyle,
                  "translate3d(" +
                    T.doc.translate.tx +
                    "," +
                    T.doc.translate.ty +
                    ",0)"
                ),
                o || T.notifyScrollEvent(T.win[0]);
            }))
          : ((this.setScrollTop = function (e, o) {
              (T.doc.translate.y = e),
                (T.doc.translate.ty = -1 * e + "px"),
                T.doc.css(
                  P.trstyle,
                  "translate(" +
                    T.doc.translate.tx +
                    "," +
                    T.doc.translate.ty +
                    ")"
                ),
                o || T.notifyScrollEvent(T.win[0]);
            }),
            (this.setScrollLeft = function (e, o) {
              (T.doc.translate.x = e),
                (T.doc.translate.tx = e * _ + "px"),
                T.doc.css(
                  P.trstyle,
                  "translate(" +
                    T.doc.translate.tx +
                    "," +
                    T.doc.translate.ty +
                    ")"
                ),
                o || T.notifyScrollEvent(T.win[0]);
            }));
      } else
        (this.getScrollTop = function () {
          return T.docscroll.scrollTop();
        }),
          (this.setScrollTop = function (e) {
            T.docscroll.scrollTop(e);
          }),
          (this.getScrollLeft = function () {
            return T.hasreversehr
              ? T.detected.ismozilla
                ? T.page.maxw - Math.abs(T.docscroll.scrollLeft())
                : T.page.maxw - T.docscroll.scrollLeft()
              : T.docscroll.scrollLeft();
          }),
          (this.setScrollLeft = function (e) {
            return setTimeout(function () {
              if (T)
                return (
                  T.hasreversehr &&
                    (e = T.detected.ismozilla
                      ? -(T.page.maxw - e)
                      : T.page.maxw - e),
                  T.docscroll.scrollLeft(e)
                );
            }, 1);
          });
      (this.getTarget = function (e) {
        return !!e && (e.target ? e.target : !!e.srcElement && e.srcElement);
      }),
        (this.hasParent = function (e, o) {
          if (!e) return !1;
          for (var t = e.target || e.srcElement || e || !1; t && t.id != o; )
            t = t.parentNode || !1;
          return !1 !== t;
        });
      var I = { thin: 1, medium: 3, thick: 5 };
      (this.getDocumentScrollOffset = function () {
        return {
          top: a.pageYOffset || l.documentElement.scrollTop,
          left: a.pageXOffset || l.documentElement.scrollLeft,
        };
      }),
        (this.getOffset = function () {
          if (T.isfixed) {
            var e = T.win.offset(),
              o = T.getDocumentScrollOffset();
            return (e.top -= o.top), (e.left -= o.left), e;
          }
          var t = T.win.offset();
          if (!T.viewport) return t;
          var r = T.viewport.offset();
          return { top: t.top - r.top, left: t.left - r.left };
        }),
        (this.updateScrollBar = function (e) {
          var o, t;
          if (T.ishwscroll)
            T.rail.css({
              height:
                T.win.innerHeight() -
                (M.railpadding.top + M.railpadding.bottom),
            }),
              T.railh &&
                T.railh.css({
                  width:
                    T.win.innerWidth() -
                    (M.railpadding.left + M.railpadding.right),
                });
          else {
            var r = T.getOffset();
            if (
              ((o = {
                top: r.top,
                left: r.left - (M.railpadding.left + M.railpadding.right),
              }),
              (o.top += x(T.win, "border-top-width", !0)),
              (o.left += T.rail.align
                ? T.win.outerWidth() -
                  x(T.win, "border-right-width") -
                  T.rail.width
                : x(T.win, "border-left-width")),
              (t = M.railoffset) &&
                (t.top && (o.top += t.top), t.left && (o.left += t.left)),
              T.railslocked ||
                T.rail.css({
                  top: o.top,
                  left: o.left,
                  height:
                    (e ? e.h : T.win.innerHeight()) -
                    (M.railpadding.top + M.railpadding.bottom),
                }),
              T.zoom &&
                T.zoom.css({
                  top: o.top + 1,
                  left:
                    1 == T.rail.align ? o.left - 20 : o.left + T.rail.width + 4,
                }),
              T.railh && !T.railslocked)
            ) {
              (o = { top: r.top, left: r.left }),
                (t = M.railhoffset) &&
                  (t.top && (o.top += t.top), t.left && (o.left += t.left));
              var i = T.railh.align
                  ? o.top +
                    x(T.win, "border-top-width", !0) +
                    T.win.innerHeight() -
                    T.railh.height
                  : o.top + x(T.win, "border-top-width", !0),
                s = o.left + x(T.win, "border-left-width");
              T.railh.css({
                top: i - (M.railpadding.top + M.railpadding.bottom),
                left: s,
                width: T.railh.width,
              });
            }
          }
        }),
        (this.doRailClick = function (e, o, t) {
          var r, i, s, n;
          T.railslocked ||
            (T.cancelEvent(e),
            "pageY" in e ||
              ((e.pageX = e.clientX + l.documentElement.scrollLeft),
              (e.pageY = e.clientY + l.documentElement.scrollTop)),
            o
              ? ((r = t ? T.doScrollLeft : T.doScrollTop),
                (s = t
                  ? (e.pageX - T.railh.offset().left - T.cursorwidth / 2) *
                    T.scrollratio.x
                  : (e.pageY - T.rail.offset().top - T.cursorheight / 2) *
                    T.scrollratio.y),
                T.unsynched("relativexy"),
                r(0 | s))
              : ((r = t ? T.doScrollLeftBy : T.doScrollBy),
                (s = t ? T.scroll.x : T.scroll.y),
                (n = t
                  ? e.pageX - T.railh.offset().left
                  : e.pageY - T.rail.offset().top),
                (i = t ? T.view.w : T.view.h),
                r(s >= n ? i : -i)));
        }),
        (T.newscrolly = T.newscrollx = 0),
        (T.hasanimationframe = "requestAnimationFrame" in a),
        (T.hascancelanimationframe = "cancelAnimationFrame" in a),
        (T.hasborderbox = !1),
        (this.init = function () {
          if (((T.saved.css = []), P.isoperamini)) return !0;
          if (P.isandroid && !("hidden" in l)) return !0;
          (M.emulatetouch = M.emulatetouch || M.touchbehavior),
            (T.hasborderbox =
              a.getComputedStyle &&
              "border-box" === a.getComputedStyle(l.body)["box-sizing"]);
          var e = { "overflow-y": "hidden" };
          if (
            ((P.isie11 || P.isie10) && (e["-ms-overflow-style"] = "none"),
            T.ishwscroll &&
              (this.doc.css(
                P.transitionstyle,
                P.prefixstyle + "transform 0ms ease-out"
              ),
              P.transitionend &&
                T.bind(T.doc, P.transitionend, T.onScrollTransitionEnd, !1)),
            (T.zindex = "auto"),
            T.ispage || "auto" != M.zindex
              ? (T.zindex = M.zindex)
              : (T.zindex = b() || "auto"),
            !T.ispage && "auto" != T.zindex && T.zindex > s && (s = T.zindex),
            T.isie &&
              0 === T.zindex &&
              "auto" == M.zindex &&
              (T.zindex = "auto"),
            !T.ispage || !P.isieold)
          ) {
            var i = T.docscroll;
            T.ispage && (i = T.haswrapper ? T.win : T.doc),
              T.css(i, e),
              T.ispage && (P.isie11 || P.isie) && T.css(n("html"), e),
              !P.isios ||
                T.ispage ||
                T.haswrapper ||
                T.css(E, { "-webkit-overflow-scrolling": "touch" });
            var d = n(l.createElement("div"));
            d.css({
              position: "relative",
              top: 0,
              float: "right",
              width: M.cursorwidth,
              height: 0,
              "background-color": M.cursorcolor,
              border: M.cursorborder,
              "background-clip": "padding-box",
              "-webkit-border-radius": M.cursorborderradius,
              "-moz-border-radius": M.cursorborderradius,
              "border-radius": M.cursorborderradius,
            }),
              d.addClass("nicescroll-cursors"),
              (T.cursor = d);
            var u = n(l.createElement("div"));
            u.attr("id", T.id),
              u.addClass("nicescroll-rails nicescroll-rails-vr");
            var h,
              p,
              f = ["left", "right", "top", "bottom"];
            for (var g in f)
              (p = f[g]),
                (h = M.railpadding[p] || 0) && u.css("padding-" + p, h + "px");
            u.append(d),
              (u.width = Math.max(parseFloat(M.cursorwidth), d.outerWidth())),
              u.css({
                width: u.width + "px",
                zIndex: T.zindex,
                background: M.background,
                cursor: "default",
              }),
              (u.visibility = !0),
              (u.scrollable = !0),
              (u.align = "left" == M.railalign ? 0 : 1),
              (T.rail = u),
              (T.rail.drag = !1);
            var v = !1;
            !M.boxzoom ||
              T.ispage ||
              P.isieold ||
              ((v = l.createElement("div")),
              T.bind(v, "click", T.doZoom),
              T.bind(v, "mouseenter", function () {
                T.zoom.css("opacity", M.cursoropacitymax);
              }),
              T.bind(v, "mouseleave", function () {
                T.zoom.css("opacity", M.cursoropacitymin);
              }),
              (T.zoom = n(v)),
              T.zoom.css({
                cursor: "pointer",
                zIndex: T.zindex,
                backgroundImage: "url(" + M.scriptpath + "zoomico.png)",
                height: 18,
                width: 18,
                backgroundPosition: "0 0",
              }),
              M.dblclickzoom && T.bind(T.win, "dblclick", T.doZoom),
              P.cantouch &&
                M.gesturezoom &&
                ((T.ongesturezoom = function (e) {
                  return (
                    e.scale > 1.5 && T.doZoomIn(e),
                    e.scale < 0.8 && T.doZoomOut(e),
                    T.cancelEvent(e)
                  );
                }),
                T.bind(T.win, "gestureend", T.ongesturezoom))),
              (T.railh = !1);
            var w;
            if (
              (M.horizrailenabled &&
                (T.css(i, { overflowX: "hidden" }),
                (d = n(l.createElement("div"))).css({
                  position: "absolute",
                  top: 0,
                  height: M.cursorwidth,
                  width: 0,
                  backgroundColor: M.cursorcolor,
                  border: M.cursorborder,
                  backgroundClip: "padding-box",
                  "-webkit-border-radius": M.cursorborderradius,
                  "-moz-border-radius": M.cursorborderradius,
                  "border-radius": M.cursorborderradius,
                }),
                P.isieold && d.css("overflow", "hidden"),
                d.addClass("nicescroll-cursors"),
                (T.cursorh = d),
                (w = n(l.createElement("div"))).attr("id", T.id + "-hr"),
                w.addClass("nicescroll-rails nicescroll-rails-hr"),
                (w.height = Math.max(
                  parseFloat(M.cursorwidth),
                  d.outerHeight()
                )),
                w.css({
                  height: w.height + "px",
                  zIndex: T.zindex,
                  background: M.background,
                }),
                w.append(d),
                (w.visibility = !0),
                (w.scrollable = !0),
                (w.align = "top" == M.railvalign ? 0 : 1),
                (T.railh = w),
                (T.railh.drag = !1)),
              T.ispage)
            )
              u.css({ position: "fixed", top: 0, height: "100%" }),
                u.css(u.align ? { right: 0 } : { left: 0 }),
                T.body.append(u),
                T.railh &&
                  (w.css({ position: "fixed", left: 0, width: "100%" }),
                  w.css(w.align ? { bottom: 0 } : { top: 0 }),
                  T.body.append(w));
            else {
              if (T.ishwscroll) {
                "static" == T.win.css("position") &&
                  T.css(T.win, { position: "relative" });
                var x = "HTML" == T.win[0].nodeName ? T.body : T.win;
                n(x).scrollTop(0).scrollLeft(0),
                  T.zoom &&
                    (T.zoom.css({
                      position: "absolute",
                      top: 1,
                      right: 0,
                      "margin-right": u.width + 4,
                    }),
                    x.append(T.zoom)),
                  u.css({ position: "absolute", top: 0 }),
                  u.css(u.align ? { right: 0 } : { left: 0 }),
                  x.append(u),
                  w &&
                    (w.css({ position: "absolute", left: 0, bottom: 0 }),
                    w.css(w.align ? { bottom: 0 } : { top: 0 }),
                    x.append(w));
              } else {
                T.isfixed = "fixed" == T.win.css("position");
                var S = T.isfixed ? "fixed" : "absolute";
                T.isfixed || (T.viewport = T.getViewport(T.win[0])),
                  T.viewport &&
                    ((T.body = T.viewport),
                    /fixed|absolute/.test(T.viewport.css("position")) ||
                      T.css(T.viewport, { position: "relative" })),
                  u.css({ position: S }),
                  T.zoom && T.zoom.css({ position: S }),
                  T.updateScrollBar(),
                  T.body.append(u),
                  T.zoom && T.body.append(T.zoom),
                  T.railh && (w.css({ position: S }), T.body.append(w));
              }
              P.isios &&
                T.css(T.win, {
                  "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                  "-webkit-touch-callout": "none",
                }),
                M.disableoutline &&
                  (P.isie && T.win.attr("hideFocus", "true"),
                  P.iswebkit && T.win.css("outline", "none"));
            }
            if (
              (!1 === M.autohidemode
                ? ((T.autohidedom = !1),
                  T.rail.css({ opacity: M.cursoropacitymax }),
                  T.railh && T.railh.css({ opacity: M.cursoropacitymax }))
                : !0 === M.autohidemode || "leave" === M.autohidemode
                ? ((T.autohidedom = n().add(T.rail)),
                  P.isie8 && (T.autohidedom = T.autohidedom.add(T.cursor)),
                  T.railh && (T.autohidedom = T.autohidedom.add(T.railh)),
                  T.railh &&
                    P.isie8 &&
                    (T.autohidedom = T.autohidedom.add(T.cursorh)))
                : "scroll" == M.autohidemode
                ? ((T.autohidedom = n().add(T.rail)),
                  T.railh && (T.autohidedom = T.autohidedom.add(T.railh)))
                : "cursor" == M.autohidemode
                ? ((T.autohidedom = n().add(T.cursor)),
                  T.railh && (T.autohidedom = T.autohidedom.add(T.cursorh)))
                : "hidden" == M.autohidemode &&
                  ((T.autohidedom = !1), T.hide(), (T.railslocked = !1)),
              P.cantouch || T.istouchcapable || M.emulatetouch || P.hasmstouch)
            ) {
              T.scrollmom = new y(T);
              (T.ontouchstart = function (e) {
                if (T.locked) return !1;
                if (
                  e.pointerType &&
                  ("mouse" === e.pointerType ||
                    e.pointerType === e.MSPOINTER_TYPE_MOUSE)
                )
                  return !1;
                if (
                  ((T.hasmoving = !1),
                  T.scrollmom.timer &&
                    (T.triggerScrollEnd(), T.scrollmom.stop()),
                  !T.railslocked)
                ) {
                  var o = T.getTarget(e);
                  if (o && /INPUT/i.test(o.nodeName) && /range/i.test(o.type))
                    return T.stopPropagation(e);
                  var t = "mousedown" === e.type;
                  if (
                    (!("clientX" in e) &&
                      "changedTouches" in e &&
                      ((e.clientX = e.changedTouches[0].clientX),
                      (e.clientY = e.changedTouches[0].clientY)),
                    T.forcescreen)
                  ) {
                    var r = e;
                    ((e = { original: e.original ? e.original : e }).clientX =
                      r.screenX),
                      (e.clientY = r.screenY);
                  }
                  if (
                    ((T.rail.drag = {
                      x: e.clientX,
                      y: e.clientY,
                      sx: T.scroll.x,
                      sy: T.scroll.y,
                      st: T.getScrollTop(),
                      sl: T.getScrollLeft(),
                      pt: 2,
                      dl: !1,
                      tg: o,
                    }),
                    T.ispage || !M.directionlockdeadzone)
                  )
                    T.rail.drag.dl = "f";
                  else {
                    var i = { w: c.width(), h: c.height() },
                      s = T.getContentSize(),
                      l = s.h - i.h,
                      a = s.w - i.w;
                    T.rail.scrollable && !T.railh.scrollable
                      ? (T.rail.drag.ck = l > 0 && "v")
                      : !T.rail.scrollable && T.railh.scrollable
                      ? (T.rail.drag.ck = a > 0 && "h")
                      : (T.rail.drag.ck = !1);
                  }
                  if (M.emulatetouch && T.isiframe && P.isie) {
                    var d = T.win.position();
                    (T.rail.drag.x += d.left), (T.rail.drag.y += d.top);
                  }
                  if (
                    ((T.hasmoving = !1),
                    (T.lastmouseup = !1),
                    T.scrollmom.reset(e.clientX, e.clientY),
                    o && t)
                  ) {
                    if (!/INPUT|SELECT|BUTTON|TEXTAREA/i.test(o.nodeName))
                      return (
                        P.hasmousecapture && o.setCapture(),
                        M.emulatetouch
                          ? (o.onclick &&
                              !o._onclick &&
                              ((o._onclick = o.onclick),
                              (o.onclick = function (e) {
                                if (T.hasmoving) return !1;
                                o._onclick.call(this, e);
                              })),
                            T.cancelEvent(e))
                          : T.stopPropagation(e)
                      );
                    /SUBMIT|CANCEL|BUTTON/i.test(n(o).attr("type")) &&
                      (T.preventclick = { tg: o, click: !1 });
                  }
                }
              }),
                (T.ontouchend = function (e) {
                  if (!T.rail.drag) return !0;
                  if (2 == T.rail.drag.pt) {
                    if (
                      e.pointerType &&
                      ("mouse" === e.pointerType ||
                        e.pointerType === e.MSPOINTER_TYPE_MOUSE)
                    )
                      return !1;
                    T.rail.drag = !1;
                    var o = "mouseup" === e.type;
                    if (
                      T.hasmoving &&
                      (T.scrollmom.doMomentum(),
                      (T.lastmouseup = !0),
                      T.hideCursor(),
                      P.hasmousecapture && l.releaseCapture(),
                      o)
                    )
                      return T.cancelEvent(e);
                  } else if (1 == T.rail.drag.pt) return T.onmouseup(e);
                });
              var z = M.emulatetouch && T.isiframe && !P.hasmousecapture,
                k = (0.3 * M.directionlockdeadzone) | 0;
              (T.ontouchmove = function (e, o) {
                if (!T.rail.drag) return !0;
                if (
                  e.targetTouches &&
                  M.preventmultitouchscrolling &&
                  e.targetTouches.length > 1
                )
                  return !0;
                if (
                  e.pointerType &&
                  ("mouse" === e.pointerType ||
                    e.pointerType === e.MSPOINTER_TYPE_MOUSE)
                )
                  return !0;
                if (2 == T.rail.drag.pt) {
                  "changedTouches" in e &&
                    ((e.clientX = e.changedTouches[0].clientX),
                    (e.clientY = e.changedTouches[0].clientY));
                  var t, r;
                  if (((r = t = 0), z && !o)) {
                    var i = T.win.position();
                    (r = -i.left), (t = -i.top);
                  }
                  var s = e.clientY + t,
                    n = s - T.rail.drag.y,
                    a = e.clientX + r,
                    c = a - T.rail.drag.x,
                    d = T.rail.drag.st - n;
                  if (T.ishwscroll && M.bouncescroll)
                    d < 0
                      ? (d = Math.round(d / 2))
                      : d > T.page.maxh &&
                        (d = T.page.maxh + Math.round((d - T.page.maxh) / 2));
                  else if (
                    (d < 0
                      ? ((d = 0), (s = 0))
                      : d > T.page.maxh && ((d = T.page.maxh), (s = 0)),
                    0 === s && !T.hasmoving)
                  )
                    return T.ispage || (T.rail.drag = !1), !0;
                  var u = T.getScrollLeft();
                  if (
                    (T.railh &&
                      T.railh.scrollable &&
                      ((u = T.isrtlmode
                        ? c - T.rail.drag.sl
                        : T.rail.drag.sl - c),
                      T.ishwscroll && M.bouncescroll
                        ? u < 0
                          ? (u = Math.round(u / 2))
                          : u > T.page.maxw &&
                            (u =
                              T.page.maxw + Math.round((u - T.page.maxw) / 2))
                        : (u < 0 && ((u = 0), (a = 0)),
                          u > T.page.maxw && ((u = T.page.maxw), (a = 0)))),
                    !T.hasmoving)
                  ) {
                    if (
                      T.rail.drag.y === e.clientY &&
                      T.rail.drag.x === e.clientX
                    )
                      return T.cancelEvent(e);
                    var h = Math.abs(n),
                      p = Math.abs(c),
                      m = M.directionlockdeadzone;
                    if (
                      (T.rail.drag.ck
                        ? "v" == T.rail.drag.ck
                          ? p > m && h <= k
                            ? (T.rail.drag = !1)
                            : h > m && (T.rail.drag.dl = "v")
                          : "h" == T.rail.drag.ck &&
                            (h > m && p <= k
                              ? (T.rail.drag = !1)
                              : p > m && (T.rail.drag.dl = "h"))
                        : h > m && p > m
                        ? (T.rail.drag.dl = "f")
                        : h > m
                        ? (T.rail.drag.dl = p > k ? "f" : "v")
                        : p > m && (T.rail.drag.dl = h > k ? "f" : "h"),
                      !T.rail.drag.dl)
                    )
                      return T.cancelEvent(e);
                    T.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0),
                      (T.hasmoving = !0);
                  }
                  return (
                    T.preventclick &&
                      !T.preventclick.click &&
                      ((T.preventclick.click = T.preventclick.tg.onclick || !1),
                      (T.preventclick.tg.onclick = T.onpreventclick)),
                    T.rail.drag.dl &&
                      ("v" == T.rail.drag.dl
                        ? (u = T.rail.drag.sl)
                        : "h" == T.rail.drag.dl && (d = T.rail.drag.st)),
                    T.synched("touchmove", function () {
                      T.rail.drag &&
                        2 == T.rail.drag.pt &&
                        (T.prepareTransition && T.resetTransition(),
                        T.rail.scrollable && T.setScrollTop(d),
                        T.scrollmom.update(a, s),
                        T.railh && T.railh.scrollable
                          ? (T.setScrollLeft(u), T.showCursor(d, u))
                          : T.showCursor(d),
                        P.isie10 && l.selection.clear());
                    }),
                    T.cancelEvent(e)
                  );
                }
                return 1 == T.rail.drag.pt ? T.onmousemove(e) : void 0;
              }),
                (T.ontouchstartCursor = function (e, o) {
                  if (!T.rail.drag || 3 == T.rail.drag.pt) {
                    if (T.locked) return T.cancelEvent(e);
                    T.cancelScroll(),
                      (T.rail.drag = {
                        x: e.touches[0].clientX,
                        y: e.touches[0].clientY,
                        sx: T.scroll.x,
                        sy: T.scroll.y,
                        pt: 3,
                        hr: !!o,
                      });
                    var t = T.getTarget(e);
                    return (
                      !T.ispage && P.hasmousecapture && t.setCapture(),
                      T.isiframe &&
                        !P.hasmousecapture &&
                        ((T.saved.csspointerevents =
                          T.doc.css("pointer-events")),
                        T.css(T.doc, { "pointer-events": "none" })),
                      T.cancelEvent(e)
                    );
                  }
                }),
                (T.ontouchendCursor = function (e) {
                  if (T.rail.drag) {
                    if (
                      (P.hasmousecapture && l.releaseCapture(),
                      T.isiframe &&
                        !P.hasmousecapture &&
                        T.doc.css("pointer-events", T.saved.csspointerevents),
                      3 != T.rail.drag.pt)
                    )
                      return;
                    return (T.rail.drag = !1), T.cancelEvent(e);
                  }
                }),
                (T.ontouchmoveCursor = function (e) {
                  if (T.rail.drag) {
                    if (3 != T.rail.drag.pt) return;
                    if (((T.cursorfreezed = !0), T.rail.drag.hr)) {
                      (T.scroll.x =
                        T.rail.drag.sx +
                        (e.touches[0].clientX - T.rail.drag.x)),
                        T.scroll.x < 0 && (T.scroll.x = 0);
                      var o = T.scrollvaluemaxw;
                      T.scroll.x > o && (T.scroll.x = o);
                    } else {
                      (T.scroll.y =
                        T.rail.drag.sy +
                        (e.touches[0].clientY - T.rail.drag.y)),
                        T.scroll.y < 0 && (T.scroll.y = 0);
                      var t = T.scrollvaluemax;
                      T.scroll.y > t && (T.scroll.y = t);
                    }
                    return (
                      T.synched("touchmove", function () {
                        T.rail.drag &&
                          3 == T.rail.drag.pt &&
                          (T.showCursor(),
                          T.rail.drag.hr
                            ? T.doScrollLeft(
                                Math.round(T.scroll.x * T.scrollratio.x),
                                M.cursordragspeed
                              )
                            : T.doScrollTop(
                                Math.round(T.scroll.y * T.scrollratio.y),
                                M.cursordragspeed
                              ));
                      }),
                      T.cancelEvent(e)
                    );
                  }
                });
            }
            if (
              ((T.onmousedown = function (e, o) {
                if (!T.rail.drag || 1 == T.rail.drag.pt) {
                  if (T.railslocked) return T.cancelEvent(e);
                  T.cancelScroll(),
                    (T.rail.drag = {
                      x: e.clientX,
                      y: e.clientY,
                      sx: T.scroll.x,
                      sy: T.scroll.y,
                      pt: 1,
                      hr: o || !1,
                    });
                  var t = T.getTarget(e);
                  return (
                    P.hasmousecapture && t.setCapture(),
                    T.isiframe &&
                      !P.hasmousecapture &&
                      ((T.saved.csspointerevents = T.doc.css("pointer-events")),
                      T.css(T.doc, { "pointer-events": "none" })),
                    (T.hasmoving = !1),
                    T.cancelEvent(e)
                  );
                }
              }),
              (T.onmouseup = function (e) {
                if (T.rail.drag)
                  return (
                    1 != T.rail.drag.pt ||
                    (P.hasmousecapture && l.releaseCapture(),
                    T.isiframe &&
                      !P.hasmousecapture &&
                      T.doc.css("pointer-events", T.saved.csspointerevents),
                    (T.rail.drag = !1),
                    (T.cursorfreezed = !1),
                    T.hasmoving && T.triggerScrollEnd(),
                    T.cancelEvent(e))
                  );
              }),
              (T.onmousemove = function (e) {
                if (T.rail.drag) {
                  if (1 !== T.rail.drag.pt) return;
                  if (P.ischrome && 0 === e.which) return T.onmouseup(e);
                  if (
                    ((T.cursorfreezed = !0),
                    T.hasmoving ||
                      T.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0),
                    (T.hasmoving = !0),
                    T.rail.drag.hr)
                  ) {
                    (T.scroll.x = T.rail.drag.sx + (e.clientX - T.rail.drag.x)),
                      T.scroll.x < 0 && (T.scroll.x = 0);
                    var o = T.scrollvaluemaxw;
                    T.scroll.x > o && (T.scroll.x = o);
                  } else {
                    (T.scroll.y = T.rail.drag.sy + (e.clientY - T.rail.drag.y)),
                      T.scroll.y < 0 && (T.scroll.y = 0);
                    var t = T.scrollvaluemax;
                    T.scroll.y > t && (T.scroll.y = t);
                  }
                  return (
                    T.synched("mousemove", function () {
                      T.cursorfreezed &&
                        (T.showCursor(),
                        T.rail.drag.hr
                          ? T.scrollLeft(
                              Math.round(T.scroll.x * T.scrollratio.x)
                            )
                          : T.scrollTop(
                              Math.round(T.scroll.y * T.scrollratio.y)
                            ));
                    }),
                    T.cancelEvent(e)
                  );
                }
                T.checkarea = 0;
              }),
              P.cantouch || M.emulatetouch)
            )
              (T.onpreventclick = function (e) {
                if (T.preventclick)
                  return (
                    (T.preventclick.tg.onclick = T.preventclick.click),
                    (T.preventclick = !1),
                    T.cancelEvent(e)
                  );
              }),
                (T.onclick =
                  !P.isios &&
                  function (e) {
                    return (
                      !T.lastmouseup || ((T.lastmouseup = !1), T.cancelEvent(e))
                    );
                  }),
                M.grabcursorenabled &&
                  P.cursorgrabvalue &&
                  (T.css(T.ispage ? T.doc : T.win, {
                    cursor: P.cursorgrabvalue,
                  }),
                  T.css(T.rail, { cursor: P.cursorgrabvalue }));
            else {
              var L = function (e) {
                if (T.selectiondrag) {
                  if (e) {
                    var o = T.win.outerHeight(),
                      t = e.pageY - T.selectiondrag.top;
                    t > 0 && t < o && (t = 0),
                      t >= o && (t -= o),
                      (T.selectiondrag.df = t);
                  }
                  if (0 !== T.selectiondrag.df) {
                    var r = ((-2 * T.selectiondrag.df) / 6) | 0;
                    T.doScrollBy(r),
                      T.debounced(
                        "doselectionscroll",
                        function () {
                          L();
                        },
                        50
                      );
                  }
                }
              };
              (T.hasTextSelected =
                "getSelection" in l
                  ? function () {
                      return l.getSelection().rangeCount > 0;
                    }
                  : "selection" in l
                  ? function () {
                      return "None" != l.selection.type;
                    }
                  : function () {
                      return !1;
                    }),
                (T.onselectionstart = function (e) {
                  T.ispage || (T.selectiondrag = T.win.offset());
                }),
                (T.onselectionend = function (e) {
                  T.selectiondrag = !1;
                }),
                (T.onselectiondrag = function (e) {
                  T.selectiondrag &&
                    T.hasTextSelected() &&
                    T.debounced(
                      "selectionscroll",
                      function () {
                        L(e);
                      },
                      250
                    );
                });
            }
            if (
              (P.hasw3ctouch
                ? (T.css(T.ispage ? n("html") : T.win, {
                    "touch-action": "none",
                  }),
                  T.css(T.rail, { "touch-action": "none" }),
                  T.css(T.cursor, { "touch-action": "none" }),
                  T.bind(T.win, "pointerdown", T.ontouchstart),
                  T.bind(l, "pointerup", T.ontouchend),
                  T.delegate(l, "pointermove", T.ontouchmove))
                : P.hasmstouch
                ? (T.css(T.ispage ? n("html") : T.win, {
                    "-ms-touch-action": "none",
                  }),
                  T.css(T.rail, { "-ms-touch-action": "none" }),
                  T.css(T.cursor, { "-ms-touch-action": "none" }),
                  T.bind(T.win, "MSPointerDown", T.ontouchstart),
                  T.bind(l, "MSPointerUp", T.ontouchend),
                  T.delegate(l, "MSPointerMove", T.ontouchmove),
                  T.bind(T.cursor, "MSGestureHold", function (e) {
                    e.preventDefault();
                  }),
                  T.bind(T.cursor, "contextmenu", function (e) {
                    e.preventDefault();
                  }))
                : P.cantouch &&
                  (T.bind(T.win, "touchstart", T.ontouchstart, !1, !0),
                  T.bind(l, "touchend", T.ontouchend, !1, !0),
                  T.bind(l, "touchcancel", T.ontouchend, !1, !0),
                  T.delegate(l, "touchmove", T.ontouchmove, !1, !0)),
              M.emulatetouch &&
                (T.bind(T.win, "mousedown", T.ontouchstart, !1, !0),
                T.bind(l, "mouseup", T.ontouchend, !1, !0),
                T.bind(l, "mousemove", T.ontouchmove, !1, !0)),
              (M.cursordragontouch || (!P.cantouch && !M.emulatetouch)) &&
                (T.rail.css({ cursor: "default" }),
                T.railh && T.railh.css({ cursor: "default" }),
                T.jqbind(T.rail, "mouseenter", function () {
                  if (!T.ispage && !T.win.is(":visible")) return !1;
                  T.canshowonmouseevent && T.showCursor(), (T.rail.active = !0);
                }),
                T.jqbind(T.rail, "mouseleave", function () {
                  (T.rail.active = !1), T.rail.drag || T.hideCursor();
                }),
                M.sensitiverail &&
                  (T.bind(T.rail, "click", function (e) {
                    T.doRailClick(e, !1, !1);
                  }),
                  T.bind(T.rail, "dblclick", function (e) {
                    T.doRailClick(e, !0, !1);
                  }),
                  T.bind(T.cursor, "click", function (e) {
                    T.cancelEvent(e);
                  }),
                  T.bind(T.cursor, "dblclick", function (e) {
                    T.cancelEvent(e);
                  })),
                T.railh &&
                  (T.jqbind(T.railh, "mouseenter", function () {
                    if (!T.ispage && !T.win.is(":visible")) return !1;
                    T.canshowonmouseevent && T.showCursor(),
                      (T.rail.active = !0);
                  }),
                  T.jqbind(T.railh, "mouseleave", function () {
                    (T.rail.active = !1), T.rail.drag || T.hideCursor();
                  }),
                  M.sensitiverail &&
                    (T.bind(T.railh, "click", function (e) {
                      T.doRailClick(e, !1, !0);
                    }),
                    T.bind(T.railh, "dblclick", function (e) {
                      T.doRailClick(e, !0, !0);
                    }),
                    T.bind(T.cursorh, "click", function (e) {
                      T.cancelEvent(e);
                    }),
                    T.bind(T.cursorh, "dblclick", function (e) {
                      T.cancelEvent(e);
                    })))),
              M.cursordragontouch &&
                (this.istouchcapable || P.cantouch) &&
                (T.bind(T.cursor, "touchstart", T.ontouchstartCursor),
                T.bind(T.cursor, "touchmove", T.ontouchmoveCursor),
                T.bind(T.cursor, "touchend", T.ontouchendCursor),
                T.cursorh &&
                  T.bind(T.cursorh, "touchstart", function (e) {
                    T.ontouchstartCursor(e, !0);
                  }),
                T.cursorh &&
                  T.bind(T.cursorh, "touchmove", T.ontouchmoveCursor),
                T.cursorh && T.bind(T.cursorh, "touchend", T.ontouchendCursor)),
              M.emulatetouch || P.isandroid || P.isios
                ? (T.bind(
                    P.hasmousecapture ? T.win : l,
                    "mouseup",
                    T.ontouchend
                  ),
                  T.onclick && T.bind(l, "click", T.onclick),
                  M.cursordragontouch
                    ? (T.bind(T.cursor, "mousedown", T.onmousedown),
                      T.bind(T.cursor, "mouseup", T.onmouseup),
                      T.cursorh &&
                        T.bind(T.cursorh, "mousedown", function (e) {
                          T.onmousedown(e, !0);
                        }),
                      T.cursorh && T.bind(T.cursorh, "mouseup", T.onmouseup))
                    : (T.bind(T.rail, "mousedown", function (e) {
                        e.preventDefault();
                      }),
                      T.railh &&
                        T.bind(T.railh, "mousedown", function (e) {
                          e.preventDefault();
                        })))
                : (T.bind(
                    P.hasmousecapture ? T.win : l,
                    "mouseup",
                    T.onmouseup
                  ),
                  T.bind(l, "mousemove", T.onmousemove),
                  T.onclick && T.bind(l, "click", T.onclick),
                  T.bind(T.cursor, "mousedown", T.onmousedown),
                  T.bind(T.cursor, "mouseup", T.onmouseup),
                  T.railh &&
                    (T.bind(T.cursorh, "mousedown", function (e) {
                      T.onmousedown(e, !0);
                    }),
                    T.bind(T.cursorh, "mouseup", T.onmouseup)),
                  !T.ispage &&
                    M.enablescrollonselection &&
                    (T.bind(T.win[0], "mousedown", T.onselectionstart),
                    T.bind(l, "mouseup", T.onselectionend),
                    T.bind(T.cursor, "mouseup", T.onselectionend),
                    T.cursorh && T.bind(T.cursorh, "mouseup", T.onselectionend),
                    T.bind(l, "mousemove", T.onselectiondrag)),
                  T.zoom &&
                    (T.jqbind(T.zoom, "mouseenter", function () {
                      T.canshowonmouseevent && T.showCursor(),
                        (T.rail.active = !0);
                    }),
                    T.jqbind(T.zoom, "mouseleave", function () {
                      (T.rail.active = !1), T.rail.drag || T.hideCursor();
                    }))),
              M.enablemousewheel &&
                (T.isiframe ||
                  T.mousewheel(P.isie && T.ispage ? l : T.win, T.onmousewheel),
                T.mousewheel(T.rail, T.onmousewheel),
                T.railh && T.mousewheel(T.railh, T.onmousewheelhr)),
              T.ispage ||
                P.cantouch ||
                /HTML|^BODY/.test(T.win[0].nodeName) ||
                (T.win.attr("tabindex") || T.win.attr({ tabindex: ++r }),
                T.bind(T.win, "focus", function (e) {
                  (o = T.getTarget(e).id || T.getTarget(e) || !1),
                    (T.hasfocus = !0),
                    T.canshowonmouseevent && T.noticeCursor();
                }),
                T.bind(T.win, "blur", function (e) {
                  (o = !1), (T.hasfocus = !1);
                }),
                T.bind(T.win, "mouseenter", function (e) {
                  (t = T.getTarget(e).id || T.getTarget(e) || !1),
                    (T.hasmousefocus = !0),
                    T.canshowonmouseevent && T.noticeCursor();
                }),
                T.bind(T.win, "mouseleave", function (e) {
                  (t = !1),
                    (T.hasmousefocus = !1),
                    T.rail.drag || T.hideCursor();
                })),
              (T.onkeypress = function (e) {
                if (T.railslocked && 0 === T.page.maxh) return !0;
                e = e || a.event;
                var r = T.getTarget(e);
                if (
                  r &&
                  /INPUT|TEXTAREA|SELECT|OPTION/.test(r.nodeName) &&
                  (!(r.getAttribute("type") || r.type || !1) ||
                    !/submit|button|cancel/i.tp)
                )
                  return !0;
                if (n(r).attr("contenteditable")) return !0;
                if (
                  T.hasfocus ||
                  (T.hasmousefocus && !o) ||
                  (T.ispage && !o && !t)
                ) {
                  var i = e.keyCode;
                  if (T.railslocked && 27 != i) return T.cancelEvent(e);
                  var s = e.ctrlKey || !1,
                    l = e.shiftKey || !1,
                    c = !1;
                  switch (i) {
                    case 38:
                    case 63233:
                      T.doScrollBy(72), (c = !0);
                      break;
                    case 40:
                    case 63235:
                      T.doScrollBy(-72), (c = !0);
                      break;
                    case 37:
                    case 63232:
                      T.railh &&
                        (s ? T.doScrollLeft(0) : T.doScrollLeftBy(72),
                        (c = !0));
                      break;
                    case 39:
                    case 63234:
                      T.railh &&
                        (s
                          ? T.doScrollLeft(T.page.maxw)
                          : T.doScrollLeftBy(-72),
                        (c = !0));
                      break;
                    case 33:
                    case 63276:
                      T.doScrollBy(T.view.h), (c = !0);
                      break;
                    case 34:
                    case 63277:
                      T.doScrollBy(-T.view.h), (c = !0);
                      break;
                    case 36:
                    case 63273:
                      T.railh && s ? T.doScrollPos(0, 0) : T.doScrollTo(0),
                        (c = !0);
                      break;
                    case 35:
                    case 63275:
                      T.railh && s
                        ? T.doScrollPos(T.page.maxw, T.page.maxh)
                        : T.doScrollTo(T.page.maxh),
                        (c = !0);
                      break;
                    case 32:
                      M.spacebarenabled &&
                        (l ? T.doScrollBy(T.view.h) : T.doScrollBy(-T.view.h),
                        (c = !0));
                      break;
                    case 27:
                      T.zoomactive && (T.doZoom(), (c = !0));
                  }
                  if (c) return T.cancelEvent(e);
                }
              }),
              M.enablekeyboard &&
                T.bind(
                  l,
                  P.isopera && !P.isopera12 ? "keypress" : "keydown",
                  T.onkeypress
                ),
              T.bind(l, "keydown", function (e) {
                (e.ctrlKey || !1) && (T.wheelprevented = !0);
              }),
              T.bind(l, "keyup", function (e) {
                e.ctrlKey || !1 || (T.wheelprevented = !1);
              }),
              T.bind(a, "blur", function (e) {
                T.wheelprevented = !1;
              }),
              T.bind(a, "resize", T.onscreenresize),
              T.bind(a, "orientationchange", T.onscreenresize),
              T.bind(a, "load", T.lazyResize),
              P.ischrome && !T.ispage && !T.haswrapper)
            ) {
              var C = T.win.attr("style"),
                N = parseFloat(T.win.css("width")) + 1;
              T.win.css("width", N),
                T.synched("chromefix", function () {
                  T.win.attr("style", C);
                });
            }
            if (
              ((T.onAttributeChange = function (e) {
                T.lazyResize(T.isieold ? 250 : 30);
              }),
              M.enableobserver &&
                (T.isie11 ||
                  !1 === m ||
                  ((T.observerbody = new m(function (e) {
                    if (
                      (e.forEach(function (e) {
                        if ("attributes" == e.type)
                          return E.hasClass("modal-open") &&
                            E.hasClass("modal-dialog") &&
                            !n.contains(n(".modal-dialog")[0], T.doc[0])
                            ? T.hide()
                            : T.show();
                      }),
                      T.me.clientWidth != T.page.width ||
                        T.me.clientHeight != T.page.height)
                    )
                      return T.lazyResize(30);
                  })),
                  T.observerbody.observe(l.body, {
                    childList: !0,
                    subtree: !0,
                    characterData: !1,
                    attributes: !0,
                    attributeFilter: ["class"],
                  })),
                !T.ispage && !T.haswrapper))
            ) {
              var R = T.win[0];
              !1 !== m
                ? ((T.observer = new m(function (e) {
                    e.forEach(T.onAttributeChange);
                  })),
                  T.observer.observe(R, {
                    childList: !0,
                    characterData: !1,
                    attributes: !0,
                    subtree: !1,
                  }),
                  (T.observerremover = new m(function (e) {
                    e.forEach(function (e) {
                      if (e.removedNodes.length > 0)
                        for (var o in e.removedNodes)
                          if (T && e.removedNodes[o] === R) return T.remove();
                    });
                  })),
                  T.observerremover.observe(R.parentNode, {
                    childList: !0,
                    characterData: !1,
                    attributes: !1,
                    subtree: !1,
                  }))
                : (T.bind(
                    R,
                    P.isie && !P.isie9 ? "propertychange" : "DOMAttrModified",
                    T.onAttributeChange
                  ),
                  P.isie9 &&
                    R.attachEvent("onpropertychange", T.onAttributeChange),
                  T.bind(R, "DOMNodeRemoved", function (e) {
                    e.target === R && T.remove();
                  }));
            }
            !T.ispage && M.boxzoom && T.bind(a, "resize", T.resizeZoom),
              T.istextarea &&
                (T.bind(T.win, "keydown", T.lazyResize),
                T.bind(T.win, "mouseup", T.lazyResize)),
              T.lazyResize(30);
          }
          if ("IFRAME" == this.doc[0].nodeName) {
            var _ = function () {
              T.iframexd = !1;
              var o;
              try {
                (o =
                  "contentDocument" in this
                    ? this.contentDocument
                    : this.contentWindow._doc).domain;
              } catch (e) {
                (T.iframexd = !0), (o = !1);
              }
              if (T.iframexd)
                return (
                  "console" in a &&
                    console.log("NiceScroll error: policy restriced iframe"),
                  !0
                );
              if (
                ((T.forcescreen = !0),
                T.isiframe &&
                  ((T.iframe = {
                    doc: n(o),
                    html: T.doc.contents().find("html")[0],
                    body: T.doc.contents().find("body")[0],
                  }),
                  (T.getContentSize = function () {
                    return {
                      w: Math.max(
                        T.iframe.html.scrollWidth,
                        T.iframe.body.scrollWidth
                      ),
                      h: Math.max(
                        T.iframe.html.scrollHeight,
                        T.iframe.body.scrollHeight
                      ),
                    };
                  }),
                  (T.docscroll = n(T.iframe.body))),
                !P.isios && M.iframeautoresize && !T.isiframe)
              ) {
                T.win.scrollTop(0), T.doc.height("");
                var t = Math.max(
                  o.getElementsByTagName("html")[0].scrollHeight,
                  o.body.scrollHeight
                );
                T.doc.height(t);
              }
              T.lazyResize(30),
                T.css(n(T.iframe.body), e),
                P.isios &&
                  T.haswrapper &&
                  T.css(n(o.body), {
                    "-webkit-transform": "translate3d(0,0,0)",
                  }),
                "contentWindow" in this
                  ? T.bind(this.contentWindow, "scroll", T.onscroll)
                  : T.bind(o, "scroll", T.onscroll),
                M.enablemousewheel && T.mousewheel(o, T.onmousewheel),
                M.enablekeyboard &&
                  T.bind(o, P.isopera ? "keypress" : "keydown", T.onkeypress),
                P.cantouch
                  ? (T.bind(o, "touchstart", T.ontouchstart),
                    T.bind(o, "touchmove", T.ontouchmove))
                  : M.emulatetouch &&
                    (T.bind(o, "mousedown", T.ontouchstart),
                    T.bind(o, "mousemove", function (e) {
                      return T.ontouchmove(e, !0);
                    }),
                    M.grabcursorenabled &&
                      P.cursorgrabvalue &&
                      T.css(n(o.body), { cursor: P.cursorgrabvalue })),
                T.bind(o, "mouseup", T.ontouchend),
                T.zoom &&
                  (M.dblclickzoom && T.bind(o, "dblclick", T.doZoom),
                  T.ongesturezoom && T.bind(o, "gestureend", T.ongesturezoom));
            };
            this.doc[0].readyState &&
              "complete" === this.doc[0].readyState &&
              setTimeout(function () {
                _.call(T.doc[0], !1);
              }, 500),
              T.bind(this.doc, "load", _);
          }
        }),
        (this.showCursor = function (e, o) {
          if (
            (T.cursortimeout &&
              (clearTimeout(T.cursortimeout), (T.cursortimeout = 0)),
            T.rail)
          ) {
            if (
              (T.autohidedom &&
                (T.autohidedom.stop().css({ opacity: M.cursoropacitymax }),
                (T.cursoractive = !0)),
              (T.rail.drag && 1 == T.rail.drag.pt) ||
                (void 0 !== e &&
                  !1 !== e &&
                  (T.scroll.y = (e / T.scrollratio.y) | 0),
                void 0 !== o && (T.scroll.x = (o / T.scrollratio.x) | 0)),
              T.cursor.css({ height: T.cursorheight, top: T.scroll.y }),
              T.cursorh)
            ) {
              var t = T.hasreversehr
                ? T.scrollvaluemaxw - T.scroll.x
                : T.scroll.x;
              T.cursorh.css({
                width: T.cursorwidth,
                left: !T.rail.align && T.rail.visibility ? t + T.rail.width : t,
              }),
                (T.cursoractive = !0);
            }
            T.zoom && T.zoom.stop().css({ opacity: M.cursoropacitymax });
          }
        }),
        (this.hideCursor = function (e) {
          T.cursortimeout ||
            (T.rail &&
              T.autohidedom &&
              ((T.hasmousefocus && "leave" === M.autohidemode) ||
                (T.cursortimeout = setTimeout(function () {
                  (T.rail.active && T.showonmouseevent) ||
                    (T.autohidedom
                      .stop()
                      .animate({ opacity: M.cursoropacitymin }),
                    T.zoom &&
                      T.zoom.stop().animate({ opacity: M.cursoropacitymin }),
                    (T.cursoractive = !1)),
                    (T.cursortimeout = 0);
                }, e || M.hidecursordelay))));
        }),
        (this.noticeCursor = function (e, o, t) {
          T.showCursor(o, t), T.rail.active || T.hideCursor(e);
        }),
        (this.getContentSize = T.ispage
          ? function () {
              return {
                w: Math.max(l.body.scrollWidth, l.documentElement.scrollWidth),
                h: Math.max(
                  l.body.scrollHeight,
                  l.documentElement.scrollHeight
                ),
              };
            }
          : T.haswrapper
          ? function () {
              return { w: T.doc[0].offsetWidth, h: T.doc[0].offsetHeight };
            }
          : function () {
              return {
                w: T.docscroll[0].scrollWidth,
                h: T.docscroll[0].scrollHeight,
              };
            }),
        (this.onResize = function (e, o) {
          if (!T || !T.win) return !1;
          var t = T.page.maxh,
            r = T.page.maxw,
            i = T.view.h,
            s = T.view.w;
          if (
            ((T.view = {
              w: T.ispage ? T.win.width() : T.win[0].clientWidth,
              h: T.ispage ? T.win.height() : T.win[0].clientHeight,
            }),
            (T.page = o || T.getContentSize()),
            (T.page.maxh = Math.max(0, T.page.h - T.view.h)),
            (T.page.maxw = Math.max(0, T.page.w - T.view.w)),
            T.page.maxh == t &&
              T.page.maxw == r &&
              T.view.w == s &&
              T.view.h == i)
          ) {
            if (T.ispage) return T;
            var n = T.win.offset();
            if (T.lastposition) {
              var l = T.lastposition;
              if (l.top == n.top && l.left == n.left) return T;
            }
            T.lastposition = n;
          }
          return (
            0 === T.page.maxh
              ? (T.hideRail(),
                (T.scrollvaluemax = 0),
                (T.scroll.y = 0),
                (T.scrollratio.y = 0),
                (T.cursorheight = 0),
                T.setScrollTop(0),
                T.rail && (T.rail.scrollable = !1))
              : ((T.page.maxh -= M.railpadding.top + M.railpadding.bottom),
                (T.rail.scrollable = !0)),
            0 === T.page.maxw
              ? (T.hideRailHr(),
                (T.scrollvaluemaxw = 0),
                (T.scroll.x = 0),
                (T.scrollratio.x = 0),
                (T.cursorwidth = 0),
                T.setScrollLeft(0),
                T.railh && (T.railh.scrollable = !1))
              : ((T.page.maxw -= M.railpadding.left + M.railpadding.right),
                T.railh && (T.railh.scrollable = M.horizrailenabled)),
            (T.railslocked =
              T.locked || (0 === T.page.maxh && 0 === T.page.maxw)),
            T.railslocked
              ? (T.ispage || T.updateScrollBar(T.view), !1)
              : (T.hidden ||
                  (T.rail.visibility || T.showRail(),
                  T.railh && !T.railh.visibility && T.showRailHr()),
                T.istextarea &&
                  T.win.css("resize") &&
                  "none" != T.win.css("resize") &&
                  (T.view.h -= 20),
                (T.cursorheight = Math.min(
                  T.view.h,
                  Math.round(T.view.h * (T.view.h / T.page.h))
                )),
                (T.cursorheight = M.cursorfixedheight
                  ? M.cursorfixedheight
                  : Math.max(M.cursorminheight, T.cursorheight)),
                (T.cursorwidth = Math.min(
                  T.view.w,
                  Math.round(T.view.w * (T.view.w / T.page.w))
                )),
                (T.cursorwidth = M.cursorfixedheight
                  ? M.cursorfixedheight
                  : Math.max(M.cursorminheight, T.cursorwidth)),
                (T.scrollvaluemax =
                  T.view.h -
                  T.cursorheight -
                  (M.railpadding.top + M.railpadding.bottom)),
                T.hasborderbox ||
                  (T.scrollvaluemax -=
                    T.cursor[0].offsetHeight - T.cursor[0].clientHeight),
                T.railh &&
                  ((T.railh.width =
                    T.page.maxh > 0 ? T.view.w - T.rail.width : T.view.w),
                  (T.scrollvaluemaxw =
                    T.railh.width -
                    T.cursorwidth -
                    (M.railpadding.left + M.railpadding.right))),
                T.ispage || T.updateScrollBar(T.view),
                (T.scrollratio = {
                  x: T.page.maxw / T.scrollvaluemaxw,
                  y: T.page.maxh / T.scrollvaluemax,
                }),
                T.getScrollTop() > T.page.maxh
                  ? T.doScrollTop(T.page.maxh)
                  : ((T.scroll.y = (T.getScrollTop() / T.scrollratio.y) | 0),
                    (T.scroll.x = (T.getScrollLeft() / T.scrollratio.x) | 0),
                    T.cursoractive && T.noticeCursor()),
                T.scroll.y &&
                  0 === T.getScrollTop() &&
                  T.doScrollTo((T.scroll.y * T.scrollratio.y) | 0),
                T)
          );
        }),
        (this.resize = T.onResize);
      var O = 0;
      (this.onscreenresize = function (e) {
        clearTimeout(O);
        var o = !T.ispage && !T.haswrapper;
        o && T.hideRails(),
          (O = setTimeout(function () {
            T && (o && T.showRails(), T.resize()), (O = 0);
          }, 120));
      }),
        (this.lazyResize = function (e) {
          return (
            clearTimeout(O),
            (e = isNaN(e) ? 240 : e),
            (O = setTimeout(function () {
              T && T.resize(), (O = 0);
            }, e)),
            T
          );
        }),
        (this.jqbind = function (e, o, t) {
          T.events.push({ e: e, n: o, f: t, q: !0 }), n(e).on(o, t);
        }),
        (this.mousewheel = function (e, o, t) {
          var r = "jquery" in e ? e[0] : e;
          if ("onwheel" in l.createElement("div"))
            T._bind(r, "wheel", o, t || !1);
          else {
            var i = void 0 !== l.onmousewheel ? "mousewheel" : "DOMMouseScroll";
            S(r, i, o, t || !1),
              "DOMMouseScroll" == i && S(r, "MozMousePixelScroll", o, t || !1);
          }
        });
      var Y = !1;
      if (P.haseventlistener) {
        try {
          var H = Object.defineProperty({}, "passive", {
            get: function () {
              Y = !0;
            },
          });
          a.addEventListener("test", null, H);
        } catch (e) {}
        (this.stopPropagation = function (e) {
          return (
            !!e && ((e = e.original ? e.original : e).stopPropagation(), !1)
          );
        }),
          (this.cancelEvent = function (e) {
            return (
              e.cancelable && e.preventDefault(),
              e.stopImmediatePropagation(),
              e.preventManipulation && e.preventManipulation(),
              !1
            );
          });
      } else
        (Event.prototype.preventDefault = function () {
          this.returnValue = !1;
        }),
          (Event.prototype.stopPropagation = function () {
            this.cancelBubble = !0;
          }),
          (a.constructor.prototype.addEventListener =
            l.constructor.prototype.addEventListener =
            Element.prototype.addEventListener =
              function (e, o, t) {
                this.attachEvent("on" + e, o);
              }),
          (a.constructor.prototype.removeEventListener =
            l.constructor.prototype.removeEventListener =
            Element.prototype.removeEventListener =
              function (e, o, t) {
                this.detachEvent("on" + e, o);
              }),
          (this.cancelEvent = function (e) {
            return (
              (e = e || a.event) &&
                ((e.cancelBubble = !0), (e.cancel = !0), (e.returnValue = !1)),
              !1
            );
          }),
          (this.stopPropagation = function (e) {
            return (e = e || a.event) && (e.cancelBubble = !0), !1;
          });
      (this.delegate = function (e, o, t, r, i) {
        var s = d[o] || !1;
        s ||
          ((s = {
            a: [],
            l: [],
            f: function (e) {
              for (var o = s.l, t = !1, r = o.length - 1; r >= 0; r--)
                if (!1 === (t = o[r].call(e.target, e))) return !1;
              return t;
            },
          }),
          T.bind(e, o, s.f, r, i),
          (d[o] = s)),
          T.ispage
            ? ((s.a = [T.id].concat(s.a)), (s.l = [t].concat(s.l)))
            : (s.a.push(T.id), s.l.push(t));
      }),
        (this.undelegate = function (e, o, t, r, i) {
          var s = d[o] || !1;
          if (s && s.l)
            for (var n = 0, l = s.l.length; n < l; n++)
              s.a[n] === T.id &&
                (s.a.splice(n),
                s.l.splice(n),
                0 === s.a.length && (T._unbind(e, o, s.l.f), (d[o] = null)));
        }),
        (this.bind = function (e, o, t, r, i) {
          var s = "jquery" in e ? e[0] : e;
          T._bind(s, o, t, r || !1, i || !1);
        }),
        (this._bind = function (e, o, t, r, i) {
          T.events.push({ e: e, n: o, f: t, b: r, q: !1 }),
            Y && i
              ? e.addEventListener(o, t, { passive: !1, capture: r })
              : e.addEventListener(o, t, r || !1);
        }),
        (this._unbind = function (e, o, t, r) {
          d[o] ? T.undelegate(e, o, t, r) : e.removeEventListener(o, t, r);
        }),
        (this.unbindAll = function () {
          for (var e = 0; e < T.events.length; e++) {
            var o = T.events[e];
            o.q ? o.e.unbind(o.n, o.f) : T._unbind(o.e, o.n, o.f, o.b);
          }
        }),
        (this.showRails = function () {
          return T.showRail().showRailHr();
        }),
        (this.showRail = function () {
          return (
            0 === T.page.maxh ||
              (!T.ispage && "none" == T.win.css("display")) ||
              ((T.rail.visibility = !0), T.rail.css("display", "block")),
            T
          );
        }),
        (this.showRailHr = function () {
          return (
            T.railh &&
              (0 === T.page.maxw ||
                (!T.ispage && "none" == T.win.css("display")) ||
                ((T.railh.visibility = !0), T.railh.css("display", "block"))),
            T
          );
        }),
        (this.hideRails = function () {
          return T.hideRail().hideRailHr();
        }),
        (this.hideRail = function () {
          return (T.rail.visibility = !1), T.rail.css("display", "none"), T;
        }),
        (this.hideRailHr = function () {
          return (
            T.railh &&
              ((T.railh.visibility = !1), T.railh.css("display", "none")),
            T
          );
        }),
        (this.show = function () {
          return (T.hidden = !1), (T.railslocked = !1), T.showRails();
        }),
        (this.hide = function () {
          return (T.hidden = !0), (T.railslocked = !0), T.hideRails();
        }),
        (this.toggle = function () {
          return T.hidden ? T.show() : T.hide();
        }),
        (this.remove = function () {
          T.stop(), T.cursortimeout && clearTimeout(T.cursortimeout);
          for (var e in T.delaylist) T.delaylist[e] && h(T.delaylist[e].h);
          T.doZoomOut(),
            T.unbindAll(),
            P.isie9 &&
              T.win[0].detachEvent("onpropertychange", T.onAttributeChange),
            !1 !== T.observer && T.observer.disconnect(),
            !1 !== T.observerremover && T.observerremover.disconnect(),
            !1 !== T.observerbody && T.observerbody.disconnect(),
            (T.events = null),
            T.cursor && T.cursor.remove(),
            T.cursorh && T.cursorh.remove(),
            T.rail && T.rail.remove(),
            T.railh && T.railh.remove(),
            T.zoom && T.zoom.remove();
          for (var o = 0; o < T.saved.css.length; o++) {
            var t = T.saved.css[o];
            t[0].css(t[1], void 0 === t[2] ? "" : t[2]);
          }
          (T.saved = !1), T.me.data("__nicescroll", "");
          var r = n.nicescroll;
          r.each(function (e) {
            if (this && this.id === T.id) {
              delete r[e];
              for (var o = ++e; o < r.length; o++, e++) r[e] = r[o];
              --r.length && delete r[r.length];
            }
          });
          for (var i in T) (T[i] = null), delete T[i];
          T = null;
        }),
        (this.scrollstart = function (e) {
          return (this.onscrollstart = e), T;
        }),
        (this.scrollend = function (e) {
          return (this.onscrollend = e), T;
        }),
        (this.scrollcancel = function (e) {
          return (this.onscrollcancel = e), T;
        }),
        (this.zoomin = function (e) {
          return (this.onzoomin = e), T;
        }),
        (this.zoomout = function (e) {
          return (this.onzoomout = e), T;
        }),
        (this.isScrollable = function (e) {
          var o = e.target ? e.target : e;
          if ("OPTION" == o.nodeName) return !0;
          for (
            ;
            o &&
            1 == o.nodeType &&
            o !== this.me[0] &&
            !/^BODY|HTML/.test(o.nodeName);

          ) {
            var t = n(o),
              r =
                t.css("overflowY") ||
                t.css("overflowX") ||
                t.css("overflow") ||
                "";
            if (/scroll|auto/.test(r)) return o.clientHeight != o.scrollHeight;
            o = !!o.parentNode && o.parentNode;
          }
          return !1;
        }),
        (this.getViewport = function (e) {
          for (
            var o = !(!e || !e.parentNode) && e.parentNode;
            o && 1 == o.nodeType && !/^BODY|HTML/.test(o.nodeName);

          ) {
            var t = n(o);
            if (/fixed|absolute/.test(t.css("position"))) return t;
            var r =
              t.css("overflowY") ||
              t.css("overflowX") ||
              t.css("overflow") ||
              "";
            if (/scroll|auto/.test(r) && o.clientHeight != o.scrollHeight)
              return t;
            if (t.getNiceScroll().length > 0) return t;
            o = !!o.parentNode && o.parentNode;
          }
          return !1;
        }),
        (this.triggerScrollStart = function (e, o, t, r, i) {
          if (T.onscrollstart) {
            var s = {
              type: "scrollstart",
              current: { x: e, y: o },
              request: { x: t, y: r },
              end: { x: T.newscrollx, y: T.newscrolly },
              speed: i,
            };
            T.onscrollstart.call(T, s);
          }
        }),
        (this.triggerScrollEnd = function () {
          if (T.onscrollend) {
            var e = T.getScrollLeft(),
              o = T.getScrollTop(),
              t = {
                type: "scrollend",
                current: { x: e, y: o },
                end: { x: e, y: o },
              };
            T.onscrollend.call(T, t);
          }
        });
      var B = 0,
        X = 0,
        D = 0,
        A = 1,
        q = !1;
      if (
        ((this.onmousewheel = function (e) {
          if (T.wheelprevented || T.locked) return !1;
          if (T.railslocked)
            return T.debounced("checkunlock", T.resize, 250), !1;
          if (T.rail.drag) return T.cancelEvent(e);
          if (
            ("auto" === M.oneaxismousemode &&
              0 !== e.deltaX &&
              (M.oneaxismousemode = !1),
            M.oneaxismousemode && 0 === e.deltaX && !T.rail.scrollable)
          )
            return !T.railh || !T.railh.scrollable || T.onmousewheelhr(e);
          var o = f(),
            t = !1;
          if (
            (M.preservenativescrolling &&
              T.checkarea + 600 < o &&
              ((T.nativescrollingarea = T.isScrollable(e)), (t = !0)),
            (T.checkarea = o),
            T.nativescrollingarea)
          )
            return !0;
          var r = k(e, !1, t);
          return r && (T.checkarea = 0), r;
        }),
        (this.onmousewheelhr = function (e) {
          if (!T.wheelprevented) {
            if (T.railslocked || !T.railh.scrollable) return !0;
            if (T.rail.drag) return T.cancelEvent(e);
            var o = f(),
              t = !1;
            return (
              M.preservenativescrolling &&
                T.checkarea + 600 < o &&
                ((T.nativescrollingarea = T.isScrollable(e)), (t = !0)),
              (T.checkarea = o),
              !!T.nativescrollingarea ||
                (T.railslocked ? T.cancelEvent(e) : k(e, !0, t))
            );
          }
        }),
        (this.stop = function () {
          return (
            T.cancelScroll(),
            T.scrollmon && T.scrollmon.stop(),
            (T.cursorfreezed = !1),
            (T.scroll.y = Math.round(T.getScrollTop() * (1 / T.scrollratio.y))),
            T.noticeCursor(),
            T
          );
        }),
        (this.getTransitionSpeed = function (e) {
          return (80 + (e / 72) * M.scrollspeed) | 0;
        }),
        M.smoothscroll)
      )
        if (
          T.ishwscroll &&
          P.hastransition &&
          M.usetransition &&
          M.smoothscroll
        ) {
          var j = "";
          (this.resetTransition = function () {
            (j = ""), T.doc.css(P.prefixstyle + "transition-duration", "0ms");
          }),
            (this.prepareTransition = function (e, o) {
              var t = o ? e : T.getTransitionSpeed(e),
                r = t + "ms";
              return (
                j !== r &&
                  ((j = r),
                  T.doc.css(P.prefixstyle + "transition-duration", r)),
                t
              );
            }),
            (this.doScrollLeft = function (e, o) {
              var t = T.scrollrunning ? T.newscrolly : T.getScrollTop();
              T.doScrollPos(e, t, o);
            }),
            (this.doScrollTop = function (e, o) {
              var t = T.scrollrunning ? T.newscrollx : T.getScrollLeft();
              T.doScrollPos(t, e, o);
            }),
            (this.cursorupdate = {
              running: !1,
              start: function () {
                var e = this;
                if (!e.running) {
                  e.running = !0;
                  var o = function () {
                    e.running && u(o),
                      T.showCursor(T.getScrollTop(), T.getScrollLeft()),
                      T.notifyScrollEvent(T.win[0]);
                  };
                  u(o);
                }
              },
              stop: function () {
                this.running = !1;
              },
            }),
            (this.doScrollPos = function (e, o, t) {
              var r = T.getScrollTop(),
                i = T.getScrollLeft();
              if (
                (((T.newscrolly - r) * (o - r) < 0 ||
                  (T.newscrollx - i) * (e - i) < 0) &&
                  T.cancelScroll(),
                M.bouncescroll
                  ? (o < 0
                      ? (o = (o / 2) | 0)
                      : o > T.page.maxh &&
                        (o = (T.page.maxh + (o - T.page.maxh) / 2) | 0),
                    e < 0
                      ? (e = (e / 2) | 0)
                      : e > T.page.maxw &&
                        (e = (T.page.maxw + (e - T.page.maxw) / 2) | 0))
                  : (o < 0 ? (o = 0) : o > T.page.maxh && (o = T.page.maxh),
                    e < 0 ? (e = 0) : e > T.page.maxw && (e = T.page.maxw)),
                T.scrollrunning && e == T.newscrollx && o == T.newscrolly)
              )
                return !1;
              (T.newscrolly = o), (T.newscrollx = e);
              var s = T.getScrollTop(),
                n = T.getScrollLeft(),
                l = {};
              (l.x = e - n), (l.y = o - s);
              var a = 0 | Math.sqrt(l.x * l.x + l.y * l.y),
                c = T.prepareTransition(a);
              T.scrollrunning ||
                ((T.scrollrunning = !0),
                T.triggerScrollStart(n, s, e, o, c),
                T.cursorupdate.start()),
                (T.scrollendtrapped = !0),
                P.transitionend ||
                  (T.scrollendtrapped && clearTimeout(T.scrollendtrapped),
                  (T.scrollendtrapped = setTimeout(
                    T.onScrollTransitionEnd,
                    c
                  ))),
                T.setScrollTop(T.newscrolly),
                T.setScrollLeft(T.newscrollx);
            }),
            (this.cancelScroll = function () {
              if (!T.scrollendtrapped) return !0;
              var e = T.getScrollTop(),
                o = T.getScrollLeft();
              return (
                (T.scrollrunning = !1),
                P.transitionend || clearTimeout(P.transitionend),
                (T.scrollendtrapped = !1),
                T.resetTransition(),
                T.setScrollTop(e),
                T.railh && T.setScrollLeft(o),
                T.timerscroll &&
                  T.timerscroll.tm &&
                  clearInterval(T.timerscroll.tm),
                (T.timerscroll = !1),
                (T.cursorfreezed = !1),
                T.cursorupdate.stop(),
                T.showCursor(e, o),
                T
              );
            }),
            (this.onScrollTransitionEnd = function () {
              if (T.scrollendtrapped) {
                var e = T.getScrollTop(),
                  o = T.getScrollLeft();
                if (
                  (e < 0 ? (e = 0) : e > T.page.maxh && (e = T.page.maxh),
                  o < 0 ? (o = 0) : o > T.page.maxw && (o = T.page.maxw),
                  e != T.newscrolly || o != T.newscrollx)
                )
                  return T.doScrollPos(o, e, M.snapbackspeed);
                T.scrollrunning && T.triggerScrollEnd(),
                  (T.scrollrunning = !1),
                  (T.scrollendtrapped = !1),
                  T.resetTransition(),
                  (T.timerscroll = !1),
                  T.setScrollTop(e),
                  T.railh && T.setScrollLeft(o),
                  T.cursorupdate.stop(),
                  T.noticeCursor(!1, e, o),
                  (T.cursorfreezed = !1);
              }
            });
        } else
          (this.doScrollLeft = function (e, o) {
            var t = T.scrollrunning ? T.newscrolly : T.getScrollTop();
            T.doScrollPos(e, t, o);
          }),
            (this.doScrollTop = function (e, o) {
              var t = T.scrollrunning ? T.newscrollx : T.getScrollLeft();
              T.doScrollPos(t, e, o);
            }),
            (this.doScrollPos = function (e, o, t) {
              var r = T.getScrollTop(),
                i = T.getScrollLeft();
              ((T.newscrolly - r) * (o - r) < 0 ||
                (T.newscrollx - i) * (e - i) < 0) &&
                T.cancelScroll();
              var s = !1;
              if (
                ((T.bouncescroll && T.rail.visibility) ||
                  (o < 0
                    ? ((o = 0), (s = !0))
                    : o > T.page.maxh && ((o = T.page.maxh), (s = !0))),
                (T.bouncescroll && T.railh.visibility) ||
                  (e < 0
                    ? ((e = 0), (s = !0))
                    : e > T.page.maxw && ((e = T.page.maxw), (s = !0))),
                T.scrollrunning && T.newscrolly === o && T.newscrollx === e)
              )
                return !0;
              (T.newscrolly = o),
                (T.newscrollx = e),
                (T.dst = {}),
                (T.dst.x = e - i),
                (T.dst.y = o - r),
                (T.dst.px = i),
                (T.dst.py = r);
              var n = 0 | Math.sqrt(T.dst.x * T.dst.x + T.dst.y * T.dst.y),
                l = T.getTransitionSpeed(n);
              T.bzscroll = {};
              var a = s ? 1 : 0.58;
              (T.bzscroll.x = new R(i, T.newscrollx, l, 0, 0, a, 1)),
                (T.bzscroll.y = new R(r, T.newscrolly, l, 0, 0, a, 1));
              f();
              var c = function () {
                if (T.scrollrunning) {
                  var e = T.bzscroll.y.getPos();
                  T.setScrollLeft(T.bzscroll.x.getNow()),
                    T.setScrollTop(T.bzscroll.y.getNow()),
                    e <= 1
                      ? (T.timer = u(c))
                      : ((T.scrollrunning = !1),
                        (T.timer = 0),
                        T.triggerScrollEnd());
                }
              };
              T.scrollrunning ||
                (T.triggerScrollStart(i, r, e, o, l),
                (T.scrollrunning = !0),
                (T.timer = u(c)));
            }),
            (this.cancelScroll = function () {
              return (
                T.timer && h(T.timer),
                (T.timer = 0),
                (T.bzscroll = !1),
                (T.scrollrunning = !1),
                T
              );
            });
      else
        (this.doScrollLeft = function (e, o) {
          var t = T.getScrollTop();
          T.doScrollPos(e, t, o);
        }),
          (this.doScrollTop = function (e, o) {
            var t = T.getScrollLeft();
            T.doScrollPos(t, e, o);
          }),
          (this.doScrollPos = function (e, o, t) {
            var r = e > T.page.maxw ? T.page.maxw : e;
            r < 0 && (r = 0);
            var i = o > T.page.maxh ? T.page.maxh : o;
            i < 0 && (i = 0),
              T.synched("scroll", function () {
                T.setScrollTop(i), T.setScrollLeft(r);
              });
          }),
          (this.cancelScroll = function () {});
      (this.doScrollBy = function (e, o) {
        z(0, e);
      }),
        (this.doScrollLeftBy = function (e, o) {
          z(e, 0);
        }),
        (this.doScrollTo = function (e, o) {
          var t = o ? Math.round(e * T.scrollratio.y) : e;
          t < 0 ? (t = 0) : t > T.page.maxh && (t = T.page.maxh),
            (T.cursorfreezed = !1),
            T.doScrollTop(e);
        }),
        (this.checkContentSize = function () {
          var e = T.getContentSize();
          (e.h == T.page.h && e.w == T.page.w) || T.resize(!1, e);
        }),
        (T.onscroll = function (e) {
          T.rail.drag ||
            T.cursorfreezed ||
            T.synched("scroll", function () {
              (T.scroll.y = Math.round(T.getScrollTop() / T.scrollratio.y)),
                T.railh &&
                  (T.scroll.x = Math.round(
                    T.getScrollLeft() / T.scrollratio.x
                  )),
                T.noticeCursor();
            });
        }),
        T.bind(T.docscroll, "scroll", T.onscroll),
        (this.doZoomIn = function (e) {
          if (!T.zoomactive) {
            (T.zoomactive = !0), (T.zoomrestore = { style: {} });
            var o = [
                "position",
                "top",
                "left",
                "zIndex",
                "backgroundColor",
                "marginTop",
                "marginBottom",
                "marginLeft",
                "marginRight",
              ],
              t = T.win[0].style;
            for (var r in o) {
              var i = o[r];
              T.zoomrestore.style[i] = void 0 !== t[i] ? t[i] : "";
            }
            (T.zoomrestore.style.width = T.win.css("width")),
              (T.zoomrestore.style.height = T.win.css("height")),
              (T.zoomrestore.padding = {
                w: T.win.outerWidth() - T.win.width(),
                h: T.win.outerHeight() - T.win.height(),
              }),
              P.isios4 &&
                ((T.zoomrestore.scrollTop = c.scrollTop()), c.scrollTop(0)),
              T.win.css({
                position: P.isios4 ? "absolute" : "fixed",
                top: 0,
                left: 0,
                zIndex: s + 100,
                margin: 0,
              });
            var n = T.win.css("backgroundColor");
            return (
              ("" === n ||
                /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(n)) &&
                T.win.css("backgroundColor", "#fff"),
              T.rail.css({ zIndex: s + 101 }),
              T.zoom.css({ zIndex: s + 102 }),
              T.zoom.css("backgroundPosition", "0 -18px"),
              T.resizeZoom(),
              T.onzoomin && T.onzoomin.call(T),
              T.cancelEvent(e)
            );
          }
        }),
        (this.doZoomOut = function (e) {
          if (T.zoomactive)
            return (
              (T.zoomactive = !1),
              T.win.css("margin", ""),
              T.win.css(T.zoomrestore.style),
              P.isios4 && c.scrollTop(T.zoomrestore.scrollTop),
              T.rail.css({ "z-index": T.zindex }),
              T.zoom.css({ "z-index": T.zindex }),
              (T.zoomrestore = !1),
              T.zoom.css("backgroundPosition", "0 0"),
              T.onResize(),
              T.onzoomout && T.onzoomout.call(T),
              T.cancelEvent(e)
            );
        }),
        (this.doZoom = function (e) {
          return T.zoomactive ? T.doZoomOut(e) : T.doZoomIn(e);
        }),
        (this.resizeZoom = function () {
          if (T.zoomactive) {
            var e = T.getScrollTop();
            T.win.css({
              width: c.width() - T.zoomrestore.padding.w + "px",
              height: c.height() - T.zoomrestore.padding.h + "px",
            }),
              T.onResize(),
              T.setScrollTop(Math.min(T.page.maxh, e));
          }
        }),
        this.init(),
        n.nicescroll.push(this);
    },
    y = function (e) {
      var o = this;
      (this.nc = e),
        (this.lastx = 0),
        (this.lasty = 0),
        (this.speedx = 0),
        (this.speedy = 0),
        (this.lasttime = 0),
        (this.steptime = 0),
        (this.snapx = !1),
        (this.snapy = !1),
        (this.demulx = 0),
        (this.demuly = 0),
        (this.lastscrollx = -1),
        (this.lastscrolly = -1),
        (this.chkx = 0),
        (this.chky = 0),
        (this.timer = 0),
        (this.reset = function (e, t) {
          o.stop(),
            (o.steptime = 0),
            (o.lasttime = f()),
            (o.speedx = 0),
            (o.speedy = 0),
            (o.lastx = e),
            (o.lasty = t),
            (o.lastscrollx = -1),
            (o.lastscrolly = -1);
        }),
        (this.update = function (e, t) {
          var r = f();
          (o.steptime = r - o.lasttime), (o.lasttime = r);
          var i = t - o.lasty,
            s = e - o.lastx,
            n = o.nc.getScrollTop() + i,
            l = o.nc.getScrollLeft() + s;
          (o.snapx = l < 0 || l > o.nc.page.maxw),
            (o.snapy = n < 0 || n > o.nc.page.maxh),
            (o.speedx = s),
            (o.speedy = i),
            (o.lastx = e),
            (o.lasty = t);
        }),
        (this.stop = function () {
          o.nc.unsynched("domomentum2d"),
            o.timer && clearTimeout(o.timer),
            (o.timer = 0),
            (o.lastscrollx = -1),
            (o.lastscrolly = -1);
        }),
        (this.doSnapy = function (e, t) {
          var r = !1;
          t < 0
            ? ((t = 0), (r = !0))
            : t > o.nc.page.maxh && ((t = o.nc.page.maxh), (r = !0)),
            e < 0
              ? ((e = 0), (r = !0))
              : e > o.nc.page.maxw && ((e = o.nc.page.maxw), (r = !0)),
            r
              ? o.nc.doScrollPos(e, t, o.nc.opt.snapbackspeed)
              : o.nc.triggerScrollEnd();
        }),
        (this.doMomentum = function (e) {
          var t = f(),
            r = e ? t + e : o.lasttime,
            i = o.nc.getScrollLeft(),
            s = o.nc.getScrollTop(),
            n = o.nc.page.maxh,
            l = o.nc.page.maxw;
          (o.speedx = l > 0 ? Math.min(60, o.speedx) : 0),
            (o.speedy = n > 0 ? Math.min(60, o.speedy) : 0);
          var a = r && t - r <= 60;
          (s < 0 || s > n || i < 0 || i > l) && (a = !1);
          var c = !(!o.speedy || !a) && o.speedy,
            d = !(!o.speedx || !a) && o.speedx;
          if (c || d) {
            var u = Math.max(16, o.steptime);
            if (u > 50) {
              var h = u / 50;
              (o.speedx *= h), (o.speedy *= h), (u = 50);
            }
            (o.demulxy = 0),
              (o.lastscrollx = o.nc.getScrollLeft()),
              (o.chkx = o.lastscrollx),
              (o.lastscrolly = o.nc.getScrollTop()),
              (o.chky = o.lastscrolly);
            var p = o.lastscrollx,
              m = o.lastscrolly,
              g = function () {
                var e = f() - t > 600 ? 0.04 : 0.02;
                o.speedx &&
                  ((p = Math.floor(o.lastscrollx - o.speedx * (1 - o.demulxy))),
                  (o.lastscrollx = p),
                  (p < 0 || p > l) && (e = 0.1)),
                  o.speedy &&
                    ((m = Math.floor(
                      o.lastscrolly - o.speedy * (1 - o.demulxy)
                    )),
                    (o.lastscrolly = m),
                    (m < 0 || m > n) && (e = 0.1)),
                  (o.demulxy = Math.min(1, o.demulxy + e)),
                  o.nc.synched("domomentum2d", function () {
                    if (o.speedx) {
                      o.nc.getScrollLeft();
                      (o.chkx = p), o.nc.setScrollLeft(p);
                    }
                    if (o.speedy) {
                      o.nc.getScrollTop();
                      (o.chky = m), o.nc.setScrollTop(m);
                    }
                    o.timer || (o.nc.hideCursor(), o.doSnapy(p, m));
                  }),
                  o.demulxy < 1
                    ? (o.timer = setTimeout(g, u))
                    : (o.stop(), o.nc.hideCursor(), o.doSnapy(p, m));
              };
            g();
          } else o.doSnapy(o.nc.getScrollLeft(), o.nc.getScrollTop());
        });
    },
    x = e.fn.scrollTop;
  (e.cssHooks.pageYOffset = {
    get: function (e, o, t) {
      var r = n.data(e, "__nicescroll") || !1;
      return r && r.ishwscroll ? r.getScrollTop() : x.call(e);
    },
    set: function (e, o) {
      var t = n.data(e, "__nicescroll") || !1;
      return (
        t && t.ishwscroll ? t.setScrollTop(parseInt(o)) : x.call(e, o), this
      );
    },
  }),
    (e.fn.scrollTop = function (e) {
      if (void 0 === e) {
        var o = !!this[0] && (n.data(this[0], "__nicescroll") || !1);
        return o && o.ishwscroll ? o.getScrollTop() : x.call(this);
      }
      return this.each(function () {
        var o = n.data(this, "__nicescroll") || !1;
        o && o.ishwscroll ? o.setScrollTop(parseInt(e)) : x.call(n(this), e);
      });
    });
  var S = e.fn.scrollLeft;
  (n.cssHooks.pageXOffset = {
    get: function (e, o, t) {
      var r = n.data(e, "__nicescroll") || !1;
      return r && r.ishwscroll ? r.getScrollLeft() : S.call(e);
    },
    set: function (e, o) {
      var t = n.data(e, "__nicescroll") || !1;
      return (
        t && t.ishwscroll ? t.setScrollLeft(parseInt(o)) : S.call(e, o), this
      );
    },
  }),
    (e.fn.scrollLeft = function (e) {
      if (void 0 === e) {
        var o = !!this[0] && (n.data(this[0], "__nicescroll") || !1);
        return o && o.ishwscroll ? o.getScrollLeft() : S.call(this);
      }
      return this.each(function () {
        var o = n.data(this, "__nicescroll") || !1;
        o && o.ishwscroll ? o.setScrollLeft(parseInt(e)) : S.call(n(this), e);
      });
    });
  var z = function (e) {
    var o = this;
    if (
      ((this.length = 0),
      (this.name = "nicescrollarray"),
      (this.each = function (e) {
        return n.each(o, e), o;
      }),
      (this.push = function (e) {
        (o[o.length] = e), o.length++;
      }),
      (this.eq = function (e) {
        return o[e];
      }),
      e)
    )
      for (var t = 0; t < e.length; t++) {
        var r = n.data(e[t], "__nicescroll") || !1;
        r && ((this[this.length] = r), this.length++);
      }
    return this;
  };
  !(function (e, o, t) {
    for (var r = 0, i = o.length; r < i; r++) t(e, o[r]);
  })(
    z.prototype,
    [
      "show",
      "hide",
      "toggle",
      "onResize",
      "resize",
      "remove",
      "stop",
      "doScrollPos",
    ],
    function (e, o) {
      e[o] = function () {
        var e = arguments;
        return this.each(function () {
          this[o].apply(this, e);
        });
      };
    }
  ),
    (e.fn.getNiceScroll = function (e) {
      return void 0 === e
        ? new z(this)
        : (this[e] && n.data(this[e], "__nicescroll")) || !1;
    }),
    ((e.expr.pseudos || e.expr[":"]).nicescroll = function (e) {
      return void 0 !== n.data(e, "__nicescroll");
    }),
    (n.fn.niceScroll = function (e, o) {
      void 0 !== o ||
        "object" != typeof e ||
        "jquery" in e ||
        ((o = e), (e = !1));
      var t = new z();
      return (
        this.each(function () {
          var r = n(this),
            i = n.extend({}, o);
          if (e) {
            var s = n(e);
            (i.doc = s.length > 1 ? n(e, r) : s), (i.win = r);
          }
          !("doc" in i) || "win" in i || (i.win = r);
          var l = r.data("__nicescroll") || !1;
          l ||
            ((i.doc = i.doc || r),
            (l = new b(i, r)),
            r.data("__nicescroll", l)),
            t.push(l);
        }),
        1 === t.length ? t[0] : t
      );
    }),
    (a.NiceScroll = {
      getjQuery: function () {
        return e;
      },
    }),
    n.nicescroll || ((n.nicescroll = new z()), (n.nicescroll.options = g));
});

/**
 * jquery-match-height master by @liabru
 * http://brm.io/jquery-match-height/
 * License: MIT
 */
!(function (t) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], t)
    : "undefined" != typeof module && module.exports
    ? (module.exports = t(require("jquery")))
    : t(jQuery);
})(function (t) {
  var e = -1,
    o = -1,
    a = function (t) {
      return parseFloat(t) || 0;
    },
    n = function (e) {
      var o = null,
        n = [];
      return (
        t(e).each(function () {
          var e = t(this),
            i = e.offset().top - a(e.css("margin-top")),
            r = n.length > 0 ? n[n.length - 1] : null;
          null === r
            ? n.push(e)
            : Math.floor(Math.abs(o - i)) <= 1
            ? (n[n.length - 1] = r.add(e))
            : n.push(e),
            (o = i);
        }),
        n
      );
    },
    i = function (e) {
      var o = { byRow: !0, property: "height", target: null, remove: !1 };
      return "object" == typeof e
        ? t.extend(o, e)
        : ("boolean" == typeof e
            ? (o.byRow = e)
            : "remove" === e && (o.remove = !0),
          o);
    },
    r = (t.fn.matchHeight = function (e) {
      var o = i(e);
      if (o.remove) {
        var a = this;
        return (
          this.css(o.property, ""),
          t.each(r._groups, function (t, e) {
            e.elements = e.elements.not(a);
          }),
          this
        );
      }
      return this.length <= 1 && !o.target
        ? this
        : (r._groups.push({ elements: this, options: o }),
          r._apply(this, o),
          this);
    });
  (r.version = "master"),
    (r._groups = []),
    (r._throttle = 80),
    (r._maintainScroll = !1),
    (r._beforeUpdate = null),
    (r._afterUpdate = null),
    (r._rows = n),
    (r._parse = a),
    (r._parseOptions = i),
    (r._apply = function (e, o) {
      var s = i(o),
        h = t(e),
        l = [h],
        c = t(window).scrollTop(),
        p = t("html").outerHeight(!0),
        u = h.parents().filter(":hidden");
      return (
        u.each(function () {
          var e = t(this);
          e.data("style-cache", e.attr("style"));
        }),
        u.css("display", "block"),
        s.byRow &&
          !s.target &&
          (h.each(function () {
            var e = t(this),
              o = e.css("display");
            "inline-block" !== o &&
              "flex" !== o &&
              "inline-flex" !== o &&
              (o = "block"),
              e.data("style-cache", e.attr("style")),
              e.css({
                display: o,
                "padding-top": "0",
                "padding-bottom": "0",
                "margin-top": "0",
                "margin-bottom": "0",
                "border-top-width": "0",
                "border-bottom-width": "0",
                height: "100px",
                overflow: "hidden",
              });
          }),
          (l = n(h)),
          h.each(function () {
            var e = t(this);
            e.attr("style", e.data("style-cache") || "");
          })),
        t.each(l, function (e, o) {
          var n = t(o),
            i = 0;
          if (s.target) i = s.target.outerHeight(!1);
          else {
            if (s.byRow && n.length <= 1) return void n.css(s.property, "");
            n.each(function () {
              var e = t(this),
                o = e.attr("style"),
                a = e.css("display");
              "inline-block" !== a &&
                "flex" !== a &&
                "inline-flex" !== a &&
                (a = "block");
              var n = { display: a };
              (n[s.property] = ""),
                e.css(n),
                e.outerHeight(!1) > i && (i = e.outerHeight(!1)),
                o ? e.attr("style", o) : e.css("display", "");
            });
          }
          n.each(function () {
            var e = t(this),
              o = 0;
            (s.target && e.is(s.target)) ||
              ("border-box" !== e.css("box-sizing") &&
                ((o +=
                  a(e.css("border-top-width")) +
                  a(e.css("border-bottom-width"))),
                (o += a(e.css("padding-top")) + a(e.css("padding-bottom")))),
              e.css(s.property, i - o + "px"));
          });
        }),
        u.each(function () {
          var e = t(this);
          e.attr("style", e.data("style-cache") || null);
        }),
        r._maintainScroll &&
          t(window).scrollTop((c / p) * t("html").outerHeight(!0)),
        this
      );
    }),
    (r._applyDataApi = function () {
      var e = {};
      t("[data-match-height], [data-mh]").each(function () {
        var o = t(this),
          a = o.attr("data-mh") || o.attr("data-match-height");
        e[a] = a in e ? e[a].add(o) : o;
      }),
        t.each(e, function () {
          this.matchHeight(!0);
        });
    });
  var s = function (e) {
    r._beforeUpdate && r._beforeUpdate(e, r._groups),
      t.each(r._groups, function () {
        r._apply(this.elements, this.options);
      }),
      r._afterUpdate && r._afterUpdate(e, r._groups);
  };
  (r._update = function (a, n) {
    if (n && "resize" === n.type) {
      var i = t(window).width();
      if (i === e) return;
      e = i;
    }
    a
      ? -1 === o &&
        (o = setTimeout(function () {
          s(n), (o = -1);
        }, r._throttle))
      : s(n);
  }),
    t(r._applyDataApi);
  var h = t.fn.on ? "on" : "bind";
  t(window)[h]("load", function (t) {
    r._update(!1, t);
  }),
    t(window)[h]("resize orientationchange", function (t) {
      r._update(!0, t);
    });
});

// Barfiller
/*
 * File: jquery.barfiller.js
 * Version: 1.0.1
 * Description: A plugin that fills bars with a percentage you set.
 * Author: 9bit Studios
 * Copyright 2012, 9bit Studios
 * http://www.9bitstudios.com
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

!(function (t) {
  t.fn.barfiller = function (i) {
    var n,
      e,
      o = t.extend(
        {
          barColor: "#16b597",
          tooltip: !0,
          duration: 1e3,
          animateOnResize: !0,
          symbol: "%",
        },
        i
      ),
      a = t(this),
      r = t.extend(o, i),
      s = a.width(),
      l = a.find(".fill"),
      u = a.find(".tip"),
      d = l.attr("data-percentage"),
      c = !1,
      f = {
        init: function () {
          return this.each(function () {
            f.getTransitionSupport() &&
              ((c = !0), (e = f.getTransitionPrefix())),
              f.appendHTML(),
              f.setEventHandlers(),
              f.initializeItems();
          });
        },
        appendHTML: function () {
          l.css("background", r.barColor),
            r.tooltip || u.css("display", "none"),
            u.text(d + r.symbol);
        },
        setEventHandlers: function () {
          r.animateOnResize &&
            t(window).on("resize", function (t) {
              clearTimeout(n),
                (n = setTimeout(function () {
                  f.refill();
                }, 300));
            });
        },
        initializeItems: function () {
          var t = f.calculateFill(d);
          a.find(".tipWrap").css({ display: "inline" }),
            c ? f.transitionFill(t) : f.animateFill(t);
        },
        getTransitionSupport: function () {
          var t = (document.body || document.documentElement).style;
          return (
            void 0 !== t.transition ||
            void 0 !== t.WebkitTransition ||
            void 0 !== t.MozTransition ||
            void 0 !== t.MsTransition ||
            void 0 !== t.OTransition
          );
        },
        getTransitionPrefix: function () {
          return /mozilla/.test(navigator.userAgent.toLowerCase()) &&
            !/webkit/.test(navigator.userAgent.toLowerCase())
            ? "-moz-transition"
            : /webkit/.test(navigator.userAgent.toLowerCase())
            ? "-webkit-transition"
            : /opera/.test(navigator.userAgent.toLowerCase())
            ? "-o-transition"
            : /msie/.test(navigator.userAgent.toLowerCase())
            ? "-ms-transition"
            : "transition";
        },
        getTransition: function (t, i, n) {
          var o;
          return (
            "width" === n
              ? (o = { width: t })
              : "left" === n && (o = { left: t }),
            (i /= 1e3),
            (o[e] = n + " " + i + "s ease-in-out"),
            o
          );
        },
        refill: function () {
          l.css("width", 0),
            u.css("left", 0),
            (s = a.width()),
            f.initializeItems();
        },
        calculateFill: function (t) {
          return s * (t *= 0.01);
        },
        transitionFill: function (t) {
          var i = t - u.width();
          l.css(f.getTransition(t, r.duration, "width")),
            u.css(f.getTransition(i, r.duration, "left"));
        },
        animateFill: function (t) {
          var i = t - u.width();
          l.stop().animate({ width: "+=" + t }, r.duration),
            u.stop().animate({ left: "+=" + i }, r.duration);
        },
      };
    return f[i]
      ? f[i].apply(this, Array.prototype.slice.call(arguments, 1))
      : "object" != typeof i && i
      ? void t.error(
          'Method "' + method + '" does not exist in barfiller plugin!'
        )
      : f.init.apply(this);
  };
})(jQuery);

// [End Include All Plugins]

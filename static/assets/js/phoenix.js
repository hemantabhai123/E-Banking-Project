(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory(require("bootstrap")))
    : typeof define === "function" && define.amd
    ? define(["bootstrap"], factory)
    : ((global =
        typeof globalThis !== "undefined" ? globalThis : global || self),
      (global.phoenix = factory(global.bootstrap)));
})(this, function (bootstrap) {
  "use strict";

  const docReady = (e) => {
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", e)
      : setTimeout(e, 1);
  };
  const toggleColor = (e, t) => {
    const o = getItemFromStore("phoenixTheme");
    return "light" === ("auto" === o ? getSystemTheme() : o) ? e : t;
  };
  const resize = (e) => window.addEventListener("resize", e);
  const camelize = (e) => {
    const t = e.replace(/[-_\s.]+(.)?/g, (e, t) => (t ? t.toUpperCase() : ""));
    return `${t.substr(0, 1).toLowerCase()}${t.substr(1)}`;
  };
  const getData = (e, t) => {
    try {
      return JSON.parse(e.dataset[camelize(t)]);
    } catch (o) {
      return e.dataset[camelize(t)];
    }
  };
  const hexToRgb = (e) => {
    let t;
    t = 0 === e.indexOf("#") ? e.substring(1) : e;
    const o = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      t.replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (e, t, o, r) => t + t + o + o + r + r
      )
    );
    return o
      ? [parseInt(o[1], 16), parseInt(o[2], 16), parseInt(o[3], 16)]
      : null;
  };
  const rgbaColor = (e = "#fff", t = 0.5) => `rgba(${hexToRgb(e)}, ${t})`;
  const getColor = (e, t = document.documentElement) =>
    getComputedStyle(t).getPropertyValue(`--phoenix-${e}`).trim();
  const hasClass = (e, t) => e.classList.contains(t);
  const addClass = (e, t) => {
    e.classList.add(t);
  };

  const breakpoints = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1540 };
  const getBreakpoint = (e) => {
    const t = e && e.classList.value;
    let o;
    return (
      t &&
        (o =
          breakpoints[
            t
              .split(" ")
              .filter((e) => e.includes("navbar-expand-"))
              .pop()
              .split("-")
              .pop()
          ]),
      o
    );
  };
  const settings = {
    tinymce: { theme: "oxide" },
    chart: { borderColor: "rgba(255, 255, 255, 0.8)" },
  };
  const newChart = (e, t) => {
    const o = e.getContext("2d");
    return new window.Chart(o, t);
  };
  const getItemFromStore = (e, t, o = localStorage) => {
    try {
      return JSON.parse(o.getItem(e)) || t;
    } catch {
      return o.getItem(e) || t;
    }
  };
  const setItemToStore = (e, t, o = localStorage) => o.setItem(e, t);
  const getStoreSpace = (e = localStorage) =>
    parseFloat(
      (escape(encodeURIComponent(JSON.stringify(e))).length / 1048576).toFixed(
        2
      )
    );
  const getDates = (e, t, o = 864e5) => {
    const r = (t - e) / o;
    return Array.from(
      { length: r + 1 },
      (t, r) => new Date(e.valueOf() + o * r)
    );
  };
  const getPastDates = (e) => {
    let t;
    switch (e) {
      case "week":
        t = 7;
        break;
      case "month":
        t = 30;
        break;
      case "year":
        t = 365;
        break;
      default:
        t = e;
    }
    const o = new Date(),
      r = o,
      s = new Date(new Date().setDate(o.getDate() - (t - 1)));
    return getDates(s, r);
  };
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  var utils = {
    docReady: docReady,
    toggleColor: toggleColor,
    resize: resize,
    camelize: camelize,
    getData: getData,
    hasClass: hasClass,
    addClass: addClass,
    hexToRgb: hexToRgb,
    rgbaColor: rgbaColor,
    getColor: getColor,
    getBreakpoint: getBreakpoint,
    newChart: newChart,
    settings: settings,
    getItemFromStore: getItemFromStore,
    setItemToStore: setItemToStore,
    getStoreSpace: getStoreSpace,
    getDates: getDates,
    getPastDates: getPastDates,
    getSystemTheme: getSystemTheme,
  };

  // DomNode class
  class DomNode {
    constructor(s) {
      this.node = s;
    }
    addClass(s) {
      this.isValidNode() && this.node.classList.add(s);
    }
    removeClass(s) {
      this.isValidNode() && this.node.classList.remove(s);
    }
    toggleClass(s) {
      this.isValidNode() && this.node.classList.toggle(s);
    }
    hasClass(s) {
      return this.isValidNode() && this.node.classList.contains(s);
    }
    data(s) {
      if (this.isValidNode())
        try {
          return JSON.parse(this.node.dataset[this.camelize(s)]);
        } catch (t) {
          return this.node.dataset[this.camelize(s)];
        }
      return null;
    }
    attr(s) {
      return this.isValidNode() && this.node[s];
    }
    setAttribute(s, t) {
      this.isValidNode() && this.node.setAttribute(s, t);
    }
    removeAttribute(s) {
      this.isValidNode() && this.node.removeAttribute(s);
    }
    setProp(s, t) {
      this.isValidNode() && (this.node[s] = t);
    }
    on(s, t) {
      this.isValidNode() && this.node.addEventListener(s, t);
    }
    isValidNode() {
      return !!this.node;
    }
    camelize(s) {
      const t = s.replace(/[-_\s.]+(.)?/g, (s, t) =>
        t ? t.toUpperCase() : ""
      );
      return `${t.substr(0, 1).toLowerCase()}${t.substr(1)}`;
    }
  }

  const elementMap = new Map();
  class BulkSelect {
    constructor(e, t) {
      (this.element = e),
        (this.option = { displayNoneClassName: "d-none", ...t }),
        elementMap.set(this.element, this);
    }
    static getInstance(e) {
      return elementMap.has(e) ? elementMap.get(e) : null;
    }
    init() {
      this.attachNodes(), this.clickBulkCheckbox(), this.clickRowCheckbox();
    }
    getSelectedRows() {
      return Array.from(this.bulkSelectRows)
        .filter((e) => e.checked)
        .map((e) => getData(e, "bulk-select-row"));
    }
    attachNodes() {
      const {
        body: e,
        actions: t,
        replacedElement: s,
      } = getData(this.element, "bulk-select");
      (this.actions = new DomNode(document.getElementById(t))),
        (this.replacedElement = new DomNode(document.getElementById(s))),
        (this.bulkSelectRows = document
          .getElementById(e)
          .querySelectorAll("[data-bulk-select-row]"));
    }
    attachRowNodes(e) {
      this.bulkSelectRows = e;
    }
    clickBulkCheckbox() {
      this.element.addEventListener("click", () => {
        if (this.element.indeterminate === true)
          return (
            this.actions.addClass(this.option.displayNoneClassName),
            this.replacedElement.removeClass(this.option.displayNoneClassName),
            this.removeBulkCheck(),
            void this.bulkSelectRows.forEach((e) => {
              const t = new DomNode(e);
              t.setProp("checked", false);
              t.setAttribute("checked", false);
            })
          );
        this.toggleDisplay(),
          this.bulkSelectRows.forEach((e) => {
            e.checked = this.element.checked;
          });
      });
    }
    clickRowCheckbox() {
      this.bulkSelectRows.forEach((e) => {
        new DomNode(e).on("click", () => {
          if (this.element.indeterminate !== true) {
            this.element.indeterminate = true;
            this.element.setAttribute("indeterminate", "indeterminate");
            this.element.checked = true;
            this.element.setAttribute("checked", true);
            this.actions.removeClass(this.option.displayNoneClassName);
            this.replacedElement.addClass(this.option.displayNoneClassName);
          }
          if ([...this.bulkSelectRows].every((e) => e.checked)) {
            this.element.indeterminate = false;
            this.element.setAttribute("indeterminate", false);
          }
          if ([...this.bulkSelectRows].every((e) => !e.checked)) {
            this.removeBulkCheck();
            this.toggleDisplay();
          }
        });
      });
    }
    removeBulkCheck() {
      this.element.indeterminate = false;
      this.element.removeAttribute("indeterminate");
      this.element.checked = false;
      this.element.setAttribute("checked", false);
    }
    toggleDisplay() {
      this.actions.toggleClass(this.option.displayNoneClassName),
        this.replacedElement.toggleClass(this.option.displayNoneClassName);
    }
  }
  const bulkSelectInit = () => {
    const e = document.querySelectorAll("[data-bulk-select]");
    e.length &&
      e.forEach((e) => {
        new BulkSelect(e).init();
      });
  };
  const dropdownOnHover = () => {
    const e = document.querySelector("[data-dropdown-on-hover]");
    e &&
      e.addEventListener("mouseover", (e) => {
        if (
          e.target?.className?.includes("dropdown-toggle") &&
          !e.target.parentNode.className.includes("dropdown-inside") &&
          window.innerWidth > 992
        ) {
          const o = new window.bootstrap.Dropdown(e.target);
          o._element.classList.add("show"),
            o._menu.classList.add("show"),
            o._menu.setAttribute("data-bs-popper", "none"),
            e.target.parentNode.addEventListener("mouseleave", () => {
              window.innerWidth > 992 && o.hide();
            });
        }
      });
  };

  window.Dropzone && (window.Dropzone.autoDiscover = !1);

  const featherIconsInit = () => {
    window.feather && window.feather.replace({ width: "16px", height: "16px" });
  };

  const navbarComboInit = () => {
    const {
        getBreakpoint: e,
        getData: n,
        addClass: r,
        hasClass: t,
        resize: o,
      } = window.phoenix.utils,
      a = ".navbar-vertical",
      c = '[data-navbar-top="combo"]',
      i = ".collapse",
      l = "[data-move-container]",
      s = ".navbar-nav",
      d = ".navbar-vertical-divider",
      v = "flex-column",
      u = document.querySelector(a),
      m = document.querySelector(c),
      b = (o) => {
        const a = e(u),
          c = e(m);
        if (o < c) {
          const e = m.querySelector(i),
            t = e.innerHTML;
          if (t) {
            const o = n(m, "move-target"),
              i = document.querySelector(o);
            if (
              ((e.innerHTML = ""),
              i.insertAdjacentHTML(
                "afterend",
                `\n            <div data-move-container class='move-container'>\n              <div class='navbar-vertical-divider'>\n                <hr class='navbar-vertical-hr' />\n              </div>\n              ${t}\n            </div>\n          `
              ),
              a < c)
            ) {
              const e = document.querySelector(l).querySelector(s);
              r(e, v);
            }
          }
        } else {
          const e = document.querySelector(l);
          if (e) {
            const n = e.querySelector(s);
            t(n, v) && n.classList.remove(v),
              e.querySelector(d).remove(),
              (m.querySelector(i).innerHTML = e.innerHTML),
              e.remove();
          }
        }
      };
    b(window.innerWidth), o(() => b(window.innerWidth));
  };

  const handleNavbarVerticalCollapsed = () => {
    const {
        getItemFromStore: e,
        setItemToStore: t,
        resize: a,
      } = window.phoenix.utils,
      o = "body",
      n = ".navbar-vertical",
      l = ".navbar-vertical-toggle",
      r = ".navbar-vertical .navbar-collapse",
      c = ".navbar-vertical .nav-link.active",
      i = "click",
      s = "navbar.vertical.toggle",
      d = "navbar-vertical-collapsed",
      v = document.querySelector(l),
      m = document.querySelector(r),
      u = document.querySelector(c),
      b = e("phoenixIsNavbarVerticalCollapsed", !1);
    v &&
      v.addEventListener(i, (e) => {
        v.blur(),
          document.documentElement.classList.toggle(d),
          t("phoenixIsNavbarVerticalCollapsed", !b);
        const a = new CustomEvent(s);
        e.currentTarget?.dispatchEvent(a);
      }),
      m && u && !b && u.scrollIntoView({ behavior: "smooth" });
    const g = () => {
      const e = document.querySelector(o).offsetHeight,
        t = document.querySelector(n)?.offsetHeight;
      document.documentElement.classList.contains(d) && e < t
        ? (document.documentElement.style.minHeight = `${t}px`)
        : document.documentElement.removeAttribute("style");
    };
    g(),
      a(() => {
        g();
      }),
      v &&
        v.addEventListener("navbar.vertical.toggle", () => {
          g();
        });
  };

  const responsiveNavItemsInit = () => {
    const { resize: e } = window.phoenix.utils,
      t = "[data-nav-item]",
      l = "[data-navbar]",
      o = "[data-more-item]",
      i = "[data-category-list]",
      n = "[data-category-btn]",
      s = document.querySelector(l),
      a = () => {
        const e = s.clientWidth,
          l = s.querySelector(o),
          i = l.clientWidth,
          a = e - i,
          r = s.querySelectorAll(t),
          c = s.querySelector(n).clientWidth;
        let d = 0;
        (l.style.display = "none"),
          r.forEach((e) => {
            const t = e.clientWidth;
            if (
              ((d += t), d + c + i > a && !e.classList.contains("dropdown"))
            ) {
              (l.style.display = "block"), (e.style.display = "none");
              const t = e.firstChild.cloneNode(!0);
              s.querySelector(".category-list").appendChild(t);
            }
          });
        s.querySelectorAll(".dropdown-menu .nav-link").forEach((e) => {
          e.classList.remove("nav-link"), e.classList.add("dropdown-item");
        });
      };
    if (s) {
      window.addEventListener("load", () => {
        a();
      }),
        e(() => {
          const e = s.querySelectorAll(t),
            l = s.querySelectorAll(i);
          e.forEach((e) => e.removeAttribute("style")),
            l.forEach((e) => (e.innerHTML = "")),
            a();
        });
      const l = s.querySelectorAll(".nav-link");
      s.addEventListener("click", function (e) {
        for (let e = 0; e < l.length; e++) l[e].classList.remove("active");
        e.target.closest("li") &&
          e.target.closest("li").classList.add("active");
      });
    }
  };

  const searchInit = () => {
    const e = '[data-bs-dismiss="search"]',
      t = '[data-bs-toggle="dropdown"]',
      s = ".dropdown-menu",
      r = ".search-box",
      c = ".search-input",
      o = '[data-bs-toggle="search"]',
      a = "show",
      n = "aria-expanded",
      d = "click",
      l = "focus",
      u = "show.bs.dropdown",
      i = "search.close",
      h = (e) => {
        const t = e.querySelector(o),
          r = e.querySelector(s);
        t &&
          r &&
          (t.setAttribute(n, "false"),
          t.classList.remove(a),
          r.classList.remove(a));
      },
      v = document.querySelectorAll(r),
      E = () => {
        v.forEach(h);
      };
    v.forEach((t) => {
      const r = t.querySelector(c),
        u = t.querySelector(e),
        v = t.querySelector(s);
      r &&
        r.addEventListener(l, () => {
          E();
          const e = t.querySelector(o);
          e &&
            v &&
            (e.setAttribute(n, "true"), e.classList.add(a), v.classList.add(a));
        }),
        document.addEventListener(d, ({ target: e }) => {
          !t.contains(e) && h(t);
        }),
        u &&
          u.addEventListener(d, (e) => {
            h(t), (r.value = "");
            const s = new CustomEvent(i);
            e.currentTarget.dispatchEvent(s);
          });
    }),
      document.querySelectorAll(t).forEach((e) => {
        e.addEventListener(u, () => {
          E();
        });
      });
  };

  const supportChatInit = () => {
    const t = document.querySelector(".support-chat"),
      o = document.querySelectorAll(".btn-support-chat"),
      c = document.querySelector(".support-chat-container"),
      { phoenixSupportChat: s } = window.config.config;
    s && c?.classList.add("show"),
      o &&
        o.forEach((s) => {
          s.addEventListener("click", () => {
            t.classList.toggle("show-chat"),
              o[o.length - 1].classList.toggle("btn-chat-close"),
              c.classList.add("show");
          });
        });
  };

  const { config: config } = window.config,
    initialDomSetup = (e) => {
      const {
        getData: t,
        getItemFromStore: a,
        getSystemTheme: o,
      } = window.phoenix.utils;
      e &&
        e.querySelectorAll("[data-theme-control]").forEach((e) => {
          const n = t(e, "theme-control"),
            r = a(n);
          "phoenixNavbarTopShape" === n &&
            "dual-nav" === a("phoenixNavbarPosition") &&
            e.setAttribute("disabled", !0);
          const i = a("phoenixNavbarPosition");
          if (
            ("phoenixNavbarVerticalStyle" === n &&
              ("horizontal" === i || "dual-nav" === i) &&
              e.setAttribute("disabled", !0),
            "checkbox" === e.type)
          )
            "phoenixTheme" === n
              ? ("auto" === r ? "dark" === o() : "dark" === r) &&
                e.setAttribute("checked", !0)
              : r && e.setAttribute("checked", !0);
          else if ("radio" === e.type && "phoenixNavbarVerticalStyle" === n)
            "darker" === r &&
              "darker" === e.value &&
              e.setAttribute("checked", !0),
              "default" === r &&
                "default" === e.value &&
                e.setAttribute("checked", !0);
          else if ("radio" === e.type && "phoenixNavbarTopShape" === n)
            "slim" === r && "slim" === e.value && e.setAttribute("checked", !0),
              "default" === r &&
                "default" === e.value &&
                e.setAttribute("checked", !0);
          else if ("radio" === e.type && "phoenixNavbarTopStyle" === n)
            "darker" === r &&
              "darker" === e.value &&
              e.setAttribute("checked", !0),
              "default" === r &&
                "default" === e.value &&
                e.setAttribute("checked", !0);
          else if ("radio" === e.type && "phoenixTheme" === n) {
            r === e.value && e.setAttribute("checked", !0);
          } else if ("radio" === e.type && "phoenixNavbarPosition" === n) {
            r === e.value && e.setAttribute("checked", !0);
          } else {
            r === e.value && e.classList.add("active");
          }
        });
    },
    changeTheme = (e) => {
      const {
        getData: t,
        getItemFromStore: a,
        getSystemTheme: o,
      } = window.phoenix.utils;
      e.querySelectorAll('[data-theme-control = "phoenixTheme"]').forEach(
        (e) => {
          const n = t(e, "theme-control"),
            r = a(n);
          "checkbox" === e.type
            ? "auto" === r
              ? "dark" === o()
                ? (e.checked = !0)
                : (e.checked = !1)
              : (e.checked = "dark" === r)
            : "radio" === e.type
            ? r === e.value
              ? (e.checked = !0)
              : (e.checked = !1)
            : r === e.value
            ? e.classList.add("active")
            : e.classList.remove("active");
        }
      );
    },
    handleThemeDropdownIcon = (e) => {
      document
        .querySelectorAll("[data-theme-dropdown-toggle-icon]")
        .forEach((t) => {
          t.classList.toggle(
            "d-none",
            e !== t.getAttribute("data-theme-dropdown-toggle-icon")
          );
        });
    };
  handleThemeDropdownIcon(localStorage.getItem("phoenixTheme"));
  const themeControl = () => {
    const {
        getData: e,
        getItemFromStore: t,
        getSystemTheme: a,
      } = window.phoenix.utils,
      o = (t) => {
        const a = e(t, "page-url");
        a ? window.location.replace(a) : window.location.reload();
      },
      n = new DomNode(document.body),
      r = document.querySelector(".navbar-vertical"),
      i = document.querySelector(".navbar-top"),
      c = document.querySelector(".support-chat-container");
    initialDomSetup(n.node),
      n.on("click", (e) => {
        const d = new DomNode(e.target);
        if (d.data("theme-control")) {
          const l = d.data("theme-control");
          let h = e.target["checkbox" === e.target.type ? "checked" : "value"];
          switch (
            ("phoenixTheme" === l &&
              "boolean" == typeof h &&
              (h = h ? "dark" : "light"),
            config.hasOwnProperty(l) && window.config.set({ [l]: h }),
            window.history.replaceState(null, null, window.location.pathname),
            l)
          ) {
            case "phoenixTheme": {
              document.documentElement.setAttribute(
                "data-bs-theme",
                "auto" === h ? a() : h
              );
              const t = new CustomEvent("clickControl", {
                detail: { control: l, value: h },
              });
              e.currentTarget.dispatchEvent(t), changeTheme(n.node);
              break;
            }
            case "phoenixNavbarVerticalStyle":
              r.setAttribute("data-navbar-appearance", "default"),
                "default" !== h &&
                  r.setAttribute("data-navbar-appearance", "darker");
              break;
            case "phoenixNavbarTopStyle":
              i.setAttribute("data-navbar-appearance", "default"),
                "default" !== h &&
                  i.setAttribute("data-navbar-appearance", "darker");
              break;
            case "phoenixNavbarTopShape":
              "dual-nav" === t("phoenixNavbarPosition")
                ? el.setAttribute("disabled", !0)
                : o(d.node);
              break;
            case "phoenixNavbarPosition":
              o(d.node);
              break;
            case "phoenixIsRTL":
              window.config.set({ phoenixIsRTL: d.node.checked }),
                window.location.reload();
              break;
            case "phoenixSupportChat":
              c?.classList.remove("show"), h && c?.classList.add("show");
              break;
            case "reset":
              window.config.reset(), window.location.reload();
              break;
            default:
              window.location.reload();
          }
        }
      }),
      n.on("clickControl", ({ detail: { control: e, value: t } }) => {
        "phoenixTheme" === e && handleThemeDropdownIcon(t);
      });
  };

  const tooltipInit = () => {
    [].slice
      .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      .map((t) => new bootstrap.Tooltip(t, { trigger: "hover" }));
  };

  docReady(tooltipInit),
    docReady(featherIconsInit),
    docReady(bulkSelectInit),
    docReady(responsiveNavItemsInit),
    docReady(themeControl),
    docReady(searchInit),
    docReady(handleNavbarVerticalCollapsed),
    docReady(navbarComboInit),
    docReady(dropdownOnHover),
    docReady(supportChatInit);

  var phoenix = { utils: utils, BulkSelect: BulkSelect };

  return phoenix;
});
//# sourceMappingURL=phoenix.js.map
(function (factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function () {
  "use strict";

  const { merge: merge } = window._;
  const echartSetOption = (e, t, o, r) => {
    const { breakpoints: a, resize: n } = window.phoenix.utils,
      s = (t) => {
        Object.keys(t).forEach((o) => {
          window.innerWidth > a[o] && e.setOption(t[o]);
        });
      },
      i = document.body;
    e.setOption(merge(o(), t));
    const c = document.querySelector(".navbar-vertical-toggle");
    c &&
      c.addEventListener("navbar.vertical.toggle", () => {
        e.resize(), r && s(r);
      }),
      n(() => {
        e.resize(), r && s(r);
      }),
      r && s(r),
      i.addEventListener("clickControl", ({ detail: { control: r } }) => {
        "phoenixTheme" === r && e.setOption(window._.merge(o(), t));
      });
  };
  const tooltipFormatter = (e, t = "MMM DD") => {
    let o = "";
    return (
      e.forEach((e) => {
        o += `<div class='ms-1'>\n        <h6 class="text-body-tertiary"><span class="fas fa-circle me-1 fs-10" style="color:${
          e.borderColor ? e.borderColor : e.color
        }"></span>\n          ${e.seriesName} : ${
          "object" == typeof e.value ? e.value[1] : e.value
        }\n        </h6>\n      </div>`;
      }),
      `<div>\n            <p class='mb-2 text-body-tertiary'>\n              ${
        window.dayjs(e[0].axisValue).isValid()
          ? window.dayjs(e[0].axisValue).format(t)
          : e[0].axisValue
      }\n            </p>\n            ${o}\n          </div>`
    );
  };

  const newCustomersChartsInit = () => {
    const { getColor: o, getData: t, getDates: e } = window.phoenix.utils,
      a = document.querySelector(".echarts-new-customers"),
      i = (o) => {
        const t = window.dayjs(o[0].axisValue),
          e = window.dayjs(o[0].axisValue).subtract(1, "month"),
          a = o.map((o, a) => ({
            value: o.value,
            date: a > 0 ? e : t,
            color: o.color,
          }));
        let i = "";
        return (
          a.forEach((o, t) => {
            i += `<h6 class="fs-9 text-body-tertiary ${
              t > 0 && "mb-0"
            }"><span class="fas fa-circle me-2" style="color:${
              o.color
            }"></span>\n      ${o.date.format("MMM DD")} : ${
              o.value
            }\n    </h6>`;
          }),
          `<div class='ms-1'>\n              ${i}\n            </div>`
        );
      };
    if (a) {
      const r = t(a, "echarts"),
        s = window.echarts.init(a);
      echartSetOption(s, r, () => ({
        tooltip: {
          trigger: "axis",
          padding: 10,
          backgroundColor: o("body-highlight-bg"),
          borderColor: o("border-color"),
          textStyle: { color: o("light-text-emphasis") },
          borderWidth: 1,
          transitionDuration: 0,
          axisPointer: { type: "none" },
          formatter: i,
        },
        xAxis: [
          {
            type: "category",
            data: e(new Date("5/1/2022"), new Date("5/7/2022"), 864e5),
            show: !0,
            boundaryGap: !1,
            axisLine: { show: !0, lineStyle: { color: o("secondary-bg") } },
            axisTick: { show: !1 },
            axisLabel: {
              formatter: (o) => window.dayjs(o).format("DD MMM"),
              showMinLabel: !0,
              showMaxLabel: !1,
              color: o("secondary-color"),
              align: "left",
              interval: 5,
              fontFamily: "Nunito Sans",
              fontWeight: 600,
              fontSize: 12.8,
            },
          },
          {
            type: "category",
            position: "bottom",
            show: !0,
            data: e(new Date("5/1/2022"), new Date("5/7/2022"), 864e5),
            axisLabel: {
              formatter: (o) => window.dayjs(o).format("DD MMM"),
              interval: 130,
              showMaxLabel: !0,
              showMinLabel: !1,
              color: o("secondary-color"),
              align: "right",
              fontFamily: "Nunito Sans",
              fontWeight: 600,
              fontSize: 12.8,
            },
            axisLine: { show: !1 },
            axisTick: { show: !1 },
            splitLine: { show: !1 },
            boundaryGap: !1,
          },
        ],
        yAxis: { show: !1, type: "value", boundaryGap: !1 },
        series: [
          {
            type: "line",
            data: [150, 100, 300, 200, 250, 180, 250],
            showSymbol: !1,
            symbol: "circle",
            lineStyle: { width: 2, color: o("secondary-bg") },
            emphasis: { lineStyle: { color: o("secondary-bg") } },
          },
          {
            type: "line",
            data: [200, 150, 250, 100, 500, 400, 600],
            lineStyle: { width: 2, color: o("primary") },
            showSymbol: !1,
            symbol: "circle",
          },
        ],
        grid: { left: 0, right: 0, top: 5, bottom: 20 },
      }));
    }
  };

  const { echarts: echarts$2 } = window,
    payingCustomerChartInit = () => {
      const { getData: t, getColor: o } = window.phoenix.utils,
        e = document.querySelector(".echarts-paying-customer-chart");
      if (e) {
        const i = t(e, "options"),
          r = echarts$2.init(e);
        echartSetOption(r, i, () => ({
          tooltip: {
            trigger: "item",
            padding: [7, 10],
            backgroundColor: o("body-highlight-bg"),
            borderColor: o("border-color"),
            textStyle: { color: o("light-text-emphasis") },
            borderWidth: 1,
            position: (...t) => handleTooltipPosition(t),
            transitionDuration: 0,
            formatter: (t) => `<strong>${t.seriesName}:</strong> ${t.value}%`,
          },
          legend: { show: !1 },
          series: [
            {
              type: "gauge",
              center: ["50%", "60%"],
              name: "Paying customer",
              startAngle: 180,
              endAngle: 0,
              min: 0,
              max: 100,
              splitNumber: 12,
              itemStyle: { color: o("primary") },
              progress: {
                show: !0,
                roundCap: !0,
                width: 12,
                itemStyle: { shadowBlur: 0, shadowColor: "#0000" },
              },
              pointer: { show: !1 },
              axisLine: {
                roundCap: !0,
                lineStyle: { width: 12, color: [[1, o("primary-bg-subtle")]] },
              },
              axisTick: { show: !1 },
              splitLine: { show: !1 },
              axisLabel: { show: !1 },
              title: { show: !1 },
              detail: { show: !1 },
              data: [{ value: 30 }],
            },
          ],
        }));
      }
    };

  const projectionVsActualChartInit = () => {
    const { getColor: t, getData: o, getPastDates: e } = window.phoenix.utils,
      i = document.querySelector(".echart-projection-actual"),
      r = e(10),
      a = [
        44485, 20428, 47302, 45180, 31034, 46358, 26581, 36628, 38219, 43256,
      ],
      n = [
        38911, 29452, 31894, 47876, 31302, 27731, 25490, 30355, 27176, 30393,
      ];
    if (i) {
      const e = o(i, "echarts"),
        l = window.echarts.init(i);
      echartSetOption(l, e, () => ({
        color: [t("primary"), t("tertiary-bg")],
        tooltip: {
          trigger: "axis",
          padding: [7, 10],
          backgroundColor: t("body-highlight-bg"),
          borderColor: t("border-color"),
          textStyle: { color: t("light-text-emphasis") },
          borderWidth: 1,
          transitionDuration: 0,
          axisPointer: { type: "none" },
          position: (...t) => handleTooltipPosition(t),
          formatter: (t) => tooltipFormatter(t),
        },
        legend: {
          data: ["Projected revenue", "Actual revenue"],
          right: "right",
          width: "100%",
          itemWidth: 16,
          itemHeight: 8,
          itemGap: 20,
          top: 3,
          inactiveColor: t("quaternary-color"),
          textStyle: {
            color: t("body-color"),
            fontWeight: 600,
            fontFamily: "Nunito Sans",
          },
        },
        xAxis: {
          type: "category",
          axisLabel: {
            color: t("secondary-color"),
            formatter: (t) => window.dayjs(t).format("MMM DD"),
            interval: 3,
            fontFamily: "Nunito Sans",
            fontWeight: 600,
            fontSize: 12.8,
          },
          data: r,
          axisLine: { lineStyle: { color: t("tertiary-bg") } },
          axisTick: !1,
        },
        yAxis: {
          axisPointer: { type: "none" },
          axisTick: "none",
          splitLine: { interval: 5, lineStyle: { color: t("secondary-bg") } },
          axisLine: { show: !1 },
          axisLabel: {
            fontFamily: "Nunito Sans",
            fontWeight: 600,
            fontSize: 12.8,
            color: t("secondary-color"),
            margin: 20,
            verticalAlign: "bottom",
            formatter: (t) => `$${t.toLocaleString()}`,
          },
        },
        series: [
          {
            name: "Projected revenue",
            type: "bar",
            barWidth: "6px",
            data: n,
            barGap: "30%",
            label: { show: !1 },
            itemStyle: { borderRadius: [2, 2, 0, 0], color: t("primary") },
          },
          {
            name: "Actual revenue",
            type: "bar",
            data: a,
            barWidth: "6px",
            barGap: "30%",
            label: { show: !1 },
            z: 10,
            itemStyle: {
              borderRadius: [2, 2, 0, 0],
              color: t("info-bg-subtle"),
            },
          },
        ],
        grid: { right: 0, left: 3, bottom: 0, top: "15%", containLabel: !0 },
        animation: !1,
      }));
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const { echarts: echarts$1 } = window,
    returningCustomerChartInit = () => {
      const { getColor: t, getData: o } = window.phoenix.utils,
        e = document.querySelector(".echart-returning-customer");
      if (e) {
        const i = o(e, "echarts"),
          r = echarts$1.init(e);
        echartSetOption(r, i, () => ({
          color: t("body-highlight-bg"),
          legend: {
            data: [
              {
                name: "Fourth time",
                icon: "roundRect",
                itemStyle: { color: t("primary-light"), borderWidth: 0 },
              },
              {
                name: "Third time",
                icon: "roundRect",
                itemStyle: { color: t("info-lighter"), borderWidth: 0 },
              },
              {
                name: "Second time",
                icon: "roundRect",
                itemStyle: { color: t("primary"), borderWidth: 0 },
              },
            ],
            right: "right",
            width: "100%",
            itemWidth: 16,
            itemHeight: 8,
            itemGap: 20,
            top: 3,
            inactiveColor: t("quaternary-color"),
            inactiveBorderWidth: 0,
            textStyle: {
              color: t("body-color"),
              fontWeight: 600,
              fontFamily: "Nunito Sans",
            },
          },
          tooltip: {
            trigger: "axis",
            axisPointer: { type: "none" },
            padding: [7, 10],
            backgroundColor: t("body-highlight-bg"),
            borderColor: t("border-color"),
            textStyle: { color: t("light-text-emphasis") },
            borderWidth: 1,
            transitionDuration: 0,
            formatter: tooltipFormatter,
          },
          xAxis: {
            type: "category",
            data: months,
            show: !0,
            boundaryGap: !1,
            axisLine: { show: !0, lineStyle: { color: t("tertiary-bg") } },
            axisTick: { show: !1 },
            axisLabel: {
              showMinLabel: !1,
              showMaxLabel: !1,
              color: t("secondary-color"),
              formatter: (t) => t.slice(0, 3),
              fontFamily: "Nunito Sans",
              fontWeight: 600,
              fontSize: 12.8,
            },
            splitLine: {
              show: !0,
              lineStyle: { color: t("secondary-bg"), type: "dashed" },
            },
          },
          yAxis: {
            type: "value",
            boundaryGap: !1,
            axisLabel: {
              showMinLabel: !0,
              showMaxLabel: !0,
              color: t("secondary-color"),
              formatter: (t) => `${t}%`,
              fontFamily: "Nunito Sans",
              fontWeight: 600,
              fontSize: 12.8,
            },
            splitLine: { show: !0, lineStyle: { color: t("secondary-bg") } },
          },
          series: [
            {
              name: "Fourth time",
              type: "line",
              data: [62, 90, 90, 90, 78, 84, 17, 17, 17, 17, 82, 95],
              showSymbol: !1,
              symbol: "circle",
              symbolSize: 10,
              emphasis: { lineStyle: { width: 1 } },
              lineStyle: {
                type: "dashed",
                width: 1,
                color: t("primary-light"),
              },
              itemStyle: { borderColor: t("primary-light"), borderWidth: 3 },
            },
            {
              name: "Third time",
              type: "line",
              data: [50, 50, 30, 62, 18, 70, 70, 22, 70, 70, 70, 70],
              showSymbol: !1,
              symbol: "circle",
              symbolSize: 10,
              emphasis: { lineStyle: { width: 1 } },
              lineStyle: { width: 1, color: t("info-lighter") },
              itemStyle: { borderColor: t("info-lighter"), borderWidth: 3 },
            },
            {
              name: "Second time",
              type: "line",
              data: [40, 78, 60, 78, 60, 20, 60, 40, 60, 40, 20, 78],
              showSymbol: !1,
              symbol: "circle",
              symbolSize: 10,
              emphasis: { lineStyle: { width: 3 } },
              lineStyle: { width: 3, color: t("primary") },
              itemStyle: { borderColor: t("primary"), borderWidth: 3 },
            },
          ],
          grid: { left: 0, right: 8, top: "14%", bottom: 0, containLabel: !0 },
        }));
      }
    };

  const { echarts: echarts } = window,
    topCouponsChartInit = () => {
      const { getData: t, getColor: e } = window.phoenix.utils,
        o = document.querySelector(".echart-top-coupons");
      if (o) {
        const r = t(o, "options"),
          i = echarts.init(o);
        echartSetOption(i, r, () => ({
          color: [e("primary"), e("primary-lighter"), e("info-dark")],
          tooltip: {
            trigger: "item",
            padding: [7, 10],
            backgroundColor: e("body-highlight-bg"),
            borderColor: e("border-color"),
            textStyle: { color: e("light-text-emphasis") },
            borderWidth: 1,
            transitionDuration: 0,
            position(t, e, o, r, i) {
              const n = { top: t[1] - 35 };
              return (
                window.innerWidth > 540
                  ? t[0] <= i.viewSize[0] / 2
                    ? (n.left = t[0] + 20)
                    : (n.left = t[0] - i.contentSize[0] - 20)
                  : (n[t[0] < i.viewSize[0] / 2 ? "left" : "right"] = 0),
                n
              );
            },
            formatter: (t) => `<strong>${t.data.name}:</strong> ${t.percent}%`,
          },
          legend: { show: !1 },
          series: [
            {
              name: "72%",
              type: "pie",
              radius: ["100%", "87%"],
              avoidLabelOverlap: !1,
              emphasis: { scale: !1, itemStyle: { color: "inherit" } },
              itemStyle: { borderWidth: 2, borderColor: e("body-bg") },
              label: {
                show: !0,
                position: "center",
                formatter: "{a}",
                fontSize: 23,
                color: e("light-text-emphasis"),
              },
              data: [
                { value: 72e5, name: "Percentage discount" },
                { value: 18e5, name: "Fixed card discount" },
                { value: 1e6, name: "Fixed product discount" },
              ],
            },
          ],
          grid: { containLabel: !0 },
        }));
      }
    };

  const totalOrdersChartInit = () => {
    const { getColor: o, getData: t, getDates: r } = window.phoenix.utils,
      e = document.querySelector(".echart-total-orders");
    if (e) {
      const a = t(e, "echarts"),
        i = window.echarts.init(e);
      echartSetOption(i, a, () => ({
        color: o("primary"),
        tooltip: {
          trigger: "item",
          padding: [7, 10],
          backgroundColor: o("body-highlight-bg"),
          borderColor: o("border-color"),
          textStyle: { color: o("light-text-emphasis") },
          position: (...o) => handleTooltipPosition(o),
          borderWidth: 1,
          transitionDuration: 0,
          formatter: (o) =>
            `<strong>${window.dayjs(o.name).format("DD MMM")}:</strong> ${
              o.value
            }`,
        },
        xAxis: {
          type: "category",
          data: r(new Date("5/1/2022"), new Date("5/7/2022"), 864e5),
          show: !0,
          boundaryGap: !1,
          axisLine: { show: !0, lineStyle: { color: o("secondary-bg") } },
          axisTick: { show: !1 },
          axisLabel: {
            formatter: (o) => window.dayjs(o).format("DD MMM"),
            interval: 6,
            showMinLabel: !0,
            showMaxLabel: !0,
            color: o("secondary-color"),
          },
        },
        yAxis: { show: !1, type: "value", boundaryGap: !1 },
        series: [
          {
            type: "bar",
            barWidth: "5px",
            data: [120, 200, 150, 80, 70, 110, 120],
            showBackground: !0,
            symbol: "none",
            itemStyle: { borderRadius: 10 },
            backgroundStyle: {
              borderRadius: 10,
              color: o("primary-bg-subtle"),
            },
          },
        ],
        grid: { right: 10, left: 10, bottom: 0, top: 0 },
      }));
    }
  };

  const totalSalesChartInit = () => {
    const { getColor: o, getData: t, getDates: e } = window.phoenix.utils,
      a = document.querySelector(".echart-total-sales-chart"),
      i = e(new Date("5/1/2022"), new Date("5/30/2022"), 864e5),
      n = [
        100, 200, 300, 300, 300, 250, 200, 200, 200, 200, 200, 500, 500, 500,
        600, 700, 800, 900, 1e3, 1100, 850, 600, 600, 600, 400, 200, 200, 300,
        300, 300,
      ],
      r = [
        200, 200, 100, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 200, 400,
        600, 600, 600, 800, 1e3, 700, 400, 450, 500, 600, 700, 650, 600, 550,
      ],
      s = (o) => {
        const t = window.dayjs(o[0].axisValue),
          e = window.dayjs(o[0].axisValue).subtract(1, "month"),
          a = o.map((o, a) => ({
            value: o.value,
            date: a > 0 ? e : t,
            color: o.color,
          }));
        let i = "";
        return (
          a.forEach((o, t) => {
            i += `<h6 class="fs-9 text-body-tertiary ${
              t > 0 && "mb-0"
            }"><span class="fas fa-circle me-2" style="color:${
              o.color
            }"></span>\n      ${o.date.format("MMM DD")} : ${
              o.value
            }\n    </h6>`;
          }),
          `<div class='ms-1'>\n              ${i}\n            </div>`
        );
      };
    if (a) {
      const e = t(a, "echarts"),
        l = window.echarts.init(a);
      echartSetOption(l, e, () => ({
        color: [o("primary"), o("info")],
        tooltip: {
          trigger: "axis",
          padding: 10,
          backgroundColor: o("body-highlight-bg"),
          borderColor: o("border-color"),
          textStyle: { color: o("light-text-emphasis") },
          borderWidth: 1,
          transitionDuration: 0,
          axisPointer: { type: "none" },
          formatter: s,
        },
        xAxis: [
          {
            type: "category",
            data: i,
            axisLabel: {
              formatter: (o) => window.dayjs(o).format("DD MMM"),
              interval: 13,
              showMinLabel: !0,
              showMaxLabel: !1,
              color: o("secondary-color"),
              align: "left",
              fontFamily: "Nunito Sans",
              fontWeight: 600,
              fontSize: 12.8,
            },
            axisLine: { show: !0, lineStyle: { color: o("secondary-bg") } },
            axisTick: { show: !1 },
            splitLine: {
              show: !0,
              interval: 0,
              lineStyle: {
                color:
                  "dark" === window.config.config.phoenixTheme
                    ? o("body-highlight-bg")
                    : o("secondary-bg"),
              },
            },
            boundaryGap: !1,
          },
          {
            type: "category",
            position: "bottom",
            data: i,
            axisLabel: {
              formatter: (o) => window.dayjs(o).format("DD MMM"),
              interval: 130,
              showMaxLabel: !0,
              showMinLabel: !1,
              color: o("secondary-color"),
              align: "right",
              fontFamily: "Nunito Sans",
              fontWeight: 600,
              fontSize: 12.8,
            },
            axisLine: { show: !1 },
            axisTick: { show: !1 },
            splitLine: { show: !1 },
            boundaryGap: !1,
          },
        ],
        yAxis: {
          position: "right",
          axisPointer: { type: "none" },
          axisTick: "none",
          splitLine: { show: !1 },
          axisLine: { show: !1 },
          axisLabel: { show: !1 },
        },
        series: [
          {
            name: "d",
            type: "line",
            data: n,
            showSymbol: !1,
            symbol: "circle",
          },
          {
            name: "e",
            type: "line",
            data: r,
            lineStyle: { type: "dashed", width: 1, color: o("info") },
            showSymbol: !1,
            symbol: "circle",
          },
        ],
        grid: {
          right: 2,
          left: 5,
          bottom: "20px",
          top: "2%",
          containLabel: !1,
        },
        animation: !1,
      }));
    }
  };



  const { docReady: docReady } = window.phoenix.utils;
    docReady(totalSalesChartInit),
    docReady(newCustomersChartsInit),
    docReady(topCouponsChartInit),
    docReady(projectionVsActualChartInit),
    docReady(returningCustomerChartInit),
    docReady(payingCustomerChartInit),
    docReady(totalOrdersChartInit);
});
//# sourceMappingURL=ecommerce-dashboard.js.map

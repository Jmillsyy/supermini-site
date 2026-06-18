/* SuperMini Challenge — 2026 schedule + live countdown.
   Single source of truth for race dates. Edit SCHEDULE / TRACKS to update. */
(function () {
  const SCHEDULE = [
    { series: "Rubber Craft Australian Championship",       round: "R1", circuit: "Morgan Park",            loc: "QLD", start: "2026-03-27", end: "2026-03-29" },
    { series: "Rubber Craft Australian Championship",       round: "R2", circuit: "Sydney Motorsport Park", loc: "NSW", start: "2026-06-12", end: "2026-06-13" },
    { series: "Rubber Craft Australian Championship",       round: "R3", circuit: "The Bend Motorsport Park", loc: "SA", start: "2026-08-21", end: "2026-08-23" },
    { series: "Rubber Craft Queensland State Championship", round: "R1", circuit: "Queensland Raceway",     loc: "QLD", start: "2026-02-28", end: "2026-03-01" },
    { series: "Rubber Craft Queensland State Championship", round: "R2", circuit: "Morgan Park",            loc: "QLD", start: "2026-03-27", end: "2026-03-29" },
    { series: "Rubber Craft Queensland State Championship", round: "R3", circuit: "Morgan Park",            loc: "QLD", start: "2026-05-22", end: "2026-05-24" },
    { series: "Rubber Craft Queensland State Championship", round: "R4", circuit: "Queensland Raceway",     loc: "QLD", start: "2026-09-19", end: "2026-09-20" },
    { series: "Rubber Craft Queensland State Championship", round: "R5", circuit: "Morgan Park",            loc: "QLD", start: "2026-11-06", end: "2026-11-08" },
  ];
  window.SMC_SCHEDULE = SCHEDULE;

  const TRACKS = {
    "The Bend Motorsport Park": "assets/img/tracks/the-bend.png?v=5",
    "Sydney Motorsport Park":   "assets/img/tracks/sydney.png?v=5",
    "Queensland Raceway":       "assets/img/tracks/queensland.png?v=5",
    "Morgan Park":              "assets/img/tracks/morgan-park.png?v=5",
  };

  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  function startDT(s) { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d, 8, 0, 0); }
  function endDT(s)   { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d, 23, 59, 59); }

  function status(r, now) {
    if (now > endDT(r.end)) return "complete";
    if (now >= startDT(r.start)) return "live";
    return "upcoming";
  }

  function prettyRange(start, end) {
    const a = start.split("-").map(Number), b = end.split("-").map(Number);
    const sd = a[2], sm = a[1], ed = b[2], em = b[1], ey = b[0];
    if (sm === em) return sd + "–" + ed + " " + MONTHS[em - 1] + " " + ey;
    return sd + " " + MONTHS[sm - 1] + " – " + ed + " " + MONTHS[em - 1] + " " + ey;
  }

  function nextRace(now) {
    return SCHEDULE
      .filter(function (r) { return status(r, now) !== "complete"; })
      .sort(function (x, y) { return startDT(x.start) - startDT(y.start); })[0] || null;
  }

  function paintCalendar(now) {
    const rows = Array.prototype.slice.call(document.querySelectorAll(".round[data-start]"));
    if (!rows.length) return;
    let nextIdx = -1, nextTime = Infinity;
    rows.forEach(function (row, i) {
      const st = status({ start: row.dataset.start, end: row.dataset.end || row.dataset.start }, now);
      row.dataset.state = st;
      if (st !== "complete") {
        const t = startDT(row.dataset.start).getTime();
        if (t < nextTime) { nextTime = t; nextIdx = i; }
      }
    });
    rows.forEach(function (row, i) {
      const pill = row.querySelector(".status");
      if (!pill) return;
      const st = row.dataset.state;
      pill.classList.remove("next");
      if (st === "complete") pill.textContent = "Complete";
      else if (st === "live") { pill.textContent = "Racing now"; pill.classList.add("next"); }
      else pill.textContent = "Upcoming";
      if (i === nextIdx && st !== "live") { pill.textContent = "Next"; pill.classList.add("next"); }
    });
  }

  function pad(n) { return String(n).padStart(2, "0"); }
  function box(val, label) { return "<div><b>" + val + "</b><span>" + label + "</span></div>"; }

  function paintNextRace() {
    const titleEl = document.getElementById("nr-title");
    const metaEl  = document.getElementById("nr-meta");
    const countEl = document.getElementById("nr-count");
    const trackEl = document.getElementById("nr-track");
    if (!titleEl && !countEl) return;

    function tick() {
      const now = new Date();
      const r = nextRace(now);
      if (!r) {
        if (titleEl) titleEl.textContent = "Season complete";
        if (metaEl)  metaEl.textContent = "See you in 2027";
        if (countEl) countEl.innerHTML = "";
        if (trackEl) trackEl.hidden = true;
        return;
      }
      if (titleEl) titleEl.textContent = r.circuit;
      if (metaEl)  metaEl.textContent = prettyRange(r.start, r.end) + " · " + r.loc;
      if (trackEl) {
        const tsrc = TRACKS[r.circuit] || "";
        if (tsrc) {
          if (trackEl.getAttribute("src") !== tsrc) trackEl.src = tsrc;
          trackEl.alt = r.circuit + " circuit map";
          trackEl.hidden = false;
        } else {
          trackEl.hidden = true;
        }
      }
      const target = startDT(r.start).getTime();
      let diff = Math.floor((target - now.getTime()) / 1000);
      if (diff <= 0) {
        if (countEl) countEl.innerHTML = '<div style="min-width:auto;background:rgba(255,255,255,.16);padding:12px 18px">Racing this weekend</div>';
        return;
      }
      const days = Math.floor(diff / 86400); diff -= days * 86400;
      const hrs  = Math.floor(diff / 3600);  diff -= hrs * 3600;
      const min  = Math.floor(diff / 60);
      const sec  = diff - min * 60;
      if (countEl) countEl.innerHTML = box(days, "Days") + box(pad(hrs), "Hrs") + box(pad(min), "Min") + box(pad(sec), "Sec");
    }
    tick();
    setInterval(tick, 1000);
  }

  document.addEventListener("DOMContentLoaded", function () {
    paintCalendar(new Date());
    paintNextRace();
  });
})();

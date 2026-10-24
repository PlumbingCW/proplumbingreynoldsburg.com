(function () {
  "use strict";
  var root = document.documentElement;
  var mq = window.matchMedia("(max-width: 900px)");
  var toggle = document.getElementById("mob-toggle");
  var drawer = document.getElementById("mob-drawer");
  var closeBtn = document.getElementById("mob-close");
  function setOpen(open) {
    if (!drawer || !toggle) { return; }
    drawer.classList.toggle("open", open);
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    root.style.overflow = open ? "hidden" : "";
    if (open && closeBtn) { closeBtn.focus(); }
    if (!open && document.activeElement && drawer.contains(document.activeElement)) { toggle.focus(); }
  }
  if (toggle && drawer) {
    toggle.addEventListener("click", function () { setOpen(!drawer.classList.contains("open")); });
    if (closeBtn) { closeBtn.addEventListener("click", function () { setOpen(false); }); }
    drawer.addEventListener("click", function (e) {
      var t = e.target;
      if (t && t.closest && t.closest("a")) { setOpen(false); }
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { setOpen(false); } });
    var onChange = function (e) { if (!e.matches) { setOpen(false); } };
    if (mq.addEventListener) { mq.addEventListener("change", onChange); } else if (mq.addListener) { mq.addListener(onChange); }
  }
  var items = document.querySelectorAll(".faq-q");
  Array.prototype.forEach.call(items, function (btn) {
    btn.addEventListener("click", function () {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      if (!panel) { return; }
      panel.style.maxHeight = open ? "0px" : panel.scrollHeight + "px";
    });
  });
  window.addEventListener("resize", function () {
    Array.prototype.forEach.call(document.querySelectorAll(".faq-q[aria-expanded='true']"), function (b) {
      var p = document.getElementById(b.getAttribute("aria-controls"));
      if (p) { p.style.maxHeight = p.scrollHeight + "px"; }
    });
  });
})();

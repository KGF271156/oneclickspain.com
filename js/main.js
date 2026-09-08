// OneClickSpain — shared site behaviour

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Populate every map placeholder on the page from the single shared SVG asset
  var mounts = document.querySelectorAll('.map-mount');
  if (mounts.length === 0) return;

  fetch('/assets/spain-map.svg')
    .then(function (res) { return res.text(); })
    .then(function (svgText) {
      mounts.forEach(function (mount) {
        var interactive = mount.getAttribute('data-interactive') === 'true';
        var active = mount.getAttribute('data-active');

        var wrapper = document.createElement('div');
        wrapper.innerHTML = svgText;
        var svg = wrapper.querySelector('svg');
        svg.setAttribute('class', interactive ? 'spain-map' : 'spain-map spain-map--static');
        if (!interactive) svg.setAttribute('aria-hidden', 'true');

        if (active) {
          var activePath = svg.querySelector('path#' + active);
          if (activePath) activePath.classList.add('is-active');
        }

        if (interactive) {
          svg.querySelectorAll('path[id]').forEach(function (path) {
            path.setAttribute('tabindex', '0');
            path.setAttribute('role', 'link');
            var label = path.getAttribute('aria-label') || path.id;
            path.setAttribute('aria-label', 'View ' + label + ' region page');

            var go = function () {
              window.location.href = '/regions/' + path.id + '.html';
            };
            path.addEventListener('click', go);
            path.addEventListener('keypress', function (e) {
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
            });
          });
        }

        mount.replaceWith(svg);
      });
    })
    .catch(function (err) {
      console.error('Could not load region map:', err);
    });
});

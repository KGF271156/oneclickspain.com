// OneClick sites: privacy-friendly "click to play" YouTube embeds.
// Usage in a page:
//   <div class="yt-embed" data-id="VIDEO_ID" data-title="Title shown on the button" data-credit="YouTube: channel name"></div>
//   <script src="js/yt-embed.js"></script>
// Nothing from YouTube player loads (and no YouTube cookies are set) until the reader presses play;
// the player then loads from youtube-nocookie.com (YouTube's privacy-enhanced mode).
(function () {
  var css = '.yt-embed{position:relative;aspect-ratio:16/9;background:#0e1a14 center/cover no-repeat;border-radius:10px;overflow:hidden;margin:26px 0 6px;cursor:pointer}' +
    '.yt-embed button{all:unset;position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#fff;text-align:center;padding:16px;background:linear-gradient(180deg,rgba(0,0,0,.15),rgba(0,0,0,.6))}' +
    '.yt-embed .yt-play{width:74px;height:52px;border-radius:14px;background:#169B62;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,.35);transition:transform .15s}' +
    '.yt-embed:hover .yt-play{transform:scale(1.08);background:#FF883E}' +
    '.yt-embed .yt-play:after{content:"";border-style:solid;border-width:12px 0 12px 20px;border-color:transparent transparent transparent #fff;margin-left:4px}' +
    '.yt-embed .yt-title{font-weight:600;font-size:17px;text-shadow:0 1px 3px rgba(0,0,0,.6);max-width:90%}' +
    '.yt-embed .yt-note{font-size:12px;opacity:.85}' +
    '.yt-embed iframe{position:absolute;inset:0;width:100%;height:100%;border:0}' +
    '.yt-credit{font-size:.85rem;color:#6b6b6b;margin:0 0 26px}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function esc(s) { return String(s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  document.querySelectorAll('.yt-embed[data-id]').forEach(function (el) {
    var id = el.getAttribute('data-id'), title = el.getAttribute('data-title') || 'Play video';
    el.style.backgroundImage = 'url(https://i.ytimg.com/vi/' + encodeURIComponent(id) + '/hqdefault.jpg)';
    el.innerHTML = '<button type="button" aria-label="Play video: ' + esc(title) + '"><span class="yt-play"></span>' +
      '<span class="yt-title">' + esc(title) + '</span><span class="yt-note">Click to play · plays from YouTube</span></button>';
    var credit = el.getAttribute('data-credit');
    if (credit) {
      var p = document.createElement('p'); p.className = 'yt-credit';
      p.innerHTML = esc(credit) + ' · <a href="https://www.youtube.com/watch?v=' + encodeURIComponent(id) + '" target="_blank" rel="noopener">Watch on YouTube</a>';
      el.insertAdjacentElement('afterend', p);
    }
    el.addEventListener('click', function () {
      if (el.querySelector('iframe')) return;
      el.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0" title="' + esc(title) +
        '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
    }, { once: false });
  });
})();

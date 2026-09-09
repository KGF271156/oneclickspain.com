// OneClickSpain — province news loader
// Fetches /data/news/<slug>.json and renders story cards into any
// element with id="news-list" and a data-province attribute.

document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('news-list');
  if (!container) return;

  var slug = container.getAttribute('data-province');
  if (!slug) return;

  fetch('/data/news/' + slug + '.json')
    .then(function (res) {
      if (!res.ok) throw new Error('No news file for ' + slug);
      return res.json();
    })
    .then(function (data) {
      var stories = data.stories || [];
      if (stories.length === 0) {
        container.innerHTML = '<div class="content-pending">No stories yet.</div>';
        return;
      }
      container.innerHTML = stories.map(function (story) {
        var titleHtml = story.link
          ? '<a href="' + story.link + '" target="_blank" rel="noopener">' + story.title + '</a>'
          : story.title;
        return (
          '<div class="card" style="margin-bottom:16px;">' +
            '<h3 style="font-size:1.05rem;">' + titleHtml + '</h3>' +
            '<p>' + story.summary + '</p>' +
            '<p style="font-size:0.8rem;color:var(--ink-soft);margin:0;">' +
              (story.source || '') + (story.date ? ' · ' + story.date : '') +
            '</p>' +
          '</div>'
        );
      }).join('');
    })
    .catch(function (err) {
      container.innerHTML = '<div class="content-pending">News feed not yet connected for this province.</div>';
      console.error(err);
    });
});

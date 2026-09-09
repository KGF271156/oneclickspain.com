// OneClickSpain — province news loader (bilingual EN/ES)
// Fetches /data/news/<slug>.json and renders story cards into any
// element with id="news-list" and a data-province attribute.
// Language preference stored in localStorage key "ocs_lang" ("en" or "es").
// NOTE: this toggle is a standalone placeholder for the Barcelona pilot.
// It should be reconciled with the Ireland site's proven EN/GA toggle
// mechanism once both are reviewed together, so all OneClick sites share
// the same underlying approach.

document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('news-list');
  if (!container) return;

  var slug = container.getAttribute('data-province');
  if (!slug) return;

  var toggleBtn = document.getElementById('lang-toggle');

  function getLang() {
    return localStorage.getItem('ocs_lang') || 'en';
  }
  function setLang(lang) {
    localStorage.setItem('ocs_lang', lang);
  }

  function render(data) {
    var lang = getLang();
    var stories = data.stories || [];

    if (toggleBtn) {
      toggleBtn.textContent = lang === 'en' ? 'Español' : 'English';
    }

    if (stories.length === 0) {
      container.innerHTML = '<div class="content-pending">No stories yet.</div>';
      return;
    }

    container.innerHTML = stories.map(function (story) {
      var title = lang === 'es' ? (story.title_es || story.title_en) : (story.title_en || story.title_es);
      var summary = lang === 'es' ? (story.summary_es || story.summary_en) : (story.summary_en || story.summary_es);
      var titleHtml = story.link
        ? '<a href="' + story.link + '" target="_blank" rel="noopener">' + title + '</a>'
        : title;
      return (
        '<div class="card" style="margin-bottom:16px;">' +
          '<h3 style="font-size:1.05rem;">' + titleHtml + '</h3>' +
          '<p>' + summary + '</p>' +
          '<p style="font-size:0.8rem;color:var(--ink-soft);margin:0;">' +
            (story.source || '') + (story.date ? ' · ' + story.date : '') +
          '</p>' +
        '</div>'
      );
    }).join('');
  }

  fetch('/data/news/' + slug + '.json')
    .then(function (res) {
      if (!res.ok) throw new Error('No news file for ' + slug);
      return res.json();
    })
    .then(function (data) {
      render(data);
      if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
          setLang(getLang() === 'en' ? 'es' : 'en');
          render(data);
        });
      }
    })
    .catch(function (err) {
      container.innerHTML = '<div class="content-pending">News feed not yet connected for this province.</div>';
      console.error(err);
    });
});

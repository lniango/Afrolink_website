// ---------------------------------------------------------------------------
// Portfolio renderer: loads data/portfolio.json (or an admin draft override)
// and paints the public #projets section. Bilingual fields are resolved from
// the current document language so the language switcher can re-render.
// ---------------------------------------------------------------------------
(function () {
  var DATA_URL = 'data/portfolio.json';
  var ADMIN_STORAGE_KEY = 'neotech-portfolio-admin';
  var cache = null;
  var activeFilter = 'all';

  function currentLang() {
    return window.__neotechCurrentLang ? window.__neotechCurrentLang() : (document.documentElement.lang || 'fr');
  }

  function t(value, lang) {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    return value[lang] || value.fr || value.en || '';
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function slugify(name) {
    return String(name || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || ('project-' + Date.now());
  }

  function statusMap(data) {
    var map = {};
    (data.statuses || []).forEach(function (status) {
      map[status.id] = status;
    });
    return map;
  }

  function themeMap(data) {
    var map = {};
    (data.themes || []).forEach(function (theme) {
      map[theme.id] = theme;
    });
    return map;
  }

  function sortedProjects(data) {
    return (data.projects || []).slice().sort(function (a, b) {
      return (a.order || 0) - (b.order || 0);
    });
  }

  function wantsPreview() {
    try {
      return new URLSearchParams(window.location.search).get('preview') === '1';
    } catch (e) {
      return false;
    }
  }

  function loadAdminDraft() {
    if (!wantsPreview()) return null;
    try {
      var raw = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function fetchPortfolio() {
    var draft = loadAdminDraft();
    if (draft && Array.isArray(draft.projects)) {
      return Promise.resolve(draft);
    }
    return fetch(DATA_URL, { cache: 'no-store' }).then(function (res) {
      if (!res.ok) throw new Error('Impossible de charger le portfolio');
      return res.json();
    });
  }

  function renderFilters(data, lang) {
    var controls = document.querySelector('[data-project-filters]');
    if (!controls) return;

    var themesInUse = {};
    sortedProjects(data).forEach(function (project) {
      themesInUse[project.theme] = true;
    });

    var html = '<button type="button" class="' + (activeFilter === 'all' ? 'is-active' : '') + '" data-filter="all" aria-pressed="' + (activeFilter === 'all') + '">' +
      escapeHtml(lang === 'en' ? 'All projects' : 'Tous les projets') +
      '</button>';

    (data.themes || []).forEach(function (theme) {
      if (!themesInUse[theme.id]) return;
      var active = activeFilter === theme.id;
      html += '<button type="button" class="' + (active ? 'is-active' : '') + '" data-filter="' + escapeHtml(theme.id) + '" aria-pressed="' + active + '">' +
        escapeHtml(t(theme.filterLabel || theme.label, lang)) +
        '</button>';
    });

    controls.innerHTML = html;
    controls.setAttribute('aria-label', lang === 'en' ? 'Filter projects by domain' : 'Filtrer les projets par domaine');
  }

  function renderProjectCard(project, statuses, lang) {
    var status = statuses[project.status] || { id: project.status, label: project.status };
    var techHtml = (project.tech || []).map(function (tag) {
      return '<span>' + escapeHtml(t(tag, lang)) + '</span>';
    }).join('');

    var linkHtml = '';
    if (project.link && project.link.url) {
      var linkLabel = t(project.link.label, lang) || (lang === 'en' ? 'Learn more' : 'En savoir plus');
      linkHtml = '<a class="project-link" href="' + escapeHtml(project.link.url) + '" target="_blank" rel="noopener">' +
        escapeHtml(linkLabel) +
        '</a>';
    }

    return (
      '<div class="project-card">' +
        '<div class="project-top">' +
          '<h3>' + escapeHtml(project.name) + '</h3>' +
          '<span class="status status-' + escapeHtml(status.id) + '">' + escapeHtml(t(status.label, lang)) + '</span>' +
        '</div>' +
        '<p class="tagline">' + escapeHtml(t(project.tagline, lang)) + '</p>' +
        '<div class="problem-solution">' +
          '<p><span class="ps-label">' + escapeHtml(lang === 'en' ? 'The problem' : 'Le problème') + '</span>' +
            escapeHtml(t(project.problem, lang)) + '</p>' +
          '<p><span class="ps-label">' + escapeHtml(lang === 'en' ? 'Our solution' : 'Notre solution') + '</span>' +
            escapeHtml(t(project.solution, lang)) + '</p>' +
        '</div>' +
        (techHtml ? '<div class="tech-tags">' + techHtml + '</div>' : '') +
        linkHtml +
      '</div>'
    );
  }

  function renderGroups(data, lang) {
    var root = document.querySelector('[data-portfolio-root]');
    if (!root) return;

    var themes = themeMap(data);
    var statuses = statusMap(data);
    var projects = sortedProjects(data);
    var byTheme = {};

    projects.forEach(function (project) {
      if (!byTheme[project.theme]) byTheme[project.theme] = [];
      byTheme[project.theme].push(project);
    });

    var html = '';
    (data.themes || []).forEach(function (theme) {
      var group = byTheme[theme.id];
      if (!group || !group.length) return;
      var hidden = activeFilter !== 'all' && activeFilter !== theme.id;
      html += '<div class="theme-group' + (hidden ? ' is-hidden' : '') + '" data-reveal data-project-theme="' + escapeHtml(theme.id) + '">' +
        '<div class="theme-title">' + escapeHtml(t(theme.label, lang)) + '</div>' +
        '<div class="projects-grid">' +
          group.map(function (project) { return renderProjectCard(project, statuses, lang); }).join('') +
        '</div>' +
      '</div>';
    });

    // Projects whose theme was deleted from the catalogue still show up.
    Object.keys(byTheme).forEach(function (themeId) {
      if (themes[themeId]) return;
      var hidden = activeFilter !== 'all' && activeFilter !== themeId;
      html += '<div class="theme-group' + (hidden ? ' is-hidden' : '') + '" data-reveal data-project-theme="' + escapeHtml(themeId) + '">' +
        '<div class="theme-title">' + escapeHtml(themeId) + '</div>' +
        '<div class="projects-grid">' +
          byTheme[themeId].map(function (project) { return renderProjectCard(project, statuses, lang); }).join('') +
        '</div>' +
      '</div>';
    });

    root.innerHTML = html;
    observeReveal(root);
  }

  function updateTrustCount(data) {
    var el = document.querySelector('[data-trust-statement]');
    if (!el) return;
    var count = (data.projects || []).length;
    var lang = currentLang();
    var fr = 'Neotech-Consulting est une structure jeune. Nous préférons vous montrer nos ' + count +
      ' projets en cours plutôt que des témoignages inventés — cette section accueillera les retours de nos premiers clients dès qu\'ils existeront.';
    var en = 'Neotech-Consulting is a young company. We\u2019d rather show you our ' + count +
      ' active projects than invented testimonials — this section will host feedback from our first clients as soon as it exists.';
    el.textContent = lang === 'en' ? en : fr;
  }

  function observeReveal(root) {
    var els = root.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { io.observe(el); });
  }

  function paint() {
    if (!cache) return;
    var lang = currentLang();
    renderFilters(cache, lang);
    renderGroups(cache, lang);
    updateTrustCount(cache);
  }

  function bindFilters() {
    var controls = document.querySelector('[data-project-filters]');
    if (!controls || controls.dataset.bound === '1') return;
    controls.dataset.bound = '1';
    controls.addEventListener('click', function (event) {
      var button = event.target.closest('button[data-filter]');
      if (!button || !controls.contains(button)) return;
      activeFilter = button.dataset.filter || 'all';
      paint();
    });
  }

  function init() {
    bindFilters();
    fetchPortfolio()
      .then(function (data) {
        cache = data;
        paint();
      })
      .catch(function (err) {
        var root = document.querySelector('[data-portfolio-root]');
        if (root) {
          root.innerHTML = '<p class="portfolio-error">' +
            escapeHtml(currentLang() === 'en'
              ? 'Unable to load the portfolio right now.'
              : 'Impossible de charger le portfolio pour le moment.') +
            '</p>';
        }
        console.error(err);
      });
  }

  document.addEventListener('neotech:langchange', function () {
    paint();
  });

  window.__neotechPortfolio = {
    reload: function () {
      cache = null;
      return fetchPortfolio().then(function (data) {
        cache = data;
        paint();
        return data;
      });
    },
    getData: function () { return cache; },
    slugify: slugify
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

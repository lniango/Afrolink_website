// ---------------------------------------------------------------------------
// Portfolio admin for the static Neotech-Consulting site.
// Auth is a client-side SHA-256 password check (enough to keep casual visitors
// out of /admin). Edits are stored in localStorage; publish by exporting
// portfolio.json and replacing data/portfolio.json in the repo.
// ---------------------------------------------------------------------------
(function () {
  var DATA_URL = '../data/portfolio.json';
  var STORAGE_KEY = 'neotech-portfolio-admin';
  var SESSION_KEY = 'neotech-admin-session';
  // SHA-256("neotech-admin") — change this hash before production use.
  var PASSWORD_HASH = '0fa9a8dda4962e29890ac12f570fe7431ee63186b86109f20cc22bac237f329c';

  var state = {
    data: null,
    editingId: null
  };

  var loginScreen = document.getElementById('loginScreen');
  var appScreen = document.getElementById('appScreen');
  var loginForm = document.getElementById('loginForm');
  var loginError = document.getElementById('loginError');
  var projectList = document.getElementById('projectList');
  var projectCount = document.getElementById('projectCount');
  var editorPanel = document.getElementById('editorPanel');
  var projectForm = document.getElementById('projectForm');
  var themeForm = document.getElementById('themeForm');
  var themeList = document.getElementById('themeList');
  var fieldTheme = document.getElementById('fieldTheme');
  var fieldStatus = document.getElementById('fieldStatus');

  function toast(message) {
    var el = document.querySelector('.admin-toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'admin-toast';
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('is-visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () {
      el.classList.remove('is-visible');
    }, 2600);
  }

  function sha256(text) {
    var encoder = new TextEncoder();
    return crypto.subtle.digest('SHA-256', encoder.encode(text)).then(function (buffer) {
      return Array.from(new Uint8Array(buffer))
        .map(function (b) { return b.toString(16).padStart(2, '0'); })
        .join('');
    });
  }

  function isAuthed() {
    try { return sessionStorage.getItem(SESSION_KEY) === '1'; } catch (e) { return false; }
  }

  function setAuthed(value) {
    try {
      if (value) sessionStorage.setItem(SESSION_KEY, '1');
      else sessionStorage.removeItem(SESSION_KEY);
    } catch (e) { /* ignore */ }
  }

  function clone(data) {
    return JSON.parse(JSON.stringify(data));
  }

  function loadLocal() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
  }

  function fetchRemote() {
    return fetch(DATA_URL, { cache: 'no-store' }).then(function (res) {
      if (!res.ok) throw new Error('fetch failed');
      return res.json();
    });
  }

  function ensureDataShape(data) {
    if (!data || typeof data !== 'object') throw new Error('JSON invalide');
    data.themes = Array.isArray(data.themes) ? data.themes : [];
    data.statuses = Array.isArray(data.statuses) ? data.statuses : [];
    data.projects = Array.isArray(data.projects) ? data.projects : [];
    return data;
  }

  function statusLabel(id) {
    var found = (state.data.statuses || []).find(function (s) { return s.id === id; });
    return found ? (found.label.fr || found.id) : id;
  }

  function themeLabel(id) {
    var found = (state.data.themes || []).find(function (t) { return t.id === id; });
    return found ? (found.label.fr || found.id) : id;
  }

  function slugify(name) {
    return String(name || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || ('project-' + Date.now());
  }

  function uniqueId(base) {
    var id = base;
    var n = 2;
    while ((state.data.projects || []).some(function (p) { return p.id === id && p.id !== state.editingId; })) {
      id = base + '-' + n;
      n += 1;
    }
    return id;
  }

  function techToString(tech) {
    return (tech || []).map(function (tag) {
      if (typeof tag === 'string') return tag;
      return tag.fr || tag.en || '';
    }).filter(Boolean).join(', ');
  }

  function parseTech(value) {
    return String(value || '')
      .split(',')
      .map(function (part) { return part.trim(); })
      .filter(Boolean);
  }

  function fillSelects() {
    fieldTheme.innerHTML = (state.data.themes || []).map(function (theme) {
      return '<option value="' + theme.id + '">' + escapeHtml(theme.label.fr || theme.id) + '</option>';
    }).join('');

    fieldStatus.innerHTML = (state.data.statuses || []).map(function (status) {
      return '<option value="' + status.id + '">' + escapeHtml(status.label.fr || status.id) + '</option>';
    }).join('');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderThemes() {
    themeList.innerHTML = (state.data.themes || []).map(function (theme) {
      return '<li><strong>' + escapeHtml(theme.id) + '</strong> — ' + escapeHtml(theme.label.fr || '') + '</li>';
    }).join('') || '<li class="admin-empty">Aucune thématique</li>';
  }

  function renderList() {
    var projects = (state.data.projects || []).slice().sort(function (a, b) {
      return (a.order || 0) - (b.order || 0);
    });
    var count = projects.length;
    projectCount.textContent = count + (count > 1 ? ' projets' : ' projet');

    if (!count) {
      projectList.innerHTML = '<p class="admin-empty">Aucun projet pour le moment. Ajoutez le premier.</p>';
      return;
    }

    projectList.innerHTML = projects.map(function (project) {
      return (
        '<article class="admin-item" data-id="' + escapeHtml(project.id) + '">' +
          '<div>' +
            '<h3>' + escapeHtml(project.name) + '</h3>' +
            '<div class="admin-item-meta">' +
              '<span>' + escapeHtml(themeLabel(project.theme)) + '</span>' +
              '<span>' + escapeHtml(statusLabel(project.status)) + '</span>' +
              '<span>ordre ' + escapeHtml(String(project.order || 0)) + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="admin-item-actions">' +
            '<button type="button" class="btn btn-ghost" data-action="edit">Modifier</button>' +
            '<button type="button" class="btn btn-danger" data-action="delete">Supprimer</button>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  function openEditor(project) {
    state.editingId = project ? project.id : null;
    document.getElementById('editorTitle').textContent = project ? 'Modifier le projet' : 'Nouveau projet';
    document.getElementById('btnDeleteProject').hidden = !project;
    fillSelects();

    document.getElementById('editId').value = project ? project.id : '';
    document.getElementById('fieldName').value = project ? project.name : '';
    document.getElementById('fieldTheme').value = project ? project.theme : (state.data.themes[0] && state.data.themes[0].id) || '';
    document.getElementById('fieldStatus').value = project ? project.status : (state.data.statuses[0] && state.data.statuses[0].id) || '';
    document.getElementById('fieldOrder').value = project ? (project.order || 1) : nextOrder();
    document.getElementById('taglineFr').value = project ? (project.tagline && project.tagline.fr) || '' : '';
    document.getElementById('taglineEn').value = project ? (project.tagline && project.tagline.en) || '' : '';
    document.getElementById('problemFr').value = project ? (project.problem && project.problem.fr) || '' : '';
    document.getElementById('problemEn').value = project ? (project.problem && project.problem.en) || '' : '';
    document.getElementById('solutionFr').value = project ? (project.solution && project.solution.fr) || '' : '';
    document.getElementById('solutionEn').value = project ? (project.solution && project.solution.en) || '' : '';
    document.getElementById('fieldTech').value = project ? techToString(project.tech) : '';
    document.getElementById('fieldLinkUrl').value = project && project.link ? project.link.url || '' : '';
    document.getElementById('linkLabelFr').value = project && project.link && project.link.label ? project.link.label.fr || '' : '';
    document.getElementById('linkLabelEn').value = project && project.link && project.link.label ? project.link.label.en || '' : '';

    editorPanel.hidden = false;
    editorPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function closeEditor() {
    state.editingId = null;
    projectForm.reset();
    editorPanel.hidden = true;
  }

  function nextOrder() {
    var max = 0;
    (state.data.projects || []).forEach(function (p) {
      if ((p.order || 0) > max) max = p.order;
    });
    return max + 1;
  }

  function readFormProject() {
    var name = document.getElementById('fieldName').value.trim();
    var existingId = document.getElementById('editId').value.trim();
    var id = existingId || uniqueId(slugify(name));
    var linkUrl = document.getElementById('fieldLinkUrl').value.trim();
    var linkLabelFr = document.getElementById('linkLabelFr').value.trim();
    var linkLabelEn = document.getElementById('linkLabelEn').value.trim();

    var project = {
      id: id,
      theme: document.getElementById('fieldTheme').value,
      status: document.getElementById('fieldStatus').value,
      name: name,
      tagline: {
        fr: document.getElementById('taglineFr').value.trim(),
        en: document.getElementById('taglineEn').value.trim()
      },
      problem: {
        fr: document.getElementById('problemFr').value.trim(),
        en: document.getElementById('problemEn').value.trim()
      },
      solution: {
        fr: document.getElementById('solutionFr').value.trim(),
        en: document.getElementById('solutionEn').value.trim()
      },
      tech: parseTech(document.getElementById('fieldTech').value),
      link: null,
      order: Number(document.getElementById('fieldOrder').value) || nextOrder()
    };

    if (linkUrl) {
      project.link = {
        url: linkUrl,
        label: {
          fr: linkLabelFr || 'En savoir plus',
          en: linkLabelEn || 'Learn more'
        }
      };
    }

    return project;
  }

  function saveProject(event) {
    event.preventDefault();
    var project = readFormProject();
    var list = state.data.projects;
    var index = list.findIndex(function (p) { return p.id === project.id; });
    if (index >= 0) list[index] = project;
    else list.push(project);
    persist();
    renderList();
    closeEditor();
    toast('Projet enregistré localement');
  }

  function deleteProject(id) {
    if (!id) return;
    if (!window.confirm('Supprimer ce projet ?')) return;
    state.data.projects = state.data.projects.filter(function (p) { return p.id !== id; });
    persist();
    renderList();
    if (state.editingId === id) closeEditor();
    toast('Projet supprimé');
  }

  function exportJson() {
    var blob = new Blob([JSON.stringify(state.data, null, 2) + '\n'], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast('portfolio.json téléchargé');
  }

  function importJson(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var parsed = ensureDataShape(JSON.parse(String(reader.result)));
        state.data = parsed;
        persist();
        fillSelects();
        renderThemes();
        renderList();
        closeEditor();
        toast('Import réussi');
      } catch (e) {
        toast('Fichier JSON invalide');
      }
    };
    reader.readAsText(file);
  }

  function previewSite() {
    persist();
    window.open('../index.html?preview=1#projets', '_blank', 'noopener');
  }

  function addTheme(event) {
    event.preventDefault();
    var id = document.getElementById('themeId').value.trim().toLowerCase();
    if ((state.data.themes || []).some(function (t) { return t.id === id; })) {
      toast('Cette thématique existe déjà');
      return;
    }
    state.data.themes.push({
      id: id,
      label: {
        fr: document.getElementById('themeLabelFr').value.trim(),
        en: document.getElementById('themeLabelEn').value.trim()
      },
      filterLabel: {
        fr: document.getElementById('themeFilterFr').value.trim(),
        en: document.getElementById('themeFilterEn').value.trim()
      }
    });
    persist();
    themeForm.reset();
    fillSelects();
    renderThemes();
    toast('Thématique ajoutée');
  }

  function showApp() {
    loginScreen.hidden = true;
    appScreen.hidden = false;
  }

  function showLogin() {
    appScreen.hidden = true;
    loginScreen.hidden = false;
  }

  function bootData() {
    var local = loadLocal();
    if (local) {
      state.data = ensureDataShape(local);
      fillSelects();
      renderThemes();
      renderList();
      return Promise.resolve();
    }
    return fetchRemote().then(function (data) {
      state.data = ensureDataShape(data);
      persist();
      fillSelects();
      renderThemes();
      renderList();
    }).catch(function () {
      state.data = { themes: [], statuses: [
        { id: 'mvp', label: { fr: 'Prototype fonctionnel', en: 'Working prototype' } },
        { id: 'dev', label: { fr: 'En développement', en: 'In development' } },
        { id: 'conception', label: { fr: 'En conception', en: 'In design' } },
        { id: 'recherche', label: { fr: 'Recherche de financement', en: 'Seeking funding' } }
      ], projects: [] };
      fillSelects();
      renderThemes();
      renderList();
      toast('Catalogue distant indisponible — catalogue vide créé');
    });
  }

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    loginError.hidden = true;
    var password = document.getElementById('password').value;
    sha256(password).then(function (hash) {
      if (hash !== PASSWORD_HASH) {
        loginError.hidden = false;
        return;
      }
      setAuthed(true);
      showApp();
      bootData();
    });
  });

  document.getElementById('btnLogout').addEventListener('click', function () {
    setAuthed(false);
    showLogin();
  });

  document.getElementById('btnNewProject').addEventListener('click', function () {
    openEditor(null);
  });

  document.getElementById('btnCancelEdit').addEventListener('click', closeEditor);
  document.getElementById('btnDeleteProject').addEventListener('click', function () {
    deleteProject(state.editingId);
  });

  projectForm.addEventListener('submit', saveProject);
  themeForm.addEventListener('submit', addTheme);

  projectList.addEventListener('click', function (event) {
    var button = event.target.closest('button[data-action]');
    if (!button) return;
    var item = button.closest('[data-id]');
    if (!item) return;
    var id = item.getAttribute('data-id');
    var project = state.data.projects.find(function (p) { return p.id === id; });
    if (button.dataset.action === 'edit' && project) openEditor(project);
    if (button.dataset.action === 'delete') deleteProject(id);
  });

  document.getElementById('btnExport').addEventListener('click', exportJson);
  document.getElementById('btnPreview').addEventListener('click', previewSite);
  document.getElementById('importFile').addEventListener('change', function (event) {
    var file = event.target.files && event.target.files[0];
    importJson(file);
    event.target.value = '';
  });

  if (isAuthed()) {
    showApp();
    bootData();
  }
})();

// Reveal on scroll
  (function(){
    var els = document.querySelectorAll('[data-reveal], .pixel-mark');
    if(!('IntersectionObserver' in window)){
      els.forEach(function(el){ el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.15});
    els.forEach(function(el){ io.observe(el); });
  })();

  // Contact form: works with Netlify Forms when deployed there; falls back to a
  // local confirmation message when opened as a static file or hosted elsewhere.
  (function(){
    var form = document.getElementById('contactForm');
    var status = document.getElementById('formStatus');
    if(!form) return;
    form.addEventListener('submit', function(e){
      // On Netlify, letting the native POST happen (with a redirect) is more robust,
      // but a same-page confirmation keeps things simple for other hosts too.
      var isNetlify = window.location.hostname.indexOf('netlify') !== -1;
      if(!isNetlify){
        e.preventDefault();
        status.classList.add('show');
        form.reset();
      }
    });
  })();

  // Hero WebGL shader background (navy/orange ambient flow)
  (function(){
    var canvas = document.getElementById('heroShader');
    if(!canvas) return;

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function syncSize(){
      var w = canvas.clientWidth || 1280;
      var h = canvas.clientHeight || 720;
      if(canvas.width !== w || canvas.height !== h){
        canvas.width = w;
        canvas.height = h;
      }
    }
    if(typeof ResizeObserver !== 'undefined'){
      new ResizeObserver(syncSize).observe(canvas);
    }
    syncSize();

    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if(!gl){ canvas.style.display = 'none'; return; }

    var vs = 'attribute vec2 a_position;' +
      'varying vec2 v_texCoord;' +
      'void main(){' +
      '  v_texCoord = a_position * 0.5 + 0.5;' +
      '  gl_Position = vec4(a_position, 0.0, 1.0);' +
      '}';

    // Palette tuned to the Neotech-Consulting brand: deep navy base, warm orange glow.
    // Previous version (a thin-ring fractal tunnel) averaged ~13% luminance across the
    // hero — effectively invisible to most viewers. This one fills the frame with soft,
    // slow-moving gradient light so it reads clearly at a glance while staying calm
    // enough for an enterprise consulting audience (no hard edges, no strobing).
    var fs = 'precision highp float;' +
      'varying vec2 v_texCoord;' +
      'uniform float u_time;' +
      'uniform vec2 u_resolution;' +
      'uniform vec2 u_mouse;' +
      'float blob(vec2 uv, vec2 center, float radius){' +
      '  float d = length(uv - center) / radius;' +
      '  return exp(-d * d * 1.6);' +
      '}' +
      'void main(){' +
      '  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);' +
      '  vec2 uv = (gl_FragCoord.xy / u_resolution.xy - 0.5) * aspect * 2.0;' +
      '  vec2 mouseUv = (u_mouse / u_resolution.xy - 0.5) * aspect * 2.0;' +
      '  float t = u_time * 0.12;' +
      '  vec3 navyBase = vec3(0.031, 0.102, 0.20);' +
      '  vec3 navyGlow = vec3(0.09, 0.22, 0.40);' +
      '  vec3 orangeGlow = vec3(0.91, 0.44, 0.14);' +
      '  vec2 c1 = vec2(0.75, 0.30) + vec2(sin(t * 0.8), cos(t * 0.6)) * 0.35 + mouseUv * 0.12;' +
      '  vec2 c2 = vec2(-0.55, -0.25) + vec2(cos(t * 0.5), sin(t * 0.7)) * 0.4 + mouseUv * 0.08;' +
      '  vec2 c3 = vec2(0.15, -0.55) + vec2(sin(t * 0.4 + 1.5), cos(t * 0.9)) * 0.45 + mouseUv * 0.05;' +
      '  float b1 = blob(uv, c1, 1.05);' +
      '  float b2 = blob(uv, c2, 1.25);' +
      '  float b3 = blob(uv, c3, 0.95);' +
      '  vec3 col = navyBase;' +
      '  col += navyGlow * (b2 * 0.85 + b3 * 0.55);' +
      '  col += orangeGlow * b1 * 0.85;' +
      '  col += orangeGlow * b3 * 0.18;' +
      '  gl_FragColor = vec4(col, 1.0);' +
      '}';

    function compile(type, src){
      var s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }
    var prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    if(!gl.getProgramParameter(prog, gl.LINK_STATUS)){ canvas.style.display = 'none'; return; }
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    var posLoc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    var uTime = gl.getUniformLocation(prog, 'u_time');
    var uRes = gl.getUniformLocation(prog, 'u_resolution');
    var uMouse = gl.getUniformLocation(prog, 'u_mouse');

    var mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    window.addEventListener('mousemove', function(e){
      var rect = canvas.getBoundingClientRect();
      if(rect.width && rect.height){
        var nx = (e.clientX - rect.left) / rect.width;
        var ny = 1.0 - (e.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    });

    function drawFrame(t){
      gl.viewport(0, 0, canvas.width, canvas.height);
      if(uTime) gl.uniform1f(uTime, t * 0.001);
      if(uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if(uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    if(reduceMotion){
      // Respect reduced-motion: render a single static frame, no animation loop.
      drawFrame(0);
    } else {
      (function loop(t){
        drawFrame(t);
        requestAnimationFrame(loop);
      })(0);
    }
  })();

  // Mobile menu: accessible opening, closing and keyboard handling.
  (function(){
    var toggle = document.querySelector('.menu-toggle');
    var nav = document.querySelector('nav.links');
    if(!toggle || !nav) return;
    nav.id = 'main-navigation';

    function closeMenu(){
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Ouvrir le menu');
    }
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });
    nav.querySelectorAll('a').forEach(function(link){ link.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function(event){ if(event.key === 'Escape') closeMenu(); });
  })();

  // Portfolio filters: keep the long portfolio easy to browse without hiding content by default.
  (function(){
    var controls = document.querySelector('[data-project-filters]');
    if(!controls) return;
    var groups = document.querySelectorAll('[data-project-theme]');
    controls.querySelectorAll('button').forEach(function(button){
      button.addEventListener('click', function(){
        var filter = button.dataset.filter;
        controls.querySelectorAll('button').forEach(function(control){
          var active = control === button;
          control.classList.toggle('is-active', active);
          control.setAttribute('aria-pressed', String(active));
        });
        groups.forEach(function(group){
          group.classList.toggle('is-hidden', filter !== 'all' && group.dataset.projectTheme !== filter);
        });
      });
    });
  })();

  // FAQ accordions are enhanced in JavaScript so the readable static content remains available without it.
  (function(){
    document.querySelectorAll('.faq-item').forEach(function(item, index){
      var heading = item.querySelector('h4');
      var answer = item.querySelector('p');
      if(!heading || !answer) return;
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'faq-question';
      button.textContent = heading.textContent;
      button.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');
      answer.hidden = index !== 0;
      heading.textContent = '';
      heading.appendChild(button);
      button.addEventListener('click', function(){
        var expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!expanded));
        answer.hidden = expanded;
      });
    });
  })();

  // Highlight the current section in the main navigation while scrolling.
  (function(){
    var links = Array.prototype.slice.call(document.querySelectorAll('nav.links a[href^="#"]'));
    if(!links.length || !('IntersectionObserver' in window)) return;
    var linkForId = {};
    links.forEach(function(link){ linkForId[link.getAttribute('href').slice(1)] = link; });
    var sections = Object.keys(linkForId).map(function(id){ return document.getElementById(id); }).filter(Boolean);
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;
        links.forEach(function(link){ link.classList.remove('is-active'); });
        linkForId[entry.target.id].classList.add('is-active');
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach(function(section){ observer.observe(section); });
  })();

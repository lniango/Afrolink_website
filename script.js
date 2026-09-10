// Assemble grid for hero
  (function(){
    var grid = document.getElementById('assembleGrid');
    var total = 64;
    var colorFor = function(i){
      var r = Math.random();
      if(r < 0.14) return 'orange';
      if(r < 0.5) return 'navy';
      return 'light';
    };
    for(var i=0;i<total;i++){
      var cell = document.createElement('div');
      cell.className = 'cell ' + colorFor(i);
      var delay = (Math.random()*0.9).toFixed(2);
      cell.style.animationDelay = delay + 's';
      grid.appendChild(cell);
    }
  })();

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

  // Contact form (static demo, no backend)
  (function(){
    var form = document.getElementById('contactForm');
    var status = document.getElementById('formStatus');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      status.classList.add('show');
      form.reset();
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

    // Palette tuned to the Neotech-Consulting brand: deep navy base, warm orange accents.
    var fs = 'precision highp float;' +
      'varying vec2 v_texCoord;' +
      'uniform float u_time;' +
      'uniform vec2 u_resolution;' +
      'uniform vec2 u_mouse;' +
      'vec3 palette(float t){' +
      '  vec3 a = vec3(0.06, 0.14, 0.27);' +
      '  vec3 b = vec3(0.80, 0.34, 0.05);' +
      '  vec3 c = vec3(0.20, 0.24, 0.32);' +
      '  return a + b * cos(6.28318 * (c * t + u_time * 0.04));' +
      '}' +
      'void main(){' +
      '  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.y, u_resolution.x);' +
      '  vec2 mouseUv = (u_mouse * 2.0 - u_resolution.xy) / min(u_resolution.y, u_resolution.x);' +
      '  vec2 uv0 = uv + (mouseUv * 0.06);' +
      '  vec3 finalColor = vec3(0.0);' +
      '  for(float i = 0.0; i < 4.0; i++){' +
      '    uv = fract(uv * 1.5) - 0.5;' +
      '    float d = length(uv) * exp(-length(uv0));' +
      '    vec3 col = palette(length(uv0) + i * 0.4 + u_time * 0.3);' +
      '    d = sin(d * 8.0 + u_time * 0.6) / 8.0;' +
      '    d = abs(d);' +
      '    d = pow(0.012 / d, 1.2);' +
      '    finalColor += col * d;' +
      '  }' +
      '  gl_FragColor = vec4(finalColor * 0.28, 1.0);' +
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

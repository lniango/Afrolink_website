// ---------------------------------------------------------------------------
// i18n: FR/EN dictionary + language switcher.
// Every translatable string in index.html carries a data-i18n="key" attribute.
// Elements whose content includes markup (currently just the hero h1, which
// wraps one phrase in <span class="accent">) also carry data-i18n-html="1" so
// applyLanguage() knows to use innerHTML instead of textContent for them.
// ---------------------------------------------------------------------------
var translations = {
  'meta.title': { fr: 'Neotech-Consulting — Construire, Innover, Transformer.', en: 'Neotech-Consulting — Build, Innovate, Transform.' },

  'nav.tagline': { fr: 'Construire · Innover · Transformer', en: 'Build · Innovate · Transform' },
  'nav.accueil': { fr: 'Accueil', en: 'Home' },
  'nav.approche': { fr: 'Notre approche', en: 'Our approach' },
  'nav.projets': { fr: 'Projets', en: 'Projects' },
  'nav.equipe': { fr: 'Équipe', en: 'Team' },
  'nav.ressources': { fr: 'Ressources', en: 'Resources' },
  'nav.carrieres': { fr: 'Carrières', en: 'Careers' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  'nav.cta': { fr: 'Contactez-nous', en: 'Contact us' },

  'hero.h1': { fr: 'Au-delà du code, <span class="accent">nous bâtissons</span> les solutions de demain.', en: 'Beyond code, <span class="accent">we build</span> the solutions of tomorrow.' },
  'hero.lede': { fr: "Neotech-Consulting est une communauté d'experts qui transforme des défis complexes en opportunités tangibles pour les entreprises et les territoires. Nous ne nous contentons pas de développer des logiciels : nous co-construisons l'avenir numérique de nos clients.", en: 'Neotech-Consulting is a community of experts who turn complex challenges into tangible opportunities for businesses and regions. We don\u2019t just build software: we co-build our clients\u2019 digital future.' },
  'hero.cta1': { fr: 'Voir notre impact', en: 'See our impact' },
  'hero.cta2': { fr: 'Rejoindre le mouvement', en: 'Join the movement' },

  'mission.h2': { fr: 'Construire, Innover, Transformer.', en: 'Build, Innovate, Transform.' },
  'mission.p1': { fr: "Nous sommes partis d'un constat simple : la technologie est un levier puissant de croissance, mais son potentiel est souvent sous-exploité par manque d'expertise locale et de vision stratégique. Neotech-Consulting est né de la volonté de changer cela.", en: 'We started from a simple observation: technology is a powerful lever for growth, but its potential is often under-used for lack of local expertise and strategic vision. Neotech-Consulting was founded to change that.' },
  'mission.p2': { fr: "Notre mission est de réunir les meilleurs talents en architecture logicielle, Data, IA et IoT pour créer des solutions innovantes qui répondent aux vrais besoins des entreprises, tout en formant la prochaine génération de leaders technologiques.", en: 'Our mission is to bring together top talent in software architecture, data, AI and IoT to build innovative solutions that answer real business needs, while training the next generation of technology leaders.' },

  'value.impact.title': { fr: 'Impact', en: 'Impact' },
  'value.impact.desc': { fr: 'Nous mesurons notre succès à la valeur réelle que nous apportons à nos clients, pas au nombre de lignes de code livrées.', en: 'We measure our success by the real value we deliver to our clients, not by the number of lines of code shipped.' },
  'value.excellence.title': { fr: 'Excellence', en: 'Excellence' },
  'value.excellence.desc': { fr: "Nous visons l'excellence technique dans tout ce que nous entreprenons, de l'architecture au dernier détail d'interface.", en: 'We pursue technical excellence in everything we do, from the architecture down to the last interface detail.' },
  'value.partage.title': { fr: 'Partage', en: 'Sharing' },
  'value.partage.desc': { fr: "Nous croyons en la force du collectif et du transfert de compétences, à l'intérieur comme à l'extérieur de l'équipe.", en: 'We believe in the strength of the collective and of skills transfer, both inside and outside the team.' },

  'approche.h2': { fr: 'Quatre pôles, une même méthode', en: 'Four practices, one method' },
  'approche.p': { fr: 'Chez Neotech-Consulting, nous combinons une expertise technique de haut niveau avec une compréhension fine de vos enjeux métiers.', en: 'At Neotech-Consulting, we combine deep technical expertise with a sharp understanding of your business challenges.' },

  'svc.conseil.h3': { fr: 'Conseil & Stratégie technologique', en: 'Technology Consulting & Strategy' },
  'svc.conseil.p': { fr: "Audit technique et architectural, feuille de route technologique et accompagnement à la transformation digitale, pour bâtir une trajectoire claire plutôt qu'une pile d'outils.", en: 'Technical and architectural audits, technology roadmaps and support through digital transformation — building a clear trajectory rather than a pile of tools.' },
  'svc.tag.audit': { fr: 'Audit', en: 'Audit' },
  'svc.tag.roadmap': { fr: 'Roadmap', en: 'Roadmap' },
  'svc.tag.gouvernance': { fr: 'Gouvernance', en: 'Governance' },

  'svc.creation.h3': { fr: 'Création & Innovation', en: 'Build & Innovation' },
  'svc.creation.p': { fr: 'Architecture cloud-native, microservices et développement sur-mesure, pensés pour la scalabilité et la résilience dès la première ligne de code.', en: 'Cloud-native architecture, microservices and custom development, designed for scalability and resilience from the first line of code.' },

  'svc.donnees.h3': { fr: 'Données & Intelligence Artificielle', en: 'Data & Artificial Intelligence' },
  'svc.donnees.p': { fr: 'Pipelines de données robustes, modèles prédictifs et agents IA, conçus pour un usage métier concret et mesurable, avec une vraie exigence de qualité de la donnée.', en: 'Robust data pipelines, predictive models and AI agents, built for concrete, measurable business use — with a real standard for data quality.' },

  'svc.iot.h3': { fr: 'Ingénierie IoT', en: 'IoT Engineering' },
  'svc.iot.p': { fr: "De l'idée au produit connecté : capteurs terrain, traitement en temps réel en périphérie de réseau (edge), et tableaux de bord pour piloter ce qui compte.", en: 'From idea to connected product: field sensors, real-time edge processing, and dashboards to track what matters.' },
  'svc.tag.edge': { fr: 'Edge computing', en: 'Edge computing' },

  'portfolio.eyebrow': { fr: "Portfolio d'impact", en: 'Impact portfolio' },
  'portfolio.h2': { fr: 'Découvrez comment nous transformons les idées en solutions concrètes', en: 'See how we turn ideas into real-world solutions' },
  'portfolio.p': { fr: 'Chaque projet part d\u2019un problème réel identifié sur le terrain. Voici ceux sur lesquels nous travaillons actuellement, regroupés par thématique.', en: 'Every project starts from a real problem identified in the field. Here\u2019s what we\u2019re currently working on, grouped by theme.' },

  'filter.all': { fr: 'Tous les projets', en: 'All projects' },
  'filter.logistique': { fr: 'Logistique', en: 'Logistics' },
  'filter.formation': { fr: 'Formation', en: 'Training' },
  'filter.ia': { fr: 'IA & automatisation', en: 'AI & automation' },
  'filter.fabrication': { fr: 'Fabrication', en: 'Manufacturing' },
  'filter.agritech': { fr: 'AgriTech', en: 'AgriTech' },

  'theme.logistique': { fr: 'Logistique & Services de proximité', en: 'Logistics & Local services' },
  'theme.formation': { fr: 'Formation', en: 'Training' },
  'theme.ia': { fr: 'Intelligence artificielle & automatisation', en: 'Artificial intelligence & automation' },
  'theme.fabrication': { fr: 'Fabrication & design', en: 'Manufacturing & design' },
  'theme.agritech': { fr: 'AgriTech', en: 'AgriTech' },

  'status.mvp': { fr: 'Prototype fonctionnel', en: 'Working prototype' },
  'status.dev': { fr: 'En développement', en: 'In development' },
  'status.conception': { fr: 'En conception', en: 'In design' },
  'status.recherche': { fr: 'Recherche de financement', en: 'Seeking funding' },

  'ps.label.problem': { fr: 'Le problème', en: 'The problem' },
  'ps.label.solution': { fr: 'Notre solution', en: 'Our solution' },
  'project.link.github': { fr: 'Consulter le code sur GitHub', en: 'View the code on GitHub' },

  'afrolink.tagline': { fr: 'La logistique sans frontières.', en: 'Logistics without borders.' },
  'afrolink.problem': { fr: "Les entreprises et les particuliers ont du mal à trouver des livreurs fiables entre l'Afrique et l'étranger, avec peu de visibilité sur l'acheminement.", en: 'Businesses and individuals struggle to find reliable couriers between Africa and abroad, with little visibility into the shipment.' },
  'afrolink.solution': { fr: 'Une plateforme intelligente de mise en relation, avec suivi en temps réel et gestion optimisée des flux.', en: 'A smart matchmaking platform with real-time tracking and optimised flow management.' },
  'tag.geoapi': { fr: 'API de géolocalisation', en: 'Geolocation API' },

  'servilink.tagline': { fr: 'Le quotidien des résidences, simplifié.', en: 'Everyday residential life, simplified.' },
  'servilink.problem': { fr: 'Les résidences et copropriétés jonglent avec de multiples prestataires dispersés pour les services du quotidien.', en: 'Residences and co-ops juggle multiple scattered providers for everyday services.' },
  'servilink.solution': { fr: 'Une plateforme unique pour connecter résidences et prestataires : petit-déjeuner, chauffeurs, conciergerie.', en: 'A single platform connecting residences and providers: breakfast, drivers, concierge.' },

  'edulink.tagline': { fr: "Apprendre, où que l'on soit.", en: 'Learning, wherever you are.' },
  'edulink.problem': { fr: "Trouver une formation en ligne fiable et adaptée à son niveau reste un parcours confus pour beaucoup d'apprenants.", en: 'Finding a reliable online course suited to your level remains a confusing journey for many learners.' },
  'edulink.solution': { fr: 'Une plateforme qui met en relation organismes de formation et apprenants, avec suivi pédagogique et certification.', en: 'A platform connecting training providers and learners, with progress tracking and certification.' },

  'iagents.tagline': { fr: 'Des agents IA qui travaillent vraiment pour vous.', en: 'AI agents that actually work for you.' },
  'iagents.problem': { fr: "Particuliers et entreprises passent un temps précieux sur des tâches répétitives d'information et de support.", en: 'Individuals and businesses spend valuable time on repetitive information and support tasks.' },
  'iagents.solution': { fr: "Une suite d'agents IA spécialisés : assistants conversationnels et assistants documentaires, sur mesure.", en: 'A suite of specialised AI agents: custom conversational assistants and document assistants.' },

  'autopro.tagline': { fr: 'Moins de tâches, plus de valeur.', en: 'Fewer tasks, more value.' },
  'autopro.problem': { fr: 'Les équipes RH et comptables perdent un temps considérable sur des processus manuels et répétitifs.', en: 'HR and finance teams lose considerable time on manual, repetitive processes.' },
  'autopro.solution': { fr: "Des solutions d'automatisation des processus d'entreprise, pour libérer du temps aux équipes.", en: 'Business process automation solutions that free up time for teams.' },
  'tag.internalapis': { fr: 'APIs internes', en: 'Internal APIs' },

  'light3d.tagline': { fr: 'Votre lampe, imaginée par vous.', en: 'Your lamp, designed by you.' },
  'light3d.problem': { fr: "La personnalisation d'objets du quotidien reste réservée à des designers ou des budgets élevés.", en: 'Customising everyday objects remains reserved for designers or large budgets.' },
  'light3d.solution': { fr: 'Une plateforme de configuration et de génération de lampes personnalisées, fabriquées à la demande en impression 3D.', en: 'A configurator that generates custom lamps, made to order with 3D printing.' },
  'tag.print3d': { fr: 'Impression 3D', en: '3D printing' },

  'agritech.tagline': { fr: 'Cultiver avec précision.', en: 'Growing with precision.' },
  'agritech.problem': { fr: 'Les exploitants agricoles manquent souvent de visibilité en temps réel sur l\u2019état de leurs cultures et de leur élevage.', en: 'Farmers often lack real-time visibility into the state of their crops and livestock.' },
  'agritech.solution': { fr: 'Des capteurs terrain connectés et des tableaux de bord temps réel pour une agriculture de précision.', en: 'Connected field sensors and real-time dashboards for precision farming.' },
  'tag.iotsensors': { fr: 'Capteurs IoT', en: 'IoT sensors' },

  'farmlink.tagline': { fr: "Du champ à l'assiette, sans détour.", en: 'From field to plate, no detour.' },
  'farmlink.problem': { fr: 'Les producteurs agricoles ont un accès limité aux clients directs, et les marges disparaissent dans les intermédiaires.', en: 'Farmers have limited access to direct customers, and margins disappear into middlemen.' },
  'farmlink.solution': { fr: 'Une plateforme de mise en relation directe entre producteurs et clients, pour des circuits courts et plus équitables.', en: 'A platform connecting producers directly with customers, for shorter, fairer supply chains.' },
  'tag.geoloc': { fr: 'Géolocalisation', en: 'Geolocation' },

  'trust.statement': { fr: "Neotech-Consulting est une structure jeune. Nous préférons vous montrer nos huit projets en cours plutôt que des témoignages inventés — cette section accueillera les retours de nos premiers clients dès qu'ils existeront.", en: 'Neotech-Consulting is a young company. We\u2019d rather show you our eight active projects than invented testimonials — this section will host feedback from our first clients as soon as it exists.' },

  'team.welcome.p1': { fr: 'Nous sommes une équipe de passionnés, réunis par une même ambition : construire des solutions technologiques qui ont du sens.', en: 'We are a team of enthusiasts, united by one ambition: building technology solutions that matter.' },
  'team.welcome.p2': { fr: "Architectes, développeurs, data scientists, experts IoT... nous croyons que la diversité des talents est notre plus grande force. Chaque projet que nous menons est une pièce d'un même chantier, pensé pour des besoins réels — et nous gardons la porte ouverte à qui veut construire avec nous.", en: 'Architects, developers, data scientists, IoT experts... we believe diversity of talent is our greatest strength. Every project we run is one piece of the same build, shaped by real needs — and the door stays open to anyone who wants to build with us.' },
  'team.welcome.sig': { fr: '— L\u2019équipe fondatrice, Neotech-Consulting', en: '— The founding team, Neotech-Consulting' },
  'team.join': { fr: 'Rejoignez-nous →', en: 'Join us →' },
  'team.side.p': { fr: 'Notre équipe rassemble des profils complémentaires, tous engagés dans les projets présentés sur ce site. Nous fonctionnons comme un studio compact : peu de niveaux hiérarchiques, des décisions techniques prises près du terrain, et une vraie place laissée à l\u2019initiative de chacun.', en: 'Our team brings together complementary profiles, all actively engaged in the projects shown on this site. We work like a compact studio: few hierarchical layers, technical decisions made close to the ground, and real room for individual initiative.' },

  'founder.eng.role': { fr: 'Architecture & Dev', en: 'Architecture & Engineering' },
  'founder.eng.h4': { fr: 'Pôle Ingénierie', en: 'Engineering practice' },
  'founder.eng.quote': { fr: "« Une bonne architecture se voit à ce qu'on ne remarque jamais. »", en: '"Good architecture is what you never notice."' },

  'founder.data.role': { fr: 'Data & IA', en: 'Data & AI' },
  'founder.data.h4': { fr: 'Pôle Intelligence', en: 'Intelligence practice' },
  'founder.data.quote': { fr: "« La donnée n'a de valeur que si elle change une décision. »", en: '"Data only has value if it changes a decision."' },

  'founder.iot.role': { fr: 'IoT & Terrain', en: 'IoT & Field' },
  'founder.iot.h4': { fr: 'Pôle Connecté', en: 'Connected practice' },
  'founder.iot.quote': { fr: "« Le meilleur capteur est celui qu'on oublie sur le terrain. »", en: '"The best sensor is the one you forget is there."' },

  'founder.conseil.role': { fr: 'Conseil', en: 'Consulting' },
  'founder.conseil.h4': { fr: 'Pôle Automatisation', en: 'Automation practice' },
  'founder.conseil.quote': { fr: "« Automatiser un mauvais process, c'est juste faire l'erreur plus vite. »", en: '"Automating a bad process just makes the mistake happen faster."' },

  'team.photo.note': { fr: "Vos photos d'équipe et bios individuelles viendront enrichir cette section — nous avons volontairement gardé une présentation par pôle en attendant.", en: 'Team photos and individual bios will enrich this section over time — we\u2019ve deliberately kept a by-practice presentation in the meantime.' },

  'resources.h2': { fr: "Nos réflexions, retours d'expérience et analyses", en: 'Our thinking, lessons learned and analysis' },
  'resources.p': { fr: 'Un espace pour partager ce que nous apprenons en construisant : tendances technologiques, retours de terrain, choix d\u2019architecture. Les premiers articles arrivent bientôt.', en: 'A space to share what we learn as we build: technology trends, field notes, architecture decisions. First articles coming soon.' },

  'res1.tag': { fr: 'IoT · Agriculture', en: 'IoT · Agriculture' },
  'res1.h3': { fr: "Pourquoi l'IoT est la clé de l'agriculture de demain", en: 'Why IoT is the key to tomorrow\u2019s agriculture' },
  'res1.p': { fr: 'Ce que nous avons appris en concevant des capteurs terrain pour AgriTech Connect, et pourquoi la précision change tout.', en: 'What we learned designing field sensors for AgriTech Connect, and why precision changes everything.' },

  'res2.tag': { fr: 'Architecture', en: 'Architecture' },
  'res2.h3': { fr: 'Comment bien choisir son architecture logicielle', en: 'How to choose the right software architecture' },
  'res2.p': { fr: "Les questions à se poser avant de choisir une stack, au-delà des effets de mode technologiques.", en: 'The questions to ask before picking a stack, beyond technology fads.' },

  'res3.tag': { fr: "Retour d'expérience", en: 'Case study' },
  'res3.h3': { fr: 'Dans les coulisses de 3D-Light', en: 'Behind the scenes of 3D-Light' },
  'res3.p': { fr: 'Retour sur le développement de notre plateforme de génération de lampes personnalisées en impression 3D.', en: 'A look back at building our platform for generating custom 3D-printed lamps.' },

  'res.status': { fr: 'À paraître', en: 'Coming soon' },

  'careers.h2': { fr: "Nous n'accueillons pas des compétences, nous accueillons des talents", en: 'We don\u2019t hire skill sets, we welcome talent' },
  'careers.intro': { fr: 'Vous êtes passionné par la technologie et vous cherchez à avoir un impact ? Chez Neotech-Consulting, nous ne recrutons pas des compétences, nous accueillons des talents qui partagent notre vision. Que vous soyez expert ou en début de carrière, si vous avez envie d\u2019apprendre, de partager et de construire, votre place est ici.', en: 'Passionate about technology and looking to make an impact? At Neotech-Consulting, we don\u2019t recruit skill sets, we welcome talent that shares our vision. Whether you\u2019re a seasoned expert or just starting out, if you want to learn, share and build, there\u2019s a place for you here.' },
  'career.li1': { fr: 'Développeurs full-stack & mobile', en: 'Full-stack & mobile developers' },
  'career.li2': { fr: 'Architectes logiciels', en: 'Software architects' },
  'career.li3': { fr: 'Data scientists & ingénieurs IA', en: 'Data scientists & AI engineers' },
  'career.li4': { fr: 'Experts IoT & systèmes embarqués', en: 'IoT & embedded systems experts' },
  'career.li5': { fr: 'Consultants en automatisation des processus', en: 'Process automation consultants' },
  'careers.panel.h3': { fr: 'Aucune offre ne vous correspond ?', en: 'No listing quite fits?' },
  'careers.panel.p': { fr: 'Envoyez-nous un message via le formulaire de contact avec votre parcours, vos compétences et ce qui vous anime. Nous lisons chaque message.', en: 'Send us a message through the contact form with your background, your skills and what drives you. We read every message.' },
  'careers.panel.btn': { fr: 'Se présenter', en: 'Introduce yourself' },

  'contact.h2': { fr: 'Un projet en tête ? Une question ?', en: 'A project in mind? A question?' },
  'contact.lede': { fr: 'Parlons-en. Nous sommes là pour vous accompagner.', en: 'Let\u2019s talk. We\u2019re here to help.' },
  'contact.dt.email': { fr: 'Email', en: 'Email' },
  'contact.dt.social': { fr: 'Réseaux', en: 'Social' },

  'faq1.q': { fr: "Quels sont vos délais d'intervention ?", en: 'What are your response times?' },
  'faq1.a': { fr: 'Cela dépend de la nature du projet, mais nous revenons vers vous sous quelques jours pour un premier échange.', en: 'It depends on the nature of the project, but we get back to you within a few days for an initial conversation.' },
  'faq2.q': { fr: 'Comment se passe un premier échange ?', en: 'What happens in a first conversation?' },
  'faq2.a': { fr: 'Un appel ou une visio de 30 à 45 minutes pour comprendre votre besoin, sans engagement de votre part.', en: 'A 30–45 minute call or video chat to understand your needs, with no commitment on your part.' },
  'faq3.q': { fr: 'Quels types de projets acceptez-vous ?', en: 'What kinds of projects do you take on?' },
  'faq3.a': { fr: 'Architecture logicielle, Data & IA, IoT, ou conseil — que le projet soit déjà cadré ou encore à défricher.', en: 'Software architecture, Data & AI, IoT, or consulting — whether the project is already well-defined or still taking shape.' },

  'form.label.nom': { fr: 'Nom', en: 'Name' },
  'form.label.email': { fr: 'Email', en: 'Email' },
  'form.label.entreprise': { fr: 'Entreprise', en: 'Company' },
  'form.label.telephone': { fr: 'Téléphone', en: 'Phone' },
  'form.label.type': { fr: 'Type de projet', en: 'Project type' },
  'form.opt.architecture': { fr: 'Architecture & Développement', en: 'Architecture & Development' },
  'form.opt.donnees': { fr: 'Données & IA', en: 'Data & AI' },
  'form.opt.iot': { fr: 'Ingénierie IoT', en: 'IoT Engineering' },
  'form.opt.conseil': { fr: 'Conseil & Stratégie', en: 'Consulting & Strategy' },
  'form.opt.autre': { fr: 'Autre', en: 'Other' },
  'form.label.message': { fr: 'Message', en: 'Message' },
  'form.submit': { fr: 'Envoyer le message', en: 'Send message' },
  'form.status': { fr: 'Message envoyé — nous revenons vers vous rapidement.', en: 'Message sent — we\u2019ll get back to you shortly.' },

  'footer.copyright': { fr: '© 2026 Neotech-Consulting. Tous droits réservés.', en: '© 2026 Neotech-Consulting. All rights reserved.' }
};

(function(){
  var STORAGE_KEY = 'neotech-lang';
  var switchEl = document.getElementById('langSwitch');

  function getSavedLang(){
    try { return localStorage.getItem(STORAGE_KEY); } catch(e){ return null; }
  }
  function saveLang(lang){
    try { localStorage.setItem(STORAGE_KEY, lang); } catch(e){ /* ignore */ }
  }

  function applyLanguage(lang){
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var entry = translations[el.getAttribute('data-i18n')];
      if(!entry || !entry[lang]) return;
      if(el.hasAttribute('data-i18n-html')){
        el.innerHTML = entry[lang];
      } else {
        el.textContent = entry[lang];
      }
    });
    if(switchEl){
      switchEl.querySelectorAll('button').forEach(function(btn){
        btn.classList.toggle('is-active', btn.dataset.lang === lang);
      });
    }
    var toggle = document.querySelector('.menu-toggle');
    if(toggle){
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-label', lang === 'fr'
        ? (isOpen ? 'Fermer le menu' : 'Ouvrir le menu')
        : (isOpen ? 'Close menu' : 'Open menu'));
    }
    saveLang(lang);
  }

  if(switchEl){
    switchEl.querySelectorAll('button').forEach(function(btn){
      btn.addEventListener('click', function(){ applyLanguage(btn.dataset.lang); });
    });
  }

  var initialLang = getSavedLang() || 'fr';
  applyLanguage(initialLang);

  // Expose for the mobile-menu handler below, which also needs to set a
  // language-aware aria-label when it opens/closes.
  window.__neotechApplyLanguage = applyLanguage;
  window.__neotechCurrentLang = function(){ return document.documentElement.lang || 'fr'; };
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

  // Contact form: works with Netlify Forms when deployed there; falls back to a
  // local confirmation message when opened as a static file or hosted elsewhere.
  (function(){
    var form = document.getElementById('contactForm');
    var status = document.getElementById('formStatus');
    if(!form) return;
    form.addEventListener('submit', function(e){
      var isNetlify = window.location.hostname.indexOf('netlify') !== -1;
      if(!isNetlify){
        e.preventDefault();
        status.classList.add('show');
        form.reset();
      }
    });
  })();

  // Hero WebGL shader background (soft navy/orange ambient glow)
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
    // Fills the frame with soft, slow-moving gradient light so it stays clearly
    // visible while remaining calm enough for an enterprise consulting audience.
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

    function label(open){
      var lang = window.__neotechCurrentLang ? window.__neotechCurrentLang() : 'fr';
      if(lang === 'fr') return open ? 'Fermer le menu' : 'Ouvrir le menu';
      return open ? 'Close menu' : 'Open menu';
    }
    function closeMenu(){
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', label(false));
    }
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', label(open));
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

  // FAQ accordions are enhanced in JavaScript so the readable static content remains
  // available without it. The generated <button> inherits the heading's data-i18n key
  // so the language switcher can still find and translate it after this runs.
  (function(){
    document.querySelectorAll('.faq-item').forEach(function(item, index){
      var heading = item.querySelector('h4');
      var answer = item.querySelector('p');
      if(!heading || !answer) return;
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'faq-question';
      button.textContent = heading.textContent;
      var i18nKey = heading.getAttribute('data-i18n');
      if(i18nKey){ button.setAttribute('data-i18n', i18nKey); }
      button.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');
      answer.hidden = index !== 0;
      heading.textContent = '';
      heading.removeAttribute('data-i18n');
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

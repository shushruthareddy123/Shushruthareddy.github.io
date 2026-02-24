// Mobile nav + language toggle + small enhancements
(() => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('#navlinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Footer year
  const y = document.querySelector('#year');
  if (y) y.textContent = String(new Date().getFullYear());

  // Local “copy message” form (no backend)
  window.portfolioFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById('formStatus');
    const name = form.elements.namedItem('name').value.trim();
    const email = form.elements.namedItem('email').value.trim();
    const message = form.elements.namedItem('message').value.trim();

    const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    try {
      await navigator.clipboard.writeText(text);
      if (status) status.textContent = t('form_status_ok');
      form.reset();
    } catch (err) {
      if (status) status.textContent = t('form_status_fail');
    }
    return false;
  };

  // --- i18n (EN/DE) ---
  const dict = {
    en: {
      nav_about: "About",
      nav_skills: "Skills",
      nav_experience: "Experience",
      nav_projects: "Projects",
      nav_education: "Education",
      nav_contact: "Contact",

      hero_kicker: "Data Analyst • Berlin, Germany",
      hero_title: "Turning messy data into clear decisions.",
      hero_lead: "MSc Data Analytics (Berlin) with 3.5 years of experience at Cognizant. Skilled in <strong>SQL</strong>, <strong>Python</strong>, <strong>Power BI</strong>, and <strong>Excel</strong> for data cleaning, analysis, dashboards, and reporting.",
      cta_projects: "View Projects",
      cta_contact: "Hire / Collaborate",

      profile_sub: "Data Analyst • Former Quality Analyst (Cognizant)",
      fact_location: "Location",
      fact_email: "Email",
      fact_phone: "Phone",
      fact_languages: "Languages",
      fact_languages_value: "English (C2) • German (B1) • Telugu (Native)",
      download_cv: "Download CV",
      cv_tip: "Tip: upload your CV PDF to this repo and update the “Download CV” link.",

      about_title: "About",
      about_blurb: "I work across the analytics lifecycle: data cleaning → EDA → visualization → clear recommendations. My background in QA and automation helps me validate data integrity and build reliable reporting.",
      about_focus_title: "What I’m focused on",
      about_focus_1: "Building interactive dashboards in Power BI (KPIs, trends, segmentation).",
      about_focus_2: "SQL reporting & query optimization for faster insights.",
      about_focus_3: "Python workflows for analysis, visualization, and data scraping.",
      about_focus_4: "Data validation & quality checks (root cause analysis mindset from QA).",
      about_highlights_title: "Highlights",
      about_high_1: "3.5 years at Cognizant (Quality Analyst) across web + mobile applications.",
      about_high_2: "Used SQL for backend validation and issue root cause analysis.",
      about_high_3: "Automation testing with Selenium, Cypress, and Postman for API validation.",
      about_high_4: "Contributed to ~20% reduction in critical bugs across two release cycles.",

      skills_title: "Core Skills",
      skills_blurb: "A practical toolkit for analysis, reporting, and quality.",
      skills_data: "Data",
      skills_etl: "ETL basics",
      skills_validation: "Data validation",
      skills_bi: "BI & Visualization",
      skills_dash: "Dashboards & KPI reporting",
      skills_story: "Storytelling with data",
      skills_qa: "Automation & QA",
      skills_tools: "Tools",

      exp_title: "Experience",
      exp_blurb: "Roles that shaped my analytics + quality-first approach.",
      exp_role1: "Quality Analyst — Cognizant",
      exp_role1_time: "Oct 2021 – Apr 2025 • Hyderabad, India",
      exp_1_1: "Manual + automated testing for web and mobile apps (functionality, performance, UX).",
      exp_1_2: "Designed and executed test cases, test plans, and scripts aligned with requirements.",
      exp_1_3: "Used SQL for backend data validation, integrity checks, and root cause analysis.",
      exp_1_4: "Automated regression and functional testing with Selenium, Cypress; API validation with Postman.",
      exp_1_5: "Managed defects in Jira/Bugzilla/TestRail; created test summary reports and quality dashboards.",
      exp_1_6: "Performed web data scraping using Python (BeautifulSoup, Scrapy) to extract/validate test data.",
      exp_role2: "Mathematics Teacher",
      exp_role2_time: "2020 – Present • Hyderabad, India",
      exp_2_1: "Taught Mathematics to school students, strengthening conceptual understanding.",
      exp_2_2: "Designed lessons for different levels; tracked progress via regular assessments.",
      exp_2_3: "Encouraged active participation through interactive teaching methods.",

      proj_title: "Projects",
      proj_blurb: "Add screenshots, GitHub links, and short results for each project.",
      proj1_desc: "Interactive dashboard for trends, customer segments, and revenue performance.",
      proj1_b1: "Built KPI cards, trend charts, and drill-down views for monthly performance.",
      proj1_b2: "Enabled quick filtering by region, product, and segment.",
      proj2_desc: "Cleaned and analyzed a large dataset; visualized insights using statistical charts.",
      proj2_b1: "Data cleaning, feature engineering, and exploratory analysis with Pandas.",
      proj2_b2: "Visualizations with Matplotlib to communicate patterns and outliers.",
      proj3_desc: "Optimized SQL queries to extract, aggregate, and report KPIs from relational databases.",
      proj3_b1: "Designed reusable queries for weekly/monthly reporting.",
      proj3_b2: "Created summary tables/views for faster dashboard refresh.",
      view_demo: "View Demo",
      notebook: "Notebook",
      query_samples: "Query Samples",
      proj_tip_title: "Want this to stand out?",
      proj_tip: "Replace the placeholder screenshots in <code>/assets</code> with real images from your projects (PNG/JPG). Recruiters in Germany love clear outcomes.",

      edu_title: "Education",
      edu_blurb: "Academic background.",

      edu_1: "MSc Data Analytics — University of Creative Arts",
      edu_1_time: "Feb 2025 – Present • Berlin, Germany",
      edu_2: "Masters in Computer Science — Osmania University",
      edu_2_time: "2021 – 2023 • Hyderabad, India",
      edu_3: "BSc (Maths, Statistics & Computer Science) — Aurora's Degree and PG College",
      edu_3_time: "Aug 2021 • India",

      contact_title: "Contact",
      contact_blurb: "Reach out for roles, internships, freelance analytics, or collaborations.",
      contact_get: "Get in touch",
      contact_email: "Email",
      contact_phone: "Phone",
      contact_location: "Location",
      contact_optional: "Optional: add a contact form (Netlify Forms / Formspree) if you want messages without exposing email.",
      contact_quick: "Quick message (local)",
      contact_quick_note: "This form doesn’t send emails yet — it just copies your message to clipboard.",
      form_name: "Name",
      form_email: "Email",
      form_message: "Message",
      form_copy: "Copy message",
      form_status_ok: "Copied to clipboard. Paste it into an email to send.",
      form_status_fail: "Couldn't copy automatically. Please copy manually.",

      footer_built: "Built with GitHub Pages",
      back_to_top: "Back to top ↑",
    },

    de: {
      nav_about: "Über mich",
      nav_skills: "Fähigkeiten",
      nav_experience: "Erfahrung",
      nav_projects: "Projekte",
      nav_education: "Ausbildung",
      nav_contact: "Kontakt",

      hero_kicker: "Data Analyst • Berlin, Deutschland",
      hero_title: "Aus unübersichtlichen Daten werden klare Entscheidungen.",
      hero_lead: "MSc Data Analytics (Berlin) mit 3,5 Jahren Erfahrung bei Cognizant. Kompetent in <strong>SQL</strong>, <strong>Python</strong>, <strong>Power BI</strong> und <strong>Excel</strong> für Datenbereinigung, Analyse, Dashboards und Reporting.",
      cta_projects: "Projekte ansehen",
      cta_contact: "Kontakt / Zusammenarbeit",

      profile_sub: "Data Analyst • Ehem. Quality Analyst (Cognizant)",
      fact_location: "Ort",
      fact_email: "E‑Mail",
      fact_phone: "Telefon",
      fact_languages: "Sprachen",
      fact_languages_value: "Englisch (C2) • Deutsch (B1) • Telugu (Muttersprache)",
      download_cv: "Lebenslauf herunterladen",
      cv_tip: "Tipp: Lade deinen CV als PDF in dieses Repo hoch und aktualisiere den Link “Lebenslauf herunterladen”.",

      about_title: "Über mich",
      about_blurb: "Ich begleite den gesamten Analytics‑Prozess: Datenbereinigung → EDA → Visualisierung → klare Empfehlungen. Mein QA‑ und Automation‑Background hilft mir, Datenqualität zu sichern und zuverlässiges Reporting zu bauen.",
      about_focus_title: "Woran ich arbeite",
      about_focus_1: "Interaktive Dashboards in Power BI (KPIs, Trends, Segmentierung).",
      about_focus_2: "SQL‑Reporting & Query‑Optimierung für schnellere Insights.",
      about_focus_3: "Python‑Workflows für Analyse, Visualisierung und Data Scraping.",
      about_focus_4: "Datenvalidierung & Qualitätschecks (Root‑Cause‑Mindset aus QA).",
      about_highlights_title: "Highlights",
      about_high_1: "3,5 Jahre bei Cognizant (Quality Analyst) für Web‑ und Mobile‑Apps.",
      about_high_2: "SQL für Backend‑Validierung und Root‑Cause‑Analyse.",
      about_high_3: "Automation‑Tests mit Selenium, Cypress sowie API‑Validierung mit Postman.",
      about_high_4: "Beitrag zu ~20% weniger kritischen Bugs in zwei Release‑Zyklen.",

      skills_title: "Kernkompetenzen",
      skills_blurb: "Ein praxisnahes Toolkit für Analyse, Reporting und Qualität.",
      skills_data: "Daten",
      skills_etl: "ETL‑Grundlagen",
      skills_validation: "Datenvalidierung",
      skills_bi: "BI & Visualisierung",
      skills_dash: "Dashboards & KPI‑Reporting",
      skills_story: "Data Storytelling",
      skills_qa: "Automation & QA",
      skills_tools: "Tools",

      exp_title: "Berufserfahrung",
      exp_blurb: "Stationen, die meinen Analytics‑ und Quality‑First‑Ansatz geprägt haben.",
      exp_role1: "Quality Analyst — Cognizant",
      exp_role1_time: "Okt 2021 – Apr 2025 • Hyderabad, Indien",
      exp_1_1: "Manuelle + automatisierte Tests für Web‑ und Mobile‑Apps (Funktion, Performance, UX).",
      exp_1_2: "Erstellung und Ausführung von Testfällen, Testplänen und Skripten nach Anforderungen.",
      exp_1_3: "SQL für Backend‑Datenvalidierung, Integritätschecks und Root‑Cause‑Analyse.",
      exp_1_4: "Automatisierung von Regression/Funktionstests mit Selenium, Cypress; API‑Validierung mit Postman.",
      exp_1_5: "Defect‑Management in Jira/Bugzilla/TestRail; Testreports und Qualitätsübersichten.",
      exp_1_6: "Web‑Scraping mit Python (BeautifulSoup, Scrapy) zum Extrahieren/Validieren von Testdaten.",
      exp_role2: "Mathematiklehrerin",
      exp_role2_time: "2020 – Heute • Hyderabad, Indien",
      exp_2_1: "Unterrichtete Mathematik und stärkte konzeptionelles Verständnis.",
      exp_2_2: "Erstellte Unterrichtspläne für verschiedene Niveaus; Lernfortschritt durch Tests verfolgt.",
      exp_2_3: "Förderte aktive Teilnahme durch interaktive Methoden.",

      proj_title: "Projekte",
      proj_blurb: "Füge Screenshots, GitHub‑Links und kurze Ergebnisse zu jedem Projekt hinzu.",
      proj1_desc: "Interaktives Dashboard für Trends, Kundensegmente und Umsatz‑Performance.",
      proj1_b1: "KPI‑Cards, Trendcharts und Drill‑Down‑Ansichten für Monatsperformance erstellt.",
      proj1_b2: "Schnelle Filter nach Region, Produkt und Segment ermöglicht.",
      proj2_desc: "Großen Datensatz bereinigt und analysiert; Insights über statistische Charts visualisiert.",
      proj2_b1: "Datenbereinigung, Feature Engineering und EDA mit Pandas.",
      proj2_b2: "Visualisierungen mit Matplotlib zur Darstellung von Mustern und Ausreißern.",
      proj3_desc: "SQL‑Queries optimiert, um KPIs aus relationalen Datenbanken zu extrahieren und zu reporten.",
      proj3_b1: "Wiederverwendbare Queries für Wochen/Monats‑Reporting entwickelt.",
      proj3_b2: "Summary‑Tabellen/Views für schnellere Dashboard‑Refreshs erstellt.",
      view_demo: "Demo ansehen",
      notebook: "Notebook",
      query_samples: "SQL‑Beispiele",
      proj_tip_title: "Soll es besonders wirken?",
      proj_tip: "Ersetze die Platzhalter‑Screenshots in <code>/assets</code> durch echte Bilder deiner Projekte (PNG/JPG). Recruiter in Deutschland lieben klare Ergebnisse.",

      edu_title: "Ausbildung",
      edu_blurb: "Akademischer Hintergrund.",

      edu_1: "MSc Data Analytics — University of Creative Arts",
      edu_1_time: "Feb 2025 – Heute • Berlin, Deutschland",
      edu_2: "Master in Computer Science — Osmania University",
      edu_2_time: "2021 – 2023 • Hyderabad, Indien",
      edu_3: "BSc (Mathe, Statistik & Informatik) — Aurora's Degree and PG College",
      edu_3_time: "Aug 2021 • Indien",

      contact_title: "Kontakt",
      contact_blurb: "Melde dich für Jobs, Praktika, Freelance‑Analytics oder Kooperationen.",
      contact_get: "Kontakt aufnehmen",
      contact_email: "E‑Mail",
      contact_phone: "Telefon",
      contact_location: "Ort",
      contact_optional: "Optional: Kontaktformular (Netlify Forms / Formspree), wenn du Nachrichten ohne sichtbare E‑Mail willst.",
      contact_quick: "Kurznachricht (lokal)",
      contact_quick_note: "Dieses Formular sendet noch keine E‑Mails — es kopiert die Nachricht in die Zwischenablage.",
      form_name: "Name",
      form_email: "E‑Mail",
      form_message: "Nachricht",
      form_copy: "Nachricht kopieren",
      form_status_ok: "In die Zwischenablage kopiert. In eine E‑Mail einfügen und senden.",
      form_status_fail: "Automatisches Kopieren nicht möglich. Bitte manuell kopieren.",

      footer_built: "Erstellt mit GitHub Pages",
      back_to_top: "Nach oben ↑",
    }
  };

  function setLang(lang){
    const safe = (lang === 'de') ? 'de' : 'en';
    document.documentElement.lang = safe;
    localStorage.setItem('lang', safe);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = dict[safe][key];
      if (!val) return;
      el.innerHTML = val;
    });

    document.querySelectorAll('.pill').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-lang-label') === safe);
    });

    // Update form placeholders for DE
    const name = document.querySelector('input[name="name"]');
    const email = document.querySelector('input[name="email"]');
    const msg = document.querySelector('textarea[name="message"]');
    if (safe === 'de') {
      if (name) name.placeholder = "Dein Name";
      if (email) email.placeholder = "du@beispiel.de";
      if (msg) msg.placeholder = "Hallo Shushrutha, ich möchte über … sprechen";
    } else {
      if (name) name.placeholder = "Your name";
      if (email) email.placeholder = "you@example.com";
      if (msg) msg.placeholder = "Hi Shushrutha, I’d like to talk about…";
    }
  }

  function t(key){
    const lang = localStorage.getItem('lang') || 'en';
    return (dict[lang] && dict[lang][key]) ? dict[lang][key] : (dict.en[key] || "");
  }

  window.t = t;

  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const current = localStorage.getItem('lang') || 'en';
      setLang(current === 'en' ? 'de' : 'en');
    });
  }

  // Init language
  setLang(localStorage.getItem('lang') || 'en');
})();

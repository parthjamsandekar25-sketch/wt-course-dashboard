/* wtsla.js: complete single-file application logic.
   Course data, state, rendering, search/filter, navigation, and quiz logic. */

/* ---------- Course data (Module 4.2 JSON structure, defined as a JS object) ---------- */
/* Paste the video source in the youtubeLink field. Accepted formats:
   1. The full YouTube embed iframe code from Share > Embed, wrapped in single quotes.
   2. Full links: https://youtu.be/ID, https://www.youtube.com/watch?v=ID, embed links.
   3. A plain video ID.
   Extra parameters like ?si= are ignored. If you paste an iframe, keep the single
   quotes around it; the code contains double quotes which must not be re-used outside. */

const courseData = {
  courses: [
    {
      id: 'electronics',
      title: 'Electronics',
      description: 'Foundations of VLSI design and embedded systems, including microprocessor architecture and assembly language programming.',
      subjects: ['Electronics', 'Embedded Systems'],
      tree: [
        {
          type: 'section',
          title: 'VLSI',
          children: [
            {
              type: 'section',
              title: 'Basics of VLSI',
              children: [
                { type: 'video', title: 'Introduction to VLSI', youtubeLink: '<iframe width="560" height="315" src="https://www.youtube.com/embed/9Q9yIyNiAJQ?si=poaqSsRL3bQJ0IDg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' },
                { type: 'video', title: 'VLSI Design Flow', youtubeLink: 'https://youtu.be/vKtoQEAoGck?si=eoV65R0ChTHoz9Fr' }
              ]
            }
          ]
        },
        {
          type: 'section',
          title: 'Embedded Systems',
          children: [
            {
              type: 'section',
              title: 'Microprocessor',
              children: [
                {
                  type: 'section',
                  title: '8085',
                  children: [
                    { type: 'video', title: '8085 Architecture', youtubeLink: 'https://youtu.be/OK_LudRfBas?si=OYJxX7I0QFMSGDKO' },
                    { type: 'video', title: '8085 ALP', youtubeLink: 'https://youtu.be/DK8dA7b2CdI?si=CWnZp_y3f7fNKJKM' }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'quiz',
          title: 'Electronics Course Quiz',
          questions: [
            {
              q: 'How many pins does the 8085 microprocessor have?',
              options: ['30', '40', '50', '64'],
              answer: 1
            },
            {
              q: 'Which unit of the 8085 performs arithmetic and logic operations?',
              options: ['Control Unit', 'ALU', 'Register Array', 'Interrupt Controller'],
              answer: 1
            },
            {
              q: 'VLSI stands for:',
              options: ['Very Large Scale Integration', 'Variable Logic System Interface', 'Virtual Layered Silicon Integration', 'Very Low Speed Interface'],
              answer: 0
            },
            {
              q: 'In 8085 ALP, the instruction MOV A, B performs which operation?',
              options: ['Adds B to A', 'Moves the content of register B to register A', 'Compares A with B', 'Stores A at the address in B'],
              answer: 1
            },
            {
              q: 'Which of these is a step in the VLSI design flow?',
              options: ['Specification', 'Floorplanning', 'Routing', 'All of these'],
              answer: 3
            }
          ]
        }
      ]
    },
    {
      id: 'web-dev',
      title: 'Web Development Basics',
      description: 'HTML structure, CSS layout, and JavaScript interactivity for building static web pages.',
      subjects: ['Web Development', 'Programming'],
      tree: [
        {
          type: 'section',
          title: 'HTML',
          children: [
            { type: 'video', title: 'HTML Document Structure', youtubeLink: 'https://youtu.be/it1rTvBcfRg?si=cDnVcacxiZuC1_sG' },
            { type: 'video', title: 'Images', youtubeLink: 'https://youtu.be/FmoYRiepmOE?si=TKwQoC0DcZl9B_Eu' },
            { type: 'video', title: 'Tables', youtubeLink: 'https://youtu.be/e62D-aayveY?si=qLvmmCnNM4-DoN3s' },
            { type: 'video', title: 'Forms', youtubeLink: 'https://youtu.be/VLeERv_dR6Q?si=IuUJ2K0FN-Niudli' }
          ]
        },
        {
          type: 'section',
          title: 'CSS',
          children: [
            {
              type: 'section',
              title: 'CSS Basics',
              children: [
                { type: 'video', title: 'CSS Syntax', youtubeLink: 'https://youtu.be/G8r00ZNopTE?si=NLUQ1sehaIYR2ziq' },
                { type: 'video', title: 'Selectors', youtubeLink: 'https://youtu.be/ZNskBxLVOfs?si=V5S7q5ocGFNCwPJS' },
                { type: 'video', title: 'Colors', youtubeLink: 'https://youtu.be/6tbUo6PXc88?si=D_Gq_OEAeD3JtsBg' },
                { type: 'video', title: 'Backgrounds', youtubeLink: 'https://youtu.be/FMyU_h8m-0c?si=ewjuGrcQKMFbqU0o' }
              ]
            }
          ]
        },
        {
          type: 'section',
          title: 'JavaScript',
          children: [
            { type: 'video', title: 'Variables and Functions', youtubeLink: 'https://youtu.be/7xStNKTM3bE?si=mDU9ZfV9LN3KCb0v' },
            { type: 'video', title: 'DOM Manipulation', youtubeLink: 'https://youtu.be/y17RuWkWdn8?si=H_AhfuREcX5-VFfF' }
          ]
        },
        {
          type: 'quiz',
          title: 'Web Development Quiz',
          questions: [
            {
              q: 'Which tag is used for the largest heading in HTML?',
              options: ['h6', 'head', 'h1', 'title'],
              answer: 2
            },
            {
              q: 'Which CSS property controls the space between an element border and its content?',
              options: ['margin', 'padding', 'gap', 'border-spacing'],
              answer: 1
            },
            {
              q: 'Which array method creates a new array containing only the elements that pass a test?',
              options: ['map()', 'filter()', 'reduce()', 'forEach()'],
              answer: 1
            },
            {
              q: 'Which method attaches an event handler to a DOM element?',
              options: ['addEventListener()', 'attachEvent()', 'onEvent()', 'listen()'],
              answer: 0
            }
          ]
        }
      ]
    },
    {
      id: 'microcontrollers',
      title: 'Microcontrollers',
      description: 'Arduino and ESP32 programming.',
      subjects: ['Electronics', 'Programming'],
      tree: [
        {
          type: 'section',
          title: 'Arduino',
          children: [
            { type: 'video', title: 'Introduction', youtubeLink: 'https://youtu.be/JnJIKX5J0Cc?si=NJ88SA3SyBn9D1Ia' },
            { type: 'video', title: 'Setting up Arduino IDE', youtubeLink: 'https://youtu.be/SX8z3-BEuWQ?si=P9zB9JvoLmcmM2FX' },
            { type: 'video', title: 'Arduino Hello World', youtubeLink: 'https://youtu.be/ynAvySNCi-0?si=Lqmefp-nB9dRojXn' },
            { type: 'video', title: 'Program Structure', youtubeLink: 'https://youtu.be/EVDnYnAyktw?si=PzibG_V_e4H8OXUx' },
            { type: 'video', title: 'Variables', youtubeLink: 'https://youtu.be/m8ov5S78AlY?si=-b80bdGJtbtfb4OL' },
            { type: 'video', title: 'Digital Output', youtubeLink: 'https://youtu.be/Q5A2vsa2B-g?si=OWSu8r2TBSIsKczz' },
            { type: 'video', title: 'Building an LED Signal', youtubeLink: 'https://youtu.be/oOBxocRbdbo?si=Ii0HDdjOVNDfk_Ms' }
          ]
        },
        {
          type: 'section',
          title: 'ESP32',
          children: [
            {
              type: 'section',
              title: 'ESP32 Basics',
              children: [
                { type: 'video', title: 'ESP32 Bluetooth Connections', youtubeLink: 'https://youtu.be/9eaC9iLqiRc?si=GnaDhFTNJN9VPhwM' },
                { type: 'video', title: 'Multiple LED Control', youtubeLink: 'https://youtu.be/k6LfDma0BDg?si=gOvgcgcEXcKV7Mha' },
                { type: 'video', title: 'Relay Control', youtubeLink: 'https://youtu.be/6zFtS-m3Cng?si=Gi_fI-BITp_mmsgn' },
                { type: 'video', title: 'ESP32 LDR Control', youtubeLink: 'https://youtu.be/3uBj2Vp3avU?si=wpp4JSshnrcZLWzE' }
              ]
            }
          ]
        },
        {
          type: 'quiz',
          title: 'Microcontrollers Quiz',
          questions: [
            {
              q: 'What language is a typical Arduino code based on?',
              options: ['Python', 'C++', 'Java', 'C'],
              answer: 1
            },
            {
              q: 'How many analog input pins does an Arduino Uno have?',
              options: ['12', '8', '4', '6'],
              answer: 3
            },
            {
              q: 'What is the primary purpose of the ESP32 microcontroller?',
              options: ['IoT Applications', 'Web Development', 'Game Design', 'App Development'],
              answer: 0
            },
            {
              q: 'What type of devices can the ESP32 control in IoT?',
              options: ['Sensors', 'Actuators', 'Home Appliances', 'All of the Above'],
              answer: 3
            }
          ]
        }
      ]
    }
  ]
};

/* ---------- Application state (session only, resets on refresh) ---------- */

const state = {
  watched: {},        /* keys of the form 'courseId:lessonIndex', true when a video is watched */
  quizResults: {},    /* courseId -> { score, total, percent, passed } */
  currentCourse: null,
  currentLessonIndex: 0
};

/* ---------- DOM helper (Module 3.3) ---------- */

function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

/* ---------- Embed code extraction (Module 3.1 strings, 3.2 loops and conditionals) ---------- */

/* If the pasted value is a full YouTube embed iframe, pull the src URL out of it.
   Finds src="..." inside the tag and returns just the URL. Returns '' for non-iframe input. */
function extractEmbedSource(value) {
  if (!value || typeof value !== 'string') return '';
  if (!value.includes('<iframe')) return value; /* not an embed code, return unchanged */
  const srcMarker = 'src="';
  const markerPos = value.indexOf(srcMarker);
  if (markerPos === -1) return '';
  const urlStart = markerPos + srcMarker.length;
  const urlEnd = value.indexOf('"', urlStart);
  if (urlEnd === -1) return '';
  return value.substring(urlStart, urlEnd);
}

/* ---------- YouTube ID parsing (Module 3.1 strings, 3.2 loops and conditionals) ---------- */

function extractYouTubeId(link) {
  if (!link || typeof link !== 'string') return '';

/* Step 1: if an embed iframe code was pasted, reduce it to its src URL first. */
  const source = extractEmbedSource(link);
  if (source === '') return '';
  link = source;

/* Step 2: find the ID part in whatever link format was provided. */
  let id = '';
  const watchPart = 'watch?v=';
  const shortPart = 'youtu.be/';
  const embedPart = 'embed/';
  if (link.includes(watchPart)) {
    id = link.substring(link.indexOf(watchPart) + watchPart.length);
  } else if (link.includes(shortPart)) {
    id = link.substring(link.indexOf(shortPart) + shortPart.length);
  } else if (link.includes(embedPart)) {
    id = link.substring(link.indexOf(embedPart) + embedPart.length);
  } else {
    id = link; /* a plain ID was pasted */
  }

/* Step 3: cut off anything after the ID, such as ?si= share parameters or &list= extras. */
  const stopChars = ['?', '&', '/'];
  for (let i = 0; i < stopChars.length; i++) {
    const pos = id.indexOf(stopChars[i]);
    if (pos !== -1) id = id.substring(0, pos);
  }
  return id;
}

/* ---------- Tree helpers (recursive, Module 3.2) ---------- */

/* Count video nodes in a tree. */
function countVideos(nodes) {
  let total = 0;
  nodes.forEach(function (node) {
    if (node.type === 'video') total += 1;
    if (node.children) total += countVideos(node.children);
  });
  return total;
}

/* Flatten the course tree into an ordered lesson flow: all videos in order, quiz last. */
function flattenCourse(course) {
  const flat = [];
  function walk(nodes) {
    nodes.forEach(function (node) {
      if (node.type === 'video' || node.type === 'quiz') flat.push(node);
      if (node.children) walk(node.children);
    });
  }
  walk(course.tree);
  flat.forEach(function (node, index) { node.flatIndex = index; });
  return flat;
}

/* Collect all searchable text of a course: title, description, subjects, every node title. */
function courseSearchText(course) {
  let text = course.title + ' ' + course.description + ' ' + course.subjects.join(' ');
  function walk(nodes) {
    nodes.forEach(function (node) {
      if (node.title) text += ' ' + node.title;
      if (node.children) walk(node.children);
    });
  }
  walk(course.tree);
  return text.toLowerCase();
}

/* ---------- Watched state helpers ---------- */

function isWatched(course, index) {
  return Boolean(state.watched[course.id + ':' + index]);
}

function countWatched(course) {
  let watched = 0;
  course.flat.forEach(function (node) {
    if (node.type === 'video' && isWatched(course, node.flatIndex)) watched += 1;
  });
  return watched;
}

/* ---------- Dashboard rendering ---------- */

function renderCourseCard(course) {
  const card = createEl('article', 'bg-white rounded border border-slate-200 p-5 flex flex-col');
  card.append(createEl('h3', 'text-lg font-bold mb-1', course.title));
  card.append(createEl('p', 'text-sm text-slate-500 mb-3', course.description));

const tags = createEl('div', 'flex flex-wrap gap-2 mb-4');
  course.subjects.forEach(function (subject) {
    tags.append(createEl('span', 'subject-tag', subject));
  });
  card.append(tags);

const total = course.totalVideos;
  const watched = countWatched(course);
  const pct = total > 0 ? Math.round((watched / total) * 100) : 0;

const track = createEl('div', 'progress-track');
  const fill = createEl('div', 'progress-fill');
  fill.style.width = pct + '%';
  track.append(fill);
  card.append(track);
  card.append(createEl('p', 'text-xs text-slate-500 mt-1 mb-4',
    watched + ' of ' + total + ' videos watched (' + pct + '%)'));

const quizResult = state.quizResults[course.id];
  let statusText;
  if (quizResult) {
    statusText = 'Quiz completed. Score: ' + quizResult.percent + '% (' + (quizResult.passed ? 'Passed' : 'Failed') + ')';
  } else if (total > 0 && watched === total) {
    statusText = 'All videos watched. Quiz available at the end of the course.';
  } else if (watched > 0) {
    statusText = 'In progress.';
  } else {
    statusText = 'Not started.';
  }
  card.append(createEl('p', 'text-sm font-semibold mb-4', statusText));

const openBtn = createEl('button', 'btn btn-primary mt-auto', 'Open Course');
  openBtn.dataset.courseId = course.id;
  card.append(openBtn);
  return card;
}

/* Build the subject filter options from all course subjects (Module 4.2 array handling). */
function populateSubjectFilter(courses) {
  const select = document.getElementById('subject-filter');
  const subjects = [];
  courses.forEach(function (course) {
    course.subjects.forEach(function (subject) {
      if (!subjects.includes(subject)) subjects.push(subject);
    });
  });
  subjects.sort().forEach(function (subject) {
    const option = document.createElement('option');
    option.value = subject;
    option.textContent = subject;
    select.append(option);
  });
}

/* Dashboard with search and subject filtering (Module 4.2 filter). */
function renderDashboard() {
  const term = document.getElementById('search-input').value.trim().toLowerCase();
  const subject = document.getElementById('subject-filter').value;
  const list = document.getElementById('course-list');
  list.innerHTML = '';

const visible = courseData.courses.filter(function (course) {
    const matchesSubject = subject === '' || course.subjects.includes(subject);
    const matchesTerm = term === '' || courseSearchText(course).includes(term);
    return matchesSubject && matchesTerm;
  });

visible.forEach(function (course) {
    list.append(renderCourseCard(course));
  });
  document.getElementById('no-results').classList.toggle('hidden', visible.length > 0);
}

/* ---------- Course tree rendering (recursive) ---------- */

function buildTreeNode(node, course) {
  if (node.type === 'video' || node.type === 'quiz') {
    const item = createEl('div', 'tree-node', node.title);
    item.dataset.lessonIndex = node.flatIndex;
    if (node.type === 'quiz') item.classList.add('tree-quiz');
    if (node.type === 'video' && isWatched(course, node.flatIndex)) item.classList.add('watched');
    if (node.flatIndex === state.currentLessonIndex) item.classList.add('active');
    item.addEventListener('click', function () { openLesson(node.flatIndex); });
    return item;
  }
  const wrapper = createEl('div', 'tree-section');
  const toggle = createEl('div', 'tree-toggle', node.title);
  const children = createEl('div', 'tree-children');
  node.children.forEach(function (child) {
    children.append(buildTreeNode(child, course));
  });
  toggle.addEventListener('click', function () { children.classList.toggle('hidden'); });
  wrapper.append(toggle, children);
  return wrapper;
}

function renderCourseTree(course) {
  const container = document.getElementById('course-tree');
  container.innerHTML = '';
  container.append(createEl('h2', 'text-base font-bold mb-3', course.title));
  course.tree.forEach(function (node) {
    container.append(buildTreeNode(node, course));
  });
}

/* Progress panel shown above the lesson content. */
function renderCourseProgressPanel(course) {
  const panel = document.getElementById('course-progress');
  panel.innerHTML = '';
  panel.append(createEl('h2', 'text-lg font-bold mb-2', course.title));

const total = course.totalVideos;
  const watched = countWatched(course);
  const pct = total > 0 ? Math.round((watched / total) * 100) : 0;

const track = createEl('div', 'progress-track mb-1');
  const fill = createEl('div', 'progress-fill');
  fill.style.width = pct + '%';
  track.append(fill);
  panel.append(track);
  panel.append(createEl('p', 'text-xs text-slate-500',
    watched + ' of ' + total + ' videos watched (' + pct + '%)'));

const quizResult = state.quizResults[course.id];
  if (quizResult) {
    panel.append(createEl('p', 'text-sm mt-2',
      'Quiz score: ' + quizResult.percent + '% (' + (quizResult.passed ? 'Passed' : 'Failed') + ')'));
  }
}

/* ---------- Lesson panel: video or quiz, same content area (no separate page) ---------- */

function renderLessonPanel(course, node) {
  const panel = document.getElementById('lesson-content');
  panel.innerHTML = '';
  if (node.type === 'video') {
    panel.append(buildVideoPanel(course, node));
  } else if (node.type === 'quiz') {
    panel.append(buildQuizPanel(course, node));
  }
}

function buildVideoPanel(course, node) {
  const wrap = createEl('div');
  wrap.append(createEl('h2', 'text-lg font-bold mb-3', node.title));

const videoId = extractYouTubeId(node.youtubeLink);
  if (videoId === '') {
    const missing = createEl('p', 'text-sm text-red-600',
      'No valid YouTube link was found for this lesson. Check the youtubeLink field in the course data.');
    wrap.append(missing);
  } else {
    const frame = document.createElement('iframe');
    frame.className = 'video-frame';
    frame.src = 'https://www.youtube.com/embed/' + videoId;
    frame.title = node.title;
    frame.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    frame.allowFullscreen = true;
    wrap.append(frame);

/* Fallback link: some uploaders disable embedding, in which case YouTube
       blocks playback inside the iframe. The same video still plays on youtube.com. */
    const watchLink = document.createElement('a');
    watchLink.href = 'https://www.youtube.com/watch?v=' + videoId;
    watchLink.target = '_blank';
    watchLink.rel = 'noopener';
    watchLink.textContent = 'Video not playing above? Watch it on YouTube';
    watchLink.className = 'block text-sm text-blue-600 hover:underline mt-2';
    wrap.append(watchLink);
  }

const controls = createEl('div', 'flex flex-wrap gap-3 mt-4');

const prevBtn = createEl('button', 'btn btn-secondary', 'Previous');
  prevBtn.disabled = node.flatIndex === 0;
  prevBtn.addEventListener('click', function () { openLesson(node.flatIndex - 1); });

const markBtn = createEl('button', 'btn btn-primary', 'Mark as Watched');
  if (isWatched(course, node.flatIndex)) {
    markBtn.textContent = 'Watched';
    markBtn.disabled = true;
  }
  markBtn.addEventListener('click', function () { markWatched(course, node.flatIndex); });

const nextBtn = createEl('button', 'btn btn-secondary', 'Next');
  nextBtn.disabled = node.flatIndex >= course.flat.length - 1;
  nextBtn.addEventListener('click', function () { openLesson(node.flatIndex + 1); });

controls.append(prevBtn, markBtn, nextBtn);
  wrap.append(controls);
  return wrap;
}

function buildQuizPanel(course, node) {
  const wrap = createEl('div');
  wrap.append(createEl('h2', 'text-lg font-bold mb-2', node.title));
  wrap.append(createEl('p', 'text-sm text-slate-500 mb-4',
    'Answer all questions and submit. Your score is shown immediately. A score of 60% or more is a pass.'));

const previous = state.quizResults[course.id];
  if (previous) {
    wrap.append(createEl('p', 'quiz-result mb-4',
      'Previous attempt: ' + previous.score + ' out of ' + previous.total +
      ' (' + previous.percent + '%). ' + (previous.passed ? 'Passed.' : 'Failed. You can retake the quiz.')));
  }

const form = createEl('form');
  node.questions.forEach(function (question, i) {
    const fieldset = createEl('fieldset', 'border border-slate-200 rounded p-4 mb-4');
    fieldset.append(createEl('legend', 'text-xs font-semibold uppercase text-slate-400',
      'Question ' + (i + 1)));
    fieldset.append(createEl('p', 'text-sm mb-3', question.q));
    question.options.forEach(function (option, j) {
      const label = createEl('label', 'block text-sm mb-1');
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'question-' + i;
      radio.value = String(j);
      radio.required = true;
      radio.className = 'mr-2';
      label.append(radio, document.createTextNode(option));
      fieldset.append(label);
    });
    form.append(fieldset);
  });

const submitBtn = createEl('button', 'btn btn-primary', 'Submit Quiz');
  submitBtn.type = 'submit';
  form.append(submitBtn);

form.addEventListener('submit', function (event) {
    event.preventDefault();
    let score = 0;
    node.questions.forEach(function (question, i) {
      const selected = form.querySelector('input[name="question-' + i + '"]:checked');
      if (selected && Number(selected.value) === question.answer) score += 1;
    });
    const total = node.questions.length;
    const percent = Math.round((score / total) * 100);
    const passed = percent >= 60;
    state.quizResults[course.id] = { score: score, total: total, percent: percent, passed: passed };

const result = createEl('div', 'quiz-result-final mt-4');
    result.append(createEl('p', 'text-lg font-bold',
      'You scored ' + score + ' out of ' + total + ' (' + percent + '%)'));
    result.append(createEl('p', 'text-sm mt-1',
      passed ? 'Result: Passed.' : 'Result: Failed. A score of 60% or more is required to pass.'));
    wrap.append(result);
    form.remove();
    renderCourseProgressPanel(course);
  });

wrap.append(form);
  return wrap;
}

/* ---------- Navigation ---------- */

/* Open a course. Resume at the first unwatched video, or the first lesson. */
function openCourse(courseId) {
  const course = courseData.courses.find(function (c) { return c.id === courseId; });
  if (!course) return;
  state.currentCourse = course;
  const firstUnwatched = course.flat.find(function (node) {
    return node.type === 'video' && !isWatched(course, node.flatIndex);
  });
  state.currentLessonIndex = firstUnwatched ? firstUnwatched.flatIndex : 0;

document.getElementById('dashboard-section').classList.add('hidden');
  document.getElementById('search-bar').classList.add('hidden');
  document.getElementById('course-section').classList.remove('hidden');
  document.getElementById('back-btn').classList.remove('hidden');
  renderCourseView();
}

function renderCourseView() {
  const course = state.currentCourse;
  renderCourseProgressPanel(course);
  renderCourseTree(course);
  renderLessonPanel(course, course.flat[state.currentLessonIndex]);
}

function openLesson(index) {
  state.currentLessonIndex = index;
  renderCourseView();
}

function markWatched(course, index) {
  state.watched[course.id + ':' + index] = true;
  renderCourseView();
}

function showDashboard() {
  state.currentCourse = null;
  document.getElementById('course-section').classList.add('hidden');
  document.getElementById('dashboard-section').classList.remove('hidden');
  document.getElementById('search-bar').classList.remove('hidden');
  document.getElementById('back-btn').classList.add('hidden');
  renderDashboard();
}

/* ---------- Initialization (Module 3.3 event wiring) ---------- */

function initApp() {
  courseData.courses.forEach(function (course) {
    course.flat = flattenCourse(course);
    course.totalVideos = countVideos(course.tree);
  });

populateSubjectFilter(courseData.courses);

document.getElementById('search-input').addEventListener('input', renderDashboard);
  document.getElementById('subject-filter').addEventListener('change', renderDashboard);
  document.getElementById('back-btn').addEventListener('click', showDashboard);
  document.getElementById('course-list').addEventListener('click', handleCourseListClick);

renderDashboard();
}

function handleCourseListClick(event) {
  const button = event.target.closest('button[data-course-id]');
  if (button) openCourse(button.dataset.courseId);
}

document.addEventListener('DOMContentLoaded', initApp);
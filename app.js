const STORAGE_KEY = 'grammar-tracker-v1';
const INTERVALS = [1, 3, 7, 14, 30];
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const DAY_NAMES = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const TOPICS = [
  {
    id: 'to-be',
    level: 'A1',
    title: 'to be + местоимения',
    rules: [
      'I am, you are, he is, she is, it is, we are, they are',
      'Отрицание: I’m not, he isn’t, they aren’t',
      'Вопрос: Am I…? Is she…? Are they…?'
    ],
    oral: 'I am a student. He is my friend.',
    exercises: [
      { prompt: 'I ___ a student.', answer: 'am' },
      { prompt: 'She ___ my sister.', answer: 'is' },
      { prompt: 'They ___ friends.', answer: 'are' },
      { prompt: '___ you ready?', answer: 'are' },
      { prompt: 'He ___ not a doctor.', answer: 'is' }
    ]
  },
  {
    id: 'articles',
    level: 'A1',
    title: 'a / an / the',
    rules: [
      'a — перед согласным: a book, a pen',
      'an — перед гласным: an apple, an egg',
      'the — когда предмет уже известен: the book on the table'
    ],
    oral: 'It’s a pen. It’s an egg.',
    exercises: [
      { prompt: 'It’s ___ book.', answer: 'a' },
      { prompt: 'It’s ___ apple.', answer: 'an' },
      { prompt: 'I have ___ dog.', answer: 'a' },
      { prompt: 'She is ___ teacher.', answer: 'a' },
      { prompt: 'This is ___ egg.', answer: 'an' }
    ]
  },
  {
    id: 'plural',
    level: 'A1',
    title: 'Множественное число',
    rules: [
      'Обычно добавляем -s: cat → cats',
      'После s, x, ch, sh добавляем -es: bus → buses, box → boxes',
      'one → two, apples, pens'
    ],
    oral: 'Two cats. Three buses.',
    exercises: [
      { prompt: 'I see two ___ (cat).', answer: 'cats' },
      { prompt: 'There are three ___ (bus).', answer: 'buses' },
      { prompt: 'She has two ___ (box).', answer: 'boxes' },
      { prompt: 'one apple → two ___', answer: 'apples' },
      { prompt: 'one pen → two ___', answer: 'pens' }
    ]
  },
  {
    id: 'have-got',
    level: 'A1',
    title: 'have got / has got',
    rules: [
      'I / you / we / they have got',
      'he / she / it has got',
      'Вопрос: Have you got…? Has she got…?'
    ],
    oral: 'I have got a dog. She has got a cat.',
    exercises: [
      { prompt: 'I ___ got a dog.', answer: 'have' },
      { prompt: 'She ___ got a cat.', answer: 'has' },
      { prompt: 'We ___ got a car.', answer: 'have' },
      { prompt: '___ you got a pen?', answer: 'have' },
      { prompt: 'He ___ got a bike.', answer: 'has' }
    ]
  },
  {
    id: 'can',
    level: 'A1',
    title: 'can — умение',
    rules: [
      'can + глагол без to: I can swim',
      'Отрицание: can’t / cannot',
      'Вопрос: Can you swim?'
    ],
    oral: 'I can read. I can’t drive.',
    exercises: [
      { prompt: 'I ___ swim.', answer: 'can' },
      { prompt: 'He ___ ride a bike.', answer: 'can' },
      { prompt: 'We ___ speak English.', answer: 'can' },
      { prompt: 'I ___ fly.', answer: 'can’t', accepts: ['cant', 'cannot'] },
      { prompt: 'They ___ dance.', answer: 'can' }
    ]
  },
  {
    id: 'present-simple',
    level: 'A1',
    title: 'Present Simple: I / you / we / they',
    rules: [
      'Обычное действие: I live, we play, they work',
      'С he / she / it глагол получает -s: she works',
      'Часто с always, usually, every day'
    ],
    oral: 'I work. We play.',
    exercises: [
      { prompt: 'I ___ in Moscow.', answer: 'live' },
      { prompt: 'We ___ football.', answer: 'play' },
      { prompt: 'You ___ tea.', answer: 'like' },
      { prompt: 'They ___ in a house.', answer: 'live' },
      { prompt: 'I ___ English.', answer: 'study' }
    ]
  },
  {
    id: 'negatives',
    level: 'A1',
    title: 'don’t / doesn’t',
    rules: [
      'I / you / we / they + don’t + глагол',
      'he / she / it + doesn’t + глагол',
      'После doesn’t глагол без -s: He doesn’t work.'
    ],
    oral: 'I don’t like it. He doesn’t run.',
    exercises: [
      { prompt: 'I ___ like coffee.', answer: 'don’t', accepts: ['do not'] },
      { prompt: 'He ___ like tea.', answer: 'doesn’t', accepts: ['does not'] },
      { prompt: 'We ___ have a dog.', answer: 'don’t', accepts: ['do not'] },
      { prompt: 'She ___ work here.', answer: 'doesn’t', accepts: ['does not'] },
      { prompt: 'They ___ play tennis.', answer: 'don’t', accepts: ['do not'] }
    ]
  },
  {
    id: 'questions',
    level: 'A1',
    title: 'Do / Does…?',
    rules: [
      'Do you / we / they…?',
      'Does he / she / it…?',
      'После does глагол без -s: Does she work?'
    ],
    oral: 'Do you like tea? Does she work?',
    exercises: [
      { prompt: '___ you like tea?', answer: 'do' },
      { prompt: '___ she work here?', answer: 'does' },
      { prompt: '___ they play tennis?', answer: 'do' },
      { prompt: '___ he have a car?', answer: 'does' },
      { prompt: '___ I know you?', answer: 'do' }
    ]
  },
  {
    id: 'there-is',
    level: 'A1',
    title: 'there is / there are',
    rules: [
      'there is + единственное число: There is a table',
      'there are + множественное число: There are two chairs',
      'Вопрос: Is there…? Are there…?'
    ],
    oral: 'There is a table. There are two chairs.',
    exercises: [
      { prompt: '___ a table in the room.', answer: 'there is', accepts: ['there’s', 'theres'] },
      { prompt: '___ two chairs.', answer: 'there are' },
      { prompt: '___ a book on the desk.', answer: 'there is', accepts: ['there’s', 'theres'] },
      { prompt: '___ three apples.', answer: 'there are' },
      { prompt: '___ a dog in the garden.', answer: 'there is', accepts: ['there’s', 'theres'] }
    ]
  },
  {
    id: 'prepositions',
    level: 'A1',
    title: 'in / on / at + ’s',
    rules: [
      'in — внутри: in the box',
      'on — на поверхности / день: on the table, on Monday',
      'at — время / точка: at 7 o’clock; ’s — принадлежность: Ann’s pen'
    ],
    oral: 'On Monday. Ann’s book. In the box.',
    exercises: [
      { prompt: 'The pen is ___ the box.', answer: 'in' },
      { prompt: 'The book is ___ the table.', answer: 'on' },
      { prompt: 'We meet ___ Monday.', answer: 'on' },
      { prompt: 'I get up ___ 7 o’clock.', answer: 'at' },
      { prompt: 'This is ___ pen.', answer: 'Ann’s', accepts: ['ann’s', "ann's", 'anns'] }
    ]
  },
  {
    id: 'past-simple',
    level: 'A2',
    title: 'Past Simple',
    rules: [
      'Правильные глаголы: worked, watched, played',
      'Неправильные: go → went, see → saw, have → had',
      'Отрицание: didn’t + глагол в начальной форме'
    ],
    oral: 'I went home. She watched TV.',
    exercises: [
      { prompt: 'I ___ (go) to school yesterday.', answer: 'went' },
      { prompt: 'She ___ (watch) TV last night.', answer: 'watched' },
      { prompt: 'We ___ (have) pizza.', answer: 'had' },
      { prompt: "He didn’t ___ (play) tennis.", answer: 'play' },
      { prompt: 'They ___ (see) a film.', answer: 'saw' }
    ]
  },
  {
    id: 'present-perfect',
    level: 'A2',
    title: 'Present Perfect',
    rules: [
      'have / has + причастие прошедшего времени',
      'already, yet, ever, never — частые слова-подсказки',
      'I have finished. She has gone.'
    ],
    oral: 'I have finished. She has gone.',
    exercises: [
      { prompt: 'I have ___ my homework.', answer: 'finished' },
      { prompt: 'She has ___ to London.', answer: 'gone' },
      { prompt: 'We have ___ pizza.', answer: 'eaten' },
      { prompt: 'Have you ___ been there?', answer: 'ever' },
      { prompt: "I haven’t finished ___.", answer: 'yet' }
    ]
  },
  {
    id: 'future',
    level: 'A2',
    title: 'will / going to',
    rules: [
      'will + глагол — решение в момент речи: I will call you',
      'going to + глагол — план: We are going to travel',
      'will не изменяется по лицам'
    ],
    oral: 'I will call you. We are going to travel.',
    exercises: [
      { prompt: 'I ___ call you tomorrow.', answer: 'will' },
      { prompt: 'We are ___ to travel.', answer: 'going' },
      { prompt: 'She ___ be late.', answer: 'will' },
      { prompt: 'They are going to ___ a film.', answer: 'watch' },
      { prompt: 'It ___ rain later.', answer: 'will' }
    ]
  },
  {
    id: 'conditionals',
    level: 'B1',
    title: 'Zero / First Conditional',
    rules: [
      'Zero: If + Present, Present — общие факты',
      'First: If + Present, will + глагол — реальное будущее',
      'If it rains, I will stay home.'
    ],
    oral: 'If it rains, I will stay home.',
    exercises: [
      { prompt: 'If you heat ice, it ___.', answer: 'melts' },
      { prompt: 'If it rains, I ___ stay home.', answer: 'will' },
      { prompt: 'If I have time, I ___ call you.', answer: 'will' },
      { prompt: 'If you study, you ___ pass.', answer: 'will' },
      { prompt: 'If water freezes, it ___ ice.', answer: 'becomes' }
    ]
  }
];

const MISTAKE_WHY = {
  'to-be:0': 'После I всегда am: I am, не I is.',
  'to-be:1': 'She относится к he/she/it, поэтому глагол — is.',
  'to-be:2': 'They — множественное число, поэтому are.',
  'to-be:3': 'В вопросе с you глагол are выносится в начало: Are you…?',
  'to-be:4': 'He требует is; отрицание строится как He isn’t…',
  'articles:0': 'book начинается с согласного звука → a.',
  'articles:1': 'apple начинается с гласного звука → an.',
  'articles:2': 'dog — согласный звук, поэтому a.',
  'articles:3': 'teacher — согласный звук, поэтому a.',
  'articles:4': 'egg начинается с гласного звука → an.',
  'plural:0': 'cat оканчивается на согласный — просто добавляем -s: cats.',
  'plural:1': 'bus оканчивается на s → добавляем -es: buses.',
  'plural:2': 'box оканчивается на x → добавляем -es: boxes.',
  'plural:3': 'apple → apples: обычное множественное число на -s.',
  'plural:4': 'pen → pens: обычное множественное число на -s.',
  'have-got:0': 'С I/you/we/they используется have got.',
  'have-got:1': 'С she/he/it используется has got.',
  'have-got:2': 'We требует have, не has.',
  'have-got:3': 'В вопросе Have выносится в начало: Have you got…?',
  'have-got:4': 'He требует has got.',
  'can:0': 'can уже выражает умение: I can swim, без to.',
  'can:1': 'После can глагол без to: can ride.',
  'can:2': 'С любым местоимением can не меняется: we can.',
  'can:3': 'Отрицание умения — can’t (cannot): I can’t fly.',
  'can:4': 'Форма can одинакова для всех лиц: they can.',
  'present-simple:0': 'С I глагол без -s: I live.',
  'present-simple:1': 'С we глагол без -s: we play.',
  'present-simple:2': 'С you глагол без -s: you like.',
  'present-simple:3': 'С they глагол без -s: they live.',
  'present-simple:4': 'С I глагол без -s: I study.',
  'negatives:0': 'С I отрицание — don’t + глагол: I don’t like.',
  'negatives:1': 'С he отрицание — doesn’t; глагол остаётся без -s.',
  'negatives:2': 'С we используется don’t, не doesn’t.',
  'negatives:3': 'С she — doesn’t, и work без -s.',
  'negatives:4': 'С they — don’t.',
  'questions:0': 'С you вопрос начинается с Do.',
  'questions:1': 'С she вопрос начинается с Does.',
  'questions:2': 'С they — Do.',
  'questions:3': 'С he — Does, а have остаётся без -s.',
  'questions:4': 'С I — Do.',
  'there-is:0': 'a table — единственное число → there is.',
  'there-is:1': 'two chairs — множественное число → there are.',
  'there-is:2': 'a book — один предмет → there is.',
  'there-is:3': 'three apples — несколько → there are.',
  'there-is:4': 'a dog — один → there is.',
  'prepositions:0': 'Предмет внутри коробки — in the box.',
  'prepositions:1': 'На поверхности стола — on the table.',
  'prepositions:2': 'Дни недели требуют on: on Monday.',
  'prepositions:3': 'Точное время требует at: at 7 o’clock.',
  'prepositions:4': 'Принадлежность указываем с ’s: Ann’s pen.',
  'past-simple:0': 'go — неправильный глагол: go → went.',
  'past-simple:1': 'watch правильный: в прошедшем добавляем -ed.',
  'past-simple:2': 'have — неправильный глагол: have → had.',
  'past-simple:3': 'После didn’t глагол в начальной форме: didn’t play.',
  'past-simple:4': 'see — неправильный глагол: see → saw.',
  'present-perfect:0': 'have + причастие: finish → finished.',
  'present-perfect:1': 'go в Present Perfect — has gone.',
  'present-perfect:2': 'eat в Present Perfect — have eaten.',
  'present-perfect:3': 'ever используется в вопросе: Have you ever been…?',
  'present-perfect:4': 'yet ставится в конец отрицательного предложения.',
  'future:0': 'Решение в момент речи — will + глагол.',
  'future:1': 'План — be going to, поэтому going.',
  'future:2': 'Прогноз — will be late.',
  'future:3': 'После going to глагол в начальной форме: watch.',
  'future:4': 'Прогноз погоды — will rain.',
  'conditionals:0': 'Zero Conditional: факт — If + Present, Present: ice melts.',
  'conditionals:1': 'First Conditional: If + Present, will + глагол.',
  'conditionals:2': 'First Conditional: после if Present, в главной части will.',
  'conditionals:3': 'First Conditional: will + pass.',
  'conditionals:4': 'Zero Conditional: общий факт — water becomes ice.'
};

function freshState() {
  return {
    version: 1,
    profile: null,
    topics: {},
    stats: { streak: 0, lastStudyDate: null, totalCorrect: 0, totalAttempts: 0, daily: {} },
    session: null,
    errors: [],
    log: [],
    lastSummary: null
  };
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshState();
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1) return freshState();
    const base = freshState();
    return {
      ...base,
      ...parsed,
      profile: parsed.profile || null,
      topics: parsed.topics || {},
      stats: { ...base.stats, ...(parsed.stats || {}), daily: (parsed.stats && parsed.stats.daily) || {} },
      errors: parsed.errors || [],
      log: parsed.log || [],
      session: parsed.session || null
    };
  } catch (error) {
    return freshState();
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function keyFromDate(date) {
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
}

function todayKey() {
  return keyFromDate(new Date());
}

function addDays(key, amount) {
  const parts = key.split('-').map(Number);
  return keyFromDate(new Date(parts[0], parts[1] - 1, parts[2] + amount));
}

function isYesterday(previous, today) {
  return Boolean(previous) && previous === addDays(today, -1);
}

function formatDate(key) {
  if (!key) return '—';
  const parts = key.split('-');
  return parts[2] + '.' + parts[1];
}

function normalize(value) {
  return String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/[’‘]/g, "'")
    .replace(/[.!?]+$/, '')
    .replace(/\s+/g, ' ');
}

function isCorrect(given, exercise) {
  const answer = normalize(given);
  return [exercise.answer, ...(exercise.accepts || [])].some(item => normalize(item) === answer);
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function availableTopics() {
  const levelIndex = LEVELS.indexOf(state.profile ? state.profile.level : 'A1');
  return TOPICS.filter(topic => LEVELS.indexOf(topic.level) <= levelIndex);
}

function dueTopics() {
  const today = todayKey();
  return availableTopics().filter(topic => {
    const progress = state.topics[topic.id];
    return Boolean(progress) && progress.times > 0 && progress.nextDue && progress.nextDue <= today && progress.studiedAt !== today;
  });
}

function nextNewTopic() {
  return availableTopics().find(topic => !state.topics[topic.id]) || null;
}

function totalAccuracy() {
  const stats = state.stats;
  return stats.totalAttempts ? Math.round((stats.totalCorrect / stats.totalAttempts) * 100) : 0;
}

function startSession(mode) {
  if (state.session) {
    ui.view = 'session';
    render();
    return;
  }

  const due = dueTopics();
  const fresh = nextNewTopic();
  const items = [];

  if (mode === 'review') {
    due.slice(0, 2).forEach(topic => items.push({ id: topic.id, mode: 'review' }));
  } else {
    due.slice(0, 1).forEach(topic => items.push({ id: topic.id, mode: 'review' }));
    if (fresh) items.push({ id: fresh.id, mode: 'new' });
    if (!items.length && due.length) items.push({ id: due[0].id, mode: 'review' });
  }

  if (!items.length) {
    ui.notice = 'Нет доступных тем. Проверьте /plan или дождитесь даты повторения.';
    ui.view = 'home';
    render();
    return;
  }

  const steps = [];
  items.forEach(item => {
    const topic = TOPICS.find(entry => entry.id === item.id);
    topic.exercises.forEach((exercise, index) => {
      steps.push({ topicId: topic.id, mode: item.mode, exIndex: index, first: index === 0 });
    });
  });

  state.session = {
    date: todayKey(),
    mode,
    items: items.map(item => item.id),
    steps,
    index: 0,
    answers: [],
    errors: []
  };
  ui.feedback = null;
  ui.notice = '';
  ui.view = 'session';
  save();
  render();
}

function completeSession() {
  const session = state.session;
  if (!session) return;

  const answers = session.answers;
  const attempts = answers.length;

  if (!attempts) {
    state.session = null;
    ui.feedback = null;
    ui.notice = 'Занятие завершено без ответов. Прогресс не изменён.';
    ui.view = 'home';
    save();
    render();
    return;
  }

  const today = todayKey();
  const correct = answers.filter(answer => answer.correct).length;

  state.stats.totalCorrect += correct;
  state.stats.totalAttempts += attempts;
  const daily = state.stats.daily[today] || { correct: 0, attempts: 0 };
  daily.correct += correct;
  daily.attempts += attempts;
  state.stats.daily[today] = daily;

  if (state.stats.lastStudyDate !== today) {
    state.stats.streak = isYesterday(state.stats.lastStudyDate, today) ? state.stats.streak + 1 : 1;
    state.stats.lastStudyDate = today;
  }

  const grouped = {};
  answers.forEach(answer => {
    if (!grouped[answer.topicId]) grouped[answer.topicId] = [];
    grouped[answer.topicId].push(answer);
  });

  Object.keys(grouped).forEach(topicId => {
    const group = grouped[topicId];
    const groupCorrect = group.filter(answer => answer.correct).length;
    const accuracy = groupCorrect / group.length;
    const previous = state.topics[topicId] || { times: 0, stage: 0, correct: 0, attempts: 0 };
    const stage = previous.times === 0
      ? 0
      : (accuracy >= 0.8 ? Math.min(previous.stage + 1, INTERVALS.length - 1) : 0);
    const nextCorrect = previous.correct + groupCorrect;
    const nextAttempts = previous.attempts + group.length;

    state.topics[topicId] = {
      times: previous.times + 1,
      stage,
      studiedAt: today,
      nextDue: addDays(today, INTERVALS[stage]),
      correct: nextCorrect,
      attempts: nextAttempts,
      score: Math.round((nextCorrect / nextAttempts) * 100)
    };
  });

  session.errors.forEach(error => {
    state.errors.push({ ...error, date: today });
  });

  state.log.push({ date: today, correct, attempts, mode: session.mode, topics: session.items.slice() });
  state.lastSummary = {
    date: today,
    correct,
    attempts,
    accuracy: Math.round((correct / attempts) * 100),
    topics: session.items.slice(),
    errors: session.errors.length
  };

  state.session = null;
  ui.feedback = null;
  ui.notice = '';
  ui.view = 'report';
  save();
  render();
}

function renderOnboarding() {
  const dayOptions = [1, 2, 3, 4, 5, 6, 0]
    .map(value => '<label><input type="checkbox" name="days" value="' + value + '"' + (value <= 5 ? ' checked' : '') + '> ' + DAY_NAMES[value] + '</label>')
    .join('');
  const levelOptions = LEVELS.slice(0, 5)
    .map(level => '<option value="' + level + '"' + (level === 'A1' ? ' selected' : '') + '>' + level + '</option>')
    .join('');

  return [
    '<section class="card hero">',
    '  <h2>Настроим трекер</h2>',
    '  <p>Ответь на несколько вопросов — приложение соберёт план с повторениями и статистикой.</p>',
    '</section>',
    '<section class="card">',
    '  <form id="onboarding-form" class="grid">',
    '    <div class="grid two">',
    '      <div class="field"><label for="level">Уровень</label><select id="level" name="level">' + levelOptions + '</select></div>',
    '      <div class="field"><label for="minutes">Минут в день</label><select id="minutes" name="minutes"><option>10</option><option>15</option><option selected>20</option><option>30</option></select></div>',
    '    </div>',
    '    <div class="field"><label>Дни занятий</label><div class="checks">' + dayOptions + '</div></div>',
    '    <div class="field"><label for="goal">Цель</label><textarea id="goal" name="goal" placeholder="Например: выучить базу A1 и говорить проще">База грамматики и уверенные короткие фразы</textarea></div>',
    '    <div class="actions"><button class="primary" type="submit">Сохранить и составить план</button></div>',
    '  </form>',
    '</section>'
  ].join('');
}

function renderNav() {
  const entries = [
    ['home', 'Главная'],
    ['plan', 'План'],
    ['status', 'Статус'],
    ['report', 'Отчёт'],
    ['errors', 'Ошибки']
  ];
  return entries
    .map(([view, label]) => '<button class="ghost' + (ui.view === view ? ' primary' : '') + '" data-view="' + view + '">' + label + '</button>')
    .join('') + '<button class="danger" data-action="reset">Сброс</button>';
}

function renderHome() {
  const topics = availableTopics();
  const studied = topics.filter(topic => state.topics[topic.id]).length;
  const due = dueTopics();
  const fresh = nextNewTopic();
  const progress = topics.length ? Math.round((studied / topics.length) * 100) : 0;
  const nextDue = Object.keys(state.topics)
    .map(id => state.topics[id].nextDue)
    .filter(Boolean)
    .sort()[0];
  const stats = state.stats;

  const dueHtml = due.length
    ? '<ul class="list">' + due.map(topic => '<li>' + escapeHtml(topic.title) + ' <span class="badge warn">срок ' + formatDate(state.topics[topic.id].nextDue) + '</span></li>').join('') + '</ul>'
    : '<p class="muted">Повторений на сегодня нет.</p>';

  const freshHtml = fresh
    ? '<h3>Новая тема</h3><p>' + escapeHtml(fresh.title) + '</p><p class="muted small">Скажите: ' + escapeHtml(fresh.oral) + '</p>'
    : '<h3>Новая тема</h3><p class="muted">Все темы пройдены — тренируйте повторения.</p>';

  return [
    ui.notice ? '<div class="card tight"><span class="badge warn">' + escapeHtml(ui.notice) + '</span></div>' : '',
    '<section class="card hero">',
    '  <h2>' + (due.length ? 'Есть повторения и новая тема' : 'Готовы к занятию?') + '</h2>',
    '  <p>' + state.profile.minutes + ' минут: повторение → новая тема → 5 упражнений → короткий отчёт. Один вопрос за раз.</p>',
    '  <div class="row">',
    '    <button type="button" data-action="start">Начать занятие</button>',
    '    <button type="button" class="alt" data-action="review">Только повторение</button>',
    '  </div>',
    '</section>',
    '<section class="grid stats">',
    '  <div class="stat"><div class="label">Серия</div><div class="value">' + stats.streak + '</div><div class="hint">дней подряд</div></div>',
    '  <div class="stat"><div class="label">Точность</div><div class="value">' + totalAccuracy() + '%</div><div class="hint">' + stats.totalCorrect + ' из ' + stats.totalAttempts + '</div></div>',
    '  <div class="stat"><div class="label">Темы</div><div class="value">' + studied + '/' + topics.length + '</div><div class="hint">из плана</div></div>',
    '  <div class="stat"><div class="label">Ближайшее</div><div class="value">' + formatDate(nextDue) + '</div><div class="hint">дата повторения</div></div>',
    '</section>',
    '<section class="card">',
    '  <h2>Прогресс по плану</h2>',
    '  <div class="progress"><span style="width:' + progress + '%"></span></div>',
    '  <p class="muted small">' + progress + '% пройдено · цель: ' + escapeHtml(state.profile.goal) + '</p>',
    '</section>',
    '<section class="grid two">',
    '  <div class="card tight"><h2>На сегодня</h2><h3>Повторение</h3>' + dueHtml + freshHtml + '</div>',
    '  <div class="card tight"><h2>Правила интервалов</h2><p class="muted">1 → 3 → 7 → 14 → 30 дней. Если точность по теме ниже 80%, интервал сбрасывается.</p><p class="small">Ошибки попадают в раздел «Ошибки» и возвращаются в повторение.</p></div>',
    '</section>',
    renderTopicsTable(topics, 'Все темы')
  ].join('');
}

function renderTopicsTable(topics, heading) {
  const rows = topics.map(topic => {
    const progress = state.topics[topic.id];
    const status = !progress
      ? '<span class="badge">не начата</span>'
      : (progress.nextDue && progress.nextDue <= todayKey() ? '<span class="badge warn">повторить</span>' : '<span class="badge good">изучается</span>');
    return [
      '<tr>',
      '  <td>' + escapeHtml(topic.title) + '</td>',
      '  <td>' + topic.level + '</td>',
      '  <td>' + status + '</td>',
      '  <td>' + (progress ? formatDate(progress.studiedAt) : '—') + '</td>',
      '  <td>' + (progress ? formatDate(progress.nextDue) : '—') + '</td>',
      '  <td>' + (progress ? progress.score + '%' : '—') + '</td>',
      '</tr>'
    ].join('');
  }).join('');

  return [
    '<section class="card">',
    '  <h2>' + heading + '</h2>',
    '  <table><thead><tr><th>Тема</th><th>Уровень</th><th>Статус</th><th>Было</th><th>Следующий</th><th>Балл</th></tr></thead><tbody>' + rows + '</tbody></table>',
    '</section>'
  ].join('');
}

function renderPlan() {
  return [
    '<section class="card tight"><h2>Учебный план</h2><p class="muted">План строится от вашего уровня: ' + escapeHtml(state.profile.level) + ' · ' + state.profile.minutes + ' мин · ' + state.profile.days.map(day => DAY_NAMES[day]).join(' ') + '.</p></section>',
    renderTopicsTable(availableTopics(), 'Темы по порядку')
  ].join('');
}

function renderStatus() {
  const profile = state.profile;
  const kv = [
    ['Уровень', profile.level],
    ['Время', profile.minutes + ' мин/день'],
    ['Дни', profile.days.map(day => DAY_NAMES[day]).join(', ')],
    ['Цель', profile.goal],
    ['Серия', state.stats.streak + ' дн.'],
    ['Всего ответов', String(state.stats.totalAttempts)],
    ['Верных', String(state.stats.totalCorrect)],
    ['Точность', totalAccuracy() + '%'],
    ['Ошибок в журнале', String(state.errors.length)],
    ['Занятий проведено', String(state.log.length)]
  ].map(([key, value]) => '<dt>' + key + '</dt><dd>' + escapeHtml(value) + '</dd>').join('');

  const recent = state.log.slice(-5).reverse().map(item =>
    '<li>' + formatDate(item.date) + ' · ' + escapeHtml(item.mode) + ' · ' + item.correct + '/' + item.attempts + '</li>'
  ).join('') || '<li class="muted">Пока нет завершённых занятий</li>';

  return [
    '<section class="card"><h2>Статус</h2><dl class="kv">' + kv + '</dl></section>',
    '<section class="card"><h2>Последние занятия</h2><ul class="list">' + recent + '</ul></section>'
  ].join('');
}

function renderReport() {
  const today = todayKey();
  let weekCorrect = 0;
  let weekAttempts = 0;
  const dailyRows = [];

  for (let offset = 6; offset >= 0; offset--) {
    const key = addDays(today, -offset);
    const day = state.stats.daily[key];
    const correct = day ? day.correct : 0;
    const attempts = day ? day.attempts : 0;
    weekCorrect += correct;
    weekAttempts += attempts;
    dailyRows.push('<tr><td>' + formatDate(key) + '</td><td>' + (attempts ? correct + '/' + attempts : '—') + '</td><td>' + (attempts ? Math.round((correct / attempts) * 100) + '%' : '—') + '</td></tr>');
  }

  const weekAccuracy = weekAttempts ? Math.round((weekCorrect / weekAttempts) * 100) : 0;
  const advice = weekAccuracy >= 90
    ? 'Отличная точность — можно добавить тему из плана.'
    : (weekAccuracy >= 70 ? 'Добавьте 2 минуты на разбор ошибок перед новой темой.' : 'Вернитесь к темам с баллом ниже 80% и повторите их.');
  const summary = state.lastSummary;

  return [
    summary ? [
      '<section class="card hero"><h2>Занятие завершено</h2><p>' + summary.correct + ' из ' + summary.attempts + ' верно · точность ' + summary.accuracy + '% · ошибок ' + summary.errors + '</p></section>'
    ].join('') : '',
    '<section class="grid stats">',
    '  <div class="stat"><div class="label">За 7 дней</div><div class="value">' + weekAccuracy + '%</div><div class="hint">' + weekCorrect + ' из ' + weekAttempts + '</div></div>',
    '  <div class="stat"><div class="label">Серия</div><div class="value">' + state.stats.streak + '</div><div class="hint">дней подряд</div></div>',
    '  <div class="stat"><div class="label">Ошибок</div><div class="value">' + state.errors.length + '</div><div class="hint">в журнале</div></div>',
    '  <div class="stat"><div class="label">Тем</div><div class="value">' + Object.keys(state.topics).length + '</div><div class="hint">в работе</div></div>',
    '</section>',
    '<section class="grid two">',
    '  <div class="card tight"><h2>Динамика по дням</h2><table><thead><tr><th>Дата</th><th>Ответы</th><th>Точность</th></tr></thead><tbody>' + dailyRows.join('') + '</tbody></table></div>',
    '  <div class="card tight"><h2>Рекомендация</h2><p>' + escapeHtml(advice) + '</p><p class="muted small">Следующее повторение: ' + formatDate(Object.keys(state.topics).map(id => state.topics[id].nextDue).filter(Boolean).sort()[0]) + '</p></div>',
    '</section>'
  ].join('');
}

function renderErrors() {
  if (!state.errors.length) {
    return '<section class="card"><h2>Ошибки</h2><p class="muted">Пока нет ошибок. Они появятся здесь после проверки упражнений.</p></section>';
  }

  const rows = state.errors.slice().reverse().map(error => [
    '<tr>',
    '  <td>' + formatDate(error.date) + '</td>',
    '  <td>' + escapeHtml(error.prompt) + '</td>',
    '  <td><span class="badge bad">' + escapeHtml(error.given) + '</span></td>',
    '  <td><span class="badge good">' + escapeHtml(error.answer) + '</span></td>',
    '</tr>'
  ].join('')).join('');

  return [
    '<section class="card"><h2>Журнал ошибок</h2><table><thead><tr><th>Дата</th><th>Задание</th><th>Было</th><th>Верно</th></tr></thead><tbody>' + rows + '</tbody></table></section>'
  ].join('');
}

function renderSession() {
  const session = state.session;
  if (!session) return renderHome();

  const step = session.steps[session.index];
  const topic = TOPICS.find(entry => entry.id === step.topicId);
  const exercise = topic.exercises[step.exIndex];
  const dots = session.steps.map((item, index) => {
    const className = index < session.index ? 'done' : (index === session.index ? 'now' : '');
    return '<i class="' + className + '"></i>';
  }).join('');
  const percent = Math.round((session.index / session.steps.length) * 100);

  const concept = step.first ? [
    '<section class="card tight">',
    '  <h3>' + escapeHtml(topic.title) + ' <span class="badge">' + (step.mode === 'review' ? 'повторение' : 'новая тема') + '</span></h3>',
    '  <ul class="rule-list">' + topic.rules.map(rule => '<li>' + escapeHtml(rule) + '</li>').join('') + '</ul>',
    '  <p class="muted small">Скажите вслух: ' + escapeHtml(topic.oral) + '</p>',
    '</section>'
  ].join('') : '';

  const answerArea = ui.feedback ? [
    '<div class="feedback ' + (ui.feedback.ok ? 'ok' : 'no') + '">',
    ui.feedback.ok ? 'Верно.' : 'Не совсем. Вы ответили: ' + escapeHtml(ui.feedback.given) + '. Почему: ' + escapeHtml(ui.feedback.why),
    ' Правильно: <span class="answer">' + escapeHtml(ui.feedback.answer) + '</span>',
    '</div>',
    '<div class="actions"><button type="button" class="primary" id="next-btn" data-action="next">Далее</button></div>'
  ].join('') : [
    '<form id="answer-form" class="answer-form">',
    '  <input id="answer-input" name="answer" autocomplete="off" placeholder="Ваш ответ" autofocus>',
    '  <button class="primary" type="submit">Проверить</button>',
    '</form>'
  ].join('');

  return [
    '<section class="card">',
    '  <div class="session-head">',
    '    <div><h2>Занятие · шаг ' + (session.index + 1) + ' из ' + session.steps.length + '</h2><p class="muted small">' + escapeHtml(topic.title) + '</p></div>',
    '    <div class="step-dots">' + dots + '</div>',
    '  </div>',
    '  <div class="progress"><span style="width:' + percent + '%"></span></div>',
    '</section>',
    concept,
    '<section class="card">',
    '  <p class="prompt">' + escapeHtml(exercise.prompt) + '</p>',
    answerArea,
    '  <div class="actions"><button type="button" class="ghost" data-action="finish">Завершить досрочно</button></div>',
    '</section>'
  ].join('');
}

let state = load();
let ui = { view: 'home', feedback: null, notice: '' };

function render() {
  const app = document.getElementById('app');
  const nav = document.getElementById('nav');
  const subtitle = document.getElementById('subtitle');
  const footerDate = document.getElementById('footer-date');

  footerDate.textContent = new Date().toLocaleDateString('ru-RU');

  if (!state.profile) {
    nav.innerHTML = '';
    subtitle.textContent = 'Настройка профиля';
    app.innerHTML = renderOnboarding();
    return;
  }

  if (ui.view === 'session' && !state.session) ui.view = 'home';

  subtitle.textContent = state.profile.level + ' · ' + state.profile.minutes + ' мин/день · ' + state.profile.days.map(day => DAY_NAMES[day]).join(' ');
  nav.innerHTML = renderNav();

  const views = {
    home: renderHome,
    plan: renderPlan,
    status: renderStatus,
    report: renderReport,
    errors: renderErrors,
    session: renderSession
  };
  app.innerHTML = (views[ui.view] || renderHome)();

  if (ui.view === 'session' && !ui.feedback) {
    const input = document.getElementById('answer-input');
    if (input) input.focus();
  }
}

document.addEventListener('submit', event => {
  if (event.target.id === 'onboarding-form') {
    event.preventDefault();
    const form = event.target;
    const days = Array.from(form.querySelectorAll('input[name="days"]:checked')).map(input => Number(input.value));
    state.profile = {
      level: form.level.value,
      minutes: Number(form.minutes.value),
      days: days.length ? days : [1, 2, 3, 4, 5],
      goal: form.goal.value.trim() || 'База грамматики'
    };
    ui.view = 'home';
    ui.notice = 'Профиль сохранён. План готов — можно начинать.';
    save();
    render();
    return;
  }

  if (event.target.id === 'answer-form') {
    event.preventDefault();
    const session = state.session;
    if (!session) return;
    const step = session.steps[session.index];
    const topic = TOPICS.find(entry => entry.id === step.topicId);
    const exercise = topic.exercises[step.exIndex];
    const given = event.target.answer.value;
    if (!given.trim()) return;
    const ok = isCorrect(given, exercise);

    session.answers.push({ topicId: topic.id, exIndex: step.exIndex, given, correct: ok });
    if (!ok) {
      session.errors.push({ topicId: topic.id, prompt: exercise.prompt, given, answer: exercise.answer });
    }
    const why = MISTAKE_WHY[topic.id + ':' + step.exIndex] || topic.rules[0];
    ui.feedback = { ok, given, answer: exercise.answer, why };
    save();
    render();
    document.getElementById('next-btn')?.focus();
  }
});

document.addEventListener('click', event => {
  const viewButton = event.target.closest('[data-view]');
  if (viewButton) {
    ui.view = viewButton.dataset.view;
    ui.notice = '';
    render();
    return;
  }

  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) return;

  const action = actionButton.dataset.action;

  if (action === 'start') startSession('mixed');

  if (action === 'review') startSession('review');

  if (action === 'next') {
    const session = state.session;
    if (!session) return;
    session.index += 1;
    ui.feedback = null;
    if (session.index >= session.steps.length) {
      completeSession();
    } else {
      save();
      render();
    }
  }

  if (action === 'finish') completeSession();

  if (action === 'reset') {
    if (!confirm('Сбросить профиль и весь прогресс?')) return;
    state = freshState();
    ui = { view: 'home', feedback: null, notice: 'Прогресс сброшен.' };
    save();
    render();
  }
});

render();

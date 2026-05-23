// Game logic. Depends on FLOWERS (defined in flowers.js).

const CONFIGS = {
  easy:   { cols: 4, pairs: 8,  moves: 35, cardH: '110px' },
  medium: { cols: 6, pairs: 12, moves: 55, cardH: '95px'  },
  hard:   { cols: 6, pairs: 18, moves: 70, cardH: '90px'  },
};

let level, cards, flipped, moves, matches, locked;

const levelSelect = document.getElementById('level');
const restartBtn  = document.getElementById('restartBtn');

levelSelect.addEventListener('change', function () {
  if (this.value) startGame(this.value);
});
restartBtn.addEventListener('click', function () { startGame(); });

// Reset on load so the first selection always fires the change event
levelSelect.value = '';

function startGame(lv) {
  lv = lv || level;
  if (!lv) return;
  level = lv;
  levelSelect.value = lv;

  const cfg = CONFIGS[lv];
  moves   = cfg.moves;
  matches = 0;
  locked  = false;
  flipped = [];

  const chosen = FLOWERS.slice(0, cfg.pairs);
  const deck   = shuffle(chosen.concat(chosen));
  cards = deck.map(function (uri, i) {
    return { idx: i, img: uri, matched: false };
  });

  document.getElementById('stats').classList.remove('hidden');
  restartBtn.classList.remove('hidden');
  document.getElementById('msg').textContent = '';
  document.getElementById('msg').className   = '';
  document.getElementById('totalPairs').textContent = cfg.pairs;
  updateStats();
  renderBoard(cfg);
}

function renderBoard(cfg) {
  var board = document.getElementById('board');
  board.style.gridTemplateColumns = 'repeat(' + cfg.cols + ', 1fr)';
  board.innerHTML = '';

  cards.forEach(function (c, i) {
    var el = document.createElement('div');
    el.className   = 'card';
    el.style.height = cfg.cardH;

    var inner = document.createElement('div');
    inner.className = 'card-inner';

    var front = document.createElement('div');
    front.className = 'card-front';
    front.innerHTML =
      '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M12 2C9 2 7 4 7 7c0 2 1 3.5 2.5 4.5C8 12.5 6 14 6 17c0 3 2.5 5 6 5s6-2 6-5' +
      'c0-3-2-4.5-3.5-5.5C16 10.5 17 9 17 7c0-3-2-5-5-5z"/></svg>';

    var back = document.createElement('div');
    back.className = 'card-back';
    var img = document.createElement('img');
    img.src = c.img;
    img.alt = 'flower';
    back.appendChild(img);

    inner.appendChild(front);
    inner.appendChild(back);
    el.appendChild(inner);

    el.addEventListener('click', (function (index, elem) {
      return function () { onCardClick(index, elem); };
    })(i, el));

    board.appendChild(el);
  });
}

function onCardClick(i, el) {
  if (locked || cards[i].matched) return;
  if (flipped.some(function (f) { return f.idx === i; })) return;
  if (flipped.length >= 2) return;

  el.classList.add('flipped');
  flipped.push({ idx: i, el: el });

  if (flipped.length === 2) {
    moves--;
    updateStats();
    locked = true;

    var a = flipped[0];
    var b = flipped[1];

    if (cards[a.idx].img === cards[b.idx].img) {
      // Match
      cards[a.idx].matched = true;
      cards[b.idx].matched = true;
      a.el.classList.add('matched');
      b.el.classList.add('matched');
      matches++;
      moves += 2; // reward for a match
      updateStats();
      flipped = [];
      locked  = false;

      if (matches === CONFIGS[level].pairs) {
        var msg = document.getElementById('msg');
        msg.textContent = '🎉 You won! All pairs matched!';
        msg.className   = 'win';
        lockAll();
      }
    } else {
      // No match \u2014 flip back after a pause
      setTimeout(function () {
        a.el.classList.remove('flipped');
        b.el.classList.remove('flipped');
        flipped = [];
        locked  = false;

        if (moves <= 0) {
          var msg = document.getElementById('msg');
          msg.textContent = '😢 Out of moves — better luck next time!';
          msg.className   = 'lose';
          lockAll();
        }
      }, 1000);
    }
  }
}

function lockAll() {
  document.querySelectorAll('#board .card').forEach(function (el) {
    el.style.pointerEvents = 'none';
  });
}

function updateStats() {
  document.getElementById('movesLeft').textContent = moves;
  document.getElementById('matchCount').textContent = matches;
}

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

(async function () {
  'use strict';

  // Load quiz data (side-effect global)
  try {
    await import('./quiz-data.js');
  } catch (e) {
    // ignore; fallback to window
  }
  try {
    await import('./quiz-storage.js');
  } catch (e) {
    // ignore
  }

  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get('id');

  const periods = window.quizPeriods || {};
  const periodIds = Object.keys(periods);
  const periodId = requestedId && periods[requestedId] ? requestedId : (periodIds[0] || 'uud-1945-masa-revolusi');
  const period = periods[periodId] || { title: 'Kuis', questions: [] };

  const periodName = period.title || 'Kuis';
  const questions = Array.isArray(period.questions) ? period.questions : [];
  const total = questions.length || 0;

  const selectedAnswers = new Array(total).fill(null);
  let current = 0;
  let finished = false;

  const quizLabel = document.getElementById('quizLabel');
  const quizTitle = document.getElementById('quizTitle');
  const progressFill = document.getElementById('progressFill');
  const indicatorBadge = document.getElementById('indicatorBadge');
  const questionText = document.getElementById('questionText');
  const optionsContainer = document.getElementById('optionsContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  function computeScore() {
    let score = 0;
    questions.forEach(function (q, i) {
      if (selectedAnswers[i] != null && selectedAnswers[i] === q.answer) {
        score += 1;
      }
    });
    return score;
  }

  function showFinalConclusion(score, total) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(17,24,39,0.55);display:flex;align-items:center;justify-content:center;padding:1rem;z-index:9999;';
    const card = document.createElement('div');
    card.style.cssText = 'background:#fff;border-radius:16px;max-width:720px;width:100%;max-height:85vh;overflow:auto;padding:1.5rem 1.75rem;box-shadow:0 20px 60px rgba(0,0,0,0.25);font-family:var(--font-sans, "Plus Jakarta Sans", sans-serif);color:#1f2937;';

    // text kesimpulan
    card.innerHTML = `
      <h2 style="margin:0 0 0.5rem;font-size:1.4rem;font-weight:800;color:#1f2937;">Kesimpulan Akhir</h2>
      <p style="margin:0 0 1rem;color:#6b7280;font-size:0.95rem;">Skor Kuis Final kamu: <strong style="color:#6c9bcf;">${score} / ${total}</strong></p>
      <p style="line-height:1.7;margin:0 0 0.75rem;">Perjalanan demokrasi Indonesia menunjukkan evolusi bentuk negara dan sistem pemerintahan dari masa ke masa. Pada UUD 1945 Masa Revolusi, Indonesia menganut sistem presidensial dengan kedaulatan rakyat. UUD RIS memperkenalkan bentuk federal dan sistem parlementer. UUDS 1950 mengembalikan Indonesia sebagai negara kesatuan dengan sistem parlementer dan pemilu demokratis. UUD NRI 1945 menghadirkan demokrasi terpimpin dengan kedaulatan MPR dan ideologi Pancasila. Setelah reformasi, UUD 1945 diamandemen untuk memperkuat pembagian kekuasaan, hak asasi manusia, dan pemilu langsung.</p>
      <p style="line-height:1.7;margin:0 0 1.25rem;">Secara keseluruhan, demokrasi Indonesia terus berkembang menuju tata kelola yang lebih partisipatif, transparan, dan berkeadilan, dengan tetap berlandaskan Pancasila dan UUD 1945.</p>
      <button id="conclusionClose" type="button" style="background:#6c9bcf;color:#fff;border:none;border-radius:10px;padding:0.7rem 1.4rem;font-weight:700;cursor:pointer;">Tutup</button>
    `;
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    const closeBtn = card.querySelector('#conclusionClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        overlay.remove();
        window.location.href = '/src/page/quiz-select.html';
      });
    }
  }

  function finishQuiz() {
    if (finished) return;
    finished = true;
    const score = computeScore();
    if (window.quizStorage) {
      window.quizStorage.save(periodId, {
        period: periodName,
        score: score,
        total: total,
        answers: selectedAnswers.slice(),
        attempt: true,
      });
    }
    if (periodId === 'final') {
      showFinalConclusion(score, total);
      return;
    }
    const msg = 'Kuis selesai! Skor kamu: ' + score + ' / ' + total;
    // eslint-disable-next-line no-alert
    alert(msg);
    window.location.href = '/src/page/quiz-select.html';
  }

  function renderQuestion() {
    if (total === 0) {
      if (questionText) questionText.textContent = 'Tidak ada soal untuk kuis ini.';
      return;
    }
    const q = questions[current] || {};
    if (quizLabel) quizLabel.textContent = 'KUIS - ' + periodName;
    if (quizTitle) quizTitle.textContent = 'Soal ' + (current + 1) + ' dari ' + total;
    if (progressFill) progressFill.style.width = ((current + 1) / total * 100) + '%';
    if (indicatorBadge) indicatorBadge.textContent = 'Indikator: ' + (q.indicator || '');
    if (questionText) questionText.textContent = q.question || '';

    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      const opts = q.options || [];
      opts.forEach(function (opt, idx) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'option' + (selectedAnswers[current] === idx ? ' selected' : '');
        btn.addEventListener('click', function () { selectOption(idx); });
        const inner = document.createElement('div');
        inner.className = 'option__inner';
        const radio = document.createElement('span');
        radio.className = 'radio';
        radio.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
        const text = document.createElement('span');
        text.className = 'option__text';
        text.textContent = opt;
        inner.appendChild(radio);
        inner.appendChild(text);
        btn.appendChild(inner);
        optionsContainer.appendChild(btn);
      });
    }

    if (nextBtn) {
      nextBtn.textContent = (current === total - 1) ? 'Selesai' : 'Lanjut';
    }
    if (prevBtn) {
      prevBtn.style.visibility = current === 0 ? 'hidden' : 'visible';
    }
  }

  function selectOption(idx) {
    selectedAnswers[current] = idx;
    const btns = optionsContainer.querySelectorAll('.option');
    btns.forEach(function (b, i) {
      if (i === idx) b.classList.add('selected');
      else b.classList.remove('selected');
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      if (current < total - 1) {
        current += 1;
        renderQuestion();
      } else {
        finishQuiz();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      if (current > 0) {
        current -= 1;
        renderQuestion();
      }
    });
  }

  renderQuestion();
})();
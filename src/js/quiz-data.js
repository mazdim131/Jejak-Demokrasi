(function () {
  'use strict';

  const periods = {
    'uud-1945-masa-revolusi': {
      id: 'uud-1945-masa-revolusi',
      title: 'UUD 1945 Masa Revolusi',
      shortTitle: 'UUD 1945 Masa Revolusi',
      iconColor: 'blue',
      questionCount: 5,
      questions: [
        {
          indicator: 'Pemilihan Umum',
          question: 'Pada periode UUD 1945 Masa Revolusi, bagaimana mekanisme pemilihan pemimpin dilakukan?',
          options: ['Melalui pemilihan langsung oleh rakyat', 'Dipilih oleh MPR hasil pemilu', 'Ditunjuk oleh Presiden', 'Dipilih oleh DPR'],
          answer: 2,
        },
        {
          indicator: 'Pembagian Kekuasaan',
          question: 'Lembaga yang memegang kekuasaan legislatif pada periode ini adalah...',
          options: ['DPR', 'MPR', 'DPA', 'MA'],
          answer: 0,
        },
        {
          indicator: 'Hak Asasi Manusia',
          question: 'Pasal berapa yang mengatur tentang hak asasi manusia dalam UUD 1945 asli?',
          options: ['Pasal 27', 'Pasal 28', 'Pasal 29', 'Pasal 30'],
          answer: 1,
        },
        {
          indicator: 'Sistem Pemerintahan',
          question: 'Sistem pemerintahan yang dianut pada periode UUD 1945 Masa Revolusi adalah...',
          options: ['Parlementer', 'Presidensial', 'Monarki', 'Federal'],
          answer: 1,
        },
        {
          indicator: 'Kedaulatan',
          question: 'Kedaulatan berada di tangan...',
          options: ['Rakyat', 'Presiden', 'DPR', 'MPR'],
          answer: 0,
        },
      ],
    },
    'uud-ris': {
      id: 'uud-ris',
      title: 'UUD RIS',
      shortTitle: 'UUD RIS',
      iconColor: 'peach',
      questionCount: 5,
      questions: [
        {
          indicator: 'Bentuk Negara',
          question: 'UUD RIS mengatur Indonesia sebagai negara...',
          options: ['Kesatuan', 'Federal', 'Konfederasi', 'Monarki'],
          answer: 1,
        },
        {
          indicator: 'Pemilihan Umum',
          question: 'Pemilihan umum pertama kali dilaksanakan pada masa...',
          options: ['UUD RIS', 'UUDS 1950', 'UUD 1945 asli', 'Orde Baru'],
          answer: 0,
        },
        {
          indicator: 'Lembaga Negara',
          question: 'Lembaga tertinggi negara menurut UUD RIS adalah...',
          options: ['Presiden', 'DPR', 'Senat', 'MPR'],
          answer: 2,
        },
        {
          indicator: 'Sistem Pemerintahan',
          question: 'Sistem pemerintahan UUD RIS cenderung...',
          options: ['Presidensial', 'Parlementer', 'Monarki', 'Federal murni'],
          answer: 1,
        },
        {
          indicator: 'Kedaulatan',
          question: 'Kedaulatan dalam UUD RIS berada di tangan...',
          options: ['Rakyat', 'Presiden', 'Parlemen', 'Negara bagian'],
          answer: 0,
        },
      ],
    },
    'uuds-1950': {
      id: 'uuds-1950',
      title: 'UUDS 1950',
      shortTitle: 'UUDS 1950',
      iconColor: 'blue',
      questionCount: 5,
      questions: [
        {
          indicator: 'Bentuk Negara',
          question: 'UUDS 1950 kembali menjadikan Indonesia sebagai negara...',
          options: ['Federal', 'Kesatuan', 'Konfederasi', 'Monarki'],
          answer: 1,
        },
        {
          indicator: 'Sistem Pemerintahan',
          question: 'Sistem pemerintahan pada masa UUDS 1950 adalah...',
          options: ['Presidensial', 'Parlementer', 'Terpimpin', 'Monarki'],
          answer: 1,
        },
        {
          indicator: 'Pemilihan Umum',
          question: 'Pemilu 1955 dilaksanakan pada masa konstitusi...',
          options: ['UUD 1945', 'UUD RIS', 'UUDS 1950', 'UUD 1945 Amandemen'],
          answer: 2,
        },
        {
          indicator: 'Lembaga Negara',
          question: 'Lembaga yang dapat menjatuhkan kabinet pada masa ini adalah...',
          options: ['Presiden', 'DPR', 'MPR', 'MA'],
          answer: 1,
        },
        {
          indicator: 'Kedaulatan',
          question: 'Kedaulatan berada di tangan...',
          options: ['Rakyat', 'Presiden', 'DPR', 'Partai'],
          answer: 0,
        },
      ],
    },
    'uud-nri-1945': {
      id: 'uud-nri-1945',
      title: 'UUD NRI 1945',
      shortTitle: 'UUD NRI 1945',
      iconColor: 'peach',
      questionCount: 5,
      questions: [
        {
          indicator: 'Bentuk Negara',
          question: 'Setelah Dekrit Presiden 5 Juli 1959, bentuk negara Indonesia adalah...',
          options: ['Federal', 'Kesatuan', 'Konfederasi', 'Monarki'],
          answer: 1,
        },
        {
          indicator: 'Sistem Pemerintahan',
          question: 'Sistem pemerintahan yang dianut pada periode ini adalah...',
          options: ['Parlementer', 'Presidensial', 'Terpimpin', 'Monarki'],
          answer: 2,
        },
        {
          indicator: 'Kedaulatan',
          question: 'Kedaulatan berada di tangan...',
          options: ['Rakyat', 'Presiden', 'DPR', 'MPR'],
          answer: 3,
        },
        {
          indicator: 'Lembaga Negara',
          question: 'Lembaga tertinggi negara pada periode ini adalah...',
          options: ['Presiden', 'DPR', 'MPR', 'MA'],
          answer: 2,
        },
        {
          indicator: 'Ideologi',
          question: 'Ideologi yang dianut pada periode ini adalah...',
          options: ['Liberalisme', 'Komunisme', 'Pancasila', 'Sosialisme'],
          answer: 2,
        },
      ],
    },
  };

  // Kuis Final: gabungan soal dari semua periode (15 soal)
  const finalQuestions = [];
  Object.keys(periods).forEach(function (key) {
    periods[key].questions.forEach(function (q) {
      finalQuestions.push(q);
    });
  });
  // batasi 15 soal
  const finalTrimmed = finalQuestions.slice(0, 15);

  periods['final'] = {
    id: 'final',
    title: 'Kuis Final',
    shortTitle: 'Kuis Final',
    iconColor: 'blue',
    questionCount: finalTrimmed.length,
    questions: finalTrimmed,
  };

  window.quizPeriods = periods;

  // backward compat: default period
  window.quizData = periods['uud-1945-masa-revolusi'].questions;
  window.quizPeriod = periods['uud-1945-masa-revolusi'].title;
})();
/**
 * 솔라 그라티아 (Sola Gratia) - 정통 개혁주의 성경 주석 애플리케이션
 * Google AI Studio (Gemini 1.5 Flash) 연동 및 3-Layer 카드뉴스 시스템
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. 성경 66권 전체 메타데이터 (권명, 약칭, 장 수, 구약/신약 구분)
  // ==========================================================================
  const BIBLE_BOOKS = [
    // 구약 (39권)
    { name: '창세기', abbr: '창', chapters: 50, testament: 'OT' },
    { name: '출애굽기', abbr: '출', chapters: 40, testament: 'OT' },
    { name: '레위기', abbr: '레', chapters: 27, testament: 'OT' },
    { name: '민수기', abbr: '민', chapters: 36, testament: 'OT' },
    { name: '신명기', abbr: '신', chapters: 34, testament: 'OT' },
    { name: '여호수아', abbr: '수', chapters: 24, testament: 'OT' },
    { name: '사사기', abbr: '삿', chapters: 21, testament: 'OT' },
    { name: '룻기', abbr: '룻', chapters: 4, testament: 'OT' },
    { name: '사무엘상', abbr: '삼상', chapters: 31, testament: 'OT' },
    { name: '사무엘하', abbr: '삼하', chapters: 24, testament: 'OT' },
    { name: '열왕기상', abbr: '왕상', chapters: 22, testament: 'OT' },
    { name: '열왕기하', abbr: '왕하', chapters: 25, testament: 'OT' },
    { name: '역대상', abbr: '대상', chapters: 29, testament: 'OT' },
    { name: '역대하', abbr: '대하', chapters: 36, testament: 'OT' },
    { name: '에스라', abbr: '스', chapters: 10, testament: 'OT' },
    { name: '느헤미야', abbr: '느', chapters: 13, testament: 'OT' },
    { name: '에스더', abbr: '에', chapters: 10, testament: 'OT' },
    { name: '욥기', abbr: '욥', chapters: 42, testament: 'OT' },
    { name: '시편', abbr: '시', chapters: 150, testament: 'OT' },
    { name: '잠언', abbr: '잠', chapters: 31, testament: 'OT' },
    { name: '전도서', abbr: '전', chapters: 12, testament: 'OT' },
    { name: '아가', abbr: '아', chapters: 8, testament: 'OT' },
    { name: '이사야', abbr: '사', chapters: 66, testament: 'OT' },
    { name: '예레미야', abbr: '렘', chapters: 52, testament: 'OT' },
    { name: '예레미야애가', abbr: '애', chapters: 5, testament: 'OT' },
    { name: '에스겔', abbr: '겔', chapters: 48, testament: 'OT' },
    { name: '다니엘', abbr: '단', chapters: 12, testament: 'OT' },
    { name: '호세아', abbr: '호', chapters: 14, testament: 'OT' },
    { name: '요엘', abbr: '욜', chapters: 3, testament: 'OT' },
    { name: '아모스', abbr: '암', chapters: 9, testament: 'OT' },
    { name: '오바댜', abbr: '옵', chapters: 1, testament: 'OT' },
    { name: '요나', abbr: '욘', chapters: 4, testament: 'OT' },
    { name: '미가', abbr: '미', chapters: 7, testament: 'OT' },
    { name: '나훔', abbr: '나', chapters: 3, testament: 'OT' },
    { name: '하박국', abbr: '합', chapters: 3, testament: 'OT' },
    { name: '스바냐', abbr: '습', chapters: 3, testament: 'OT' },
    { name: '학개', abbr: '학', chapters: 2, testament: 'OT' },
    { name: '스가랴', abbr: '슥', chapters: 14, testament: 'OT' },
    { name: '말라기', abbr: '말', chapters: 4, testament: 'OT' },

    // 신약 (27권)
    { name: '마태복음', abbr: '마', chapters: 28, testament: 'NT' },
    { name: '마가복음', abbr: '막', chapters: 16, testament: 'NT' },
    { name: '누가복음', abbr: '눅', chapters: 24, testament: 'NT' },
    { name: '요한복음', abbr: '요', chapters: 21, testament: 'NT' },
    { name: '사도행전', abbr: '행', chapters: 28, testament: 'NT' },
    { name: '로마서', abbr: '롬', chapters: 16, testament: 'NT' },
    { name: '고린도전서', abbr: '고전', chapters: 16, testament: 'NT' },
    { name: '고린도후서', abbr: '고후', chapters: 13, testament: 'NT' },
    { name: '갈라디아서', abbr: '갈', chapters: 6, testament: 'NT' },
    { name: '에베소서', abbr: '엡', chapters: 6, testament: 'NT' },
    { name: '빌립보서', abbr: '빌', chapters: 4, testament: 'NT' },
    { name: '골로새서', abbr: '골', chapters: 4, testament: 'NT' },
    { name: '데살로니가전서', abbr: '살전', chapters: 5, testament: 'NT' },
    { name: '데살로니가후서', abbr: '살후', chapters: 3, testament: 'NT' },
    { name: '디모데전서', abbr: '딤전', chapters: 6, testament: 'NT' },
    { name: '디모데후서', abbr: '딤후', chapters: 4, testament: 'NT' },
    { name: '디도서', abbr: '딛', chapters: 3, testament: 'NT' },
    { name: '빌레몬서', abbr: '몬', chapters: 1, testament: 'NT' },
    { name: '히브리서', abbr: '히', chapters: 13, testament: 'NT' },
    { name: '야고보서', abbr: '약', chapters: 5, testament: 'NT' },
    { name: '베드로전서', abbr: '벧전', chapters: 5, testament: 'NT' },
    { name: '베드로후서', abbr: '벧후', chapters: 3, testament: 'NT' },
    { name: '요한일서', abbr: '요일', chapters: 5, testament: 'NT' },
    { name: '요한이서', abbr: '요이', chapters: 1, testament: 'NT' },
    { name: '요한삼서', abbr: '요삼', chapters: 1, testament: 'NT' },
    { name: '유다서', abbr: '유', chapters: 1, testament: 'NT' },
    { name: '요한계시록', abbr: '계', chapters: 22, testament: 'NT' }
  ];

  // ==========================================================================
  // 2. 개혁주의 신학자 묵상 명언 로테이션 목록
  // ==========================================================================
  const THEOLOGIAN_QUOTES = [
    { text: "성경은 하나님께서 우리를 가르치시는 거룩한 학교이다.", author: "장 칼뱅 (John Calvin)" },
    { text: "성경을 찌르면 어디서나 그리스도의 피가 흘러나온다.", author: "찰스 스펄전 (Charles H. Spurgeon)" },
    { text: "하나님의 말씀은 결코 사람의 뜻으로 난 것이 아니요, 성령의 감동하심을 받은 사람들이 하나님께 받아 말한 것이다.", author: "헤르만 바빙크 (Herman Bavinck)" },
    { text: "우리의 온갖 사변을 성경의 권위 아래 무릎 꿇게 하는 것이 참된 신앙의 첫걸음이다.", author: "B. B. 워필드 (B. B. Warfield)" },
    { text: "은혜의 교리는 사람을 겸손하게 하고 오직 하나님만을 높이게 만든다.", author: "조나단 에드워즈 (Jonathan Edwards)" },
    { text: "하나님의 주권을 인정하는 사람은 어떤 역경 속에서도 깊은 평안을 누린다.", author: "아브라함 카이퍼 (Abraham Kuyper)" }
  ];

  // ==========================================================================
  // 3. 시연용 (체험 모드) 정통 개혁주의 주석 샘플 데이터
  // ==========================================================================
  const DEMO_COMMENTARIES = {
    '창세기 1:1': {
      summary: "하나님께서 무(無)에서 유(有)를 창조하심으로(Creatio ex nihilo) 만물의 절대적 주권자이자 역사의 주관자이심을 선포합니다. 세상의 모든 피조물은 스스로 존재하지 못하며, 오직 하나님의 지혜와 뜻으로 존재합니다.",
      history: "고대 근동의 혼란스러운 다신론적 창조 신화(바벨론의 에누마 엘리쉬 등)와 확연히 구별되는 유일신 하나님의 절대 주권적 창조 선언입니다. 개혁주의 창조론은 창조 사역을 삼위일체 하나님(성부의 작정, 말씀이신 성자의 성취, 성령의 운행하심)의 완벽한 사역으로 이해하며, 성경의 완전 영감성에 기초하여 무에서의 창조를 고백합니다.",
      exegesis: "히브리어 원문 **'베레쉬트 바라 엘로힘'**에서 '바라(בָּרָא)' 동사는 오직 하나님만이 주어로 사용되는 거룩한 단어입니다. 인간은 기존의 재료를 가공할 뿐이지만, 하나님은 아무것도 없는 상태에서 말씀 하나로 하늘과 땅의 모든 질서와 아름다움을 지으셨습니다. 이 첫 구절은 우리의 생명과 우주가 우연의 산물이 아니라, 목적과 사랑을 가지신 거룩하신 창조주의 손길 안에 있음을 분명히 증언합니다.",
      application: "1. **삶의 적용**: 내 삶의 모든 영역(가정, 일터, 미래)이 창조주 하나님의 전능하신 손안에 있음을 신뢰하고 염려를 내려놓읍시다.\n2. **소그룹 나눔**: 요즘 내 마음속에 '혼돈과 공허'처럼 느껴지는 문제는 무엇이며, 창조의 빛을 비추시는 하나님을 어떻게 의지할 수 있을까요?\n3. **기도 제목**: 혼란한 세상 속에서 창조주 하나님의 질서와 주권을 온전히 찬양하며, 매 순간 하나님의 영광을 위해 살아가는 믿음을 주옵소서."
    },
    '요한복음 3:16': {
      summary: "독생자를 내어주신 하나님의 무조건적이고 측량할 수 없는 사랑과, 오직 믿음(Sola Fide)으로 얻는 영원한 생명의 복음을 선포하는 성경 전체의 황금률입니다.",
      history: "유대 율법주의와 밤에 찾아온 니고데모와의 대화라는 역사적 문맥에서, 예수님은 인간의 종교적 공로나 율법 준수가 아닌 성령의 거듭남과 하나님의 주권적 구원 은혜를 가르치십니다. 개혁주의 신학은 이 구절을 값없는 은혜(Sola Gratia)의 절정이자, 십자가 대속을 통한 구속 언약의 완전한 성취로 고백합니다.",
      exegesis: "헬라어 **'아가파오(ἠγάπησεν)'**는 감정적 호감을 넘어선, 자신의 가장 귀한 것을 내어주는 희생적이며 언약적인 신적 사랑입니다. '세상'은 하나님을 거역하고 부패한 인류를 뜻하며, 하나님께서는 그런 자격 없는 세상을 구원하시기 위해 유일하신 아들 예수 그리스도를 십자가의 화목제물로 내어주셨습니다. '믿는 자마다 멸망하지 않고'라는 말씀은 그리스도의 의를 덧입는 자에게 결코 정죄함이 없음을 확증합니다.",
      application: "1. **삶의 적용**: 내가 하나님의 사랑을 받을 만한 공로가 있어서 구원받은 것이 아님을 기억하며, 평생 감사와 겸손의 태도를 품읍시다.\n2. **소그룹 나눔**: 십자가 복음의 은혜가 내 삶의 낙심과 죄책감을 어떻게 이겨내게 했는지 서로 간증해 봅시다.\n3. **기도 제목**: 독생자를 아끼지 않으신 하나님의 그 크신 사랑을 깊이 묵상하며, 이 복음의 기쁜 소식을 아직 주님을 모르는 이웃들에게 담대히 전하게 하옵소서."
    },
    '로마서 8:28': {
      summary: "하나님을 사랑하고 그 뜻대로 부르심을 입은 자들에게는 삶의 고난과 시련을 포함한 모든 일이 궁극적으로 영원한 선(구원의 완성)을 이루어간다는 확고한 섭리의 약속입니다.",
      history: "로마 교회 성도들이 직면한 박해와 피조물의 신음 속에서 사도 바울이 선포한 하나님의 주권적 섭리(Providentia Dei) 교리입니다. 칼뱅은 본문을 해설하며 '성도에게 닥치는 역경조차 하나님의 부성애적 징계와 성화의 도구로 사용된다'고 강조하였습니다.",
      exegesis: "헬라어 **'순에르게이(συνεργεῖ)'**는 '함께 일하여 어떤 결과를 빚어내다'를 뜻합니다. 여기서 '선(ἀγαθόν)'은 세상적인 물질적 형통이나 안락함이 아니라, 이어지는 29절에 명시된 대로 **'그 아들의 형상을 본받는 성화와 궁극적인 영화'**를 의미합니다. 하나님께서는 실패, 질병, 슬픔의 조각들까지도 주권적으로 조율하셔서 신자를 그리스도를 닮아가도록 빚어가십니다.",
      application: "1. **삶의 적용**: 지금 당장 이해되지 않는 고난이나 답답한 상황 속에서도 하나님의 선하신 섭리를 신뢰하며 낙심치 맙시다.\n2. **소그룹 나눔**: 최근 내 삶에서 '모든 것이 합력하여 선을 이룬다'는 말씀이 실제로 경험된 일화가 있다면 함께 나누어 봅시다.\n3. **기도 제목**: 주권자이신 하나님 아버지, 내 뜻과 다른 환경 속에서도 하나님의 변함없는 선하심을 굳게 믿고 감사로 인내하게 하옵소서."
    }
  };

  // ==========================================================================
  // 4. 시스템 지시문 (System Instruction) - 요구사항 엄격 준수
  // ==========================================================================
  const REFORMED_SYSTEM_INSTRUCTION = `너는 정통 개혁주의 신학에 입각한 성경 주석 전문 가이드이다.
1. 정통 개혁주의 신학 및 주요 교단(장로교, 감리교 등) 공통 교리에 입각한 자의적이지 않은 해설을 제공하라.
2. 성경 장/절, 역사적 배경, 원어 의미는 사실(Zero Hallucination)에만 근거하라. 불확실한 것은 추측하지 말라.
3. 출력 형식: 
   - 📌 [핵심 요약] (1~2문장)
   - 🏛️ [역사적·신학적 배경]
   - 💡 [쉬운 본문 해설] (선택된 난이도에 맞춤)
   - 🚶‍♂️ [오늘의 삶 적용 & 기도 제목]`;

  // ==========================================================================
  // 5. DOM 엘리먼트 참조
  // ==========================================================================
  const el = {
    // 헤더 & 모달
    btnToggleApiKey: document.getElementById('btnToggleApiKey'),
    apiKeyBadge: document.getElementById('apiKeyBadge'),
    btnDemoQuick: document.getElementById('btnDemoQuick'),
    apiKeyModal: document.getElementById('apiKeyModal'),
    btnCloseApiKeyModal: document.getElementById('btnCloseApiKeyModal'),
    btnCancelApiKey: document.getElementById('btnCancelApiKey'),
    btnSaveApiKey: document.getElementById('btnSaveApiKey'),
    btnDeleteApiKey: document.getElementById('btnDeleteApiKey'),
    apiKeyInput: document.getElementById('apiKeyInput'),
    btnToggleKeyVisibility: document.getElementById('btnToggleKeyVisibility'),
    modelSelect: document.getElementById('modelSelect'),

    // 성경 선택 & 필터
    testamentBtns: document.querySelectorAll('.testament-btn'),
    bookSelect: document.getElementById('bookSelect'),
    chapterInput: document.getElementById('chapterInput'),
    btnChapterPrev: document.getElementById('btnChapterPrev'),
    btnChapterNext: document.getElementById('btnChapterNext'),
    maxChapterHint: document.getElementById('maxChapterHint'),
    verseInput: document.getElementById('verseInput'),
    presetChips: document.querySelectorAll('.chip'),

    // 난이도
    diffCards: document.querySelectorAll('.difficulty-card'),
    diffRadios: document.querySelectorAll('input[name="difficulty"]'),

    // 실행 & 상태
    btnGenerateCommentary: document.getElementById('btnGenerateCommentary'),
    submitSpinner: document.getElementById('submitSpinner'),
    loadingSection: document.getElementById('loadingSection'),
    theologianQuoteText: document.getElementById('theologianQuoteText'),
    theologianQuoteAuthor: document.getElementById('theologianQuoteAuthor'),
    errorNotification: document.getElementById('errorNotification'),
    errorTitle: document.getElementById('errorTitle'),
    errorMessage: document.getElementById('errorMessage'),
    btnCloseError: document.getElementById('btnCloseError'),

    // 결과 뷰
    resultSection: document.getElementById('resultSection'),
    resScriptureBadge: document.getElementById('resScriptureBadge'),
    resDifficultyBadge: document.getElementById('resDifficultyBadge'),
    resTimestamp: document.getElementById('resTimestamp'),
    contentSummary: document.getElementById('contentSummary'),
    contentHistory: document.getElementById('contentHistory'),
    contentExegesis: document.getElementById('contentExegesis'),
    contentApplication: document.getElementById('contentApplication'),

    // 툴바 액션
    btnFontDec: document.getElementById('btnFontDec'),
    btnFontReset: document.getElementById('btnFontReset'),
    btnFontInc: document.getElementById('btnFontInc'),
    btnCopyAll: document.getElementById('btnCopyAll'),
    btnPrintCommentary: document.getElementById('btnPrintCommentary'),
    toastMessage: document.getElementById('toastMessage')
  };

  // 애플리케이션 상태
  let currentFontSize = 16;
  let quoteIntervalTimer = null;
  let currentRawCommentary = null;

  // ==========================================================================
  // 6. 초기화 및 이벤트 리스너 등록
  // ==========================================================================
  function init() {
    renderBookOptions('all');
    updateChapterLimits();
    checkApiKeyStatus();
    if (el.modelSelect) {
      el.modelSelect.value = getStoredModel();
    }
    bindEvents();
  }

  function bindEvents() {
    // API 키 모달 관련
    el.btnToggleApiKey.addEventListener('click', openApiKeyModal);
    el.btnCloseApiKeyModal.addEventListener('click', closeApiKeyModal);
    el.btnCancelApiKey.addEventListener('click', closeApiKeyModal);
    el.btnSaveApiKey.addEventListener('click', handleSaveApiKey);
    el.btnDeleteApiKey.addEventListener('click', handleDeleteApiKey);
    el.btnToggleKeyVisibility.addEventListener('click', toggleKeyVisibility);
    el.apiKeyModal.addEventListener('click', (e) => {
      if (e.target === el.apiKeyModal) closeApiKeyModal();
    });

    // 구약/신약 탭
    el.testamentBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        el.testamentBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderBookOptions(btn.dataset.testament);
      });
    });

    // 성경 권 변경 시 장 수 한계 조정
    el.bookSelect.addEventListener('change', updateChapterLimits);

    // 장 증감 버튼
    el.btnChapterPrev.addEventListener('click', () => adjustChapter(-1));
    el.btnChapterNext.addEventListener('click', () => adjustChapter(1));
    el.chapterInput.addEventListener('change', sanitizeChapterInput);

    // 추천 구절 칩 클릭
    el.presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const { book, chapter, verse } = chip.dataset;
        selectPresetVerse(book, chapter, verse);
      });
    });

    // 난이도 라디오 선택 카드 스타일 반응
    el.diffRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        el.diffCards.forEach(c => c.classList.remove('active'));
        radio.closest('.difficulty-card').classList.add('active');
      });
    });

    // 주석 생성 버튼
    el.btnGenerateCommentary.addEventListener('click', handleGenerateCommentary);

    // 빠른 체험 모드 버튼
    el.btnDemoQuick.addEventListener('click', handleRunDemo);

    // 에러 닫기
    el.btnCloseError.addEventListener('click', () => el.errorNotification.classList.add('hidden'));

    // 글자 크기 조절
    el.btnFontDec.addEventListener('click', () => setContentFontSize(currentFontSize - 1));
    el.btnFontReset.addEventListener('click', () => setContentFontSize(16));
    el.btnFontInc.addEventListener('click', () => setContentFontSize(currentFontSize + 1));

    // 복사 & 인쇄
    el.btnCopyAll.addEventListener('click', handleCopyAll);
    el.btnPrintCommentary.addEventListener('click', () => window.print());

    // 각 카드 개별 복사 버튼 위임
    document.querySelectorAll('.btn-copy-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          copyToClipboard(targetEl.innerText, '해당 섹션 내용이 복사되었습니다.');
        }
      });
    });
  }

  // ==========================================================================
  // 7. 성경 셀렉트 및 장 수 제어 로직
  // ==========================================================================
  function renderBookOptions(filter) {
    const prevSelected = el.bookSelect.value || '창세기';
    el.bookSelect.innerHTML = '';

    const filtered = BIBLE_BOOKS.filter(b => {
      if (filter === 'OT') return b.testament === 'OT';
      if (filter === 'NT') return b.testament === 'NT';
      return true;
    });

    filtered.forEach(book => {
      const opt = document.createElement('option');
      opt.value = book.name;
      opt.textContent = `${book.name} (${book.chapters}장)`;
      if (book.name === prevSelected) {
        opt.selected = true;
      }
      el.bookSelect.appendChild(opt);
    });

    // 선택된 항목이 필터링 결과에 없다면 첫 번째 항목 선택
    if (!filtered.some(b => b.name === el.bookSelect.value) && filtered.length > 0) {
      el.bookSelect.value = filtered[0].name;
    }

    updateChapterLimits();
  }

  function getSelectedBookData() {
    const bookName = el.bookSelect.value;
    return BIBLE_BOOKS.find(b => b.name === bookName) || BIBLE_BOOKS[0];
  }

  function updateChapterLimits() {
    const book = getSelectedBookData();
    el.chapterInput.max = book.chapters;
    el.maxChapterHint.textContent = `최대 ${book.chapters}장`;

    let currentVal = parseInt(el.chapterInput.value, 10) || 1;
    if (currentVal > book.chapters) {
      el.chapterInput.value = book.chapters;
    } else if (currentVal < 1) {
      el.chapterInput.value = 1;
    }
  }

  function adjustChapter(delta) {
    const book = getSelectedBookData();
    let currentVal = parseInt(el.chapterInput.value, 10) || 1;
    let nextVal = currentVal + delta;
    if (nextVal >= 1 && nextVal <= book.chapters) {
      el.chapterInput.value = nextVal;
    }
  }

  function sanitizeChapterInput() {
    const book = getSelectedBookData();
    let val = parseInt(el.chapterInput.value, 10);
    if (isNaN(val) || val < 1) {
      el.chapterInput.value = 1;
    } else if (val > book.chapters) {
      el.chapterInput.value = book.chapters;
    }
  }

  function selectPresetVerse(bookName, chapter, verse) {
    // 탭 상태 동기화
    const targetBook = BIBLE_BOOKS.find(b => b.name === bookName);
    if (targetBook) {
      el.testamentBtns.forEach(btn => {
        if (btn.dataset.testament === 'all' || btn.dataset.testament === targetBook.testament) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      renderBookOptions('all');
      el.bookSelect.value = bookName;
      updateChapterLimits();
      el.chapterInput.value = chapter;
      el.verseInput.value = verse;

      showToast(`'${bookName} ${chapter}장 ${verse}절'이 선택되었습니다.`);
    }
  }

  // ==========================================================================
  // 8. API 키 및 모델 관리 (로컬 스토리지)
  // ==========================================================================
  const STORAGE_KEY = 'reformed_gemini_api_key';
  const MODEL_STORAGE_KEY = 'reformed_gemini_selected_model';
  const DEFAULT_MODEL = 'gemini-2.5-flash';

  function getStoredApiKey() {
    return localStorage.getItem(STORAGE_KEY) || '';
  }

  function getStoredModel() {
    return localStorage.getItem(MODEL_STORAGE_KEY) || DEFAULT_MODEL;
  }

  function setStoredModel(model) {
    localStorage.setItem(MODEL_STORAGE_KEY, model || DEFAULT_MODEL);
  }

  function checkApiKeyStatus() {
    const key = getStoredApiKey();
    if (key && key.trim().length > 10) {
      el.apiKeyBadge.classList.add('active');
      el.apiKeyBadge.title = 'API 키가 등록되어 있습니다.';
    } else {
      el.apiKeyBadge.classList.remove('active');
      el.apiKeyBadge.title = 'API 키가 등록되지 않았습니다.';
    }
  }

  function openApiKeyModal() {
    el.apiKeyInput.value = getStoredApiKey();
    if (el.modelSelect) {
      el.modelSelect.value = getStoredModel();
    }
    el.apiKeyModal.classList.remove('hidden');
    el.apiKeyInput.focus();
  }

  function closeApiKeyModal() {
    el.apiKeyModal.classList.add('hidden');
  }

  function handleSaveApiKey() {
    const key = el.apiKeyInput.value.trim();
    if (!key) {
      alert('API 키를 입력해주세요. 없으실 경우 AI Studio에서 무료로 발급받으실 수 있습니다.');
      return;
    }
    localStorage.setItem(STORAGE_KEY, key);
    if (el.modelSelect) {
      setStoredModel(el.modelSelect.value);
    }
    checkApiKeyStatus();
    closeApiKeyModal();
    const activeModel = getStoredModel();
    showToast(`Gemini API 키 및 모델(${activeModel})이 저장되었습니다.`);
  }

  function handleDeleteApiKey() {
    if (confirm('저장된 API 키와 설정을 삭제하시겠습니까?')) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(MODEL_STORAGE_KEY);
      el.apiKeyInput.value = '';
      if (el.modelSelect) {
        el.modelSelect.value = DEFAULT_MODEL;
      }
      checkApiKeyStatus();
      closeApiKeyModal();
      showToast('API 키 및 설정이 삭제되었습니다.');
    }
  }

  function toggleKeyVisibility() {
    if (el.apiKeyInput.type === 'password') {
      el.apiKeyInput.type = 'text';
      el.btnToggleKeyVisibility.textContent = '🔒';
    } else {
      el.apiKeyInput.type = 'password';
      el.btnToggleKeyVisibility.textContent = '👁️';
    }
  }

  // ==========================================================================
  // 9. Gemini API 연동 (Fetch API & Gemini 1.5 Flash)
  // ==========================================================================
  function getSelectedDifficulty() {
    const selected = document.querySelector('input[name="difficulty"]:checked');
    return selected ? selected.value : 'believer';
  }

  function getDifficultyTitle(val) {
    switch (val) {
      case 'beginner': return '어린이 / 입문자';
      case 'scholar': return '심화 / 연구';
      case 'believer':
      default: return '성도 / 청년';
    }
  }

  function getDifficultyPromptContext(val) {
    switch (val) {
      case 'beginner':
        return `[선택된 독자층: 어린이/새신자/입문자]
- 친근하고 따뜻한 어조(해요체)를 사용할 것.
- 어려운 한자어나 전문 신학 용어는 초등학생이나 초신자도 이해할 수 있는 일상적인 비유와 쉬운 언어로 풀어 설명할 것.
- 하나님이 얼마나 우리를 사랑하시며 돌보시는지를 명확하게 전달할 것.`;
      case 'scholar':
        return `[선택된 독자층: 목회자/신학생/심화 연구자]
- 히브리어(구약) 또는 헬라어(신약) 주요 단어의 원어 의미 및 문법적/주석적 뉘앙스를 심도 있게 다룰 것.
- 역사적-문법적 해석(Grammatico-Historical Exegesis)에 충실할 것.
- 웨스트민스터 신앙고백서, 하이델베르크 요리문답, 칼뱅의 기독교 강요 등 정통 개혁주의 교리적 연관성을 짚어줄 것.`;
      case 'believer':
      default:
        return `[선택된 독자층: 일반 성도 / 청년 / 구역 소그룹]
- 구속사적(예수 그리스도 중심) 문맥과 신학적 균형을 유지할 것.
- 일상 속(직장, 가정, 인간관계)에서 부딪히는 구체적인 고민과 연결되는 실천적 묵상과 나눔 포인트를 제공할 것.`;
    }
  }

  async function handleGenerateCommentary() {
    const apiKey = getStoredApiKey();

    if (!apiKey) {
      openApiKeyModal();
      showError('API 키 필요', 'Google AI Studio API 키를 먼저 입력해 주세요. (또는 상단의 [체험 모드]를 누르면 즉시 시연할 수 있습니다.)');
      return;
    }

    const book = el.bookSelect.value;
    const chapter = el.chapterInput.value;
    const verse = el.verseInput.value.trim() || '1';
    const scriptureText = `${book} ${chapter}장 ${verse}절`;
    const difficulty = getSelectedDifficulty();
    const diffTitle = getDifficultyTitle(difficulty);

    // UI 상태 전환: 로딩 시작
    startLoading(scriptureText, diffTitle);

    const userPrompt = `[성경 본문]: ${scriptureText}
[주석 난이도]: ${diffTitle}

${getDifficultyPromptContext(difficulty)}

위 성경 본문에 대하여 시스템 지시문의 원칙과 지정된 4가지 출력 형식을 엄격히 준수하여 정통 개혁주의 주석을 작성해 주세요.
반드시 각 섹션 제목을 아래와 같이 명시하여 작성해 주세요:
📌 [핵심 요약]
🏛️ [역사적·신학적 배경]
💡 [쉬운 본문 해설]
🚶‍♂️ [오늘의 삶 적용 & 기도 제목]`;

    try {
      const activeModel = getStoredModel();
      console.log(`[Gemini API] 주석 생성 요청 시작 - 모델: ${activeModel}`);
      const response = await fetchGeminiCommentary(apiKey, REFORMED_SYSTEM_INSTRUCTION, userPrompt, activeModel);
      stopLoading();
      renderCommentaryResult(scriptureText, diffTitle, response);
    } catch (err) {
      stopLoading();
      console.error('Gemini API Error:', err);
      showError('주석 생성 중 오류가 발생했습니다', err.message || '네트워크 상태 또는 API 키를 확인해 주세요.');
    }
  }

  /**
   * Google Gemini API 호출 함수 (v1beta 엔드포인트)
   * 고정 모델: gemini-2.5-flash
   * 엔드포인트 형식: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={apiKey}
   */
  async function fetchGeminiCommentary(apiKey, systemInstruction, prompt, primaryModel = 'gemini-2.5-flash') {
    // 항상 gemini-2.5-flash 모델 고정 사용
    const model = 'gemini-2.5-flash';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
    console.log(`[Gemini API] 호출 엔드포인트: https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`);

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.25,
        topP: 0.95,
        maxOutputTokens: 2500
      }
    };

    if (systemInstruction) {
      requestBody.systemInstruction = {
        parts: [
          { text: systemInstruction }
        ]
      };
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const errorMsg = errorData.error?.message || `HTTP ${res.status} (${res.statusText})`;

      if (res.status === 400 && (errorMsg.includes('API_KEY_INVALID') || errorMsg.includes('API key not valid'))) {
        throw new Error('입력하신 Google AI Studio API 키가 올바르지 않습니다. 키를 다시 확인해 주세요.');
      } else if (res.status === 429) {
        throw new Error('Google AI Studio의 무료 요청 한도(Quota)를 초과했습니다. 잠시 후 다시 시도해 주세요.');
      } else if (res.status === 404 || errorMsg.includes('is not found') || errorMsg.includes('not supported')) {
        throw new Error(`Gemini 모델(${model}) 엔드포인트를 찾을 수 없습니다: ${errorMsg}`);
      } else {
        throw new Error(`Gemini API 통신 실패 (${model}): ${errorMsg}`);
      }
    }

    const data = await res.json();
    const candidate = data.candidates?.[0];
    if (!candidate || !candidate.content?.parts?.[0]?.text) {
      throw new Error('AI 모델로부터 유효한 응답을 받지 못했습니다.');
    }

    return candidate.content.parts[0].text;
  }

  // 기존 함수명 호환성 유지 (gemini-2.5-flash 고정)
  async function fetchGemini15Pro(apiKey, systemInstruction, prompt) {
    return fetchGeminiCommentary(apiKey, systemInstruction, prompt, 'gemini-2.5-flash');
  }

  // ==========================================================================
  // 10. 시연용 체험 모드 (Demo Mode)
  // ==========================================================================
  function handleRunDemo() {
    const book = el.bookSelect.value;
    const chapter = el.chapterInput.value;
    const verse = el.verseInput.value.trim() || '1';
    const keyCandidate = `${book} ${chapter}:${verse}`;
    const difficulty = getSelectedDifficulty();
    const diffTitle = getDifficultyTitle(difficulty);

    // 매칭되는 샘플이 있으면 사용하고, 없으면 기본 로마서 8:28 또는 창세기 1:1로 유연하게 제공
    let demoData = DEMO_COMMENTARIES[keyCandidate];
    let selectedScripture = `${book} ${chapter}장 ${verse}절`;

    if (!demoData) {
      if (book === '창세기') {
        demoData = DEMO_COMMENTARIES['창세기 1:1'];
        selectedScripture = '창세기 1장 1절';
      } else if (book === '요한복음') {
        demoData = DEMO_COMMENTARIES['요한복음 3:16'];
        selectedScripture = '요한복음 3장 16절';
      } else {
        demoData = DEMO_COMMENTARIES['로마서 8:28'];
        selectedScripture = '로마서 8장 28절';
      }
    }

    startLoading(selectedScripture, `${diffTitle} (체험 모드)`);

    setTimeout(() => {
      stopLoading();
      const demoMarkdown = `📌 [핵심 요약]
${demoData.summary}

🏛️ [역사적·신학적 배경]
${demoData.history}

💡 [쉬운 본문 해설]
${demoData.exegesis}

🚶‍♂️ [오늘의 삶 적용 & 기도 제목]
${demoData.application}`;

      renderCommentaryResult(selectedScripture, `${diffTitle} (체험 모드)`, demoMarkdown);
      showToast('체험 모드: 정통 개혁주의 주석 샘플이 표시되었습니다.');
    }, 900);
  }

  // ==========================================================================
  // 11. 응답 파싱 및 카드 뉴스 렌더링
  // ==========================================================================
  function parseCommentarySections(rawText) {
    const sections = {
      summary: '',
      history: '',
      exegesis: '',
      application: ''
    };

    // 정규표현식으로 4대 섹션 분리
    // 📌 [핵심 요약]
    // 🏛️ [역사적·신학적 배경]
    // 💡 [쉬운 본문 해설]
    // 🚶‍♂️ [오늘의 삶 적용 & 기도 제목]

    const pattern = /(?:📌|\[📌\])?\s*\[?핵심\s*요약\]?([\s\S]*?)(?=(?:🏛️|\[🏛️\])?\s*\[?역사적[·\s]*신학적\s*배경\]?|$)/i;
    const patternHistory = /(?:🏛️|\[🏛️\])?\s*\[?역사적[·\s]*신학적\s*배경\]?([\s\S]*?)(?=(?:💡|\[💡\])?\s*\[?쉬운\s*본문\s*해설\]?|$)/i;
    const patternExegesis = /(?:💡|\[💡\])?\s*\[?쉬운\s*본문\s*해설\]?([\s\S]*?)(?=(?:🚶‍♂️|🚶|\[🚶‍♂️\])?\s*\[?오늘의\s*삶\s*적용[\s\S]*?기도\s*제목\]?|$)/i;
    const patternApp = /(?:🚶‍♂️|🚶|\[🚶‍♂️\])?\s*\[?오늘의\s*삶\s*적용[\s\S]*?기도\s*제목\]?([\s\S]*)$/i;

    const matchSummary = rawText.match(pattern);
    const matchHistory = rawText.match(patternHistory);
    const matchExegesis = rawText.match(patternExegesis);
    const matchApp = rawText.match(patternApp);

    if (matchSummary && matchHistory && matchExegesis && matchApp) {
      sections.summary = cleanSectionText(matchSummary[1]);
      sections.history = cleanSectionText(matchHistory[1]);
      sections.exegesis = cleanSectionText(matchExegesis[1]);
      sections.application = cleanSectionText(matchApp[1]);
    } else {
      // 패턴이 다소 어긋난 경우 4분할 백업 파서
      sections.summary = rawText;
      sections.history = "정통 개혁주의 신학의 역사적 문맥과 무오한 말씀에 기초한 성경 해설입니다.";
      sections.exegesis = "본문을 구속사적 관점에서 묵상하며 하나님의 은혜를 깊이 헤아립니다.";
      sections.application = "오늘 하루 말씀 앞에 삶을 비추어 보며 기도로 하나님과 교제합시다.";
    }

    return sections;
  }

  function cleanSectionText(text) {
    if (!text) return '';
    return text.trim().replace(/^[-*]\s*/gm, '');
  }

  /**
   * 간단하고 안전한 마크다운 HTML 파서
   */
  function formatMarkdown(text) {
    if (!text) return '';

    // XSS 방지를 위한 기본 이스케이프
    let safe = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // 볼드 (**text**)
    safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // 이탤릭 (*text*)
    safe = safe.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // 줄 단위 처리 (문단 및 리스트)
    const lines = safe.split('\n');
    let html = '';
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line) {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        continue;
      }

      // 번호 리스트나 불릿 리스트 감지
      if (/^[0-9]+\.\s+/.test(line) || /^[-•]\s+/.test(line)) {
        if (!inList) {
          html += '<ul>';
          inList = true;
        }
        const itemText = line.replace(/^[0-9]+\.\s+|^[-•]\s+/, '');
        html += `<li>${itemText}</li>`;
      } else {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        html += `<p>${line}</p>`;
      }
    }

    if (inList) {
      html += '</ul>';
    }

    return html;
  }

  function renderCommentaryResult(scriptureText, diffTitle, rawResponse) {
    currentRawCommentary = {
      scripture: scriptureText,
      difficulty: diffTitle,
      text: rawResponse,
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
    };

    el.resScriptureBadge.textContent = scriptureText;
    el.resDifficultyBadge.textContent = diffTitle;
    el.resTimestamp.textContent = currentRawCommentary.date;

    const sections = parseCommentarySections(rawResponse);

    el.contentSummary.innerHTML = formatMarkdown(sections.summary);
    el.contentHistory.innerHTML = formatMarkdown(sections.history);
    el.contentExegesis.innerHTML = formatMarkdown(sections.exegesis);
    el.contentApplication.innerHTML = formatMarkdown(sections.application);

    el.resultSection.classList.remove('hidden');

    // 결과 위치로 부드럽게 스크롤
    el.resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ==========================================================================
  // 12. UI 상태 제어 (로딩, 명언 로테이션, 글자 크기, 토스트)
  // ==========================================================================
  function startLoading(scripture, diff) {
    el.errorNotification.classList.add('hidden');
    el.resultSection.classList.add('hidden');
    el.loadingSection.classList.remove('hidden');

    el.btnGenerateCommentary.disabled = true;
    el.submitSpinner.classList.remove('hidden');

    // 개혁주의 신학자 명언 로테이션 시작
    rotateTheologianQuote();
    quoteIntervalTimer = setInterval(rotateTheologianQuote, 3200);

    el.loadingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function stopLoading() {
    el.loadingSection.classList.add('hidden');
    el.btnGenerateCommentary.disabled = false;
    el.submitSpinner.classList.add('hidden');

    if (quoteIntervalTimer) {
      clearInterval(quoteIntervalTimer);
      quoteIntervalTimer = null;
    }
  }

  function rotateTheologianQuote() {
    const randomQuote = THEOLOGIAN_QUOTES[Math.floor(Math.random() * THEOLOGIAN_QUOTES.length)];
    el.theologianQuoteText.style.opacity = 0;
    setTimeout(() => {
      el.theologianQuoteText.textContent = randomQuote.text;
      el.theologianQuoteAuthor.textContent = `— ${randomQuote.author}`;
      el.theologianQuoteText.style.opacity = 1;
    }, 200);
  }

  function showError(title, message) {
    el.errorTitle.textContent = title;
    el.errorMessage.textContent = message;
    el.errorNotification.classList.remove('hidden');
    el.errorNotification.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function setContentFontSize(size) {
    if (size < 13 || size > 24) return;
    currentFontSize = size;
    document.documentElement.style.setProperty('--content-font-size', `${size}px`);
  }

  function showToast(msg) {
    el.toastMessage.textContent = msg;
    el.toastMessage.classList.remove('hidden');
    setTimeout(() => {
      el.toastMessage.classList.add('hidden');
    }, 2500);
  }

  function copyToClipboard(text, successMsg = '클립보드에 복사되었습니다.') {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
      }).catch(() => {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMsg);
    } catch (e) {
      alert('복사에 실패했습니다. 수동으로 복사해 주세요.');
    }
    document.body.removeChild(textArea);
  }

  function handleCopyAll() {
    if (!currentRawCommentary) return;
    const fullText = `[솔라 그라티아 - 정통 개혁주의 성경 주석]
본문: ${currentRawCommentary.scripture}
난이도: ${currentRawCommentary.difficulty}
작성일: ${currentRawCommentary.date}

${currentRawCommentary.text}

(Soli Deo Gloria - 오직 하나님께 영광을)`;

    copyToClipboard(fullText, '전체 주석 텍스트가 복사되었습니다.');
  }

  // DOMContentLoaded 시 초기화 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

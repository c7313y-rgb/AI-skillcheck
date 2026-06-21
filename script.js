"use strict";

const GOOGLE_FORMS_CONFIG = {
  enabled: false,
  formActionUrl: "",
  entries: {
    name: "entry.0000000001",
    email: "entry.0000000002",
    organization: "entry.0000000003",
    userType: "entry.0000000004",
    totalScore: "entry.0000000005",
    level: "entry.0000000006",
    interests: "entry.0000000007",
    recommendedCourses: "entry.0000000008",
    learningMode: "entry.0000000009",
    notes: "entry.0000000010",
    diagnosisJson: "entry.0000000011"
  }
};

const CATEGORIES = [
  { key: "literacy", label: "AI基礎理解", color: "#0978ee" },
  { key: "prompt", label: "プロンプト活用", color: "#14c4d8" },
  { key: "business", label: "業務改善", color: "#ff9f2f" },
  { key: "data", label: "データ活用", color: "#7b61ff" },
  { key: "automation", label: "開発・自動化", color: "#20b977" },
  { key: "governance", label: "ガバナンス", color: "#12a6a3" }
];

const INTERESTS = [
  { key: "productivity", label: "業務効率化", icon: "⚡", targets: { business: 88, prompt: 82, automation: 70, literacy: 70 } },
  { key: "documents", label: "資料作成・情報発信", icon: "📝", targets: { prompt: 88, literacy: 74, governance: 68 } },
  { key: "dataDecision", label: "データ分析・意思決定", icon: "📊", targets: { data: 88, business: 78, literacy: 70 } },
  { key: "revenue", label: "新規事業・収益化", icon: "💡", targets: { business: 86, data: 78, prompt: 76, governance: 70 } },
  { key: "implementation", label: "社内AI実装", icon: "🏢", targets: { business: 86, automation: 82, governance: 80, data: 74 } },
  { key: "development", label: "開発・自動化", icon: "⌘", targets: { automation: 90, prompt: 82, governance: 72 } },
  { key: "agent", label: "AIエージェント", icon: "🤖", targets: { automation: 92, data: 82, governance: 82, business: 78 } },
  { key: "learning", label: "学習・進路", icon: "🎓", targets: { literacy: 82, prompt: 80, data: 68, governance: 74 } },
  { key: "governance", label: "安全利用・ガバナンス", icon: "🛡", targets: { governance: 90, literacy: 80, data: 72 } }
];

const QUESTIONS = [
  { id: "q01", category: "AI基礎理解", text: "生成AIの得意・不得意、誤回答が起きる理由を説明できる", weights: { literacy: 1, governance: 0.3 } },
  { id: "q02", category: "AI基礎理解", text: "業務や学習の中で、AIに任せる部分と人が確認する部分を切り分けられる", weights: { literacy: 0.8, business: 0.5, governance: 0.4 } },
  { id: "q03", category: "プロンプト活用", text: "目的、条件、出力形式を指定して、文書作成・要約・調査を行える", weights: { prompt: 1, literacy: 0.2 } },
  { id: "q04", category: "プロンプト活用", text: "AIの回答をそのまま使わず、根拠確認・追加質問・修正指示で品質を上げられる", weights: { prompt: 0.8, governance: 0.5 } },
  { id: "q05", category: "業務改善", text: "日常業務の手順を分解し、AIで短縮・自動化できる箇所を見つけられる", weights: { business: 1, prompt: 0.3 } },
  { id: "q06", category: "業務改善", text: "Excel、スプレッドシート、議事録、レポートなどの業務をAIで効率化できる", weights: { business: 0.9, data: 0.3, prompt: 0.3 } },
  { id: "q07", category: "データ活用", text: "データやグラフから示唆を読み取り、意思決定や提案に活かせる", weights: { data: 1, business: 0.4 } },
  { id: "q08", category: "データ活用", text: "AIに分析の観点を出させ、仮説、KPI、検証方法を整理できる", weights: { data: 0.8, business: 0.6, prompt: 0.3 } },
  { id: "q09", category: "開発・自動化", text: "ノーコード/ローコードで、簡単な業務Botやワークフローを設計するイメージがある", weights: { automation: 1, business: 0.4 } },
  { id: "q10", category: "開発・自動化", text: "AIコーディング支援を使って、修正案、テスト、簡単なコード生成を進められる", weights: { automation: 1, prompt: 0.3, governance: 0.2 } },
  { id: "q11", category: "ガバナンス", text: "個人情報、著作権、機密情報、社内データ利用時の注意点を理解している", weights: { governance: 1, literacy: 0.3 } },
  { id: "q12", category: "ガバナンス", text: "AI利用ルール、承認フロー、レビュー観点をチーム内で整える必要性を説明できる", weights: { governance: 1, business: 0.4 } },
  { id: "q13", category: "DX推進", text: "AI導入テーマを、効果・実現性・リスク・優先順位で評価できる", weights: { business: 0.9, data: 0.5, governance: 0.3 } },
  { id: "q14", category: "DX推進", text: "現場ヒアリングから課題を抽出し、AI活用の要件や成果物に落とし込める", weights: { business: 1, prompt: 0.3, data: 0.2 } },
  { id: "q15", category: "データマネジメント", text: "社内データの所在、権限、品質、更新頻度を確認する観点を持っている", weights: { data: 0.9, governance: 0.5 } },
  { id: "q16", category: "データマネジメント", text: "RAGやナレッジ検索など、自社データをAIに参照させる仕組みを大まかに説明できる", weights: { data: 0.8, automation: 0.5, governance: 0.4 } },
  { id: "q17", category: "開発・実装", text: "Dify、Zapier、Make、Power Automateなどの自動化ツールで実装を検討できる", weights: { automation: 1, business: 0.4 } },
  { id: "q18", category: "開発・実装", text: "AIエージェント、API連携、評価ログ、運用改善の基本概念を理解している", weights: { automation: 0.9, governance: 0.5, data: 0.4 } },
  { id: "q19", category: "情報発信", text: "AIを使って企画書、LP、メール、SNS、プレゼンの初稿を作成し、目的に合わせて修正できる", weights: { prompt: 0.9, business: 0.4, literacy: 0.2 } },
  { id: "q20", category: "情報発信", text: "AI生成物のトーン、事実確認、引用、ブランド表現を確認して公開判断できる", weights: { prompt: 0.6, governance: 0.7 } },
  { id: "q21", category: "学習・育成", text: "自分やチームのAIスキル不足を言語化し、学習計画に落とし込める", weights: { literacy: 0.6, business: 0.5, governance: 0.2 } },
  { id: "q22", category: "学習・育成", text: "AI活用を一度で終わらせず、定着・共有・改善まで続ける仕組みを考えられる", weights: { business: 0.8, governance: 0.5 } },
  { id: "q23", category: "価値創出", text: "AI活用をコスト削減だけでなく、売上、顧客体験、新規サービスに結びつけて考えられる", weights: { business: 0.9, data: 0.4, prompt: 0.3 } },
  { id: "q24", category: "価値創出", text: "AI導入後の効果測定、KPI、ROI、改善サイクルを設計するイメージがある", weights: { business: 0.8, data: 0.7, governance: 0.3 } }
];

const ADULT_COURSES = [
  { id: "A01", title: "生成AI活用", tag: "全社員・入門", image: "course-01-genai.jpg", categories: ["literacy", "prompt", "governance"], interests: ["documents", "productivity", "learning", "revenue"], mode: "動画＋オンラインQA", hours: "3h動画＋1.5h", price: "動画8,000円/ID・Live22万円/20名", note: "AI基礎、プロンプト、調査、要約、文書作成、情報漏洩防止の入口に最適。" },
  { id: "A02", title: "Microsoft 365 Copilot / Copilot Studio活用", tag: "M365導入企業", image: "course-02-m365.jpg", categories: ["business", "prompt", "automation"], interests: ["productivity", "documents", "implementation"], mode: "オンラインLive", hours: "6h", price: "Live38万円/20名", note: "Word、Excel、PowerPoint、Outlook、TeamsでのCopilot活用と業務テンプレート化。" },
  { id: "A03", title: "Google Gemini活用", tag: "Google Workspace", image: "course-03-gemini.jpg", categories: ["business", "prompt", "literacy"], interests: ["productivity", "documents", "learning"], mode: "動画＋オンライン", hours: "4h", price: "動画10,000円/ID・Live25万円/20名", note: "Gmail、Docs、Slides、Drive連携を前提に、資料作成と業務効率化を進める。" },
  { id: "A04", title: "Excel業務改善", tag: "管理・営業・バックオフィス", image: "course-04-excel.jpg", categories: ["business", "data", "prompt"], interests: ["productivity", "dataDecision"], mode: "オンラインLive", hours: "5h", price: "Live30万円/20名", note: "関数、集計、可視化、レポート作成をAIで短縮し、日常業務の改善に直結。" },
  { id: "A05", title: "データAIプロジェクトマネジメント", tag: "管理職・PM", image: "course-05-project.jpg", categories: ["business", "data", "governance"], interests: ["implementation", "revenue", "dataDecision", "governance"], mode: "オンラインWS", hours: "1日", price: "Live45万円/15名", note: "PoC設計、KPI、ROI、リスク、要件整理まで扱う推進者向け。" },
  { id: "A06", title: "Dify活用", tag: "業務Bot・RAG", image: "course-06-dify.jpg", categories: ["automation", "data", "governance"], interests: ["implementation", "agent", "productivity"], mode: "Live必須", hours: "1日", price: "Live58万円/15名", note: "FAQ Bot、RAG、チャットボット、ワークフローの実装入口。" },
  { id: "A07", title: "Cursor入門", tag: "開発者・IT部門", image: "course-07-cursor.jpg", categories: ["automation", "prompt"], interests: ["development"], mode: "オンラインLive", hours: "4h", price: "Live28万円/15名", note: "AIコード補完、修正、リファクタリングの基本を短時間で習得。" },
  { id: "A08", title: "GitHub Copilot入門", tag: "開発組織", image: "course-08-github.jpg", categories: ["automation", "governance"], interests: ["development", "implementation"], mode: "オンラインLive", hours: "1日", price: "Live42万円/15名", note: "コード生成、レビュー、テスト生成、組織ポリシーまで扱う。" },
  { id: "A09", title: "Claude Code入門", tag: "高度開発", image: "course-09-claude.jpg", categories: ["automation", "prompt", "governance"], interests: ["development", "agent"], mode: "Live/対面推奨", hours: "1日", price: "Live60万円/10名", note: "プロジェクト読込、タスク分解、修正・テスト・デバッグの実践。" },
  { id: "A10", title: "仕様駆動開発（SDD）", tag: "PM・テックリード", image: "course-10-sdd.jpg", categories: ["automation", "business", "governance"], interests: ["development", "agent", "implementation"], mode: "WS必須", hours: "1日", price: "Live65万円/12名", note: "仕様書、受入条件、Definition of Done、AI開発ワークフローを整える。" },
  { id: "A11", title: "AIエージェント構築", tag: "上級・内製化", image: "course-11-agent.jpg", categories: ["automation", "data", "governance", "business"], interests: ["agent", "implementation", "revenue"], mode: "Live/対面必須", hours: "2日", price: "Live98万円/10名", note: "RAG、API連携、評価、ログ、運用設計まで扱うプレミアム講座。" }
];

const EDUCATION_COURSES = [
  { id: "E01", title: "AI講座 for education 基礎", tag: "全学年・入門", image: "student-learning.jpg", categories: ["literacy", "prompt", "governance"], interests: ["learning", "documents"], mode: "オンデマンド＋オンライン", hours: "2〜4コマ", price: "学校導入プラン", note: "生成AIの基本、安全利用、調べ方、まとめ方を学ぶ入口講座。" },
  { id: "E02", title: "生成AIリテラシー実践", tag: "情報・探究", image: "diagnosis-ui.jpg", categories: ["literacy", "prompt", "business"], interests: ["learning", "documents", "productivity"], mode: "授業・オンライン", hours: "4〜6コマ", price: "学校導入プラン", note: "AIを使った調査、要約、比較、発表資料作成を実践。" },
  { id: "E03", title: "AI×探究・課題解決PBL", tag: "探究学習", image: "business-learning.jpg", categories: ["business", "data", "prompt"], interests: ["learning", "revenue", "dataDecision"], mode: "ワークショップ", hours: "4〜8コマ", price: "学校導入プラン", note: "地域・企業テーマをAIで調査し、課題設定、仮説、発表まで行う。" },
  { id: "E04", title: "AIクリエイティブ表現", tag: "創作・表現", image: "overview-dashboard.jpg", categories: ["prompt", "literacy", "governance"], interests: ["documents", "learning"], mode: "授業・オンデマンド", hours: "2〜4コマ", price: "学校導入プラン", note: "文章、画像、4コマ、絵本、プレゼンなど、表現活動でAIを安全に活用。" },
  { id: "E05", title: "Python・データサイエンス基礎", tag: "発展・STEAM", image: "course-07-cursor.jpg", categories: ["data", "automation", "literacy"], interests: ["dataDecision", "development", "learning"], mode: "オンラインLive", hours: "6〜10コマ", price: "学校導入プラン", note: "データの読み取り、可視化、簡単なコード理解までを学ぶ。" },
  { id: "E06", title: "AI進路・キャリア探究", tag: "キャリア教育", image: "career-up.jpg", categories: ["literacy", "business", "data"], interests: ["learning", "revenue"], mode: "授業・ワークショップ", hours: "2〜4コマ", price: "学校導入プラン", note: "AI時代の職業変化、必要スキル、学習計画を自分ごと化する。" },
  { id: "E07", title: "AI安全利用・情報モラル", tag: "全校導入向け", image: "online-live.jpg", categories: ["governance", "literacy"], interests: ["governance", "learning"], mode: "オンデマンド＋確認テスト", hours: "1〜2コマ", price: "学校導入プラン", note: "著作権、個人情報、ファクトチェック、生成物の扱いを学ぶ。" }
];

const PACKAGES = [
  { id: "P1", title: "Lite：AI業務改善スターター", courses: ["A01", "A04"], price: "49.8万円", hours: "10h", target: "AIを何から始めるか整理したい部門", image: "package-business.jpg" },
  { id: "P2", title: "Office AI：Office/Google横断活用", courses: ["A01", "A02", "A03", "A04"], price: "98万円", hours: "12h", target: "全社展開・アンバサダー育成", image: "online-live.jpg" },
  { id: "P3", title: "Business PM：AI導入推進者育成", courses: ["A01", "A04", "A05", "A06"], price: "160万円", hours: "18h", target: "PoC設計・Dify活用・DX推進", image: "package-business.jpg" },
  { id: "P4", title: "Dev Starter：AIコーディング導入", courses: ["A07", "A08", "A10"], price: "130万円", hours: "16h", target: "開発組織のAI活用・品質担保", image: "course-10-sdd.jpg" },
  { id: "P5", title: "Agent Premium：AIエージェント内製化", courses: ["A06", "A09", "A10", "A11"], price: "260万円〜", hours: "30h", target: "RAG・Agent・SDD・内製化", image: "course-11-agent.jpg" },
  { id: "P6", title: "Enterprise：3か月伴走パック", courses: ["A05", "A06", "A11"], price: "350万円〜", hours: "40h〜", target: "PoC計画・評価設計・社内展開ロードマップ", image: "course-05-project.jpg" }
];

const HOME_PREVIEW_IDS = {
  student: ["E01", "E03", "E05", "E06"],
  adult: ["A01", "A04", "A06", "A11"]
};

const STRENGTH_COPY = {
  literacy: "AIの前提理解と安全な使い分けが安定しています。",
  prompt: "指示設計と改善の往復で成果物の質を高めやすいです。",
  business: "現場課題をAI活用テーマに変換する視点があります。",
  data: "データから示唆を引き出し、判断につなげる素地があります。",
  automation: "ツール連携や実装イメージを描きやすい状態です。",
  governance: "安全利用やルール整備の視点を持って推進できます。"
};

let latestResult = null;
let activeQuestionFilter = "all";
let previewAudience = "student";
let autoSaveTimer = null;
const gatedSectionIds = new Set(["result", "courses", "plan", "career"]);

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function init() {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (window.location.hash) window.scrollTo(0, 0);
  renderInterests();
  renderQuestions();
  renderCategoryFilters();
  renderPreviewCourses(previewAudience);
  restoreDraft();
  bindEvents();
  updateQuestionProgress();
  syncPreviewTabs();
  setupSectionTracking();
  bindHashNavigation();
  maybeRunDemoMode();
}

function renderInterests() {
  const root = $("#interestList");
  root.innerHTML = INTERESTS.map((item, idx) => `
    <label class="interest-chip">
      <input type="checkbox" name="interests" value="${item.key}" ${idx < 2 ? "checked" : ""}>
      <span>${item.icon} ${item.label}</span>
    </label>
  `).join("");
}

function renderQuestions() {
  const root = $("#questionList");
  const template = $("#questionTemplate");
  root.innerHTML = "";
  QUESTIONS.forEach((question, index) => {
    const node = template.content.cloneNode(true);
    const card = $(".question-card", node);
    const primaryKey = getPrimaryCategoryKey(question);
    card.dataset.categoryKey = primaryKey;
    $(".qno", node).textContent = String(index + 1).padStart(2, "0");
    $(".qcategory", node).textContent = question.category;
    $("h4", node).textContent = question.text;
    const rating = $(".rating-row", node);
    rating.setAttribute("aria-label", question.text);
    rating.innerHTML = [1, 2, 3, 4, 5].map(value => `
      <label title="${value}">
        <input type="radio" name="${question.id}" value="${value}">
        <span>${value}</span>
      </label>
    `).join("");
    root.appendChild(node);
  });
  applyQuestionFilter(activeQuestionFilter);
}

function renderCategoryFilters() {
  const root = $("#categoryFilters");
  const allButton = `<button type="button" class="filter-chip ${activeQuestionFilter === "all" ? "active" : ""}" data-filter="all"><b>24</b><span>すべての設問</span></button>`;
  const categoryButtons = CATEGORIES.map(category => {
    const count = QUESTIONS.filter(question => getPrimaryCategoryKey(question) === category.key).length;
    return `<button type="button" class="filter-chip ${activeQuestionFilter === category.key ? "active" : ""}" data-filter="${category.key}"><b>${count}</b><span>${category.label}</span></button>`;
  }).join("");
  root.innerHTML = allButton + categoryButtons;
}

function getVisualTone(item) {
  const categories = item.categories || [];
  if (categories.includes("automation")) return "automation";
  if (categories.includes("data")) return "data";
  if (categories.includes("governance")) return "governance";
  if (categories.includes("business")) return "business";
  return "literacy";
}

function renderVisualCard(item, variant = "course") {
  const tone = getVisualTone(item);
  const title = escapeHtml(item.title);
  const label = escapeHtml(item.tag || item.target || item.mode || "AI Skill");
  const accent = tone === "automation" ? "Agent" :
    tone === "data" ? "Data" :
    tone === "governance" ? "Trust" :
    tone === "business" ? "Growth" :
    "Basics";
  return `
    <div class="card-visual ${variant}-visual tone-${tone}" aria-hidden="true">
      <span class="visual-kicker">${label}</span>
      <strong>${accent}</strong>
      <small>${title}</small>
      <div class="visual-bars">
        <i></i><i></i><i></i>
      </div>
    </div>
  `;
}

function renderPreviewCourses(audience) {
  const root = $("#previewCourses");
  const source = getCatalog(audience);
  const cards = (HOME_PREVIEW_IDS[audience] || []).map(id => source.find(course => course.id === id)).filter(Boolean);
  root.innerHTML = cards.map((course, index) => `
    <article>
      ${renderVisualCard(course, "preview")}
      ${index === 0 ? '<span class="preview-badge">おすすめ</span>' : ""}
      <div class="preview-course-body">
        <span class="tag">${escapeHtml(course.tag)}</span>
        <h3>${escapeHtml(course.title)}</h3>
        <p>${escapeHtml(course.note)}</p>
        <div class="preview-course-meta">
          <span>${escapeHtml(course.mode)}</span>
          <span>${escapeHtml(course.hours)}</span>
        </div>
      </div>
    </article>
  `).join("");
}

function syncPreviewTabs() {
  $$(".preview-tab").forEach(button => {
    const active = button.dataset.audience === previewAudience;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function bindEvents() {
  $("#diagnosisForm").addEventListener("submit", handleDiagnosisSubmit);
  $("#diagnosisForm").addEventListener("change", handleDraftChange);
  $("#diagnosisForm").addEventListener("input", handleDraftChange);
  $("#demoFill").addEventListener("click", fillDemoAnswers);
  $("#saveDraft").addEventListener("click", () => saveDraft(false));
  $("#copyResult").addEventListener("click", copyResult);
  $("#downloadJson").addEventListener("click", downloadJson);
  $("#printReport").addEventListener("click", () => window.print());
  $("#copyPlan").addEventListener("click", copyPlan);
  $("#planForm").addEventListener("submit", handlePlanSubmit);
  $("#categoryFilters").addEventListener("click", handleQuestionFilterClick);
  $$(".preview-tab").forEach(button => {
    button.addEventListener("click", () => {
      previewAudience = button.dataset.audience;
      renderPreviewCourses(previewAudience);
      syncPreviewTabs();
    });
  });
  bindGatedNavLinks();
}

function bindGatedNavLinks() {
  $$(".side-nav a").forEach(link => {
    link.addEventListener("click", event => {
      const target = link.getAttribute("href")?.replace("#", "");
      if (target && gatedSectionIds.has(target) && !latestResult) {
        event.preventDefault();
        navigateToSection("diagnosis");
        toast("診断を実行すると、このエリアが表示されます");
      }
    });
  });
}

function bindHashNavigation() {
  window.addEventListener("hashchange", scheduleHashSync);
  window.addEventListener("load", scheduleHashSync, { once: true });
  if (document.fonts?.ready) {
    document.fonts.ready.then(scheduleHashSync).catch(() => {});
  }
  $$("img").forEach(image => {
    if (!image.complete) image.addEventListener("load", scheduleHashSync, { once: true });
  });
  scheduleHashSync();
}

function handleDraftChange() {
  updateQuestionProgress();
  clearTimeout(autoSaveTimer);
  autoSaveTimer = window.setTimeout(() => saveDraft(true), 250);
}

function handleQuestionFilterClick(event) {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  applyQuestionFilter(button.dataset.filter);
}

function applyQuestionFilter(filterKey) {
  activeQuestionFilter = filterKey;
  $$("#categoryFilters [data-filter]").forEach(button => {
    button.classList.toggle("active", button.dataset.filter === filterKey);
  });
  $$(".question-card").forEach(card => {
    const visible = filterKey === "all" || card.dataset.categoryKey === filterKey;
    card.classList.toggle("is-hidden", !visible);
  });
}

function setupSectionTracking() {
  const sections = $$("main [id]");
  const observer = new IntersectionObserver(entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting && !entry.target.classList.contains("hidden"))
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActiveNav(visible.target.id);
  }, { threshold: [0.25, 0.5, 0.75] });
  sections.forEach(section => observer.observe(section));
}

function setActiveNav(sectionId) {
  $$(".side-nav a").forEach(link => {
    const active = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("active", active);
  });
}

function maybeRunDemoMode() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("demo") !== "1") return;
  applyDemoDefaults();
  fillDemoAnswers(true);
  runDiagnosis({ scroll: false, silent: true });
  scheduleHashSync();
}

function applyDemoDefaults() {
  const adultRadio = $('input[name="userType"][value="adult"]');
  const studentRadio = $('input[name="userType"][value="student"]');
  if (adultRadio) adultRadio.checked = true;
  if (studentRadio) studentRadio.checked = false;
  const defaults = {
    personName: "デモユーザー",
    organization: "営業企画部",
    currentRole: "営業・企画",
    baseIncome: "520"
  };
  Object.entries(defaults).forEach(([name, value]) => {
    const field = $(`[name="${name}"]`);
    if (field) field.value = value;
  });
  const demoInterests = new Set(["productivity", "documents", "dataDecision"]);
  $$('input[name="interests"]').forEach(input => {
    input.checked = demoInterests.has(input.value);
  });
}

function fillDemoAnswers(silent = false) {
  const demoScores = [4, 4, 5, 4, 4, 4, 3, 4, 3, 2, 4, 3, 4, 3, 3, 2, 2, 2, 4, 3, 4, 3, 3, 3];
  QUESTIONS.forEach((question, index) => {
    const input = document.querySelector(`input[name="${question.id}"][value="${demoScores[index] || 3}"]`);
    if (input) input.checked = true;
  });
  updateQuestionProgress();
  saveDraft(true);
  if (!silent) toast("デモ回答を入力しました");
}

function updateQuestionProgress() {
  const answered = QUESTIONS.filter(question => $(`input[name="${question.id}"]:checked`)).length;
  const total = QUESTIONS.length;
  const percent = Math.round((answered / total) * 100);
  $("#answeredCount").textContent = `${answered} / ${total}`;
  $("#progressBar").style.width = `${percent}%`;
  $("#progressNote").textContent = answered === total
    ? "すべての設問に回答済みです。診断結果を見るボタンから分析へ進めます。"
    : `あと${total - answered}問で完了します。近い状態を選びながら進めてください。`;
}

function getFormData() {
  const form = $("#diagnosisForm");
  const data = Object.fromEntries(new FormData(form).entries());
  data.interests = $$('input[name="interests"]:checked').map(input => input.value);
  data.userType = data.userType || "adult";
  data.baseIncome = Number(data.baseIncome || 0);
  data.answers = {};
  QUESTIONS.forEach(question => {
    const checked = $(`input[name="${question.id}"]:checked`);
    data.answers[question.id] = checked ? Number(checked.value) : null;
  });
  return data;
}

function handleDiagnosisSubmit(event) {
  event.preventDefault();
  runDiagnosis();
}

function runDiagnosis({ scroll = true, silent = false } = {}) {
  const data = getFormData();
  if (!data.interests.length) {
    showError("AIを活かしたいことを1つ以上選択してください。");
    return false;
  }
  const missing = QUESTIONS.filter(question => !data.answers[question.id]);
  if (missing.length) {
    showError("未回答の設問があります。すべての設問に回答してください。");
    return false;
  }
  latestResult = calculateResult(data);
  renderResult(latestResult);
  saveDraft(true);
  $("#result").classList.remove("hidden");
  if (scroll) navigateToSection("result");
  if (!silent) toast("診断結果を生成しました");
  return true;
}

function calculateResult(data) {
  const categoryTotals = Object.fromEntries(CATEGORIES.map(category => [category.key, { weighted: 0, max: 0 }]));
  QUESTIONS.forEach(question => {
    const answer = data.answers[question.id];
    Object.entries(question.weights).forEach(([key, weight]) => {
      categoryTotals[key].weighted += answer * 20 * weight;
      categoryTotals[key].max += 100 * weight;
    });
  });

  const categoryScores = Object.fromEntries(CATEGORIES.map(category => {
    const entry = categoryTotals[category.key];
    return [category.key, entry.max ? Math.round((entry.weighted / entry.max) * 100) : 0];
  }));

  const totalScore = Math.round(CATEGORIES.reduce((sum, category) => sum + categoryScores[category.key], 0) / CATEGORIES.length);
  const level = getLevel(totalScore);
  const interestObjects = data.interests.map(key => INTERESTS.find(interest => interest.key === key)).filter(Boolean);
  const targetScores = buildTargets(interestObjects, data.userType);
  const gaps = Object.entries(targetScores).map(([key, target]) => {
    const current = categoryScores[key] || 0;
    return {
      key,
      label: getCategoryLabel(key),
      target,
      current,
      gap: Math.max(0, target - current)
    };
  }).sort((a, b) => b.gap - a.gap);

  const strengths = buildStrengths(categoryScores);
  const courses = recommendCourses(data, categoryScores, gaps);
  const useCases = buildUseCases(categoryScores);
  const learningPath = buildLearningPath(gaps, courses);
  const value = buildValueEstimate(data, totalScore, categoryScores);

  return {
    generatedAt: new Date().toISOString(),
    profile: data,
    categoryScores,
    totalScore,
    level,
    targetScores,
    gaps,
    strengths,
    courses,
    useCases,
    learningPath,
    value
  };
}

function getLevel(score) {
  if (score >= 90) return { name: "AI実装リード", badge: "高度", comment: "AI活用を実装・改善・展開する力が高く、チームや組織をリードできる水準です。" };
  if (score >= 75) return { name: "推進人材候補", badge: "上級手前", comment: "実務でAIを活用し、周囲に展開できる土台があります。実装・ガバナンスを補強すると強いです。" };
  if (score >= 60) return { name: "実務活用準備期", badge: "中級", comment: "日常業務や学習でAIを使う土台があります。関心領域に合わせて実践量を増やす段階です。" };
  if (score >= 40) return { name: "基礎定着期", badge: "初級", comment: "AIの使い方を学び始めています。まずは基礎理解と安全なプロンプト活用を固めると伸びやすいです。" };
  return { name: "AI準備期", badge: "入門", comment: "AIを安全に使うための基本から始めるとよい状態です。短時間の基礎講座で全体像をつかみましょう。" };
}

function buildTargets(interests, userType) {
  const targets = Object.fromEntries(CATEGORIES.map(category => [category.key, userType === "student" ? 68 : 72]));
  interests.forEach(interest => {
    Object.entries(interest.targets).forEach(([key, value]) => {
      targets[key] = Math.max(targets[key] || 0, userType === "student" ? Math.min(value, 84) : value);
    });
  });
  return targets;
}

function recommendCourses(data, categoryScores, gaps) {
  const source = getCatalog(data.userType);
  const interests = new Set(data.interests);
  const lowCats = gaps.filter(gap => gap.gap >= 10).map(gap => gap.key);
  const scored = source.map(course => {
    let score = 0;
    const reasons = [];
    course.categories.forEach(categoryKey => {
      score += (100 - (categoryScores[categoryKey] || 0)) * 0.12;
      if (lowCats.includes(categoryKey)) {
        score += 16;
        reasons.push(`${getCategoryLabel(categoryKey)}の補強`);
      }
    });
    course.interests.forEach(interestKey => {
      if (interests.has(interestKey)) {
        score += 22;
        reasons.push(`${getInterestLabel(interestKey)}に直結`);
      }
    });

    if (data.userType === "adult" && categoryScores.literacy < 58 && course.id === "A01") {
      score += 32;
      reasons.push("基礎固めに最適");
    }
    if (data.userType === "student" && categoryScores.literacy < 58 && course.id === "E01") {
      score += 32;
      reasons.push("安全な入口として学びやすい");
    }
    if (data.userType === "adult" && interests.has("development") && ["A07", "A08", "A10"].includes(course.id)) {
      score += 18;
      reasons.push("開発・内製化に向く");
    }
    if (data.userType === "adult" && interests.has("agent") && ["A06", "A09", "A10", "A11"].includes(course.id)) {
      score += 18;
      reasons.push("エージェント活用に発展");
    }

    return {
      ...course,
      matchScore: Math.round(score),
      reasons: uniqueList(reasons).slice(0, 3)
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  const top = uniqueBy(scored, "id").slice(0, 5);
  top.forEach(course => {
    if (!course.reasons.length) {
      course.reasons = [course.categories.slice(0, 2).map(getCategoryLabel).join("・")];
    }
  });

  return {
    top,
    packageRec: data.userType === "adult" ? recommendPackage(top, data, categoryScores) : null
  };
}

function recommendPackage(topCourses, data, categoryScores) {
  const topIds = new Set(topCourses.map(course => course.id));
  return PACKAGES.map(pkg => {
    let score = pkg.courses.reduce((sum, id) => sum + (topIds.has(id) ? 30 : 0), 0);
    if (data.interests.includes("agent") && pkg.id === "P5") score += 40;
    if (data.interests.includes("development") && pkg.id === "P4") score += 32;
    if (data.interests.includes("implementation") && pkg.id === "P3") score += 34;
    if (data.interests.includes("productivity") && pkg.id === "P1") score += 25;
    if (categoryScores.literacy < 58 && pkg.id === "P2") score += 15;
    return { ...pkg, score };
  }).sort((a, b) => b.score - a.score)[0];
}

function buildStrengths(scores) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key, score]) => ({
      key,
      label: getCategoryLabel(key),
      score,
      description: STRENGTH_COPY[key]
    }));
}

function buildUseCases(scores) {
  const items = [];
  if (scores.prompt >= 65) items.push("調査、要約、資料作成、議事録整理、メール作成の品質と速度を上げられます。");
  if (scores.business >= 65) items.push("業務プロセスを分解し、AIで短縮できる作業を見つけやすい状態です。");
  if (scores.data >= 65) items.push("データやグラフから示唆を読み取り、企画・改善提案に活かせます。");
  if (scores.automation >= 65) items.push("Bot、自動化、AIコーディング支援など、実装寄りのテーマに進めます。");
  if (scores.governance >= 65) items.push("安全利用、情報管理、社内ルール整備の観点を持ってAI活用を進められます。");
  if (items.length < 3) {
    items.push(
      "基礎理解とプロンプト活用を補強すると、日常業務・学習で使える場面が増えます。",
      "関心テーマを1つに絞って実践課題を作ると、短期間で成長を実感できます。"
    );
  }
  return items.slice(0, 5);
}

function buildLearningPath(gaps, courses) {
  const path = [];
  const add = (title, text) => path.push({ title, text });
  if (gaps.find(gap => gap.key === "literacy" && gap.gap > 12)) add("AI基礎理解を整える", "生成AIの仕組み、得意・不得意、リスクを先に押さえると、その後の実践が安定します。");
  if (gaps.find(gap => gap.key === "prompt" && gap.gap > 10)) add("プロンプト活用を型化する", "目的、条件、出力形式、確認観点をテンプレート化して、日常業務・学習で繰り返し使います。");
  if (gaps.find(gap => gap.key === "business" && gap.gap > 10)) add("業務・課題を分解する", "AIを使う前に、対象業務・課題・成果物・KPIを整理すると効果が出やすくなります。");
  if (gaps.find(gap => gap.key === "data" && gap.gap > 10)) add("データ活用を補強する", "データの読み方、可視化、仮説、意思決定へのつなげ方を学びます。");
  if (gaps.find(gap => gap.key === "automation" && gap.gap > 10)) add("実装・自動化に進む", "Dify、AIコーディング、ノーコード、エージェント設計など、実装の選択肢を広げます。");
  if (gaps.find(gap => gap.key === "governance" && gap.gap > 10)) add("安全利用とルールを整える", "個人情報、機密情報、著作権、レビュー、ログ、運用ルールを学びます。");
  if (path.length === 0) add("関心テーマで実践課題を作る", "現在のスキル水準は高めです。推奨講座を使い、社内・学校内で使える成果物を作る段階です。");
  const topCourse = courses.top[0]?.title;
  if (topCourse) add(`推奨講座「${topCourse}」で実践する`, "講座の成果物を自分の業務・学習テーマに置き換え、すぐ使える形にします。");
  return path.slice(0, 6);
}

function buildValueEstimate(data, totalScore, scores) {
  if (data.userType === "student") {
    return {
      kind: "student",
      title: "将来の活用領域",
      text: "AIスキルは、進学、探究学習、情報発信、データ分析、将来の職業選択で横断的に活かせます。",
      items: [
        { label: "探究・レポート", value: scores.prompt >= 60 ? "活用しやすい" : "基礎から補強", meter: scores.prompt },
        { label: "データ・STEAM", value: scores.data >= 60 ? "発展可能" : "読み解きから", meter: scores.data },
        { label: "進路・キャリア", value: totalScore >= 70 ? "強みにできる" : "学習計画で伸ばせる", meter: totalScore }
      ]
    };
  }

  const multiplier = totalScore >= 90 ? 1.3 : totalScore >= 75 ? 1.22 : totalScore >= 60 ? 1.14 : totalScore >= 40 ? 1.07 : 1;
  const base = Number(data.baseIncome || 0);
  const estimate = base ? Math.round(base * multiplier) : 0;
  const maxIncome = Math.max(base, estimate, 800);

  return {
    kind: "adult",
    title: "報酬額見込み（参考）",
    text: "AI関連求人の賃金プレミアム報道等を参考にした相対的な目安です。個別の報酬、昇給、転職成果を保証するものではありません。",
    headline: estimate ? `${estimate.toLocaleString()}万円` : `${multiplier.toFixed(2)}x`,
    items: [
      { label: "現在入力額", value: base ? `${base.toLocaleString()}万円` : "未入力", meter: base ? Math.max(18, Math.round((base / maxIncome) * 100)) : 18 },
      { label: "参考倍率", value: `${multiplier.toFixed(2)}x`, meter: Math.round((multiplier / 1.3) * 100) },
      { label: "スキル反映後の目安", value: estimate ? `${estimate.toLocaleString()}万円` : "+5〜30%の相対目安", meter: estimate ? Math.round((estimate / maxIncome) * 100) : 74 }
    ]
  };
}

function renderResult(result) {
  $("#totalScore").textContent = result.totalScore;
  $("#levelName").textContent = result.level.name;
  $("#levelComment").textContent = result.level.comment;
  $("#resultLead").textContent = `${result.profile.personName || "あなた"}のAIスキル習得度は${result.totalScore}点です。${result.level.name}として、次に強化するとよい領域を整理しました。`;
  drawScore(result.totalScore);
  drawRadar(result.categoryScores, result.targetScores);
  $("#strengthHighlights").innerHTML = result.strengths.map(item => `
    <div class="strength-pill">
      <div><b>${escapeHtml(item.label)}</b><small>${escapeHtml(item.description)}</small></div>
      <span>${item.score}</span>
    </div>
  `).join("");
  $("#useCaseList").innerHTML = result.useCases.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  $("#gapList").innerHTML = result.gaps.slice(0, 6).map(gap => `
    <div class="gap-item">
      <b>${escapeHtml(gap.label)}</b>
      <div class="meter"><span style="width:${Math.min(100, gap.current)}%"></span></div>
      <em>${gap.current}/${gap.target}</em>
    </div>
  `).join("");
  renderValue(result.value);
  $("#learningPath").innerHTML = result.learningPath.map(item => `<li><div><b>${escapeHtml(item.title)}</b><p>${escapeHtml(item.text)}</p></div></li>`).join("");
  renderCourses(result);
  syncPlanForm(result);
}

function drawScore(score) {
  const canvas = $("#scoreCanvas");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 94;
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 18;
  ctx.strokeStyle = "#e8f2fc";
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#0b78eb");
  gradient.addColorStop(1, "#14c4d8");
  ctx.strokeStyle = gradient;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * score / 100));
  ctx.stroke();
  ctx.fillStyle = "#07192f";
  ctx.font = "700 60px 'Hiragino Sans', system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(score, centerX, centerY - 6);
  ctx.fillStyle = "#6a7c8f";
  ctx.font = "700 18px 'Hiragino Sans', system-ui, sans-serif";
  ctx.fillText("/100", centerX, centerY + 42);
}

function drawRadar(scores, targets) {
  const canvas = $("#radarCanvas");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2 + 8;
  const radius = Math.min(width, height) * 0.33;
  const point = (index, value) => {
    const angle = -Math.PI / 2 + index * Math.PI * 2 / CATEGORIES.length;
    const ring = radius * value / 100;
    return [centerX + Math.cos(angle) * ring, centerY + Math.sin(angle) * ring];
  };

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "#dbe8f6";
  ctx.lineWidth = 1;

  for (let ring = 1; ring <= 4; ring += 1) {
    ctx.beginPath();
    CATEGORIES.forEach((_, index) => {
      const [x, y] = point(index, ring * 25);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.stroke();
  }

  CATEGORIES.forEach((category, index) => {
    const [x, y] = point(index, 100);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fillStyle = "#203654";
    ctx.font = "700 12px 'Hiragino Sans', system-ui, sans-serif";
    ctx.textAlign = x < centerX - 5 ? "right" : x > centerX + 5 ? "left" : "center";
    ctx.fillText(category.label, x + (x < centerX ? -8 : x > centerX ? 8 : 0), y + (y < centerY ? -8 : 18));
  });

  const polygon = (values, stroke, fill, dashed = false) => {
    ctx.beginPath();
    CATEGORIES.forEach((category, index) => {
      const [x, y] = point(index, values[category.key] || 0);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 3;
    ctx.setLineDash(dashed ? [5, 5] : []);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  polygon(targets, "#9ab3cc", "rgba(154,179,204,.10)", true);
  polygon(scores, "#0978ee", "rgba(9,120,238,.18)");
  CATEGORIES.forEach((category, index) => {
    const [x, y] = point(index, scores[category.key] || 0);
    ctx.fillStyle = "#0978ee";
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function renderValue(value) {
  const headline = value.headline || value.title;
  $("#valueEstimate").innerHTML = `
    <div class="value-box">
      <strong>${escapeHtml(headline)}</strong>
      <small>${escapeHtml(value.text)}</small>
    </div>
    ${value.items.map(item => `
      <div class="gap-item">
        <b>${escapeHtml(item.label)}</b>
        <div class="meter"><span style="width:${Math.max(12, Math.min(100, item.meter || 0))}%"></span></div>
        <em>${escapeHtml(item.value)}</em>
      </div>
    `).join("")}
  `;
}

function renderCourses(result) {
  const isStudent = result.profile.userType === "student";
  $("#courseAudienceLabel").textContent = isStudent ? "AI講座 for educationから提案" : "企業向け実践AI講座から提案";
  $("#courseRecommendations").innerHTML = result.courses.top.map(course => `
    <article class="course-card">
      ${renderVisualCard(course)}
      <div class="course-body">
        <span class="tag">${escapeHtml(course.tag)}</span>
        <h4>${escapeHtml(course.title)}</h4>
        <p>${escapeHtml(course.note)}</p>
        <div class="course-reasons">${course.reasons.map(reason => `<span>${escapeHtml(reason)}</span>`).join("")}</div>
        <div class="course-meta"><span>${escapeHtml(course.mode)}</span><span>${escapeHtml(course.hours)}</span><span>${escapeHtml(course.price)}</span></div>
      </div>
    </article>
  `).join("");

  const pkg = result.courses.packageRec;
  const pkgRoot = $("#packageRecommendation");
  if (!isStudent && pkg) {
    pkgRoot.classList.add("active");
    pkgRoot.innerHTML = `
      ${renderVisualCard(pkg, "package")}
      <div>
        <b>組み合わせプラン例</b>
        <h4>${escapeHtml(pkg.title)}</h4>
        <p>${escapeHtml(pkg.target)}</p>
        <div class="course-meta"><span>${escapeHtml(pkg.hours)}</span><span>${escapeHtml(pkg.price)}</span><span>${pkg.courses.length}講座を束ねた提案</span></div>
      </div>
    `;
  } else {
    pkgRoot.classList.remove("active");
    pkgRoot.innerHTML = "";
  }
}

function syncPlanForm(result) {
  const form = $("#planForm");
  const interests = result.profile.interests.map(getInterestLabel).join("、");
  form.contactName.value = result.profile.personName || "";
  form.contactOrg.value = result.profile.organization || "";
  form.notes.value = `診断スコア：${result.totalScore}/100\nレベル：${result.level.name}\n関心テーマ：${interests}\n推奨講座：${result.courses.top.slice(0, 3).map(course => course.title).join("、")}`;
  form.diagnosisJson.value = JSON.stringify(result, null, 2);
}

function saveDraft(silent = false) {
  localStorage.setItem("aiSkillDiagnosisDraft", JSON.stringify(getFormData()));
  updateDraftStatus(`保存済み ${new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}`);
  if (!silent) toast("一時保存しました");
}

function restoreDraft() {
  try {
    const raw = localStorage.getItem("aiSkillDiagnosisDraft");
    if (!raw) return;
    const data = JSON.parse(raw);
    Object.entries(data).forEach(([key, value]) => {
      if (["answers", "interests"].includes(key)) return;
      const element = $(`[name="${key}"]`);
      if (!element) return;
      if (element.type === "radio") {
        const radio = $(`[name="${key}"][value="${value}"]`);
        if (radio) radio.checked = true;
      } else {
        element.value = value;
      }
    });
    if (Array.isArray(data.interests)) {
      $$('input[name="interests"]').forEach(input => {
        input.checked = data.interests.includes(input.value);
      });
    }
    if (data.answers) {
      Object.entries(data.answers).forEach(([questionId, value]) => {
        const input = $(`input[name="${questionId}"][value="${value}"]`);
        if (input) input.checked = true;
      });
    }
    updateDraftStatus("前回の入力を復元しました");
  } catch (error) {
    console.warn("draft restore failed", error);
  }
}

function copyResult() {
  if (!latestResult) return showError("先に診断を実行してください。");
  navigator.clipboard.writeText(buildPlainText(latestResult))
    .then(() => toast("診断結果をコピーしました"))
    .catch(() => showError("クリップボードへコピーできませんでした。"));
}

function copyPlan() {
  if (!latestResult) return showError("先に診断を実行してください。");
  navigator.clipboard.writeText($("#planForm").notes.value)
    .then(() => toast("学習プランをコピーしました"))
    .catch(() => showError("クリップボードへコピーできませんでした。"));
}

function downloadJson() {
  if (!latestResult) return showError("先に診断を実行してください。");
  const blob = new Blob([JSON.stringify(latestResult, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `ai-skill-diagnosis-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function handlePlanSubmit(event) {
  event.preventDefault();
  if (!latestResult) return showError("先に診断を実行してください。");
  const form = event.currentTarget;
  const data = new FormData(form);
  if (!GOOGLE_FORMS_CONFIG.enabled || !GOOGLE_FORMS_CONFIG.formActionUrl) {
    localStorage.setItem("aiSkillDiagnosisPlan", JSON.stringify(Object.fromEntries(data.entries())));
    toast("送信デモとして保存しました。Googleフォーム設定後に実送信できます。");
    return;
  }

  const payload = new FormData();
  const entries = GOOGLE_FORMS_CONFIG.entries;
  const recommendedCourses = latestResult.courses.top.slice(0, 3).map(course => course.title).join("、");
  const interests = latestResult.profile.interests.map(getInterestLabel).join("、");
  const mapping = {
    [entries.name]: data.get("contactName"),
    [entries.email]: data.get("email"),
    [entries.organization]: data.get("contactOrg"),
    [entries.userType]: latestResult.profile.userType === "student" ? "生徒・学生" : "社会人",
    [entries.totalScore]: latestResult.totalScore,
    [entries.level]: latestResult.level.name,
    [entries.interests]: interests,
    [entries.recommendedCourses]: recommendedCourses,
    [entries.learningMode]: data.get("learningMode"),
    [entries.notes]: data.get("notes"),
    [entries.diagnosisJson]: JSON.stringify(latestResult)
  };

  Object.entries(mapping).forEach(([key, value]) => {
    if (key) payload.append(key, value ?? "");
  });

  fetch(GOOGLE_FORMS_CONFIG.formActionUrl, { method: "POST", mode: "no-cors", body: payload })
    .then(() => toast("学習プランを送信しました"))
    .catch(() => showError("Googleフォームへの送信に失敗しました。設定をご確認ください。"));
}

function buildPlainText(result) {
  return [
    "AIスキル診断結果",
    `スコア：${result.totalScore}/100`,
    `レベル：${result.level.name}`,
    `コメント：${result.level.comment}`,
    "",
    "領域別スコア：",
    ...CATEGORIES.map(category => `・${category.label}: ${result.categoryScores[category.key]}`),
    "",
    "強み：",
    ...result.strengths.map((item, index) => `${index + 1}. ${item.label} (${item.score})`),
    "",
    "推奨講座：",
    ...result.courses.top.slice(0, 3).map((course, index) => `${index + 1}. ${course.title}（${course.mode} / ${course.price}）`),
    "",
    "先に学ぶ順番：",
    ...result.learningPath.map((item, index) => `${index + 1}. ${item.title} - ${item.text}`)
  ].join("\n");
}

function getCatalog(userType) {
  return userType === "student" ? EDUCATION_COURSES : ADULT_COURSES;
}

function getCategoryLabel(key) {
  return CATEGORIES.find(category => category.key === key)?.label || key;
}

function getInterestLabel(key) {
  return INTERESTS.find(interest => interest.key === key)?.label || key;
}

function getPrimaryCategoryKey(question) {
  return Object.entries(question.weights).sort((a, b) => b[1] - a[1])[0][0];
}

function uniqueBy(items, key) {
  const seen = new Set();
  return items.filter(item => {
    if (seen.has(item[key])) return false;
    seen.add(item[key]);
    return true;
  });
}

function uniqueList(items) {
  return Array.from(new Set(items));
}

function updateDraftStatus(text) {
  const target = $("#draftStatus");
  if (target) target.textContent = text;
}

function navigateToSection(sectionId, behavior = "smooth") {
  const target = document.getElementById(sectionId);
  if (!target || target.classList.contains("hidden")) return;
  window.requestAnimationFrame(() => {
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 24);
    window.scrollTo({ top, behavior });
  });
}

function scheduleHashSync() {
  [0, 220, 700, 1400].forEach(delay => {
    window.setTimeout(syncHashNavigation, delay);
  });
}

function syncHashNavigation() {
  const sectionId = window.location.hash.replace("#", "");
  if (!sectionId) return;
  if (gatedSectionIds.has(sectionId) && !latestResult) {
    navigateToSection("diagnosis", "auto");
    setActiveNav("diagnosis");
    return;
  }
  navigateToSection(sectionId, "auto");
  setActiveNav(sectionId);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    "\"": "&quot;"
  }[char]));
}

function toast(message) {
  const current = $(".toast");
  if (current) current.remove();
  const element = document.createElement("div");
  element.className = "toast";
  element.textContent = message;
  document.body.appendChild(element);
  setTimeout(() => element.remove(), 2600);
}

function showError(message) {
  const current = $(".error-banner");
  if (current) current.remove();
  const element = document.createElement("div");
  element.className = "error-banner";
  element.innerHTML = `<b>確認してください</b><span>${escapeHtml(message)}</span>`;
  document.body.appendChild(element);
  setTimeout(() => element.remove(), 5200);
}

document.addEventListener("DOMContentLoaded", init);

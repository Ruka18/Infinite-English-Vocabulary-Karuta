import { useState, useEffect, useCallback, useRef } from "react";

// ══════════════════════════════════════════════════════════════════
// ターゲット1900 単語データ
// ══════════════════════════════════════════════════════════════════
const WORD_SETS = {
  "Section 1|1〜100": [
    { id: 1,   en: "create",      ja: "創り出す" },
    { id: 2,   en: "increase",    ja: "増加する" },
    { id: 3,   en: "improve",     ja: "向上させる" },
    { id: 4,   en: "mean",        ja: "意味する" },
    { id: 5,   en: "own",         ja: "所有している" },
    { id: 6,   en: "include",     ja: "含む" },
    { id: 7,   en: "consider",    ja: "考慮する" },
    { id: 8,   en: "allow",       ja: "許す" },
    { id: 9,   en: "suggest",     ja: "提案する" },
    { id: 10,  en: "produce",     ja: "生産する" },
    { id: 11,  en: "decide",      ja: "決める" },
    { id: 12,  en: "offer",       ja: "提供する" },
    { id: 13,  en: "require",     ja: "必要とする" },
    { id: 14,  en: "share",       ja: "共有する" },
    { id: 15,  en: "store",       ja: "保存する" },
    { id: 16,  en: "tend",        ja: "傾向がある" },
    { id: 17,  en: "concern",     ja: "心配させる" },
    { id: 18,  en: "describe",    ja: "述べる" },
    { id: 19,  en: "involve",     ja: "伴う" },
    { id: 20,  en: "reduce",      ja: "減らす" },
    { id: 21,  en: "design",      ja: "設計する" },
    { id: 22,  en: "force",       ja: "強いる" },
    { id: 23,  en: "limit",       ja: "制限する" },
    { id: 24,  en: "bear",        ja: "耐える" },
    { id: 25,  en: "affect",      ja: "影響する" },
    { id: 26,  en: "deal",        ja: "処理する" },
    { id: 27,  en: "avoid",       ja: "避ける" },
    { id: 28,  en: "relate",      ja: "関連する" },
    { id: 29,  en: "realize",     ja: "気づく" },
    { id: 30,  en: "encourage",   ja: "奨励する" },
    { id: 31,  en: "compare",     ja: "比較する" },
    { id: 32,  en: "measure",     ja: "測る" },
    { id: 33,  en: "exist",       ja: "存在する" },
    { id: 34,  en: "mark",        ja: "印をつける" },
    { id: 35,  en: "challenge",   ja: "挑む" },
    { id: 36,  en: "depend",      ja: "依存する" },
    { id: 37,  en: "object",      ja: "反対する" },
    { id: 38,  en: "demand",      ja: "強く求める" },
    { id: 39,  en: "found",       ja: "設立する" },
    { id: 40,  en: "complete",    ja: "完成させる" },
    { id: 41,  en: "idea",        ja: "考え" },
    { id: 42,  en: "accord",      ja: "合意" },
    { id: 43,  en: "company",     ja: "会社" },
    { id: 44,  en: "interest",    ja: "興味" },
    { id: 45,  en: "research",    ja: "研究" },
    { id: 46,  en: "cause",       ja: "原因" },
    { id: 47,  en: "reason",      ja: "理由" },
    { id: 48,  en: "effect",      ja: "効果・結果" },
    { id: 49,  en: "influence",   ja: "影響力" },
    { id: 50,  en: "situation",   ja: "状況" },
    { id: 51,  en: "environment", ja: "環境" },
    { id: 52,  en: "skill",       ja: "技能" },
    { id: 53,  en: "matter",      ja: "問題・事柄" },
    { id: 54,  en: "view",        ja: "見解" },
    { id: 55,  en: "value",       ja: "価値" },
    { id: 56,  en: "species",     ja: "生物の種" },
    { id: 57,  en: "thought",     ja: "思考" },
    { id: 58,  en: "knowledge",   ja: "知識" },
    { id: 59,  en: "memory",      ja: "記憶" },
    { id: 60,  en: "practice",    ja: "実践" },
    { id: 61,  en: "benefit",     ja: "利益・恩恵" },
    { id: 62,  en: "theory",      ja: "理論・学説" },
    { id: 63,  en: "issue",       ja: "問題点" },
    { id: 64,  en: "experiment",  ja: "実験" },
    { id: 65,  en: "article",     ja: "記事" },
    { id: 66,  en: "focus",       ja: "焦点" },
    { id: 67,  en: "subject",     ja: "話題・科目" },
    { id: 68,  en: "project",     ja: "計画" },
    { id: 69,  en: "quality",     ja: "質" },
    { id: 70,  en: "role",        ja: "役割" },
    { id: 71,  en: "term",        ja: "用語" },
    { id: 72,  en: "statement",   ja: "声明" },
    { id: 73,  en: "material",    ja: "材料" },
    { id: 74,  en: "evidence",    ja: "証拠" },
    { id: 75,  en: "source",      ja: "情報源" },
    { id: 76,  en: "community",   ja: "地域社会" },
    { id: 77,  en: "technology",  ja: "科学技術" },
    { id: 78,  en: "culture",     ja: "文化" },
    { id: 79,  en: "appropriate", ja: "適切な" },
    { id: 80,  en: "likely",      ja: "ありそうな" },
    { id: 81,  en: "possible",    ja: "可能な" },
    { id: 82,  en: "individual",  ja: "個々の" },
    { id: 83,  en: "public",      ja: "公の" },
    { id: 84,  en: "common",      ja: "共通の" },
    { id: 85,  en: "certain",     ja: "確かな" },
    { id: 86,  en: "similar",     ja: "似ている" },
    { id: 87,  en: "recent",      ja: "最近の" },
    { id: 88,  en: "major",       ja: "主要な" },
    { id: 89,  en: "patient",     ja: "忍耐強い" },
    { id: 90,  en: "particular",  ja: "特定の" },
    { id: 91,  en: "physical",    ja: "身体の" },
    { id: 92,  en: "various",     ja: "さまざまな" },
    { id: 93,  en: "available",   ja: "利用できる" },
    { id: 94,  en: "native",      ja: "出生地の" },
    { id: 95,  en: "political",   ja: "政治の" },
    { id: 96,  en: "due",         ja: "予定された" },
    { id: 97,  en: "blank",       ja: "空白の" },
    { id: 98,  en: "ancient",     ja: "古代の" },
    { id: 99,  en: "correct",     ja: "正しい" },
    { id: 100, en: "despite",     ja: "〜にもかかわらず" },
  ],
  "Section 2|101〜200": [],
  "Section 3|201〜300": [],
  "Section 4|301〜400": [],
  "Section 5|401〜500": [],
  "Section 6|501〜600": [],
  "Section 7|601〜700": [],
  "Section 8|701〜800": [],
  "Section 9|801〜900": [],
  "Section 10|901〜1000": [],
  "Section 11|1001〜1100": [],
  "Section 12|1101〜1200": [],
  "Section 13|1201〜1300": [],
  "Section 14|1301〜1400": [],
  "Section 15|1401〜1500": [],
  "Section 16|1501〜1600": [],
  "Section 17|1601〜1700": [],
  "Section 18|1701〜1800": [],
  "Section 19|1801〜1900": [],
};

const GAME_TIME = 60;

// ── LocalStorage ─────────────────────────────────────────────────
const loadDarkMode = () => {
  try { return localStorage.getItem("darkMode") === "true"; } catch { return false; }
};
const saveDarkMode = (v) => {
  try { localStorage.setItem("darkMode", v); } catch {}
};
const loadReviewWords = () => {
  try {
    const s = localStorage.getItem("reviewWords");
    return s ? JSON.parse(s) : [];
  } catch { return []; }
};
const saveReviewWords = (arr) => {
  try { localStorage.setItem("reviewWords", JSON.stringify(arr)); } catch {}
};

// ── Utils ────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=swap');
  * { box-sizing:border-box; -webkit-tap-highlight-color:transparent; user-select:none; }
  body { margin:0; min-height:100vh; background:linear-gradient(145deg,#1e3a8a 0%,#312e81 55%,#4c1d95 100%); }
  @keyframes shake    { 0%,100%{transform:translateX(0);} 20%{transform:translateX(-7px);} 40%{transform:translateX(7px);} 60%{transform:translateX(-5px);} 80%{transform:translateX(5px);} }
  @keyframes matchOut { 0%{transform:scale(1); opacity:1;} 100%{transform:scale(0.9); opacity:0;} }
  @keyframes slideIn  { from{opacity:0; transform:translateY(16px) scale(0.92);} to{opacity:1; transform:translateY(0) scale(1);} }
  @keyframes fadeUp   { from{opacity:0; transform:translateY(20px);} to{opacity:1; transform:translateY(0);} }
  @keyframes blink    { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
  .shake    { animation:shake 0.45s ease; }
  .matchout { animation:matchOut 0.4s ease forwards; pointer-events:none!important; }
  .slidein  { animation:slideIn 0.3s ease backwards; }
  .fadeup   { animation:fadeUp 0.35s ease; }
  .blink    { animation:blink 0.7s infinite; }
`;

const F = "'Nunito',-apple-system,'Hiragino Sans',sans-serif";

// ══════════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("menu");
  const [darkMode, setDarkMode] = useState(loadDarkMode);
  const [isMuted, setIsMuted] = useState(false);

  // ── Menu ──
  const toggleDark = () => {
    const v = !darkMode;
    setDarkMode(v);
    saveDarkMode(v);
  };

  const gotoReview = () => {
    setScreen("review");
    setRevealed(new Set());
  };

  const colors = darkMode
    ? { bg: "linear-gradient(145deg,#0f172a 0%,#1e1b4b 50%,#312e81 100%)", cardBg: "#1e293b", cardBorder: "#334155", text: "#e2e8f0", mutedText: "#94a3b8", accent1: "#3b82f6", accent2: "#a855f7" }
    : { bg: "linear-gradient(145deg,#1e3a8a 0%,#312e81 55%,#4c1d95 100%)", cardBg: "#fff", cardBorder: "#e2e8f0", text: "#1e293b", mutedText: "#94a3b8", accent1: "#3b82f6", accent2: "#a855f7" };

  // ═══════════════════════════════════════════════════════════════
  // MENU SCREEN
  // ═══════════════════════════════════════════════════════════════
  if (screen === "menu") {
    return (
      <>
        <style>{CSS}</style>
        <div className="fadeup" style={{ minHeight: "100dvh", background: colors.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, fontFamily: F }}>
          <div style={{ background: colors.cardBg, borderRadius: 28, padding: "28px 20px", width: "100%", maxWidth: 420, boxShadow: "0 24px 64px rgba(0,0,0,0.25)" }}>
            <div style={{ textAlign: "center", marginBottom: 22, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
              {/* スピーカーアイコン（無限かるたアイコンの左側） */}
              <button onClick={() => setIsMuted(!isMuted)} style={{ background: "transparent", border: "none", borderRadius: 50, width: 36, height: 36, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                {isMuted ? "🔇" : "🔊"}
                {isMuted && (
                  <div style={{ position: "absolute", top: "50%", left: "50%", width: 24, height: 2, background: "#ef4444", transform: "translate(-50%, -50%) rotate(-45deg)" }} />
                )}
              </button>
              <div style={{ fontSize: 52 }}>🎴</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: colors.text, letterSpacing: -0.5 }}>無限かるた</div>
            </div>

            {/* ダークモード */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: darkMode ? "#0f172a" : "#f8fafc", border: `2px solid ${darkMode ? "#1e293b" : "#e2e8f0"}`, borderRadius: 14, marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: colors.text }}>🌙 ダークモード</span>
              <button onClick={toggleDark} style={{ background: darkMode ? colors.accent2 : "#cbd5e1", border: "none", borderRadius: 99, width: 50, height: 26, position: "relative", cursor: "pointer", transition: "background 0.3s" }}>
                <div style={{ position: "absolute", top: 3, left: darkMode ? 26 : 3, width: 20, height: 20, background: "#fff", borderRadius: "50%", transition: "left 0.3s", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }} />
              </button>
            </div>

            
            <div style={{ fontSize: 12, fontWeight: 800, color: colors.mutedText, marginBottom: 8, letterSpacing: 0.4 }}>セクションを選択</div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 7, marginBottom: 20, maxHeight: 300, overflowY: "auto" }}>
              {Object.entries(WORD_SETS).map(([key, words]) => {
                const [sec, range] = key.split("|");
                const ok = words.length > 0;
                return (
                  <button key={key} disabled={!ok} onClick={() => ok && setScreen({ type: "game", key })}
                    style={{
                      borderRadius: 13, padding: "10px 5px", border: `2px solid ${ok ? (darkMode ? "#475569" : "#c7d2fe") : (darkMode ? "#334155" : "#e2e8f0")}`,
                      background: ok ? (darkMode ? "#1e293b" : "#fff") : (darkMode ? "#0f172a" : "#f8fafc"), opacity: ok ? 1 : 0.45,
                      cursor: ok ? "pointer" : "not-allowed", boxShadow: ok ? `0 2px 0 ${darkMode ? "#334155" : "#c7d2fe"}` : "none",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 2, fontFamily: F,
                    }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: colors.mutedText }}>{sec}</span>
                    <span style={{ fontSize: 12, fontWeight: 900, color: ok ? colors.text : colors.mutedText }}>{range}</span>
                    {ok
                      ? <span style={{ fontSize: 10, color: colors.accent1, fontWeight: 800 }}>▶ {words.length}語</span>
                      : <span style={{ fontSize: 9, color: colors.mutedText, fontWeight: 700 }}>準備中</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // GAME or RESULT
  // ═══════════════════════════════════════════════════════════════
  return <GameScreen screenData={screen} colors={colors} darkMode={darkMode} setScreen={setScreen} isMuted={isMuted} setIsMuted={setIsMuted} />;
}

// ══════════════════════════════════════════════════════════════════
// GAME SCREEN COMPONENT
// ══════════════════════════════════════════════════════════════════
function GameScreen({ screenData, colors, darkMode, setScreen, isMuted, setIsMuted }) {
  const key = screenData.type === "game" ? screenData.key : screenData.activeKey;
  const pool = WORD_SETS[key];

  const [phase, setPhase] = useState("game"); // "game" | "result"
  const [jaCards, setJaCards] = useState([]);
  const [enCards, setEnCards] = useState([]);
  const [activePairs, setActivePairs] = useState(new Set());
  const [reservePairs, setReservePairs] = useState([]);
  const [usedIds, setUsedIds] = useState(new Set());
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [totalPairs, setTotalPairs] = useState(0);
  const [cardKey, setCardKey] = useState(0);
  const [tempChecked, setTempChecked] = useState(new Set());
  const [fadingCards, setFadingCards] = useState(new Set()); // フェードアウト中のカード
  const [streakCount, setStreakCount] = useState(0); // 連続正解カウンター
  const [maxStreakCount, setMaxStreakCount] = useState(0); // 最大コンボ数
  const [hasMistakedInBoard, setHasMistakedInBoard] = useState(false); // 盤面内でミスしたかどうか

  const busy = useRef(false);
  const timerRef = useRef(null);

  // ── 効果音生成関数 ──
  const playSuccessSound = useCallback(() => {
    if (isMuted) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // ドレミファソラシドの8音階（C4から始まる）
    const scale = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // C4, D4, E4, F4, G4, A4, B4, C5
    
    // 8連続以降はC5を使い続ける
    const noteIndex = Math.min(streakCount, 7); // 0-7で、7以降は7（C5）を維持
    
    const frequency = scale[noteIndex];
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.08);
  }, [isMuted, streakCount, hasMistakedInBoard]);

  // ── 盤面リセット関数 ──
  const resetBoard = useCallback(() => {
    // すべての状態をクリア
    setSelected(null);
    setWrongIds(null);
    setFadingCards(new Set());
    busy.current = false;
    
    // 新しいカードセットを準備
    const shuffled = shuffle(pool);
    const initial = shuffled.slice(0, 5);
    const reserve = shuffled.slice(5, 12);
    const newUsed = new Set(initial.map(p => p.id));
    reserve.forEach(p => newUsed.add(p.id));

    setActivePairs(new Set(initial.map(p => p.id)));
    setReservePairs(reserve);
    setUsedIds(newUsed);

    const ja = shuffle(initial.map(p => ({ uid: `${p.id}-ja`, pairId: p.id, text: p.ja })));
    const en = shuffle(initial.map(p => ({ uid: `${p.id}-en`, pairId: p.id, text: p.en })));
    
    // カードキーを更新して強制再レンダリング
    setCardKey(prev => prev + 1);
    setJaCards(ja);
    setEnCards(en);
  }, [pool]);

  // ── 初期化 ──
  useEffect(() => {
    const shuffled = shuffle(pool);
    const initial = shuffled.slice(0, 5);
    const reserve = shuffled.slice(5, 12);
    const newUsed = new Set(initial.map(p => p.id));
    reserve.forEach(p => newUsed.add(p.id));

    setActivePairs(new Set(initial.map(p => p.id)));
    setReservePairs(reserve);
    setUsedIds(newUsed);

    const ja = shuffle(initial.map(p => ({ uid: `${p.id}-ja`, pairId: p.id, text: p.ja })));
    const en = shuffle(initial.map(p => ({ uid: `${p.id}-en`, pairId: p.id, text: p.en })));
    setJaCards(ja);
    setEnCards(en);
  }, []);

  // ── タイマー ──
  useEffect(() => {
    if (phase !== "game") return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); setPhase("result"); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  // ── タップ処理 ──
  const handleTap = useCallback((card) => {
    if (busy.current || wrongIds) return;

    if (!selected) { setSelected(card); return; }
    if (selected.uid === card.uid) { setSelected(null); return; }

    const selJa = selected.uid.endsWith("-ja");
    const cardJa = card.uid.endsWith("-ja");
    if (selJa === cardJa) { setSelected(card); return; }

    if (selected.pairId === card.pairId) {
      // ✅ 正解
      busy.current = true;
      const matchedIds = [selected.uid, card.uid];
      setSelected(null);
      setTotalPairs(p => p + 1);
      setStreakCount(prev => {
        const newStreak = prev + 1;
        // 最大コンボ数を更新
        if (newStreak > maxStreakCount) {
          setMaxStreakCount(newStreak);
        }
        return newStreak;
      }); // 連続正解カウンターを増やす

      // 効果音を再生
      playSuccessSound();

      // 正解済みカードとしてマーク
      setFadingCards(prev => {
        const newSet = new Set(prev);
        matchedIds.forEach(id => newSet.add(id));
        return newSet;
      });

      // アクティブペアから削除
      setActivePairs(prev => {
        const np = new Set(prev);
        np.delete(selected.pairId);
        return np;
      });

      // すべてのペアが揃ったかチェック
      const currentActivePairs = activePairs.size - 1; // このペアが削除された後
      if (currentActivePairs === 0) {
        // すべてのペアが揃ったので盤面をリセット
        setTimeout(() => {
          resetBoard();
        }, 100);
      } else {
        busy.current = false;
      }

    } else {
      // ❌ 不正解
      busy.current = true;
      setWrongIds([selected.uid, card.uid]);
      setSelected(null);
      setStreakCount(0); // 連続正解カウンターをリセット

      setTimeout(() => {
        setWrongIds(null);
        busy.current = false;
      }, 550);
    }
  }, [selected, wrongIds, pool, usedIds]);

  // ═══════════════════════════════════════════════════════════════
  // RESULT SCREEN
  // ═══════════════════════════════════════════════════════════════
  if (phase === "result") {
    setScreen("menu");

    return (
      <>
        <style>{CSS}</style>
        <div className="fadeup" style={{ minHeight: "100dvh", background: colors.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, fontFamily: F }}>
          <div style={{ background: colors.cardBg, borderRadius: 28, padding: "28px 22px", width: "100%", maxWidth: 420, boxShadow: "0 24px 64px rgba(0,0,0,0.25)" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 60 }}>⏱</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: colors.text }}>終了</div>
              <div style={{ fontSize: 12, color: colors.mutedText, fontWeight: 700, marginBottom: 22 }}>{totalPairs}ペア正解</div>
            </div>

            
            <button onClick={() => setScreen({ type: "game", key })}
              style={{ display: "block", width: "100%", border: "none", borderRadius: 16, padding: 14, fontSize: 15, fontWeight: 900, cursor: "pointer", fontFamily: F, color: "#fff", background: colors.accent2, boxShadow: `0 4px 0 ${darkMode ? "#7c3aed" : "#9333ea"}`, marginBottom: 10 }}>
              🔁 もう一回
            </button>
            <button onClick={() => setScreen("menu")}
              style={{ display: "block", width: "100%", border: `2px solid ${darkMode ? "#334155" : "#e2e8f0"}`, borderRadius: 16, padding: 13, fontSize: 14, fontWeight: 900, cursor: "pointer", fontFamily: F, color: colors.text, background: colors.cardBg, boxShadow: `0 3px 0 ${darkMode ? "#1e293b" : "#e2e8f0"}` }}>
              🏠 メニューへ
            </button>
          </div>
        </div>
      </>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // GAME SCREEN
  // ═══════════════════════════════════════════════════════════════
  const pct = timeLeft / GAME_TIME;
  const barColor = pct > 0.5 ? "#58CC02" : pct > 0.25 ? "#facc15" : "#ef4444";
  const [sec, range] = key.split("|");

  const renderCard = (card, delay) => {
    const isSel = selected?.uid === card.uid;
    const isWrong = wrongIds?.includes(card.uid);
    const isJa = card.uid.endsWith("-ja");
    const isFading = fadingCards.has(card.uid);

    let cls = "slidein";
    if (isWrong) cls = "shake";

    const accentSel = isJa ? colors.accent1 : colors.accent2;
    const shadowSel = isJa ? (darkMode ? "#1e40af" : "#2563eb") : (darkMode ? "#7c3aed" : "#9333ea");

    const bg = isFading ? (darkMode ? "#14532d" : "#dcfce7") : isWrong ? (darkMode ? "#7f1d1d" : "#fee2e2") : isSel ? (isJa ? (darkMode ? "#1e3a8a" : "#eff6ff") : (darkMode ? "#581c87" : "#faf5ff")) : colors.cardBg;
    const border = isFading ? "#22c55e" : isWrong ? "#f87171" : isSel ? accentSel : (darkMode ? "#334155" : "#e2e8f0");
    const shadow = isFading ? "0 3px 0 #16a34a" : isSel ? `0 4px 0 ${shadowSel}` : isWrong ? "0 2px 0 #ef4444" : (darkMode ? "0 3px 0 #1e293b" : "0 3px 0 #d1d5db");
    const color = isFading ? "#16a34a" : isWrong ? "#fca5a5" : isSel ? (darkMode ? "#fff" : (isJa ? "#1d4ed8" : "#7c3aed")) : colors.text;
    const pointerEvents = isFading ? "none" : "pointer";
    const opacity = isFading ? 0.3 : 1;

    const len = card.text.length;
    const size = len > 9 ? 16 : len > 6 ? 18 : len > 4 ? 20 : 22;

    return (
      <button key={card.uid} className={cls}
        style={{
          flex: 1, minHeight: 68, borderRadius: 16, border: `2.5px solid ${border}`, background: bg,
          boxShadow: shadow, color, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", padding: "10px 6px", fontFamily: F, transition: "transform 0.1s,box-shadow 0.1s",
          transform: isSel ? "translateY(-3px)" : undefined, animationDelay: `${delay * 0.05}s`,
          WebkitTapHighlightColor: "transparent", pointerEvents, opacity,
        }}
        onClick={() => !isFading && handleTap(card)}>
        <span style={{ fontSize: size, fontWeight: 900, lineHeight: 1.25, textAlign: "center" }}>{card.text}</span>
      </button>
    );
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="fadeup" style={{ minHeight: "100dvh", background: colors.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, fontFamily: F }}>
      <div style={{ height: "100dvh", width: "100vw", maxWidth: "480px", margin: "0 auto", display: "flex", flexDirection: "column", padding: "20px 16px", overflow: "hidden" }}>

        {/* ヘッダー */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 8, marginBottom: 16 }}>
          <button onClick={() => { clearInterval(timerRef.current); setTimeLeft(0); setPhase("result"); }}
            style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 50, width: 36, height: 36, fontSize: 14, color: "#fff", cursor: "pointer", fontFamily: F, fontWeight: 900, flexShrink: 0 }}>✕</button>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, margin: "0 16px" }}>
            <div style={{ display: "flex", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff", opacity: 0.9, marginBottom: 6, gap: 16 }}>
              <span className={pct < 0.2 ? "blink" : ""}> ⏱ {timeLeft}秒</span>
              <span>{sec} {range}</span>
              <span>{totalPairs}ペア</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 99, height: 10, width: "80%", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct * 100}%`, background: barColor, borderRadius: 99, transition: "width 1s linear,background 0.5s" }} />
            </div>
          </div>

          <div style={{ width: 36, flexShrink: 0 }} />
        </div>

        {/* カードエリア */}
        <div key={cardKey} style={{ display: "flex", gap: 12, flex: 1, alignItems: "center", minHeight: 0, position: "relative" }}>
          {/* コンボ表示 */}
          <div style={{ position: "fixed", top: "140px", left: 0, right: 0, textAlign: "center", fontSize: 20, fontWeight: 900, color: "#fff", zIndex: 9999, pointerEvents: "none" }}>
            Combo: {streakCount}
          </div>
          {/* 日本語セクション */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "grid", gridTemplateRows: "repeat(5, 68px)", gap: 8 }}>
              {jaCards.map((c, i) => renderCard(c, i))}
            </div>
          </div>

          {/* 英語セクション */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "grid", gridTemplateRows: "repeat(5, 68px)", gap: 8 }}>
              {enCards.map((c, i) => renderCard(c, i + 5))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

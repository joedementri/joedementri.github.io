// win95-minesweeper.jsx — Fully functional Minesweeper

const MinesweeperApp = () => {
  const { useState, useEffect, useRef } = React;
  const ROWS = 9, COLS = 9, TOTAL_MINES = 10;

  const emptyBoard = () =>
    Array.from({ length: ROWS * COLS }, (_, i) => ({
      i, isMine: false, revealed: false, flagged: false, adj: 0, exploded: false,
    }));

  const getNeighbors = (idx) => {
    const r = Math.floor(idx / COLS), c = idx % COLS, out = [];
    for (let dr = -1; dr <= 1; dr++)
      for (let dc = -1; dc <= 1; dc++) {
        if (!dr && !dc) continue;
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) out.push(nr * COLS + nc);
      }
    return out;
  };

  const placeMines = (board, safe) => {
    const b = board.map(c => ({ ...c }));
    let placed = 0;
    while (placed < TOTAL_MINES) {
      const idx = Math.floor(Math.random() * ROWS * COLS);
      if (idx !== safe && !b[idx].isMine) { b[idx].isMine = true; placed++; }
    }
    b.forEach((cell, idx) => {
      if (!cell.isMine) cell.adj = getNeighbors(idx).filter(n => b[n].isMine).length;
    });
    return b;
  };

  const [board, setBoard] = useState(emptyBoard);
  const [phase, setPhase] = useState('idle'); // idle | playing | won | lost
  const [flags, setFlags] = useState(0);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (phase === 'playing') {
      timerRef.current = setInterval(() => setTime(t => Math.min(t + 1, 999)), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const reset = () => { setBoard(emptyBoard()); setPhase('idle'); setFlags(0); setTime(0); };

  const flood = (b, idx) => {
    const stack = [idx];
    while (stack.length) {
      const cur = stack.pop();
      if (b[cur].revealed || b[cur].flagged) continue;
      b[cur].revealed = true;
      if (b[cur].adj === 0 && !b[cur].isMine)
        getNeighbors(cur).forEach(n => { if (!b[n].revealed) stack.push(n); });
    }
  };

  const reveal = (idx) => {
    if (phase === 'won' || phase === 'lost') return;
    setBoard(prev => {
      let b = prev.map(c => ({ ...c }));
      if (phase === 'idle') {
        b = placeMines(b, idx);
        setPhase('playing');
      }
      if (b[idx].flagged || b[idx].revealed) return prev;
      if (b[idx].isMine) {
        b = b.map((c, i) => ({ ...c, revealed: c.isMine ? true : c.revealed, exploded: i === idx }));
        setPhase('lost');
        return b;
      }
      flood(b, idx);
      const hidden = b.filter(c => !c.revealed);
      if (hidden.length === TOTAL_MINES) {
        b = b.map(c => ({ ...c, flagged: c.isMine ? true : c.flagged }));
        setFlags(TOTAL_MINES);
        setPhase('won');
      }
      return b;
    });
  };

  const flag = (e, idx) => {
    e.preventDefault();
    if (phase === 'won' || phase === 'lost' || phase === 'idle') return;
    setBoard(prev => {
      const b = prev.map(c => ({ ...c }));
      if (b[idx].revealed) return prev;
      b[idx].flagged = !b[idx].flagged;
      setFlags(f => b[idx].flagged ? f + 1 : f - 1);
      return b;
    });
  };

  const NUM_COLORS = ['', '#0000fe', '#017701', '#fe0000', '#00007e', '#7e0000', '#007e7e', '#000', '#7e7e7e'];
  const face = phase === 'won' ? '😎' : phase === 'lost' ? '😵' : '🙂';

  const seg = (n) => (
    <div style={{
      background: '#000', color: '#fe0000',
      fontFamily: "'Courier New', monospace", fontSize: 22, fontWeight: 'bold',
      padding: '1px 4px', minWidth: 46, textAlign: 'right', letterSpacing: 3,
      boxShadow: 'inset 1px 1px 0 #808080, inset -1px -1px 0 #dfdfdf',
      userSelect: 'none',
    }}>
      {String(Math.max(0, Math.min(999, n))).padStart(3, '0')}
    </div>
  );

  return (
    <div style={{ padding: 8, fontFamily: "'MS Sans Serif', Tahoma, sans-serif", display: 'inline-flex', flexDirection: 'column', gap: 6 }}>
      {/* Header panel */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '6px 8px', gap: 8,
        boxShadow: 'inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #606060, inset -2px -2px 0 #dfdfdf',
      }}>
        {seg(TOTAL_MINES - flags)}
        <button onClick={reset} style={{
          width: 28, height: 28, fontSize: 16, cursor: 'default', background: '#c0c0c0', border: 'none',
          boxShadow: window.RAISED, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>{face}</button>
        {seg(time)}
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 18px)`,
        gap: 0,
        boxShadow: 'inset 2px 2px 0 #808080, inset -2px -2px 0 #ffffff',
      }}>
        {board.map((cell, idx) => {
          let bg = '#c0c0c0';
          let shadow = window.RAISED;
          let content = '';
          let color = NUM_COLORS[cell.adj] || '#000';
          let fontSize = 11;

          if (cell.revealed) {
            shadow = 'inset 1px 1px 0 #808080';
            if (cell.isMine) {
              content = '💣'; fontSize = 11;
              bg = cell.exploded ? '#ff0000' : '#c0c0c0';
            } else if (cell.adj > 0) {
              content = cell.adj;
            }
          } else if (cell.flagged) {
            content = '🚩'; fontSize = 11;
          } else if (phase === 'lost' && cell.isMine) {
            // show all mines on loss
            shadow = 'inset 1px 1px 0 #808080';
            content = '💣'; fontSize = 11;
          }

          return (
            <div key={idx}
              onClick={() => !cell.revealed && !cell.flagged && reveal(idx)}
              onContextMenu={(e) => flag(e, idx)}
              style={{
                width: 18, height: 18, background: bg, boxShadow: shadow,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: typeof content === 'number' ? 11 : fontSize,
                fontWeight: 'bold', color, cursor: 'default', userSelect: 'none',
                lineHeight: 1,
              }}
            >{content}</div>
          );
        })}
      </div>

      {phase === 'won' && <div style={{ color: '#007700', fontWeight: 'bold', fontSize: 11, textAlign: 'center' }}>You cleared the board! 🎉</div>}
      {phase === 'lost' && <div style={{ color: '#cc0000', fontWeight: 'bold', fontSize: 11, textAlign: 'center' }}>BOOM! Click 🙂 to try again.</div>}
      <div style={{ fontSize: 9, color: '#888', textAlign: 'center' }}>Right-click to flag · Double-click smiley to reset</div>
    </div>
  );
};

Object.assign(window, { MinesweeperApp });

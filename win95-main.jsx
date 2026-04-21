// win95-main.jsx — Desktop, Taskbar, StartMenu, App state

const { useState, useEffect, useRef } = React;

// ── Window registry ──────────────────────────────────────────────
const WINDOW_DEFS = {
  about:    { id: 'about',    title: 'My Computer',                       iconType: 'computer', component: 'AboutApp',      w: 420, h: 320, hasMenu: true,  menuItems: ['File','Edit','View','Help'] },
  projects: { id: 'projects', title: 'My Projects',                       iconType: 'folder',   component: 'ProjectsApp',   w: 520, h: 360, hasMenu: true,  menuItems: ['File','Edit','View','Help'] },
  resume:   { id: 'resume',   title: 'Resume.doc — Microsoft Word',       iconType: 'doc',      component: 'ResumeApp',     w: 500, h: 420, hasMenu: true,  menuItems: ['File','Edit','View','Insert','Help'] },
  skills:   { id: 'skills',   title: 'Skills.exe',                        iconType: 'exe',      component: 'SkillsApp',     w: 340, h: 390, hasMenu: false },
  contact:  { id: 'contact',  title: 'Contact.txt — Notepad',             iconType: 'txt',      component: 'ContactApp',    w: 310, h: 330, hasMenu: true,  menuItems: ['File','Edit','Search','Help'] },
  ie:       { id: 'ie',       title: "Joe's Links — Internet Explorer",   iconType: 'ie',       component: 'IEApp',         w: 520, h: 400, hasMenu: true,  menuItems: ['File','Edit','View','Favorites','Help'] },
  recycle:  { id: 'recycle',  title: 'Recycle Bin',                       iconType: 'recycle',  component: 'RecycleBinApp', w: 460, h: 300, hasMenu: true,  menuItems: ['File','Edit','View','Help'] },
  mine:     { id: 'mine',     title: 'Minesweeper',                       iconType: 'mine',     component: 'MinesweeperApp',w: 222, h: 300, hasMenu: true,  menuItems: ['Game','Help'] },
};

const DESKTOP_ICONS = [
  { id: 'about',    label: 'My Computer',       iconType: 'computer' },
  { id: 'projects', label: 'My Projects',        iconType: 'folder'   },
  { id: 'resume',   label: 'Resume.doc',         iconType: 'doc'      },
  { id: 'skills',   label: 'Skills.exe',         iconType: 'exe'      },
  { id: 'contact',  label: 'Contact.txt',        iconType: 'txt'      },
  { id: 'ie',       label: 'Internet Explorer',  iconType: 'ie'       },
  { id: 'recycle',  label: 'Recycle Bin',        iconType: 'recycle'  },
  { id: 'mine',     label: 'Minesweeper',        iconType: 'mine'     },
];

// Cascade offset per window so they don't all stack exactly
const CASCADE = { about: [60,50], projects: [120,80], resume: [180,60], skills: [100,120], contact: [240,100], ie: [160,90], recycle: [90,130], mine: [280,70] };

// ── Clock ───────────────────────────────────────────────────────
const Clock = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  return (
    <div style={{
      padding: '1px 8px', fontSize: 11, whiteSpace: 'nowrap',
      fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
      boxShadow: 'inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff',
    }}>
      {now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
};

// ── Start Menu ──────────────────────────────────────────────────
const StartMenu = ({ onOpen, onClose }) => {
  const items = [
    { id: 'about',    label: 'My Computer',      iconType: 'computer' },
    { id: 'projects', label: 'My Projects',       iconType: 'folder'   },
    null,
    { id: 'resume',   label: 'Resume.doc',        iconType: 'doc'      },
    { id: 'skills',   label: 'Skills.exe',        iconType: 'exe'      },
    { id: 'contact',  label: 'Contact.txt',       iconType: 'txt'      },
    null,
    { id: 'ie',       label: 'Internet Explorer', iconType: 'ie'       },
    { id: 'mine',     label: 'Minesweeper',       iconType: 'mine'     },
    null,
    { id: 'recycle',  label: 'Recycle Bin',       iconType: 'recycle'  },
  ];

  return (
    <div style={{
      position: 'absolute', bottom: 28, left: 0, zIndex: 30000,
      display: 'flex', background: '#c0c0c0',
      boxShadow: RAISED,
    }}>
      {/* Sidebar */}
      <div style={{
        width: 24, background: 'linear-gradient(to top, #000080 60%, #1084d0)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 6,
      }}>
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', color: 'white', fontSize: 13, fontWeight: 'bold', letterSpacing: 2, fontFamily: "Arial, sans-serif", opacity: 0.9 }}>
          Windows 95
        </span>
      </div>
      {/* Items */}
      <div style={{ minWidth: 180, padding: '2px 0' }}>
        {items.map((item, i) => item === null
          ? <div key={i} style={{ height: 1, background: '#808080', margin: '3px 6px', boxShadow: '0 1px 0 #fff' }} />
          : <StartMenuItem key={item.id} item={item} onOpen={onOpen} onClose={onClose} />
        )}
      </div>
    </div>
  );
};

const StartMenuItem = ({ item, onOpen, onClose }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => { onOpen(item.id); onClose(); }}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '4px 12px', cursor: 'default',
        background: hover ? '#000080' : 'transparent',
        color: hover ? 'white' : '#000',
        fontFamily: "'MS Sans Serif', Tahoma, sans-serif", fontSize: 12,
      }}
    >
      <W95Icon type={item.iconType} size={20} />
      {item.label}
    </div>
  );
};

// ── Desktop Icon ────────────────────────────────────────────────
const DesktopIcon = ({ icon, selected, onSelect, onOpen }) => {
  const timer = useRef(null);
  const handleClick = (e) => {
    e.stopPropagation();
    if (timer.current) { clearTimeout(timer.current); timer.current = null; onOpen(); }
    else { onSelect(); timer.current = setTimeout(() => { timer.current = null; }, 350); }
  };
  return (
    <div onClick={handleClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 76, padding: 4, cursor: 'default', gap: 3 }}>
      <div style={{ position: 'relative' }}>
        <W95Icon type={icon.iconType} size={32} />
        {selected && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,128,0.45)', mixBlendMode: 'multiply', pointerEvents: 'none' }} />}
      </div>
      <span style={{
        fontSize: 11, color: 'white', textAlign: 'center', lineHeight: 1.25,
        padding: '1px 3px', maxWidth: 72, wordBreak: 'break-word',
        fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
        textShadow: '1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000',
        background: selected ? '#000080' : 'transparent',
      }}>
        {icon.label}
      </span>
    </div>
  );
};

// ── Taskbar button ──────────────────────────────────────────────
const TaskBtn = ({ win, isActive, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        height: 22, padding: '0 8px', maxWidth: 160, minWidth: 80,
        background: '#c0c0c0', border: 'none', cursor: 'default',
        fontFamily: "'MS Sans Serif', Tahoma, sans-serif", fontSize: 11,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        textAlign: 'left', display: 'flex', alignItems: 'center', gap: 4,
        flexShrink: 0,
        boxShadow: (isActive && !win.minimized) ? SUNKEN : RAISED,
        fontWeight: (isActive && !win.minimized) ? 'bold' : 'normal',
      }}
    >
      <W95Icon type={win.iconType} size={14} />
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{win.title}</span>
    </button>
  );
};

// ── Main App ────────────────────────────────────────────────────
const App = () => {
  const [wins, setWins] = useState({});         // open windows keyed by id
  const [active, setActive] = useState(null);
  const [zCounter, setZCounter] = useState(100);
  const [startOpen, setStartOpen] = useState(false);
  const [selIcon, setSelIcon] = useState(null);
  const drag = useRef(null);

  // Global mouse handlers for window dragging
  useEffect(() => {
    const onMove = (e) => {
      if (!drag.current) return;
      const { id, ox, oy, wx, wy } = drag.current;
      setWins(prev => ({
        ...prev,
        [id]: { ...prev[id], x: wx + (e.clientX - ox), y: wy + (e.clientY - oy) },
      }));
    };
    const onUp = () => { drag.current = null; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, []);

  const bringToFront = (id) => {
    const z = zCounter + 1;
    setZCounter(z);
    setWins(prev => ({ ...prev, [id]: { ...prev[id], zIndex: z } }));
    setActive(id);
    return z;
  };

  const openWin = (id) => {
    if (wins[id]) {
      // un-minimize and bring to front
      const z = zCounter + 1; setZCounter(z);
      setWins(prev => ({ ...prev, [id]: { ...prev[id], minimized: false, zIndex: z } }));
      setActive(id);
    } else {
      const def = WINDOW_DEFS[id]; if (!def) return;
      const [cx, cy] = CASCADE[id] || [100, 80];
      const z = zCounter + 1; setZCounter(z);
      setWins(prev => ({ ...prev, [id]: { ...def, x: cx, y: cy, width: def.w, height: def.h, minimized: false, maximized: false, zIndex: z } }));
      setActive(id);
    }
    setStartOpen(false);
  };

  const closeWin = (id) => {
    setWins(prev => { const n = { ...prev }; delete n[id]; return n; });
    if (active === id) setActive(null);
  };

  const minimizeWin = (id) => {
    setWins(prev => ({ ...prev, [id]: { ...prev[id], minimized: true } }));
    if (active === id) setActive(null);
  };

  const maximizeWin = (id) => {
    setWins(prev => ({ ...prev, [id]: { ...prev[id], maximized: !prev[id].maximized } }));
    bringToFront(id);
  };

  const startDrag = (e, id) => {
    e.preventDefault();
    bringToFront(id);
    drag.current = { id, ox: e.clientX, oy: e.clientY, wx: wins[id].x, wy: wins[id].y };
  };

  const taskbarClick = (id) => {
    const w = wins[id];
    if (w.minimized) { openWin(id); }
    else if (active === id) { minimizeWin(id); }
    else { bringToFront(id); }
  };

  const COMPS = { AboutApp, ProjectsApp, ResumeApp, SkillsApp, ContactApp, IEApp, RecycleBinApp, MinesweeperApp };

  return (
    <div
      style={{ width: '100vw', height: '100vh', background: '#008080', position: 'relative', overflow: 'hidden' }}
      onClick={() => { setSelIcon(null); setStartOpen(false); }}
    >
      {/* Desktop icons — left column */}
      <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 4, zIndex: 10 }}>
        {DESKTOP_ICONS.map(icon => (
          <DesktopIcon key={icon.id} icon={icon}
            selected={selIcon === icon.id}
            onSelect={() => setSelIcon(icon.id)}
            onOpen={() => openWin(icon.id)}
          />
        ))}
      </div>

      {/* Windows */}
      {Object.values(wins).map(w => {
        const Comp = COMPS[w.component];
        return (
          <Win95Window key={w.id} {...w}
            isActive={active === w.id}
            isMinimized={w.minimized}
            isMaximized={w.maximized}
            onFocus={() => { if (active !== w.id) bringToFront(w.id); }}
            onClose={() => closeWin(w.id)}
            onMinimize={() => minimizeWin(w.id)}
            onMaximize={() => maximizeWin(w.id)}
            onDragStart={startDrag}
          >
            {Comp ? <Comp /> : <div style={{ padding: 12, fontSize: 11 }}>Loading…</div>}
          </Win95Window>
        );
      })}

      {/* Start menu */}
      {startOpen && <StartMenu onOpen={openWin} onClose={() => setStartOpen(false)} />}

      {/* Taskbar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 28,
        background: '#c0c0c0', zIndex: 20000,
        boxShadow: 'inset 0 1px 0 #ffffff',
        borderTop: '1px solid #808080',
        display: 'flex', alignItems: 'center', padding: '2px 2px', gap: 2,
      }}>
        {/* Start button */}
        <button
          onClick={(e) => { e.stopPropagation(); setStartOpen(v => !v); }}
          style={{
            height: 22, padding: '0 6px', flexShrink: 0,
            background: '#c0c0c0', border: 'none', cursor: 'default',
            display: 'flex', alignItems: 'center', gap: 4,
            fontFamily: "'MS Sans Serif', Tahoma, sans-serif", fontSize: 12, fontWeight: 'bold',
            boxShadow: startOpen ? SUNKEN : RAISED,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <rect x="1" y="1" width="6" height="6" fill="#ff0000"/>
            <rect x="9" y="1" width="6" height="6" fill="#00cc00"/>
            <rect x="1" y="9" width="6" height="6" fill="#0000ff"/>
            <rect x="9" y="9" width="6" height="6" fill="#ffcc00"/>
          </svg>
          Start
        </button>

        {/* Separator */}
        <div style={{ width: 1, height: 20, background: '#808080', boxShadow: '1px 0 0 #fff', flexShrink: 0, margin: '0 2px' }} />

        {/* Task buttons */}
        <div style={{ flex: 1, display: 'flex', gap: 2, overflow: 'hidden', alignItems: 'center' }}>
          {Object.values(wins).map(w => (
            <TaskBtn key={w.id} win={w} isActive={active === w.id} onClick={(e) => { e.stopPropagation(); taskbarClick(w.id); }} />
          ))}
        </div>

        {/* Clock tray */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, gap: 4 }}>
          <div style={{ width: 1, height: 20, background: '#808080', boxShadow: '1px 0 0 #fff' }} />
          <Clock />
        </div>
      </div>

      {/* Welcome tooltip on first load */}
      <WelcomeBanner onOpen={openWin} />
    </div>
  );
};

// ── Welcome banner ───────────────────────────────────────────────
const WelcomeBanner = ({ onOpen }) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div style={{
      position: 'absolute', bottom: 36, right: 12,
      background: '#ffffcc', border: '1px solid #888',
      boxShadow: '2px 2px 4px rgba(0,0,0,0.4)',
      padding: '8px 12px', fontSize: 11, zIndex: 25000,
      fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
      maxWidth: 240, lineHeight: 1.6,
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: 4 }}>👋 Welcome to Joe's Desktop</div>
      <div style={{ color: '#444', marginBottom: 8 }}>
        Double-click any icon to open it.<br/>
        Drag windows by their title bar.
      </div>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
        <Win95Btn style={{ minWidth: 60, fontSize: 10, padding: '2px 8px' }} onClick={() => { setVisible(false); onOpen('about'); }}>
          Open My Computer
        </Win95Btn>
        <Win95Btn style={{ minWidth: 40, fontSize: 10, padding: '2px 8px' }} onClick={() => setVisible(false)}>
          Close
        </Win95Btn>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

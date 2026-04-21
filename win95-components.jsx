// win95-components.jsx
// Win95 UI primitives: icons, window frame, button

const W95Icon = ({ type, size = 32 }) => {
  const p = { strokeWidth: 1, strokeLinejoin: 'round' };
  if (type === 'computer') return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ display: 'block', imageRendering: 'pixelated' }}>
      <rect x="2" y="2" width="28" height="20" rx="1" fill="#c8c8c8" stroke="#000" {...p}/>
      <rect x="4" y="4" width="24" height="16" fill="#0a0a6e" stroke="none"/>
      <rect x="10" y="22" width="12" height="3" fill="#b0b0b0" stroke="#000" {...p}/>
      <rect x="6" y="25" width="20" height="2" fill="#b0b0b0" stroke="#000" {...p}/>
      <text x="9" y="15" fontSize="8" fill="#00ffcc" fontFamily="monospace" fontWeight="bold">{"</>"}</text>
    </svg>
  );
  if (type === 'folder') return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ display: 'block' }}>
      <rect x="1" y="9" width="30" height="20" rx="1" fill="#f5c518" stroke="#a07800" {...p}/>
      <path d="M1 9 L1 7 Q1 6 2 6 L13 6 L16 9 Z" fill="#f5c518" stroke="#a07800" {...p}/>
      <rect x="3" y="13" width="26" height="14" rx="1" fill="#ffd740" stroke="none"/>
    </svg>
  );
  if (type === 'doc') return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ display: 'block' }}>
      <path d="M4 1 L20 1 L28 9 L28 31 L4 31 Z" fill="white" stroke="#555" {...p}/>
      <path d="M20 1 L20 9 L28 9" fill="#d0d0d0" stroke="#555" {...p}/>
      <line x1="8" y1="14" x2="24" y2="14" stroke="#9999cc" strokeWidth="1.5"/>
      <line x1="8" y1="18" x2="24" y2="18" stroke="#9999cc" strokeWidth="1.5"/>
      <line x1="8" y1="22" x2="18" y2="22" stroke="#9999cc" strokeWidth="1.5"/>
      <text x="6" y="30" fontSize="7" fill="#cc0000" fontFamily="serif" fontWeight="bold">W</text>
    </svg>
  );
  if (type === 'txt') return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ display: 'block' }}>
      <path d="M4 1 L20 1 L28 9 L28 31 L4 31 Z" fill="white" stroke="#555" {...p}/>
      <path d="M20 1 L20 9 L28 9" fill="#d0d0d0" stroke="#555" {...p}/>
      <line x1="8" y1="13" x2="24" y2="13" stroke="#444" strokeWidth="1.5"/>
      <line x1="8" y1="17" x2="24" y2="17" stroke="#444" strokeWidth="1.5"/>
      <line x1="8" y1="21" x2="22" y2="21" stroke="#444" strokeWidth="1.5"/>
      <line x1="8" y1="25" x2="17" y2="25" stroke="#444" strokeWidth="1.5"/>
    </svg>
  );
  if (type === 'exe') return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ display: 'block' }}>
      <rect x="2" y="4" width="28" height="24" fill="#c0c0c0" stroke="#555" {...p}/>
      <rect x="4" y="6" width="24" height="6" fill="#000080" stroke="none"/>
      <rect x="4" y="14" width="10" height="10" fill="#e0e0e0" stroke="#aaa" strokeWidth={1}/>
      <line x1="17" y1="14" x2="28" y2="14" stroke="#333" strokeWidth="2"/>
      <line x1="17" y1="18" x2="28" y2="18" stroke="#333" strokeWidth="2"/>
      <line x1="17" y1="22" x2="24" y2="22" stroke="#333" strokeWidth="2"/>
      <text x="5" y="21" fontSize="7" fill="#000080" fontFamily="monospace" fontWeight="bold">exe</text>
    </svg>
  );
  if (type === 'recycle') return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ display: 'block' }}>
      <path d="M13 2 L11 8 L6 8 L16 22 L26 8 L21 8 L19 2 Z" fill="#5a8a5a" stroke="#2a5a2a" {...p}/>
      <path d="M8 15 L3 29 L29 29 L24 15 Z" fill="#6aaa6a" stroke="#2a5a2a" {...p}/>
    </svg>
  );
  if (type === 'ie') return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ display: 'block' }}>
      <circle cx="16" cy="16" r="13" fill="#003399" stroke="#001166" {...p}/>
      <ellipse cx="16" cy="16" rx="7" ry="13" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
      <line x1="3" y1="16" x2="29" y2="16" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
      <line x1="5" y1="10" x2="27" y2="10" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
      <line x1="5" y1="22" x2="27" y2="22" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
      <text x="10" y="21" fontSize="12" fontWeight="bold" fill="#FFD700" fontFamily="Times, serif" fontStyle="italic">e</text>
    </svg>
  );
  if (type === 'mine') return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ display: 'block' }}>
      <rect x="1" y="1" width="30" height="30" fill="#c0c0c0" stroke="#888" {...p}/>
      <circle cx="9" cy="9" r="4" fill="#111"/>
      <circle cx="23" cy="9" r="3" fill="#111"/>
      <circle cx="16" cy="19" r="4.5" fill="#111"/>
      <circle cx="7" cy="22" r="2.5" fill="#111"/>
      <circle cx="25" cy="22" r="3" fill="#111"/>
      <line x1="9" y1="4" x2="9" y2="2" stroke="#111" strokeWidth="1.5"/>
      <line x1="5" y1="6" x2="3" y2="4" stroke="#111" strokeWidth="1.5"/>
    </svg>
  );
  return <svg width={size} height={size} viewBox="0 0 32 32" style={{ display: 'block' }}><rect x="1" y="1" width="30" height="30" fill="#c0c0c0" stroke="#888" strokeWidth="1"/></svg>;
};

// Raised 3D border (Win95 signature)
const RAISED = 'inset -1px -1px 0 #000000, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf';
const SUNKEN = 'inset 1px 1px 0 #000000, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #808080, inset -2px -2px 0 #dfdfdf';
const FIELD  = 'inset 1px 1px 0 #808080, inset -1px -1px 0 #dfdfdf, inset 2px 2px 0 #404040, inset -2px -2px 0 #ffffff';

const Win95Btn = ({ children, onClick, style = {}, pressed = false }) => {
  const { useState: us } = React;
  const [down, setDown] = us(false);
  const isPressed = pressed || down;
  return (
    <button
      onClick={onClick}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
      onMouseLeave={() => setDown(false)}
      style={{
        background: '#c0c0c0',
        border: 'none',
        padding: isPressed ? '4px 11px 2px 13px' : '3px 12px',
        fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
        fontSize: 11,
        cursor: 'default',
        boxShadow: isPressed ? SUNKEN : RAISED,
        minWidth: 75,
        ...style,
      }}
    >{children}</button>
  );
};

const titleBtnCSS = {
  width: 16, height: 14,
  background: '#c0c0c0',
  border: 'none',
  cursor: 'default',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: 0, flexShrink: 0,
  boxShadow: RAISED,
  fontFamily: 'Arial, sans-serif',
  fontSize: 9,
};

const Win95Window = ({
  id, title, iconType, children,
  x, y, width, height,
  isActive, isMinimized, isMaximized,
  onFocus, onClose, onMinimize, onMaximize, onDragStart,
  hasMenu = false, menuItems,
}) => {
  if (isMinimized) return null;

  const style = isMaximized
    ? { position: 'fixed', left: 0, top: 0, right: 0, bottom: 28, zIndex: isActive ? 5000 : 1000 }
    : { position: 'absolute', left: x, top: y, width, height, zIndex: isActive ? 5000 : 1000 };

  return (
    <div
      style={{ ...style, background: '#c0c0c0', boxShadow: RAISED, display: 'flex', flexDirection: 'column' }}
      onMouseDown={onFocus}
    >
      {/* Title bar */}
      <div
        style={{
          height: 18, flexShrink: 0,
          background: isActive
            ? 'linear-gradient(to right, #000080, #1084d0)'
            : 'linear-gradient(to right, #7B7B7B, #a0a0a0)',
          display: 'flex', alignItems: 'center',
          padding: '1px 2px', gap: 2,
          cursor: isMaximized ? 'default' : 'move',
          userSelect: 'none',
        }}
        onMouseDown={(e) => {
          if (!isMaximized && !e.target.closest('button')) {
            e.preventDefault();
            onDragStart(e, id);
          }
        }}
        onDoubleClick={onMaximize}
      >
        <span style={{ display: 'flex', alignItems: 'center', marginLeft: 1 }}>
          <W95Icon type={iconType} size={14} />
        </span>
        <span style={{ flex: 1, color: 'white', fontSize: 11, fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontFamily: "'MS Sans Serif', Tahoma, sans-serif" }}>
          {title}
        </span>
        <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} style={titleBtnCSS}>
          <svg width="8" height="3"><rect y="1" width="8" height="2" fill="#000"/></svg>
        </button>
        <button onClick={(e) => { e.stopPropagation(); onMaximize(); }} style={titleBtnCSS}>
          {isMaximized
            ? <svg width="9" height="9" viewBox="0 0 9 9"><rect x="2" y="0" width="7" height="7" fill="none" stroke="#000" strokeWidth="1"/><rect x="0" y="2" width="7" height="7" fill="#c0c0c0" stroke="#000" strokeWidth="1"/></svg>
            : <svg width="9" height="9" viewBox="0 0 9 9"><rect x="0" y="0" width="9" height="9" fill="none" stroke="#000" strokeWidth="1"/><line x1="0" y1="2" x2="9" y2="2" stroke="#000" strokeWidth="1.5"/></svg>}
        </button>
        <button onClick={(e) => { e.stopPropagation(); onClose(); }} style={{ ...titleBtnCSS, marginLeft: 2, fontSize: 9, fontWeight: 'bold' }}>✕</button>
      </div>

      {/* Menu bar */}
      {hasMenu && (
        <div style={{ height: 20, background: '#c0c0c0', display: 'flex', alignItems: 'center', padding: '0 2px', borderBottom: '1px solid #808080', flexShrink: 0 }}>
          {(menuItems || ['File', 'Edit', 'View', 'Help']).map(item => (
            <MenuBarItem key={item} label={item} />
          ))}
        </div>
      )}

      {/* Content area */}
      <div style={{ flex: 1, overflow: 'auto', position: 'relative', minHeight: 0 }}>
        {children}
      </div>
    </div>
  );
};

const MenuBarItem = ({ label }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '2px 6px', fontSize: 11, cursor: 'default',
        fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
        background: hover ? '#000080' : 'transparent',
        color: hover ? 'white' : '#000',
      }}
    >{label}</span>
  );
};

Object.assign(window, { W95Icon, Win95Btn, Win95Window, RAISED, SUNKEN, FIELD });

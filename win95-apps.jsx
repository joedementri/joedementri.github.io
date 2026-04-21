// win95-apps.jsx — Content for each window app

// ── About (My Computer) ─────────────────────────────────────────
const AboutApp = () => (
  <div style={{ padding: 14, fontFamily: "'MS Sans Serif', Tahoma, sans-serif", fontSize: 12 }}>
    <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'flex-start' }}>
      <W95Icon type="computer" size={64} />
      <div>
        <div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 2 }}>Joe</div>
        <div style={{ color: '#000080', fontSize: 13, marginBottom: 10 }}>Data Engineer</div>
        <div style={{ color: '#333', lineHeight: 1.6, maxWidth: 310, fontSize: 11 }}>
          Hi! I'm Joe — a Data Engineer with 6+ years of experience
          building reliable pipelines, ETL systems, and analytics
          infrastructure. I love turning messy data into clean,
          scalable systems that teams can actually rely on.
        </div>
      </div>
    </div>
    <div style={{ height: 1, background: '#808080', boxShadow: '0 1px 0 #fff', marginBottom: 12 }} />
    <div style={{ fontWeight: 'bold', marginBottom: 8, fontSize: 11 }}>System Properties</div>
    <table style={{ fontSize: 11, borderCollapse: 'collapse', width: '100%' }}>
      <tbody>
        {[
          ['Location', 'London, UK'],
          ['Status', 'Open to opportunities'],
          ['OS', 'Windows 95 (Career Edition v6.2)'],
          ['Processor', 'Python 3.11 @ 6 YOE'],
          ['Memory', '∞ TB SQL knowledge installed'],
          ['GitHub', 'github.com/joe'],
          ['Email', 'joe@example.com'],
        ].map(([k, v]) => (
          <tr key={k}>
            <td style={{ padding: '3px 12px 3px 0', fontWeight: 'bold', color: '#444', whiteSpace: 'nowrap', verticalAlign: 'top' }}>{k}:</td>
            <td style={{ padding: '3px 0', color: '#000' }}>{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div style={{ marginTop: 14, display: 'flex', gap: 6 }}>
      <Win95Btn style={{ minWidth: 90 }}>OK</Win95Btn>
      <Win95Btn style={{ minWidth: 90 }}>Properties</Win95Btn>
    </div>
  </div>
);

// ── Projects (Explorer) ─────────────────────────────────────────
const ProjectsApp = () => {
  const [selected, setSelected] = React.useState(null);
  const projects = [
    { id: 1, name: 'etl-pipeline-framework', lang: 'Python', stars: 143, desc: 'Modular Python framework for building ELT pipelines with automatic lineage tracking, hot-reloading, parallel execution, and Slack alerting. Used in production at DataCorp.', tags: ['Python', 'Airflow', 'Postgres'] },
    { id: 2, name: 'realtime-analytics-platform', lang: 'Python / Kafka', stars: 87, desc: 'Kafka + Spark Streaming platform for processing 10M+ events/day. Includes a live Grafana dashboard with sub-second latency metrics and auto-scaling consumers.', tags: ['Kafka', 'Spark', 'AWS'] },
    { id: 3, name: 'data-quality-suite', lang: 'Python / dbt', stars: 56, desc: 'Automated data validation framework integrated natively with dbt. Catches schema drift, null anomalies, and distribution shifts before they hit production dashboards.', tags: ['dbt', 'Python', 'Great Expectations'] },
    { id: 4, name: 'ml-feature-store', lang: 'Python / Redis', stars: 34, desc: 'Centralised feature engineering platform for ML teams. Supports point-in-time correct retrieval, automatic backfilling, and a feature registry UI.', tags: ['Redis', 'FastAPI', 'Python'] },
  ];
  const sel = projects.find(p => p.id === selected);

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: "'MS Sans Serif', Tahoma, sans-serif", fontSize: 11 }}>
      {/* Sidebar */}
      <div style={{ width: 190, borderRight: '2px solid #808080', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ background: 'linear-gradient(to right,#000080,#1084d0)', color: 'white', padding: '3px 8px', fontWeight: 'bold', fontSize: 11, flexShrink: 0 }}>
          My Projects (4)
        </div>
        {projects.map(p => (
          <div
            key={p.id}
            onClick={() => setSelected(p.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '5px 8px', cursor: 'default',
              background: selected === p.id ? '#000080' : 'transparent',
              color: selected === p.id ? 'white' : '#000',
              borderBottom: '1px solid #dfdfdf',
            }}
          >
            <W95Icon type="folder" size={16} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
          </div>
        ))}
      </div>
      {/* Detail */}
      <div style={{ flex: 1, padding: 12, overflowY: 'auto', background: 'white' }}>
        {sel ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <W95Icon type="folder" size={32} />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: 13 }}>{sel.name}</div>
                <div style={{ color: '#666', fontSize: 10 }}>{sel.lang} &nbsp;·&nbsp; ★ {sel.stars}</div>
              </div>
            </div>
            <div style={{ padding: 8, boxShadow: window.FIELD, fontSize: 11, lineHeight: 1.7, marginBottom: 12, background: '#f8f8f8' }}>
              {sel.desc}
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 12 }}>
              {sel.tags.map(t => (
                <span key={t} style={{ background: '#000080', color: 'white', padding: '1px 6px', fontSize: 10 }}>{t}</span>
              ))}
            </div>
            <Win95Btn>View on GitHub →</Win95Btn>
          </>
        ) : (
          <div style={{ color: '#888', padding: 8, fontSize: 11 }}>
            ← Select a project to view details
          </div>
        )}
      </div>
    </div>
  );
};

// ── Resume (Word) ───────────────────────────────────────────────
const ResumeApp = () => {
  const [tab, setTab] = React.useState('work');
  const experience = [
    { title: 'Senior Data Engineer', company: 'DataCorp Inc.', period: '2022 — Present', bullets: [
      'Led migration of legacy ETL pipelines to Apache Airflow, reducing pipeline failures by 70%',
      'Built real-time data platform processing 10M+ events/day using Kafka and Spark Streaming',
      'Mentored 3 junior engineers and established team-wide data engineering best practices',
      'Architected company-wide dbt project across 5 domains, 200+ models',
    ]},
    { title: 'Data Engineer', company: 'Analytics Solutions Ltd.', period: '2020 — 2022', bullets: [
      'Designed and maintained 50+ dbt models powering C-suite executive dashboards',
      'Reduced Redshift costs by 35% through query optimisation and smart partitioning strategies',
      'Implemented automated data quality checks across 20+ third-party data sources',
    ]},
    { title: 'Data Analyst', company: 'StartupXYZ', period: '2018 — 2020', bullets: [
      "Built the company's first analytics infrastructure using Python and PostgreSQL",
      'Delivered weekly executive reports, cutting manual reporting time by 80%',
      'Created self-serve BI dashboards in Metabase used by 40+ stakeholders',
    ]},
  ];
  const education = [
    { degree: 'BSc Computer Science', school: 'University of Technology', year: '2014 – 2018', note: 'First Class Honours · Dissertation: Distributed Stream Processing' },
    { degree: 'AWS Certified Data Engineer', school: 'Amazon Web Services', year: '2023', note: 'Associate Certification' },
    { degree: 'dbt Certified Developer', school: 'dbt Labs', year: '2022', note: 'Professional Certification' },
  ];

  return (
    <div style={{ fontFamily: "'MS Sans Serif', Tahoma, sans-serif", fontSize: 11, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', padding: '4px 4px 0', gap: 2, background: '#c0c0c0', flexShrink: 0 }}>
        {[['work', 'Work Experience'], ['edu', 'Education']].map(([key, label]) => (
          <div key={key} onClick={() => setTab(key)} style={{
            padding: '3px 14px', cursor: 'default',
            fontFamily: "'MS Sans Serif', Tahoma, sans-serif", fontSize: 11,
            background: '#c0c0c0',
            boxShadow: tab === key
              ? 'inset -1px 0 0 #000, inset 1px 0 0 #fff, inset 0 1px 0 #fff, -1px 2px 0 #c0c0c0'
              : 'inset -1px -1px 0 #000, inset 1px 0 0 #fff, inset 0 1px 0 #fff',
            position: 'relative', zIndex: tab === key ? 2 : 1,
            marginBottom: tab === key ? -1 : 0,
            fontWeight: tab === key ? 'bold' : 'normal',
          }}>{label}</div>
        ))}
        <div style={{ flex: 1, borderBottom: '1px solid #808080', alignSelf: 'flex-end', height: 1 }} />
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 14, background: 'white' }}>
        {tab === 'work' && experience.map((job, i) => (
          <div key={i} style={{ marginBottom: 18, paddingBottom: 18, borderBottom: i < experience.length - 1 ? '1px solid #e8e8e8' : 'none' }}>
            <div style={{ fontWeight: 'bold', fontSize: 13 }}>{job.title}</div>
            <div style={{ color: '#000080', marginBottom: 6 }}>{job.company} &nbsp;·&nbsp; <span style={{ color: '#666' }}>{job.period}</span></div>
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
              {job.bullets.map((b, j) => <li key={j} style={{ marginBottom: 3 }}>{b}</li>)}
            </ul>
          </div>
        ))}
        {tab === 'edu' && education.map((ed, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16, paddingBottom: 16, borderBottom: i < education.length - 1 ? '1px solid #e8e8e8' : 'none' }}>
            <W95Icon type="doc" size={28} />
            <div>
              <div style={{ fontWeight: 'bold', fontSize: 12 }}>{ed.degree}</div>
              <div style={{ color: '#000080', marginBottom: 2 }}>{ed.school}</div>
              <div style={{ color: '#666', fontSize: 10 }}>{ed.year} &nbsp;·&nbsp; {ed.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Skills ──────────────────────────────────────────────────────
const SkillsApp = () => {
  const skills = [
    { name: 'SQL', pct: 95 }, { name: 'Python', pct: 90 },
    { name: 'dbt', pct: 87 }, { name: 'PostgreSQL', pct: 85 },
    { name: 'Apache Spark', pct: 80 }, { name: 'AWS', pct: 80 },
    { name: 'Apache Airflow', pct: 75 }, { name: 'Docker / K8s', pct: 68 },
  ];
  return (
    <div style={{ padding: 12, fontFamily: "'MS Sans Serif', Tahoma, sans-serif", fontSize: 11 }}>
      <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#555', marginBottom: 10 }}>
        C:\Skills&gt; inventory.exe --verbose
      </div>
      {skills.map(s => (
        <div key={s.name} style={{ marginBottom: 9 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <span style={{ fontWeight: 'bold' }}>{s.name}</span>
            <span style={{ color: '#555', fontFamily: 'monospace' }}>{s.pct}%</span>
          </div>
          <div style={{ height: 14, background: 'white', boxShadow: window.FIELD, position: 'relative' }}>
            <div style={{ width: `${s.pct}%`, height: '100%', background: '#000080' }} />
            {/* progress bar stripes */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 10px, rgba(255,255,255,0.15) 10px, rgba(255,255,255,0.15) 11px)',
              clipPath: `inset(0 ${100 - s.pct}% 0 0)`,
            }} />
          </div>
        </div>
      ))}
      <div style={{ marginTop: 14, padding: 8, background: '#ffffcc', boxShadow: window.FIELD, fontSize: 10, lineHeight: 1.6 }}>
        <strong>Also familiar with:</strong><br />
        Kafka · Redis · Snowflake · BigQuery · Terraform · Git · Linux · Databricks
      </div>
    </div>
  );
};

// ── Contact (Notepad) ───────────────────────────────────────────
const ContactApp = () => (
  <div style={{ background: 'white', height: '100%', padding: 10, fontFamily: "'Courier New', monospace", fontSize: 12, lineHeight: 1.9, overflowY: 'auto' }}>
    <pre style={{ fontFamily: 'inherit', fontSize: 'inherit', whiteSpace: 'pre-wrap', margin: 0 }}>{`Contact.txt
===========

Name     :  Joe
Title    :  Data Engineer
Location :  London, UK

─────────────────────────────

Email    :  joe@example.com

GitHub   :  github.com/joe
LinkedIn :  linkedin.com/in/joe
Website  :  joe.dev

─────────────────────────────

Availability : Open to new roles
               Remote / London hybrid preferred
Response time: < 24 hours

─────────────────────────────
Modified: ${new Date().toLocaleDateString('en-GB')}
`}</pre>
  </div>
);

// ── Internet Explorer ───────────────────────────────────────────
const IEApp = () => {
  const links = [
    { name: 'GitHub Profile', url: 'github.com/joe', desc: 'All my open-source projects', type: 'folder' },
    { name: 'LinkedIn', url: 'linkedin.com/in/joe', desc: 'Professional network', type: 'doc' },
    { name: 'ETL Framework', url: 'github.com/joe/etl-framework', desc: '★ 143  Open source', type: 'folder' },
    { name: 'Personal Blog', url: 'joe.dev/blog', desc: 'Writing about data engineering', type: 'txt' },
    { name: 'Real-time Platform', url: 'github.com/joe/rt-analytics', desc: '★ 87  Open source', type: 'folder' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: "'MS Sans Serif', Tahoma, sans-serif", fontSize: 11 }}>
      {/* toolbar */}
      <div style={{ padding: '3px 4px', borderBottom: '1px solid #808080', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0, background: '#c0c0c0' }}>
        {['◀', '▶', '✕', '⟳', '🏠'].map(btn => (
          <Win95Btn key={btn} style={{ minWidth: 24, padding: '1px 5px', fontSize: 11 }}>{btn}</Win95Btn>
        ))}
        <span style={{ marginLeft: 6, color: '#444' }}>Address</span>
        <div style={{ flex: 1, background: 'white', padding: '1px 6px', boxShadow: window.FIELD, fontSize: 11 }}>
          joe.dev — Personal Homepage
        </div>
        <Win95Btn style={{ minWidth: 40, padding: '1px 8px' }}>Go</Win95Btn>
      </div>
      {/* page */}
      <div style={{ flex: 1, background: 'white', padding: '16px 20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, borderBottom: '2px solid #000080', paddingBottom: 6, marginBottom: 14 }}>
          <h2 style={{ color: '#000080', fontFamily: 'Arial, sans-serif', fontSize: 18, margin: 0 }}>Joe's Links</h2>
          <span style={{ color: '#888', fontSize: 10 }}>joe.dev — Last visited: today</span>
        </div>
        {links.map(link => (
          <div key={link.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, padding: '4px 0', borderBottom: '1px solid #f0f0f0' }}>
            <W95Icon type={link.type} size={22} />
            <div>
              <div style={{ color: '#0000cc', textDecoration: 'underline', cursor: 'pointer', fontSize: 12 }}>{link.name}</div>
              <div style={{ color: '#666', fontSize: 10 }}>{link.url} — {link.desc}</div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 16, padding: '6px 10px', background: '#ffffcc', border: '1px solid #cccc00', fontSize: 10 }}>
          ⚠ This site is best viewed in Internet Explorer 4.0 at 800×600 resolution.
        </div>
      </div>
      {/* status */}
      <div style={{ padding: '1px 6px', borderTop: '1px solid #808080', fontSize: 10, color: '#444', flexShrink: 0 }}>
        Done &nbsp;|&nbsp; Internet zone
      </div>
    </div>
  );
};

// ── Recycle Bin ─────────────────────────────────────────────────
const RecycleBinApp = () => {
  const [items, setItems] = React.useState([
    { id: 1, name: 'my_first_spaghetti_code.py', date: '12/03/2018', size: '2.3 KB' },
    { id: 2, name: 'definitely_not_a_bug.sql', date: '07/11/2019', size: '1.1 KB' },
    { id: 3, name: 'TODO_fix_this_later.txt', date: '23/06/2020', size: '0.4 KB' },
    { id: 4, name: 'temp_FINAL_v3_REAL_FINAL.ipynb', date: '14/02/2021', size: '8.7 KB' },
    { id: 5, name: 'delete_prod_data_DO_NOT_RUN.sh', date: '01/04/2022', size: '0.2 KB' },
    { id: 6, name: 'select_star_from_everything.sql', date: '30/09/2019', size: '3.1 KB' },
  ]);
  const [sel, setSel] = React.useState(null);

  return (
    <div style={{ fontFamily: "'MS Sans Serif', Tahoma, sans-serif", fontSize: 11, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '4px 8px', background: '#ffffcc', borderBottom: '1px solid #ccc', fontSize: 10, flexShrink: 0 }}>
        ⚠ These files have been deleted. Some things are better left forgotten.
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#c0c0c0', position: 'sticky', top: 0 }}>
              {['Name', 'Date Deleted', 'Original Size'].map(h => (
                <th key={h} style={{ padding: '2px 8px', textAlign: 'left', borderRight: '1px solid #808080', boxShadow: window.RAISED, fontWeight: 'bold', fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} onClick={() => setSel(item.id)} style={{ background: sel === item.id ? '#000080' : 'transparent', color: sel === item.id ? 'white' : '#000', cursor: 'default', borderBottom: '1px solid #efefef' }}>
                <td style={{ padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <W95Icon type="txt" size={14} />{item.name}
                </td>
                <td style={{ padding: '3px 8px' }}>{item.date}</td>
                <td style={{ padding: '3px 8px' }}>{item.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', gap: 6, padding: '6px 8px', borderTop: '1px solid #808080', flexShrink: 0 }}>
        <Win95Btn style={{ minWidth: 110 }} onClick={() => sel && setItems(i => i.filter(x => x.id !== sel))}>
          Delete Permanently
        </Win95Btn>
        <Win95Btn style={{ minWidth: 80 }}>Restore</Win95Btn>
        <span style={{ marginLeft: 'auto', alignSelf: 'center', color: '#666', fontSize: 10 }}>{items.length} item(s)</span>
      </div>
    </div>
  );
};

Object.assign(window, { AboutApp, ProjectsApp, ResumeApp, SkillsApp, ContactApp, IEApp, RecycleBinApp });

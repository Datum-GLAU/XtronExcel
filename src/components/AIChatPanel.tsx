import { useState, useRef, useEffect } from 'react'

interface Msg { id: string; role: 'user' | 'ai'; content: string; time: string; type?: 'text' | 'code' | 'formula' | 'table' }

const INIT: Msg[] = [{
  id: '0', role: 'ai',
  content: "Hello! I'm GPT-EXCEL — your AI spreadsheet assistant.\n\nI can help you:\n- **Generate Excel files** from natural language\n- **Write & explain formulas** (VLOOKUP, SUMIF, INDEX/MATCH, etc.)\n- **Analyze data** and create pivot tables\n- **Build KPI dashboards** and financial models\n- **Clean and format** your spreadsheet data\n\nJust describe what you need!",
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
}]

const RESPONSES: Record<string, string> = {
  vlookup: "Here's the VLOOKUP formula:\n\n```excel\n=VLOOKUP(lookup_value, table_array, col_index, [range_lookup])\n```\n\n**Example:** Find a price by product ID:\n```excel\n=VLOOKUP(A2, ProductTable!A:C, 3, FALSE)\n```\n\n- `A2` = the value you're looking up\n- `ProductTable!A:C` = where to search\n- `3` = return the 3rd column\n- `FALSE` = exact match\n\n**Alternative (more powerful):** INDEX/MATCH:\n```excel\n=INDEX(C:C, MATCH(A2, A:A, 0))\n```",
  sumif: "SUMIF formula:\n\n```excel\n=SUMIF(range, criteria, [sum_range])\n```\n\n**Example:** Sum sales for 'North' region:\n```excel\n=SUMIF(B:B, \"North\", C:C)\n```\n\n**SUMIFS** (multiple conditions):\n```excel\n=SUMIFS(C:C, B:B, \"North\", D:D, \">1000\")\n```",
  pivot: "I'll create a pivot table for you! Here's the Python code:\n\n```python\nimport pandas as pd\n\n# Load your data\ndf = pd.read_csv('data.csv')\n\n# Create pivot table\npivot = pd.pivot_table(\n    df,\n    values='Sales',\n    index='Region',\n    columns='Product',\n    aggfunc='sum',\n    fill_value=0,\n    margins=True\n)\n\n# Export to Excel\npivot.to_excel('pivot_output.xlsx')\nprint(pivot)\n```\n\nGo to **Excel Sheet → Generate tab** and type: *\"Create pivot table showing sales by region and product\"*",
  budget: "Here's what I'll include in your budget tracker:\n\n**Structure:**\n- 📊 Monthly Income vs Expenses\n- 🏷️ Category breakdown (Housing, Food, Transport, etc.)\n- 📈 Running totals with formulas\n- 🚨 Conditional formatting (red = overspent)\n- 📉 Summary chart (bar + line combo)\n\n**Key formulas:**\n```excel\nNet Savings: =B2-B3\nSavings %:   =B4/B2*100\nRunning Total: =SUM($C$2:C2)\n```\n\nClick **Generate** in the Excel Sheet module and paste: *\"Monthly personal budget tracker with categories, running totals, and overspend alerts\"*",
  forecast: "Here's a data forecasting approach:\n\n```python\nimport pandas as pd\nimport numpy as np\nfrom sklearn.linear_model import LinearRegression\n\n# Load historical data\ndf = pd.read_excel('sales.xlsx')\n\n# Prepare features\nX = df[['Month_Num']].values\ny = df['Sales'].values\n\n# Train model\nmodel = LinearRegression()\nmodel.fit(X, y)\n\n# Forecast next 12 months\nfuture = np.array([[i] for i in range(len(X)+1, len(X)+13)])\nforecast = model.predict(future)\n\nprint(f'Next month forecast: ${forecast[0]:,.0f}')\n```\n\n**Trend formula in Excel:**\n```excel\n=FORECAST.ETS(target_date, values, timeline)\n```",
  chart: "I support these chart types in Excel generation:\n\n| Chart Type | Best For | Excel Type |\n|---|---|---|\n| Bar/Column | Comparisons | xlColumnClustered |\n| Line | Trends over time | xlLine |\n| Pie/Donut | Proportions | xlPie |\n| Scatter | Correlations | xlXYScatter |\n| Area | Cumulative | xlArea |\n| Waterfall | Financial flows | xlWaterfall |\n| Combo | Mixed data | xlCombo |\n\nAsk me: *\"Create a combo chart with revenue bars and profit margin line\"*",
  formula: "Here are the most powerful Excel formulas:\n\n**Lookup:**\n```excel\n=VLOOKUP(A2, B:D, 3, FALSE)\n=INDEX(C:C, MATCH(A2, A:A, 0))\n=XLOOKUP(A2, A:A, C:C, \"Not found\")\n```\n\n**Conditional:**\n```excel\n=SUMIF(B:B, \"North\", C:C)\n=COUNTIFS(A:A, \">100\", B:B, \"Active\")\n=AVERAGEIF(C:C, \">0\")\n```\n\n**Text:**\n```excel\n=TEXTJOIN(\", \", TRUE, A1:A10)\n=LEFT(A1, FIND(\" \", A1)-1)\n=SUBSTITUTE(A1, \"old\", \"new\")\n```\n\n**Financial:**\n```excel\n=NPV(rate, cashflows)\n=IRR(cashflows)\n=PMT(rate, nper, pv)\n```",
  kpi: "Here's a KPI dashboard structure:\n\n**Metrics to include:**\n- 💰 Revenue (MoM change)\n- 📈 Growth Rate (%)\n- 👥 Customer Count\n- 🔄 Churn Rate\n- 💡 CAC (Customer Acquisition Cost)\n- 📦 MRR / ARR\n\n**Sparkline formula:**\n```excel\n=SPARKLINE(B2:M2, {\"charttype\",\"bar\";\"color\",\"#3b82f6\"})\n```\n\nType in Excel Generator: *\"KPI dashboard with revenue, growth, customer metrics, sparklines, and MoM comparisons with conditional formatting\"*",
  clean: "Data cleaning operations I can automate:\n\n```python\nimport pandas as pd\n\ndf = pd.read_excel('dirty_data.xlsx')\n\n# Remove duplicates\ndf = df.drop_duplicates()\n\n# Fill missing values\ndf['Revenue'].fillna(df['Revenue'].median(), inplace=True)\n\n# Standardize text\ndf['Name'] = df['Name'].str.strip().str.title()\n\n# Fix dates\ndf['Date'] = pd.to_datetime(df['Date'], errors='coerce')\n\n# Remove outliers (IQR method)\nQ1 = df['Sales'].quantile(0.25)\nQ3 = df['Sales'].quantile(0.75)\nIQR = Q3 - Q1\ndf = df[~((df['Sales'] < Q1-1.5*IQR) | (df['Sales'] > Q3+1.5*IQR))]\n\ndf.to_excel('clean_data.xlsx', index=False)\nprint(f'Cleaned: {len(df)} rows remaining')\n```",
  default: "I'll help you with that! Based on your request, I can:\n\n1. **Generate Python code** using `openpyxl` and `pandas`\n2. **Create Excel formulas** optimized for your use case\n3. **Build visualizations** — charts, KPIs, dashboards\n\nFor the best results, go to **Excel Sheet → Generate** and describe your spreadsheet in detail. Include:\n- Column names and data types\n- Any formulas or calculations needed\n- Formatting preferences\n- Chart types you want\n\nWhat specific spreadsheet would you like to create?",
}

function getResponse(input: string): string {
  const l = input.toLowerCase()
  if (l.includes('vlookup') || l.includes('lookup') || l.includes('index match')) return RESPONSES.vlookup
  if (l.includes('sumif') || l.includes('countif') || l.includes('averageif')) return RESPONSES.sumif
  if (l.includes('pivot')) return RESPONSES.pivot
  if (l.includes('budget') || l.includes('expense') || l.includes('income')) return RESPONSES.budget
  if (l.includes('forecast') || l.includes('predict') || l.includes('trend')) return RESPONSES.forecast
  if (l.includes('chart') || l.includes('graph') || l.includes('visual')) return RESPONSES.chart
  if (l.includes('formula') || l.includes('function') || l.includes('calculate')) return RESPONSES.formula
  if (l.includes('kpi') || l.includes('dashboard') || l.includes('metric')) return RESPONSES.kpi
  if (l.includes('clean') || l.includes('duplicate') || l.includes('missing')) return RESPONSES.clean
  return RESPONSES.default
}

const SUGGESTIONS = [
  'Create a monthly budget tracker', 'Explain VLOOKUP with example', 'Generate sales pivot table',
  'Build KPI dashboard', 'Write forecasting formula', 'Clean duplicate data',
]

const renderContent = (text: string, onCopy: (t: string) => void, copied: string) => {
  const parts = text.split(/(```[\s\S]*?```|\*\*.*?\*\*|\n\n---\n\n)/g)
  return parts.map((part, i) => {
    if (part.startsWith('```') && part.endsWith('```')) {
      const lang = part.match(/```(\w+)/)?.[1] || 'code'
      const code = part.slice(3 + lang.length, -3).trim()
      return (
        <div key={i} style={{ margin: '8px 0', background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 7, overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 10px', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
            <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{lang}</span>
            <button onClick={() => onCopy(code)} style={{ fontSize: '0.65rem', color: copied === code ? 'var(--green)' : 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}>
              {copied === code ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <pre style={{ padding: '10px 12px', fontSize: '0.73rem', fontFamily: 'var(--font-mono)', overflowX: 'auto', margin: 0, color: 'var(--code-text)', lineHeight: 1.6 }}>{code}</pre>
        </div>
      )
    }
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} style={{ fontWeight: 600, color: 'var(--text)' }}>{part.slice(2, -2)}</strong>
    if (part === '\n\n---\n\n') return <hr key={i} style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '10px 0' }}/>
    return <span key={i}>{part}</span>
  })
}

export default function AIChatPanel() {
  const [msgs, setMsgs] = useState<Msg[]>(INIT)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [showSugg, setShowSugg] = useState(true)
  const [listening, setListening] = useState(false)
  const [tab, setTab] = useState<'chat' | 'history' | 'settings'>('chat')
  const [copied, setCopied] = useState('')
  const [model, setModel] = useState('GPT-4o')
  const [temp, setTemp] = useState('Balanced')
  const [stream, setStream] = useState(true)
  const [tts, setTts] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {})
    setCopied(text); setTimeout(() => setCopied(''), 2000)
  }

  const send = async (text?: string) => {
    const content = (text || input).trim()
    if (!content || loading) return
    const uMsg: Msg = { id: Date.now().toString(), role: 'user', content, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMsgs(p => [...p, uMsg]); setInput(''); setLoading(true); setShowSugg(false)
    await new Promise(r => setTimeout(r, 800 + Math.random() * 1000))
    const aiMsg: Msg = { id: (Date.now() + 1).toString(), role: 'ai', content: getResponse(content), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMsgs(p => [...p, aiMsg]); setLoading(false)
  }

  const onKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }

  const toggleVoice = () => {
    setListening(p => !p)
    if (!listening && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const rec = new SR(); rec.continuous = false; rec.lang = 'en-US'
      rec.onresult = (e: any) => { setInput(e.results[0][0].transcript); setListening(false) }
      rec.onerror = () => setListening(false); rec.start()
    }
  }

  if (collapsed) return (
    <div style={{ width: 40, background: 'var(--bg)', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 12, gap: 8, flexShrink: 0, cursor: 'pointer' }} onClick={() => setCollapsed(false)}>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', writingMode: 'vertical-lr' as any }}>AI</div>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', animation: 'pulse-soft 2s infinite' }}/>
    </div>
  )

  return (
    <aside style={{ width: 285, flexShrink: 0, background: 'var(--bg)', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', padding: '0 10px', borderBottom: '1px solid var(--border)', gap: 8, flexShrink: 0 }}>
        <div style={{ width: 22, height: 22, background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 800, borderRadius: 5, color: '#fff', flexShrink: 0 }}>G</div>
        <div>
          <div style={{ fontSize: '0.775rem', fontWeight: 600, lineHeight: 1.2, color: 'var(--text)' }}>GPT Assistant</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 3 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }}/>
            Online · {model}
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
          <button className="btn btn-icon-sm btn-ghost" data-tip="Clear" onClick={() => { setMsgs(INIT); setShowSugg(true) }}>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
          </button>
          <button className="btn btn-icon-sm btn-ghost" data-tip="Collapse" onClick={() => setCollapsed(true)}>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', padding: '3px 8px 0', flexShrink: 0 }}>
        {(['chat', 'history', 'settings'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '5px 0', fontSize: '0.7rem', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', color: tab === t ? 'var(--text)' : 'var(--text-muted)', borderBottom: tab === t ? '1.5px solid var(--blue)' : '1.5px solid transparent', textTransform: 'capitalize', transition: 'all var(--tr)' }}>{t}</button>
        ))}
      </div>

      {/* Settings tab */}
      {tab === 'settings' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[{ label: 'Model', opts: ['GPT-4o', 'GPT-4', 'GPT-3.5', 'Claude 3'], val: model, set: setModel },
            { label: 'Temperature', opts: ['Creative (0.9)', 'Balanced (0.7)', 'Precise (0.3)', 'Deterministic (0)'], val: temp, set: setTemp },
          ].map(s => (
            <div key={s.label} className="input-wrap">
              <label className="input-label">{s.label}</label>
              <select className="input" style={{ fontSize: '0.75rem' }} value={s.val} onChange={e => s.set(e.target.value)}>
                {s.opts.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
          {[{ label: 'Stream responses', val: stream, set: setStream }, { label: 'Context-aware suggestions', val: true, set: () => {} }, { label: 'Text-to-speech', val: tts, set: setTts }].map(sw => (
            <div key={sw.label} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => sw.set((p: boolean) => !p)}>
              <div className={`switch${sw.val ? ' on' : ''}`}/>
              <span style={{ fontSize: '0.775rem', color: 'var(--text-sec)' }}>{sw.label}</span>
            </div>
          ))}
          <div style={{ marginTop: 8, padding: 10, background: 'var(--surface-2)', borderRadius: 8, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>API Status</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--green)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }}/>
              Connected · GPT-4o ready
            </div>
          </div>
        </div>
      )}

      {/* History tab */}
      {tab === 'history' && (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {[{ title: 'Q4 Budget Analysis', date: 'Today, 2:30 PM', msgs: 8, icon: '⊞' }, { title: 'Sales Pivot Table', date: 'Today, 11:20 AM', msgs: 5, icon: '◬' }, { title: 'Employee Tracker', date: 'Yesterday', msgs: 12, icon: '◱' }, { title: 'Revenue Forecast 2026', date: '2 days ago', msgs: 6, icon: '📈' }, { title: 'VLOOKUP Help', date: '3 days ago', msgs: 4, icon: '🔍' }].map((h, i) => (
            <div key={i} style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background var(--tr)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-dim)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              onClick={() => setTab('chat')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 13 }}>{h.icon}</span>
                <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text)' }}>{h.title}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                <span>{h.date}</span><span>{h.msgs} msgs</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chat tab */}
      {tab === 'chat' && (
        <>
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {msgs.map(m => {
              const isUser = m.role === 'user'
              return (
                <div key={m.id} style={{ display: 'flex', gap: 8, flexDirection: isUser ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
                  {!isUser && <div style={{ width: 24, height: 24, flexShrink: 0, background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 800, borderRadius: 6, color: '#fff' }}>G</div>}
                  <div style={{ maxWidth: '83%', display: 'flex', flexDirection: 'column', gap: 3, alignItems: isUser ? 'flex-end' : 'flex-start' }}>
                    <div style={{ padding: '8px 11px', background: isUser ? 'var(--blue)' : 'var(--surface-2)', color: isUser ? '#fff' : 'var(--text)', borderRadius: isUser ? '10px 10px 2px 10px' : '10px 10px 10px 2px', border: isUser ? 'none' : '1px solid var(--border)', fontSize: '0.8rem', lineHeight: 1.55, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                      {renderContent(m.content, copy, copied)}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', padding: '0 2px' }}>{m.time}</div>
                  </div>
                </div>
              )
            })}

            {loading && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                <div style={{ width: 24, height: 24, background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 800, borderRadius: 6, color: '#fff' }}>G</div>
                <div style={{ padding: '10px 13px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '10px 10px 10px 2px', display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[0, 1, 2].map(i => <div key={i} className="typing-dot" style={{ animationDelay: `${i * 0.18}s` }}/>)}
                </div>
              </div>
            )}

            {showSugg && !loading && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>Try asking...</div>
                {SUGGESTIONS.map((s, i) => (
                  <button key={i} onClick={() => send(s)} style={{ padding: '6px 10px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 7, fontSize: '0.75rem', color: 'var(--text-sec)', cursor: 'pointer', textAlign: 'left', transition: 'all var(--tr)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--blue-border)'; (e.currentTarget as HTMLElement).style.background = 'var(--blue-dim)'; (e.currentTarget as HTMLElement).style.color = 'var(--blue)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.background = 'var(--surface)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-sec)' }}
                  >{s}</button>
                ))}
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Input area */}
          <div style={{ borderTop: '1px solid var(--border)', padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="btn btn-icon-sm btn-ghost" data-tip="Attach file" style={{ fontSize: 12, color: 'var(--text-sec)' }}>+</button>
              <button className="btn btn-icon-sm btn-ghost" data-tip="Insert formula" style={{ fontSize: 10, color: 'var(--text-sec)' }}>ƒ</button>
              <button className="btn btn-icon-sm btn-ghost" data-tip="Add context" style={{ fontSize: 11, color: 'var(--text-sec)' }}>⊞</button>
              <span style={{ flex: 1 }}/>
              <button className="btn btn-icon-sm btn-ghost" data-tip={listening ? 'Stop' : 'Voice input'} onClick={toggleVoice} style={{ color: listening ? 'var(--red)' : 'var(--text-sec)' }}>
                {listening ? (
                  <div className="voice-wave">{[10,18,14,20,12].map((h, i) => <div key={i} className="voice-bar" style={{ height: h, animationDelay: `${i*0.08}s` }}/>)}</div>
                ) : (
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1={12} y1={19} x2={12} y2={23}/><line x1={8} y1={23} x2={16} y2={23}/></svg>
                )}
              </button>
            </div>

            <div style={{ display: 'flex', gap: 6, background: 'var(--surface)', border: '1px solid var(--border-2)', borderRadius: 8, padding: '6px 8px', transition: 'border-color var(--tr)' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--blue)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-2)')}
            >
              <textarea ref={inputRef} value={input} onChange={e => { setInput(e.target.value); const el = e.target; el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 100) + 'px' }} onKeyDown={onKey} placeholder="Ask anything..." disabled={loading}
                style={{ flex: 1, border: 'none', background: 'transparent', resize: 'none', outline: 'none', fontSize: '0.8rem', color: 'var(--text)', fontFamily: 'var(--font-body)', lineHeight: 1.5, minHeight: 20, maxHeight: 100, caretColor: 'var(--blue)' }} rows={1}
              />
              <button className="btn btn-icon-sm btn-blue" onClick={() => send()} disabled={!input.trim() || loading} style={{ alignSelf: 'flex-end' }}>
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1={22} y1={2} x2={11} y2={13}/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
              <kbd>↵</kbd> send · <kbd>⇧↵</kbd> newline · Powered by Datum_GLAU
            </div>
          </div>
        </>
      )}
    </aside>
  )
}
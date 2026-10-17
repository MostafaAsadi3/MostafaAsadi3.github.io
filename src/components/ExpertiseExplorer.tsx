import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react';
import { expertise } from '../data/portfolio';

export default function ExpertiseExplorer() {
  const [selected, setSelected] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const reduced = useReducedMotion();
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const area = expertise[selected];

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % expertise.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + expertise.length) % expertise.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = expertise.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <LazyMotion features={domAnimation} strict><div className="expertise-explorer">
      <div className="expertise-tabs" role="tablist" aria-label="Engineering expertise" aria-orientation="vertical" aria-busy={!ready}>
        {expertise.map((item, index) => (
          <button
            key={item.id} id={`tab-${item.id}`} role="tab"
            disabled={!ready}
            aria-selected={selected === index} aria-controls="expertise-panel"
            tabIndex={selected === index ? 0 : -1}
            ref={(element) => { tabs.current[index] = element; }}
            onClick={() => setSelected(index)} onKeyDown={(event) => navigate(event, index)}
            className={`expertise-tab ${selected === index ? 'is-selected' : ''}`}
          >
            <span className="tab-index">{String(index + 1).padStart(2, '0')}</span>
            <span>{item.label}</span><span className="tab-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
        <span className="explorer-hint mono"><span aria-hidden="true">↑ ↓</span> Explore the disciplines</span>
      </div>
      <div className="expertise-panel" id="expertise-panel" role="tabpanel" aria-labelledby={`tab-${area.id}`} tabIndex={0}>
        <div className="panel-meta mono"><span>ENGINEERING / {String(selected + 1).padStart(2, '0')}</span><span className="tiny-cross" aria-hidden="true">+</span></div>
        <AnimatePresence initial={false} mode="wait">
          <m.div key={area.id} className="panel-content"
            initial={reduced ? false : { opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -6 }} transition={{ duration: reduced ? 0 : 0.18 }}>
            <p className="panel-eyebrow mono">{area.eyebrow}</p>
            <h3>{area.title.split('\n').map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</h3>
            <p className="panel-description">{area.description}</p>
            <ul className="focus-topics">{area.topics.map(topic => <li key={topic}><span aria-hidden="true">↳</span>{topic}</li>)}</ul>
            <div className="flow-diagram" aria-label={area.flow.join(' to ')}>
              {area.flow.map((node, i) => <div className="flow-step" key={node}><span className="flow-node">{node}</span>{i < 3 && <span className="flow-connector" aria-hidden="true"><i />→</span>}</div>)}
            </div>
            <p className="panel-principle"><span aria-hidden="true">↳</span>{area.principle}</p>
          </m.div>
        </AnimatePresence>
      </div>
    </div></LazyMotion>
  );
}

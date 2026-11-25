import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div className="accordion" role="region" aria-label="Frequently Asked Questions">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className={`accordion-item ${isOpen ? 'is-open' : ''}`}>
            <button 
              type="button" 
              className="accordion-button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <ChevronDown 
                size={18} 
                style={{ 
                  transform: isOpen ? 'rotate(180deg)' : 'none', 
                  transition: 'transform 0.2s',
                  color: isOpen ? 'var(--brand-primary)' : '#64748B',
                  flexShrink: 0,
                  marginLeft: 12
                }} 
              />
            </button>
            {isOpen && (
              <div className="accordion-body">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

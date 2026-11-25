/**
 * Arora Tech Solutions - Full Stack Developer Role Scripts
 * Interactive ecosystem diagram node inspection & technology tab switching.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Interactive Architecture Ecosystem Diagram
  const nodes = document.querySelectorAll('.ecosystem-node');
  const insightHeader = document.getElementById('ecosystem-insight-title');
  const insightDesc = document.getElementById('ecosystem-insight-desc');

  const nodeInsights = {
    'frontend': {
      title: 'Frontend Tier: Client-Side React / Next.js & State Architecture',
      desc: 'Our full stack engineers architect component-driven user interfaces with sub-second time-to-interactive, client-side caching (React Query / SWR), accessible semantic HTML5, and responsive CSS token systems.'
    },
    'gateway': {
      title: 'API Gateway & Middleware Layer: Security, Routing & Rate Limiting',
      desc: 'Orchestrating RESTful endpoints, GraphQL schemas, JWT authentication, request validation, and CORS policies between heterogeneous clients and distributed backend services.'
    },
    'backend': {
      title: 'Backend Services: Node.js / Python Business Logic & Microservices',
      desc: 'Designing resilient server logic, asynchronous queue workers (BullMQ, Celery), background job processing, event dispatchers, and domain-driven design services built for horizontal scalability.'
    },
    'database': {
      title: 'Persistence Layer: PostgreSQL / MongoDB / Redis Caching',
      desc: 'Relational data modeling, schema migrations, composite indexing, transaction isolation levels, connection pooling, and multi-tier in-memory caching to guarantee high-throughput read/write concurrency.'
    }
  };

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('is-selected'));
      node.classList.add('is-selected');

      const tierKey = node.getAttribute('data-tier');
      if (tierKey && nodeInsights[tierKey] && insightHeader && insightDesc) {
        insightHeader.textContent = nodeInsights[tierKey].title;
        insightDesc.textContent = nodeInsights[tierKey].desc;
      }
    });
  });

  // 2. Tech Stack Tabs Switching
  const tabBtns = document.querySelectorAll('.stack-tab-btn');
  const tabPanels = document.querySelectorAll('.stack-tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');

      tabBtns.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(p => p.classList.remove('is-active'));

      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      const activePanel = document.getElementById('tab-panel-' + target);
      if (activePanel) {
        activePanel.classList.add('is-active');
      }
    });
  });
});

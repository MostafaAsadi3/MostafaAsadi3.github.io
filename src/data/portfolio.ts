export const profile = {
  name: 'Mostafa Asadi',
  title: 'Senior Frontend Engineer',
  email: 'icetruckkiller3@gmail.com',
  github: 'https://github.com/MostafaAsadi3',
  linkedin: 'https://www.linkedin.com/in/mostafa-asadi-78a597271/',
  description:
    'Mostafa Asadi, Senior Frontend Engineer specializing in React, Next.js and TypeScript. Explore banking projects, frontend architecture and selected work.',
};

export interface Expertise {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  topics: string[];
  principle: string;
  flow: [string, string, string, string];
}

// The added subjects describe engineering focus areas, not invented employment
// achievements. Confirm specific tools and depth before publishing new claims.
export const expertise: Expertise[] = [
  {
    id: 'architecture', label: 'Frontend architecture', eyebrow: 'SYSTEMS THAT MAKE SENSE',
    title: 'Clear boundaries.\nRoom to evolve.',
    description: 'Modular frontends with clear responsibilities, predictable dependencies, and room to evolve.',
    topics: ['Feature boundaries', 'Component composition', 'Separation of concerns', 'Maintainable systems'],
    principle: 'Keep the parts independent. Make the whole feel connected.',
    flow: ['Interface', 'Features', 'Domain', 'Services'],
  },
  {
    id: 'typescript', label: 'JavaScript & TypeScript', eyebrow: 'DEPTH BEHIND THE SYNTAX',
    title: 'Model the problem.\nMake intent explicit.',
    description: 'Clear type contracts, confident async code, and a solid understanding of the JavaScript runtime.',
    topics: ['Generics & narrowing', 'Discriminated unions', 'Async & event loop', 'Error handling'],
    principle: 'Use types to communicate intent and prevent invalid states.',
    flow: ['Input', 'Validate', 'Narrow', 'Resolve'],
  },
  {
    id: 'react', label: 'React & Next.js', eyebrow: 'FROM RENDER TO EXPERIENCE',
    title: 'Compose carefully.\nRender deliberately.',
    description: 'Composable components, reusable hooks, and deliberate rendering across the server–client boundary.',
    topics: ['Composition & hooks', 'Rendering strategies', 'Server / client boundaries', 'Hydration'],
    principle: 'Choose where work happens before optimizing how it happens.',
    flow: ['Compose', 'Render', 'Hydrate', 'Interact'],
  },
  {
    id: 'state', label: 'State & data flow', eyebrow: 'PREDICTABLE BY DESIGN',
    title: 'One clear flow.\nFewer surprises.',
    description: 'Clear state ownership, consistent caches, and interfaces that handle loading, updates, and failure.',
    topics: ['Redux Toolkit & Zustand', 'TanStack Query', 'Cache invalidation', 'Optimistic updates'],
    principle: 'Keep a single source of truth. Derive what can be derived.',
    flow: ['Request', 'Cache', 'Update', 'Reconcile'],
  },
  {
    id: 'performance', label: 'Performance engineering', eyebrow: 'FAST IS A DESIGN DECISION',
    title: 'Measure first.\nMake every byte count.',
    description: 'Profile real bottlenecks. Improve the delivery and rendering paths that shape the experience.',
    topics: ['Profiling & Web Vitals', 'Code splitting', 'Render optimization', 'List virtualization'],
    principle: 'Optimize the user’s experience, guided by measurements.',
    flow: ['Measure', 'Identify', 'Optimize', 'Verify'],
  },
  {
    id: 'quality', label: 'Testing & reliability', eyebrow: 'CONFIDENCE TO KEEP SHIPPING',
    title: 'Test the behavior.\nProtect the essentials.',
    description: 'Useful unit, integration, and end-to-end coverage for essential journeys and failure states.',
    topics: ['Jest & unit testing', 'Integration testing', 'End-to-end strategy', 'Resilient error states'],
    principle: 'A useful test protects behavior through implementation changes.',
    flow: ['Arrange', 'Interact', 'Assert', 'Repeat'],
  },
  {
    id: 'interfaces', label: 'Design systems & access', eyebrow: 'DETAILS THAT INCLUDE EVERYONE',
    title: 'Consistent by nature.\nAccessible by intent.',
    description: 'Reusable UI foundations with responsive layouts, semantic markup, and keyboard access.',
    topics: ['Design tokens', 'Component APIs', 'Keyboard & focus', 'Semantic HTML'],
    principle: 'A component is complete when people can actually use it.',
    flow: ['Tokens', 'Primitives', 'Patterns', 'Experience'],
  },
  {
    id: 'security', label: 'Frontend security', eyebrow: 'TRUST AT EVERY BOUNDARY',
    title: 'Handle trust\nwith care.',
    description: 'Thoughtful authentication, session handling, and validation at the browser’s trust boundaries.',
    topics: ['SSO & authentication', 'Session handling', 'XSS prevention', 'Input validation'],
    principle: 'The interface reflects permissions; the server enforces them.',
    flow: ['Authenticate', 'Authorize', 'Validate', 'Protect'],
  },
  {
    id: 'delivery', label: 'Quality & delivery', eyebrow: 'CRAFT THROUGH THE LAST MILE',
    title: 'Build with clarity.\nShip with confidence.',
    description: 'Readable code, focused reviews, and repeatable delivery that make the next change easier.',
    topics: ['Code review & refactoring', 'Git & Git Flow', 'Docker & CI/CD', 'Azure DevOps'],
    principle: 'Make the next change easier for the next person.',
    flow: ['Develop', 'Review', 'Validate', 'Deliver'],
  },
];

export const toolkit = [
  { label: 'Core', items: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Next.js'] },
  { label: 'State', items: ['Redux Toolkit', 'TanStack Query', 'Zustand'] },
  { label: 'Interface', items: ['Tailwind CSS', 'Material UI', 'Ant Design', 'shadcn/ui'] },
  { label: 'Integration', items: ['REST', 'GraphQL', 'WebSocket', 'Postman', 'Swagger'] },
  { label: 'Delivery', items: ['Git', 'Git Flow', 'Docker', 'CI/CD', 'Azure DevOps / TFS', 'Vite'] },
  { label: 'Testing & data', items: ['Jest', 'Redis', 'SQL Server', 'MongoDB', 'Visual Studio'] },
];

export const work = [
  {
    id: 'sepah', category: 'BANK SEPAH / DIGITAL BANKING', title: 'Bank Sepah',
    subtitle: 'Internet banking',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'SSR / SSG'],
    description: 'Internet banking for Bank Sepah, bringing banking services into a web application.',
    contribution: 'Frontend development of the Bank Sepah internet banking application.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML', 'CSS', 'SSR', 'SSG'],
    implementation: [
      { label: 'Architecture & rendering', text: 'Next.js with server-side rendering (SSR) and static site generation (SSG). React component composition, typed component contracts, and a clear separation between presentation and data access.' },
      { label: 'Frontend engineering', text: 'Responsive layouts with Tailwind CSS, reusable interface patterns, API integration, form validation, and explicit loading and error states. Rendering decisions account for the distinction between static content and request-specific banking data.' },
    ],
    note: 'Conceptual interface study; not a screenshot of the live banking product.',
  },
  {
    id: 'scf', category: 'TOSAN / SUPPLY CHAIN FINANCE', title: 'Tosan SCF',
    subtitle: 'Electronic promissory notes & bills of exchange',
    tags: ['React', 'Redux', 'Bootstrap', 'SCF'],
    description: 'A supply chain finance project for Tosan, covering electronic promissory notes and bills of exchange.',
    contribution: 'Frontend development for electronic promissory note and bill of exchange workflows.',
    stack: ['React', 'Redux', 'Bootstrap', 'JavaScript', 'HTML', 'CSS'],
    implementation: [
      { label: 'Architecture & state', text: 'A component-based React frontend with Redux for shared application state. Feature boundaries separate electronic promissory note and bill of exchange workflows, with actions and selectors keeping state changes predictable.' },
      { label: 'Frontend engineering', text: 'Bootstrap layouts and reusable form patterns, API-connected views, input validation, and clear submission feedback. Asynchronous workflows account for loading, success, and failure states across banking instrument interactions.' },
    ],
    note: 'Conceptual document workflow; no real financial instruments or client data.',
  },
  {
    id: 'banking', category: 'BANKING / IDENTITY', title: 'Banking identity & access',
    subtitle: 'SSO monitoring & client management', year: '2024–25',
    tags: ['React', 'Redux', 'TypeScript', 'Tailwind CSS', 'Modular architecture'],
    description: 'A banking client management and monitoring application with SSO, token handling, access levels, and configurable dashboards.',
    contribution: 'Frontend development of management interfaces, permissions-aware views, and dynamic dashboard experiences.',
    stack: ['React', 'Redux', 'TypeScript', 'Tailwind CSS', 'Vite', 'JavaScript', 'HTML', 'CSS'],
    implementation: [
      { label: 'Architecture & state', text: 'A modular React application with TypeScript contracts, Redux state management, and reusable Tailwind CSS components. Feature modules separate identity, client management, permissions, and dashboard concerns.' },
      { label: 'Frontend engineering', text: 'SSO integration, token and session handling, permissions-aware views, and configurable dashboards. Shared API handling and explicit loading and error states keep management workflows consistent; frontend permission checks complement server-side authorization.' },
    ],
    note: 'Conceptual interface below; no client data is displayed.',
  },
  {
    id: 'admin', category: 'ENTERPRISE / OPERATIONS', title: 'Enterprise operations',
    subtitle: 'Reporting & administration dashboard', year: '2022–23',
    tags: ['SPA architecture', 'API integration', 'Reusable components'],
    description: 'A reporting and administration system integrating Shahkar, Yaqut, and Civil Registry services, alongside content and user management.',
    contribution: 'Development of administration interfaces and single-page application views for a leasing company.',
    stack: ['JavaScript', 'HTML', 'CSS', 'SPA', 'API integration'],
    implementation: [
      { label: 'Architecture & integration', text: 'A single-page application organized around reporting, administration, content, and user management. Service boundaries separate Shahkar, Yaqut, and Civil Registry integrations from presentation logic.' },
      { label: 'Frontend engineering', text: 'Reusable tables, forms, and interface patterns; consistent validation and service error handling; and maintainable feature boundaries. The engineering focus is clear data flow, responsive layouts, accessible controls, and predictable application states.' },
    ],
    note: 'Illustrative dashboard; values and shapes are demonstration content.',
  },
];

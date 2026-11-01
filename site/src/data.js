export const links = {
  linkedin: "https://linkedin.com/in/prakash7050",
  github: "https://github.com/prakash7050",
  x: "https://x.com/hii_prakash",
  instagram: "https://www.instagram.com/error_with_404",
  facebook: "https://www.facebook.com/share/1S8UVAk2Gn/",
  email: "mailto:prak5682@gmail.com",
  phone: "tel:+917907221941",
  whatsapp: "https://wa.me/917907221941",
  portfolio: "https://jyoti-prakash-test-lokpal-1.onrender.com",
};

export const roles = [
  "Full-Stack Developer",
  "React · Next.js · Node.js",
  "AI / LLM Workflows",
  "FinTech & SaaS Builder",
];

export const stats = [
  { value: 5, suffix: "+", label: "Years experience" },
  { value: 5, suffix: "", label: "Companies" },
  { value: 20, suffix: "+", label: "Projects & clients" },
  { value: 3, suffix: "", label: "LLM providers" },
];

export const skills = {
  "Core": ["JavaScript", "TypeScript", "React.js", "Next.js", "Node.js", "Express", "NestJS", "Python", "FastAPI", "React Native", "Expo", "WebSockets", "JWT"],
  "Architecture": ["System Design", "Modular Monolith", "Microservices", "Event-Driven", "API-First", "BFF", "Serverless"],
  "Data & Messaging": ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "Sequelize", "Kafka", "RabbitMQ", "BullMQ"],
  "AI / Cloud": ["OpenAI", "Claude", "Gemini", "RAG", "OCR", "AWS", "Azure", "Supabase", "Docker", "Nginx", "GitHub Actions", "Vercel", "Cloudflare"],
};

export const experience = [
  {
    company: "Square Hack",
    role: "Full-Stack Developer",
    period: "Aug 2025 – Aug 2026",
    points: [
      "Built multi-domain LMS, payment, profile & admin platforms with Next.js, TypeScript, PostgreSQL, MongoDB and Redis/BullMQ.",
      "Shipped Python/FastAPI Document AI: OCR + Claude/Gemini/RAG to extract and auto-fill invoices, CVs and business data.",
      "Led PostgreSQL/MongoDB migrations, dump/restore, replication and caching for GreenStrun AI, SustainInsight (UAE), LearnWizz and NovelInfra India.",
    ],
  },
  {
    company: "Reidnax Dev Solutions",
    role: "Full-Stack Developer I",
    period: "Nov 2023 – Aug 2025",
    points: [
      "Scalable web apps for the US-based SunValue solar platform: lead-gen, savings workflows, analytics, CRM.",
      "CRM pipelines, SMS/Email workflows, secure JWT auth, Kafka/RabbitMQ queue processing.",
    ],
  },
  {
    company: "IT-TaaS",
    role: "Full-Stack Developer",
    period: "Feb 2023 – Nov 2023",
    points: [
      "React/TypeScript + MUI apps and Node.js integrations with Zoho Creator (Deluge), CRM, Analytics, Flow, Books, Desk.",
      "Reusable components, workflow automation and data-driven business features.",
    ],
  },
  {
    company: "Ascend Capital",
    role: "Software Engineer",
    period: "Dec 2021 – Jan 2023",
    points: [
      "Mobile & web apps for EV financing: dealer management, resale, inventory, customer flows.",
      "Real-time bidding, LOS/LMS, role-based access, dashboards and partner portals.",
    ],
  },
  {
    company: "Codebuckets",
    role: "Software Developer / Intern",
    period: "Apr 2020 – Dec 2021",
    points: ["Full-stack foundations across JavaScript, React.js, Node.js, APIs and databases."],
  },
];

export const projects = [
  { name: "LMS Platforms", tag: "Square Hack", desc: "AI Academy, LearnWizz, SH E-Learning — payments, profiles, admin.", stack: ["Next.js", "TypeScript", "PostgreSQL"] },
  { name: "Document AI", tag: "Square Hack", desc: "OCR + LLM extraction and auto-fill with caching and structured processing.", stack: ["FastAPI", "Claude", "Gemini", "RAG"] },
  { name: "SunValue", tag: "Reidnax · US", desc: "Solar lead generation, savings workflows, analytics and CRM.", stack: ["Next.js", "Node.js", "Kafka"] },
  { name: "CRM & Admin Suites", tag: "Reidnax", desc: "adnet admin platform, CRM lead management, elitegarud.", stack: ["React", "RabbitMQ", "JWT"] },
  { name: "EvCred", tag: "Ascend Capital", desc: "Dealer app, partner portal and LOS for EV financing with live bidding.", stack: ["React Native", "Node.js"] },
  { name: "Zoho Solutions", tag: "IT-TaaS", desc: "Creator apps, Deluge workflows and CRM automation.", stack: ["Zoho", "React", "MUI"] },
];

export const phone = { display: "+91 79072 21941", tel: "+917907221941" };

export const quotes = [
  { text: "Talk is cheap. Show me the code.", by: "Linus Torvalds" },
  { text: "First, solve the problem. Then, write the code.", by: "John Johnson" },
  { text: "Make it work, make it right, make it fast.", by: "Kent Beck" },
  { text: "Simplicity is prerequisite for reliability.", by: "Edsger W. Dijkstra" },
  { text: "Design is not just what it looks like. Design is how it works.", by: "Steve Jobs" },
  { text: "We are what we repeatedly do. Excellence is not an act, but a habit.", by: "Will Durant" },
  { text: "Premature optimization is the root of all evil.", by: "Donald Knuth" },
];

export const categories = ["All", "Debugging", "Problem Solving", "Reasoning", "Creativity", "Design Thinking", "Mindset"];

export const posts = [
  {
    id: "debug",
    category: "Debugging",
    emoji: "🐞",
    title: "Debugging Like a Detective, Not a Gambler",
    read: "4 min",
    summary: "Stop changing code at random. Build a hypothesis, test it, narrow the search.",
    body: [
      "A bug is not a mystery — it is a gap between what you believe the system does and what it actually does. Debugging is the act of closing that gap.",
      "Random edits ('let me just try this') feel productive but teach you nothing. A detective collects evidence first.",
    ],
    steps: [
      "Reproduce it reliably. If you can't reproduce it, you can't prove you fixed it.",
      "Shrink the case: remove inputs, services and code until the smallest failing example remains.",
      "Read the actual error and stack trace — slowly, top to bottom — before touching anything.",
      "Form ONE hypothesis. Predict what you will see if it is true. Then test it with a log, breakpoint or query.",
      "Binary-search the pipeline: is the data already wrong at the API? At the DB? In the queue? Halve the space each time.",
      "Fix the root cause, add a regression test, and write one line on why it happened.",
    ],
    takeaway: "Every bug fixed with understanding is a bug you will never debug twice.",
  },
  {
    id: "problem",
    category: "Problem Solving",
    emoji: "🧩",
    title: "Find Multiple Solutions Before You Pick One",
    read: "5 min",
    summary: "The first idea is rarely the best. Generate options, compare trade-offs, then commit.",
    body: [
      "Most engineers stop at the first solution that works. Strong engineers deliberately produce at least three, then choose on purpose.",
      "Example: slow list API. Option A — add a DB index. Option B — cache with Redis. Option C — paginate and denormalize. Option D — precompute with a background job (BullMQ). Each wins in a different situation.",
    ],
    steps: [
      "Restate the problem in one sentence and define 'done' with a measurable target (e.g. p95 < 300 ms).",
      "Diverge: list at least 3 approaches, including a boring one and a bold one — no judging yet.",
      "Compare on cost, risk, time, reversibility and how it scales. A small table beats a long debate.",
      "Prototype the riskiest assumption first (a spike), not the easiest part.",
      "Pick one, write down WHY, and record what would make you change your mind.",
    ],
    takeaway: "Options make you flexible. A decision log makes you fast next time.",
  },
  {
    id: "reasoning",
    category: "Reasoning",
    emoji: "🧠",
    title: "Reasoning & Analysis: Think From First Principles",
    read: "4 min",
    summary: "Break a messy system into facts, assumptions and unknowns before you design anything.",
    body: [
      "Good analysis separates what you KNOW from what you ASSUME. Most outages and rewrites come from untested assumptions that felt like facts.",
      "Ask 'why' five times. Ask 'what would have to be true for this to work?' Then go and check it.",
    ],
    steps: [
      "Write three lists: facts (measured), assumptions (believed), unknowns (to investigate).",
      "Draw the data flow: where does it enter, change, persist and leave?",
      "Estimate with numbers — requests per second, rows, payload size. Back-of-envelope math kills bad designs early.",
      "Look for second-order effects: what breaks when this scales 10x, fails halfway or retries twice?",
      "Prefer the explanation that predicts the most with the fewest moving parts.",
    ],
    takeaway: "Clear thinking is a skill you train, not a talent you are born with.",
  },
  {
    id: "creativity",
    category: "Creativity",
    emoji: "🎨",
    title: "Creativity in Code: Constraints Are a Gift",
    read: "3 min",
    summary: "Creative engineering is combining known ideas in new ways — and a deadline helps.",
    body: [
      "Creativity is not magic; it is recombination. Take a pattern from one domain (queues from banking, physics from games, animation from film) and apply it to your problem.",
      "Constraints — a tiny budget, an old stack, a hard deadline — force inventive answers that unlimited freedom never produces.",
    ],
    steps: [
      "Change the question: 'How do I speed this up?' becomes 'How do I avoid doing this at all?'",
      "Borrow: look at how a different industry or library solved a similar shape of problem.",
      "Build ugly prototypes fast. Taste improves by iterating, not by planning.",
      "Keep a 'curiosity log' of tools, ideas and small experiments — it becomes your idea bank.",
    ],
    takeaway: "Play is how engineers find the solutions that analysis alone would miss.",
  },
  {
    id: "design",
    category: "Design Thinking",
    emoji: "📐",
    title: "Design Thinking for Developers",
    read: "5 min",
    summary: "Empathize, define, ideate, prototype, test — apply it to APIs, UIs and architecture alike.",
    body: [
      "Design is how it works, not how it looks. A well-designed API, schema or service boundary saves months of future pain.",
      "Think deeply, then think again about the user: the end user, the next developer, and yourself six months from now.",
    ],
    steps: [
      "Empathize — talk to the people who will use it. Watch them struggle; don't just read tickets.",
      "Define — state the real problem, not the requested feature.",
      "Ideate — sketch several designs: monolith vs modular monolith vs microservices; REST vs events; sync vs async.",
      "Prototype — the thinnest vertical slice that proves the design end to end.",
      "Test & iterate — measure, collect feedback, and be willing to throw the first version away.",
    ],
    takeaway: "Make it simple to use, hard to misuse, and easy to change.",
  },
  {
    id: "mindset",
    category: "Mindset",
    emoji: "🔥",
    title: "A Short Speech to Myself (and You)",
    read: "3 min",
    summary: "A motivational speech for the days when the code won't compile and the doubts get loud.",
    speech: [
      "Some days the build is red, the bug is invisible and everyone else seems ahead. Those days are not proof that you are failing — they are the training.",
      "Every developer you admire has stared at the same blank error, the same 2 a.m. production issue, and chose to stay curious instead of giving up.",
      "You do not need to be the smartest person in the room. You need to be the one who keeps showing up, keeps learning, keeps shipping a little better than yesterday.",
      "Small steps compound. One bug understood, one concept learned, one honest commit — do that daily and in a year you will not recognise your own skill.",
      "So breathe. Read the error again. Ask for help without shame. Then take the next small step. Aap kar sakte ho — and you already are.",
    ],
    takeaway: "Progress, not perfection. Consistency beats intensity.",
  },
  {
    id: "habits",
    category: "Mindset",
    emoji: "⚡",
    title: "Calm Mind, Clear Code",
    read: "3 min",
    summary: "Mental habits that make you sharper under pressure.",
    body: [
      "Pressure narrows thinking. The fix is not working harder — it is working calmer.",
    ],
    steps: [
      "Step away for 10 minutes. The answer often appears while you walk.",
      "Explain the problem aloud (rubber-duck debugging). Gaps in logic reveal themselves.",
      "Write the next three actions down. A list turns anxiety into a plan.",
      "Sleep, water and breaks are part of the engineering toolchain.",
      "Celebrate small wins — each green test is progress worth noticing.",
    ],
    takeaway: "You debug code with your mind, so take care of the mind first.",
  },
];

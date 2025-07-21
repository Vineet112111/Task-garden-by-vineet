# Copilot Instructions for AI Coding Agents

## Project Overview
- This is a React + Vite project using Tailwind CSS for styling and ESLint for linting.
- The entry point is `src/main.jsx`, which renders the `App` component from `src/App.jsx`.
- Tailwind CSS is configured via `tailwind.config.js` and used in both `src/index.css` and `src/App.css`.
- Vite is configured in `vite.config.js` and handles development, build, and preview workflows.

## Key Workflows
- **Start development server:** `npm run dev` (runs Vite with HMR)
- **Build for production:** `npm run build`
- **Preview production build:** `npm run preview`
- **Lint code:** `npm run lint` (uses ESLint with custom config in `eslint.config.js`)

## Project-Specific Patterns
- All React components are written in `.jsx` files and use functional components with hooks.
- Tailwind utility classes are used for all styling; avoid custom CSS unless necessary.
- Static assets (e.g., SVGs) are stored in `src/assets/` and referenced with relative imports.
- The root HTML file is `index.html`, which loads the app via `<script src="/src/main.jsx">`.
- ESLint is configured to ignore variables starting with uppercase or underscores (`^[A-Z_]`).

## Integration Points & Dependencies
- Uses `@vitejs/plugin-react` for React Fast Refresh.
- Tailwind CSS is integrated via PostCSS (`postcss.config.js`).
- No backend or API integration is present by default; all logic is client-side.
- All dependencies are managed via `package.json`.

## Conventions
- Use only functional React components.
- Use Tailwind classes for layout and design.
- Place new components in `src/` and import them in `src/App.jsx` or as needed.
- Keep all source code in `src/`.
- Do not add TypeScript unless the project is migrated (see README for TS template).

## Example: Adding a New Component
1. Create `src/MyComponent.jsx`:
   ```jsx
   export default function MyComponent() {
     return <div className="p-4 text-blue-600">Hello!</div>;
   }
   ```
2. Import and use in `src/App.jsx`:
   ```jsx
   import MyComponent from './MyComponent';
   // ...
   <MyComponent />
   ```

## References
- See `README.md` for more context and links to official Vite/React/Tailwind docs.
- See `eslint.config.js` for linting rules and conventions.
- See `tailwind.config.js` for Tailwind setup.

---
_If you are unsure about a workflow or convention, prefer existing patterns in `src/` and referenced configs._

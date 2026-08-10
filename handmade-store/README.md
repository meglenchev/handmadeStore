# Handmade E-commerce Store (React)

## To-Do List

### Phase 1: React Environment Setup

- [x] Initialize the React project (Vite recommended for speed)
- [x] Migrate global CSS files into the React structure
- [ ] Import and configure external JS libraries and fonts
- [x] Set up the folder structure for `components`, `pages`, and `assets`

### Phase 2: Componentization (HTML to JSX)

- [x] Break down the static HTML into reusable components (`Header`, `ProductCard`, `Footer`, etc.)
- [x] Convert HTML syntax to JSX (e.g., `class` -> `className`, self-closing tags)
- [x] Organize local assets (images/icons) within the React `public` or `src/assets` folder
- [ ] Implement the main Layout wrapper

### Phase 3: Logic Integration

- [x] Set up `react-router` for multi-page navigation (Home, Shop, Product View)
- [x] Replace static content with dynamic data using `props` and `map()`
- [x] Convert existing JS logic/functions into React Hooks (`useState`, `useEffect`)
- [x] Handle Shopping Cart state globally (Context API)
- [ ] Optimize Search Component: If results > 6, implement a "Load More" button or Lazy Loading to prevent layout shifting

### Phase 4: Refinement & Testing

- [ ] Ensure all existing CSS animations and JS interactions work correctly in React
- [ ] Optimize image loading and component performance
- [ ] Final responsive check (ensure nothing broke during migration)
- [ ] Production build and Deployment

#### ToDo

- [x] Replace `bootstrap.bundle.min.js` with the official React library: `npm install react-bootstrap`
- [x] Replace `jquery.countdown.min.js` with the official React library: `npm install react-countdown`
- [ ] Remove `jquery.magnific-popup.min.js` Use Modal from `react-bootstrap`
- [x] Install `react-medium-image-zoom` or `react-image-magnify` for product image quick view zoom
- [x] To create a `QuickViewContext`

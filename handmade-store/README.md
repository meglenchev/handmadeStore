# Handmade E-commerce Store (React)

## To-Do List

### Phase 1: React Environment Setup

- [x] Initialize the React project (Vite recommended for speed)
- [x] Migrate global CSS files into the React structure
- [x] Import and configure external JS libraries and fonts (Google Fonts, Font Awesome, react-bootstrap, react-slick, lightbox)
- [x] Set up the folder structure for `components`, `pages`, and `assets`

### Phase 2: Componentization (HTML to JSX)

- [x] Break down the static HTML into reusable components (`Header`, `ProductCard`, `Footer`, etc.)
- [x] Convert HTML syntax to JSX (e.g., `class` -> `className`, self-closing tags)
- [x] Organize local assets (images/icons) within the React `public` or `src/assets` folder
- [ ] Implement the main Layout wrapper _(Header/Footer are still inline in `App.jsx` — extract a `Layout` with `<Outlet />`)_

### Phase 3: Logic Integration

- [x] Set up `react-router` for multi-page navigation (Home, Shop, Product View)
- [x] Replace static content with dynamic data using `props` and `map()`
- [x] Convert existing JS logic/functions into React Hooks (`useState`, `useEffect`)
- [x] Handle Shopping Cart state globally (Context API)
- [x] Authentication: `AuthContext`, Login/Register forms, `ProtectedRoute`, `PublicOnlyRoute`, session verify via `/users/me`
- [x] Account page with tabs (Dashboard, Orders, Address, Account Details)
- [x] Address management: list + add form with validation (max 2)
- [x] Shared API layer: `apiClient`, `useQuery` (conditional fetch), `useMutation`, unit tests with Vitest
- [ ] Optimize Search Component: If results > 6, implement a "Load More" button or Lazy Loading to prevent layout shifting
- [ ] Finish address editing _(in progress — see Bugs)_ + delete / set default address
- [ ] Wire `AccountDetails` form to the backend (no `onSubmit` / endpoint yet)
- [ ] Orders tab: replace the hardcoded table with real data from `/users/account/orders`
- [ ] Checkout page (cart → address → `POST /orders`)
- [ ] Pages linked in the header but missing: About us, Wishlist, Contact us, Privacy policy (currently fall to 404)

### Phase 4: Refinement & Testing

- [ ] Ensure all existing CSS animations and JS interactions work correctly in React
- [ ] Optimize image loading and component performance (no `loading="lazy"` on any `<img>` yet; main bundle is ~690 kB — lazy-load more routes / split vendor chunks)
- [ ] Final responsive check (ensure nothing broke during migration)
- [ ] Production build and Deployment

#### ToDo

- [x] Replace `bootstrap.bundle.min.js` with the official React library: `npm install react-bootstrap`
- [x] Replace `jquery.countdown.min.js` with the official React library: `npm install react-countdown`
- [x] Remove `jquery.magnific-popup.min.js` Use Modal from `react-bootstrap` _(replaced by `react-bootstrap` Modal + `yet-another-react-lightbox`)_
- [x] Install `react-medium-image-zoom` or `react-image-magnify` for product image quick view zoom
- [x] To create a `QuickViewContext`
- [ ] Write a `useCategories()` hook to avoid duplicating the query in two places (search offCanvas, products filters)

### Bugs

- [ ] **Logout does not log out** — `onLogout` only clears local state; it never calls `POST /users/logout`, so the httpOnly cookie stays and the session is restored on the next reload. Also redirect to `/` after logout.
- [ ] **Address edit form opens empty** — `AddressForm` passes `initialValues` to `useForm` instead of `formInitialValues`. Legend and submit button also always say "Добави" in edit mode.
- [ ] **Address edit request fails** — it sends `PATCH /users/account/address/:id`, which does not exist on the backend and is blocked by CORS (see backend README).
- [ ] **Orders tab renders nothing** — `Profile.jsx` has no query for the `orders` tab, so `data` is `undefined` and the component is never shown.
- [ ] **A stray `0` is rendered next to the price** — `{product.oldPrice && ...}` in `QuickView.jsx` and `DealOfTheDay.jsx`; seed data uses `oldPrice: 0`. Use `oldPrice > 0 && ...`.
- [ ] **ESLint does not run** (`Plugin "" not found`) — remove the `'prettier'` string from `extends` in `eslint.config.js` (`eslintConfigPrettier` is already added at the end).
- [ ] `AccountDetails` `useEffect` depends on `[setFormValues]` but reads `data` — add `data` to the dependencies.

### Refactoring

- [ ] `SearchOffcanvas` uses raw `fetch` + its own `BASE_URL` — switch to `apiGet` from `apiClient`.
- [ ] `Profile.jsx` picks tabs by index (`ACCOUNT_TABS[2]`, `[0]`, `[3]`) — look them up by `id` or build the queries from `ACCOUNT_TABS`.
- [ ] Use the `@/` alias consistently (`Profile.jsx` still uses `../../` imports).
- [ ] `AuthContext`: wrap `onLogin` / `onRegister` in `useCallback` — they are recreated every render, so the `useMemo` value never memoizes.
- [ ] Replace the hardcoded tags in `QuickView` (`handmade`, `learts`, `mug`...) with `productData.tags`.
- [ ] Unify UI language — account tabs, labels and "Logout" are in English, the rest of the store is in Bulgarian.
- [ ] Remove unused leftovers: `assets/js/plugins/jquery.scrollUp.min.js`, the `swiper` dependency (not imported anywhere), placeholder `href="#"` / `shopping-cart.html` links.

### Final touches

- [ ] Replace the `null` returned while `isAuthLoading` (AuthContext, ProtectedRoute, PublicOnlyRoute) with a spinner/skeleton
- [ ] Style the submit error messages in LoginForm, RegisterForm and AddressForm (marked with `TODO`)
- [ ] Show a loading skeleton instead of `Loading...` in the Account tabs
- [ ] `index.html`: set `lang="bg"`, fill the meta description, remove `noindex` before release
- [ ] Add a `.env.example` (`VITE_API_BASE_URL`)
- [ ] Add component tests for auth forms, `AddressForm` and `ProtectedRoute`

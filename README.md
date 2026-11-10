# João Verde — Portfolio

This repository contains the personal portfolio website of **João Verde**, a multimedia designer and visual storyteller.

The website is being developed as a focused space to present creative work, projects, skills and design experiments. Its structure is intentionally simple and modular, making it easy to evolve from a static portfolio into a more dynamic and maintainable experience.

## What this project is for

The portfolio will serve as:

- A professional presentation of João Verde's design work.
- A visual archive of academic, experimental and professional projects.
- A clear way to organise projects by year and category.
- A place to communicate design interests, skills and creative process.
- A foundation for future interactions, animations, filters and API-driven content.

The visual direction is based on a clean editorial layout, with emphasis on typography, project presentation and motion. The goal is not only to show finished work, but also to communicate a design approach and personality.

## Current structure

DW_portfolio/
├── index.html
├── README.md
├── api/
│   └── api.js
├── fonts/
│   └── satoshi/
│       └── Satoshi-*.woff2
├── css/
│   ├── animations.css
│   ├── global.css
│   ├── intro_anim.css
│   ├── projects.css
│   ├── variables.css
│   └── header_footer/
│       ├── footer.css
│       └── header.css
└── js/
    ├── add_projects.js
    ├── filter.js
    ├── footer.js
    ├── head.js
    ├── header.js
    └── js_import.js

## How it works

### HTML entry point

[`index.html`](./index.html) is the main page and defines the basic content structure:

- The hero introduction.
- The showcase grid.
- The projects section.
- Placeholder elements for the header and footer.

The header and footer are not written directly into the page. Instead, the HTML contains component targets:

```html
<div data-component="header"></div>
<div data-component="footer"></div>
```

This keeps the page clean and allows the same components to be reused on other pages later, if needed.

### Centralised CSS loading

[`js/head.js`] is responsible for adding the project's stylesheets to the document head. This creates one central place where global styles can be registered.

The currently prepared stylesheets are:

- `variables.css` — shared colour and typography variables, the Basteleur import and the local Satoshi font-face declarations.
- `global.css` — global box sizing, base typography and heading rules connected to the shared font variables.
- `animations.css` — reusable animations and transitions.
- `intro_anim.css` — animations for the introduction or hero area.
- `header.css` — styles specific to the header.
- `footer.css` — styles specific to the footer.
- `projects.css` — styles for the projects area.

Stylesheets are loaded in order by `head.js`, with `variables.css` loaded first so that the remaining files can use the shared design tokens.

### Typography

The visual system uses two font families:

- **Basteleur Bold** for headings and display typography. It is imported in `css/variables.css` from the provided webfont URL.
- **Satoshi** for body text and interface elements. Its variable normal and italic font files are stored locally in `fonts/satoshi/`.

The main variables are:

```css
--font-display: "Basteleur Bold", Georgia, serif;
--font-body: "Satoshi", Arial, sans-serif;
```

Use these variables instead of hard-coding font names in component styles.

### Centralised JavaScript imports

[`js/js_import.js`] is the main JavaScript entry point. It imports the project's modules in one organised location:

- [`header.js`] renders the header.
- [`footer.js`] renders the footer.
- [`filter.js`] is reserved for project filtering behaviour.
- [`add_projects.js`] is reserved for adding or generating projects.
- [`api.js`] is reserved for future API or external data integration.

The entry point is loaded as an ES module:

```html
<script type="module" src="js/js_import.js"></script>
```

### Header and footer components

[`header.js`] exports `renderHeader()`. It finds the element marked with `data-component="header"` and replaces it with the complete site header.

[`footer.js`] follows the same pattern with `renderFooter()`. This makes both components independent from the page markup and easier to update globally.

The footer currently contains the contact section, email, phone, location, portfolio bio and a live local time display for Coimbra. The contact navigation points to the footer through the `#contacts` anchor.

For example, changing the navigation in `header.js` or the contact details in `footer.js` updates every page that uses the component.

## Running the project locally

This is a front-end project with no package manager or build step currently required.

Because the project uses JavaScript modules, it should be opened through a local web server rather than directly with a `file://` URL.

One simple option is:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Alternatively, use the **Live Server** extension in VS Code.

## Development workflow

### Adding or changing styles

1. Put shared colours and typography values in `css/variables.css`.
2. Put general page rules in `css/global.css`.
3. Keep header and footer rules in `css/header_footer/`.
4. Keep project-specific rules in `css/projects.css`.
5. Add animation rules to `animations.css` or `intro_anim.css`, depending on their scope.

If a new stylesheet is created, add its path to the `stylesheets` array in [`js/head.js`](./js/head.js).

When adding typography, use `var(--font-body)` for interface and body text or `var(--font-display)` for headings and display text. Keep local font files inside `fonts/` and add a corresponding `@font-face` declaration to `css/variables.css`.

### Updating the header or footer

Edit the template in [`header.js`](./js/header.js) or [`footer.js`](./js/footer.js). Do not duplicate the component markup in `index.html`.

The corresponding CSS should remain in:

- `css/header_footer/header.css`
- `css/header_footer/footer.css`

### Adding project content

Project content can currently be edited in `index.html`. The planned role of `add_projects.js`, `filter.js` and `api.js` is to move this content towards a more reusable and dynamic system.

When that work is implemented, project data should be kept separate from presentation logic wherever possible.

The project image grid is rendered by [`add_projects.js`](./js/add_projects.js). Change `projectImageCount` in that file to control the number of image slots. The value is always corrected to at least one slot, and the CSS places a maximum of three slots per row on desktop.

The projects header includes a responsive filter control. Opening `All projects` reveals one option for each category currently present in the project list. Selecting a category hides the non-matching projects, while the `No. Projetos` value is calculated from the complete project list.

## Design and technical goals

The project is intended to become:

- **Modular:** shared components should be defined once and reused.
- **Maintainable:** each CSS and JavaScript file should have a clear responsibility.
- **Responsive:** the experience should work across desktop, tablet and mobile screens.
- **Expressive:** animation and typography should support the work without distracting from it.
- **Scalable:** new projects and future pages should be easy to add.
- **Accessible:** semantic HTML, readable contrast, keyboard navigation and meaningful links should be preserved.
- **Performant:** unnecessary dependencies and duplicated code should be avoided.

## Planned improvements

Possible next steps include:

- Replace placeholder project entries with real project data.
- Implement project filtering by category and year.
- Connect the project list to a local data source or API.
- Add project detail pages.
- Complete the responsive layout.
- Add the visual system and shared CSS variables.
- Implement the planned intro, page and hover animations.
- Add accessible navigation and interaction states.
- Add project images, metadata and external links.
- Add deployment configuration for a static hosting service.

## Content notes

The repository currently contains early placeholder content, including repeated project names and an example project count. These values should be updated as the portfolio content is finalised.

> **Academic implementation note:** Temporarily, and for academic purposes, this portfolio will display images retrieved from an API. This approach is being used to fulfil **Assignment 2** for the Web Development course and to demonstrate the integration of external data into the website. The API-based images are therefore part of the current assignment implementation and may be replaced by final portfolio assets later.

The portfolio text is written primarily in English, while some project metadata is currently in Portuguese. This can be standardised later according to the final audience and communication strategy.

## License

No licence has been defined yet. Until one is added, the project should be treated as private portfolio material and should not be reused, redistributed or commercially republished without permission.

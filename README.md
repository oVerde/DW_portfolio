# João Verde — Multimedia Design Portfolio

This repository contains the personal portfolio of **João Verde**, a multimedia
designer interested in visual communication, interaction and experimentation.

The website was created as a front-end project for the **Web Development 2026**
course at MDM — University of Coimbra. It presents a collection of projects
through an editorial layout focused on typography, image composition, motion and
clear navigation.

## About the project

The portfolio is designed as a visual experience rather than a traditional
list of projects. Visitors can browse the work, filter projects, open a detailed
project view and read a generated About section for each project.

The project intentionally uses a small amount of content and a strong visual
system:

- dark background with green highlights;
- Basteleur for display typography;
- Satoshi for body text and interface elements;
- animated transitions between project states;
- responsive layouts for desktop, tablet and mobile screens.

## Main features

### Project catalogue

Projects are rendered dynamically from a shared project collection. Each project
contains:

- a unique identifier;
- a generated name;
- a category;
- a year;
- a cover image;
- additional project images;
- an About section with up to four paragraphs.

The projects can be displayed as a visual grid and as a grouped list. The
project count updates according to the active filter.

### Filters

The project catalogue can be filtered by category. The filter interface updates
the grid, list and visible project count without reloading the page.

### Project details

Selecting a project opens a detailed panel above the main page. The detail view
includes:

- persistent project navigation;
- project title, category and year;
- responsive image gallery;
- project statements;
- an expandable About section;
- navigation to a random related project;
- close controls and Escape-key support.

The page behind the detail view is covered by a translucent blurred backdrop.
The main page remains protected while the detail view is active.

### Responsive About view

On desktop, the About section expands beside the project content. On mobile,
the About section becomes the main visible view, occupying the available page
area while the project images remain hidden. Its content can be scrolled
independently and the button remains at the bottom of the About content.

The button changes between:

- `About Project +`
- `Close About ×`

A bottom fade provides a visual indication that additional content can be
scrolled.

### Header and footer components

The header and footer are generated as reusable components. The mobile header
uses a burger menu, while the footer includes contact information and the
current local time for Coimbra.

### Motion and interaction

The website includes CSS transitions and JavaScript interactions for:

- the introductory section;
- project cards;
- filters;
- the custom cursor;
- opening and closing project details;
- expanding and closing About;
- project changes;
- the mobile navigation menu.

Reduced-motion preferences are respected through
`prefers-reduced-motion` rules.

## API and generated content

The website does not require a backend or API keys.

### Project names

[`api/names.js`](./api/names.js) requests random words from a public API and
combines them into project names. If the service is unavailable, local fallback
names are used.

### About text

[`api/about-api.js`](./api/about-api.js) requests paragraphs from the free
Bacon Ipsum API. The returned paragraphs are grouped into projects, with a
maximum of four paragraphs per project.

If the API fails or returns invalid data, the website logs the error and uses
local fallback text so that the project catalogue can still be displayed.

### Project images

[`api/images.js`](./api/images.js) creates the current project image collection
locally as SVG-based content. This keeps the project lightweight and avoids
requiring image hosting for the assignment version.

## Project structure

```text
DW_portfolio/
├── index.html
├── README.md
├── api/
│   ├── about-api.js
│   ├── api.js
│   ├── create-project.js
│   ├── format-project-word.js
│   ├── get-random-index.js
│   ├── images.js
│   ├── names.js
│   ├── project-settings.js
│   └── shuffle-items.js
├── css/
│   ├── animations.css
│   ├── cursor.css
│   ├── global.css
│   ├── intro_anim.css
│   ├── project-details.css
│   ├── projects-filter.css
│   ├── projects-grid.css
│   ├── projects-list.css
│   ├── projects.css
│   ├── variables.css
│   └── header_footer/
│       ├── footer.css
│       └── header.css
├── fonts/
│   └── satoshi/
│       └── *.woff2
└── js/
    ├── add_projects.js
    ├── custom_cursor.js
    ├── filter.js
    ├── footer.js
    ├── head.js
    ├── header.js
    ├── js_import.js
    ├── cursor/
    ├── filters/
    ├── layout/
    ├── project-details/
    └── projects/
```

## Code organisation

### HTML

[`index.html`](./index.html) contains the page shell, hero section, project
catalogue targets and the project-detail template.

Header and footer markup are inserted into the elements marked with:

```html
<div data-component="header"></div>
<div data-component="footer"></div>
```

### CSS

Shared design tokens and font declarations are defined in
[`css/variables.css`](./css/variables.css).

The main style responsibilities are split between:

- [`css/global.css`](./css/global.css) — global rules and hero typography;
- [`css/header_footer/header.css`](./css/header_footer/header.css) — header and
  mobile menu;
- [`css/header_footer/footer.css`](./css/header_footer/footer.css) — footer;
- [`css/projects.css`](./css/projects.css) — project section styles;
- [`css/projects-grid.css`](./css/projects-grid.css) — project grid and cards;
- [`css/projects-list.css`](./css/projects-list.css) — project list;
- [`css/projects-filter.css`](./css/projects-filter.css) — filter controls;
- [`css/project-details.css`](./css/project-details.css) — detail panel,
  backdrop, About layout and responsive detail behaviour;
- [`css/animations.css`](./css/animations.css) and
  [`css/intro_anim.css`](./css/intro_anim.css) — reusable and introductory
  animations.

### JavaScript

[`js/js_import.js`](./js/js_import.js) is the main JavaScript entry point. It:

1. renders the header and footer;
2. starts the custom cursor;
3. fetches the project data;
4. renders the project grid and list;
5. initialises the filters;
6. initialises project details.

The JavaScript is written with native ES modules. No framework, bundler or
third-party JavaScript library is required.

## Typography

The visual system uses two font variables:

```css
--font-display: "Basteleur Bold", Georgia, serif;
--font-body: "Satoshi", Arial, sans-serif;
```

Satoshi is stored locally in the repository. Basteleur is currently loaded
through the font URL defined in [`css/variables.css`](./css/variables.css).

The hero introduction uses Basteleur for the opening statement and final call
to action, while the explanatory text uses Satoshi.

## Accessibility considerations

The project includes several accessibility features:

- semantic HTML landmarks;
- keyboard support for project cards;
- buttons for interactive actions;
- `aria-expanded` and `aria-controls` on expandable controls;
- descriptive image `alt` text;
- Escape-key support for closing project details;
- reduced-motion support;
- focus placed on the close button when a detail view opens.

The next accessibility improvements would be adding a complete focus trap for
the detail view and returning focus to the original project card after closing.

## Run locally

This project has no package manager, dependencies or build step.

Because it uses JavaScript modules, open it through a local HTTP server instead
of using a `file://` URL.

With Python installed:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Alternatively, use the Live Server extension in VS Code.

## Deploy to GitHub Pages

The website can be deployed as a static site through GitHub Pages:

1. Push the repository to GitHub.
2. Open the repository settings.
3. Go to **Pages**.
4. Select the `main` branch and the repository root as the source.
5. Save the configuration.
6. Open the generated GitHub Pages URL.

After deployment, verify that:

- the main page loads correctly;
- JavaScript modules are not blocked;
- the public APIs respond correctly;
- fallback content appears if an API is unavailable;
- all responsive states work on a real mobile device.

## Assignment submission checklist

The final submission should include:

- the GitHub repository link;
- the published GitHub Pages link;
- a video named `SEEME` in the repository root;
- a maximum video duration of one minute.

The video should briefly demonstrate the main interaction flow: browsing the
project catalogue, filtering projects, opening a project, using the About view
and navigating to another project.

## Academic context

This project was developed for **Assignment 2 — Static Website** in the
**Web Development 2026** course of the **MDM — University of Coimbra**.

It demonstrates:

- a static website structure;
- responsive design;
- dynamic interaction;
- CSS animation;
- content fetched from public APIs;
- native HTML, CSS and JavaScript without third-party libraries.

## License and content

No licence has been defined for this repository. Until one is added, the
portfolio should be treated as personal academic work and should not be
redistributed or commercially reused without permission.

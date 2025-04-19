### Notable features

- Deploy link: https://euphonious-praline-0f4689.netlify.app
- Using React + Vite + TypeScript to quickly start the project up.
- Using TailwindCSS for styling.
- Layout: use Grid and Flexbox for the page's layout.

#### How to run

1. npm install
2. npm run dev

#### Component design

- Composition: examples are `CardDashboard` and `Carousel` components.
- Context: to avoid "prop drilling" and sharing state to deeply nested children.

#### Animation

There are 2 places which implement animation:

- Card Carousel
- Transaction Sidebar expanding/collapsing

I implemented animation using purely CSS `transform` and `transition` without using any component library.

#### Storage / API

I simulate a fake API call by implementing a Promise that will `resolve` after 1000ms.
Data is then stored in `localStorage`. This is a rough implementation as I don't have time to implement better solutions.

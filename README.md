```css
/* ==========================================================================
   Sibiya's Chicken Farming - External Stylesheet (style.css)
   Course: Web Development (WEDE5020)
   Student Name: Sisanda Sibiya
   Student ID: ST10536389
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. BASE STYLES & CSS RESET
   -------------------------------------------------------------------------- */
:root {
    /* Color Palette */
    --primary-color: #2d5a27;      /* Farm Green */
    --primary-dark: #1e3d1a;       /* Dark Green */
    --accent-color: #d97706;       /* Warm Gold/Amber */
    --bg-light: #f8fafb;           /* Off-White Background */
    --card-bg: #ffffff;            /* White Container Background */
    --text-main: #1f2937;          /* Charcoal Body Text */
    --text-muted: #4b5563;         /* Muted Gray Text */
    --border-color: #e5e7eb;       /* Border Gray */
    --white: #ffffff;
    
    /* Typography Scale */
    --font-main: 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    --font-size-base: 1rem;        /* 16px */
    --line-height-base: 1.6;
    
    /* Layout & Decoration */
    --radius: 8px;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    --shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
}

/* Global Box Sizing & Reset */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    font-size: 100%; /* Default 16px */
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-main);
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
    color: var(--text-main);
    background-color: var(--bg-light);
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

/* --------------------------------------------------------------------------
   2. TYPOGRAPHY & VISUAL STYLES
   -------------------------------------------------------------------------- */
h1, h2, h3, h4 {
    color: var(--primary-color);
    font-weight: 700;
    line-height: 1.25;
    margin-bottom: 0.75rem;
}

h1 { font-size: 2.25rem; letter-spacing: -0.02em; }
h2 { font-size: 1.75rem; text-align: center; margin-bottom: 1.5rem; }
h3 { font-size: 1.35rem; margin-top: 1rem; }

p {
    margin-bottom: 1rem;
    color: var(--text-main);
}

a {
    color: var(--primary-color);
    text-decoration: none;
    transition: var(--transition);
}

a:hover, a:focus {
    color: var(--accent-color);
}

hr {
    border: 0;
    height: 1px;
    background-color: var(--border-color);
    margin: 2rem 0;
}

/* --------------------------------------------------------------------------
   3. LAYOUT STRUCTURE (HEADER, NAV, MAIN, FOOTER)
   -------------------------------------------------------------------------- */
/* Header & Navigation */
header {
    background-color: var(--primary-color);
    color: var(--white);
    padding: 2rem 1.5rem 1rem;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

header h1 {
    color: var(--white);
    margin-bottom: 0.75rem;
}

nav {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 1rem;
}

nav a {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
    padding: 0.5rem 1.25rem;
    border-radius: var(--radius);
    background-color: rgba(255, 255, 255, 0.08);
}

/* Interactive States: :hover, :focus, :active */
nav a:hover, 
nav a:focus {
    color: var(--white);
    background-color: var(--accent-color);
    outline: none;
}

nav a.active {
    background-color: var(--accent-color);
    color: var(--white);
}

/* Main Container */
main {
    max-width: 1000px;
    width: 90%;
    margin: 2.5rem auto;
    padding: 2rem;
    background-color: var(--card-bg);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    flex: 1;
}

/* Section Decorator */
section {
    margin-bottom: 2rem;
}

/* --------------------------------------------------------------------------
   4. CONTENT COMPONENTS & LISTS (GRID & FLEXBOX)
   -------------------------------------------------------------------------- */
/* Unordered Lists & Grid Layouts */
ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.25rem;
}

li {
    margin-bottom: 0.5rem;
}

/* Cards Grid for Services/Commitments */
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.card {
    background-color: var(--bg-light);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
    transition: var(--transition);
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
}

.card strong {
    color: var(--primary-color);
    font-size: 1.1rem;
    display: block;
    margin-bottom: 0.5rem;
}

/* Responsive Banner & Images */
img, .responsive-img {
    max-width: 100%;
    height: auto;
    display: block;
    border-radius: var(--radius);
    margin: 1.5rem auto;
}

/* --------------------------------------------------------------------------
   5. FORMS & INPUT STYLING
   -------------------------------------------------------------------------- */
form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    max-width: 600px;
    margin: 1.5rem auto 0;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}

label {
    font-weight: 600;
    color: var(--text-main);
}

input[type="text"],
input[type="email"],
input[type="tel"],
select,
textarea {
    width: 100%;
    padding: 0.75rem;
    font-family: inherit;
    font-size: 1rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    background-color: #fff;
    transition: var(--transition);
}

/* Pseudo-class: :focus */
input:focus, 
select:focus, 
textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(45, 90, 39, 0.2);
}

input[type="submit"],
button[type="submit"] {
    background-color: var(--primary-color);
    color: var(--white);
    font-size: 1rem;
    font-weight: 600;
    padding: 0.85rem 1.5rem;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    transition: var(--transition);
    align-self: flex-start;
}

/* Pseudo-classes: :hover, :active */
input[type="submit"]:hover,
button[type="submit"]:hover {
    background-color: var(--primary-dark);
}

input[type="submit"]:active,
button[type="submit"]:active {
    transform: scale(0.98);
}

/* --------------------------------------------------------------------------
   6. FOOTER STYLING
   -------------------------------------------------------------------------- */
footer {
    background-color: var(--primary-dark);
    color: var(--white);
    text-align: center;
    padding: 1.5rem;
    margin-top: auto;
    font-size: 0.9rem;
}

footer p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0;
}

/* --------------------------------------------------------------------------
   7. RESPONSIVE DESIGN & BREAKPOINTS (MEDIA QUERIES)
   -------------------------------------------------------------------------- */
/* Tablet Breakpoint (<= 768px) */
@media screen and (max-width: 768px) {
    h1 { font-size: 1.85rem; }
    h2 { font-size: 1.5rem; }
    
    main {
        width: 95%;
        padding: 1.25rem;
        margin: 1.5rem auto;
    }

    nav {
        gap: 0.5rem;
    }

    nav a {
        padding: 0.4rem 0.85rem;
        font-size: 0.9rem;
    }
}

/* Mobile Breakpoint (<= 480px) */
@media screen and (max-width: 480px) {
    header {
        padding: 1.5rem 1rem;
    }

    nav {
        flex-direction: column;
        width: 100%;
    }

    nav a {
        width: 100%;
        text-align: center;
    }

    .grid-container {
        grid-template-columns: 1fr;
    }

    input[type="submit"],
    button[type="submit"] {
        width: 100%;
    }
}
```

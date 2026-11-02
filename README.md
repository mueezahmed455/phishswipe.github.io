# catphish

**Learn to spot phishing before it catches you.**

catphish is a responsive, browser-based phishing-awareness game. Players review fictional email and SMS scenarios, swipe left for phishing or right for safe, and receive immediate explanations that identify the warning signs.

## What's included

- Home dashboard inspired by the supplied reference screenshot.
- Play view with email and SMS scenario cards.
- Pointer/touch drag gestures, on-screen controls and keyboard shortcuts (`←` = phishing, `→` = safe).
- 12 fictional practice scenarios (6 email, 6 SMS) with structured clue metadata.
- Instant feedback modal with highlighted evidence and safe next steps.
- Score, streak multiplier, 10-question rounds and results breakdown.
- Tips, local leaderboard and About pages.
- Local-only profile and score history using `localStorage`.
- No external API, account, database, payment provider or build tool required.

## Run locally

This is a dependency-free static site. From the project directory run:

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

On Windows, `py -m http.server 4173` is an equivalent command. You can also open `index.html` directly, though using a local server is more consistent.

## Project structure

```text
catphish/
├── index.html              # Application structure and all views/dialogs
├── styles.css              # Responsive visual system and interactions
├── js/
│   ├── scenarios.js        # Scenario bank and learning metadata
│   └── app.js              # Routing, swipe mechanics, scoring and persistence
├── docs/
│   ├── PRODUCT_SPEC.md     # Complete product and technical specification
│   ├── BUILD_PROMPT.md     # End-to-end master prompt for rebuilding/expanding
│   └── PRESENTATION_GUIDE.md # Presentation outline
├── assets/
│   └── favicon.svg
├── .gitignore
└── README.md
```

## Controls

| Input | Action |
|---|---|
| Drag left | Mark the message as phishing |
| Drag right | Mark the message as safe |
| Left arrow | Mark the message as phishing |
| Right arrow | Mark the message as safe |
| Buttons | Choose phishing or safe |
| Restart button | Start a new round using the selected channel filter |

A correct answer gives 100 points plus a streak bonus of 10 points per consecutive correct answer, capped at a 50-point bonus per answer. A wrong answer resets the streak. Each round uses up to 10 scenarios from the selected channel.

## Data and privacy

- The app does not send data to a server.
- Profile name and the top 10 local round records are saved in this browser only.
- Clearing browser storage removes that local history.
- There is no real sign-in, multi-device sync, global leaderboard, analytics, email delivery or admin portal in this version.
- Scenario URLs use the reserved `.example` domain and are inert display text. They are not links and must not be replaced with live malicious URLs.
- The content is educational and should not be treated as a security product or as a substitute for organisational security controls.

## Extend it

The complete roadmap, requirements, data model, accessibility/security requirements and acceptance criteria are in [`docs/PRODUCT_SPEC.md`](docs/PRODUCT_SPEC.md). The reusable build brief is in [`docs/BUILD_PROMPT.md`](docs/BUILD_PROMPT.md).

## GitHub Pages deployment

The repository is configured to deploy automatically from the `main` branch using
[`.github/workflows/pages.yml`](.github/workflows/pages.yml). The workflow publishes
the repository root as a static GitHub Pages site after each push.

Deployment status can be monitored from the repository's **Actions** tab.

The expected public URL is:

<https://your-username.github.io/your-repository/>

If Pages has not been enabled for the repository yet, open **Settings → Pages** on
GitHub, select **GitHub Actions** as the source, and rerun the workflow from the
**Actions** tab. Do not add credentials or tokens to the repository.

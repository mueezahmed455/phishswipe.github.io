# PhishSwipe — Complete Project Documentation

This is the consolidated project document for PhishSwipe. It combines the working product overview, implementation specification, reusable end-to-end master build brief and presentation guide.

## Contents

1. Product overview
2. MVP features and user experience
3. Game rules and scenario design
4. Technical architecture and project structure
5. Privacy, safety and accessibility
6. Acceptance criteria and test plan
7. Product roadmap
8. Project responsibilities and presentation guide
9. Research references from the original brief
10. Complete A-to-Z master build prompt

---

# PhishSwipe

**Learn to spot phishing before it catches you.**

PhishSwipe is a responsive, browser-based phishing-awareness game. Players review fictional email and SMS scenarios, swipe left for phishing or right for safe, and receive immediate explanations that identify the warning signs.

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
phishswipe/
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

## Git

This folder is initialised as a fresh Git repository. To connect it to a new GitHub repository, create an empty repository named `phishswipe` in your GitHub account and then run:

```bash
git remote add origin https://github.com/your-username/your-repository.git
git push -u origin main
```

Do not add credentials or tokens to the repository. The current environment supports creating the local Git repository and project files; its GitHub connector does not expose a create-remote-repository operation, so the remote repository must be created in GitHub first.


---

# PhishSwipe — Product and Technical Specification

**Version:** 1.0  
**Status:** Working MVP  
**Product type:** Gamified cybersecurity awareness web application  
**Primary experience:** Swipe-based classification of email and SMS messages  
**Reference direction:** Supplied PhishSwipe screenshot and project brief

---

## 1. Executive summary

PhishSwipe teaches people to recognise phishing and legitimate messages through short, repeatable, scenario-based practice. Each round presents fictional email and SMS examples in a card interface. The player swipes left to identify phishing and right to identify a safe message. Every decision is followed by immediate feedback: the correct verdict, highlighted evidence, a plain-language explanation and a safe action to take in a real situation.

The experience is designed to be easier to engage with than passive awareness material. Game mechanics (points, streaks, progress and ranks) motivate repetition, while the explanation layer ensures that the product teaches reasoning rather than merely rewarding a guess.

PhishSwipe is an awareness-training tool. It does not detect threats in a user's inbox, intercept messages, replace mail filtering, or provide a guarantee that a message is safe.

## 2. Product vision

**Vision:** Make practical cyber-awareness training engaging enough that people practise it and memorable enough that they use the habits outside the game.

**Product promise:** Learn to spot phishing before it catches you.

**Core loop:** Review a message → inspect the clues → make a decision → receive an explanation → apply the lesson to the next scenario.

## 3. Problem statement

Phishing and social-engineering messages imitate organisations, colleagues and services to persuade people to click links, open attachments, send money or disclose sensitive information. A professional-looking logo or polished message does not establish that a sender is genuine. Traditional awareness material can be easy to ignore or forget when it is not connected to realistic decisions.

The supplied brief argues for interactive repetition and immediate explanation as a more engaging way to practise recognition. It also identifies a key limitation: a simple swipe game can oversimplify real-world attacks unless every response explains why the message is suspicious or trustworthy.

## 4. Objectives and non-objectives

### 4.1 Objectives

1. Give users repeated practice distinguishing phishing from legitimate messages.
2. Cover both email and SMS/social-engineering patterns.
3. Explain each verdict using concrete, highlighted evidence.
4. Reinforce safe behaviours: inspect sender identity, pause at urgency, verify links independently, question unexpected attachments and never disclose passwords or one-time codes.
5. Make the game usable on desktop, tablet and mobile.
6. Provide a self-contained MVP that can run without a paid backend or third-party API.

### 4.2 Non-objectives for the MVP

- Live inbox scanning, message forwarding or browser protection.
- Real threat-intelligence feeds or automated URL analysis.
- User accounts, cloud synchronisation or organisation-wide reporting.
- A global/multiplayer leaderboard.
- LMS/SCORM integration, certificates or formal compliance tracking.
- Sending, receiving or opening real phishing messages.

## 5. Target users

**Primary:** Students and general users who need approachable, foundational phishing-awareness practice.

**Secondary:** Educators and facilitators demonstrating phishing and social-engineering red flags in a classroom or workshop.

**Potential future:** Small organisations and training administrators who need repeatable awareness exercises and basic cohort reporting.

## 6. Experience principles

- **Clarity over spectacle:** Strong hierarchy, readable messages and a simple card interaction.
- **Teach, don't shame:** Wrong answers are learning moments; feedback is constructive.
- **Explain the evidence:** Every verdict must reference visible indicators and safe next steps.
- **Fictional and inert:** Training examples must not expose users to live malicious URLs, credential collection or real personal data.
- **Responsive by default:** Touch, pointer, keyboard and assistive-technology access should be considered together.
- **Honest progress:** Local browser scores are explicitly labelled as local; no global ranking is implied.

## 7. Information architecture

### 7.1 Global shell

- Brand mark and product name.
- Primary navigation: Home, Play, Tips, Leaderboard, About.
- Local player profile name.
- Responsive footer with demo/privacy status.

### 7.2 Home

Purpose: Explain the value quickly and bring the user into a round.

Components:
- Training-mode label and concise headline.
- Progress panel: best score, best accuracy, best streak and local training history.
- Prominent game card: product illustration, estimated session length, 10-scenario description and primary CTA.
- “Spot the clues” summary.
- Short real-skills reassurance note.

Primary action: Start a 10-scenario mixed round.

### 7.3 Play

Purpose: Provide the core classification exercise.

Components:
- Channel filter: Email + SMS, Emails only, Text messages only.
- Score, streak, level and round progress.
- Stacked message card.
- Sender, recipient, subject, timestamp and body for email scenarios.
- Sender/contact, timestamp and message body for SMS scenarios.
- Visible red-flag highlighting in the explanation state; do not reveal the verdict before the player answers.
- Two large decision controls: Phishing (left) and Safe (right).
- Short interaction guidance and progress dots.
- Contextual clue checklist.

Inputs:
- Drag left/right with pointer or touch.
- Left/right arrow keyboard shortcuts.
- Explicit button controls.

After selection:
- Lock the card controls.
- Show a feedback dialog.
- State whether the answer was correct.
- Explain the correct verdict.
- List all scenario clues and why each matters.
- Provide a practical action.
- Award points only for correct answers.
- Move to the next scenario only after the user acknowledges the feedback.

### 7.4 Round results

Purpose: Reinforce performance without implying that a high score equals complete protection.

Display:
- Total score.
- Accuracy and correct count.
- Best streak.
- Email accuracy and SMS accuracy where those categories were included.
- Rank label and short learning message.
- Actions to replay or open local leaderboard.

### 7.5 Tips

Purpose: Provide a reference guide beyond the game.

Six topics:
1. Inspect the sender address and reply-to domain.
2. Slow down urgency, fear and reward pressure.
3. Verify the destination independently; do not trust link text alone.
4. Treat unexpected attachments carefully.
5. Question requests for passwords, MFA codes, payment or gift cards.
6. Verify independently using a known app, saved bookmark or published contact detail.

### 7.6 Leaderboard

MVP behaviour:
- Store the player's top 10 scores locally in the browser.
- Sort by score, then accuracy.
- Clearly label the leaderboard as local to this device.
- Do not imply shared competition or public user data.

Future behaviour:
- Authenticated global or organisation leaderboard only after privacy, identity, moderation and anti-cheat design is approved.

### 7.7 About

Explain the product's educational purpose, how the game works, its safety boundaries and the research references listed in the supplied project brief. The references are reproduced as supplied and must be verified before use in a formal academic or public research claim.

## 8. Game rules and scoring

- Mixed round: choose up to 10 scenarios from the scenario bank.
- Email-only and SMS-only filters: use the available scenarios in that channel, up to 10.
- Each correct answer: 100 base points.
- Streak bonus: +10 points per consecutive correct decision, capped at +50 per answer.
- Incorrect answer: 0 points for that decision and streak resets to zero.
- Feedback is shown after every decision, correct or incorrect.
- The user must acknowledge feedback before continuing.
- Best streak is the highest consecutive-correct count in the current round.
- Accuracy = correct decisions / total decisions × 100.
- Channel accuracy is calculated independently for email and SMS.

Ranks:

| Score | Rank | Coaching message |
|---:|---|---|
| 0–249 | New recruit | Start with the basics; practise the sender and request checks. |
| 250–599 | Security Scout | You are beginning to recognise common warning signs. |
| 600–949 | Cyber Defender | You are building reliable habits; keep practising ambiguous examples. |
| 950–1,249 | Threat Hunter | Strong awareness; continue verifying context and identity. |
| 1,250+ | Cyber Guardian | Excellent performance in this training set. Real messages still require care. |

A rank is a game reward, not a real-world security certification or assurance.

## 9. Scenario content requirements

The current bank contains 12 examples (6 email, 6 SMS) with a mixture of phishing and safe messages. The set includes:

- Lookalike sender domain and fake account warning.
- Routine library due-date reminder.
- Delivery-fee smishing.
- Supplier bank-detail change / business email compromise.
- Routine IT maintenance notification.
- Benign sign-in notification.
- Password and MFA-code request.
- Workshop booking confirmation.
- Account-takeover code request.
- Unexpected prize and processing fee.
- Tuition payment receipt notification.
- Appointment reminder.

### Scenario schema

Each scenario must provide:

| Field | Type | Description |
|---|---|---|
| `id` | string | Stable unique identifier. |
| `channel` | `email` or `sms` | Message channel. |
| `verdict` | `phishing` or `safe` | Correct decision. |
| `category` | string | Threat or communication pattern. |
| `senderName` | string | Display name or contact label. |
| `sender` | string | Fictional address or sender number. |
| `recipient` | string | Recipient context (email only where applicable). |
| `subject` | string | Email subject or SMS label. |
| `date` | string | Display timestamp. |
| `body` | string | Message content. |
| `clues` | array | Exact phrase and explanation for each learning signal. |
| `explanation` | string | Overall reasoning for the correct verdict. |
| `action` | string | Safe, practical real-world next step. |

Every future scenario must have editorial review for realistic context, accurate reasoning, balanced difficulty and safe wording. Do not label a message safe solely because it looks polished or uses a familiar name. “Safe” examples should be framed as safe within the scenario's known context, not universally trustworthy.

## 10. Visual and interaction direction

Follow the provided screenshot's broad design direction:
- White/light grey application canvas.
- Deep navy and blue typography.
- Cyan/teal accent for product identity and highlights.
- Dark navy central learning/game feature area.
- White rounded panels with subtle borders and restrained shadows.
- Progress/status panel to the left, central message card and clue checklist to the right on wide screens.
- Large circular red/green decision controls.
- Friendly but professional cybersecurity education tone.

Do not copy the screenshot's logo or assets verbatim. Recreate the layout hierarchy with original CSS, SVG and interface elements.

Responsive behaviour:
- Desktop: three-column game layout.
- Tablet: reduce to two columns and move the clue panel below the card.
- Mobile: one-column flow, compact navigation and touch-friendly decision controls.
- Avoid horizontal overflow at 320px viewport width.

## 11. Technical architecture (current MVP)

**Stack:** semantic HTML, CSS and vanilla JavaScript. No bundler or runtime package dependency.

```text
index.html
styles.css
js/scenarios.js
js/app.js
```

Responsibilities:
- `index.html`: app shell, navigation, page sections, dialogs and accessible landmarks.
- `styles.css`: visual tokens, responsive layouts, card animation and reduced-motion support.
- `js/scenarios.js`: static scenario dataset.
- `js/app.js`: navigation, session state, randomised question selection, pointer gestures, keyboard controls, answer evaluation, score, feedback, results and local persistence.

The scenario dataset is exposed as `window.PHISHSWIPE_SCENARIOS`. The application stores the local profile and top 10 round records in `localStorage` under `phishswipe.local.v1`.

## 12. State model

Runtime state:

- Current route.
- Current scenario queue and index.
- Score, current streak and best streak.
- Answers recorded in the current round.
- Active-session and feedback-modal state.
- Pointer drag origin and horizontal displacement.
- Local player profile and history.

Persistence:

- Profile display name.
- Up to ten score records (name, score, accuracy, timestamp, best streak and question count).

Do not persist passwords, emails, personal messages or other sensitive information. No credentials are required in this version.

## 13. Accessibility requirements

- Semantic header, navigation, main and footer landmarks.
- Skip-to-content link.
- All actions available through explicit buttons, not drag gestures alone.
- Keyboard shortcuts documented visually and implemented without intercepting text-entry controls.
- Visible focus states.
- Dialogs use `role="dialog"`, `aria-modal="true"` and labelled headings.
- Status updates use a live region where useful.
- Colour is not the sole carrier of verdict or state; labels and symbols are included.
- Maintain readable contrast and responsive text sizing.
- Respect `prefers-reduced-motion`.
- Ensure mobile controls have comfortable touch targets.

## 14. Security, safety and privacy requirements

- All scenario names, sender identities, phone numbers and domains are fictional.
- Use `.example` domains and inert URL text only. Never embed real credential-harvesting URLs.
- Do not create forms that collect real passwords, payment details or MFA codes.
- Never encourage users to click a real suspicious link as part of training.
- Render scenario content as text and escape user-controlled values before inserting into HTML.
- Do not load remote scenario content or execute untrusted scenario HTML.
- Avoid storing sensitive content in browser storage.
- Clearly disclose that all progress is local and browser-specific.
- Do not claim that the game can detect, block or neutralise a real phishing attempt.

## 15. Analytics and measurement (future)

Potential opt-in aggregate metrics after a privacy review:
- Round completion rate.
- Accuracy by channel and threat category.
- Repeat practice frequency.
- Most frequently missed red-flag categories.
- Improvement between first and later attempts.

Do not collect message contents, passwords, MFA codes, personal contacts or browsing history. If used in educational research, define consent, retention, anonymisation and institutional review requirements before collecting data.

## 16. Acceptance criteria for the MVP

1. App opens into a polished Home view with the PhishSwipe identity and working navigation.
2. A user can start a mixed round and channel-filtered rounds.
3. A round presents up to 10 cards from the scenario bank.
4. Each card renders the correct email or SMS layout.
5. Left drag, right drag, left/right keyboard arrows and on-screen buttons all submit a verdict.
6. The card cannot be answered twice while feedback is open.
7. Every answer produces a feedback dialog with the correct verdict, explanation, clues and recommended action.
8. Correct answers award base points and streak bonuses; wrong answers reset the streak.
9. The final results show score, accuracy, best streak, per-channel accuracy, correct count and rank.
10. The local leaderboard persists after reload and is labelled as local.
11. Tips and About pages are complete and navigable.
12. Layout works at 320px, tablet and desktop sizes without horizontal overflow.
13. No scenario link is clickable or points to a live domain.
14. The console has no uncaught JavaScript errors during a complete round.
15. The app remains useful without touch or drag, using buttons and keyboard controls.

## 17. Test plan

### Functional
- Start a mixed round; confirm up to 10 cards.
- Start email-only and SMS-only rounds; confirm only matching channels appear.
- Submit correct and incorrect answers via buttons.
- Submit answers via keyboard arrows.
- Drag left and right beyond the swipe threshold.
- Drag vertically; confirm it does not submit an answer.
- Confirm feedback blocks repeat input until next.
- Complete a round and inspect all result metrics.
- Reload and confirm local scores/profile persist.
- Change profile name and confirm it persists.
- Restart the round and confirm score/streak/index reset.

### Responsive and accessibility
- Test 320px, 375px, 768px, 1024px and wide desktop.
- Test keyboard-only navigation, focus visibility and dialog focus.
- Confirm no content is conveyed by colour alone.
- Test reduced motion.
- Confirm long sender addresses and URLs wrap within cards.

### Safety
- Confirm `.example` links are inert text.
- Confirm no form requests a real password, payment card or MFA code.
- Confirm scenario strings are escaped before rendering.
- Confirm privacy copy does not imply server-side storage or global rankings.

## 18. Product roadmap

### Phase 1 — MVP (implemented in this repository)
- Static responsive site.
- 12 scenario dataset.
- Swipe / button / keyboard controls.
- Instant educational feedback.
- Score, streak, ranks and local leaderboard.
- Tips and About pages.

### Phase 2 — Learning depth
- Difficulty levels and scenario packs.
- More social-engineering categories: QR phishing, impersonation, invoice fraud, MFA fatigue, fake support, malicious attachment lures and calendar invites.
- Explain-the-clue challenge where the player selects evidence before choosing a verdict.
- Review mode for missed scenarios.
- Content authoring schema and validation tests.

### Phase 3 — Accounts and educator tools
- Optional authentication.
- Cloud profile and cross-device progress.
- Instructor/classroom assignment mode.
- Private cohort leaderboard and aggregated class insights.
- Exportable completion summaries.
- Role-based content management.

### Phase 4 — Organisation training platform
- Organisation workspaces and teams.
- Assigned learning campaigns and scheduled refreshers.
- LMS/SCORM or xAPI integration after requirements analysis.
- Accessibility, privacy and security audit.
- Content versioning and review workflow.
- Evidence-based reporting without collecting message secrets.

## 19. Project responsibilities

The project is developed and maintained as a single-owner build. The implementation covers the visual design, responsive interface, game mechanics, scenario content, educational feedback and presentation materials. These responsibilities are organized across `index.html`, `styles.css`, `js/app.js` and `js/scenarios.js` for a straightforward static build.

## 20. Research references from the supplied brief

The following references were listed by the user-provided project brief. They are included here as project context, not as independently verified evidence:

1. ThreatLocker, “Gamification in cybersecurity: How game-based training improves security awareness.” https://www.threatlocker.com/blog/gamification-in-cybersecurity-how-game-based-training-improves-security-awareness
2. Lorrie Faith Cranor, “Can Phishing Be Foiled?”, *Scientific American*, 2008. https://www.scientificamerican.com/article/can-phishing-be-foiled/
3. Galinki, Amer & Kaphle, “A Gamified Web-Based Approach to Improving Phishing and Social Engineering Attack Recognition Skills” (2026), as named in the brief. https://www.ijcaonline.org/archives/volume187/number132/galinki-ijca-2026-69b0236efc73.pdf

---

**Product boundary reminder:** a high score indicates performance on this training set only. Real attacks vary and evolve. Users should verify unusual requests through independently trusted channels and follow their organisation's security procedures.


---

# PhishSwipe — Presentation Guide

The deck can use eight slides and a short live demo.

## Slide 1 — Product
Introduce PhishSwipe: a gamified phishing-awareness web application that helps users practise identifying suspicious emails and SMS messages.

## Slide 2 — The problem
Explain that phishing imitates real organisations and people. Professional-looking messages can still be fraudulent, and passive training can be easy to forget. Emphasise the human decision point: a person may be pressured to click, pay or disclose information.

## Slide 3 — UI/UX design
Show the dashboard layout: progress panel, central message card, clue checklist and prominent left/right decisions. Explain the responsive design and why the interaction is simple enough to learn immediately.

## Slide 4 — Live game demo
Start a round. Show one suspicious email and make a left swipe. Then show a legitimate message and make a right swipe. Demonstrate that buttons and keyboard arrows are available as alternatives.

## Slide 5 — Game mechanics
Explain round progress, score, consecutive-correct streak bonus and reset on an incorrect answer. Show how the app updates progress after every decision.

## Slide 6 — Scenario dataset
Explain that each fictional scenario includes channel, sender, content, verdict, category, clue phrases, explanation and safe next step. Mention the mix of email and SMS scenarios.

## Slide 7 — Instant feedback and learning
Show the feedback dialog. Explain that the app highlights evidence such as lookalike sender domains, artificial urgency, suspicious links and requests for passwords or one-time codes. Stress that the aim is to teach why a decision is correct, not just whether it is correct.

## Slide 8 — Project workflow and conclusion
Summarise the interface, game engine and cybersecurity content as parts of one cohesive project. Conclude that PhishSwipe makes awareness practice more engaging, while remaining a supplement to—not a replacement for—security controls.

## Suggested demo sequence

1. Open Home and point out the progress panel and clue checklist.
2. Select Play and start the mixed 10-scenario round.
3. Inspect a suspicious email; swipe left or press the left arrow.
4. Read the explanation and clue evidence.
5. Continue to a safe message; swipe right or press the right arrow.
6. Finish a round or use a short prepared capture of the results screen.
7. Open Tips and then the local Leaderboard.

## Presentation caveats

- All sender identities and `.example` domains are fictional.
- The local leaderboard is stored in the browser and is not a global class leaderboard.
- Do not claim the product blocks phishing or scans real inboxes.
- Research references are copied from the project brief and should be checked before formal academic citation.


---

# Master Build Prompt — PhishSwipe (A to Z)

Use this build brief to rebuild, extend or faithfully implement the complete PhishSwipe website. It includes the product goal, reference direction, user journeys, pages, UI, gameplay, scenario data, architecture, quality requirements and definition of done.

---

## PROMPT START

Act as a senior product designer, UX architect, frontend engineer and cybersecurity-learning content designer. Build a complete, polished, responsive web application named **PhishSwipe** with the tagline **“Learn to spot phishing before it catches you.”** The product is a gamified phishing-awareness training platform. It must be a usable, working website—not a static mockup or landing-page-only concept.

### 1. Product purpose

Create an engaging, swipe-based learning game in which users review fictional email and text-message scenarios. The user swipes **left for phishing** and **right for safe/legitimate**. After every answer, show immediate educational feedback that identifies the warning signs, explains why the verdict is correct and recommends a safe action. The central educational requirement is that the game teaches reasoning rather than encouraging blind guessing.

The product supports awareness and practice. It is not an inbox scanner, anti-spam filter, email client, threat-detection service or guarantee of safety.

### 2. Reference design direction

Use the supplied PhishSwipe screenshot as visual inspiration for overall hierarchy and atmosphere:
- Clean white/light-grey page background.
- Deep navy, cobalt blue and cyan/teal identity.
- Header with shield logo, product name/tagline, navigation and local player profile.
- Desktop learning view arranged as a left progress panel, central message card stack and right-side “Spot the clues” checklist.
- Central card resembles an email or SMS preview, with a subtle layered card stack behind it.
- Prominent red circular phishing action and green circular safe action.
- White rounded panels, soft shadows, restrained borders and clear typography.
- Friendly, credible, modern educational design. Avoid childish visuals and excessive decoration.
- Create original assets using CSS/SVG; do not copy any screenshot logo or third-party brand assets.

Use responsive layouts: three columns on wide desktop; two columns/tablet with supporting content below; one-column mobile layout with large touch targets and no horizontal overflow.

### 3. Brand and tone

Brand: PhishSwipe.  
Tagline: Learn to spot phishing before it catches you.  
Core phrase: “Phish or Legit?”  
Tone: clear, supportive, practical, confidence-building, not alarmist. Never shame users for an incorrect answer. Use “Learning moment” language where relevant.

### 4. Required navigation and pages

Build these pages as working views/routes, not inert menu items:

**Home**
- Product introduction and training-mode label.
- Progress card with best score, best accuracy, best streak, level/rank and practice history.
- Prominent “Start a training round” CTA.
- A visual game/secure-message illustration.
- “Spot the clues” checklist: check sender, beware urgency, hover/check links, unexpected attachments.
- Short reassurance and demo/privacy note.

**Play**
- Scenario filter: Email + SMS, Emails only, Text messages only.
- Score and maximum possible score, streak, round progress and level.
- Stack of fictional message cards.
- Email card fields: sender name, sender email, recipient, subject, timestamp, body and inert link text if applicable.
- SMS card fields: sender/contact, phone/contact label, timestamp and message body.
- Decision controls: large red Phishing/left and green Safe/right controls.
- Drag-to-swipe support on touch and pointer devices.
- Keyboard arrow support: Left = phishing, Right = safe.
- Buttons must always be available as accessible alternatives to dragging.
- Progress dots and short instructions.
- Contextual clue checklist on the right or below.

**Feedback dialog**
- Appear after every decision.
- Clearly state whether the user's answer was correct.
- State the correct verdict.
- Explain the pattern in plain language.
- Show individual clue phrases and explain why each is meaningful.
- Highlight exact evidence in the scenario text wherever practical.
- Provide “What to do in real life” guidance.
- Award points only when the decision is correct.
- Require acknowledgement before continuing to the next scenario.
- Prevent double-submission while feedback is open.

**Round results**
- Show points, accuracy, best streak, correct count, email accuracy and SMS accuracy where applicable.
- Assign a fun training rank: New recruit, Security Scout, Cyber Defender, Threat Hunter, Cyber Guardian.
- Use positive coaching language and remind users that a training score does not prove real-world immunity.
- Buttons: Play again and View leaderboard.

**Tips**
Create a practical guide covering:
1. Inspect the sender address, domain and reply-to details.
2. Slow down urgent, threatening or prize-related language.
3. Verify the real destination; never trust link text alone.
4. Treat unexpected attachments carefully.
5. Never share passwords, one-time/MFA codes or sensitive payment details in response to an unsolicited message.
6. Verify independently using an app, bookmark or contact detail already known to the user.

**Leaderboard**
- MVP leaderboard uses local browser records only.
- Show up to the top 10 scores, sorted by score and accuracy.
- Label it explicitly as “local leaderboard” and state that the records are stored on this device.
- Do not imply global or multiplayer competition unless a real, secure backend is implemented.

**About**
- Explain the learning concept, three-part loop (scenario, decision, feedback), intended audience and safety boundary.
- Include the research references supplied in the project brief, but indicate they require verification before formal claims/citation.

### 5. Game mechanics

- Use a 12-scenario starter dataset with both phishing and safe messages, split across email and SMS.
- Standard mixed round uses up to 10 randomly selected scenarios.
- Channel-specific rounds use scenarios in that channel (up to 10).
- Each correct answer: 100 base points.
- Add a streak bonus of +10 for each consecutive correct answer, capped at +50 per question.
- Wrong answer earns zero points for that question and resets current streak to zero.
- Track the best streak for the round.
- Update score, progress and streak after each answer.
- Accuracy is correct answers divided by answers submitted.
- Calculate email and SMS accuracy independently.
- Avoid exposing the verdict in card styling before the player answers.
- Randomise scenario order while keeping every scenario's answer and feedback metadata attached.
- Allow restarting the round and changing the filter.

### 6. Scenario content and safety rules

Create at least 12 realistic, educational scenarios with an approximate balance of phishing and safe items. Include examples such as:
- Lookalike sender domain and fake account warning.
- Routine university/library reminder.
- Delivery-fee smishing.
- Supplier bank account change / business email compromise.
- Routine IT maintenance notification.
- Benign sign-in alert.
- Password and MFA-code request.
- Workshop or event booking confirmation.
- Account takeover using one-time code disclosure.
- Unexpected prize and processing-fee message.
- Tuition/payment receipt notice.
- Appointment reminder.

Every scenario object must include:
- Stable `id`.
- `channel` (`email` or `sms`).
- `verdict` (`phishing` or `safe`).
- `category`.
- Sender name and address/number.
- Recipient (where relevant), subject, date and body.
- `clues`: an array of exact phrases and explanations.
- Overall explanation.
- Safe next action.

Safety requirements:
- Use wholly fictional people, organisations, email addresses and phone numbers.
- Use reserved `.example` domains only.
- URLs must be inert display text, never clickable links.
- Never collect real passwords, one-time codes, payment-card details or personal messages.
- Do not include live malicious links, credential-harvesting forms or malware attachments.
- Never instruct users to click suspicious URLs to test them.
- Do not label content safe only because it looks professional. Make context and sender verification part of the explanation.

### 7. Scoring ranks

Use these score bands (adjust only if the game length changes):
- 0–249: New recruit.
- 250–599: Security Scout.
- 600–949: Cyber Defender.
- 950–1,249: Threat Hunter.
- 1,250+: Cyber Guardian.

Rank copy must be encouraging and must not claim certification or security assurance.

### 8. Profile and persistence

For the no-backend MVP:
- Use a default display name such as “Learner”.
- Allow the display name to be changed.
- Save only profile display name and top 10 round records to local browser storage.
- Make it clear this is device/browser-local storage and may be lost if browser data is cleared.
- Do not request registration or sensitive data.

If a real account/backend is later introduced, design a consent-aware privacy model, secure authentication and explicit data retention; do not silently introduce these in the static MVP.

### 9. Technical implementation

Prefer a simple dependency-free implementation using semantic HTML, CSS and vanilla JavaScript unless the host environment explicitly requires a framework. Keep code structured and readable:
- `index.html`: semantic app shell, navigation, page sections and dialogs.
- `styles.css`: design tokens, components, responsive layouts, animations and reduced-motion support.
- `js/scenarios.js`: structured scenario dataset.
- `js/app.js`: routing, state, interaction, scoring, feedback, results and local persistence.
- `docs/PRODUCT_SPEC.md`: detailed specification.
- `docs/BUILD_PROMPT.md`: this master prompt.
- `docs/PRESENTATION_GUIDE.md`: presentation outline.

Separate data from UI logic. Escape scenario strings before rendering. Never execute scenario HTML. Use event listeners and maintain a clear session state so an answer can only be recorded once.

### 10. Accessibility and usability

- Semantic landmarks and heading hierarchy.
- Skip-to-content link.
- Visible focus indicators.
- Dialog roles and accessible labels.
- Keyboard-only operation supported.
- Dragging is never the only way to interact.
- Do not use colour alone to communicate correctness or navigation state.
- Comfortable touch targets.
- Readable contrast and text wrapping for long sender addresses.
- Respect `prefers-reduced-motion`.
- Avoid horizontal scrolling at 320px viewport width.

### 11. Quality and acceptance criteria

The build is not complete until:
1. All five navigation sections work.
2. Home CTA starts a real game round.
3. All scenario cards render their correct channel layout.
4. Left/right drag, arrow keys and explicit buttons all work.
5. Vertical scrolling does not accidentally submit a swipe.
6. Each answer opens detailed feedback and disables repeat input.
7. Explanations include clue phrases and actionable advice.
8. Points and streak logic work as specified.
9. Round results correctly show total and per-channel metrics.
10. Local scores and profile persist across reloads.
11. Leaderboard clearly indicates local-only scope.
12. Tips and About content are complete.
13. Responsive UI works at mobile, tablet and desktop sizes.
14. No real suspicious links are opened or embedded.
15. All user- or scenario-supplied text is safely escaped.
16. No uncaught console errors occur during a complete round.
17. The README explains how to run locally.

Test the key paths manually and fix errors before reporting completion. Do not stop after producing a hero section or a visual mockup. Deliver a complete working application.

### 12. Future-ready roadmap (do not fake these as implemented)

Prepare architecture so future versions could add:
- Difficulty levels and themed packs.
- Review mode for missed questions.
- Explain-the-clue mode.
- Scenario authoring and editorial approval.
- Accounts and cross-device sync.
- Teacher/admin dashboard and class assignments.
- Private team leaderboards and aggregated learning reports.
- LMS integration and completion exports.
- More social-engineering formats such as QR phishing, fake support, invoice fraud and calendar invitations.

Do not show non-functional buttons for future items. Mark roadmap features as planned rather than implemented.

### 13. Final response expected from the coding agent

When finished, provide:
- A list of pages and functions implemented.
- Project file tree.
- Exact local run instructions.
- Tests performed and any known limitations.
- Deployment instructions or live preview link only if an actual deployment was completed.
- Git repository URL only if a real remote repository was successfully created and pushed.

Build the entire PhishSwipe website now, with complete UI, interactions, educational content, documentation and quality checks.

## PROMPT END

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

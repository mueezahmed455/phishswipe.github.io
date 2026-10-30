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

/*
 * PhishSwipe scenario bank.
 * All names, organisations, email addresses, phone numbers and domains are fictional.
 * The .example domain is reserved for documentation; every displayed URL is inert text.
 */
window.PHISHSWIPE_SCENARIOS = [
  {
    id: 'em-01', channel: 'email', verdict: 'phishing', category: 'Credential theft',
    senderName: 'PayPal Account Security', sender: 'security-update@paypal-support.example', recipient: 'you@university.example',
    subject: 'Urgent: Verify your account now', date: 'Mon, 12 Feb, 10:24 AM',
    body: 'Hi there,\n\nYour account has been limited due to suspicious activity. Click the link below within 24 hours to avoid suspension.\n\nVerify your account: https://paypal-support.example/account/verify\n\nThanks,\nPayPal Security Team',
    clues: [
      { text: 'security-update@paypal-support.example', reason: 'The sender domain is not the organisation’s official domain. A familiar display name can be copied.', kind: 'sender' },
      { text: 'Your account has been limited', reason: 'The message uses an alarming account problem to make you react quickly.', kind: 'urgency' },
      { text: 'within 24 hours', reason: 'A deadline creates pressure and discourages independent verification.', kind: 'urgency' },
      { text: 'paypal-support.example/account/verify', reason: 'The link goes to a lookalike domain. Do not use a link in an unexpected account warning.', kind: 'link' }
    ],
    explanation: 'This is a phishing attempt. The sender uses a lookalike domain and a threatening deadline to push you towards a credential-harvesting page.',
    action: 'Do not click the link or reply. Open the service using its official app or a saved bookmark and check account alerts there.'
  },
  {
    id: 'sms-06', channel: 'sms', verdict: 'safe', category: 'Routine communication',
    senderName: 'Northbridge University Library', sender: 'Library Services (saved contact)', recipient: 'Your mobile',
    subject: 'SMS message', date: 'Tue, 13 Feb, 9:05 AM',
    body: 'Library reminder: the book “Introduction to Computing” is due on 20 February. You can review your loans by opening the library portal from the university website or by visiting the library desk. There is no action needed if you have already returned the book.',
    clues: [
      { text: 'due on 20 February', reason: 'A clear, ordinary reminder with a specific date is consistent with a routine library notice.', kind: 'context' },
      { text: 'opening the library portal from the university website', reason: 'The message directs you to navigate independently rather than press an unexpected sign-in link.', kind: 'good' },
      { text: 'There is no action needed if you have already returned the book.', reason: 'The message is informative and does not create artificial pressure or request sensitive details.', kind: 'good' }
    ],
    explanation: 'This example is designed to be treated as safe: it provides a routine reminder, avoids a sign-in link and does not ask for credentials or payment. Always check that the sender and context make sense for you.',
    action: 'If you are unsure, visit the library through the university’s known website or contact the library using published contact details.'
  },
  {
    id: 'sms-01', channel: 'sms', verdict: 'phishing', category: 'Delivery scam',
    senderName: 'Parcel Delivery', sender: '+44 7700 900184', recipient: 'Your mobile',
    subject: 'SMS message', date: 'Today, 8:42 AM',
    body: 'DELIVERY NOTICE: Your parcel is on hold because a £1.45 redelivery fee is unpaid. Pay now to release it: https://parcel-redelivery.example/fee. Failure to pay today will return your parcel.',
    clues: [
      { text: '£1.45 redelivery fee is unpaid', reason: 'A small unexpected fee is often used to make a payment request feel harmless.', kind: 'payment' },
      { text: 'Pay now to release it', reason: 'The sender pushes you into a payment action without giving verifiable delivery details.', kind: 'urgency' },
      { text: 'parcel-redelivery.example/fee', reason: 'The URL is an unverified domain. Do not use it to enter payment information.', kind: 'link' }
    ],
    explanation: 'This is a delivery-fee smishing attempt (phishing by SMS). The small payment and threat of losing a parcel are designed to make the link feel plausible.',
    action: 'Do not open the link or enter card details. Check tracking in the delivery company’s official app or website using a tracking number you already have.'
  },
  {
    id: 'em-03', channel: 'email', verdict: 'phishing', category: 'Business email compromise',
    senderName: 'Finance Director', sender: 'finance.director@northbridqe.example', recipient: 'accounts@northbridge-university.example',
    subject: 'Confidential — change supplier bank details', date: 'Wed, 14 Feb, 4:51 PM',
    body: 'Hi team,\n\nI am in meetings and cannot take calls. Please update the supplier bank details to the account in the attached document before today’s payment run. Keep this request confidential until the transfer is complete.\n\nPlease confirm by reply once done.\n\nThanks,\nFinance Director',
    clues: [
      { text: 'finance.director@northbridqe.example', reason: 'The domain contains a subtle spelling substitution: “northbridqe” rather than “northbridge”.', kind: 'sender' },
      { text: 'cannot take calls', reason: 'The sender gives a reason to avoid a second channel of verification.', kind: 'context' },
      { text: 'update the supplier bank details', reason: 'Changing payment details is a high-impact request and must be verified independently.', kind: 'payment' },
      { text: 'Keep this request confidential', reason: 'Secrecy is used to bypass normal finance controls and peer review.', kind: 'urgency' }
    ],
    explanation: 'This is a business email compromise pattern. The attacker impersonates a senior colleague, requests a bank-detail change and tries to prevent verification.',
    action: 'Do not change payment details based on the email. Follow the organisation’s payment-change procedure and verify with the colleague using a known number.'
  },
  {
    id: 'sms-02', channel: 'sms', verdict: 'safe', category: 'Service notification',
    senderName: 'Northbridge IT Service Desk', sender: 'IT Desk (saved contact)', recipient: 'Your mobile',
    subject: 'SMS message', date: 'Today, 11:16 AM',
    body: 'Reminder: planned Wi-Fi maintenance is scheduled for 7:00–7:30 PM tonight in the main library. No action is required. Service updates are available on the IT status page reached from the university homepage.',
    clues: [
      { text: 'planned Wi-Fi maintenance is scheduled for 7:00–7:30 PM tonight', reason: 'The message provides a specific operational notice that matches a plausible service update.', kind: 'context' },
      { text: 'No action is required.', reason: 'It does not ask you to sign in, pay, share information or download anything.', kind: 'good' },
      { text: 'status page reached from the university homepage', reason: 'It suggests navigating through a known website rather than following an unsolicited link.', kind: 'good' }
    ],
    explanation: 'This is an example of a safe service notification. It is informational, has no embedded link and does not ask for credentials or payment. In a real situation, still confirm the sender and whether the maintenance notice is expected.',
    action: 'You can check the IT status page by navigating from the university homepage or contacting the service desk through a known channel.'
  },
  {
    id: 'em-04', channel: 'email', verdict: 'safe', category: 'Account notification',
    senderName: 'CloudNotes', sender: 'notifications@cloudnotes.example', recipient: 'you@university.example',
    subject: 'A new sign-in to your CloudNotes account', date: 'Thu, 15 Feb, 2:09 PM',
    body: 'Hello,\n\nA sign-in to your CloudNotes account was detected from a new browser on Windows. If this was you, no action is needed.\n\nIf you do not recognise this activity, open CloudNotes directly from your usual bookmark and review your security settings. We will never ask you to send us your password or one-time code by email.\n\nCloudNotes Notifications',
    clues: [
      { text: 'If this was you, no action is needed.', reason: 'The message does not pressure you into an immediate action.', kind: 'good' },
      { text: 'open CloudNotes directly from your usual bookmark', reason: 'It recommends using a known route instead of an embedded sign-in link.', kind: 'good' },
      { text: 'We will never ask you to send us your password or one-time code by email.', reason: 'The message reinforces safe credential handling rather than asking for secrets.', kind: 'good' }
    ],
    explanation: 'This example is intended to be safe. It provides a sign-in alert and tells you to navigate independently if you do not recognise the activity.',
    action: 'If the activity was not yours, go to the service through your saved bookmark, review sessions and change your password there. Never share an MFA code.'
  },
  {
    id: 'em-05', channel: 'email', verdict: 'phishing', category: 'MFA fatigue / credential theft',
    senderName: 'University Identity Team', sender: 'identity-alert@northbridge-login.example', recipient: 'you@northbridge-university.example',
    subject: 'Your access will be removed', date: 'Fri, 16 Feb, 7:33 AM',
    body: 'Your university access expires today. To keep your mailbox active, reply with your password and the six-digit verification code sent to your phone. If you do not respond in 30 minutes, your access will be permanently removed.',
    clues: [
      { text: 'identity-alert@northbridge-login.example', reason: 'The domain is not the university’s normal domain and imitates a login service.', kind: 'sender' },
      { text: 'reply with your password', reason: 'A legitimate service desk should never ask you to send your password by email.', kind: 'credential' },
      { text: 'six-digit verification code', reason: 'One-time codes must not be shared. Attackers can use them to bypass MFA.', kind: 'credential' },
      { text: 'in 30 minutes', reason: 'The extreme deadline is designed to trigger panic and prevent verification.', kind: 'urgency' }
    ],
    explanation: 'This is a credential-theft attempt. It asks for both a password and a one-time code, which could allow an attacker to access the account.',
    action: 'Never reply with passwords or MFA codes. Report the message through your institution’s IT/security process and check your account using its official sign-in page.'
  },
  {
    id: 'sms-03', channel: 'sms', verdict: 'phishing', category: 'Account takeover',
    senderName: 'Account Support', sender: '+44 7700 900271', recipient: 'Your mobile',
    subject: 'SMS message', date: 'Today, 1:04 PM',
    body: 'We noticed a login from a new device. Was this you? Reply YES to approve or NO to cancel. If you did not request this, send the six-digit code we just texted you so we can secure your account.',
    clues: [
      { text: 'Reply YES to approve or NO to cancel.', reason: 'An unexpected message asks you to make a security decision by replying to an unverified sender.', kind: 'context' },
      { text: 'send the six-digit code', reason: 'A verification code is intended only for you. Sharing it can hand over account access.', kind: 'credential' },
      { text: 'so we can secure your account', reason: 'The sender uses reassuring language to disguise a request for a sensitive security code.', kind: 'context' }
    ],
    explanation: 'This is an account-takeover attempt. The attacker tries to persuade you to disclose a one-time code under the pretext of protecting your account.',
    action: 'Do not reply or share the code. Open the service’s official app directly, review recent activity and report the suspicious message.'
  },
  {
    id: 'em-06', channel: 'email', verdict: 'safe', category: 'Event information',
    senderName: 'Student Events Office', sender: 'events@northbridge-university.example', recipient: 'you@northbridge-university.example',
    subject: 'Workshop booking confirmed', date: 'Fri, 16 Feb, 3:20 PM',
    body: 'Hi Jamie,\n\nYour place at the Introduction to Cyber Safety workshop is confirmed for Tuesday at 2:00 PM in Room 204. Please bring your student ID for the attendance register.\n\nIf you can no longer attend, contact the Student Events Office using the details on the university website.\n\nWe look forward to seeing you.',
    clues: [
      { text: 'Your place at the Introduction to Cyber Safety workshop is confirmed', reason: 'The message gives a relevant booking confirmation with clear event details.', kind: 'context' },
      { text: 'Tuesday at 2:00 PM in Room 204', reason: 'It contains specific, ordinary logistical information.', kind: 'good' },
      { text: 'contact the Student Events Office using the details on the university website', reason: 'It directs you to independently sourced contact details, not a suspicious link.', kind: 'good' }
    ],
    explanation: 'This is a safe event confirmation example. It contains relevant details and does not request money, passwords or sensitive information.',
    action: 'Check that you recognise the workshop booking. When in doubt, contact the events team using details from the official university website.'
  },
  {
    id: 'sms-04', channel: 'sms', verdict: 'phishing', category: 'Prize scam',
    senderName: 'Rewards Centre', sender: '+44 7700 900332', recipient: 'Your mobile',
    subject: 'SMS message', date: 'Today, 4:18 PM',
    body: 'CONGRATULATIONS! Your number has been selected for a £500 gift card. Claim your prize in the next 10 minutes. A £2 processing charge applies: https://claim-reward.example/winner. Do not miss out!',
    clues: [
      { text: 'Your number has been selected for a £500 gift card', reason: 'An unexpected prize is a common lure, especially when you have not entered a competition.', kind: 'context' },
      { text: 'in the next 10 minutes', reason: 'A very short deadline is designed to stop you checking whether the offer is genuine.', kind: 'urgency' },
      { text: '£2 processing charge applies', reason: 'The small fee may be used to collect payment-card details or personal information.', kind: 'payment' },
      { text: 'claim-reward.example/winner', reason: 'The link is an unverified placeholder domain and should not be opened.', kind: 'link' }
    ],
    explanation: 'This is a prize scam delivered by SMS. It combines an unexpected reward, artificial urgency and a small fee to attract payment details.',
    action: 'Do not pay the fee or provide personal details. Delete/report the message and verify competitions only through the organiser’s official website.'
  },
  {
    id: 'em-07', channel: 'email', verdict: 'safe', category: 'Routine finance notice',
    senderName: 'Campus Finance Office', sender: 'finance-office@northbridge-university.example', recipient: 'you@northbridge-university.example',
    subject: 'Tuition payment receipt available', date: 'Mon, 19 Feb, 10:12 AM',
    body: 'Hello,\n\nYour recent tuition payment has been recorded. A receipt is available in the student portal. To view it, open the portal from the university homepage and select Finance > Payment history.\n\nIf the amount does not look right, contact the Finance Office using the phone number published on the university website.\n\nRegards,\nCampus Finance Office',
    clues: [
      { text: 'Your recent tuition payment has been recorded.', reason: 'The message confirms an expected transaction without requesting another payment.', kind: 'good' },
      { text: 'open the portal from the university homepage', reason: 'The instruction avoids an embedded payment or sign-in link.', kind: 'good' },
      { text: 'contact the Finance Office using the phone number published on the university website', reason: 'It recommends independently verified contact details.', kind: 'good' }
    ],
    explanation: 'This is a safe example of a routine finance notice. It does not demand additional payment or ask for card information by email.',
    action: 'Check the student portal by navigating from the university homepage. Use the published finance contact details if anything is unexpected.'
  },
  {
    id: 'sms-05', channel: 'sms', verdict: 'safe', category: 'Appointment reminder',
    senderName: 'Riverside Health Centre', sender: 'Riverside HC (saved contact)', recipient: 'Your mobile',
    subject: 'SMS message', date: 'Today, 5:02 PM',
    body: 'Reminder: you have an appointment tomorrow at 10:30 AM. Please arrive 10 minutes early. To change the appointment, call the health centre using the number on your appointment letter. This message does not require a reply.',
    clues: [
      { text: 'you have an appointment tomorrow at 10:30 AM', reason: 'A clear appointment reminder can be expected if you have booked a visit.', kind: 'context' },
      { text: 'call the health centre using the number on your appointment letter', reason: 'It points you to contact information you already hold.', kind: 'good' },
      { text: 'This message does not require a reply.', reason: 'It does not seek a password, payment, code or sensitive details.', kind: 'good' }
    ],
    explanation: 'This is a safe reminder example when it matches an appointment you actually booked. The message does not contain a payment request or an unfamiliar link.',
    action: 'Check that the appointment details match your records. For changes, use the phone number on your appointment letter or official provider website.'
  }
];

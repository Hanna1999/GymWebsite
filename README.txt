# IRONFORGE — Personal Workout Planner

A free, responsive front-end prototype for building a workout split around how many days per week you train and which gym machines/equipment you prefer.

## Run it
1. Extract the ZIP file.
2. Open the `ironforge-gym-website` folder in VS Code.
3. Recommended: use the **Live Server** extension and open `index.html` through localhost. (Browser password hashing requires a secure context.)
4. You can also open `index.html` directly, but some browser security features may not work from a `file://` URL.

## Features
- IRONFORGE dark/charcoal and red branding.
- Choose 2–6 training days per week.
- Choose a goal and experience level.
- Select preferred gym equipment; the plan generator only selects matching movements.
- Generated split with sets, rep ranges, completion checkboxes, and exercise-demo search links.
- Optional local profile and sign-in demo.
- Saves the selected plan and progress in the current browser using `localStorage`.
- No paid APIs, account service, or hosting required to run the prototype.

## Important limitations before a public launch
This is a static front-end prototype. Profiles, workout plans, and progress are saved only in the current browser/device. The registration form hashes the password locally for a demo, but that is **not production-grade authentication**. Do not use real/reused passwords. There is no server, database, email verification, password reset, cross-device sync, or account recovery. Before letting the public register, replace the demo auth with a secure authentication provider and backend/database, apply rate limiting and server-side validation, and publish privacy terms. Never store plain-text passwords.

Exercise demo buttons open YouTube search results rather than embedding a specific creator's media, so you can choose an appropriate demonstration. The plan generator is a simple starter algorithm, not medical or professional coaching advice.

# MY IRON PLAN — personal gym dashboard

A free-to-use personal workout website made with plain HTML, CSS, and JavaScript. No paid membership or API key is needed.

## Start
1. Extract `my-personal-gym.zip`.
2. Open `index.html` in your browser, or use VS Code with Live Server.
3. Choose a workout tab, log weights/reps, tick exercises off, and mark the session complete.
4. Progress is stored in this browser using localStorage.

## Files
- `index.html` — page structure
- `style.css` — visual design and responsive layout
- `script.js` — four-day workout plan, local tracking, and rule-based chatbot

## Personalization and limitations
The included plan is a general beginner-friendly four-day upper/lower routine. It is not a substitute for individualized coaching or medical clearance. Because the user has mentioned gastric bypass surgery, nutrition guidance intentionally refers protein/calorie targets, hydration, supplements, and monitoring to the user's bariatric team.

The chatbot uses predefined local JavaScript responses. It is not an online AI model, and does not send messages to a server. The site itself is free to use; fonts and photos are loaded from online services, so those visual assets require internet access. Training logs are stored only in the current browser/device and may be lost if browser data is cleared.

## Exercise GIF demonstrations
The workout cards try to load animated exercise demonstrations from the public ExerciseGymGifsDB dataset via jsDelivr. An internet connection is required for these GIFs. The dataset notes that GIFs belong to their respective authors; see the source repository and its usage notes: https://github.com/JahelCuadrado/ExerciseGymGifsDB

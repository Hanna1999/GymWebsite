const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const STORAGE_KEY = "myIronPlan_v1";

const workouts = {
  upperA: {
    title: "CHEST · BACK · SHOULDERS · ARMS",
    hint: "Beginner tip: use light weights while you learn each movement.",
    exercises: [
      ["Barbell or machine chest press","3 × 8–10","Chest","Rest 2–3 min","Use a spotter or machine; keep the movement controlled."],
      ["Seated cable row","3 × 10–12","Back","Rest 2 min","Pull toward your torso without swinging."],
      ["Incline dumbbell press","2 × 10–12","Upper chest","Rest 2 min","Use a comfortable incline and controlled reps."],
      ["Lat pulldown","2 × 10–12","Back","Rest 2 min","Pull toward the upper chest; avoid jerking."],
      ["Seated dumbbell shoulder press","2 × 10–12","Shoulders","Rest 2 min","Use a comfortable range of motion."],
      ["Dumbbell biceps curl","2 × 10–15","Biceps","Rest 60–90 sec","Keep elbows steady and avoid swinging."],
      ["Cable triceps pushdown","2 × 10–15","Triceps","Rest 60–90 sec","Keep elbows close to your sides."]
    ]
  },
  lowerA: {
    title: "QUADS · HAMSTRINGS · GLUTES · CORE",
    hint: "Learn the movement first. Ask a gym coach to check your form if you're unsure.",
    exercises: [
      ["Goblet squat or leg press","3 × 8–10","Quads / glutes","Rest 2–3 min","Choose a comfortable range and keep control."],
      ["Dumbbell Romanian deadlift","3 × 10–12","Hamstrings / glutes","Rest 2–3 min","Hinge at the hips; keep your back neutral."],
      ["Leg extension","2 × 12–15","Quads","Rest 60–90 sec","Move smoothly without kicking the weight."],
      ["Seated leg curl","2 × 12–15","Hamstrings","Rest 60–90 sec","Control both the lift and lowering."],
      ["Standing calf raise","2 × 12–15","Calves","Rest 60–90 sec","Use a full, comfortable range."],
      ["Dead bug","2 × 8–10 / side","Core","Rest 60 sec","Keep your lower back controlled and breathe."]
    ]
  },
  upperB: {
    title: "BACK · CHEST · REAR SHOULDERS · ARMS",
    hint: "Keep reps smooth. Stop before technique breaks down.",
    exercises: [
      ["Chest-supported dumbbell row","3 × 8–12","Upper back","Rest 2 min","Keep your chest supported by the bench."],
      ["Machine chest press","3 × 8–12","Chest","Rest 2 min","Set the seat so handles are around mid-chest."],
      ["Neutral-grip lat pulldown","2 × 10–12","Lats","Rest 2 min","Keep shoulders down and avoid leaning far back."],
      ["Dumbbell lateral raise","2 × 12–15","Side shoulders","Rest 60–90 sec","Use light weights and raise with control."],
      ["Reverse pec deck","2 × 12–15","Rear shoulders","Rest 60–90 sec","Move through the shoulders, not momentum."],
      ["Incline dumbbell curl","2 × 10–12","Biceps","Rest 60–90 sec","Use a comfortable shoulder position."],
      ["Cable triceps extension","2 × 10–15","Triceps","Rest 60–90 sec","Keep upper arms stable."]
    ]
  },
  lowerB: {
    title: "LEGS · GLUTES · HAMSTRINGS · CORE",
    hint: "If you are very sore or tired, reduce the load or take an extra recovery day.",
    exercises: [
      ["Leg press","3 × 10–12","Quads / glutes","Rest 2–3 min","Don't lock your knees or let your lower back curl."],
      ["Hip thrust","3 × 10–12","Glutes","Rest 2 min","Finish by squeezing glutes, not over-arching your back."],
      ["Reverse lunge","2 × 8–10 / leg","Legs / balance","Rest 2 min","Hold a support if needed; bodyweight is fine."],
      ["Lying leg curl","2 × 12–15","Hamstrings","Rest 60–90 sec","Keep hips supported and reps controlled."],
      ["Seated calf raise","2 × 12–15","Calves","Rest 60–90 sec","Pause briefly at the top."],
      ["Plank","2 × 20–40 sec","Core","Rest 60 sec","Breathe normally and keep your body aligned."]
    ]
  }
};
let activeDay = "upperA";
let state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return { sessions: Array.isArray(saved.sessions) ? saved.sessions : [], weights: Array.isArray(saved.weights) ? saved.weights : [], logs: saved.logs && typeof saved.logs === "object" ? saved.logs : {} };
  } catch { return { sessions: [], weights: [], logs: {} }; }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}
function renderWorkout(day) {
  activeDay = day;
  const data = workouts[day];
  $("#workoutFocus").textContent = data.title;
  $("#exerciseCount").textContent = `${data.exercises.length} EXERCISES`;
  $("#workoutHint").textContent = data.hint;
  $$(".day-tab").forEach(tab => {
    const selected = tab.dataset.day === day;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });
  $("#exerciseList").innerHTML = data.exercises.map((ex, i) => {
    const key = `${day}_${i}`;
    const log = state.logs[key] || {};
    return `<article class="exercise-card">
      <div class="exercise-number">${String(i+1).padStart(2,"0")}</div>
      <div class="exercise-info"><h3>${escapeHtml(ex[0])}</h3><p>${escapeHtml(ex[4])}</p><div class="exercise-tags"><span>${escapeHtml(ex[1])}</span><span>${escapeHtml(ex[2])}</span><span>${escapeHtml(ex[3])}</span></div></div>
      <div class="log-fields"><label>Weight (kg)<input type="number" min="0" max="1000" step="0.5" placeholder="—" data-log="${key}" data-field="weight" value="${escapeHtml(log.weight ?? "")}"></label><label>Reps done<input type="text" maxlength="30" placeholder="e.g. 10,10,8" data-log="${key}" data-field="reps" value="${escapeHtml(log.reps ?? "")}"></label><label class="exercise-done"><input type="checkbox" data-log="${key}" data-field="done" ${log.done ? "checked" : ""}> Done</label></div>
      <div class="exercise-demo" data-demo-name="${escapeHtml(ex[0])}"><div class="demo-loading"><span class="demo-pulse"></span> LOADING MOVEMENT GIF…</div></div>
    </article>`;
  }).join("");
  loadExerciseDemos();
}
// Free public exercise GIF library. The site remains usable if the library is offline.
const EXERCISE_GIF_BASE = "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0";
let exerciseGifLibraryPromise;
const demoAliases = {
  "barbell or machine chest press": ["machine chest press", "barbell bench press"],
  "seated cable row": ["seated cable row", "lever seated row"],
  "incline dumbbell press": ["dumbbell incline bench press", "incline dumbbell press"],
  "lat pulldown": ["wide grip lat pulldown", "lat pulldown"],
  "seated dumbbell shoulder press": ["seated dumbbell shoulder press", "dumbbell seated shoulder press"],
  "dumbbell biceps curl": ["dumbbell biceps curl", "dumbbell curl"],
  "cable triceps pushdown": ["cable pushdown", "triceps pushdown"],
  "goblet squat or leg press": ["goblet squat", "lever leg press"],
  "dumbbell romanian deadlift": ["dumbbell romanian deadlift", "dumbbell stiff leg deadlift"],
  "leg extension": ["leg extension", "lever leg extension"],
  "seated leg curl": ["seated leg curl", "lever seated leg curl"],
  "standing calf raise": ["standing calf raise", "calf raise"],
  "dead bug": ["dead bug", "alternating heel touchers"],
  "chest-supported dumbbell row": ["chest supported dumbbell row", "dumbbell incline row"],
  "machine chest press": ["machine chest press", "lever chest press"],
  "neutral-grip lat pulldown": ["neutral grip lat pulldown", "close grip lat pulldown", "lat pulldown"],
  "dumbbell lateral raise": ["dumbbell lateral raise", "dumbbell lateral raise"],
  "reverse pec deck": ["reverse pec deck", "lever seated reverse fly"],
  "incline dumbbell curl": ["incline dumbbell curl", "dumbbell incline curl"],
  "cable triceps extension": ["cable overhead triceps extension", "cable triceps extension"],
  "leg press": ["lever leg press", "leg press"],
  "hip thrust": ["barbell hip thrust", "machine hip thrust", "hip thrust"],
  "reverse lunge": ["dumbbell reverse lunge", "reverse lunge"],
  "lying leg curl": ["lying leg curl", "lever lying leg curl"],
  "seated calf raise": ["seated calf raise", "lever seated calf raise"],
  "plank": ["plank", "front plank"]
};
function normalizeExerciseName(name) {
  return String(name).toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\b(lever|barbell|dumbbell|machine|cable|seated|standing|wide grip|neutral grip)\b/g, " ").replace(/\s+/g, " ").trim();
}
function getExerciseGifLibrary() {
  if (!exerciseGifLibraryPromise) {
    exerciseGifLibraryPromise = fetch(`${EXERCISE_GIF_BASE}/api/en/exercises.json`)
      .then(r => { if (!r.ok) throw new Error("GIF library unavailable"); return r.json(); })
      .then(data => Array.isArray(data) ? data : (data.exercises || data.items || []));
  }
  return exerciseGifLibraryPromise;
}
function chooseExerciseGif(exerciseName, library) {
  const name = exerciseName.toLowerCase();
  const candidates = demoAliases[name] || [exerciseName];
  const normalizedCandidates = candidates.map(normalizeExerciseName);
  const entries = library.map(item => ({ item, name: normalizeExerciseName(item.name || item.title || item.slug || "") }));
  for (const candidate of normalizedCandidates) {
    const exact = entries.find(e => e.name === candidate || e.name === candidate.replace(/ /g, ""));
    if (exact && (exact.item.gifUrl || exact.item.file)) return exact.item;
  }
  // Fall back to a strong word overlap, avoiding generic matches for tiny words.
  let best = null, bestScore = 0;
  for (const candidate of normalizedCandidates) {
    const words = candidate.split(" ").filter(w => w.length > 2);
    for (const entry of entries) {
      if (!entry.name || !words.length) continue;
      const score = words.filter(w => entry.name.includes(w)).length / words.length;
      if (score > bestScore && score >= 0.72 && (entry.item.gifUrl || entry.item.file)) { best = entry.item; bestScore = score; }
    }
  }
  return best;
}
async function loadExerciseDemos() {
  const cards = [...document.querySelectorAll(".exercise-demo")];
  if (!cards.length) return;
  try {
    const library = await getExerciseGifLibrary();
    cards.forEach(card => {
      const name = card.dataset.demoName;
      const match = chooseExerciseGif(name, library);
      const gifUrl = match?.gifUrl || (match?.file ? `${EXERCISE_GIF_BASE}/${match.file}` : "");
      if (!gifUrl) {
        const searchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(name + " exercise gif")}`;
        card.innerHTML = `<div class="demo-fallback">GIF not available for this exact variation.<br><a href="${searchUrl}" target="_blank" rel="noopener noreferrer">FIND A MOVEMENT GIF ↗</a></div>`;
        return;
      }
      const label = match.name || name;
      card.innerHTML = `<img class="exercise-gif" src="${gifUrl}" alt="Animated demonstration of ${escapeHtml(label)}" loading="lazy"><div class="demo-caption"><span>ANIMATED DEMO</span><a href="${gifUrl}" target="_blank" rel="noopener noreferrer">OPEN GIF ↗</a></div>`;
    });
  } catch {
    cards.forEach(card => {
      const name = card.dataset.demoName;
      const searchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(name + " exercise gif")}`;
      card.innerHTML = `<div class="demo-fallback">Connect to the internet to load the GIF.<br><a href="${searchUrl}" target="_blank" rel="noopener noreferrer">FIND A MOVEMENT GIF ↗</a></div>`;
    });
  }
}

function renderProgress() {
  $("#totalSessions").textContent = state.sessions.length;
  $("#historyCount").textContent = state.sessions.length;
  $("#historyList").innerHTML = state.sessions.length ? [...state.sessions].reverse().slice(0,10).map(s => `<div class="history-item"><span>${escapeHtml(s.name)}</span><span>${escapeHtml(s.date)} · ${s.completed}/${s.total} exercises</span></div>`).join("") : '<p class="empty-state">Your completed workouts will appear here.</p>';
  const latest = state.weights[state.weights.length - 1];
  $("#latestWeight").textContent = latest ? `${latest.value} kg` : "—";
  $("#weightHistory").textContent = state.weights.length ? `Entries saved: ${state.weights.length}.` : "";
}
$$(".day-tab").forEach(tab => tab.addEventListener("click", () => renderWorkout(tab.dataset.day)));
$("#exerciseList").addEventListener("change", e => {
  const input = e.target.closest("[data-log]");
  if (!input) return;
  const key = input.dataset.log, field = input.dataset.field;
  state.logs[key] ||= {};
  state.logs[key][field] = input.type === "checkbox" ? input.checked : input.value;
  saveState();
});
$("#exerciseList").addEventListener("input", e => {
  const input = e.target.closest("[data-log]");
  if (!input || input.type === "checkbox") return;
  const key = input.dataset.log, field = input.dataset.field;
  state.logs[key] ||= {};
  state.logs[key][field] = input.value;
  saveState();
});
function completeWorkout() {
  const data = workouts[activeDay];
  const completed = data.exercises.filter((_, i) => state.logs[`${activeDay}_${i}`]?.done).length;
  if (!completed) {
    if (!confirm("You haven't checked off any exercises yet. Mark this workout complete anyway?")) return;
  }
  state.sessions.push({ day: activeDay, name: data.title, date: new Date().toLocaleDateString(), completed, total: data.exercises.length });
  saveState(); renderProgress();
  alert(`Workout saved. ${completed} of ${data.exercises.length} exercises checked off. Nice work showing up!`);
}
$("#completeWorkout").addEventListener("click", completeWorkout);
$("#startToday").addEventListener("click", () => { $("#workouts").scrollIntoView({ behavior: "smooth" }); openChat("Help me get ready for today's workout."); });
$("#weightForm").addEventListener("submit", e => {
  e.preventDefault();
  const value = Number($("#weightInput").value);
  if (!Number.isFinite(value) || value <= 0 || value > 500) return alert("Enter a valid weight in kilograms.");
  state.weights.push({ value: Math.round(value * 10) / 10, date: new Date().toLocaleDateString() });
  saveState(); renderProgress(); $("#weightInput").value = "";
});
$("#resetProgress").addEventListener("click", () => {
  if (!confirm("Delete your saved workout history? This cannot be undone.")) return;
  state.sessions = []; saveState(); renderProgress();
});
$("#clearAll").addEventListener("click", () => {
  if (!confirm("Clear all saved workout logs, history, and weight entries from this browser?")) return;
  state = { sessions: [], weights: [], logs: {} }; saveState(); renderWorkout(activeDay); renderProgress();
});

const chatPanel = $("#chatPanel"), chatLauncher = $("#chatLauncher"), chatMessages = $("#chatMessages"), chatInput = $("#chatInput");
function openChat(prefill = "") {
  chatPanel.classList.add("open"); chatPanel.setAttribute("aria-hidden", "false"); chatLauncher.setAttribute("aria-expanded", "true");
  if (prefill) chatInput.value = prefill;
  setTimeout(() => chatInput.focus(), 50);
}
function closeChat() { chatPanel.classList.remove("open"); chatPanel.setAttribute("aria-hidden", "true"); chatLauncher.setAttribute("aria-expanded", "false"); }
chatLauncher.addEventListener("click", () => chatPanel.classList.contains("open") ? closeChat() : openChat());
$("#closeChat").addEventListener("click", closeChat);
function addMessage(text, type) {
  const el = document.createElement("div"); el.className = `message ${type}`; el.textContent = text;
  chatMessages.appendChild(el); chatMessages.scrollTop = chatMessages.scrollHeight;
}
function getReply(raw) {
  const t = raw.toLowerCase();
  if (/hello|hi\b|hey/.test(t)) return "Hey! Let's keep your training simple and consistent. You have four saved workout days in the My Workouts section. Which one are you doing today?";
  if (/today|which workout|what workout|what should i train/.test(t)) return "Your weekly structure is:\n\nDay 1 — Upper A\nDay 2 — Lower A\nRest\nDay 3 — Upper B\nDay 4 — Lower B\n\nPick the next workout in sequence that fits your recovery. If you missed a day, just continue the sequence; don't double up to make up for it.";
  if (/upper a|chest|biceps|triceps|upper body/.test(t)) return "Your Upper A session:\n• Chest press — 3 × 8–10\n• Seated cable row — 3 × 10–12\n• Incline dumbbell press — 2 × 10–12\n• Lat pulldown — 2 × 10–12\n• Shoulder press — 2 × 10–12\n• Biceps curl — 2 × 10–15\n• Triceps pushdown — 2 × 10–15\n\nStart light and log your weights in the exercise cards.";
  if (/lower|leg|glute|hamstring|quad/.test(t)) return "Your lower-body days are in the workout tabs. Lower A uses a squat or leg press, Romanian deadlift, leg extension, leg curl, calf raises, and dead bug. Lower B uses leg press, hip thrust, reverse lunges, leg curl, calf raises, and plank. Choose controlled weights and stop if anything causes significant pain.";
  if (/progress|heavier|weight.*increase|overload|reps/.test(t)) return "Use double progression: stay within the listed rep range. When you can complete every set at the top of the range with clean technique and around 2–3 reps left, increase the load by the smallest available amount next time. Record the result so you can compare sessions.";
  if (/warm.?up|warmup/.test(t)) return "Warm up for 5–10 minutes with easy walking or cycling, then do a few gentle movements for the muscles you'll train. Before your first main lift, perform 2–3 lighter practice sets. Warm-ups should prepare you, not tire you out.";
  if (/miss|skip|forgot/.test(t)) return "No problem — don't try to cram missed sessions together. Continue with the next workout when you can, keeping rest days between demanding sessions as needed. Long-term consistency matters more than a perfect calendar.";
  if (/protein|food|diet|calorie|nutrition|eat|bypass|surgery|vitamin|supplement|hydration/.test(t)) return "For general nutrition, aim for balanced meals and fluids that you tolerate. Because you've had gastric bypass surgery, confirm your protein and calorie targets, fluid timing, vitamins, supplements, and lab monitoring with your bariatric team. I shouldn't set a medical nutrition target for you.";
  if (/pain|dizz|faint|chest|injur|medical/.test(t)) return "I can't assess symptoms or give medical clearance. Stop exercising if you feel faint, have chest pain, significant pain, or unusual shortness of breath. Seek urgent help for emergency symptoms and contact a qualified healthcare professional for guidance.";
  if (/sets|reps|rest/.test(t)) return "Follow the sets and rep ranges listed beside each exercise. Rest about 2–3 minutes after demanding compound lifts and 60–120 seconds after smaller isolation exercises. Rest longer if you need it to maintain good form.";
  return "I can help with your four-day plan, exercise selection, warm-ups, progression, rest, and general nutrition habits. Try asking: “How do I progress my weights?”, “What is Upper A?”, or “What should I do if I miss a workout?” This demo chatbot uses local responses and isn't a live AI model.";
}
function sendChat(text) {
  const clean = text.trim(); if (!clean) return;
  addMessage(clean, "user"); chatInput.value = "";
  const typing = document.createElement("div"); typing.className = "message bot"; typing.textContent = "Thinking…"; chatMessages.appendChild(typing);
  setTimeout(() => { typing.remove(); addMessage(getReply(clean), "bot"); }, 300);
}
$("#chatForm").addEventListener("submit", e => { e.preventDefault(); sendChat(chatInput.value); });
$$("[data-chat]").forEach(b => b.addEventListener("click", () => { openChat(); sendChat(b.dataset.chat); }));
document.addEventListener("keydown", e => { if (e.key === "Escape") closeChat(); });

renderWorkout(activeDay);
renderProgress();

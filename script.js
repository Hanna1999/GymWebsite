const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
$('#year').textContent = new Date().getFullYear();

// Responsive navigation
const menuToggle = $('#menuToggle'), mainNav = $('#mainNav');
menuToggle.addEventListener('click', () => { const open = mainNav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.textContent = open ? '×' : '☰'; });
$$('nav a').forEach(a => a.addEventListener('click', () => mainNav.classList.remove('open')));

// A small local exercise catalog. Each exercise is filtered by the equipment the member selected.
const exerciseCatalog = [
  {id:'chest-machine',name:'Chest press machine',group:'push',equipment:['chestMachine'],sets:3,reps:'8–12',gif:'https://fitnessprogramer.com/wp-content/uploads/2021/02/Chest-Press-Machine.gif',search:'chest press machine proper form'},
  {id:'cable-fly',name:'Cable fly',group:'push',equipment:['cableFly'],sets:3,reps:'10–15',gif:'https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crossover.gif',search:'cable fly proper form'},
  {id:'db-bench',name:'Dumbbell bench press',group:'push',equipment:['dumbbells'],sets:3,reps:'8–12',gif:'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Bench-Press.gif',search:'dumbbell bench press proper form'},
  {id:'shoulder-press',name:'Shoulder press machine',group:'push',equipment:['shoulderPress'],sets:2,reps:'8–12',gif:'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lever-Shoulder-Press.gif',search:'shoulder press machine proper form'},
  {id:'lateral-raise',name:'Lateral raise machine',group:'push',equipment:['lateralRaise'],sets:2,reps:'12–15',gif:'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lever-Lateral-Raise.gif',search:'lateral raise machine proper form'},
  {id:'triceps-pushdown',name:'Cable triceps pushdown',group:'push',equipment:['cableTriceps'],sets:2,reps:'10–15',gif:'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif',search:'cable triceps pushdown proper form'},
  {id:'lat-pulldown',name:'Lat pulldown',group:'pull',equipment:['latPulldown'],sets:3,reps:'8–12',gif:'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif',search:'lat pulldown proper form'},
  {id:'cable-row',name:'Seated cable row',group:'pull',equipment:['cableRow'],sets:3,reps:'8–12',gif:'https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif',search:'seated cable row proper form'},
  {id:'db-row',name:'One-arm dumbbell row',group:'pull',equipment:['dumbbells'],sets:3,reps:'8–12 each side',gif:'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif',search:'one arm dumbbell row proper form'},
  {id:'biceps-curl',name:'Biceps curl machine',group:'pull',equipment:['bicepsCurl'],sets:2,reps:'10–15',gif:'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lever-Bicep-Curl.gif',search:'biceps curl machine proper form'},
  {id:'db-curl',name:'Dumbbell biceps curl',group:'pull',equipment:['dumbbells'],sets:2,reps:'10–15',gif:'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif',search:'dumbbell biceps curl proper form'},
  {id:'leg-press',name:'Leg press',group:'legs',equipment:['legPress'],sets:3,reps:'8–12',gif:'https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Press.gif',search:'leg press proper form'},
  {id:'smith-squat',name:'Smith machine squat',group:'legs',equipment:['smithSquat'],sets:3,reps:'8–12',gif:'https://fitnessprogramer.com/wp-content/uploads/2021/02/Smith-Machine-Squat.gif',search:'smith machine squat proper form'},
  {id:'goblet-squat',name:'Dumbbell goblet squat',group:'legs',equipment:['dumbbells'],sets:3,reps:'8–12',gif:'https://fitnessprogramer.com/wp-content/uploads/2021/02/Goblet-Squat.gif',search:'dumbbell goblet squat proper form'},
  {id:'leg-extension',name:'Leg extension',group:'legs',equipment:['legExtension'],sets:2,reps:'10–15',gif:'https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Extension.gif',search:'leg extension machine proper form'},
  {id:'leg-curl',name:'Leg curl machine',group:'legs',equipment:['legCurl'],sets:3,reps:'10–15',gif:'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lying-Leg-Curl.gif',search:'leg curl machine proper form'},
  {id:'rdl',name:'Dumbbell Romanian deadlift',group:'legs',equipment:['hipHinge','dumbbells'],sets:3,reps:'8–12',gif:'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Romanian-Deadlift.gif',search:'dumbbell Romanian deadlift proper form'},
  {id:'calf-raise',name:'Calf raise machine',group:'legs',equipment:['calfRaise'],sets:2,reps:'12–15',gif:'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lever-Seated-Calf-Raise.gif',search:'calf raise machine proper form'},
  {id:'ab-crunch',name:'Ab machine crunch',group:'core',equipment:['abMachine'],sets:2,reps:'10–15',gif:'https://fitnessprogramer.com/wp-content/uploads/2021/02/Crunch-Machine.gif',search:'ab crunch machine proper form'},
  {id:'plank',name:'Plank',group:'core',equipment:['abMachine'],sets:2,reps:'20–45 sec',gif:'https://fitnessprogramer.com/wp-content/uploads/2021/02/Front-Plank.gif',search:'plank proper form'}
];
const dayNames = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
const splitTemplates = {
  2:[['Full Body A',['push','pull','legs','core']],['Full Body B',['legs','pull','push','core']]],
  3:[['Full Body A',['legs','push','pull','core']],['Full Body B',['push','pull','legs','core']],['Full Body C',['pull','legs','push','core']]],
  4:[['Upper A',['push','pull','push','pull']],['Lower A',['legs','legs','core']],['Upper B',['pull','push','pull','push']],['Lower B',['legs','legs','core']]],
  5:[['Push',['push','push','push','core']],['Pull',['pull','pull','pull','core']],['Legs',['legs','legs','legs','core']],['Upper Body',['push','pull','push','pull']],['Lower Body',['legs','legs','core']]],
  6:[['Push A',['push','push','push','core']],['Pull A',['pull','pull','pull','core']],['Legs A',['legs','legs','legs','core']],['Push B',['push','push','push','core']],['Pull B',['pull','pull','pull','core']],['Legs B',['legs','legs','core']]]
};
let currentPlan = [];
let selectedDays = 4;
let toastTimer;
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2900)}

$$('.day-option').forEach(btn=>btn.addEventListener('click',()=>{selectedDays=Number(btn.dataset.days);$('#daysPerWeek').value=String(selectedDays);$$('.day-option').forEach(b=>b.classList.toggle('active',b===btn));}));
$('#selectAll').addEventListener('click',()=>{$$('#equipmentGrid input').forEach(i=>i.checked=true)});
$('#clearAll').addEventListener('click',()=>{$$('#equipmentGrid input').forEach(i=>i.checked=false)});
function getSelectedEquipment(){return new Set($$('#equipmentGrid input:checked').map(i=>i.value))}
function exerciseIsAvailable(ex,equipment){return ex.equipment.some(key=>equipment.has(key))}
function chooseExercises(groups,available,used){
  const chosen=[];
  for(const group of groups){
    const candidates=available.filter(ex=>ex.group===group&&!used.has(ex.id)&&!chosen.some(c=>c.id===ex.id));
    if(candidates.length){const ex=candidates[Math.floor(Math.random()*candidates.length)];chosen.push(ex);used.add(ex.id)}
  }
  // Re-use movements only when selected equipment leaves too few distinct exercises.
  if(chosen.length<3){for(const ex of available){if(chosen.length>=4)break;if(!chosen.some(c=>c.id===ex.id)){chosen.push(ex);used.add(ex.id)}}}
  if(chosen.length<3){for(const group of groups){const ex=available.find(e=>e.group===group);if(ex&&!chosen.some(c=>c.id===ex.id))chosen.push(ex);if(chosen.length>=3)break}}
  return chosen.slice(0,6);
}
function renderPlan(plan,days,goal){
  $('#emptyState').hidden=true;const root=$('#generatedPlan');root.hidden=false;root.innerHTML='';
  const goalLabels={muscle:'Muscle building',strength:'Strength focus',recomp:'Muscle + fat loss',fitness:'General fitness'};
  const header=document.createElement('div');header.className='generated-header';header.innerHTML=`<div><p class="eyebrow">YOUR CUSTOM SPLIT</p><h3>THE FORGE<br>PLAN.</h3><p>${days} days / ${goalLabels[goal]}</p></div><button type="button" class="mini-action" id="savePlan">SAVE PLAN ↓</button>`;root.appendChild(header);
  plan.forEach((day,index)=>{
    const card=document.createElement('article');card.className='workout-day';
    const dayHead=document.createElement('div');dayHead.className='workout-day-head';dayHead.innerHTML=`<div><h4>${String(index+1).padStart(2,'0')} / ${day.name}</h4><p>${dayNames[index]} · ${day.exercises.length} movements</p></div><span class="day-tag">DAY ${index+1}</span>`;card.appendChild(dayHead);
    day.exercises.forEach(ex=>{
      const row=document.createElement('div');row.className='exercise-row';
      const gif=document.createElement('img');gif.className='exercise-gif';gif.src=ex.gif;gif.alt='Animated demonstration of '+ex.name;gif.loading='lazy';gif.onerror=()=>{gif.remove();row.classList.add('no-gif')};
      const info=document.createElement('div');info.innerHTML=`<div class="exercise-title">${ex.name}</div><div class="exercise-meta">${ex.sets} sets × ${ex.reps} reps · Rest 60–120 sec</div>`;
      const actions=document.createElement('div');actions.className='exercise-actions';
      const demo=document.createElement('a');demo.href='https://www.youtube.com/results?search_query='+encodeURIComponent(ex.search);demo.target='_blank';demo.rel='noopener';demo.textContent='DEMO ↗';demo.setAttribute('aria-label','Find demonstration for '+ex.name);
      const label=document.createElement('label');label.className='complete-label';label.innerHTML='<input type="checkbox"> Done';const checkbox=$('input',label);checkbox.addEventListener('change',()=>{row.classList.toggle('completed',checkbox.checked);persistPlanProgress()});
      actions.append(demo,label);row.append(gif,info,actions);card.appendChild(row);
    });root.appendChild(card);
  });
  const note=document.createElement('p');note.className='plan-foot';note.textContent='Start with a manageable load and controlled technique. For your first couple of weeks, 2 working sets per movement may be enough; build gradually and leave a few good reps in reserve. This plan is a starting point, not medical advice.';root.appendChild(note);
  $('#savePlan').addEventListener('click',()=>savePlanToBrowser());
  const profile=readProfile();if(profile&&profile.progress){applyPlanProgress(profile.progress)}
}
function generatePlan(event){if(event)event.preventDefault();const equipment=getSelectedEquipment();const available=exerciseCatalog.filter(ex=>exerciseIsAvailable(ex,equipment));if(equipment.size<4||available.length<4){$('#equipmentNote').textContent='Please select at least 4 equipment options for a more balanced plan.';$('#equipmentNote').style.color='#ff8b74';toast('Select at least 4 equipment options first.');return}
  $('#equipmentNote').textContent=`${equipment.size} equipment options selected. Your plan will use matching movements.`;$('#equipmentNote').style.color='';
  const templates=splitTemplates[selectedDays]||splitTemplates[4];const used=new Set();currentPlan=templates.map(([name,groups])=>({name,exercises:chooseExercises(groups,available,used)}));renderPlan(currentPlan,selectedDays,$('#goal').value);savePlanToBrowser(false);$('#planResults').scrollIntoView({behavior:'smooth',block:'start'});toast('Your workout split is ready. Forge ahead!');}
$('#builderForm').addEventListener('submit',generatePlan);
function readProfile(){try{return JSON.parse(localStorage.getItem('ironforge_profile')||'null')}catch{return null}}
function saveProfile(profile){localStorage.setItem('ironforge_profile',JSON.stringify(profile))}
function savePlanToBrowser(showToast=true){if(!currentPlan.length)return;const profile=readProfile()||{};profile.plan={days:selectedDays,goal:$('#goal').value,equipment:[...getSelectedEquipment()],workouts:currentPlan,savedAt:new Date().toISOString()};profile.progress=profile.progress||{};saveProfile(profile);localStorage.setItem('ironforge_plan',JSON.stringify(profile.plan));if(showToast)toast('Plan saved in this browser.');}
function persistPlanProgress(){const profile=readProfile()||{};profile.progress={};$$('.exercise-row').forEach((row,index)=>{const cb=$('input[type=checkbox]',row);profile.progress[index]=Boolean(cb&&cb.checked)});saveProfile(profile);}
function applyPlanProgress(progress){$$('.exercise-row').forEach((row,index)=>{const cb=$('input[type=checkbox]',row);if(cb&&progress[index]){cb.checked=true;row.classList.add('completed')}})}
function restoreSavedPlan(){const profile=readProfile();let saved=null;try{saved=JSON.parse(localStorage.getItem('ironforge_plan')||'null')}catch{};if(profile&&profile.name){updateMemberUI(profile)}if(saved&&Array.isArray(saved.workouts)){selectedDays=saved.days||4;$('#daysPerWeek').value=String(selectedDays);$$('.day-option').forEach(b=>b.classList.toggle('active',Number(b.dataset.days)===selectedDays));if(saved.goal)$('#goal').value=saved.goal;if(Array.isArray(saved.equipment))$$('#equipmentGrid input').forEach(i=>i.checked=saved.equipment.includes(i.value));currentPlan=saved.workouts;renderPlan(currentPlan,selectedDays,saved.goal||'muscle')}}

// Demo profile flow: hashes password in-browser; this is NOT secure production authentication.
const authModal=$('#authModal');let authMode='register';
function openAuth(mode='register'){authMode=mode;authModal.hidden=false;document.body.style.overflow='hidden';setAuthMode(mode);$('#authError').textContent='';const profile=readProfile();if(profile&&profile.email){$('#authEmail').value=profile.email;$('#authName').value=profile.name||''}setTimeout(()=>$('#authName').focus(),40)}
function closeAuth(){authModal.hidden=true;document.body.style.overflow=''}
function setAuthMode(mode){authMode=mode;$$('.auth-tab').forEach(t=>t.classList.toggle('active',t.dataset.mode===mode));$('#authName').closest('label')?.classList.remove('hidden');$('#authName').required=mode==='register';$('#authName').parentElement;$('#authName').style.display=mode==='register'?'block':'none';const nameLabel=$$('label.field-label', $('#authForm'))[0];nameLabel.style.display=mode==='register'?'block':'none';$('#authPassword').autocomplete=mode==='register'?'new-password':'current-password';$('#authTitle').innerHTML=mode==='register'?'JOIN THE<br><span>FORGE.</span>':'WELCOME<br><span>BACK.</span>';$('.auth-intro').textContent=mode==='register'?'Save your name and workout preferences in this browser. No payment required.':'Sign in to the profile stored in this browser.';$('#authSubmit').textContent=mode==='register'?'CREATE FREE PROFILE ↗':'SIGN IN ↗';$('#authError').textContent=''}
$$('.auth-tab').forEach(tab=>tab.addEventListener('click',()=>setAuthMode(tab.dataset.mode)));
$('#openAuth').addEventListener('click',()=>openAuth(readProfile()?'signin':'register'));
$('#heroJoin').addEventListener('click',()=>openAuth('register'));$('#joinBottom').addEventListener('click',()=>openAuth('register'));$('#closeAuth').addEventListener('click',closeAuth);authModal.addEventListener('click',e=>{if(e.target===authModal)closeAuth()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!authModal.hidden)closeAuth()});
async function passwordDigest(password){if(window.crypto&&crypto.subtle){const data=new TextEncoder().encode(password);const hash=await crypto.subtle.digest('SHA-256',data);return [...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,'0')).join('')}throw new Error('Secure browser hashing is unavailable. Open this website using localhost (for example VS Code Live Server).')}
$('#authForm').addEventListener('submit',async e=>{e.preventDefault();const name=$('#authName').value.trim(),email=$('#authEmail').value.trim().toLowerCase(),password=$('#authPassword').value;const error=$('#authError');error.textContent='';if(password.length<6){error.textContent='Use at least 6 characters for this demo.';return}let digest;try{digest=await passwordDigest(password)}catch(err){error.textContent=err.message;return}
  const existing=readProfile();if(authMode==='register'){if(existing&&existing.email===email){error.textContent='A local profile with this email already exists. Choose Sign In.';return}saveProfile({name,email,passwordDigest:digest,createdAt:new Date().toISOString(),progress:{}});updateMemberUI(readProfile());closeAuth();toast(`Welcome to IRONFORGE, ${name}! Profile saved on this device.`)}else{if(!existing||existing.email!==email||existing.passwordDigest!==digest){error.textContent='No matching local profile found. Register on this browser first.';return}updateMemberUI(existing);closeAuth();toast(`Welcome back, ${existing.name||'member'}.`)}$('#authPassword').value='';});
function updateMemberUI(profile){const btn=$('#openAuth');btn.textContent=profile&&profile.name?`HI, ${profile.name.toUpperCase()} ↗`:'SIGN IN / JOIN FREE ↗';btn.title='Open your local member profile';btn.onclick=()=>openAuth('signin')}
restoreSavedPlan();

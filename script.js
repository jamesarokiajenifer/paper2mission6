"use strict";

const PASS = 80;
const STUDENT_KEY = "paper2Mission6Student";
const PROGRESS_KEY = "paper2Mission6Progress";

const state = {student:null, section:"intro", index:0, weScore:0, youScore:0, answered:false};
let progress = loadProgress();

const $ = id => document.getElementById(id);
const screens = [$("login"),$("dashboard"),$("lesson"),$("result")];

$("startLogin").onclick = login;
$("startMission").onclick = openMission;
$("hint").onclick = showHint;
$("check").onclick = checkAnswer;
$("next").onclick = nextStep;
$("retry").onclick = openMission;
$("back").onclick = showDashboard;

restore();

function only(el){ screens.forEach(x=>x.classList.add("hidden")); el.classList.remove("hidden"); }

function login(){
  const name=$("studentName").value.trim(), cls=$("studentClass").value, id=$("studentId").value.trim();
  if(!name||!cls){alert("Please enter your name and select your class.");return;}
  state.student={name,cls,id};
  localStorage.setItem(STUDENT_KEY,JSON.stringify(state.student));
  showDashboard();
}

function restore(){
  try{
    const s=JSON.parse(localStorage.getItem(STUDENT_KEY)||"null");
    if(s&&s.name&&s.cls){state.student=s;showDashboard();}else only($("login"));
  }catch(e){only($("login"));}
}

function showDashboard(){
  only($("dashboard"));
  if(state.student){
    $("welcome").textContent=`Welcome, ${state.student.name}`;
    $("studentDetails").textContent=state.student.cls+(state.student.id?` • ID: ${state.student.id}`:"");
  }
  if(progress.best===100)$("status").textContent="Gold • 100%";
  else if(progress.best>=90)$("status").textContent=`Silver • Best ${progress.best}%`;
  else if(progress.best>=80)$("status").textContent=`Bronze • Best ${progress.best}%`;
  else if(progress.best>0)$("status").textContent=`Retry • Best ${progress.best}%`;
  else $("status").textContent="Not started";
}

function openMission(){
  state.section="intro";state.index=0;state.weScore=0;state.youScore=0;state.answered=false;
  renderIntro();
}

function renderIntro(){
  only($("lesson")); $("bar").style.width="0%"; $("sectionLabel").textContent="I DO";
  $("counter").textContent="Learn the Cambridge string-handling rules first"; $("title").textContent=MISSION6.title;
  let h='<div class="note"><strong>Cambridge string-handling rules</strong><ul>';
  h+=MISSION6.intro.notes.map(x=>`<li>${esc(x)}</li>`).join("")+"</ul></div><h3>Worked examples</h3>";
  h+=MISSION6.intro.examples.map(x=>`<div class="code">${esc(x)}</div>`).join("");
  h+='<div class="warning"><strong>Common mistakes</strong>';
  h+=MISSION6.intro.mistakes.map(x=>`<div class="code">${esc(x)}</div>`).join("")+"</div>";
  $("content").innerHTML=h;$("answer").innerHTML="";$("feedback").innerHTML="";
  $("hint").classList.add("hidden");$("check").classList.add("hidden");$("next").classList.remove("hidden");
  $("next").textContent="Start We Do";
}

function startSection(section){state.section=section;state.index=0;state.answered=false;renderQuestion();}
function questions(){return state.section==="weDo"?MISSION6.weDo:MISSION6.youDo;}

function renderQuestion(){
  only($("lesson")); const qs=questions(),q=qs[state.index];state.answered=false;
  $("sectionLabel").textContent=state.section==="weDo"?"WE DO":"YOU DO";
  $("counter").textContent=`Question ${state.index+1} of ${qs.length}`;$("title").textContent=q.prompt;
  $("bar").style.width=`${state.index/qs.length*100}%`;
  $("content").innerHTML=q.code?`<div class="code">${esc(q.code)}</div>`:"";
  $("answer").innerHTML=inputHtml(q);$("feedback").innerHTML="";$("feedback").className="";
  $("check").classList.remove("hidden");$("next").classList.add("hidden");
  if(state.section==="weDo")$("hint").classList.remove("hidden");else $("hint").classList.add("hidden");
  if(q.type==="code")blockPaste();
}

function inputHtml(q){
  if(q.type==="mcq") return `<div class="options">${q.options.map((x,i)=>`<label class="option"><input type="radio" name="ans" value="${i}">${esc(x)}</label>`).join("")}</div>`;
  if(q.type==="fill") return '<input id="textAnswer" placeholder="Type your answer" autocomplete="off">';
  return '<textarea id="codeAnswer" placeholder="Write Cambridge-style pseudocode here" spellcheck="false" autocomplete="off"></textarea><p class="rule"><small>Type the pseudocode yourself. Paste is disabled. Harmless spacing and indentation differences are accepted, but string values and logic still matter.</small></p>';
}

function blockPaste(){const box=$("codeAnswer");if(box)box.onpaste=e=>{e.preventDefault();alert("Please type your pseudocode yourself. Paste is disabled.");};}
function showHint(){const q=questions()[state.index];$("feedback").className="hintbox";$("feedback").textContent=q.hint||q.explanation;}

function checkAnswer(){
  if(state.answered)return; const q=questions()[state.index],r=evaluate(q);
  if(!r.has){alert("Please enter or select an answer first.");return;}
  state.answered=true;
  if(r.correct){if(state.section==="weDo")state.weScore++;else state.youScore++;}
  showFeedback(q,r);$("check").classList.add("hidden");$("next").classList.remove("hidden");
  $("next").textContent=state.index===questions().length-1?"Finish Section":"Next Question";
}

function evaluate(q){
  if(q.type==="mcq"){
    const s=document.querySelector('input[name="ans"]:checked');if(!s)return{has:false,correct:false};
    return{has:true,correct:Number(s.value)===q.answer};
  }
  if(q.type==="fill"){
    const v=$("textAnswer").value.trim();if(!v)return{has:false,correct:false};
    return{has:true,correct:q.answers.some(a=>q.caseSensitive ? clean(v)===clean(a) : norm(v)===norm(a))};
  }
  const v=$("codeAnswer").value.trim();if(!v)return{has:false,correct:false};
  if(!keywordCase(v))return{has:true,correct:false,reason:"case"};
  if(copied(v,q.prompt))return{has:true,correct:false,reason:"copy"};
  return{has:true,correct:q.models.some(m=>canon(v)===canon(m))};
}

function keywordCase(v){
  const words=["INPUT","OUTPUT","IF","THEN","ELSE","ENDIF","AND","OR","NOT","TRUE","FALSE","LENGTH","LCASE","UCASE","SUBSTRING"];
  for(const w of words){const m=v.match(new RegExp(`\\b${w}\\b`,"gi"))||[];if(m.some(x=>x!==w))return false;}return true;
}
function copied(v,p){const a=norm(v),b=norm(p);return (b&&a.includes(b))||["WRITE ONE PSEUDOCODE STATEMENT","WRITE ONE ASSIGNMENT STATEMENT","WRITE AN ALGORITHM FRAGMENT"].some(x=>a.includes(x));}
function canon(v){
  const source=String(v)
    .replace(/\r\n?/g,"\n")
    .replace(/[“”]/g,'"')
    .replace(/[‘’ꞌ]/g,"'")
    .replace(/<-/g,"←");

  const tokens=[];
  let i=0;

  while(i<source.length){
    const ch=source[i];

    // Ignore indentation and harmless whitespace.
    if(/\s/.test(ch)){i++;continue;}

    // Preserve exact STRING and CHAR literal contents.
    if(ch==='"'||ch==="'"){
      const quote=ch;
      let token=quote;
      i++;
      while(i<source.length){
        token+=source[i];
        if(source[i]===quote){
          i++;
          break;
        }
        i++;
      }
      tokens.push(token);
      continue;
    }

    // Multi-character relational operators.
    const two=source.slice(i,i+2);
    if(["<=",">=","<>"].includes(two)){
      tokens.push(two);
      i+=2;
      continue;
    }

    if(ch==="←"){
      tokens.push(ch);
      i++;
      continue;
    }

    // Keywords and identifiers compare case-insensitively.
    if(/[A-Za-z]/.test(ch)){
      let token="";
      while(i<source.length && /[A-Za-z0-9]/.test(source[i])){
        token+=source[i++];
      }
      tokens.push(token.toUpperCase());
      continue;
    }

    // Numeric literals.
    if(/[0-9]/.test(ch)){
      let token="";
      while(i<source.length && /[0-9.]/.test(source[i])){
        token+=source[i++];
      }
      tokens.push(token);
      continue;
    }

    // Single-character operators and punctuation.
    if(":,()[]+-*/^=<>".includes(ch)){
      tokens.push(ch);
      i++;
      continue;
    }

    tokens.push(ch);
    i++;
  }

  return tokens.join("|");
}
function clean(v){return String(v).replace(/[“”]/g,'"').replace(/[‘’ꞌ]/g,"'").replace(/\s+/g," ").trim();}
function norm(v){return clean(v).toUpperCase();}

function showFeedback(q,r){
  $("feedback").className=r.correct?"good":"bad";
  let h=r.correct?`<strong>Correct.</strong> ${esc(q.explanation)}`:`<strong>Not quite.</strong> ${esc(q.explanation)}`;
  if(r.reason==="case")h='<strong>Not quite.</strong> For this practice, type Cambridge pseudocode keywords and data types in UPPERCASE. '+esc(q.explanation);
  if(r.reason==="copy")h='<strong>Not accepted.</strong> Write the pseudocode answer rather than copying the question.';
  if(!r.correct&&q.type==="code")h+=`<p><strong>Model answer:</strong></p><div class="code">${esc(q.models[0])}</div>`;
  $("feedback").innerHTML=h;
}

function nextStep(){
  if(state.section==="intro"){startSection("weDo");return;}
  if(state.index<questions().length-1){state.index++;renderQuestion();return;}
  if(state.section==="weDo")weResult();else finish();
}

function weResult(){
  only($("result"));$("resultTitle").textContent="We Do Complete";$("resultScore").textContent=`Guided score: ${state.weScore}/10`;
  $("resultMessage").textContent="Now complete You Do independently. Only You Do counts toward the 80% mission result.";
  $("retry").classList.add("hidden");$("continueBtn").classList.remove("hidden");$("continueBtn").textContent="Start You Do";
  $("continueBtn").onclick=()=>{ $("continueBtn").onclick=null;startSection("youDo"); };
}

function finish(){
  only($("result"));const pct=Math.round(state.youScore/20*100),passed=pct>=PASS;
  progress.best=Math.max(progress.best,pct);progress.attempts++;if(passed)progress.passed=true;saveProgress();
  $("resultTitle").textContent="Mission 6 Complete";$("resultScore").textContent=`You Do score: ${state.youScore}/20 (${pct}%)`;
  const badge=pct===100?"Gold":pct>=90?"Silver":pct>=80?"Bronze":"Keep practising";
  $("resultMessage").textContent=passed?`${badge} — Mission 6 completed.`:`${badge} — Retry needed. You need at least 16/20 (80%).`;
  $("retry").classList.remove("hidden");$("continueBtn").classList.add("hidden");
}

function loadProgress(){try{return JSON.parse(localStorage.getItem(PROGRESS_KEY))||{best:0,attempts:0,passed:false};}catch(e){return{best:0,attempts:0,passed:false};}}
function saveProgress(){localStorage.setItem(PROGRESS_KEY,JSON.stringify(progress));}
function esc(v){return String(v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");}

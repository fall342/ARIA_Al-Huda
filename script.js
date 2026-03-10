// NAVBAR SHADOW
window.addEventListener("scroll",()=>{
document.getElementById("navbar")
.classList.toggle("scrolled",window.scrollY>50);
});

// BURGER MENU
const burger = document.getElementById("burger");
const navMenu = document.getElementById("navMenu");

burger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// AUTO CLOSE SAAT KLIK MENU
document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// TANGGAL
document.getElementById("today").innerText=
new Date().toLocaleDateString("id-ID",
{weekday:'long',day:'numeric',month:'long',year:'numeric'});

// ===============================
// COUNTDOWN TARGET 20 JAM 00:00
// ===============================

const currentYear = new Date().getFullYear();

// Bulan Maret = 2 (karena Januari = 0)
const targetDate = new Date(currentYear, 2, 20, 0, 0, 0);

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const countdownText = document.getElementById("countdown-text");

function updateCountdown() {
  const now = new Date();
  const distance = targetDate - now;

  if (distance <= 0) {
    countdownText.innerHTML = "🌙 Ramadan Telah Berakhir";
    document.querySelector(".countdown").style.display = "none";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// PRAYER & CLOCK
const prayers={
Subuh:"04:41",
Dzuhur:"12:01",
Ashar:"15:13",
Maghrib:"18:04",
Isya:"19:12"
};

setInterval(()=>{
const now=new Date();
document.getElementById("clock")
.innerText=now.toLocaleTimeString("id-ID");

let next=null;
let nextTime=null;

for(let name in prayers){
let [h,m]=prayers[name].split(":");
let t=new Date();
t.setHours(h,m,0);
if(now<t){next=name;nextTime=t;break;}
}

if(!next){
let [h,m]=prayers["Subuh"].split(":");
nextTime=new Date();
nextTime.setDate(now.getDate()+1);
nextTime.setHours(h,m,0);
next="Subuh";
}

document.getElementById("nextPrayer").innerText=next;

let diff=nextTime-now;
let hh=Math.floor(diff/(1000*60*60));
let mm=Math.floor((diff%(1000*60*60))/(1000*60));
let ss=Math.floor((diff%(1000*60))/1000);

document.getElementById("countPrayer")
.innerText=hh+"j "+mm+"m "+ss+"d";

document.querySelectorAll(".prayer-card tr")
.forEach(tr=>tr.classList.remove("prayer-highlight"));

document.getElementById(next)
.classList.add("prayer-highlight");

},1000);

// SCROLL ANIMATION
const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
},{threshold:0.2});

document.querySelectorAll("section").forEach(sec=>{
if(!sec.classList.contains("hero")){
observer.observe(sec);
}
});
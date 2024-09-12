const dt = new Date();
const hour = document.querySelector('.hour');
const min = document.querySelector('.min');
const secs = document.querySelector('.secs');
const time = document.querySelector('.time');
const sess = document.querySelector('.sess');
const countdownWrapper = document.querySelector('.countdown-wrapper');

let mCount = 0;
let sCount = 0;
let isPaused = false;
let returnTime = 60;
let isAbandoned = false;
let isSessionStarted = false;
let duration;
let sessionId;
let stat;
let interval; // To manage countdown interval
let returnInterval; // To manage return time interval

hour.innerHTML = 0;
min.innerHTML = mCount;
secs.innerHTML = sCount;

function upHtml() {
  hour.innerHTML = 0;
  min.innerHTML = mCount;
  secs.innerHTML = sCount;
}

function startSession(su) {
  duration = Number(su.duration);
  sessionId = su._id;
  stat = 'started';
  isSessionStarted = true;
  updateStatus(sessionId, 'started');
  countdownWrapper.style.display = 'block';

  interval = setInterval(() => {
    if (!isPaused && !isAbandoned) {
      sCount++;
      upHtml();

      if (sCount === 60) {
        sCount = 0;
        mCount++;
        upHtml();
      }

      if (mCount === duration) {
        updateStatus(sessionId, 'completed');
        isSessionStarted = false;
        isPaused = true;
        time.innerHTML = 'Task completed';
        mCount = 0;
        sCount = 0;
        clearInterval(interval); // Stop the interval when task is completed
        upHtml();
        reloadPage();
      }
    }

    if (isAbandoned) {
      clearInterval(interval);
      
    }
  }, 1000);
}

if (!isSessionStarted) {
 const check_For_Session = setInterval(() => {
    const sessions = JSON.parse(sess.dataset.session);
    const needSess = sessions.filter(s => s.status === 'upcoming');

    needSess.forEach(su => {
      const currentDate = new Date();
      const [gYear, gMonth, gDay] = su.date.split('-').map(Number);
      const [gHour, gMin] = su.time.split(':').map(Number);

      if (
        currentDate.getFullYear() === gYear &&
        currentDate.getMonth() + 1 === gMonth &&
        currentDate.getDate() === gDay &&
        currentDate.getHours() === gHour &&
        currentDate.getMinutes() === gMin
      ) {
        clearInterval(check_For_Session);
        startSession(su);
      }
    });
  }, 1000);
}

async function updateStatus(sessionId, status) {
  const res = await fetch('/user/update-session-status', {
    method: 'POST',
    body: JSON.stringify({ sessionId, status }),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();
  console.log(data);
}

// Always register the visibilitychange listener
document.addEventListener("visibilitychange", function () {
  if (isSessionStarted) {
    if (document.visibilityState === "hidden") {
      isPaused = true;

      returnInterval = setInterval(() => {
        returnTime--;
        if (returnTime === 0) {
          clearInterval(returnInterval);
          time.innerHTML = 'Task abandoned';
          isAbandoned = true;
          updateStatus(sessionId, 'abandoned');
        }
      }, 1000);

    } else if (document.visibilityState === "visible") {
      if (!isAbandoned) {
        isPaused = false;

        // Clear the returnInterval when the page becomes visible again
        if (returnInterval) {
          clearInterval(returnInterval);
          returnTime = 60; // Reset returnTime for future use
        }
      }else if(isAbandoned){
        reloadPage();
      }
    }
  }
});

function pause() {
  isPaused = !isPaused;
}

function reloadPage() {
  setTimeout(() => {
    location.reload();
  }, 3000);
}
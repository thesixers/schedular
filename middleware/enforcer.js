import session from "../model/session.js";
import User from "../model/user.js";
import { main } from "./mailsender.js";
import { aMinAfter, aMinMessage, equalMessage, fiveMinMessage } from "./messages.js";

export async function loop_Session() {
    let all = await session.find();

    all.forEach((s, i) => {
        if (s.status === 'upcoming') {
            let givenTime = s.time;
            let date = s.date;

            calculateTimeDifferences(givenTime, date, s.id);
        }
    });
}

async function calculateTimeDifferences(givenTime, Sdate, id) {  
    // time
    const Hour = new Date().getHours();
    const min = new Date().getMinutes();

    // givenTime
    const gHour = Number(givenTime.split(':')[0]);
    const gMin = Number(givenTime.split(':')[1]);

    // date
    const dt = new Date();
    let month = dt.getMonth() + 1;
    let day = dt.getDate();
    let year = dt.getFullYear();

    // given date
    const [gYear, gMonth, gDay] = Sdate.split('-').map(Number);

    let it = await session.findById(id);
    let user = await User.findById(it.userId);

    if (year === gYear) {
        if (month === gMonth) {
            if (day === gDay) {
                if (Hour === gHour) {  
                    // console.log('boss the Hours match');
                    if (min < gMin) {
                        const diff = gMin - min;
                        if (diff === 5) main(user.email, fiveMinMessage);
                        if (diff === 1) main(user.email, aMinMessage);
                    }
                    if (min === gMin) main(user.email, equalMessage);
                    if (min > gMin) {
                        const diff = min - gMin;
                        if (diff === 1) {
                            await it.updateOne({ status: 'missed' });
                            await main(user.email, aMinAfter);
                        }
                    }
                }
                if(gHour - Hour === 1){
                    // if(min >= 55 && gMin < 5){
                    //     const [F,L] = Array.from(min.toString()).map(Number);
                    //     let diff = L - gMin; 

                    // }
                    if(min === 55 && gMin === 0 || min === 56 && gMin === 1 || min === 57 && gMin === 2 || min === 58 && gMin === 3 || min === 59 && gMin === 4){
                        if (diff === 5) main(user.email, fiveMinMessage);
                    }
                    if(min === 59 && gMin === 1){
                        if (diff === 1) main(user.email, aMinMessage);
                    }
                }
            }
        }
    }

    // Mark session as missed if the year, hour, or minute is past the scheduled time
    if (year > gYear || 
       (year === gYear && month > gMonth) || 
       (year === gYear && month === gMonth && day > gDay) || 
       (year === gYear && month === gMonth && day === gDay && Hour > gHour) || 
       (year === gYear && month === gMonth && day === gDay && Hour === gHour && min > gMin)) {
        await it.updateOne({ status: 'missed' });
        await main(user.email, aMinAfter);
    }
}

// Example usage
// const givenTime = "13:09"; // The time in HH:MM format
// let Sdate = "2024-09-04";

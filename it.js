// let mesa

function calculateTimeDifferences(givenTime,Sdate) {
   // time
   const Hour = new Date().getHours();
   const min = new Date().getMinutes();

   // givenTime
   const gHour = Number(givenTime.split(':')[0]);
   const gMin = Number(givenTime.split(':')[1]);


   // date
   const dt = new Date();
   let month = dt.getMonth() + 1;
   let day = dt.getDay() + 1;
   let year = dt.getFullYear();

   // given date
   const [gYear, gMonth, gDay] = Sdate.split('-').map(Number);

   console.log(Hour); 

   if(year === gYear){
      if(month === gMonth){
         if(day === gDay){
           if(Hour === gHour){
            console.log('boss the Hours match');
            if(min > gMin){
               const diff = min - gMin;
               if(diff === 5) {}
            }
            if(min < gMin){
               const diff = gMin - min;
               if(diff === 1){}
            }
            if(min === gMin){}
           }
         }
      }
   };

}


// Example usage
const givenTime = "13:9"; // The time in HH:MM format,
let Sdate = "2024-9-04";


calculateTimeDifferences(givenTime,Sdate);

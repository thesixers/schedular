let i = 0;
    let form = document.querySelector('form');
    let errMessage = document.querySelector('.err-massage');

    form.addEventListener('submit', async function(e){
      e.preventDefault();
      let name = form.name.value;
      let nameArray = name.split(' ')
      let formData = new FormData(this);

      if(nameArray.length < 2) {
        let M = 'Pls enter atleast 2 names';
        errMessage.style.color = 'red';
        errMessage.innerHTML = '';
        setInterval(()=>{
          if(i < M.length){
            errMessage.innerHTML += M[i];
            i++
          }else{
            clearInterval()
          }

        },30);
      }
      else{

        try{

          let res = await fetch('/auth/signup', {
            method: 'POST',
            body: formData
          });

          let data = await res.json();

          if(data.E){
            errMessage.innerHTML = '';
            let err = data.E.email.trim() !== '' ? data.E.email.trim() : data.E.password.trim();
                errMessage.style.color = 'Red';
                
                setInterval(()=>{
                  if(i < err.length){
                    errMessage.innerHTML += err[i];
                    i++
                  }else{
                    clearInterval()
                  }

                },30);
          };

          if(data.M){
            errMessage.innerHTML = '';
            errMessage.style.color = 'green';
            let M = data.M.trim();
            setInterval(()=>{
              if(i < M.length){
                errMessage.innerHTML += M[i];
               i++ 
              }else{
                clearInterval()
                setTimeout(()=>{
                  location.assign('/auth/login');
                }, 2000)
              }
            },40)
          };

        }
        catch(err){
          console.error(err.message);
        }

      }

    })
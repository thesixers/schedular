
document.querySelector('.settings').addEventListener('click', ()=>{
    document.querySelector('.main-enf').style.display = 'flex';
  });

  document.querySelector('.notification').addEventListener('click', ()=>{
    let notify = document.querySelector('.notification-center-container');
    notify.style.display === 'none'? notify.style.display = 'block' : notify.style.display = 'none'
  })

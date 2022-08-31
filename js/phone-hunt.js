const loadPhones = async (searchText , dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data,dataLimit);
}

const displayPhones = (phones , dataLimit)=> {
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.textContent = '';
  const showAll = document.getElementById('show-all');
  if( dataLimit && phones.length > 12){
  phones = phones.slice(0,12);
 
  showAll.classList.remove('d-none')
  }
  else{
    showAll.classList.add('d-none')
  }

  const noPhone = document.getElementById('no-found-message');
  if(phones.length === 0){
    noPhone.classList.remove('d-none');
  }
  else{
    noPhone.classList.add('d-none');
  }
  phones.forEach(phone => {
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="loadPhoneDetails('${phone.slug}')" herf="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
        </div>
      </div>
        `;
       
    phoneContainer.appendChild(phoneDiv);
  });
  toggleSpinner(false)
}
const processSearch = (dataLimit) =>{
  
  toggleSpinner(true)
  const searchFiled = document.getElementById('seacrh-filed');
  const searchText = searchFiled.value;
 
  loadPhones(searchText, dataLimit);
}
  
  document.getElementById('btn-search').addEventListener('click',function(){
    processSearch(12);
  })
  document.getElementById('seacrh-filed').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
      processSearch(12);
    }
  })

  const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
      loaderSection.classList.remove('d-none');
    }
    else{
      loaderSection.classList.add('d-none');
    }
  }

  document.getElementById('bnt-show-all').addEventListener('click',function(){
    processSearch() ;
    })

    const loadPhoneDetails = async id =>{
      const url  = ` https://openapi.programming-hero.com/api/phone/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      displayPhoneDetails(data.data);
    }
const displayPhoneDetails = phone => {
  const modalTitle = document.getElementById('phoneDetailModalLabel');
  modalTitle.innerText = phone.name;
  const phoneDetails = document.getElementById('phone-details');
  phoneDetails.innerHTML = `
  <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'Nai go' } </p>
  <p>Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : 'Nai go' } </p>

  `  

}

loadPhones('apple');
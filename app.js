const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"


  const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
 let swap = document.querySelector("form i");
 let from = document.querySelector("#from select");
 let toCurr = document.querySelector("#to select");
 let flagF = document.querySelector(".flagF");
 let flagT = document.querySelector(".flagT");
 let msg =document.querySelector(".result");
 


  for(let select of dropdowns){
    for (currCode in countryList){
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if(select.name === "from" && currCode === "USD"){
        newOption.selected ="selection"
      }
     else if (select.name === "to" && currCode === "INR"){
        newOption.selected ="selection"
      }
      select.append(newOption)
      
    }
    
    select.addEventListener("change",(evt) =>{
      
      updateFlag(evt.target);
        })
      }
      

//flag updation function

  const updateFlag = (element) =>{
    let currCode = element.value;
   let countryCode = countryList[currCode];
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
 
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
  
  }

//swap function to swap currency

  swap.addEventListener("click" , function swapA(value){
    const temp = from.value;
    from.value =toCurr.value;
    toCurr.value = temp;
    const tempF = flagF.src;
    flagF.src = flagT.src;
    flagT.src = tempF
  
  
 
})
//submit function
  btn.addEventListener("click",async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal<1){
      amtVal = 1;
      amount.value = 1;
    }

    const URL = `${BASE_URL}/${from.value.toLowerCase()}.json`;
    let response = (await fetch(URL));
    
    
    let data = await response.json();
    let fromCurr = from.value.toLowerCase();
    let rate = data[fromCurr]?.[toCurr.value.toLowerCase()];
    let finalAmount = rate*amtVal;
    console.log(finalAmount);
    msg.innerText = finalAmount;
    let din = data.date;
    let para = document.querySelector(".para");
    console.log(typeof(din));
 para.innerHTML = `RESULTS ON  DATE : ${din}`;
    
    
    
  
  
  });
  



  
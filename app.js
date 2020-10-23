window.onload = function(){
    var followers; let page=1; let section; let start;

    const heading = document.getElementById("title");

    //Wait for 1000 millisecond before you can display the main page
    setTimeout(displayPage,1000);


    function displayPage(){

    heading.textContent = "Pagination";

    const container = document.getElementById("grid_container")

   
   //Fecth Followers based on selected Page
    function fetchFollowers(){
        fetch("https://api.github.com/users/john-smilga/followers?per_page=100")
        .then(response => response.json())
        .then(data => {
            start = page*10 - 10;
         section=   data.filter(function(elm,index){

                        return  index>start &&  index<page*10 


                     }).map(function(person,index){
                
                const {login,avatar_url,html_url} = person;
                
                return `  <div class="profile">
                    <img class="image" src=${avatar_url}>
                        <p class="name">${login}</p>
                        <a href=${html_url} class="profileLink" target="_blank">VIEW PROFILE</a>
                    </div>`

            }).join("")

            container.innerHTML=section

            })

        }

         
    let btn_elements=""; 

    const pagination = document.getElementById("pagination")

    for(var i=0;i<12;i++){

        if(i==0 || i==11){
            if(i==0){
            btn_elements += `<button  id="previous" class="labelBtn">Prev</button>`}
            else{
                btn_elements += `<button  id="next" class="labelBtn">Next</button>`
            }

        }else{

            btn_elements += `<button class="btns">${i}</button>`

        }


    }
  // Create buttons and place them in the Pagination container
    pagination.innerHTML = btn_elements;

    // Add active class to first button
   const button_1 = pagination.children[page];
  
   button_1.classList.add("active");

   const buttons = document.querySelectorAll("button")

   buttons.forEach(elm => elm.addEventListener("click",goToPage))


    // GO to particular page based on page selected
   function goToPage(){

    // Previous Button Clicked
    if(this.textContent == "Prev"){
        if(page == "1"){
       page = 10;
        }
        else{
            page = parseInt(page) -1 ;
        }

        buttons.forEach(elm => {
            elm.classList.remove("active");

            if(elm.textContent == page){
                elm.classList.add("active")
            }

        })
        fetchFollowers();
    }


    // Next Button Clicked
    else if(this.textContent == "Next"){
        if(page == "10"){
       page = 1;
        }
        else{
            page = parseInt(page) +1 ;
        }

        buttons.forEach(elm => {
            elm.classList.remove("active");

            if(elm.textContent == page){
                elm.classList.add("active")
            }

        })
        fetchFollowers();

    }


    //Any other Page Number Selected 
   else {
       
    page = this.textContent;

    buttons.forEach(elm => elm.classList.remove("active"));

    this.classList.add("active");

    fetchFollowers();

    console.log(page) }

   }


   // Fecth Followers for Page-1 on load for the first time
   fetchFollowers();

}

}




// let nextBtn = document.getElementById("nextBtn");
// let prevBtn = document.getElementById("prevBtn");
// let allDish = document.querySelectorAll(".dishes");
// let searchInput = document.getElementById("searchInput").value;
// let searchBtn = document.getElementById("searchBtn");
// let  dishValue = document.querySelectorAll(".dishVal");
// let count = 0;
// // getData(dishValue)

// const getData = async (searchValue) =>{

//     console.log('my data',searchValue)
//     try{
//         let datas = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s={pizza}`);
//         let jsonData = await datas.json()
//         // console.log(jsonData);

//         console.log(jsonData.meals);
//         document.querySelector(".showMeal").innerHTML=""
//         jsonData.meals.forEach(function(data){
//             console.log(data);
//             let div = document.createElement("div");
//          div.classList.add("card");
//         div.innerHTML=`
//         <img src=${data.strMealThumb } alt="">
//         <p>${data.strMeal    }</p>
//         <button>View More</button>
//         `
//         document.querySelector(".showMeal").appendChild(div)
//         })   
//     }catch(error){
//         document.querySelector(".showMeal").innerHTML="<h1>Meal Not Found</h1>"
//     }
     
// }
// searchBtn.addEventListener("click", function(){
//     let searchValue = searchInput.value ;
//     if(searchValue == ""){
//         alert("First Search Value")
//     }else{
//         getData(searchValue)
//     }
// })

// dishValue.forEach(function(dishData){
//     dishData.addEventListener("click", function(){
//         getData(dishData.value)
//     })
// })

// // slider
// allDish.forEach(function(slide, index){
//     slide.style.left=`${index * 100}%`
// })

// function myFuntion(){
//     allDish.forEach(function(curVal){
//         curVal.style.transform=`translateX(-${count * 100}%)`
//     })
// }

// nextBtn.addEventListener("click", function(){
//     count++;
//     if(count == allDish.length){
//         count=0;
//     }
//     myFuntion();
// })

// prevBtn.addEventListener("click", function(){
//     count--;
//     if(count == -1){
//         count=allDish.length-1;
//     }
//     myFuntion();
// })




  window.onload = function () {
    let nextBtn = document.getElementById("nextBtn");
    let prevBtn = document.getElementById("prevBtn");
    let allDish = document.querySelectorAll(".dishes");
    let searchBtn = document.getElementById("searchBtn");
    let dishValue = document.querySelectorAll(".dishVal");
    let count = 0;
    const getData = async (value) => {
                console.log("from function",value);

      try {
        let datas = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
        let jsonData = await datas.json();

        document.querySelector(".showMeal").innerHTML = "";
        jsonData.meals.forEach(function (data) {
        //   console.log(data);
          let div = document.createElement("div");
          div.classList.add("card");
          div.innerHTML = `
            <img src=${data.strMealThumb} alt="">
            <p>${data.strMeal}</p>
            <button>View More</button>
          `;
          document.querySelector(".showMeal").appendChild(div);
        });
      } catch (error) {
        document.querySelector(".showMeal").innerHTML = "<h1>Meal Not Found</h1>";
      }
    };

    searchBtn.addEventListener("click", function () {
      let searchInput = document.getElementById("searchInput").value;
      if (searchInput === "") {
        alert("Please enter a search value");
      } else {
        getData(searchInput);
      }
    });

    dishValue.forEach(function (dishData) {
      dishData.addEventListener("click", function () {
        console.log(dishData.value)
        getData(dishData.value);
      });
    });

    // slider
    allDish.forEach(function (slide, index) {
      slide.style.left = `${index * 100}%`;
    });

    function myFunction() {
      allDish.forEach(function (curVal) {
        curVal.style.transform = `translateX(-${count * 100}%)`;
      });
    }

    nextBtn.addEventListener("click", function () {
      count++;
      if (count === allDish.length) {
        count = 0;
      }
      myFunction();
    });

    prevBtn.addEventListener("click", function () {
      count--;
      if (count === -1) {
        count = allDish.length - 1;
      }
      myFunction();
    });
  };
//   getData("momo")
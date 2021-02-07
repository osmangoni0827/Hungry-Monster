
const scerch=document.getElementById('scerch');
const button=document.getElementById('sbutton');
button.addEventListener('click',function(){
    SearchMealAndShow(scerch.value);

})



SearchMealAndShow=(name)=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then(res=>res.json())
    .then(meals=>ShowMeal(meals));
}
ShowMeal=meals=>{
    const NotFoundNode=GetId('DisplayInformation');
    let parentNode='';
    const Meal=meals.meals
if(Meal===null)
    {
        NotFoundNode.style.display='block';
        const HtmlTempet=`
        <h1 class="text-center">NOT FOUND ANY MEAL</h1>
       `
       document.getElementById('DisplayInformation').innerHTML=HtmlTempet;
    }
else{
    Meal.map(meal=>{
        NotFoundNode.style.display='none';
        const HtmlTemplet=`
        <div class="card mt-4 col-md-3 col-sm-12" style="width: 18rem;border:none">
        <div onclick="DisplayIntigated('${meal.strMeal}')">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal} picture">
            <div class="card-body backupbody">
                <h4 class='text-center'>${meal.strMeal}</h4>
            </div>
        </div>
        </div>`
        parentNode=parentNode+HtmlTemplet;
    })
    GetId('MealType').innerHTML=parentNode;
    }  
}

            // Onclick Mealname Api Function
function DisplayIntigated(mealname)
{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealname}`)
    .then(res=>res.json())
    .then(meals=>displayInformation(meals));
}

                //Display Any One Meal Information
function displayInformation(meals){
    
    document.getElementById('DisplayInformation').style.display='block';
    const Meal=meals.meals[0];
    const HtmlTempet=`
    <div class="card" style="height: 490px;">
    <img src="${Meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body" >
      <h3 class="card-title text-center">${Meal.strMeal}</h3>
      <h4>Ingredients</h4>
      <h6>${Meal.strIngredient1}</h6>
      <h6>${Meal.strIngredient2}</h6>
      <h6>${Meal.strIngredient3}</h6>
      <h6>${Meal.strIngredient4}</h6>
      <h6>${Meal.strIngredient5}</h6>
      <h6>${Meal.strIngredient6}</h6>
  </div>`
  document.getElementById('DisplayInformation').innerHTML=HtmlTempet;
  
}


function GetId(id)
{
    return document.getElementById(id);
}
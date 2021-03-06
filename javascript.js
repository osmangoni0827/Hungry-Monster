
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

                //Show Similer Meal Function
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
        <div class="card mt-4 col-lg-3 col-md-6 col-sm-12" style="width:18rem; border:none;">
        <div onclick="DisplayIntigated('${meal.strMeal}')" class="main-body">
        <a href='#display'>
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal} picture">
            <div class="card-body">
                <h4 class='text-center'>${meal.strMeal}</h4>
            </div>
        </a>
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
    .then(meals=>displayInformation(meals))
    .catch(error=>console.log(error));
}

                //Display Any One Meal Information
function displayInformation(meals){
    const Meal=meals.meals[0];
    document.getElementById('DisplayInformation').style.display='block';
    const HtmlTempet=`
    <div class="card" style="border:none;" id='display'>
    <img src="${Meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body" style=" margin-bottom: 0px;padding-bottom: 0px;" >
      <h3 class="card-title text-center">${Meal.strMeal}</h3>
      <h5>Ingredients</h5>
      <ul id='ulid'>
      </ul>
  </div>`
  document.getElementById('DisplayInformation').innerHTML=HtmlTempet;
  GetIngredient(Meal);
}

function GetIngredient(Meal)
{
    let ul=document.getElementById('ulid');
    let li='';
    const Ingredient=[
        (`${Meal.strMeasure1} ${Meal.strIngredient1}`),
        (`${Meal.strMeasure2} ${Meal.strIngredient2}`),
        (`${Meal.strMeasure3} ${Meal.strIngredient3}`),
        (`${Meal.strMeasure4} ${Meal.strIngredient4}`),
        (`${Meal.strMeasure5} ${Meal.strIngredient5}`),
        (`${Meal.strMeasure6} ${Meal.strIngredient6}`),
        (`${Meal.strMeasure7} ${Meal.strIngredient7}`),
        (`${Meal.strMeasure8} ${Meal.strIngredient8}`),
        (`${Meal.strMeasure9} ${Meal.strIngredient9}`),
        (`${Meal.strMeasure10} ${Meal.strIngredient10}`)
   ] 
   Ingredient.map(data=>{
       if(data!="  " && data!=" " && data!=' null')
       {
        li=li+`<li><i class="fas fa-check-circle"></i> ${data}</li>`
       }
       
   })
   ul.innerHTML=li;
}

                    //Get Id
function GetId(id)
{
    return document.getElementById(id);
}
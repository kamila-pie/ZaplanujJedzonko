document.addEventListener("DOMContentLoaded", function () {
    const headerName = document.querySelector(".user_log_name");


    if (localStorage.getItem('User')) {
        headerName.innerText = localStorage.getItem('User');
    }

    const createNewRow = (id, name, desc) => {
        const position = document.querySelector(".list__table-scrol")
        const newPoemTr = document.createElement("tr");
        const newPoemTd = document.createElement("td");
        newPoemTd.innerText = id;
        const newPoemTd2 = document.createElement("td");
        newPoemTd2.innerText = name;
        const newPoemTd3 = document.createElement("td");
        newPoemTd3.innerText = desc;
        const newPoemTd4 = document.createElement("td");
        const newBtn1 = document.createElement("button")
        const newBtn2 = document.createElement("button")
        const imgEdition1 = document.createElement("i")
        const imgEdition2 = document.createElement("i")
        position.prepend(newPoemTr);
        newPoemTr.appendChild(newPoemTd);
        newPoemTr.appendChild(newPoemTd2);
        newPoemTr.appendChild(newPoemTd3);
        newPoemTr.appendChild(newPoemTd4);
        newPoemTd4.appendChild(newBtn1)
        newBtn1.appendChild(imgEdition1);
        newPoemTd4.appendChild(newBtn2);
        newBtn2.appendChild(imgEdition2)
        imgEdition1.classList.add("far");
        imgEdition1.classList.add("fa-edit");
        imgEdition2.classList.add("far");
        imgEdition2.classList.add("fa-trash-alt");
        newBtn2.classList.add("recipe-list-delete");
        newBtn1.classList.add("recipe-list-edit");
    }


    // dodawanie przepisu
    const recipeForm = document.querySelector(".new-recipe-box form");
    const recipeName = document.getElementById("recipe-name");
    const recipeDescription = document.getElementById("recipe-descriptions");
    const recipeInstruction = document.getElementById("recipe-instructions-input");
    const recipeIngredients = document.getElementById("recipe-ingredients-input");
    const btnSubmitSave = document.querySelector(".new-recipe-save-button");
    recipeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (e.code === 13) {
            e.preventDefault();
        }
    });
    let id = 0;
    let ingredientsList = [];
    let instructionList = [];
    let ls = localStorage.getItem("Recipes");
    let recipes = [];
    if (ls) {
        ls = JSON.parse(ls)
        recipes = [...ls];
    }

    function validate(nums, ...elements) {
        let ok = true;
        elements.forEach(el => {
            if (el.length > nums || el.length <= 1) {
                ok = false;
            }
        })
        return ok;
    }
    const btnInstruction = document.getElementById("plus-instructions");
    const btnIngredients = document.getElementById("plus-ingredients");
    btnInstruction.addEventListener('click', function (e) {
        e.preventDefault();
        if (validate(150, recipeInstruction.value)) {
            const li = document.createElement("li");
            li.dataset.id = ++id;
            li.innerHTML = `${recipeInstruction.value}
             <button class="add-instructions-edit-btn"><i class="far fa-edit"></i></button>
             <button class="add-instructions-del-btn"><i class="far fa-trash-alt"></i></button>`;
            this.nextElementSibling.prepend(li);
            const ob = {
                id: id,
                instruction: recipeInstruction.value
            };
            instructionList.push(ob);
            recipeInstruction.value = '';
        }
    })
    btnIngredients.addEventListener('click', function (e) {
        e.preventDefault();
        if (validate(50, recipeIngredients.value)) {
            const li = document.createElement("li");
            li.dataset.id = ++id;
            li.innerHTML = `${recipeIngredients.value}
             <button class="add-ingredients-edit-btn"><i class="far fa-edit"></i></button>
             <button class="add-ingredients-del-btn"><i class="far fa-trash-alt"></i></button>`;
            this.nextElementSibling.prepend(li);
            const ob = {
                id: id,
                ingredient: recipeIngredients.value
            };
            ingredientsList.push(ob);
            recipeIngredients.value = '';
        }
    })
    const lowerFormContainer = document.querySelector(".recipe-ingredients-parent");
    lowerFormContainer.addEventListener('click', e => {
        if (e.target.classList.contains("add-instructions-del-btn")) {
            const targetText = e.target.parentElement.dataset.id;
            let newInstList = instructionList.filter(el => {
                return el.id !== Number(targetText);
            });
            instructionList = newInstList;
            e.target.parentElement.remove();
        }
        if (e.target.classList.contains("add-ingredients-del-btn")) {
            const targetText = e.target.parentElement.dataset.id;
            let newInstList = ingredientsList.filter(el => {
                return el.id !== Number(targetText);
            });
            ingredientsList = newInstList;
            e.target.parentElement.remove();
        }
        if (e.target.classList.contains("add-instructions-edit-btn")) {
            const targetText = e.target.parentElement.dataset.id;
            recipeInstruction.value = e.target.parentElement.innerText;
            let newInstList = instructionList.filter(el => {
                return el.id !== Number(targetText);
            });
            instructionList = newInstList;
            e.target.parentElement.remove();
        }
        if (e.target.classList.contains("add-ingredients-edit-btn")) {
            const targetText = e.target.parentElement.dataset.id;
            recipeIngredients.value = e.target.parentElement.innerText;
            let newInstList = ingredientsList.filter(el => {
                return el.id !== Number(targetText);
            });
            instructionList = newInstList;
            e.target.parentElement.remove();
        }
    })
    recipes.forEach(el => {
        createNewRow(el.id, el.name, el.description);
    })
    // add recipes
    btnSubmitSave.addEventListener('click', function (e) {
        e.preventDefault();
        if (validate(50, recipeName.value) &&
            validate(360, recipeDescription.value) &&
            validate(50, ...ingredientsList) &&
            validate(150, ...instructionList)) {
            let newObj = {};
            if (recipes.length === 0) {
                newObj.id = 1;
            } else {
                const id = recipes[recipes.length - 1].id;
                newObj.id = id + 1;
            }
            newObj.name = recipeName.value;
            newObj.description = recipeDescription.value;
            newObj.ingredients = ingredientsList;
            newObj.instruction = instructionList;
            recipes.push(newObj);
            localStorage.setItem("Recipes", JSON.stringify(recipes));
            createNewRow(newObj.id, newObj.name, newObj.description);
            // Resetuje formularz
            ingredientsList = [];
            instructionList = [];
            let newstorage = localStorage.getItem("Recipes");
            newstorage = JSON.parse(newstorage);
            recipes = [...newstorage];
            recipeForm.reset();
            [...btnInstruction.nextElementSibling.children].forEach(el => el.remove());
            [...btnIngredients.nextElementSibling.children].forEach(el => el.remove());
        }
    })

    //Modal Window PlanyAdd
    const modalPlan = document.getElementById('myModal');
    const widgetAddPlan = document.querySelector('#add-recipe-recipes');
    const closeModalPlan = document.getElementsByClassName("new-recipe-save-button")[0];
    widgetAddPlan.onclick = function () {
        modalPlan.style.display = "block";
    }
    closeModalPlan.onclick = function () {
        modalPlan.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modalPlan) {
            modalPlan.style.display = "none";
        }
    }

    // // Modal NoRecipes
    // const modalNoRecipes = document.getElementById('myModalNoRecipes');
    // const widgetNoRecipes = document.querySelector('#add-recipe-recipes');
    // const closeModalNoRecipes = document.getElementsByClassName("new-plan-save-button")[0];
    // widgetNoRecipes.onclick = function () {
    //     modalNoRecipes.style.display = "block";
    // }
    // closeModalNoRecipes.onclick = function () {
    //     modalNoRecipes.style.display = "none";
    // }
    // window.onclick = function (event) {
    //     if (event.target == modalNoRecipes) {
    //         modalNoRecipes.style.display = "none";
    //     }
    // }

    // Usuwanie wiersza w tabeli
    const table = document.querySelector(".list__table-scrol");

    table.addEventListener('click', function (e) {
        if (e.target.classList.contains("recipe-list-delete")) {
            e.target.parentElement.parentElement.remove()
            const id = Number(e.target.parentElement.parentElement.firstElementChild.innerText);
            console.log(id);
            recipes = recipes.filter(el => el.id !== id);
            console.log(recipes);
            localStorage.setItem("Recipes", JSON.stringify(recipes));
            let newstorage = localStorage.getItem("Recipes");
            newstorage = JSON.parse(newstorage);
            recipes = [...newstorage];
        }
    })
    //Edycja pozycji w formularzu

    table.addEventListener('click', function (e) {
        if (e.target.classList.contains('recipe-list-edit')) {
            e.target.parentElement.parentElement.remove()
            const id = Number(e.target.parentElement.parentElement.firstElementChild.innerText);
            console.log(id);
            recipes = recipes.filter(el => el.id !== id);
            console.log(recipes);
            localStorage.setItem("Recipes", JSON.stringify(recipes));
            let newstorage = localStorage.getItem("Recipes");
            newstorage = JSON.parse(newstorage);
            recipes = [...newstorage];
            modal.style.display = "block"
        }
    })




});
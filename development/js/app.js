document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector(".form__input");
    const root = document.querySelector(".form__background");
    const dashboard = document.querySelector(".app_dashboard");
    const headerName = document.querySelector(".user_log_name");
    if (localStorage.getItem('User')) {
        root.style.display = "none";
        dashboard.style.display = "flex";
        headerName.innerText = localStorage.getItem('User');
    }
    root.firstElementChild.addEventListener('submit', e => {
        e.preventDefault();
        const validated = (el) => {
            if (el.length >= 2) {
                return true
            } else {
                return false
            }
        }
        if (validated(input.value)) {
            localStorage.setItem("User", input.value);
            root.style.opacity = "0";
            setTimeout(() => {
                root.style.display = "none";
                dashboard.style.display = "flex";
            }, 500)
            headerName.innerText = input.value;
        }
    })

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

    function getLS(el) {
        let ls = localStorage.getItem(el);
        if (ls) {
            ls = JSON.parse(ls)
            return [...ls];
        } else {
            return []
        }
    }

    let recipes = getLS("Recipes");

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


    //Widget powiadomienia - ilość dodanych przepisów
    const info = document.querySelector(".info");
    const updateWidget = () => {
        if (recipes.length === 0) {
            info.style.borderColor = "red";
            info.style.color = "red";
            info.children[1].innerText = `Nie masz jeszcze żadnych przepisów!`
        } else if (recipes.length === 1) {
            info.style.borderColor = "#3498DB";
            info.style.color = "#3498DB";
            info.children[1].innerText = `Dodałeś swój pierwszy przepis, brawo!`;
            info.style.display = "flex";
        } else if (recipes.length < 5) {
            info.style.borderColor = "#3498DB";
            info.style.color = "#3498DB";
            info.children[1].innerText = `Masz już ${recipes.length} przepisy, nieźle!`;
            info.style.display = "flex";
        } else {
            info.children[1].innerText = `Masz już ${recipes.length} przepisów, tak trzymaj!`
            info.style.display = "flex";
        }
    }
    updateWidget();
    const infoX = document.querySelectorAll(".info-x");
    infoX.forEach(el => {
        el.addEventListener("click", function (e) {
            this.parentElement.style.display = 'none';
        })
    })
// Add Options
    const inputs = document.querySelectorAll(".plan-details-box select");

    function insertOptions() {
        inputs.forEach((el) => {
            recipes.forEach(recipe => {
                const option = document.createElement("option");
                option.setAttribute("value", recipe.id);
                option.innerText = recipe.name;
                el.append(option);
            })
        });
    }

    insertOptions()


// add recipes
    btnSubmitSave.addEventListener('click', function (e) {
        e.preventDefault();
        if (validate(50, recipeName.value)
            && validate(360, recipeDescription.value)
            && validate(50, ...ingredientsList)
            && validate(150, ...instructionList)) {
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
            inputs.forEach(el => {
                const option = document.createElement("option");
                option.setAttribute("value", newObj.id);
                option.innerText = newObj.name;
                el.append(option);
            })
            // Resetuje formularz
            ingredientsList = [];
            instructionList = [];
            recipes = [...getLS("Recipes")];
            recipeForm.reset();
            [...btnInstruction.nextElementSibling.children].forEach(el => el.remove());
            [...btnIngredients.nextElementSibling.children].forEach(el => el.remove());
            updateWidget();
        }
    })
    // Modal Window Przespis
    const modal = document.getElementById('myModal');
    const widgetAdd = document.querySelector('.widget_add');
    const closeModal = document.getElementsByClassName("new-recipe-save-button")[0];
    widgetAdd.onclick = function () {
        modal.style.display = "block";
        noRecipes.style.display = 'none';
    }
    closeModal.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    //Wodal Window Plany
    const modalPlan = document.getElementById('myModalPlan');
    const widgetAddPlan = document.querySelector('.plan');
    const closeModalPlan = document.getElementsByClassName("new-plan-save-button")[0];
    const noRecipes = document.querySelector(".noRecipes");
    const btnNoRecipes = document.querySelector(".btnNoRecipes");
    const noRecipesClose = document.querySelector(".noRecipesX");

    widgetAddPlan.addEventListener('click', function() {
        if (getLS("Recipes").length === 0) {
            noRecipes.style.display = 'flex';
        } else {
            modalPlan.style.display = "block";
            noRecipes.style.display = 'none';
        }
    })
    closeModalPlan.onclick = function () {
        modalPlan.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modalPlan) {
            modalPlan.style.display = "none";
        }
    }
    // Modal Window Notice - Brak Przepisów
    btnNoRecipes.addEventListener( "click", function (e){
        e.preventDefault();
        modalPlan.style.display = "none";
        modal.style.display = "block";
        noRecipes.style.display = 'none';
    })
    noRecipesClose.addEventListener("click", function (e) {
        noRecipes.style.display = "none";
    });


    //lista przepisów z localStorage:

    let plans = getLS("Plans");

    const form = document.getElementById("add-schedule");
    const planNameInp = document.getElementById("plan-name");
    const planDescInp = document.getElementById("plan-descriptions");
    const planWeekInp = document.getElementById("plan-week-number");
    const planDetBox = document.querySelector(".plan-details-box");

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let newObj = {};
        if (plans.length === 0) {
            newObj.id = 1;
        } else {
            const id = plans[plans.length - 1].id;
            newObj.id = id + 1;
        }
        newObj.name = planNameInp.value;
        newObj.description = planDescInp.value;
        newObj.week = planWeekInp.value;
        let days = [];
        [...planDetBox.children].forEach((el, i) => {
            switch (i) {
                case 0:
                    days.push([
                        el.children[1].value,
                        el.children[2].value,
                        el.children[3].value,
                        el.children[4].value,
                        el.children[5].value
                    ])
                    break;
                case 1:
                    days.push([
                        el.children[1].value,
                        el.children[2].value,
                        el.children[3].value,
                        el.children[4].value,
                        el.children[5].value
                    ])
                    break;
                case 2:
                    days.push([
                        el.children[1].value,
                        el.children[2].value,
                        el.children[3].value,
                        el.children[4].value,
                        el.children[5].value
                    ])
                    break;
                case 3:
                    days.push([
                        el.children[1].value,
                        el.children[2].value,
                        el.children[3].value,
                        el.children[4].value,
                        el.children[5].value
                    ])
                    break;
                case 4:
                    days.push([
                        el.children[1].value,
                        el.children[2].value,
                        el.children[3].value,
                        el.children[4].value,
                        el.children[5].value
                    ])
                    break;
                case 5:
                    days.push([
                        el.children[1].value,
                        el.children[2].value,
                        el.children[3].value,
                        el.children[4].value,
                        el.children[5].value,
                    ])
                    break;
                case 6:
                    days.push([
                        el.children[1].value,
                        el.children[2].value,
                        el.children[3].value,
                        el.children[4].value,
                        el.children[5].value,
                    ])
                    break;
            }
        })
        newObj.days = days;
        plans.push(newObj);
        localStorage.setItem("Plans", JSON.stringify(plans));
        // Resetuje formularz
        plans = [...getLS("Plans")];
        planListDisplay();
        form.reset();
        updateWidgetExclamation();
    })

// LISTA PLANÓW
    const planListHeader = document.querySelector(".table_header span");
    const planListBtn = document.querySelectorAll(".table_switch_el");
    const planListDays = document.querySelectorAll(".day ul");
    const planListCnt = document.querySelector(".week_schedule_container");
    let c = 0
    let currentPlan = false;

    function planListDisplay() {
        if (getLS("Plans").length > 0) {
            currentPlan = plans[c];
            planListCnt.style.display = "block";
            planListHeader.innerText = currentPlan.week;
            planListDays.forEach((el, i) => {
                [...el.children].forEach((li, index) => {
                    const id = currentPlan.days[i][index]
                    li.innerText = recipes[id - 1].name;
                })
            })
        } else {
            planListCnt.style.display = "none";
        }
    }

    planListDisplay();
            planListBtn[0].addEventListener('click', () => {
                if (c === 0) {
                    c = getLS("Plans").length;
                }
                c--;
                currentPlan = plans[c];
                planListDisplay();
            });
            planListBtn[1].addEventListener('click', () => {
                c++
                if (c === getLS("Plans").length) {
                    c = 0;
                }
                currentPlan = plans[c];
                planListDisplay();
            });

    //Wigdet exclamation - box info z ilością dodanych przepisów
    const exclamation = document.querySelector(".exclamation");
    const updateWidgetExclamation = () => {
        if (plans.length === 0) {
            exclamation.style.borderColor = "red";
            exclamation.style.color = "red";
            exclamation.children[1].innerText = `Nie masz jeszcze żadnych planów!`
        } else if (plans.length === 1) {
            exclamation.style.borderColor = "#FFB03B";
            exclamation.style.color = "#FFB03B";
            exclamation.children[1].innerText = `Świetnie! Dodałeś swój pierwszy plan.`;
            exclamation.style.display = "flex";
        } else if (plans.length < 5) {
            exclamation.style.borderColor = "#FFB03B";
            exclamation.style.color = "#FFB03B";
            exclamation.children[1].innerText = `Masz już zapisane ${plans.length} plany, nieźle!`;
            exclamation.style.display = "flex";
        } else {
            exclamation.children[1].innerText = `Masz już zapisane ${plans.length} planów, nieźle!`
            exclamation.style.display = "flex";
        }
    }
    updateWidgetExclamation();
})
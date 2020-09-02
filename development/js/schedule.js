document.addEventListener("DOMContentLoaded", function () {

    const headerName = document.querySelector(".user_log_name");

    if (localStorage.getItem('User')) {
        headerName.innerText = localStorage.getItem('User');
    }

    const inputs = document.querySelectorAll(".plan-details-box select");

    let ls = localStorage.getItem("Recipes");
    let recipes = [];
    if (ls) {
        ls = JSON.parse(ls)
        recipes = [...ls];
    }

    inputs.forEach((el) => {
        recipes.forEach(recipe => {
            const option = document.createElement("option");
            option.setAttribute("value", recipe.id);
            option.innerText = recipe.name;
            el.append(option);
        })
    });
    let lsp = localStorage.getItem("Plans");
    let plans = [];
    if (lsp) {
        lsp = JSON.parse(lsp)
        plans = [...lsp];
    }

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
        let newstorage = localStorage.getItem("Plans");
        newstorage = JSON.parse(newstorage);
        plans = [...newstorage];
        form.reset();
    })

   // sekcja tabela
    const createNewRow = (id, name, desc, week) => {
        const position = document.querySelector(".list__table-scrol-2")
        const newPoemTr = document.createElement("tr");
        const newPoemTd = document.createElement("td");
        newPoemTd.innerText = id;
        const newPoemTd1 = document.createElement("td");
        newPoemTd1.innerText = name;
        const newPoemTd2 = document.createElement("td");
        newPoemTd2.innerText = desc;
        const newPoemTd3 = document.createElement("td");
        newPoemTd3.innerText = week;
        const newPoemTd4 = document.createElement("td");
        const newBtn1 = document.createElement("button")
        const newBtn2 = document.createElement("button")
        const imgEdition1 = document.createElement("i")
        const imgEdition2 = document.createElement("i")
        position.prepend(newPoemTr);

        newPoemTr.appendChild(newPoemTd);
        newPoemTr.appendChild(newPoemTd1);
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
    plans.forEach(el => createNewRow(el.id, el.name, el.description, el.week));

    //Modal Window PlanyAdd
    const modalPlan = document.getElementById('myModalPlan');
    const widgetAddPlan = document.querySelector('#add-recipe-recipes');
    const closeModalPlan = document.getElementsByClassName("new-plan-save-button")[0];
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
    // Modal Window Notice - Brak Przepisów
    const newPlanBox = document.querySelector(".new-plan-box");
    const noRecipes = document.querySelector(".noRecipes");
    const btnNoRecipes = document.querySelector(".btnNoRecipes");
    const noRecipesClose = document.querySelector(".noRecipesX");
    btnNoRecipes.addEventListener( "click", function (e){
        e.preventDefault();
        modalPlan.style.display = "none";
        modal.style.display = "block";
    })
    noRecipesClose.addEventListener("click", function (e) {
        e.preventDefault();
        modalPlan.style.display = "none";
    });


});
// globals
let categories = JSON.parse(localStorage.getItem("categories")) || [];
const addCategory = document.getElementById("add-category");
const listCategories = document.getElementById("list-of-categories");
const categoriesSelect = document.getElementById("categories");

renderCategories();
renderCategoriesSelect();

addCategory.addEventListener("click", (event) => {
    let newCat = document.getElementById("input-cat").value
    if (newCat.split(' ').join('').length < 1 || !categories.includes(newCat.value)) {
        console.log("name must not already exist and be more than 1 ch")
    } else {
        categories.push(newCat);
        document.getElementById("input-cat").value = "";
        updateCategories();
    }
})

listCategories.addEventListener("click", (event) => {
    console.log(event.target.id)
    deleteCategory(event.target.id)
})

function updateCategories() {
    localStorage.setItem("categories", JSON.stringify(categories));
    categories = JSON.parse(localStorage.getItem("categories"))
    console.log("local storage updated")
    renderCategories();
    renderCategoriesSelect()
}

// renders html for list of tasks
function renderCategories() {
    let catHTML = "";
    for (let i = 0; i < categories.length; i++) {
        catHTML += `
        <li>${categories[i]}</li>
         <button class="delete-btn" value="delete-cat" id="${categories[i]}">x</button>`
    }
    listCategories.innerHTML = catHTML;
}

// renders html for list of tasks
function renderCategoriesSelect() {
    let catHTML = `<option value=""</option>`;
    for (let i = 0; i < categories.length; i++) {
        catHTML += `<option value=${categories[i]}>${categories[i]}</option>`
    }
    categoriesSelect.innerHTML = catHTML;
}

function deleteCategory(cat) {
    let catIndex = categories.findIndex((c) => c === cat);
    if (catIndex == -1) {
        console.log("cat not found")
    } else {
        categories.splice(catIndex, 1);

       tasks.forEach(task => {
        if (task.category === cat) {
            task.category = "";
        }
    });
        console.log(tasks);
        updateTasks();
        updateCategories();
        console.log("cat deleted");
    }
}
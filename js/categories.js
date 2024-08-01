// globals
let categories = JSON.parse(localStorage.getItem("categories")) || [];
const addCategory = document.getElementById("add-category");
const listCategories = document.getElementById("list-of-categories");
const categoriesSelect = document.getElementById("categories");

renderCategories();
renderCategoriesSelect();

addCategory.addEventListener("click", (event) => {
    let newCat = document.getElementById("input-cat").value.trim();
    if (newCat.length < 1) {
        console.log("Name must not be empty and must be more than 1 character: " + newCat);
    } else if (categories.includes(newCat)) {
        console.log("Category already exists: " + newCat);
    } else {
        categories.push(newCat);
        updateCategories();
        console.log("Added new category");
    }
    document.getElementById("input-cat").value = "";
});

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
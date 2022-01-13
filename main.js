/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const contentHolder = document.getElementById('contentHolder');
const sidebarAndContentHolder = document.getElementById('sidebarAndContentHolder');



const ToDoItemModule = (function() {
    
    // class to define a ToDoItem
    class ToDoItem {
        constructor(title, description, duedate, priority, notes, completed, image, location) {
            this.title = title; 
            this.description = description; //optional
            this.duedate = duedate; //optional
            this.priority = priority;
            this.notes = notes; //optional
            this.completed = completed; //optional
            this.image = image; //optional
            this.location = location; //optional
        }
    }

    // Function to create an HTML ToDo Item Card from an instance of the ToDoItem class
    function createToDoItemCard(ToDoItem) {
        console.log("running createToDoItemCard function for " + ToDoItem.title);

        //properties of a ToDoItem; title, description, #duedate, #priority, notes, #completed, image, #location
    
        const cardHolder = document.createElement('div');
        cardHolder.classList.add("max-w-[70%]","mx-auto","px-4", "m-4");
    
        const cardContentFormatter = document.createElement('div');
        cardContentFormatter.classList.add("relative","m-0","shadow-lg","flex","bg-white");
    
        const imageHolder = document.createElement('div');
        imageHolder.classList.add("flex-no-shrink");
    
        const image = document.createElement('img');
        image.classList.add("w-64","h-64","block","mx-auto");
        image.src = ToDoItem.image;
    
        const cardTextBlock = document.createElement('div');
        cardTextBlock.classList.add("flex-1","card-block","relative");
    
        const cardTextContentHolder = document.createElement('div');
        cardTextContentHolder.classList.add("p-6");
    
        const cardTitle = document.createElement('h4');
        cardTitle.classList.add("font-medium","text-2xl","mb-3");
        cardTitle.textContent = ToDoItem.title;
    
        const cardDescription = document.createElement('p');
        cardDescription.classList.add("leading-normal");
        cardDescription.textContent = ToDoItem.description;
    
        const cardNotes = document.createElement('p');
        cardNotes.classList.add("text-sm","text-grey","block","mt-6");
        cardNotes.textContent = ToDoItem.notes;
    
        cardHolder.appendChild(cardContentFormatter);

        if (ToDoItem.image != null) {
            console.log("image source is " + ToDoItem.image);
            cardContentFormatter.appendChild(imageHolder);
            imageHolder.appendChild(image);
        }    

        const checkboxHolder = document.createElement('div');
        checkboxHolder.classList = "form-check flex justify-end place-items-end";

        const checkboxLabel = document.createElement('label');
        checkboxLabel.classList = "form-check-label inline-block text-gray-800 text-sm";
        checkboxLabel.for = "check" + ToDoItem.title;
        checkboxLabel.textContent = "Finished  "
        checkboxHolder.appendChild(checkboxLabel);

        const checkbox = document.createElement('input');
        checkbox.classList = "form-check-input transition duration-200 cursor-pointer m-1";
        checkbox.type = "checkbox";
        checkbox.id = "check" + ToDoItem.title;
        // event listener to set completed value for To Do item according to whether checkbox is ticked or not
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                ToDoItem.completed = true;
                console.log(ToDoItem.title + " completed status: " + ToDoItem.completed);
            } else {
                ToDoItem.completed = false;
                console.log(ToDoItem.title + " completed status: " + ToDoItem.completed);
            }
          });
        checkboxHolder.appendChild(checkbox);

        cardContentFormatter.appendChild(cardTextBlock);
        cardTextBlock.appendChild(cardTextContentHolder);
        cardTextContentHolder.appendChild(cardTitle);
        cardTextContentHolder.appendChild(cardDescription);
        cardTextContentHolder.appendChild(cardNotes);
        cardContentFormatter.appendChild(checkboxHolder);
    
        return cardHolder;
    
    };

    
  
    return {
        ToDoItem,
        createToDoItemCard
    }
  })();
  

const ProjectModule = (function() {

    //const projectArray = [];
    const projectArray = JSON.parse(localStorage.getItem("projectArray") || "[]");
    
    // class to define a ToDoItem
    class Project { // To Do items can be assigned to groups as projects
        constructor(title, description, toDoItemArray, defaultProj) {
            this.title = title;
            this.description = description;
            this.toDoItemArray = toDoItemArray;
            this.defaultProj = defaultProj; // true/false - only 1 project can be set as default
        }
    }

    let selectedProjectIndex = 0;

    // function to search through To Do items in selected project and remove completed ones 
    function cleanupCompletedToDoItems(projectIndex) {
        console.log("running cleanupCompletedToDoItems");

        // projectArray.forEach((project, projectIndex) => {
        //     console.log("checking project for completed To Do Items:" + project.title);

        //     projectArray[projectIndex].toDoItemArray.forEach(toDoItem => {
        //         console.log("checking for completion:" + toDoItem.title);
    
        //         if (toDoItem.completed == true) {
        //             console.log("completed ToDo Item found: " + toDoItem.title);
        //             console.log("indexof value: " + projectArray[projectIndex].toDoItemArray.indexOf(toDoItem));
        //             projectArray[projectIndex].toDoItemArray.splice(projectArray[projectIndex].toDoItemArray.indexOf(toDoItem), 1);
        //             localStorage.setItem('projectArray', JSON.stringify(projectArray));
        //         }
    
        //     });

        // });

        const uncompletedItems = projectArray[projectIndex].toDoItemArray.filter(toDoItem => toDoItem.completed == false);
        projectArray[projectIndex].toDoItemArray = uncompletedItems;


        // projectArray[projectIndex].toDoItemArray.forEach(toDoItem => {
        //     console.log("checking for completion:" + toDoItem.title);

        //     if (toDoItem.completed == true) {
        //         console.log("completed ToDo Item found: " + toDoItem.title);
        //         console.log("indexof value: " + projectArray[projectIndex].toDoItemArray.indexOf(toDoItem));
        //         projectArray[projectIndex].toDoItemArray.splice(projectArray[projectIndex].toDoItemArray.indexOf(toDoItem), 1);
        //         localStorage.setItem('projectArray', JSON.stringify(projectArray));
        //     }

        // });
        //localStorage.setItem('projectArray', JSON.stringify(projectArray));
    };
    
    return {
        Project,
        projectArray,
        selectedProjectIndex,
        cleanupCompletedToDoItems
    }
  })();



function createInitialProject() {

    let ToDoProject = new ProjectModule.Project("ToDo List Project", "Keep notes here for the ToDo list website project", [], true);
    ProjectModule.projectArray.push(ToDoProject);
    console.log("List of Projects; " + ProjectModule.projectArray);

    let FirstToDoItem = new ToDoItemModule.ToDoItem("Make an item", "Create a todo list item to test functionality", Date.now(), "High", "Add any additional notes here", false, null, null);

    ToDoProject.toDoItemArray.push(FirstToDoItem);

    console.log(ToDoProject);
    localStorage.setItem('projectArray', JSON.stringify(ProjectModule.projectArray));

}

// create an initial project and to do item - TO BE REMOVED

if (ProjectModule.projectArray.length < 1) {
    console.log("No projects found, running createInitialProject");
    createInitialProject();
}



// button to add a new ToDo Item
const addToDoItem = document.createElement('button');
addToDoItem.classList.add("bg-blue-500","hover:bg-blue-400","text-white","text-base","font-bold","py-2","px-4","border-b-4","border-blue-700","hover:border-blue-500","rounded","m-10","m-10");
addToDoItem.textContent = "Add Item +";
addToDoItem.addEventListener("click", todoAdderForm);

contentHolder.appendChild(addToDoItem);



// function to show dialog for adding a ToDoItem

function todoAdderForm() {
    console.log("running todoAdderForm");

    if (document.getElementById('todoAdderFormHolder')) {
        document.getElementById('todoAdderFormHolder').remove();
    }

    else {

    const formHolder = document.createElement('div');
    formHolder.id = "todoAdderFormHolder";
    formHolder.classList.add("bg-grey-lighter","m-10","flex","flex-col");

    const formContainer = document.createElement('div');
    formContainer.classList.add("container","max-w-full","mx-auto","flex-1","flex","flex-col","items-center","justify-center","px-2");

    const formFrame = document.createElement('div');
    formFrame.classList.add("bg-white","px-6","py-8","rounded","shadow-md","text-black","w-full","text-lg");

    const heading = document.createElement('h1');
    heading.classList.add("mb-8","text-3xl","text-center");
    heading.textContent = "Add a To-do Note";

    const titleInput = document.createElement('input');
    titleInput.classList.add("block","border","border-grey-light","w-full","p-1","rounded","mb-4");
    titleInput.type = "text";
    titleInput.placeholder = "Title";
    titleInput.id = "titleInput";

    const descriptionInput = document.createElement('input');
    descriptionInput.classList.add("block","border","border-grey-light","w-full","p-1","rounded","mb-4");
    descriptionInput.type = "text";
    descriptionInput.placeholder = "Description";
    descriptionInput.id = "descriptionInput";

    const notesInput = document.createElement('input');
    notesInput.classList.add("block","border","border-grey-light","w-full","p-1","rounded","mb-4");
    notesInput.type = "text";
    notesInput.placeholder = "Notes";
    notesInput.id = "notesInput";

    const btnAddNote = document.createElement('button');
    btnAddNote.classList.add("text-lg","w-32","text-center","py-3","rounded","bg-green-600","text-white","hover:bg-green-800","focus:outline-none","my-1");
    btnAddNote.textContent = "Add +";
    btnAddNote.addEventListener("click", todoAdder);

    contentHolder.insertBefore(formHolder, addToDoItem.nextSibling);

    //addToDoItem.appendChild(formHolder);
    formHolder.appendChild(formContainer);
    formContainer.appendChild(formFrame);
    formFrame.appendChild(heading);
    formFrame.appendChild(titleInput);
    formFrame.appendChild(descriptionInput);
    formFrame.appendChild(notesInput);
    formFrame.appendChild(btnAddNote);

    }

}

function todoAdder() {
    console.log("running todoAdder");
    const title = document.getElementById("titleInput").value;
    const description = document.getElementById("descriptionInput").value;
    const notes = document.getElementById("notesInput").value;

    //ToDoItem(title, description, duedate, priority, notes, completed, image, location)
    const newToDo = new ToDoItemModule.ToDoItem(title, description, Date.now(), "High", notes, false, null, null);
    console.log("Project Array: " + ProjectModule.projectArray);
    console.log("Selected project array: " + ProjectModule.selectedProjectIndex);
    ProjectModule.projectArray[ProjectModule.selectedProjectIndex].toDoItemArray.push(newToDo);
    document.getElementById('todoAdderFormHolder').remove()
    displayToDoCards(ProjectModule.projectArray[ProjectModule.selectedProjectIndex].title);
    localStorage.setItem('projectArray', JSON.stringify(ProjectModule.projectArray));
}



//(title, description, duedate, priority, notes, completed, image, location)


// ToDo Item Card

//contentHolder.appendChild(ToDoItemModule.createToDoItemCard(FirstToDoItem));



function displayToDoCards(item) {
    console.log("running displayToDoCards");

    if (document.getElementById('cardDisplay')) {
        document.getElementById('cardDisplay').remove();
    }

    const cardDisplay = document.createElement('div');
    cardDisplay.id = "cardDisplay";
    contentHolder.appendChild(cardDisplay);

    console.table(item);
    
    if (item != undefined) {
        ProjectModule.selectedProjectIndex = ProjectModule.projectArray.findIndex(project => project.title === item);
        ProjectModule.cleanupCompletedToDoItems(ProjectModule.selectedProjectIndex);
        document.getElementById("projectHeader").textContent = item;
    };

    let selectedProject = ProjectModule.projectArray[ProjectModule.selectedProjectIndex];
    console.log("selected project is: " + selectedProject);

    if (selectedProject == undefined) {
        console.log("loading default project");
        console.log("tried to get " + ProjectModule.projectArray.indexOf(item));
        console.table(ProjectModule.projectArray);
        selectedProject = ProjectModule.projectArray[0];
    }

    selectedProject.toDoItemArray.forEach(toDoItem => {
        const newItem = ToDoItemModule.createToDoItemCard(toDoItem);
        cardDisplay.appendChild(newItem);
    });

};

displayToDoCards();


// Sidebar
function sidebarGenerator(){
    console.log("running sidebarGenerator");

    if (document.getElementById("sidebar")) {
        document.getElementById("sidebar").remove();
    };

    const sidebar = document.createElement('div');
    sidebar.id = "sidebar";
    sidebar.classList.add("bg-blue-800","text-blue-100","w-64","space-y-6","py-7","px-2","absolute","inset-y-0","left-0","transform","-translate-x-full","md:fixed","md:translate-x-0","transition","duration-500","ease-in-out")
    //sidebar.classList.add("bg-blue-800","text-blue-100","w-64","space-y-6","py-7","px-2","absolute","inset-y-0","left-0","transform","-translate-x-full","md:relative","md:translate-x-0","transition","duration-500","ease-in-out")

    const titleHolder = document.createElement('a');
    titleHolder.classList.add("text-white","flex","items-center","space-x-2","px-4");

    const title = document.createElement('span');
    title.classList.add("text-2xl","font-extrabold");
    title.textContent = "Projects";

    const subheading = document.createElement('label');
    subheading.textContent = "Double-click a project to set as new default";
    subheading.classList = "text-xs";

    const projectHolder = document.createElement('nav');
    projectHolder.id = "projectHolder";

    const projectHolderGrid = document.createElement('div');
    projectHolderGrid.classList = "grid grid-cols-10 gap-1";

    sidebar.appendChild(titleHolder);
    titleHolder.appendChild(title);
    sidebar.appendChild(subheading);
    sidebar.appendChild(projectHolder);

    const btnAddProject = document.createElement('button');
    btnAddProject.classList.add("bg-blue-500","hover:bg-blue-400","text-white","text-base","font-bold","py-2","px-4","border-b-4","border-blue-700","hover:border-blue-500","rounded","m-2");
    btnAddProject.textContent = "Add Project +";
    btnAddProject.id = "btnAddProject";
    btnAddProject.addEventListener("click", projectAddForm);

    projectHolder.appendChild(btnAddProject);
    projectHolder.appendChild(projectHolderGrid);

    ProjectModule.projectArray.forEach(projectObj => {
        const btnProjectDelete = document.createElement('button');
        btnProjectDelete.textContent = "X";
        btnProjectDelete.classList = "m-auto";
        btnProjectDelete.value = ProjectModule.projectArray.indexOf(projectObj);
        btnProjectDelete.addEventListener("click", function(){ deleteProject(btnProjectDelete.value) });

        const project = document.createElement('a');
        // add code here to display highlighted favourite project
        if (ProjectModule.projectArray.indexOf(projectObj) == 0) {
            project.classList.add("bg-white", "text-blue-900");
        }
        project.classList.add("block","py-2.5","px-4","hover:bg-blue-700","rounded","transition","duration-500","hover:text-white","col-span-9");
        project.textContent = projectObj.title;
        project.addEventListener("click", function(){ displayToDoCards(project.textContent); });
        project.addEventListener("dblclick", function(){ setFavourite(projectObj); });
        
        projectHolderGrid.appendChild(btnProjectDelete);
        projectHolderGrid.appendChild(project);  
    });

    return sidebar;
}

function setFavourite(project) {

    ProjectModule.projectArray = ProjectModule.projectArray.filter(item => item !== project);
    ProjectModule.projectArray.unshift(project);
    localStorage.setItem('projectArray', JSON.stringify(ProjectModule.projectArray));
    sidebarAndContentHolder.appendChild(sidebarGenerator());

}

function deleteProject(projectIndex) {
    console.log("running deleteProject")
    console.log(projectIndex);

    if (ProjectModule.projectArray.length < 2) {
        alert("You must have at least one project");
        return 0;
    }
    
    if (confirm('Are you sure you want to delete this Project and any To Do items it contains?')) {
        ProjectModule.projectArray.splice(projectIndex, 1);
        sidebarAndContentHolder.appendChild(sidebarGenerator());
        displayToDoCards(ProjectModule.projectArray[0].title);
        localStorage.setItem('projectArray', JSON.stringify(ProjectModule.projectArray));

    } else {
        console.log('Project deletion cancelled');
    }

}

function projectAddForm() {
    console.log("running projectAddForm");
    if (document.getElementById("addProjectInputForm")) {
        document.getElementById("addProjectInputForm").remove();
    }
    else {
        const projectHolder = document.getElementById("projectHolder");
        const btnAddProject = document.getElementById("btnAddProject");

        const addProjectInputForm = document.createElement('div');
        addProjectInputForm.id = "addProjectInputForm"
        addProjectInputForm.classList = "w-full max-w-sm mb-5";

        const addProjectInputHolder = document.createElement('div');
        addProjectInputHolder.classList = "flex items-center border-b border-white py-2";

        const newProjectInput = document.createElement('input');
        newProjectInput.classList = "appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none";
        newProjectInput.type = "text";
        newProjectInput.id = "inputAddProject";
        


        const btnSubmitProject = document.createElement('button');
        btnSubmitProject.classList = "flex-shrink-0 bg-blue-500 hover:bg-blue-400 text-md text-white font-bold py-1 px-2 rounded";
        btnSubmitProject.type = 'button';
        btnSubmitProject.textContent = "+";
        btnSubmitProject.addEventListener("click", createNewProject);

        addProjectInputForm.appendChild(addProjectInputHolder);
        addProjectInputHolder.appendChild(newProjectInput);
        addProjectInputHolder.appendChild(btnSubmitProject);
        
        projectHolder.insertBefore(addProjectInputForm, btnAddProject.nextSibling);

    }
}

function createNewProject() {
    console.log("running createNewProject");
    const newProjectTitle = document.getElementById('inputAddProject').value;
    const newProject = new ProjectModule.Project(newProjectTitle, "",[],false);
    ProjectModule.projectArray.push(newProject);
    localStorage.setItem('projectArray', JSON.stringify(ProjectModule.projectArray));
    sidebarAndContentHolder.appendChild(sidebarGenerator());
    
}

sidebarAndContentHolder.appendChild(sidebarGenerator());







/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUMsb0NBQW9DO0FBQ3BDO0FBQ0EsZ0NBQWdDO0FBQ2hDLHdDQUF3QztBQUN4QyxnQ0FBZ0M7QUFDaEMsc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0QsdUNBQXVDO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0Qsd0NBQXdDO0FBQzlGLHlEQUF5RCwyQkFBMkI7QUFDcEY7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL1RvLURvLUxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY29udGVudEhvbGRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50SG9sZGVyJyk7XHJcbmNvbnN0IHNpZGViYXJBbmRDb250ZW50SG9sZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGViYXJBbmRDb250ZW50SG9sZGVyJyk7XHJcblxyXG5cclxuXHJcbmNvbnN0IFRvRG9JdGVtTW9kdWxlID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgXHJcbiAgICAvLyBjbGFzcyB0byBkZWZpbmUgYSBUb0RvSXRlbVxyXG4gICAgY2xhc3MgVG9Eb0l0ZW0ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlZGF0ZSwgcHJpb3JpdHksIG5vdGVzLCBjb21wbGV0ZWQsIGltYWdlLCBsb2NhdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7IFxyXG4gICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247IC8vb3B0aW9uYWxcclxuICAgICAgICAgICAgdGhpcy5kdWVkYXRlID0gZHVlZGF0ZTsgLy9vcHRpb25hbFxyXG4gICAgICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XHJcbiAgICAgICAgICAgIHRoaXMubm90ZXMgPSBub3RlczsgLy9vcHRpb25hbFxyXG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IGNvbXBsZXRlZDsgLy9vcHRpb25hbFxyXG4gICAgICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2U7IC8vb3B0aW9uYWxcclxuICAgICAgICAgICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uOyAvL29wdGlvbmFsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEZ1bmN0aW9uIHRvIGNyZWF0ZSBhbiBIVE1MIFRvRG8gSXRlbSBDYXJkIGZyb20gYW4gaW5zdGFuY2Ugb2YgdGhlIFRvRG9JdGVtIGNsYXNzXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVUb0RvSXRlbUNhcmQoVG9Eb0l0ZW0pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInJ1bm5pbmcgY3JlYXRlVG9Eb0l0ZW1DYXJkIGZ1bmN0aW9uIGZvciBcIiArIFRvRG9JdGVtLnRpdGxlKTtcclxuXHJcbiAgICAgICAgLy9wcm9wZXJ0aWVzIG9mIGEgVG9Eb0l0ZW07IHRpdGxlLCBkZXNjcmlwdGlvbiwgI2R1ZWRhdGUsICNwcmlvcml0eSwgbm90ZXMsICNjb21wbGV0ZWQsIGltYWdlLCAjbG9jYXRpb25cclxuICAgIFxyXG4gICAgICAgIGNvbnN0IGNhcmRIb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjYXJkSG9sZGVyLmNsYXNzTGlzdC5hZGQoXCJtYXgtdy1bNzAlXVwiLFwibXgtYXV0b1wiLFwicHgtNFwiLCBcIm0tNFwiKTtcclxuICAgIFxyXG4gICAgICAgIGNvbnN0IGNhcmRDb250ZW50Rm9ybWF0dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY2FyZENvbnRlbnRGb3JtYXR0ZXIuY2xhc3NMaXN0LmFkZChcInJlbGF0aXZlXCIsXCJtLTBcIixcInNoYWRvdy1sZ1wiLFwiZmxleFwiLFwiYmctd2hpdGVcIik7XHJcbiAgICBcclxuICAgICAgICBjb25zdCBpbWFnZUhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGltYWdlSG9sZGVyLmNsYXNzTGlzdC5hZGQoXCJmbGV4LW5vLXNocmlua1wiKTtcclxuICAgIFxyXG4gICAgICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LmFkZChcInctNjRcIixcImgtNjRcIixcImJsb2NrXCIsXCJteC1hdXRvXCIpO1xyXG4gICAgICAgIGltYWdlLnNyYyA9IFRvRG9JdGVtLmltYWdlO1xyXG4gICAgXHJcbiAgICAgICAgY29uc3QgY2FyZFRleHRCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNhcmRUZXh0QmxvY2suY2xhc3NMaXN0LmFkZChcImZsZXgtMVwiLFwiY2FyZC1ibG9ja1wiLFwicmVsYXRpdmVcIik7XHJcbiAgICBcclxuICAgICAgICBjb25zdCBjYXJkVGV4dENvbnRlbnRIb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjYXJkVGV4dENvbnRlbnRIb2xkZXIuY2xhc3NMaXN0LmFkZChcInAtNlwiKTtcclxuICAgIFxyXG4gICAgICAgIGNvbnN0IGNhcmRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XHJcbiAgICAgICAgY2FyZFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJmb250LW1lZGl1bVwiLFwidGV4dC0yeGxcIixcIm1iLTNcIik7XHJcbiAgICAgICAgY2FyZFRpdGxlLnRleHRDb250ZW50ID0gVG9Eb0l0ZW0udGl0bGU7XHJcbiAgICBcclxuICAgICAgICBjb25zdCBjYXJkRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgY2FyZERlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJsZWFkaW5nLW5vcm1hbFwiKTtcclxuICAgICAgICBjYXJkRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBUb0RvSXRlbS5kZXNjcmlwdGlvbjtcclxuICAgIFxyXG4gICAgICAgIGNvbnN0IGNhcmROb3RlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBjYXJkTm90ZXMuY2xhc3NMaXN0LmFkZChcInRleHQtc21cIixcInRleHQtZ3JleVwiLFwiYmxvY2tcIixcIm10LTZcIik7XHJcbiAgICAgICAgY2FyZE5vdGVzLnRleHRDb250ZW50ID0gVG9Eb0l0ZW0ubm90ZXM7XHJcbiAgICBcclxuICAgICAgICBjYXJkSG9sZGVyLmFwcGVuZENoaWxkKGNhcmRDb250ZW50Rm9ybWF0dGVyKTtcclxuXHJcbiAgICAgICAgaWYgKFRvRG9JdGVtLmltYWdlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbWFnZSBzb3VyY2UgaXMgXCIgKyBUb0RvSXRlbS5pbWFnZSk7XHJcbiAgICAgICAgICAgIGNhcmRDb250ZW50Rm9ybWF0dGVyLmFwcGVuZENoaWxkKGltYWdlSG9sZGVyKTtcclxuICAgICAgICAgICAgaW1hZ2VIb2xkZXIuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG4gICAgICAgIH0gICAgXHJcblxyXG4gICAgICAgIGNvbnN0IGNoZWNrYm94SG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY2hlY2tib3hIb2xkZXIuY2xhc3NMaXN0ID0gXCJmb3JtLWNoZWNrIGZsZXgganVzdGlmeS1lbmQgcGxhY2UtaXRlbXMtZW5kXCI7XHJcblxyXG4gICAgICAgIGNvbnN0IGNoZWNrYm94TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICAgIGNoZWNrYm94TGFiZWwuY2xhc3NMaXN0ID0gXCJmb3JtLWNoZWNrLWxhYmVsIGlubGluZS1ibG9jayB0ZXh0LWdyYXktODAwIHRleHQtc21cIjtcclxuICAgICAgICBjaGVja2JveExhYmVsLmZvciA9IFwiY2hlY2tcIiArIFRvRG9JdGVtLnRpdGxlO1xyXG4gICAgICAgIGNoZWNrYm94TGFiZWwudGV4dENvbnRlbnQgPSBcIkZpbmlzaGVkICBcIlxyXG4gICAgICAgIGNoZWNrYm94SG9sZGVyLmFwcGVuZENoaWxkKGNoZWNrYm94TGFiZWwpO1xyXG5cclxuICAgICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgY2hlY2tib3guY2xhc3NMaXN0ID0gXCJmb3JtLWNoZWNrLWlucHV0IHRyYW5zaXRpb24gZHVyYXRpb24tMjAwIGN1cnNvci1wb2ludGVyIG0tMVwiO1xyXG4gICAgICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XHJcbiAgICAgICAgY2hlY2tib3guaWQgPSBcImNoZWNrXCIgKyBUb0RvSXRlbS50aXRsZTtcclxuICAgICAgICAvLyBldmVudCBsaXN0ZW5lciB0byBzZXQgY29tcGxldGVkIHZhbHVlIGZvciBUbyBEbyBpdGVtIGFjY29yZGluZyB0byB3aGV0aGVyIGNoZWNrYm94IGlzIHRpY2tlZCBvciBub3RcclxuICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgVG9Eb0l0ZW0uY29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFRvRG9JdGVtLnRpdGxlICsgXCIgY29tcGxldGVkIHN0YXR1czogXCIgKyBUb0RvSXRlbS5jb21wbGV0ZWQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgVG9Eb0l0ZW0uY29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhUb0RvSXRlbS50aXRsZSArIFwiIGNvbXBsZXRlZCBzdGF0dXM6IFwiICsgVG9Eb0l0ZW0uY29tcGxldGVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgY2hlY2tib3hIb2xkZXIuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xyXG5cclxuICAgICAgICBjYXJkQ29udGVudEZvcm1hdHRlci5hcHBlbmRDaGlsZChjYXJkVGV4dEJsb2NrKTtcclxuICAgICAgICBjYXJkVGV4dEJsb2NrLmFwcGVuZENoaWxkKGNhcmRUZXh0Q29udGVudEhvbGRlcik7XHJcbiAgICAgICAgY2FyZFRleHRDb250ZW50SG9sZGVyLmFwcGVuZENoaWxkKGNhcmRUaXRsZSk7XHJcbiAgICAgICAgY2FyZFRleHRDb250ZW50SG9sZGVyLmFwcGVuZENoaWxkKGNhcmREZXNjcmlwdGlvbik7XHJcbiAgICAgICAgY2FyZFRleHRDb250ZW50SG9sZGVyLmFwcGVuZENoaWxkKGNhcmROb3Rlcyk7XHJcbiAgICAgICAgY2FyZENvbnRlbnRGb3JtYXR0ZXIuYXBwZW5kQ2hpbGQoY2hlY2tib3hIb2xkZXIpO1xyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIGNhcmRIb2xkZXI7XHJcbiAgICBcclxuICAgIH07XHJcblxyXG4gICAgXHJcbiAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIFRvRG9JdGVtLFxyXG4gICAgICAgIGNyZWF0ZVRvRG9JdGVtQ2FyZFxyXG4gICAgfVxyXG4gIH0pKCk7XHJcbiAgXHJcblxyXG5jb25zdCBQcm9qZWN0TW9kdWxlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8vY29uc3QgcHJvamVjdEFycmF5ID0gW107XHJcbiAgICBjb25zdCBwcm9qZWN0QXJyYXkgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdEFycmF5XCIpIHx8IFwiW11cIik7XHJcbiAgICBcclxuICAgIC8vIGNsYXNzIHRvIGRlZmluZSBhIFRvRG9JdGVtXHJcbiAgICBjbGFzcyBQcm9qZWN0IHsgLy8gVG8gRG8gaXRlbXMgY2FuIGJlIGFzc2lnbmVkIHRvIGdyb3VwcyBhcyBwcm9qZWN0c1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgdG9Eb0l0ZW1BcnJheSwgZGVmYXVsdFByb2opIHtcclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgIHRoaXMudG9Eb0l0ZW1BcnJheSA9IHRvRG9JdGVtQXJyYXk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFByb2ogPSBkZWZhdWx0UHJvajsgLy8gdHJ1ZS9mYWxzZSAtIG9ubHkgMSBwcm9qZWN0IGNhbiBiZSBzZXQgYXMgZGVmYXVsdFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgc2VsZWN0ZWRQcm9qZWN0SW5kZXggPSAwO1xyXG5cclxuICAgIC8vIGZ1bmN0aW9uIHRvIHNlYXJjaCB0aHJvdWdoIFRvIERvIGl0ZW1zIGluIHNlbGVjdGVkIHByb2plY3QgYW5kIHJlbW92ZSBjb21wbGV0ZWQgb25lcyBcclxuICAgIGZ1bmN0aW9uIGNsZWFudXBDb21wbGV0ZWRUb0RvSXRlbXMocHJvamVjdEluZGV4KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJydW5uaW5nIGNsZWFudXBDb21wbGV0ZWRUb0RvSXRlbXNcIik7XHJcblxyXG4gICAgICAgIC8vIHByb2plY3RBcnJheS5mb3JFYWNoKChwcm9qZWN0LCBwcm9qZWN0SW5kZXgpID0+IHtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJjaGVja2luZyBwcm9qZWN0IGZvciBjb21wbGV0ZWQgVG8gRG8gSXRlbXM6XCIgKyBwcm9qZWN0LnRpdGxlKTtcclxuXHJcbiAgICAgICAgLy8gICAgIHByb2plY3RBcnJheVtwcm9qZWN0SW5kZXhdLnRvRG9JdGVtQXJyYXkuZm9yRWFjaCh0b0RvSXRlbSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcImNoZWNraW5nIGZvciBjb21wbGV0aW9uOlwiICsgdG9Eb0l0ZW0udGl0bGUpO1xyXG4gICAgXHJcbiAgICAgICAgLy8gICAgICAgICBpZiAodG9Eb0l0ZW0uY29tcGxldGVkID09IHRydWUpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbXBsZXRlZCBUb0RvIEl0ZW0gZm91bmQ6IFwiICsgdG9Eb0l0ZW0udGl0bGUpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW5kZXhvZiB2YWx1ZTogXCIgKyBwcm9qZWN0QXJyYXlbcHJvamVjdEluZGV4XS50b0RvSXRlbUFycmF5LmluZGV4T2YodG9Eb0l0ZW0pKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBwcm9qZWN0QXJyYXlbcHJvamVjdEluZGV4XS50b0RvSXRlbUFycmF5LnNwbGljZShwcm9qZWN0QXJyYXlbcHJvamVjdEluZGV4XS50b0RvSXRlbUFycmF5LmluZGV4T2YodG9Eb0l0ZW0pLCAxKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdEFycmF5JywgSlNPTi5zdHJpbmdpZnkocHJvamVjdEFycmF5KSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICBjb25zdCB1bmNvbXBsZXRlZEl0ZW1zID0gcHJvamVjdEFycmF5W3Byb2plY3RJbmRleF0udG9Eb0l0ZW1BcnJheS5maWx0ZXIodG9Eb0l0ZW0gPT4gdG9Eb0l0ZW0uY29tcGxldGVkID09IGZhbHNlKTtcclxuICAgICAgICBwcm9qZWN0QXJyYXlbcHJvamVjdEluZGV4XS50b0RvSXRlbUFycmF5ID0gdW5jb21wbGV0ZWRJdGVtcztcclxuXHJcblxyXG4gICAgICAgIC8vIHByb2plY3RBcnJheVtwcm9qZWN0SW5kZXhdLnRvRG9JdGVtQXJyYXkuZm9yRWFjaCh0b0RvSXRlbSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiY2hlY2tpbmcgZm9yIGNvbXBsZXRpb246XCIgKyB0b0RvSXRlbS50aXRsZSk7XHJcblxyXG4gICAgICAgIC8vICAgICBpZiAodG9Eb0l0ZW0uY29tcGxldGVkID09IHRydWUpIHtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiY29tcGxldGVkIFRvRG8gSXRlbSBmb3VuZDogXCIgKyB0b0RvSXRlbS50aXRsZSk7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcImluZGV4b2YgdmFsdWU6IFwiICsgcHJvamVjdEFycmF5W3Byb2plY3RJbmRleF0udG9Eb0l0ZW1BcnJheS5pbmRleE9mKHRvRG9JdGVtKSk7XHJcbiAgICAgICAgLy8gICAgICAgICBwcm9qZWN0QXJyYXlbcHJvamVjdEluZGV4XS50b0RvSXRlbUFycmF5LnNwbGljZShwcm9qZWN0QXJyYXlbcHJvamVjdEluZGV4XS50b0RvSXRlbUFycmF5LmluZGV4T2YodG9Eb0l0ZW0pLCAxKTtcclxuICAgICAgICAvLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0QXJyYXknLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0QXJyYXkpKTtcclxuICAgICAgICAvLyAgICAgfVxyXG5cclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAvL2xvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0QXJyYXknLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0QXJyYXkpKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgUHJvamVjdCxcclxuICAgICAgICBwcm9qZWN0QXJyYXksXHJcbiAgICAgICAgc2VsZWN0ZWRQcm9qZWN0SW5kZXgsXHJcbiAgICAgICAgY2xlYW51cENvbXBsZXRlZFRvRG9JdGVtc1xyXG4gICAgfVxyXG4gIH0pKCk7XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUluaXRpYWxQcm9qZWN0KCkge1xyXG5cclxuICAgIGxldCBUb0RvUHJvamVjdCA9IG5ldyBQcm9qZWN0TW9kdWxlLlByb2plY3QoXCJUb0RvIExpc3QgUHJvamVjdFwiLCBcIktlZXAgbm90ZXMgaGVyZSBmb3IgdGhlIFRvRG8gbGlzdCB3ZWJzaXRlIHByb2plY3RcIiwgW10sIHRydWUpO1xyXG4gICAgUHJvamVjdE1vZHVsZS5wcm9qZWN0QXJyYXkucHVzaChUb0RvUHJvamVjdCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIkxpc3Qgb2YgUHJvamVjdHM7IFwiICsgUHJvamVjdE1vZHVsZS5wcm9qZWN0QXJyYXkpO1xyXG5cclxuICAgIGxldCBGaXJzdFRvRG9JdGVtID0gbmV3IFRvRG9JdGVtTW9kdWxlLlRvRG9JdGVtKFwiTWFrZSBhbiBpdGVtXCIsIFwiQ3JlYXRlIGEgdG9kbyBsaXN0IGl0ZW0gdG8gdGVzdCBmdW5jdGlvbmFsaXR5XCIsIERhdGUubm93KCksIFwiSGlnaFwiLCBcIkFkZCBhbnkgYWRkaXRpb25hbCBub3RlcyBoZXJlXCIsIGZhbHNlLCBudWxsLCBudWxsKTtcclxuXHJcbiAgICBUb0RvUHJvamVjdC50b0RvSXRlbUFycmF5LnB1c2goRmlyc3RUb0RvSXRlbSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coVG9Eb1Byb2plY3QpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RBcnJheScsIEpTT04uc3RyaW5naWZ5KFByb2plY3RNb2R1bGUucHJvamVjdEFycmF5KSk7XHJcblxyXG59XHJcblxyXG4vLyBjcmVhdGUgYW4gaW5pdGlhbCBwcm9qZWN0IGFuZCB0byBkbyBpdGVtIC0gVE8gQkUgUkVNT1ZFRFxyXG5cclxuaWYgKFByb2plY3RNb2R1bGUucHJvamVjdEFycmF5Lmxlbmd0aCA8IDEpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiTm8gcHJvamVjdHMgZm91bmQsIHJ1bm5pbmcgY3JlYXRlSW5pdGlhbFByb2plY3RcIik7XHJcbiAgICBjcmVhdGVJbml0aWFsUHJvamVjdCgpO1xyXG59XHJcblxyXG5cclxuXHJcbi8vIGJ1dHRvbiB0byBhZGQgYSBuZXcgVG9EbyBJdGVtXHJcbmNvbnN0IGFkZFRvRG9JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbmFkZFRvRG9JdGVtLmNsYXNzTGlzdC5hZGQoXCJiZy1ibHVlLTUwMFwiLFwiaG92ZXI6YmctYmx1ZS00MDBcIixcInRleHQtd2hpdGVcIixcInRleHQtYmFzZVwiLFwiZm9udC1ib2xkXCIsXCJweS0yXCIsXCJweC00XCIsXCJib3JkZXItYi00XCIsXCJib3JkZXItYmx1ZS03MDBcIixcImhvdmVyOmJvcmRlci1ibHVlLTUwMFwiLFwicm91bmRlZFwiLFwibS0xMFwiLFwibS0xMFwiKTtcclxuYWRkVG9Eb0l0ZW0udGV4dENvbnRlbnQgPSBcIkFkZCBJdGVtICtcIjtcclxuYWRkVG9Eb0l0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZG9BZGRlckZvcm0pO1xyXG5cclxuY29udGVudEhvbGRlci5hcHBlbmRDaGlsZChhZGRUb0RvSXRlbSk7XHJcblxyXG5cclxuXHJcbi8vIGZ1bmN0aW9uIHRvIHNob3cgZGlhbG9nIGZvciBhZGRpbmcgYSBUb0RvSXRlbVxyXG5cclxuZnVuY3Rpb24gdG9kb0FkZGVyRm9ybSgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwicnVubmluZyB0b2RvQWRkZXJGb3JtXCIpO1xyXG5cclxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kb0FkZGVyRm9ybUhvbGRlcicpKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG9BZGRlckZvcm1Ib2xkZXInKS5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBlbHNlIHtcclxuXHJcbiAgICBjb25zdCBmb3JtSG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBmb3JtSG9sZGVyLmlkID0gXCJ0b2RvQWRkZXJGb3JtSG9sZGVyXCI7XHJcbiAgICBmb3JtSG9sZGVyLmNsYXNzTGlzdC5hZGQoXCJiZy1ncmV5LWxpZ2h0ZXJcIixcIm0tMTBcIixcImZsZXhcIixcImZsZXgtY29sXCIpO1xyXG5cclxuICAgIGNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGZvcm1Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbnRhaW5lclwiLFwibWF4LXctZnVsbFwiLFwibXgtYXV0b1wiLFwiZmxleC0xXCIsXCJmbGV4XCIsXCJmbGV4LWNvbFwiLFwiaXRlbXMtY2VudGVyXCIsXCJqdXN0aWZ5LWNlbnRlclwiLFwicHgtMlwiKTtcclxuXHJcbiAgICBjb25zdCBmb3JtRnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGZvcm1GcmFtZS5jbGFzc0xpc3QuYWRkKFwiYmctd2hpdGVcIixcInB4LTZcIixcInB5LThcIixcInJvdW5kZWRcIixcInNoYWRvdy1tZFwiLFwidGV4dC1ibGFja1wiLFwidy1mdWxsXCIsXCJ0ZXh0LWxnXCIpO1xyXG5cclxuICAgIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xyXG4gICAgaGVhZGluZy5jbGFzc0xpc3QuYWRkKFwibWItOFwiLFwidGV4dC0zeGxcIixcInRleHQtY2VudGVyXCIpO1xyXG4gICAgaGVhZGluZy50ZXh0Q29udGVudCA9IFwiQWRkIGEgVG8tZG8gTm90ZVwiO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgdGl0bGVJbnB1dC5jbGFzc0xpc3QuYWRkKFwiYmxvY2tcIixcImJvcmRlclwiLFwiYm9yZGVyLWdyZXktbGlnaHRcIixcInctZnVsbFwiLFwicC0xXCIsXCJyb3VuZGVkXCIsXCJtYi00XCIpO1xyXG4gICAgdGl0bGVJbnB1dC50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICB0aXRsZUlucHV0LnBsYWNlaG9sZGVyID0gXCJUaXRsZVwiO1xyXG4gICAgdGl0bGVJbnB1dC5pZCA9IFwidGl0bGVJbnB1dFwiO1xyXG5cclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgZGVzY3JpcHRpb25JbnB1dC5jbGFzc0xpc3QuYWRkKFwiYmxvY2tcIixcImJvcmRlclwiLFwiYm9yZGVyLWdyZXktbGlnaHRcIixcInctZnVsbFwiLFwicC0xXCIsXCJyb3VuZGVkXCIsXCJtYi00XCIpO1xyXG4gICAgZGVzY3JpcHRpb25JbnB1dC50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICBkZXNjcmlwdGlvbklucHV0LnBsYWNlaG9sZGVyID0gXCJEZXNjcmlwdGlvblwiO1xyXG4gICAgZGVzY3JpcHRpb25JbnB1dC5pZCA9IFwiZGVzY3JpcHRpb25JbnB1dFwiO1xyXG5cclxuICAgIGNvbnN0IG5vdGVzSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgbm90ZXNJbnB1dC5jbGFzc0xpc3QuYWRkKFwiYmxvY2tcIixcImJvcmRlclwiLFwiYm9yZGVyLWdyZXktbGlnaHRcIixcInctZnVsbFwiLFwicC0xXCIsXCJyb3VuZGVkXCIsXCJtYi00XCIpO1xyXG4gICAgbm90ZXNJbnB1dC50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICBub3Rlc0lucHV0LnBsYWNlaG9sZGVyID0gXCJOb3Rlc1wiO1xyXG4gICAgbm90ZXNJbnB1dC5pZCA9IFwibm90ZXNJbnB1dFwiO1xyXG5cclxuICAgIGNvbnN0IGJ0bkFkZE5vdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGJ0bkFkZE5vdGUuY2xhc3NMaXN0LmFkZChcInRleHQtbGdcIixcInctMzJcIixcInRleHQtY2VudGVyXCIsXCJweS0zXCIsXCJyb3VuZGVkXCIsXCJiZy1ncmVlbi02MDBcIixcInRleHQtd2hpdGVcIixcImhvdmVyOmJnLWdyZWVuLTgwMFwiLFwiZm9jdXM6b3V0bGluZS1ub25lXCIsXCJteS0xXCIpO1xyXG4gICAgYnRuQWRkTm90ZS50ZXh0Q29udGVudCA9IFwiQWRkICtcIjtcclxuICAgIGJ0bkFkZE5vdGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZG9BZGRlcik7XHJcblxyXG4gICAgY29udGVudEhvbGRlci5pbnNlcnRCZWZvcmUoZm9ybUhvbGRlciwgYWRkVG9Eb0l0ZW0ubmV4dFNpYmxpbmcpO1xyXG5cclxuICAgIC8vYWRkVG9Eb0l0ZW0uYXBwZW5kQ2hpbGQoZm9ybUhvbGRlcik7XHJcbiAgICBmb3JtSG9sZGVyLmFwcGVuZENoaWxkKGZvcm1Db250YWluZXIpO1xyXG4gICAgZm9ybUNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtRnJhbWUpO1xyXG4gICAgZm9ybUZyYW1lLmFwcGVuZENoaWxkKGhlYWRpbmcpO1xyXG4gICAgZm9ybUZyYW1lLmFwcGVuZENoaWxkKHRpdGxlSW5wdXQpO1xyXG4gICAgZm9ybUZyYW1lLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXQpO1xyXG4gICAgZm9ybUZyYW1lLmFwcGVuZENoaWxkKG5vdGVzSW5wdXQpO1xyXG4gICAgZm9ybUZyYW1lLmFwcGVuZENoaWxkKGJ0bkFkZE5vdGUpO1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZG9BZGRlcigpIHtcclxuICAgIGNvbnNvbGUubG9nKFwicnVubmluZyB0b2RvQWRkZXJcIik7XHJcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0bGVJbnB1dFwiKS52YWx1ZTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvbklucHV0XCIpLnZhbHVlO1xyXG4gICAgY29uc3Qgbm90ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5vdGVzSW5wdXRcIikudmFsdWU7XHJcblxyXG4gICAgLy9Ub0RvSXRlbSh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZWRhdGUsIHByaW9yaXR5LCBub3RlcywgY29tcGxldGVkLCBpbWFnZSwgbG9jYXRpb24pXHJcbiAgICBjb25zdCBuZXdUb0RvID0gbmV3IFRvRG9JdGVtTW9kdWxlLlRvRG9JdGVtKHRpdGxlLCBkZXNjcmlwdGlvbiwgRGF0ZS5ub3coKSwgXCJIaWdoXCIsIG5vdGVzLCBmYWxzZSwgbnVsbCwgbnVsbCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlByb2plY3QgQXJyYXk6IFwiICsgUHJvamVjdE1vZHVsZS5wcm9qZWN0QXJyYXkpO1xyXG4gICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBwcm9qZWN0IGFycmF5OiBcIiArIFByb2plY3RNb2R1bGUuc2VsZWN0ZWRQcm9qZWN0SW5kZXgpO1xyXG4gICAgUHJvamVjdE1vZHVsZS5wcm9qZWN0QXJyYXlbUHJvamVjdE1vZHVsZS5zZWxlY3RlZFByb2plY3RJbmRleF0udG9Eb0l0ZW1BcnJheS5wdXNoKG5ld1RvRG8pO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG9BZGRlckZvcm1Ib2xkZXInKS5yZW1vdmUoKVxyXG4gICAgZGlzcGxheVRvRG9DYXJkcyhQcm9qZWN0TW9kdWxlLnByb2plY3RBcnJheVtQcm9qZWN0TW9kdWxlLnNlbGVjdGVkUHJvamVjdEluZGV4XS50aXRsZSk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdEFycmF5JywgSlNPTi5zdHJpbmdpZnkoUHJvamVjdE1vZHVsZS5wcm9qZWN0QXJyYXkpKTtcclxufVxyXG5cclxuXHJcblxyXG4vLyh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZWRhdGUsIHByaW9yaXR5LCBub3RlcywgY29tcGxldGVkLCBpbWFnZSwgbG9jYXRpb24pXHJcblxyXG5cclxuLy8gVG9EbyBJdGVtIENhcmRcclxuXHJcbi8vY29udGVudEhvbGRlci5hcHBlbmRDaGlsZChUb0RvSXRlbU1vZHVsZS5jcmVhdGVUb0RvSXRlbUNhcmQoRmlyc3RUb0RvSXRlbSkpO1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5VG9Eb0NhcmRzKGl0ZW0pIHtcclxuICAgIGNvbnNvbGUubG9nKFwicnVubmluZyBkaXNwbGF5VG9Eb0NhcmRzXCIpO1xyXG5cclxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FyZERpc3BsYXknKSkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJkRGlzcGxheScpLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNhcmREaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjYXJkRGlzcGxheS5pZCA9IFwiY2FyZERpc3BsYXlcIjtcclxuICAgIGNvbnRlbnRIb2xkZXIuYXBwZW5kQ2hpbGQoY2FyZERpc3BsYXkpO1xyXG5cclxuICAgIGNvbnNvbGUudGFibGUoaXRlbSk7XHJcbiAgICBcclxuICAgIGlmIChpdGVtICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIFByb2plY3RNb2R1bGUuc2VsZWN0ZWRQcm9qZWN0SW5kZXggPSBQcm9qZWN0TW9kdWxlLnByb2plY3RBcnJheS5maW5kSW5kZXgocHJvamVjdCA9PiBwcm9qZWN0LnRpdGxlID09PSBpdGVtKTtcclxuICAgICAgICBQcm9qZWN0TW9kdWxlLmNsZWFudXBDb21wbGV0ZWRUb0RvSXRlbXMoUHJvamVjdE1vZHVsZS5zZWxlY3RlZFByb2plY3RJbmRleCk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0SGVhZGVyXCIpLnRleHRDb250ZW50ID0gaXRlbTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHNlbGVjdGVkUHJvamVjdCA9IFByb2plY3RNb2R1bGUucHJvamVjdEFycmF5W1Byb2plY3RNb2R1bGUuc2VsZWN0ZWRQcm9qZWN0SW5kZXhdO1xyXG4gICAgY29uc29sZS5sb2coXCJzZWxlY3RlZCBwcm9qZWN0IGlzOiBcIiArIHNlbGVjdGVkUHJvamVjdCk7XHJcblxyXG4gICAgaWYgKHNlbGVjdGVkUHJvamVjdCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImxvYWRpbmcgZGVmYXVsdCBwcm9qZWN0XCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidHJpZWQgdG8gZ2V0IFwiICsgUHJvamVjdE1vZHVsZS5wcm9qZWN0QXJyYXkuaW5kZXhPZihpdGVtKSk7XHJcbiAgICAgICAgY29uc29sZS50YWJsZShQcm9qZWN0TW9kdWxlLnByb2plY3RBcnJheSk7XHJcbiAgICAgICAgc2VsZWN0ZWRQcm9qZWN0ID0gUHJvamVjdE1vZHVsZS5wcm9qZWN0QXJyYXlbMF07XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0ZWRQcm9qZWN0LnRvRG9JdGVtQXJyYXkuZm9yRWFjaCh0b0RvSXRlbSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV3SXRlbSA9IFRvRG9JdGVtTW9kdWxlLmNyZWF0ZVRvRG9JdGVtQ2FyZCh0b0RvSXRlbSk7XHJcbiAgICAgICAgY2FyZERpc3BsYXkuYXBwZW5kQ2hpbGQobmV3SXRlbSk7XHJcbiAgICB9KTtcclxuXHJcbn07XHJcblxyXG5kaXNwbGF5VG9Eb0NhcmRzKCk7XHJcblxyXG5cclxuLy8gU2lkZWJhclxyXG5mdW5jdGlvbiBzaWRlYmFyR2VuZXJhdG9yKCl7XHJcbiAgICBjb25zb2xlLmxvZyhcInJ1bm5pbmcgc2lkZWJhckdlbmVyYXRvclwiKTtcclxuXHJcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWRlYmFyXCIpKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWRlYmFyXCIpLnJlbW92ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBzaWRlYmFyLmlkID0gXCJzaWRlYmFyXCI7XHJcbiAgICBzaWRlYmFyLmNsYXNzTGlzdC5hZGQoXCJiZy1ibHVlLTgwMFwiLFwidGV4dC1ibHVlLTEwMFwiLFwidy02NFwiLFwic3BhY2UteS02XCIsXCJweS03XCIsXCJweC0yXCIsXCJhYnNvbHV0ZVwiLFwiaW5zZXQteS0wXCIsXCJsZWZ0LTBcIixcInRyYW5zZm9ybVwiLFwiLXRyYW5zbGF0ZS14LWZ1bGxcIixcIm1kOmZpeGVkXCIsXCJtZDp0cmFuc2xhdGUteC0wXCIsXCJ0cmFuc2l0aW9uXCIsXCJkdXJhdGlvbi01MDBcIixcImVhc2UtaW4tb3V0XCIpXHJcbiAgICAvL3NpZGViYXIuY2xhc3NMaXN0LmFkZChcImJnLWJsdWUtODAwXCIsXCJ0ZXh0LWJsdWUtMTAwXCIsXCJ3LTY0XCIsXCJzcGFjZS15LTZcIixcInB5LTdcIixcInB4LTJcIixcImFic29sdXRlXCIsXCJpbnNldC15LTBcIixcImxlZnQtMFwiLFwidHJhbnNmb3JtXCIsXCItdHJhbnNsYXRlLXgtZnVsbFwiLFwibWQ6cmVsYXRpdmVcIixcIm1kOnRyYW5zbGF0ZS14LTBcIixcInRyYW5zaXRpb25cIixcImR1cmF0aW9uLTUwMFwiLFwiZWFzZS1pbi1vdXRcIilcclxuXHJcbiAgICBjb25zdCB0aXRsZUhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgIHRpdGxlSG9sZGVyLmNsYXNzTGlzdC5hZGQoXCJ0ZXh0LXdoaXRlXCIsXCJmbGV4XCIsXCJpdGVtcy1jZW50ZXJcIixcInNwYWNlLXgtMlwiLFwicHgtNFwiKTtcclxuXHJcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0ZXh0LTJ4bFwiLFwiZm9udC1leHRyYWJvbGRcIik7XHJcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiUHJvamVjdHNcIjtcclxuXHJcbiAgICBjb25zdCBzdWJoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgIHN1YmhlYWRpbmcudGV4dENvbnRlbnQgPSBcIkRvdWJsZS1jbGljayBhIHByb2plY3QgdG8gc2V0IGFzIG5ldyBkZWZhdWx0XCI7XHJcbiAgICBzdWJoZWFkaW5nLmNsYXNzTGlzdCA9IFwidGV4dC14c1wiO1xyXG5cclxuICAgIGNvbnN0IHByb2plY3RIb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcclxuICAgIHByb2plY3RIb2xkZXIuaWQgPSBcInByb2plY3RIb2xkZXJcIjtcclxuXHJcbiAgICBjb25zdCBwcm9qZWN0SG9sZGVyR3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgcHJvamVjdEhvbGRlckdyaWQuY2xhc3NMaXN0ID0gXCJncmlkIGdyaWQtY29scy0xMCBnYXAtMVwiO1xyXG5cclxuICAgIHNpZGViYXIuYXBwZW5kQ2hpbGQodGl0bGVIb2xkZXIpO1xyXG4gICAgdGl0bGVIb2xkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgc2lkZWJhci5hcHBlbmRDaGlsZChzdWJoZWFkaW5nKTtcclxuICAgIHNpZGViYXIuYXBwZW5kQ2hpbGQocHJvamVjdEhvbGRlcik7XHJcblxyXG4gICAgY29uc3QgYnRuQWRkUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgYnRuQWRkUHJvamVjdC5jbGFzc0xpc3QuYWRkKFwiYmctYmx1ZS01MDBcIixcImhvdmVyOmJnLWJsdWUtNDAwXCIsXCJ0ZXh0LXdoaXRlXCIsXCJ0ZXh0LWJhc2VcIixcImZvbnQtYm9sZFwiLFwicHktMlwiLFwicHgtNFwiLFwiYm9yZGVyLWItNFwiLFwiYm9yZGVyLWJsdWUtNzAwXCIsXCJob3Zlcjpib3JkZXItYmx1ZS01MDBcIixcInJvdW5kZWRcIixcIm0tMlwiKTtcclxuICAgIGJ0bkFkZFByb2plY3QudGV4dENvbnRlbnQgPSBcIkFkZCBQcm9qZWN0ICtcIjtcclxuICAgIGJ0bkFkZFByb2plY3QuaWQgPSBcImJ0bkFkZFByb2plY3RcIjtcclxuICAgIGJ0bkFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2plY3RBZGRGb3JtKTtcclxuXHJcbiAgICBwcm9qZWN0SG9sZGVyLmFwcGVuZENoaWxkKGJ0bkFkZFByb2plY3QpO1xyXG4gICAgcHJvamVjdEhvbGRlci5hcHBlbmRDaGlsZChwcm9qZWN0SG9sZGVyR3JpZCk7XHJcblxyXG4gICAgUHJvamVjdE1vZHVsZS5wcm9qZWN0QXJyYXkuZm9yRWFjaChwcm9qZWN0T2JqID0+IHtcclxuICAgICAgICBjb25zdCBidG5Qcm9qZWN0RGVsZXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgYnRuUHJvamVjdERlbGV0ZS50ZXh0Q29udGVudCA9IFwiWFwiO1xyXG4gICAgICAgIGJ0blByb2plY3REZWxldGUuY2xhc3NMaXN0ID0gXCJtLWF1dG9cIjtcclxuICAgICAgICBidG5Qcm9qZWN0RGVsZXRlLnZhbHVlID0gUHJvamVjdE1vZHVsZS5wcm9qZWN0QXJyYXkuaW5kZXhPZihwcm9qZWN0T2JqKTtcclxuICAgICAgICBidG5Qcm9qZWN0RGVsZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpeyBkZWxldGVQcm9qZWN0KGJ0blByb2plY3REZWxldGUudmFsdWUpIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgIC8vIGFkZCBjb2RlIGhlcmUgdG8gZGlzcGxheSBoaWdobGlnaHRlZCBmYXZvdXJpdGUgcHJvamVjdFxyXG4gICAgICAgIGlmIChQcm9qZWN0TW9kdWxlLnByb2plY3RBcnJheS5pbmRleE9mKHByb2plY3RPYmopID09IDApIHtcclxuICAgICAgICAgICAgcHJvamVjdC5jbGFzc0xpc3QuYWRkKFwiYmctd2hpdGVcIiwgXCJ0ZXh0LWJsdWUtOTAwXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJibG9ja1wiLFwicHktMi41XCIsXCJweC00XCIsXCJob3ZlcjpiZy1ibHVlLTcwMFwiLFwicm91bmRlZFwiLFwidHJhbnNpdGlvblwiLFwiZHVyYXRpb24tNTAwXCIsXCJob3Zlcjp0ZXh0LXdoaXRlXCIsXCJjb2wtc3Bhbi05XCIpO1xyXG4gICAgICAgIHByb2plY3QudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqLnRpdGxlO1xyXG4gICAgICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7IGRpc3BsYXlUb0RvQ2FyZHMocHJvamVjdC50ZXh0Q29udGVudCk7IH0pO1xyXG4gICAgICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImRibGNsaWNrXCIsIGZ1bmN0aW9uKCl7IHNldEZhdm91cml0ZShwcm9qZWN0T2JqKTsgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJvamVjdEhvbGRlckdyaWQuYXBwZW5kQ2hpbGQoYnRuUHJvamVjdERlbGV0ZSk7XHJcbiAgICAgICAgcHJvamVjdEhvbGRlckdyaWQuYXBwZW5kQ2hpbGQocHJvamVjdCk7ICBcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBzaWRlYmFyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRGYXZvdXJpdGUocHJvamVjdCkge1xyXG5cclxuICAgIFByb2plY3RNb2R1bGUucHJvamVjdEFycmF5ID0gUHJvamVjdE1vZHVsZS5wcm9qZWN0QXJyYXkuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gcHJvamVjdCk7XHJcbiAgICBQcm9qZWN0TW9kdWxlLnByb2plY3RBcnJheS51bnNoaWZ0KHByb2plY3QpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RBcnJheScsIEpTT04uc3RyaW5naWZ5KFByb2plY3RNb2R1bGUucHJvamVjdEFycmF5KSk7XHJcbiAgICBzaWRlYmFyQW5kQ29udGVudEhvbGRlci5hcHBlbmRDaGlsZChzaWRlYmFyR2VuZXJhdG9yKCkpO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdChwcm9qZWN0SW5kZXgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwicnVubmluZyBkZWxldGVQcm9qZWN0XCIpXHJcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0SW5kZXgpO1xyXG5cclxuICAgIGlmIChQcm9qZWN0TW9kdWxlLnByb2plY3RBcnJheS5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgYWxlcnQoXCJZb3UgbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBwcm9qZWN0XCIpO1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAoY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIFByb2plY3QgYW5kIGFueSBUbyBEbyBpdGVtcyBpdCBjb250YWlucz8nKSkge1xyXG4gICAgICAgIFByb2plY3RNb2R1bGUucHJvamVjdEFycmF5LnNwbGljZShwcm9qZWN0SW5kZXgsIDEpO1xyXG4gICAgICAgIHNpZGViYXJBbmRDb250ZW50SG9sZGVyLmFwcGVuZENoaWxkKHNpZGViYXJHZW5lcmF0b3IoKSk7XHJcbiAgICAgICAgZGlzcGxheVRvRG9DYXJkcyhQcm9qZWN0TW9kdWxlLnByb2plY3RBcnJheVswXS50aXRsZSk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RBcnJheScsIEpTT04uc3RyaW5naWZ5KFByb2plY3RNb2R1bGUucHJvamVjdEFycmF5KSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnUHJvamVjdCBkZWxldGlvbiBjYW5jZWxsZWQnKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2plY3RBZGRGb3JtKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJydW5uaW5nIHByb2plY3RBZGRGb3JtXCIpO1xyXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkUHJvamVjdElucHV0Rm9ybVwiKSkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkUHJvamVjdElucHV0Rm9ybVwiKS5yZW1vdmUoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RIb2xkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RIb2xkZXJcIik7XHJcbiAgICAgICAgY29uc3QgYnRuQWRkUHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuQWRkUHJvamVjdFwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgYWRkUHJvamVjdElucHV0Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGFkZFByb2plY3RJbnB1dEZvcm0uaWQgPSBcImFkZFByb2plY3RJbnB1dEZvcm1cIlxyXG4gICAgICAgIGFkZFByb2plY3RJbnB1dEZvcm0uY2xhc3NMaXN0ID0gXCJ3LWZ1bGwgbWF4LXctc20gbWItNVwiO1xyXG5cclxuICAgICAgICBjb25zdCBhZGRQcm9qZWN0SW5wdXRIb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBhZGRQcm9qZWN0SW5wdXRIb2xkZXIuY2xhc3NMaXN0ID0gXCJmbGV4IGl0ZW1zLWNlbnRlciBib3JkZXItYiBib3JkZXItd2hpdGUgcHktMlwiO1xyXG5cclxuICAgICAgICBjb25zdCBuZXdQcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgIG5ld1Byb2plY3RJbnB1dC5jbGFzc0xpc3QgPSBcImFwcGVhcmFuY2Utbm9uZSBiZy10cmFuc3BhcmVudCBib3JkZXItbm9uZSB3LWZ1bGwgdGV4dC13aGl0ZSBtci0zIHB5LTEgcHgtMiBsZWFkaW5nLXRpZ2h0IGZvY3VzOm91dGxpbmUtbm9uZVwiO1xyXG4gICAgICAgIG5ld1Byb2plY3RJbnB1dC50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICAgICAgbmV3UHJvamVjdElucHV0LmlkID0gXCJpbnB1dEFkZFByb2plY3RcIjtcclxuICAgICAgICBcclxuXHJcblxyXG4gICAgICAgIGNvbnN0IGJ0blN1Ym1pdFByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBidG5TdWJtaXRQcm9qZWN0LmNsYXNzTGlzdCA9IFwiZmxleC1zaHJpbmstMCBiZy1ibHVlLTUwMCBob3ZlcjpiZy1ibHVlLTQwMCB0ZXh0LW1kIHRleHQtd2hpdGUgZm9udC1ib2xkIHB5LTEgcHgtMiByb3VuZGVkXCI7XHJcbiAgICAgICAgYnRuU3VibWl0UHJvamVjdC50eXBlID0gJ2J1dHRvbic7XHJcbiAgICAgICAgYnRuU3VibWl0UHJvamVjdC50ZXh0Q29udGVudCA9IFwiK1wiO1xyXG4gICAgICAgIGJ0blN1Ym1pdFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNyZWF0ZU5ld1Byb2plY3QpO1xyXG5cclxuICAgICAgICBhZGRQcm9qZWN0SW5wdXRGb3JtLmFwcGVuZENoaWxkKGFkZFByb2plY3RJbnB1dEhvbGRlcik7XHJcbiAgICAgICAgYWRkUHJvamVjdElucHV0SG9sZGVyLmFwcGVuZENoaWxkKG5ld1Byb2plY3RJbnB1dCk7XHJcbiAgICAgICAgYWRkUHJvamVjdElucHV0SG9sZGVyLmFwcGVuZENoaWxkKGJ0blN1Ym1pdFByb2plY3QpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByb2plY3RIb2xkZXIuaW5zZXJ0QmVmb3JlKGFkZFByb2plY3RJbnB1dEZvcm0sIGJ0bkFkZFByb2plY3QubmV4dFNpYmxpbmcpO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTmV3UHJvamVjdCgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwicnVubmluZyBjcmVhdGVOZXdQcm9qZWN0XCIpO1xyXG4gICAgY29uc3QgbmV3UHJvamVjdFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0QWRkUHJvamVjdCcpLnZhbHVlO1xyXG4gICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0TW9kdWxlLlByb2plY3QobmV3UHJvamVjdFRpdGxlLCBcIlwiLFtdLGZhbHNlKTtcclxuICAgIFByb2plY3RNb2R1bGUucHJvamVjdEFycmF5LnB1c2gobmV3UHJvamVjdCk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdEFycmF5JywgSlNPTi5zdHJpbmdpZnkoUHJvamVjdE1vZHVsZS5wcm9qZWN0QXJyYXkpKTtcclxuICAgIHNpZGViYXJBbmRDb250ZW50SG9sZGVyLmFwcGVuZENoaWxkKHNpZGViYXJHZW5lcmF0b3IoKSk7XHJcbiAgICBcclxufVxyXG5cclxuc2lkZWJhckFuZENvbnRlbnRIb2xkZXIuYXBwZW5kQ2hpbGQoc2lkZWJhckdlbmVyYXRvcigpKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
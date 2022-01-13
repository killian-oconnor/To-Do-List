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

        const uncompletedItems = projectArray[projectIndex].toDoItemArray.filter(toDoItem => toDoItem.completed == false);
        projectArray[projectIndex].toDoItemArray = uncompletedItems;
        localStorage.setItem('projectArray', JSON.stringify(projectArray));

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







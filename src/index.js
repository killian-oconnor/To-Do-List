const contentHolder = document.getElementById('contentHolder');
const sidebarAndContentHolder = document.getElementById('sidebarAndContentHolder');

const ToDoItemModule = (function() {
    
    // class to define a ToDoItem
    class ToDoItem {
        constructor(title, description, duedate, priority, notes, checklist, image, location) {
            this.title = title; 
            this.description = description; //optional
            this.duedate = duedate; //optional
            this.priority = priority;
            this.notes = notes; //optional
            this.checklist = checklist; //optional
            this.image = image; //optional
            this.location = location; //optional
        }
    }

    // Function to create an HTML ToDo Item Card from an instance of the ToDoItem class
    function createToDoItemCard(ToDoItem) {

        //properties of a ToDoItem; title, description, #duedate, #priority, notes, #checklist, image, #location
    
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
        cardContentFormatter.appendChild(cardTextBlock);
        cardTextBlock.appendChild(cardTextContentHolder);
        cardTextContentHolder.appendChild(cardTitle);
        cardTextContentHolder.appendChild(cardDescription);
        cardTextContentHolder.appendChild(cardNotes);
    
        return cardHolder;
    
    };

    
  
    return {
        ToDoItem,
        createToDoItemCard
    }
  })();
  

const ProjectModule = (function() {

    const projectArray = [];
    
    // class to define a ToDoItem
    class Project { // To Do items can be assigned to groups as projects
        constructor(title, description, toDoItemArray, defaultProj) {
            this.title = title;
            this.description = description;
            this.toDoItemArray = toDoItemArray;
            this.defaultProj = defaultProj; // true/false - only 1 project can be set as default
        }
    }
    
  
    return {
        Project,
        projectArray
    }
  })();





let ToDoProject = new ProjectModule.Project("ToDo List Project", "Keep notes here for the ToDo list website project", [], true);
ProjectModule.projectArray.push(ToDoProject);
console.log("List of Projects; " + ProjectModule.projectArray);

let FirstToDoItem = new ToDoItemModule.ToDoItem("Make an item", "Create a todo list item to test functionality", Date.now(), "High", "Add any additional notes here", [], null, null);

ToDoProject.toDoItemArray.push(FirstToDoItem);

console.log(ToDoProject);

// button to add a new ToDo Item
const addToDoItem = document.createElement('button');
addToDoItem.classList.add("bg-blue-500","hover:bg-blue-400","text-white","text-base","font-bold","py-2","px-4","border-b-4","border-blue-700","hover:border-blue-500","rounded","m-10","m-10");
addToDoItem.textContent = "Add Item +";

contentHolder.appendChild(addToDoItem);



// function to show dialog for adding a ToDoItem

function todoAdderForm() {

    if (document.getElementById('bookAdderFormHolder')) {
        document.getElementById('bookAdderFormHolder').remove();
    }

    else {

    const formHolder = document.createElement('div');
    formHolder.id = "bookAdderFormHolder";
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
    btnAddNote.addEventListener("click", bookAdder);

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

function bookAdder() {
    const title = document.getElementById("titleInput").value;
    const description = document.getElementById("descriptionInput").value;
    const notes = document.getElementById("notesInput").value;

    //ToDoItem(title, description, duedate, priority, notes, checklist, image, location)
    const newToDo = new ToDoItemModule.ToDoItem(title, description, Date.now(), "High", notes, [], null, null);
    ToDoProject.toDoItemArray.push(newToDo);
    document.getElementById('bookAdderFormHolder').remove()
    displayToDoCards();
}

addToDoItem.addEventListener("click", todoAdderForm);

//(title, description, duedate, priority, notes, checklist, image, location)


// ToDo Item Card

//contentHolder.appendChild(ToDoItemModule.createToDoItemCard(FirstToDoItem));



function displayToDoCards() {

    if (document.getElementById('cardDisplay')) {
        document.getElementById('cardDisplay').remove();
    }

    const cardDisplay = document.createElement('div');
    cardDisplay.id = "cardDisplay";
    contentHolder.appendChild(cardDisplay);

    ToDoProject.toDoItemArray.forEach(toDoItem => {
        const newItem = ToDoItemModule.createToDoItemCard(toDoItem);
        cardDisplay.appendChild(newItem);
    });

};

displayToDoCards();


// Sidebar
function sidebarGenerator(){
    const sidebar = document.createElement('div');
    sidebar.classList.add("bg-blue-800","text-blue-100","w-64","space-y-6","py-7","px-2","absolute","inset-y-0","left-0","transform","-translate-x-full","md:fixed","md:translate-x-0","transition","duration-500","ease-in-out")
    //sidebar.classList.add("bg-blue-800","text-blue-100","w-64","space-y-6","py-7","px-2","absolute","inset-y-0","left-0","transform","-translate-x-full","md:relative","md:translate-x-0","transition","duration-500","ease-in-out")

    const titleHolder = document.createElement('a');
    titleHolder.classList.add("text-white","flex","items-center","space-x-2","px-4");

    const title = document.createElement('span');
    title.classList.add("text-2xl","font-extrabold");
    title.textContent = "Projects";

    const projectHolder = document.createElement('nav');

    sidebar.appendChild(titleHolder);
    titleHolder.appendChild(title);
    sidebar.appendChild(projectHolder);

    ProjectModule.projectArray.forEach(projectObj => {
        const project = document.createElement('a');
        project.classList.add("block","py-2.5","px-4","hover:bg-blue-700","rounded","transition","duration-500","hover:text-white");
        project.textContent = projectObj.title;
        projectHolder.appendChild(project);

    });

    return sidebar;
}

sidebarAndContentHolder.appendChild(sidebarGenerator());


// <!--   sidebar -->
//   <div class="bg-blue-800 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-500 ease-in-out">  //sidebar
//     <!--     logo -->
//     <a href="#" class="text-white flex items-center space-x-2 px-4"> // titleHolder
//       <span class="text-2xl font-extrabold">Better Dev</span> // title
//     </a>
//     <!--     nav -->
//     <nav> // projectholder
//       <a href="#" class="block py-2.5 px-4 hover:bg-blue-700 rounded transition duration-500 hover:text-white"> // project1
//         Home
//       </a>
//       <a href="" class="block py-2.5 px-4 hover:bg-blue-700 rounded transition duration-500 hover:text-white"> // project2
//         About
//       </a>
//       <a href="" class="block py-2.5 px-4 hover:bg-blue-700 rounded transition duration-500 hover:text-white"> // project3
//         Feature
//       </a>
//       <a href="" class="block py-2.5 px-4 hover:bg-blue-700 rounded transition duration-500 hover:text-white"> // project4
//         About
//       </a>
//     </nav>

//   </div>







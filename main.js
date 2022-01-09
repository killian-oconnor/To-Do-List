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







/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QyxvQ0FBb0M7QUFDcEM7QUFDQSxnQ0FBZ0M7QUFDaEMsd0NBQXdDO0FBQ3hDLGdDQUFnQztBQUNoQyxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Uby1Eby1MaXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNvbnRlbnRIb2xkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudEhvbGRlcicpO1xyXG5jb25zdCBzaWRlYmFyQW5kQ29udGVudEhvbGRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlYmFyQW5kQ29udGVudEhvbGRlcicpO1xyXG5cclxuY29uc3QgVG9Eb0l0ZW1Nb2R1bGUgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICBcclxuICAgIC8vIGNsYXNzIHRvIGRlZmluZSBhIFRvRG9JdGVtXHJcbiAgICBjbGFzcyBUb0RvSXRlbSB7XHJcbiAgICAgICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVkYXRlLCBwcmlvcml0eSwgbm90ZXMsIGNoZWNrbGlzdCwgaW1hZ2UsIGxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTsgXHJcbiAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjsgLy9vcHRpb25hbFxyXG4gICAgICAgICAgICB0aGlzLmR1ZWRhdGUgPSBkdWVkYXRlOyAvL29wdGlvbmFsXHJcbiAgICAgICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcclxuICAgICAgICAgICAgdGhpcy5ub3RlcyA9IG5vdGVzOyAvL29wdGlvbmFsXHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tsaXN0ID0gY2hlY2tsaXN0OyAvL29wdGlvbmFsXHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTsgLy9vcHRpb25hbFxyXG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247IC8vb3B0aW9uYWxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRnVuY3Rpb24gdG8gY3JlYXRlIGFuIEhUTUwgVG9EbyBJdGVtIENhcmQgZnJvbSBhbiBpbnN0YW5jZSBvZiB0aGUgVG9Eb0l0ZW0gY2xhc3NcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRvRG9JdGVtQ2FyZChUb0RvSXRlbSkge1xyXG5cclxuICAgICAgICAvL3Byb3BlcnRpZXMgb2YgYSBUb0RvSXRlbTsgdGl0bGUsIGRlc2NyaXB0aW9uLCAjZHVlZGF0ZSwgI3ByaW9yaXR5LCBub3RlcywgI2NoZWNrbGlzdCwgaW1hZ2UsICNsb2NhdGlvblxyXG4gICAgXHJcbiAgICAgICAgY29uc3QgY2FyZEhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNhcmRIb2xkZXIuY2xhc3NMaXN0LmFkZChcIm1heC13LVs3MCVdXCIsXCJteC1hdXRvXCIsXCJweC00XCIsIFwibS00XCIpO1xyXG4gICAgXHJcbiAgICAgICAgY29uc3QgY2FyZENvbnRlbnRGb3JtYXR0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjYXJkQ29udGVudEZvcm1hdHRlci5jbGFzc0xpc3QuYWRkKFwicmVsYXRpdmVcIixcIm0tMFwiLFwic2hhZG93LWxnXCIsXCJmbGV4XCIsXCJiZy13aGl0ZVwiKTtcclxuICAgIFxyXG4gICAgICAgIGNvbnN0IGltYWdlSG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgaW1hZ2VIb2xkZXIuY2xhc3NMaXN0LmFkZChcImZsZXgtbm8tc2hyaW5rXCIpO1xyXG4gICAgXHJcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKFwidy02NFwiLFwiaC02NFwiLFwiYmxvY2tcIixcIm14LWF1dG9cIik7XHJcbiAgICAgICAgaW1hZ2Uuc3JjID0gVG9Eb0l0ZW0uaW1hZ2U7XHJcbiAgICBcclxuICAgICAgICBjb25zdCBjYXJkVGV4dEJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY2FyZFRleHRCbG9jay5jbGFzc0xpc3QuYWRkKFwiZmxleC0xXCIsXCJjYXJkLWJsb2NrXCIsXCJyZWxhdGl2ZVwiKTtcclxuICAgIFxyXG4gICAgICAgIGNvbnN0IGNhcmRUZXh0Q29udGVudEhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNhcmRUZXh0Q29udGVudEhvbGRlci5jbGFzc0xpc3QuYWRkKFwicC02XCIpO1xyXG4gICAgXHJcbiAgICAgICAgY29uc3QgY2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcclxuICAgICAgICBjYXJkVGl0bGUuY2xhc3NMaXN0LmFkZChcImZvbnQtbWVkaXVtXCIsXCJ0ZXh0LTJ4bFwiLFwibWItM1wiKTtcclxuICAgICAgICBjYXJkVGl0bGUudGV4dENvbnRlbnQgPSBUb0RvSXRlbS50aXRsZTtcclxuICAgIFxyXG4gICAgICAgIGNvbnN0IGNhcmREZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBjYXJkRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcImxlYWRpbmctbm9ybWFsXCIpO1xyXG4gICAgICAgIGNhcmREZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IFRvRG9JdGVtLmRlc2NyaXB0aW9uO1xyXG4gICAgXHJcbiAgICAgICAgY29uc3QgY2FyZE5vdGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIGNhcmROb3Rlcy5jbGFzc0xpc3QuYWRkKFwidGV4dC1zbVwiLFwidGV4dC1ncmV5XCIsXCJibG9ja1wiLFwibXQtNlwiKTtcclxuICAgICAgICBjYXJkTm90ZXMudGV4dENvbnRlbnQgPSBUb0RvSXRlbS5ub3RlcztcclxuICAgIFxyXG4gICAgICAgIGNhcmRIb2xkZXIuYXBwZW5kQ2hpbGQoY2FyZENvbnRlbnRGb3JtYXR0ZXIpO1xyXG4gICAgICAgIGlmIChUb0RvSXRlbS5pbWFnZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW1hZ2Ugc291cmNlIGlzIFwiICsgVG9Eb0l0ZW0uaW1hZ2UpO1xyXG4gICAgICAgICAgICBjYXJkQ29udGVudEZvcm1hdHRlci5hcHBlbmRDaGlsZChpbWFnZUhvbGRlcik7XHJcbiAgICAgICAgICAgIGltYWdlSG9sZGVyLmFwcGVuZENoaWxkKGltYWdlKTtcclxuICAgICAgICB9ICAgIFxyXG4gICAgICAgIGNhcmRDb250ZW50Rm9ybWF0dGVyLmFwcGVuZENoaWxkKGNhcmRUZXh0QmxvY2spO1xyXG4gICAgICAgIGNhcmRUZXh0QmxvY2suYXBwZW5kQ2hpbGQoY2FyZFRleHRDb250ZW50SG9sZGVyKTtcclxuICAgICAgICBjYXJkVGV4dENvbnRlbnRIb2xkZXIuYXBwZW5kQ2hpbGQoY2FyZFRpdGxlKTtcclxuICAgICAgICBjYXJkVGV4dENvbnRlbnRIb2xkZXIuYXBwZW5kQ2hpbGQoY2FyZERlc2NyaXB0aW9uKTtcclxuICAgICAgICBjYXJkVGV4dENvbnRlbnRIb2xkZXIuYXBwZW5kQ2hpbGQoY2FyZE5vdGVzKTtcclxuICAgIFxyXG4gICAgICAgIHJldHVybiBjYXJkSG9sZGVyO1xyXG4gICAgXHJcbiAgICB9O1xyXG5cclxuICAgIFxyXG4gIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBUb0RvSXRlbSxcclxuICAgICAgICBjcmVhdGVUb0RvSXRlbUNhcmRcclxuICAgIH1cclxuICB9KSgpO1xyXG4gIFxyXG5cclxuY29uc3QgUHJvamVjdE1vZHVsZSA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICBjb25zdCBwcm9qZWN0QXJyYXkgPSBbXTtcclxuICAgIFxyXG4gICAgLy8gY2xhc3MgdG8gZGVmaW5lIGEgVG9Eb0l0ZW1cclxuICAgIGNsYXNzIFByb2plY3QgeyAvLyBUbyBEbyBpdGVtcyBjYW4gYmUgYXNzaWduZWQgdG8gZ3JvdXBzIGFzIHByb2plY3RzXHJcbiAgICAgICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCB0b0RvSXRlbUFycmF5LCBkZWZhdWx0UHJvaikge1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgdGhpcy50b0RvSXRlbUFycmF5ID0gdG9Eb0l0ZW1BcnJheTtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0UHJvaiA9IGRlZmF1bHRQcm9qOyAvLyB0cnVlL2ZhbHNlIC0gb25seSAxIHByb2plY3QgY2FuIGJlIHNldCBhcyBkZWZhdWx0XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIFByb2plY3QsXHJcbiAgICAgICAgcHJvamVjdEFycmF5XHJcbiAgICB9XHJcbiAgfSkoKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5sZXQgVG9Eb1Byb2plY3QgPSBuZXcgUHJvamVjdE1vZHVsZS5Qcm9qZWN0KFwiVG9EbyBMaXN0IFByb2plY3RcIiwgXCJLZWVwIG5vdGVzIGhlcmUgZm9yIHRoZSBUb0RvIGxpc3Qgd2Vic2l0ZSBwcm9qZWN0XCIsIFtdLCB0cnVlKTtcclxuUHJvamVjdE1vZHVsZS5wcm9qZWN0QXJyYXkucHVzaChUb0RvUHJvamVjdCk7XHJcbmNvbnNvbGUubG9nKFwiTGlzdCBvZiBQcm9qZWN0czsgXCIgKyBQcm9qZWN0TW9kdWxlLnByb2plY3RBcnJheSk7XHJcblxyXG5sZXQgRmlyc3RUb0RvSXRlbSA9IG5ldyBUb0RvSXRlbU1vZHVsZS5Ub0RvSXRlbShcIk1ha2UgYW4gaXRlbVwiLCBcIkNyZWF0ZSBhIHRvZG8gbGlzdCBpdGVtIHRvIHRlc3QgZnVuY3Rpb25hbGl0eVwiLCBEYXRlLm5vdygpLCBcIkhpZ2hcIiwgXCJBZGQgYW55IGFkZGl0aW9uYWwgbm90ZXMgaGVyZVwiLCBbXSwgbnVsbCwgbnVsbCk7XHJcblxyXG5Ub0RvUHJvamVjdC50b0RvSXRlbUFycmF5LnB1c2goRmlyc3RUb0RvSXRlbSk7XHJcblxyXG5jb25zb2xlLmxvZyhUb0RvUHJvamVjdCk7XHJcblxyXG4vLyBidXR0b24gdG8gYWRkIGEgbmV3IFRvRG8gSXRlbVxyXG5jb25zdCBhZGRUb0RvSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5hZGRUb0RvSXRlbS5jbGFzc0xpc3QuYWRkKFwiYmctYmx1ZS01MDBcIixcImhvdmVyOmJnLWJsdWUtNDAwXCIsXCJ0ZXh0LXdoaXRlXCIsXCJ0ZXh0LWJhc2VcIixcImZvbnQtYm9sZFwiLFwicHktMlwiLFwicHgtNFwiLFwiYm9yZGVyLWItNFwiLFwiYm9yZGVyLWJsdWUtNzAwXCIsXCJob3Zlcjpib3JkZXItYmx1ZS01MDBcIixcInJvdW5kZWRcIixcIm0tMTBcIixcIm0tMTBcIik7XHJcbmFkZFRvRG9JdGVtLnRleHRDb250ZW50ID0gXCJBZGQgSXRlbSArXCI7XHJcblxyXG5jb250ZW50SG9sZGVyLmFwcGVuZENoaWxkKGFkZFRvRG9JdGVtKTtcclxuXHJcblxyXG5cclxuLy8gZnVuY3Rpb24gdG8gc2hvdyBkaWFsb2cgZm9yIGFkZGluZyBhIFRvRG9JdGVtXHJcblxyXG5mdW5jdGlvbiB0b2RvQWRkZXJGb3JtKCkge1xyXG5cclxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9va0FkZGVyRm9ybUhvbGRlcicpKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jvb2tBZGRlckZvcm1Ib2xkZXInKS5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBlbHNlIHtcclxuXHJcbiAgICBjb25zdCBmb3JtSG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBmb3JtSG9sZGVyLmlkID0gXCJib29rQWRkZXJGb3JtSG9sZGVyXCI7XHJcbiAgICBmb3JtSG9sZGVyLmNsYXNzTGlzdC5hZGQoXCJiZy1ncmV5LWxpZ2h0ZXJcIixcIm0tMTBcIixcImZsZXhcIixcImZsZXgtY29sXCIpO1xyXG5cclxuICAgIGNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGZvcm1Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbnRhaW5lclwiLFwibWF4LXctZnVsbFwiLFwibXgtYXV0b1wiLFwiZmxleC0xXCIsXCJmbGV4XCIsXCJmbGV4LWNvbFwiLFwiaXRlbXMtY2VudGVyXCIsXCJqdXN0aWZ5LWNlbnRlclwiLFwicHgtMlwiKTtcclxuXHJcbiAgICBjb25zdCBmb3JtRnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGZvcm1GcmFtZS5jbGFzc0xpc3QuYWRkKFwiYmctd2hpdGVcIixcInB4LTZcIixcInB5LThcIixcInJvdW5kZWRcIixcInNoYWRvdy1tZFwiLFwidGV4dC1ibGFja1wiLFwidy1mdWxsXCIsXCJ0ZXh0LWxnXCIpO1xyXG5cclxuICAgIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xyXG4gICAgaGVhZGluZy5jbGFzc0xpc3QuYWRkKFwibWItOFwiLFwidGV4dC0zeGxcIixcInRleHQtY2VudGVyXCIpO1xyXG4gICAgaGVhZGluZy50ZXh0Q29udGVudCA9IFwiQWRkIGEgVG8tZG8gTm90ZVwiO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgdGl0bGVJbnB1dC5jbGFzc0xpc3QuYWRkKFwiYmxvY2tcIixcImJvcmRlclwiLFwiYm9yZGVyLWdyZXktbGlnaHRcIixcInctZnVsbFwiLFwicC0xXCIsXCJyb3VuZGVkXCIsXCJtYi00XCIpO1xyXG4gICAgdGl0bGVJbnB1dC50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICB0aXRsZUlucHV0LnBsYWNlaG9sZGVyID0gXCJUaXRsZVwiO1xyXG4gICAgdGl0bGVJbnB1dC5pZCA9IFwidGl0bGVJbnB1dFwiO1xyXG5cclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgZGVzY3JpcHRpb25JbnB1dC5jbGFzc0xpc3QuYWRkKFwiYmxvY2tcIixcImJvcmRlclwiLFwiYm9yZGVyLWdyZXktbGlnaHRcIixcInctZnVsbFwiLFwicC0xXCIsXCJyb3VuZGVkXCIsXCJtYi00XCIpO1xyXG4gICAgZGVzY3JpcHRpb25JbnB1dC50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICBkZXNjcmlwdGlvbklucHV0LnBsYWNlaG9sZGVyID0gXCJEZXNjcmlwdGlvblwiO1xyXG4gICAgZGVzY3JpcHRpb25JbnB1dC5pZCA9IFwiZGVzY3JpcHRpb25JbnB1dFwiO1xyXG5cclxuICAgIGNvbnN0IG5vdGVzSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgbm90ZXNJbnB1dC5jbGFzc0xpc3QuYWRkKFwiYmxvY2tcIixcImJvcmRlclwiLFwiYm9yZGVyLWdyZXktbGlnaHRcIixcInctZnVsbFwiLFwicC0xXCIsXCJyb3VuZGVkXCIsXCJtYi00XCIpO1xyXG4gICAgbm90ZXNJbnB1dC50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICBub3Rlc0lucHV0LnBsYWNlaG9sZGVyID0gXCJOb3Rlc1wiO1xyXG4gICAgbm90ZXNJbnB1dC5pZCA9IFwibm90ZXNJbnB1dFwiO1xyXG5cclxuICAgIGNvbnN0IGJ0bkFkZE5vdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGJ0bkFkZE5vdGUuY2xhc3NMaXN0LmFkZChcInRleHQtbGdcIixcInctMzJcIixcInRleHQtY2VudGVyXCIsXCJweS0zXCIsXCJyb3VuZGVkXCIsXCJiZy1ncmVlbi02MDBcIixcInRleHQtd2hpdGVcIixcImhvdmVyOmJnLWdyZWVuLTgwMFwiLFwiZm9jdXM6b3V0bGluZS1ub25lXCIsXCJteS0xXCIpO1xyXG4gICAgYnRuQWRkTm90ZS50ZXh0Q29udGVudCA9IFwiQWRkICtcIjtcclxuICAgIGJ0bkFkZE5vdGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJvb2tBZGRlcik7XHJcblxyXG4gICAgY29udGVudEhvbGRlci5pbnNlcnRCZWZvcmUoZm9ybUhvbGRlciwgYWRkVG9Eb0l0ZW0ubmV4dFNpYmxpbmcpO1xyXG5cclxuICAgIC8vYWRkVG9Eb0l0ZW0uYXBwZW5kQ2hpbGQoZm9ybUhvbGRlcik7XHJcbiAgICBmb3JtSG9sZGVyLmFwcGVuZENoaWxkKGZvcm1Db250YWluZXIpO1xyXG4gICAgZm9ybUNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtRnJhbWUpO1xyXG4gICAgZm9ybUZyYW1lLmFwcGVuZENoaWxkKGhlYWRpbmcpO1xyXG4gICAgZm9ybUZyYW1lLmFwcGVuZENoaWxkKHRpdGxlSW5wdXQpO1xyXG4gICAgZm9ybUZyYW1lLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXQpO1xyXG4gICAgZm9ybUZyYW1lLmFwcGVuZENoaWxkKG5vdGVzSW5wdXQpO1xyXG4gICAgZm9ybUZyYW1lLmFwcGVuZENoaWxkKGJ0bkFkZE5vdGUpO1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJvb2tBZGRlcigpIHtcclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXRsZUlucHV0XCIpLnZhbHVlO1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlc2NyaXB0aW9uSW5wdXRcIikudmFsdWU7XHJcbiAgICBjb25zdCBub3RlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm90ZXNJbnB1dFwiKS52YWx1ZTtcclxuXHJcbiAgICAvL1RvRG9JdGVtKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlZGF0ZSwgcHJpb3JpdHksIG5vdGVzLCBjaGVja2xpc3QsIGltYWdlLCBsb2NhdGlvbilcclxuICAgIGNvbnN0IG5ld1RvRG8gPSBuZXcgVG9Eb0l0ZW1Nb2R1bGUuVG9Eb0l0ZW0odGl0bGUsIGRlc2NyaXB0aW9uLCBEYXRlLm5vdygpLCBcIkhpZ2hcIiwgbm90ZXMsIFtdLCBudWxsLCBudWxsKTtcclxuICAgIFRvRG9Qcm9qZWN0LnRvRG9JdGVtQXJyYXkucHVzaChuZXdUb0RvKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib29rQWRkZXJGb3JtSG9sZGVyJykucmVtb3ZlKClcclxuICAgIGRpc3BsYXlUb0RvQ2FyZHMoKTtcclxufVxyXG5cclxuYWRkVG9Eb0l0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZG9BZGRlckZvcm0pO1xyXG5cclxuLy8odGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVkYXRlLCBwcmlvcml0eSwgbm90ZXMsIGNoZWNrbGlzdCwgaW1hZ2UsIGxvY2F0aW9uKVxyXG5cclxuXHJcbi8vIFRvRG8gSXRlbSBDYXJkXHJcblxyXG4vL2NvbnRlbnRIb2xkZXIuYXBwZW5kQ2hpbGQoVG9Eb0l0ZW1Nb2R1bGUuY3JlYXRlVG9Eb0l0ZW1DYXJkKEZpcnN0VG9Eb0l0ZW0pKTtcclxuXHJcblxyXG5cclxuZnVuY3Rpb24gZGlzcGxheVRvRG9DYXJkcygpIHtcclxuXHJcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcmREaXNwbGF5JykpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FyZERpc3BsYXknKS5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjYXJkRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY2FyZERpc3BsYXkuaWQgPSBcImNhcmREaXNwbGF5XCI7XHJcbiAgICBjb250ZW50SG9sZGVyLmFwcGVuZENoaWxkKGNhcmREaXNwbGF5KTtcclxuXHJcbiAgICBUb0RvUHJvamVjdC50b0RvSXRlbUFycmF5LmZvckVhY2godG9Eb0l0ZW0gPT4ge1xyXG4gICAgICAgIGNvbnN0IG5ld0l0ZW0gPSBUb0RvSXRlbU1vZHVsZS5jcmVhdGVUb0RvSXRlbUNhcmQodG9Eb0l0ZW0pO1xyXG4gICAgICAgIGNhcmREaXNwbGF5LmFwcGVuZENoaWxkKG5ld0l0ZW0pO1xyXG4gICAgfSk7XHJcblxyXG59O1xyXG5cclxuZGlzcGxheVRvRG9DYXJkcygpO1xyXG5cclxuXHJcbi8vIFNpZGViYXJcclxuZnVuY3Rpb24gc2lkZWJhckdlbmVyYXRvcigpe1xyXG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgc2lkZWJhci5jbGFzc0xpc3QuYWRkKFwiYmctYmx1ZS04MDBcIixcInRleHQtYmx1ZS0xMDBcIixcInctNjRcIixcInNwYWNlLXktNlwiLFwicHktN1wiLFwicHgtMlwiLFwiYWJzb2x1dGVcIixcImluc2V0LXktMFwiLFwibGVmdC0wXCIsXCJ0cmFuc2Zvcm1cIixcIi10cmFuc2xhdGUteC1mdWxsXCIsXCJtZDpmaXhlZFwiLFwibWQ6dHJhbnNsYXRlLXgtMFwiLFwidHJhbnNpdGlvblwiLFwiZHVyYXRpb24tNTAwXCIsXCJlYXNlLWluLW91dFwiKVxyXG4gICAgLy9zaWRlYmFyLmNsYXNzTGlzdC5hZGQoXCJiZy1ibHVlLTgwMFwiLFwidGV4dC1ibHVlLTEwMFwiLFwidy02NFwiLFwic3BhY2UteS02XCIsXCJweS03XCIsXCJweC0yXCIsXCJhYnNvbHV0ZVwiLFwiaW5zZXQteS0wXCIsXCJsZWZ0LTBcIixcInRyYW5zZm9ybVwiLFwiLXRyYW5zbGF0ZS14LWZ1bGxcIixcIm1kOnJlbGF0aXZlXCIsXCJtZDp0cmFuc2xhdGUteC0wXCIsXCJ0cmFuc2l0aW9uXCIsXCJkdXJhdGlvbi01MDBcIixcImVhc2UtaW4tb3V0XCIpXHJcblxyXG4gICAgY29uc3QgdGl0bGVIb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICB0aXRsZUhvbGRlci5jbGFzc0xpc3QuYWRkKFwidGV4dC13aGl0ZVwiLFwiZmxleFwiLFwiaXRlbXMtY2VudGVyXCIsXCJzcGFjZS14LTJcIixcInB4LTRcIik7XHJcblxyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwidGV4dC0yeGxcIixcImZvbnQtZXh0cmFib2xkXCIpO1xyXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIlByb2plY3RzXCI7XHJcblxyXG4gICAgY29uc3QgcHJvamVjdEhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xyXG5cclxuICAgIHNpZGViYXIuYXBwZW5kQ2hpbGQodGl0bGVIb2xkZXIpO1xyXG4gICAgdGl0bGVIb2xkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgc2lkZWJhci5hcHBlbmRDaGlsZChwcm9qZWN0SG9sZGVyKTtcclxuXHJcbiAgICBQcm9qZWN0TW9kdWxlLnByb2plY3RBcnJheS5mb3JFYWNoKHByb2plY3RPYmogPT4ge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgcHJvamVjdC5jbGFzc0xpc3QuYWRkKFwiYmxvY2tcIixcInB5LTIuNVwiLFwicHgtNFwiLFwiaG92ZXI6YmctYmx1ZS03MDBcIixcInJvdW5kZWRcIixcInRyYW5zaXRpb25cIixcImR1cmF0aW9uLTUwMFwiLFwiaG92ZXI6dGV4dC13aGl0ZVwiKTtcclxuICAgICAgICBwcm9qZWN0LnRleHRDb250ZW50ID0gcHJvamVjdE9iai50aXRsZTtcclxuICAgICAgICBwcm9qZWN0SG9sZGVyLmFwcGVuZENoaWxkKHByb2plY3QpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBzaWRlYmFyO1xyXG59XHJcblxyXG5zaWRlYmFyQW5kQ29udGVudEhvbGRlci5hcHBlbmRDaGlsZChzaWRlYmFyR2VuZXJhdG9yKCkpO1xyXG5cclxuXHJcbi8vIDwhLS0gICBzaWRlYmFyIC0tPlxyXG4vLyAgIDxkaXYgY2xhc3M9XCJiZy1ibHVlLTgwMCB0ZXh0LWJsdWUtMTAwIHctNjQgc3BhY2UteS02IHB5LTcgcHgtMiBhYnNvbHV0ZSBpbnNldC15LTAgbGVmdC0wIHRyYW5zZm9ybSAtdHJhbnNsYXRlLXgtZnVsbCBtZDpyZWxhdGl2ZSBtZDp0cmFuc2xhdGUteC0wIHRyYW5zaXRpb24gZHVyYXRpb24tNTAwIGVhc2UtaW4tb3V0XCI+ICAvL3NpZGViYXJcclxuLy8gICAgIDwhLS0gICAgIGxvZ28gLS0+XHJcbi8vICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwidGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgcHgtNFwiPiAvLyB0aXRsZUhvbGRlclxyXG4vLyAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtMnhsIGZvbnQtZXh0cmFib2xkXCI+QmV0dGVyIERldjwvc3Bhbj4gLy8gdGl0bGVcclxuLy8gICAgIDwvYT5cclxuLy8gICAgIDwhLS0gICAgIG5hdiAtLT5cclxuLy8gICAgIDxuYXY+IC8vIHByb2plY3Rob2xkZXJcclxuLy8gICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImJsb2NrIHB5LTIuNSBweC00IGhvdmVyOmJnLWJsdWUtNzAwIHJvdW5kZWQgdHJhbnNpdGlvbiBkdXJhdGlvbi01MDAgaG92ZXI6dGV4dC13aGl0ZVwiPiAvLyBwcm9qZWN0MVxyXG4vLyAgICAgICAgIEhvbWVcclxuLy8gICAgICAgPC9hPlxyXG4vLyAgICAgICA8YSBocmVmPVwiXCIgY2xhc3M9XCJibG9jayBweS0yLjUgcHgtNCBob3ZlcjpiZy1ibHVlLTcwMCByb3VuZGVkIHRyYW5zaXRpb24gZHVyYXRpb24tNTAwIGhvdmVyOnRleHQtd2hpdGVcIj4gLy8gcHJvamVjdDJcclxuLy8gICAgICAgICBBYm91dFxyXG4vLyAgICAgICA8L2E+XHJcbi8vICAgICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cImJsb2NrIHB5LTIuNSBweC00IGhvdmVyOmJnLWJsdWUtNzAwIHJvdW5kZWQgdHJhbnNpdGlvbiBkdXJhdGlvbi01MDAgaG92ZXI6dGV4dC13aGl0ZVwiPiAvLyBwcm9qZWN0M1xyXG4vLyAgICAgICAgIEZlYXR1cmVcclxuLy8gICAgICAgPC9hPlxyXG4vLyAgICAgICA8YSBocmVmPVwiXCIgY2xhc3M9XCJibG9jayBweS0yLjUgcHgtNCBob3ZlcjpiZy1ibHVlLTcwMCByb3VuZGVkIHRyYW5zaXRpb24gZHVyYXRpb24tNTAwIGhvdmVyOnRleHQtd2hpdGVcIj4gLy8gcHJvamVjdDRcclxuLy8gICAgICAgICBBYm91dFxyXG4vLyAgICAgICA8L2E+XHJcbi8vICAgICA8L25hdj5cclxuXHJcbi8vICAgPC9kaXY+XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
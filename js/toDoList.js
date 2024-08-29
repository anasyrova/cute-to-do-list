var textEntered;

var addItem;
var newButton;
var editedInput;
var saveButton;

var addLink = document.querySelector('button.addItem');      //get add item button
var counter = document.getElementById("counter") // get item counter
updateCount();

//Add item
addLink.addEventListener("click", addItem, false);

var noteInput = document.getElementById("newInput"); // get input field

noteInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addItem(e); 
        e.preventDefault(); 
    }
}, false);

//Add Item
function addItem(e){

    e.preventDefault();
    //var noteInput = document.getElementById("newInput");

    // Use New List Item Function
    if(noteInput.value === ""){

        if(!document.getElementById("noMessage").querySelector("p")){
            var noText = document.createElement("p");
            noText.textContent = "Please don't create empty tasks!";
            document.getElementById("noMessage").appendChild(noText);

            
            setTimeout(() => {
                document.getElementById("noMessage").removeChild(noText);
              }, 1500); 
        
            return;

        }



    } else{

        if(document.getElementById("noMessage").querySelector("p")){
            document.getElementById("noMessage").removeChild(document.getElementById("noMessage").querySelector("p"))
        }

        var newLi = createNewListItem(noteInput.value);

        var elList = document.getElementById("list");   //get list
        elList.appendChild(newLi);

        updateCount();
        noteInput.value = ""; 

    }
    

}

function removeItem(e){
    target = e.target;
    var listItem = target.parentNode;
    var elList = document.getElementById("list");   //get list
    elList.removeChild(listItem);
    updateCount()

}

function updateCount(){
    var elList = document.getElementById("list");   //get list
    var listItems = elList.getElementsByTagName("li").length;
    if (listItems > 0) {
        counter.innerHTML = listItems;
    }
    else {
        counter.innerHTML = "0";
    }
}

function editItemNEW(e){

    var parent = e.target.parentNode;
    var currentText = parent.firstChild.nextSibling.nodeValue;

    console.log("parent in editItemNew ", parent)

    //Delete old remove and edit buttons
    var tempEditButton = parent.firstChild.nextSibling.nextSibling;
    var tempRemoveButton = parent.firstChild.nextSibling.nextSibling.nextSibling;

    parent.removeChild(tempEditButton);
    parent.removeChild(tempRemoveButton);

    //Create new input window
    var editedInput = createInputElement("editedInput", currentText);
    parent.appendChild(editedInput);


    //Create new cancel, save and remove buttons
    var cancelButton = createButton("cancel", "Cancel", parent);
    var saveButton = createButton("save", "Save Changes", parent);
    var removeButton = createButton("remove", "Remove", parent);
    
    //Add event listeners
    removeButton.addEventListener("click", removeItem, false);
    saveButton.addEventListener("click", function() {saveChanges(editedInput, parent)}, false);

    
    cancelButton.addEventListener("click", function() {cancelChanges(parent)}, false);

}



function createNewListItem(itemText) {
    var newEl = document.createElement("li");
    
    
    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.id = "checkbox";
    checkBox.addEventListener("change", changeListItemColor, false); // Add change event listener
    newEl.appendChild(checkBox);
    

    var newText = document.createTextNode(itemText);
    newEl.appendChild(newText);

    
    var removeButton = createButton("remove", "Remove", newEl);
    var editButton = createButton("edit", "Edit", newEl);

    removeButton.addEventListener("click", removeItem, false);
    editButton.addEventListener("click", editItemNEW, false);

    return newEl;
}

// TODO: This function should return the structure of list item "<li>"
// when the user clicked the "edit" button.

function saveChanges(editedInput, parent){ //, saveButton,editButton, cancelButton
    
    console.log("parent in saveChanges ", parent);
    parent.firstChild.nextSibling.nodeValue = editedInput.value;

    var grandParent = parent.parentNode;

    
    if(parent.firstChild.nextSibling.nodeValue === ""){
        grandParent.removeChild(parent); 
        updateCount();

        var deletingText = document.createElement("p");
        deletingText.textContent = "You task was deleted because it was empty :(";
        document.getElementById("noMessage").appendChild(deletingText);
        setTimeout(() => {
            document.getElementById("noMessage").removeChild(deletingText);
          }, 1500); 
        return;
    } 

    changeButtonsToRegularState(parent);
}

function cancelChanges(parent){

    changeButtonsToRegularState(parent)
    console.log("parent in cancelChanges: ", parent);
   
}

function createButton(className, textContent, parent){

    var button = document.createElement("button");
    button.className = className;
    button.textContent = textContent;

    parent.appendChild(button);
    
    return button;

}

function createInputElement(elementID, elementValue){

    var input = document.createElement("input");
    input.type = "text";
    input.id = elementID;
    input.value = elementValue;

    return input;

}

function changeButtonsToRegularState(parent){

    var inputField = parent.firstChild.nextSibling.nextSibling;
    var cancelButton = parent.firstChild.nextSibling.nextSibling.nextSibling;
    var saveButton = parent.firstChild.nextSibling.nextSibling.nextSibling.nextSibling;

    
    parent.removeChild(inputField);
    parent.removeChild(cancelButton);
    parent.removeChild(saveButton);

    var editButton = createButton("edit", "Edit", parent);
    editButton.addEventListener("click", editItemNEW, false);


}

function changeListItemColor(e) {
    
    var checkbox = e.target;
    var listItem = checkbox.parentNode; 

    if (checkbox.checked) {
        listItem.style.backgroundColor = "#c2f0c2"; 
    } else{

        listItem.style.backgroundColor = ""; 

    }
}


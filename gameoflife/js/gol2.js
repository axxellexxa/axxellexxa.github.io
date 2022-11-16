//Gets the div that will store the checkboxes
// Gets the div element with the ID of "field"
var field = document.getElementById("field");
// Defines the initial field parameters
var rowNum = 10;
var colNum = 10;

// This function creates the board wherein the game will be played
function createField() {
	// Empties the field element
	field.innerHTML = "";
	// Gets the user's input for field parameters (default : 10)
	rowNum = document.getElementById("row").value;
	colNum = document.getElementById("col").value;
	// This loop creates each row and places it in the field
	for (var i = 0; i < rowNum; i++) {
		// Creates a div element to represent each row
		var row = document.createElement("DIV");
		// Gives each row a unique ID
		row.setAttribute("id", i.toString())
		// This loop creates each checkbox and places it in a row
		for (var j = 0; j < colNum; j++) {
			// Creates an input element
			var box = document.createElement("INPUT");
			// Gives the input element the checkbox type
			box.setAttribute("type", "checkbox");
			// Gives each checkbox a unique ID
			box.setAttribute("id", i.toString()+" "+j.toString());
			// This value contains the IDs of the current checkbox's neighbours
			var value =
			//Upper Left
			(i-1).toString()+" "+(j-1).toString()+","+
			//Upper Middle
			(i-1).toString()+" "+(j).toString()+","+
			//Upper Right
			(i-1).toString()+" "+(j+1).toString()+","+
			//Middle Left
			(i).toString()+" "+(j-1).toString()+","+
			//Middle Right
			(i).toString()+" "+(j+1).toString()+","+
			//Lower Left
			(i+1).toString()+" "+(j-1).toString()+","+
			//Lower Middle
			(i+1).toString()+" "+(j).toString()+","+
			//Lower Right
			(i+1).toString()+" "+(j+1).toString();
			// Gives the value as an attribute to the checkbox
			box.setAttribute("value",value);
			// Creates a div element to contain the custom check mark
			var mark = document.createElement("DIV");
			// Adds the checkmark class to the div to allow for styling
			mark.classList.add("checkmark");
			// Checks if the checkbox is in the corner and adds a unique class for styling
			if (i==0 && j==0) {
				mark.classList.add("topLeft");
			}
			if (i==0 && j==colNum-1) {
				mark.classList.add("topRight");
			}
			if (i==rowNum-1 && j==0) {
				mark.classList.add("botLeft");
			}
			if (i==rowNum-1 && j==colNum-1) {
				mark.classList.add("botRight");
			}
			// Creates a Label element to contain the checkbox and the checkmark
			var label = document.createElement("LABEL");
			// Gives the Label element the container class
			label.classList.add("container");
			// Places the checkbox and the checkmark into the container
			label.appendChild(box);
			label.appendChild(mark);
			// Places the container into the row
			row.appendChild(label);
		};
		// Gives the row element the row class
		row.classList.add("row");
		// Places the row element into the field element
		field.appendChild(row);
	};
};

// This function updates the field according to the rules
function step() {
	//Stores which checkboxes are going to be "born" in the next step
	var alive = [];
	//Stores which checkboxes are going to "die" in the next step
	var dead = [];
	//Loops through all available checkboxes
	for (var i = 0; i < rowNum; i++) {
		for (var j = 0; j < colNum; j++) {
			//Gets the checkbox element
			var selected = document.getElementById(i.toString()+" "+j.toString());
			//Stores the ID as an array, [0] => row [1] => col
			var selectedId = selected.id.split(" ");
			//Gets the IDs of the neighbors of the selected element as an array
			var neighborId = selected.getAttribute("value").split(",");
			//Stores invalid IDs to be removed later
			var invalidId = [];
			//Loops through neighborId and finds invalid IDs
			for (var k = 0; k < neighborId.length; k++) {
				//Takes the ID string and splits it into 2, the first containing the row, the second containing the column
				var id = neighborId[k].split(" ");
				//Converts the spllit strings into integers
				var rowId = parseInt(id[0]);
				var colId = parseInt(id[1]);

				//Places the index of the ID containing an invalid position into the invalidId array
				//Invalid positions are either negative, or greater than the amount of existing rows or columns
				if (rowId < 0 || colId < 0 || rowId >= rowNum || colId >= colNum) {
					invalidId.push(k)
				};
			};
			//Loops through neighborId and removes it from the array if it is invalid
			//It loops from the end to avoid messing with the indexes
			for (var k = neighborId.length-1; k >= 0; k--) {
				//Checks if the current ID is found in the invalidId array
				if (invalidId.includes(k)) {
					// Removes 1 element at the index k
					neighborId.splice(k,1)
				};
			};
			//Tally of how many "living" neighbors the selcted checkbox has
			var checkedNeighbors = 0;
			//Loops through the selected checkbox's neighbors 
			for (var k = 0; k < neighborId.length; k++) {
				//Checks whether the neighbor is "dead" or "alive"
				if (document.getElementById(neighborId[k]).checked == true) {
					//Add to the tally
					checkedNeighbors++
				};
			};
			//The amount of "living" neighbors needed to make the selected checkbox "live"
			if (checkedNeighbors == 3){
				alive.push(selected);
			//The amount of "dead" neighbors needed to make the selected checkbox "die"
			} else if (checkedNeighbors < 2 || checkedNeighbors > 2){
				dead.push(selected);
			};
		};
	};
	//Loops through all checkboxes in the alive array
	for (var i = alive.length - 1; i >= 0; i--) {
		//Checks the checkbox
		alive[i].checked = true;
	};
	//Loops through all checkboxes in the dead array
	for (var i = dead.length - 1; i >= 0; i--) {
		//Unchecks the checkbox
		dead[i].checked = false;
	};
};

// This function randomly adds living cells according to a percentage parameter
function randomFill() {
	// The following loops throught each row and each box within them
	for (var i = 0; i < rowNum; i++) {
		for (var j = 0; j < colNum; j++) {
			// Gets the checkbox input element at the current ID
			var selected = document.getElementById(i.toString()+" "+j.toString());
			// Gets the user's input for the percentage parameter (default : 50)
			var percent = (document.getElementById("percent").value)/100;
			// Generates a number from 0 to 1
			var randNum = Math.random();
			// Checks if the number is less than the desired percent
			if (randNum<percent) {
				selected.checked=true;
			} else {
				selected.checked=false;
			}
		}
	}
}

createField();
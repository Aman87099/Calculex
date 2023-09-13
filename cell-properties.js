// stroage
let collectedSheetDB = []; // Contains all sheetDB
let sheetDB = [];

{
    let addSheetBtn = document.querySelector(".sheet-add-icon");
    addSheetBtn.click();
   
}
// for(let i = 0; i<rows; i++){
//     let sheetRow = [];
//     for(let j = 0; j<cols; j++){
//         let cellProp = {
//             bold: false, 
//             italic: false,
//             underline: false,
//             alignment: "left",
//             fontFamily: "monospace",
//             fontSize: "14",
//             fontColor: "#000000",
//             BGcolor: "#000000", // just for indication purpose
//             value:"",
//             formula: "",
//             children: [],
//         }
//         sheetRow.push(cellProp);
//     }
//     sheetDB.push(sheetRow);
// }
// selectors for cell properties 
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGColor = document.querySelector(".BGcolor-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";


//Application of two-way binding 
//Attach properties listeners
bold.addEventListener("click" , (e)=> {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modification 
    cellProp.bold = !cellProp.bold; // data change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; // UI change (Part 1)
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp; // UI change (Part 2)

})

italic.addEventListener("click" , (e)=> {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modification 
    cellProp.italic = !cellProp.italic; // data change
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; // UI change (Part 1)
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp; // UI change (Part 2)
})
underline.addEventListener("click" , (e)=> {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    // Modification 
    cellProp.underline = !cellProp.underline; // data change
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"; // UI change (Part 1)
    underline.style.backgroundColor = cellProp.underline? activeColorProp : inactiveColorProp; // UI change (Part 2)
})

fontSize.addEventListener("change", (e) =>{
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontSize = fontSize.value; // data change
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value  = cellProp.fontSize;
})
fontFamily.addEventListener("change", (e) =>{
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontFamily = fontFamily.value; // data change
    cell.style.fontFamily  = cellProp.fontFamily ;
    fontFamily.value  = cellProp.fontFamily;
})
fontColor.addEventListener("change", (e) =>{
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontColor = fontColor.value; // data change
    cell.style.color  = cellProp.fontColor ;
    fontColor.value  = cellProp.fontColor;  
})
BGColor.addEventListener("change", (e) =>{
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.BGColor = BGColor.value; // data change
    cell.style.backgroundColor  = cellProp. BGColor ;
    BGColor.value  = cellProp.BGColor;  
})
alignment.forEach((alignElem) =>{
    alignElem.addEventListener("click", (e) =>{
        let address = addressBar.value;
        let [cell, cellProp] = getCellAndCellProp(address);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue; // data change
        cell.style.textAlign = cellProp.alignment; // UI change (1)
        
        leftAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;

        e.target.style.backgroundColor = activeColorProp;

      
    });
});

let allCells = document.querySelectorAll(".cell");
for(let i = 0; i< allCells.length; i++){
    addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell){
    //Work 
    cell.addEventListener("click", (e) =>{
        let address = addressBar.value;
        let [rid, cid] =  decodeRIDCIDFromAddress(address);
        let cellProp = sheetDB[rid][cid];




        //Apply cell properties
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; 
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily  = cellProp.fontFamily ;
        cell.style.color  = cellProp.fontColor ;
        cell.style.backgroundColor  = cellProp.BGColor === "#000000" ? "transparent" : cellProp.BGColor;
        cell.style.textAlign = cellProp.alignment;

        
       
         // Apply properties to  UI  Props container 
         bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
         italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
         underline.style.backgroundColor = cellProp.underline? activeColorProp : inactiveColorProp;
         fontColor.value  = cellProp.fontColor;
         fontFamily.value  = cellProp.fontFamily; 
         fontSize.value  = cellProp.fontSize;
         BGColor.value  = cellProp.BGColor; 

         switch(cellProp.alignment){ //UI chnage (part 2)
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                break;
                
            
         }
         let formulaBar = document.querySelector(".formula-bar");
         formulaBar.value = cellProp.formula;
         cell.innerText = cellProp.value;
    })
}

function getCellAndCellProp(address){
   let[rid, cid] =  decodeRIDCIDFromAddress(address);
   //Access cell and storage object
   let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
   let cellProp = sheetDB[rid][cid];
   return [cell, cellProp];
}
function decodeRIDCIDFromAddress(address){
    // address -> "A1"
    let rid = Number(address.slice(1)-1); // "1" -> 0
    let cid = Number(address.charCodeAt(0))-65; // "A" -> 65
    return [rid, cid];
}




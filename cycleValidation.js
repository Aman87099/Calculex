// storage -> 2D Array( basic need  ) 

let collectedGraphComponent = [];
let graphComponentMatrix = [];
// for(let i =0;  i< rows ; i++){
//     let row = [];
//     for(let j = 0; j<cols; j++){
//         // why array ? -> more than one child relation /dependency;
//         row.push([]);
//     }
//     graphComponentMatrix.push(row);
// }

// true denotes cycle detection and vice versa 
function isGraphCyclic(graphComponentMatrix) {
    //Dependency  - > visited and dfsvisited (2D Array)
    let visited = []; // Node visited trace 
    let dfsVisited = []; // Stack visit trace 

    for(let i =0; i <rows; i++){
        let visitedRow = [];
        let dfsVisitedRow = [];
        for(let j = 0; j< cols; j++){
           visitedRow.push(false);
           dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }
    for(let i = 0; i<rows; i++){
        for(let j = 0; j<cols; j++){
            if(visited[i][j] == false ){
                let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
                if(response == true) return [i,j];
            }
           
        }
    }
    return null;
}
//start -> vis(true) and dfsvisi = true
//end -> dfsvisi = false
//if visited[i][j] === true, then go back as it is already explored 
// cycle detection condition -> if visited[i][j] && dfsvisited[i][j] === true then cycle is present 
function dfsCycleDetection(graphComponentMatrix, srcr, srcc, visited, dfsVisited ){
    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;

    //A1 -> [ [0,1] [1,0] [5,10].....   ]
    for(let children = 0; children<graphComponentMatrix[srcr][srcc].length; children++){
        let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];
        if(visited[nbrr][nbrc] === false ){
           let response =  dfsCycleDetection(graphComponentMatrix, nbrr, nbrc, visited, dfsVisited);
           if(response === true) return true; // cycle found, so return 
        }
        else if(visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc]=== true){
            return true; // cycle found
        }
    }
    dfsVisited[srcr][srcc] = false;
    return false;
}
class GameMap {
    // ######### CONSTRUCTOR #########
    constructor() {
        this.waterTile = " ";
        this.landTile = "■";
        this.size = 0;
    }

    displayMap(map) {
        // Get the container where the map will be displayed
        let container = document.getElementById("map-container");
    
        // Remove any existing content in the container
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    
        // Iterate over each row in the map
        for (let i = 0; i < map.length; i++) {
            let row = map[i];
    
            // Create a div to represent the row
            let rowDiv = document.createElement("div");
            rowDiv.style.display = "flex";
    
            // Iterate over each cell in the row
            for (let j = 0; j < row.length; j++) {
                let cell = row[j];
                let topNeighbor,leftNeighbor,bottomNeighbor,rightNeighbor;
                let topLeftCorner,topRightCorner,bottomLeftCorner,bottomRightCorner;
                if (map[i - 1] != undefined && map[i + 1] != undefined) {
                    topNeighbor = map[i - 1][j];
                    leftNeighbor = map[i][j - 1];
                    bottomNeighbor = map[i + 1][j];
                    rightNeighbor = map[i][j + 1];
                    topLeftCorner = map[i - 1][j - 1];
                    topRightCorner = map[i - 1][j + 1];
                    bottomLeftCorner = map[i + 1][j - 1];
                    bottomRightCorner = map[i + 1][j + 1];
                }
    
                // Create a div to represent the cell
                let cellDiv = document.createElement("div");
                cellDiv.classList.add("tile");    
    
                // Set the background image of the cell
                if (cell === this.landTile) {
                    if (i > 0 && j < map[i].length - 1 && topNeighbor === this.landTile && rightNeighbor === this.landTile && bottomNeighbor === this.waterTile && leftNeighbor === this.waterTile) {
                        cellDiv.style.backgroundImage = "url('./assets/map/waterCorner2-4.webp')";
                    } else if (i > 0 && j < map[i].length - 1 && topNeighbor === this.waterTile && rightNeighbor === this.waterTile && bottomNeighbor === this.landTile && leftNeighbor === this.landTile) {
                        cellDiv.style.backgroundImage = "url('./assets/map/waterCorner2-2.webp')";
                    } else if (i > 0 && j < map[i].length - 1 && topNeighbor === this.landTile && rightNeighbor === this.waterTile && bottomNeighbor === this.waterTile && leftNeighbor === this.landTile) {
                        cellDiv.style.backgroundImage = "url('./assets/map/waterCorner2-3.webp')";
                    } else if (i > 0 && j < map[i].length - 1 && topNeighbor === this.waterTile && rightNeighbor === this.landTile && bottomNeighbor === this.landTile && leftNeighbor === this.waterTile) {
                        cellDiv.style.backgroundImage = "url('./assets/map/waterCorner2-1.webp')";
                    } else if (i > 0 && j < map[i].length - 1 && rightNeighbor === this.landTile && leftNeighbor === this.waterTile) {
                        cellDiv.style.backgroundImage = "url('./assets/map/waterWall2.webp')";
                    } else if (i > 0 && j < map[i].length - 1 && rightNeighbor === this.waterTile && leftNeighbor === this.landTile) {
                        cellDiv.style.backgroundImage = "url('./assets/map/waterWall4.webp')";
                    } else if (i > 0 && j < map[i].length - 1 && topNeighbor === this.waterTile && bottomNeighbor === this.landTile) {
                        cellDiv.style.backgroundImage = "url('./assets/map/waterWall3.webp')";
                    } else if (i > 0 && j < map[i].length - 1 && topNeighbor === this.landTile && bottomNeighbor === this.waterTile) {
                        cellDiv.style.backgroundImage = "url('./assets/map/waterWall1.webp')";
                    } else if (i > 0 && j < map[i].length - 1 && topLeftCorner === this.waterTile) {
                        cellDiv.style.backgroundImage = "url('./assets/map/waterCorner3.webp')";
                    } else if (i > 0 && j < map[i].length - 1 && topRightCorner === this.waterTile) {
                        cellDiv.style.backgroundImage = "url('./assets/map/waterCorner4.webp')";
                    } else if (i > 0 && j < map[i].length - 1 && bottomLeftCorner === this.waterTile) {
                        cellDiv.style.backgroundImage = "url('./assets/map/waterCorner2.webp')";
                    } else if (i > 0 && j < map[i].length - 1 && bottomRightCorner === this.waterTile) {
                        cellDiv.style.backgroundImage = "url('./assets/map/waterCorner1.webp')";
                    } else {
                        cellDiv.style.backgroundImage = "url('./assets/map/ground.webp')";
                    }
                } else {
                    // If it's not land it's water
                    cellDiv.style.backgroundImage = "url('./assets/map/water.webp')";
                }
    
                // Add the cell div to the row div
                rowDiv.appendChild(cellDiv);
            }
    
            // Add the row div to the container
            container.appendChild(rowDiv);
        }
    }

    get getCenter() {
        return (`${this.size*16}`);
    }
}
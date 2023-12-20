const svgns = 'http://www.w3.org/2000/svg';

const transpose = (matrix) => {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
};

const chunkArrayInGroups = (arr, size) => {
    var myArray = [];
    for(var i = 0; i < arr.length; i += size) {
      myArray.push(arr.slice(i, i+size));
    }
    return myArray;
};

const fixOrientation = (squares, size) => {
    // makes top left = 1 and top right = 0
    // top left is always 1 due to the flood algorithm
    var chunked = chunkArrayInGroups(squares, size);

    if (chunked[0][size-1] == 0) {
        return chunked.flat();
    }
    return transpose(chunked).flat();
};

const createDot = (x, y) => {
    var dot = document.createElementNS(svgns, "circle")
    dot.setAttribute('cx', x)
    dot.setAttribute('cy', y)
    dot.setAttribute('r', 2)
    return dot
};

const createLine = (x1, y1, x2, y2) => {
    var line = document.createElementNS(svgns, "line")
    line.setAttribute('x1', x1)
    line.setAttribute('y1', y1)
    line.setAttribute('x2', x2)
    line.setAttribute('y2', y2)
    return line
};

const createHintSquare = (x, y) => {
    var square = document.createElementNS(svgns, "rect")
    square.setAttribute('x', x)
    square.setAttribute('y', y)
    square.setAttribute('width', 8)
    square.setAttribute('height', 8)
    return square
};

const drawPatternInHint = (pattern, squareSize, svg) => {
    if (svg === undefined) {
        svg = $("svg.hint");
        svg.removeClass("hidden");
    }
    let filled = svg.find(".filled");
    let empty = svg.find(".empty");
    filled.empty();
    empty.empty();
    svg.attr("viewBox", "0 0 " + (10 * squareSize) + " " + (10 * squareSize));
    const matrix = chunkArrayInGroups(pattern, squareSize);
    for (let i = 0; i <squareSize; i++) {
        for (let j = 0; j < squareSize; j++) {
            let square = createHintSquare(j * 10 + 1, i * 10 + 1);
            (matrix[i][j] == 1 ? filled : empty).append(square); 
        }
    }
};

const createDotGrid = (size) => {
    console.log("in")
    $("#lock").find(".lock-dots").html('');
    $("#lock").find(".constant-lines").html('');
    var squaresTemplate = new Array(size * size).fill(0);
    let svg = $("svg#lock");
    
    let dotsContainer = svg.find(".lock-dots");
    let constLinesContainer = svg.find(".constant-lines");

    const svgSize = (40 + 30 * size);
    svg.attr("viewBox", "0 0 " + svgSize + " " + svgSize);

    for (let i = 0; i < size + 1; i++) {
        for (let j = 0; j < size + 1; j++) {
            dotsContainer.append(
                createDot(20 + j*30, 20 + i*30)
            );
        }
    }

    constLinesContainer.append(
        createLine(20, 20, 20, svgSize - 20),
        createLine(20, 20, svgSize - 20, 20),
        createLine(svgSize - 20, 20, svgSize - 20, svgSize-20),
        createLine(20, svgSize - 20, svgSize - 20, svgSize-20)
    );
    return squaresTemplate;
};

// const ReverseTetris = (size,) => {
//     const test = () => {};

//     var squares = [
//         0,0,0,0,
//         0,0,0,0,
//         0,0,0,0,
//         0,0,0,0
//     ];
//     const size = 5;
//     const squareSize = size - 1;

//     const flood = (pos, value, barriers) => {
//         if (squares[pos] == value) {
//             return;
//         }
//         squares[pos] = value;

//         let topRight = (pos % squareSize) + size * Math.floor(pos / squareSize);
//         let bottomLeft = 1 + (pos % squareSize) + size * (1 + Math.floor(pos / squareSize));

//         // up
//         if ( 
//             Math.floor(pos / squareSize) != 0 && // is not top row
//             !barriers.some(edge => (
//                     (edge[0] === topRight && edge[1] === (topRight + 1)) || 
//                     (edge[1] === topRight && edge[0] === (topRight + 1))
//                 )
//             ) // no barrier
//         ) {
//             flood(pos - squareSize, value, barriers);
//         }
//         // left
//         if ( 
//             pos % squareSize != 0 && // is not letmost column
//             !barriers.some(edge => (
//                     (edge[0] === topRight && edge[1] === (topRight + size)) || 
//                     (edge[1] === topRight && edge[0] === (topRight + size))
//                 )
//             ) // no barrier
//         ) {
//             flood(pos - 1, value, barriers);
//         }
//         // bottom
//         if ( 
//             Math.floor(pos / squareSize) != squareSize - 1  && // is not top row
//             !barriers.some(edge => (
//                     (edge[0] === bottomLeft && edge[1] === (bottomLeft - 1)) || 
//                     (edge[1] === bottomLeft && edge[0] === (bottomLeft - 1))
//                 )
//             ) // no barrier
//         ) {
//             flood(pos + squareSize, value, barriers);
//         }
//         //right
//         if ( 
//             pos % squareSize != squareSize - 1 && // is not rightmost column
//             !barriers.some(edge => (
//                     (edge[0] === bottomLeft && edge[1] === (bottomLeft - size)) || 
//                     (edge[1] === bottomLeft && edge[0] === (bottomLeft - size))
//                 )
//             ) // no barrier
//         ) {
//             flood(pos + 1, value, barriers);
//         }
//     };
//     flood(0, 1, this.getPattern());
//     console.log(squares);
//     const isRotationallySymmetric = () => {
//         for (let i = 0; i < squares.length / 2; i++) {
//             if (squares[i] === squares[squares.length -1 - i]) {
//                 return false;
//             }
//         }
//         return true;
//     };

//     var reverseTetris = {
        
//     };
// };
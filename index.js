//sort and remove duplicates
const sampleData = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tempArray = []
const fixedArray = removeDuplicates(sortedArray(sampleData));

function sortedArray(array) {
    let currentArray = Array.from(array);
    if (currentArray.length <= 1) {
        return currentArray
    }
    else  {
        if (currentArray.length > 1) {
            let lArray = sortedArray(currentArray.toSpliced(array.length/2));
            let rArray = sortedArray( currentArray.toSpliced(0, array.length/2));
            return merge (lArray, rArray)
        }
    }
};
function merge (A, B) {
    let tempArray = [];
    let i = 0;
    let j = 0;

    for (let k = 0; k<A.length+B.length;k++) {
        if (A[i] < B[j]) {
            tempArray.push(A[i])
            i++;
        }
        else if (A[i] > B[j]) {
            tempArray.push(B[j]);
            j++
        }
        else {
            if (A[i]) {
                tempArray.push(A[i])
                i++

            }
            else {
                tempArray.push(B[j])
                j++
            }
        }
    }
    return tempArray
};
function removeDuplicates(array) {
    let tempArray = [array[0]];
    for (let i = 1; i< array.length;i++) {
        if (array[i-1] != array[i]) {
            tempArray.push(array[i])
        }
    }
    return tempArray
}
//actual tree project
const Node = function (value, left = null, right = null) {
    return {value, leftC:left, rightC:right}
};

const Tree = function (builtTree) {
    return {root:builtTree}
}
function buildTree(array) {
    if (array.length == 2) {
        let node = Node(array[0]);
        node.rightC = Node(array[1]);
        return node
    }
    else if (array.length == 1) {
        console.log(array[0])
        return Node(array[0])
    }
    else {
        let midPointIndex = Math.round(array.length/2)-1;
        let root = Node(array[midPointIndex]);
        root.leftC = buildTree(array.toSpliced(midPointIndex));
        root.rightC = buildTree(array.toSpliced(0, midPointIndex+1))
        return root
    }
};
//insert
function insert (val, pointer, previousPointer = null) {
    if (pointer == null) {
        pointer = Node(val);
        if (pointer.value<previousPointer.value) {
            previousPointer.leftC = pointer
        }
        else {
            previousPointer.rightC=pointer
        }
    }
    else if (val == pointer.value) {
        return
    }
    else {
        if (val < pointer.value) {
            insert(val, pointer.leftC, pointer)
        }
        else {
            insert(val, pointer.rightC, pointer)
        }
    }
};

//deleteItem
function deleteItem(value, pointer, previousPointer=null) {
    //base case
    if (pointer.value == value) {
        //case of the leaf node
        if (pointer.leftC == null && pointer.rightC == null) {
            //assign the node
            if (previousPointer.leftC!= null && previousPointer.leftC.value == value) {
                previousPointer.leftC = null
            }
            else {
                previousPointer.rightC = null
            }
        }
        //case on a single child node
        else if (pointer.leftC == null || pointer.rightC == null) {

            //store the single child
            let tempObj = (()=>{
                if (pointer.leftC != null) {
                    return pointer.leftC
                }
                else {
                    return pointer.rightC
                }
            })()
            if (previousPointer.leftC.value == value) {
                    previousPointer.leftC = tempObj
            }
            else {
                previousPointer.rightC = tempObj
            }
        }
        //case of a doble child node
        else if (pointer.leftC !=null && pointer.rightC!=null){
            let originalPointer = pointer;
            pointer = pointer.rightC;
            (function findSmallest(pointer, previousPointer = null) {
                if (pointer.leftC == null) {
                    originalPointer.value = pointer.value;
                    if (previousPointer != null) {
                       previousPointer.leftC = pointer.rightC; 
                    }
                    else {
                        originalPointer.rightC = pointer.rightC
                    }
                    
                }
                else {
                    findSmallest(pointer.leftC, pointer)
                }
            }) (pointer);
        }
    }
    //recurse
    else {
        if(value<pointer.value) {
            deleteItem(value, pointer.leftC, pointer)
        }
        else {
            deleteItem(value, pointer.rightC, pointer)
        }
        
    }
};

//find
function find(value, pointer = myTree.root) {
    
    if (value == pointer.value) {
        return pointer
    }
    else {
        if(value<pointer.value) {
            return find(value, pointer.leftC)
        }
        else {
            return find(value, pointer.rightC)
        }
    }
}

//levelOrder (il return e il callback non va bene. così è da ridefinire all'utilizzo invece di chiamarla)
function levelOrder(root) {
    let defaultArrayRetorned = [];
    (function recurse(callStack = [root], callback = ()=> {defaultArrayRetorned.push(callStack[0])}) {
        //add CS[0]'s children
        if (callStack[0].leftC != null) {
            callStack.push(callStack[0].leftC)
        }
        if (callStack[0].rightC != null) {
            callStack.push(callStack[0].rightC)
        }
        callback();
        callStack.splice(0,1);
        if (callStack.length>0) {
            recurse(callStack)
        }
        
    }) ();
    console.log(defaultArrayRetorned) 
}
//in order traversal
function inOrder(callback, node = myTree.root) {
    //left
    if (node.leftC != null) {
        inOrder(callback, node.leftC)
    }
    //right
    if (node.rightC != null) {
        callback(node)
        inOrder(callback, node.rightC)
    }
    else {
        callback(node)
    }
};
//pre order traversal
function preOrder (callback, node = myTree.root) {
    callback(node)
    //left
    if (node.leftC != null) {
        preOrder(defaultCallback, node.leftC)
    }
    //right
    if (node.rightC != null) {
        preOrder(defaultCallback, node.rightC)
    }
};
//post order traversal
function postOrder(callback, node=myTree.root) {
    //left
    if (node.leftC != null) {
        postOrder(defaultCallback, node.leftC)
    }
    //right
    if (node.rightC != null) {
        postOrder(defaultCallback, node.rightC)
    }
    callback(node)
};
//default callback
let defaultArrayRetorned = [];
function defaultCallback(node) {
    defaultArrayRetorned.push(node)
};
// console.log(defaultArrayRetorned);

//height
function height(node, counter = 0) {
    if (node.leftC != null) {
        var left = height(node.leftC, counter+1)
    }
    else {
        var left = counter;
    }
    if (node.rightC != null) {
        var right = height(node.rightC, counter+1)
    }
    else {
        var right = counter
    }
    if(left>right) {
        return left
    }
    else {
        return right
    }
};
//depth
function depth (value,node = myTree.root, counter = 0) {
    if (node.value == value) {
        
        return counter
    }
    else if (value < node.value) {
        return depth(value, node.leftC, counter+1)
    }
    else {
        return depth(value, node.rightC, counter+1)
    }
};
//isBalanced
function isBalanced(node = myTree.root) {
    if (node.leftC == null && node.rightC == null) {
        return true
    }
    else {
        let left = 0;
        let right = 0;
        let isLeftBalanced = true;
        let isRightBalanced = true;
        //se left esiste, assegna valore
        if (node.leftC != null) {
            left = height(node.leftC)+1
        }
        //se right esiste, assegna valore
        if (node.rightC != null) {
            right = height(node.rightC)+1 
        }
        //compara left e right
        if (left == right || left+1 == right || left-1 == right) {
            if (node.leftC != null) {
                isLeftBalanced= isBalanced(node.leftC);
            }
            if (node.rightC != null) {
                isRightBalanced= isBalanced(node.rightC);
            }
            if(isLeftBalanced==true && isRightBalanced == true) {
                return true
            }
            else {
                return false
            }
        }
        else {
            return false
        }
    }
};
//rebalance
function rebalance(node = myTree.root) {
    let tempNodesArray = [];
    let tempValuesArray = [];
    inOrder((node)=>{
        tempNodesArray.push(node)
    }, node);
    for (let i = 0; i<tempNodesArray.length; i++) {
        tempValuesArray.push(tempNodesArray[i].value);
    }
    return Tree(buildTree(tempValuesArray))
};

//test
const myTree = Tree(buildTree(fixedArray));

//insert test
insert(2, myTree.root);
insert(6, myTree.root);
insert(.5, myTree.root);
insert(1.5, myTree.root);
insert(3.5, myTree.root);
insert(3.6, myTree.root);
// insert(300, myTree.root);
// insert(305, myTree.root);
insert(4.5, myTree.root);
insert(4.55, myTree.root);
insert(4.45, myTree.root);
insert(7.5, myTree.root);
insert(6.5, myTree.root);
insert(.45, myTree.root);
// insert(6352, myTree.root);
// insert(6350, myTree.root);

//deleteItem test
// deleteItem(8, myTree.root);
// deleteItem(9, myTree.root);
// deleteItem(23, myTree.root);
//find
// console.log(find(67))
//levelOrder
// levelOrder(myTree.root)
//inOrder
// inOrder(defaultCallback);
//preOrder
// preOrder(defaultCallback);
//postOrder
// postOrder(defaultCallback);
//height
// console.log(height(find(67)));
//depth
// console.log(depth(6345))
//isBalanced
// console.log(isBalanced())
//rebalance
// rebalance(myTree.root);
// prettyPrint(rebalance(myTree.root).root);

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.rightC !== null) {
      prettyPrint(node.rightC, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftC !== null) {
      prettyPrint(node.leftC, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  prettyPrint(myTree.root);
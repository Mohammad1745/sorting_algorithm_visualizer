let heapSort = {
    sort: (input, animation) => {
        heapSort.heapify(input, animation) // O(n)
        // or createHeapWithInsertion(input) // O(n*log n)
        heapSort.deleteHeap(input, animation) // O(n*log n)
    },

    createHeapWithInsertion: (array) => {
        for (let i=1; i<array.length; i++) {
            let nodeIndex = i
            let parentIndex = heapSort.parentIndex(nodeIndex)
            while (parentIndex >= 0 && array[nodeIndex] > array[parentIndex]) {
                switchElement(array, nodeIndex, parentIndex)
                nodeIndex = parentIndex
                parentIndex = heapSort.parentIndex(nodeIndex)
            }
        }
    },

    heapify: (array, animation) => {
        let arrayLength = array.length
        for (let i=arrayLength-1; i>=0; i--) {
            let nodeIndex = i
            let leftChildIndex = heapSort.leftChildIndex(nodeIndex)
            let rightChildIndex = heapSort.rightChildIndex(nodeIndex)

            let condition = (
                leftChildIndex < arrayLength && array[leftChildIndex] > array[nodeIndex] ||
                rightChildIndex < arrayLength && array[rightChildIndex] > array[nodeIndex]
            )

            animation.push({indices: [nodeIndex], state:'creation'})
            while (condition) {
                if (rightChildIndex >= arrayLength || array[leftChildIndex] > array[rightChildIndex]) {
                    animation.push({indices:[nodeIndex, leftChildIndex], move:true, state:'creation'})
                    switchElement(array, nodeIndex, leftChildIndex)
                    nodeIndex = leftChildIndex
                }
                else {
                    animation.push({indices:[nodeIndex, rightChildIndex], move:true, state:'creation'})
                    switchElement(array, nodeIndex, rightChildIndex)
                    nodeIndex = rightChildIndex
                }
                leftChildIndex = heapSort.leftChildIndex(nodeIndex)
                rightChildIndex = heapSort.rightChildIndex(nodeIndex)
                condition = (
                    leftChildIndex < arrayLength && array[leftChildIndex] > array[nodeIndex] ||
                    rightChildIndex < arrayLength && array[rightChildIndex] > array[nodeIndex]
                )
            }
            animation.push({refresh: true})
        }
    },
    //100, 150, 200, 250, 300, 350, 400
    deleteHeap: (array, animation) => {
        for (let heapLength=array.length; heapLength>0; heapLength--) {
            let nodeIndex = 0
            let deletedNode = array[nodeIndex]
            array[nodeIndex] = array[heapLength-1]
            animation.push({indices: [nodeIndex], state:'deletion'})
            animation.push({indices: [nodeIndex, heapLength-1], move: true ,state:'deletion'})

            let leftChildIndex = heapSort.leftChildIndex(nodeIndex)
            let rightChildIndex = heapSort.rightChildIndex(nodeIndex)

            let condition = (
                leftChildIndex < heapLength && array[leftChildIndex] > array[nodeIndex] ||
                rightChildIndex < heapLength && array[rightChildIndex] > array[nodeIndex]
            )

            while (condition) {
                if (rightChildIndex >= heapLength || array[leftChildIndex] > array[rightChildIndex]) {
                    animation.push({indices:[nodeIndex, leftChildIndex], move:true, state:'switching'})
                    switchElement(array, nodeIndex, leftChildIndex)
                    nodeIndex = leftChildIndex
                }
                else {
                    animation.push({indices:[nodeIndex, rightChildIndex], move:true, state:'switching'})
                    switchElement(array, nodeIndex, rightChildIndex)
                    nodeIndex = rightChildIndex
                }
                leftChildIndex = heapSort.leftChildIndex(nodeIndex)
                rightChildIndex = heapSort.rightChildIndex(nodeIndex)
                condition = (
                    leftChildIndex < heapLength && array[leftChildIndex] > array[nodeIndex] ||
                    rightChildIndex < heapLength && array[rightChildIndex] > array[nodeIndex]
                )
            }
            array[heapLength-1] = deletedNode
            animation.push({refresh: true})
        }
    },

    parentIndex: index => Math.floor((index+1)/2) - 1,
    leftChildIndex: index => (index+1)*2 - 1,
    rightChildIndex: index => (index+1)*2
}
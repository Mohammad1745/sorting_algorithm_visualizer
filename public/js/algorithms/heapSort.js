let heapSort = {
    sort: (input, animation) => {
        console.log(input, 'input')
        heapSort.heapify(input) // O(n)
        // or createHeapWithInsertion(input) // O(n*log n)
        console.log(input, 'heap')
        heapSort.deleteHeap(input) // O(n*log n)
        console.log(input, 'output')
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

    heapify: (array) => {
        let arrayLength = array.length
        for (let i=arrayLength-1; i>=0; i--) {
            let nodeIndex = i
            let leftChildIndex = heapSort.leftChildIndex(nodeIndex)
            let rightChildIndex = heapSort.rightChildIndex(nodeIndex)

            let condition = (
                leftChildIndex < arrayLength && array[leftChildIndex] > array[nodeIndex] ||
                rightChildIndex < arrayLength && array[rightChildIndex] > array[nodeIndex]
            )

            while (condition) {
                if (rightChildIndex >= arrayLength || array[leftChildIndex] > array[rightChildIndex]) {
                    switchElement(array, nodeIndex, leftChildIndex)
                    nodeIndex = leftChildIndex
                }
                else {
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
        }
    },

    deleteHeap: (array) => {
        for (let heapLength=array.length; heapLength>0; heapLength--) {
            let nodeIndex = 0
            let deletedNode = array[nodeIndex]
            array[nodeIndex] = array[heapLength-1]

            let leftChildIndex = heapSort.leftChildIndex(nodeIndex)
            let rightChildIndex = heapSort.rightChildIndex(nodeIndex)

            let condition = (
                leftChildIndex < heapLength && array[leftChildIndex] > array[nodeIndex] ||
                rightChildIndex < heapLength && array[rightChildIndex] > array[nodeIndex]
            )

            while (condition) {
                if (rightChildIndex >= heapLength || array[leftChildIndex] > array[rightChildIndex]) {
                    switchElement(array, nodeIndex, leftChildIndex)
                    nodeIndex = leftChildIndex
                }
                else {
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
        }
    },

    parentIndex: index => Math.floor((index+1)/2) - 1,
    leftChildIndex: index => (index+1)*2 - 1,
    rightChildIndex: index => (index+1)*2
}
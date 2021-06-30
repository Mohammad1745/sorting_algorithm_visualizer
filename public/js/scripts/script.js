let array = [1]
let arrayLength = 50
let modes = {initial: 1, sorting: 2, done:3}
let algorithms = {
    mergeSort: {key:1, name: "Merge Sort", description: `The time complexity of Merge Sort is O(n*Log n) in all the 3 cases (worst, average and best).As the mergesort always divides the array into two halves and takes linear time to merge two halves. The space complexity of Merge sort is O(n).The space complexity of Merge sort is O(n). <br> <a href="https://youtu.be/TzeBrDU-JaY" target="_blank">Learn more...</a>`},
    quickSort: {key:2, name: "Quick Sort", description: `The time complexity of Quick Sort is O(n^2) in worst case and O(n*Log n) in average and best cases. The in-place version of quicksort has a space complexity of O(log n), even in the worst case. This unstable partition requires O(1) space. <br> <a href="https://youtu.be/0SkOjNaO1XY" target="_blank">Learn more...</a>`},
    bubbleSort: {key:3, name: "Bubble Sort", description: `The time complexity of Bubble Sort is O(n^2) in worst and average cases and O(n) in best case. It has the space complexity of O(1). <br> <a href="https://youtu.be/Jdtq5uKz-w4" target="_blank">Learn more...</a>`},
    selectionSort: {key:4, name: "Selection Sort", description: `The time complexity of Selection Sort is O(n^2) in worst and average cases and O(n^2) in best case. It has the space complexity of O(1). <br> <a href="https://youtu.be/GUDLRan2DWM" target="_blank">Learn more...</a>`},
    insertionSort: {key:5, name: "Insertion Sort", description: `The time complexity of Insertion Sort is O(n^2) in all the 3 cases (worst, average and best). It has the space complexity of O(1). <br> <a href="https://youtu.be/i-SKeOcBwko" target="_blank">Learn more...</a>`},
}
let indicatorPanelContent = {
    mergeSort: `<div class="node node-sorted node-example ml-3" id="sorted_node_example"></div><div class="text-light ml-2">Sorted</div>
                <div class="ml-3 text-light">|</div>
                <div class="node node-unsorted node-example ml-3" id="unsorted_node_example"></div><div class="text-light ml-2">Unsorted</div>
                <div class="ml-3 text-light">|</div>`,
    quickSort: `<div class="node node-sorted node-example ml-3" id="sorted_node_example"></div><div class="text-light ml-2">Sorted</div>
                <div class="ml-3 text-light">|</div>
                <div class="node node-unsorted node-example ml-3" id="unsorted_node_example"></div><div class="text-light ml-2">Unsorted</div>
                <div class="ml-3 text-light">|</div>
                <div class="node node-pivot ml-3" id="pivot_node_example"></div><div class="text-light ml-2">Pivot</div>
                <div class="ml-3 text-light">|</div>`,
    bubbleSort: `<div class="node node-sorted node-example ml-3" id="sorted_node_example"></div><div class="text-light ml-2">Sorted</div>
                <div class="ml-3 text-light">|</div>
                <div class="node node-unsorted node-example ml-3" id="unsorted_node_example"></div><div class="text-light ml-2">Unsorted</div>
                <div class="ml-3 text-light">|</div>`,
    selectionSort: `<div class="node node-position ml-3" id="position_node_example"></div><div class="text-light ml-2">Position</div>
                    <div class="ml-3 text-light">|</div>
                    <div class="node node-minimum ml-3" id="minimum_node_example"></div><div class="text-light ml-2">Minimum</div>
                    <div class="ml-3 text-light">|</div>`,
    insertionSort: `<div class="node node-position ml-3" id="position_node_example"></div><div class="text-light ml-2">Position</div>
                    <div class="ml-3 text-light">|</div>
                    <div class="node node-scanner ml-3" id="scanner_node_example"></div><div class="text-light ml-2">Scanner</div>
                    <div class="ml-3 text-light">|</div>`,
}
let mode = modes.initial
let algorithm = algorithms.mergeSort

const SEARCH_TIME = 10000
const RUNNING_SORTING_MESSAGE = "Sorting is ongoing"

document.addEventListener('DOMContentLoaded', () => {
    array = generateArray(arrayLength)
    showAlgorithmList()
    updateVisualizerButton()
    updateIndicatorPanel()
    updateAlgorithmInfo()
    plotGraph()
    handleUserEvent()
})

function handleUserEvent () {
    algorithmInputHandler()
    visualizerButtonHandler()
    resetButtonHandler()
    sizeSliderHandler()
    algorithmInfoHandler()
    customInputHandler()
}

function showAlgorithmList() {
    let algorithmList = document.querySelector('#algorithm_list')
    Object.keys(algorithms).map(index => {
        algorithmList.insertAdjacentHTML('beforeend', `<a class="dropdown-item cursor-pointer" id="algorithm_${algorithms[index].key}">${algorithms[index].name}</a>`)
    })
}

function algorithmInputHandler() {
    let mergeSortAlgorithm = document.querySelector('#algorithm_list').querySelector(`#algorithm_${algorithms.mergeSort.key}`)
    mergeSortAlgorithm.addEventListener('click', () => {
        algorithm = algorithms.mergeSort
        updateVisualizerButton()
        updateIndicatorPanel()
        updateAlgorithmInfo()
    })
    let quickSortAlgorithm = document.querySelector('#algorithm_list').querySelector(`#algorithm_${algorithms.quickSort.key}`)
    quickSortAlgorithm.addEventListener('click', () => {
        algorithm = algorithms.quickSort
        updateVisualizerButton()
        updateIndicatorPanel()
        updateAlgorithmInfo()
    })
    let bubbleSortAlgorithm = document.querySelector('#algorithm_list').querySelector(`#algorithm_${algorithms.bubbleSort.key}`)
    bubbleSortAlgorithm.addEventListener('click', () => {
        algorithm = algorithms.bubbleSort
        updateVisualizerButton()
        updateIndicatorPanel()
        updateAlgorithmInfo()
    })
    let selectionSortAlgorithm = document.querySelector('#algorithm_list').querySelector(`#algorithm_${algorithms.selectionSort.key}`)
    selectionSortAlgorithm.addEventListener('click', () => {
        algorithm = algorithms.selectionSort
        updateVisualizerButton()
        updateIndicatorPanel()
        updateAlgorithmInfo()
    })
    let insertionSortAlgorithm = document.querySelector('#algorithm_list').querySelector(`#algorithm_${algorithms.insertionSort.key}`)
    insertionSortAlgorithm.addEventListener('click', () => {
        algorithm = algorithms.insertionSort
        updateVisualizerButton()
        updateIndicatorPanel()
        updateAlgorithmInfo()
    })
}

function visualizerButtonHandler () {
    let visualizerButton = document.querySelector('#visualize_btn')
    let statusMessage = document.querySelector('#status_message')
    visualizerButton.addEventListener('click', async event => {
        if (mode===modes.initial||mode===modes.done){
            mode = modes.sorting
            statusMessage.innerHTML = ''
            statusMessage.insertAdjacentHTML('beforeend', `Sorting <i class="fas fa-spinner"></i>`)
            let animation = []
            if (algorithm.key===algorithms.mergeSort.key) {
                mergeSort.sort([...array], animation)
                await visualizer.mergeSort(animation)
            }
            if (algorithm.key===algorithms.quickSort.key) {
                quickSort.sort([...array], animation)
                await visualizer.quickSort(animation)
            }
            if (algorithm.key===algorithms.bubbleSort.key) {
                bubbleSort.sort([...array], animation)
                await visualizer.bubbleSort(animation)
            }
            if (algorithm.key===algorithms.selectionSort.key) {
                selectionSort.sort([...array], animation)
                await visualizer.selectionSort(animation)
            }
            if (algorithm.key===algorithms.insertionSort.key) {
                insertionSort.sort([...array], animation)
                await visualizer.insertionSort(animation, true)
            }
            let movesCount = animation.filter(set => !set.sorted).length
            statusMessage.innerHTML = `Sorting Completed | Total Moves: ${movesCount}`
            mode = modes.done
        }
    })
}

function resetButtonHandler () {
    let resetButton = document.querySelector('#reset_btn')
    resetButton.addEventListener('click', async event => {
        if (mode===modes.initial||mode===modes.done){
            let statusMessage = document.querySelector('#status_message')
            statusMessage.innerHTML = ''
            array = generateArray(arrayLength)
            resetGraph()
            mode = modes.initial
        }
    })
}

function sizeSliderHandler () {
    let sizeSlider = document.querySelector('#size_slider')
    sizeSlider.addEventListener('input', event => {
        if (mode===modes.initial||mode===modes.done){
            arrayLength = sizeSlider.value
            array = generateArray(arrayLength)
            resetGraph()
        }
    })
}

function customInputHandler() {
    let customInputButton = document.querySelector('#custom_input_btn')
    customInputButton.addEventListener('click', event => {
        if (mode===modes.initial||mode===modes.done){
            let customInput = document.querySelector('#custom_input')
            customInput.style.display = "flex"
        }
        else alert(RUNNING_SORTING_MESSAGE)
    })
    let customInputCancelButton = document.querySelector('#custom_input_cancel_btn')
    customInputCancelButton.addEventListener('click', event => {
        let customInput = document.querySelector('#custom_input')
        customInput.style.display = "none"
    })
    let customInputSubmitButton = document.querySelector('#custom_input_submit_btn')
    customInputSubmitButton.addEventListener('click', event => {
        let customInputField = document.querySelector('#custom_input_field')
        let input = customInputField.value
        input = input.split(',').map(value => {
            let number = Number(value)
            if (number<5) number = 5
            if (number>500) number =500
            return number
        })
        if (input.includes(NaN)) alert('Invalid Input')
        else {
            array = input
            arrayLength = array.length
            plotGraph()
            customInputCancelButton.click()
        }
    })
}

function algorithmInfoHandler() {
    let algorithmInfoButton = document.querySelector('#graph_header').querySelector('.algorithm-info-btn')
    algorithmInfoButton.addEventListener('click', event => {
        let algorithmInfo = document.querySelector('#algorithm_info')
        algorithmInfo.style.display = "flex"
    })
    let algorithmInfoCancelButton = document.querySelector('#algorithm_info_cancel_btn')
    algorithmInfoCancelButton.addEventListener('click', event => {
        let algorithmInfo = document.querySelector('#algorithm_info')
        algorithmInfo.style.display = "none"
    })
}

function updateVisualizerButton() {
    let visualizerButton = document.querySelector('#visualize_btn')
    visualizerButton.innerHTML = `Visualize ${algorithm.name}`
    let algorithmMessage = document.querySelector('#algorithm_message')
    algorithmMessage.innerHTML = `${algorithm.name} Algorithm`
    let statusMessage = document.querySelector('#status_message')
    statusMessage.innerHTML = ``
}

function updateIndicatorPanel() {
    let indicatorPanel = document.querySelector('#indicator_panel')
    indicatorPanel.innerHTML = ''
    let key = 'merge'
    Object.keys(algorithms).map(index => {
        if (algorithms[index] === algorithm) key = index
    })
    indicatorPanel.insertAdjacentHTML('beforeend', indicatorPanelContent[key])
}

function updateAlgorithmInfo() {
    let algorithmInfoHeader = document.querySelector('#algorithm_info_header')
    let algorithmInfoBody = document.querySelector('#algorithm_info_body')
    algorithmInfoHeader.innerHTML = algorithm.name+" Algorithm"
    algorithmInfoBody.innerHTML = algorithm.description
}

function plotGraph(unsortedNodes=[]) {
    let graphBody = document.querySelector('#graph_body')
    let nodeWidth = Math.floor(graphBody.offsetWidth/array.length*0.6)
    graphBody.innerHTML = ''
    array.map( (number, index) => {
        graphBody.insertAdjacentHTML('beforeend', `<div class="node text-white text-center" id="node_${index}">${number}</div>`)
        let node = graphBody.querySelector(`#node_${index}`)
        node.style.height = number+"px"
        node.style.width = nodeWidth+"px"
        node.style.fontSize = (nodeWidth/3)+"px"

        let indices = unsortedNodes.filter(indices => indices.index===index)
        if (unsortedNodes.length && indices.length) {
            node.classList.add(indices[0].className)
        }
    })
}

function resetGraph() {
    let graphBody = document.querySelector('#graph_body')
    graphBody.innerHTML = ''
    plotGraph()
}
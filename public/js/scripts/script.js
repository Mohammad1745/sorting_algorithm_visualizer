let array = [1]
let arrayLength = 50
let modes = {initial: 1, sorting: 2, done:3}
let algorithms = {
    mergeSort: {key:1, name: "Merge Sort", description: `Merge Sort`},
    bubbleSort: {key:2, name: "Bubble Sort", description: `Bubble Sort`},
    quickSort: {key:3, name: "Quick Sort", description: `Quick Sort`},
}
let mode = modes.initial
let algorithm = algorithms.mergeSort

const SEARCH_TIME = 10000
const RESET_GRAPH_MESSAGE = "Reset Graph First"

document.addEventListener('DOMContentLoaded', () => {
    array = generateArray(arrayLength)
    showAlgorithmList()
    updateVisualizerButton()
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
    })
    let bubbleSortAlgorithm = document.querySelector('#algorithm_list').querySelector(`#algorithm_${algorithms.bubbleSort.key}`)
    bubbleSortAlgorithm.addEventListener('click', () => {
        algorithm = algorithms.bubbleSort
        updateVisualizerButton()
    })
    let quickSortAlgorithm = document.querySelector('#algorithm_list').querySelector(`#algorithm_${algorithms.quickSort.key}`)
    quickSortAlgorithm.addEventListener('click', () => {
        algorithm = algorithms.quickSort
        updateVisualizerButton()
    })
}

function visualizerButtonHandler () {
    let visualizerButton = document.querySelector('#visualize_btn')
    let statusMessage = document.querySelector('#status_message')
    visualizerButton.addEventListener('click', async event => {
        mode = modes.sorting
        statusMessage.innerHTML = ''
        statusMessage.insertAdjacentHTML('beforeend', `Sorting <i class="fas fa-spinner"></i>`)
        let animation = []
        if (algorithm.key===algorithms.mergeSort.key) {
            mergeSort.sort([...array], animation)
        }
        if (algorithm.key===algorithms.bubbleSort.key) {
            bubbleSort.sort([...array], animation)
        }
        if (algorithm.key===algorithms.quickSort.key) {
            quickSort.sort([...array], animation)
        }
        let movesCount = animation.filter(set => !set.sorted).length
        await visualizeSortingAnimation(animation)

        statusMessage.innerHTML = `Sorting Completed | Total Moves: ${movesCount}`
        mode = modes.done
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

function algorithmInfoHandler() {
    let algorithmInfoButton = document.querySelector('#graph_header').querySelector('.algorithm-info-btn')
    algorithmInfoButton.addEventListener('click', event => {
        let algorithmInfo = document.querySelector('#algorithm_info')
        let algorithmInfoHeader = document.querySelector('#algorithm_info_header')
        let algorithmInfoBody = document.querySelector('#algorithm_info_body')
        algorithmInfoHeader.innerHTML = algorithm.name+" Algorithm"
        algorithmInfoBody.innerHTML = algorithm.description
        algorithmInfo.style.display = "flex"
    })
    let algorithmInfoCancelButton = document.querySelector('#algorithm_info_cancel_btn')
    algorithmInfoCancelButton.addEventListener('click', event => {
        let algorithmInfo = document.querySelector('#algorithm_info')
        algorithmInfo.style.display = "none"
    })
}

function customInputHandler() {
    let customInputButton = document.querySelector('#custom_input_btn')
    customInputButton.addEventListener('click', event => {
        let customInput = document.querySelector('#custom_input')
        customInput.style.display = "flex"
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

function updateVisualizerButton() {
    let visualizerButton = document.querySelector('#visualize_btn')
    visualizerButton.innerHTML = `Visualize ${algorithm.name}`
    let algorithmMessage = document.querySelector('#algorithm_message')
    algorithmMessage.innerHTML = `${algorithm.name} Algorithm`
    let statusMessage = document.querySelector('#status_message')
    statusMessage.innerHTML = ``
}

function plotGraph(unsorted=[]) {
    let graphBody = document.querySelector('#graph_body')
    let nodeWidth = Math.floor(graphBody.offsetWidth/array.length*0.6)
    graphBody.innerHTML = ''
    array.map( (number, index) => {
        graphBody.insertAdjacentHTML('beforeend', `<div class="node text-white text-center" id="node_${index}">${number}</div>`)
        let node = graphBody.querySelector(`#node_${index}`)
        node.style.height = number+"px"
        node.style.width = nodeWidth+"px"
        node.style.fontSize = (nodeWidth/3)+"px"
        if (unsorted.length && unsorted.includes(index)) {
            if (unsorted[2] === index) node.classList.add('node-pivot')
            else node.classList.add('node-unsorted')
        }
    })
}

function resetGraph() {
    let graphBody = document.querySelector('#graph_body')
    graphBody.innerHTML = ''
    plotGraph()
}

async function visualizeSortingAnimation(animation) {
    for (let set of animation) {
        if (set.indices.length===2) {
            await visualizeDoubleNodes(set, animation)
        } else if (set.indices.length===3) {
            await visualizeTripleNodes(set, animation)
        }
    }
}

async function visualizeDoubleNodes(set, animation) {
    let nodes = []
    set.indices.map( index => {
        nodes.push(document
            .querySelector('#graph_body')
            .querySelector(`#node_${index}`))
    })
    nodes.map(node =>  node.classList.add(set.sorted ? 'node-sorted' : 'node-unsorted'))
    await sleep(SEARCH_TIME/animation.length)
    if (!set.sorted) {
        let temp = array[set.indices[1]]
        for (let i=set.indices[1]; i>set.indices[0]; i--) {
            array[i] = array[i-1]
        }
        array[set.indices[0]] = temp
        let newNodes = [set.indices[0], set.indices[0]+1]
        plotGraph(newNodes)
        await sleep(SEARCH_TIME/(animation.length*2))
        newNodes.map(index => {
            let node = document.querySelector('#graph_body').querySelector(`#node_${index}`)
            node.classList.remove('node-unsorted')
        })
        await sleep(SEARCH_TIME/(animation.length*2))
    } else {
        nodes.map((node) => node.classList.remove('node-sorted'))
    }
}

async function visualizeTripleNodes(set, animation) {
    let nodes = []
    set.indices.map( index => {
        nodes.push(document
            .querySelector('#graph_body')
            .querySelector(`#node_${index}`))
    })
    nodes.map((node, index) => {
        if (index===2) node.classList.add(set.sorted ? 'node-sorted' : 'node-pivot')
        else node.classList.add(set.sorted ? 'node-sorted' : 'node-unsorted')
    })
    await sleep(SEARCH_TIME/animation.length)
    if (!set.sorted) {
        let temp = array[set.indices[1]]
        array[set.indices[1]] = array[set.indices[0]]
        array[set.indices[0]] = temp
        set.indices[1]===set.indices[2] ? plotGraph([set.indices[0], set.indices[1]]) : plotGraph(set.indices)
        await sleep(SEARCH_TIME/(animation.length*2))
        set.indices.map(index => {
            let node = document.querySelector('#graph_body').querySelector(`#node_${index}`)
            node.classList.remove('node-unsorted', 'node-pivot')
        })
        await sleep(SEARCH_TIME/(animation.length*2))
    } else {
        nodes.map((node) => node.classList.remove('node-sorted', 'node-pivot'))
    }
}
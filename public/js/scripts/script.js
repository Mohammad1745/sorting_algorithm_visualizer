let array = [50,40,30,20,10]
let modes = {initial: 1, sorting: 2, done:3}
let algorithms = {
    mergeSort: {key:6, name: "Merge Sort", description: `Merge Sort`},
}
let mode = modes.initial
let algorithm = algorithms.mergeSort

const SEARCH_TIME = 20
const RESET_GRAPH_MESSAGE = "Reset Graph First"

document.addEventListener('DOMContentLoaded', () => {
    showAlgorithmList()
    updateVisualizerButton()
    plotGraph()
    handleUserEvent()
})

function handleUserEvent () {
    algorithmInputHandler()
    visualizerButtonHandler()
    resetButtonHandler()
    algorithmInfoHandler()
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
}

function visualizerButtonHandler () {
    let visualizerButton = document.querySelector('#visualize_btn')
    let statusMessage = document.querySelector('#status_message')
    visualizerButton.addEventListener('click', async event => {
        if (mode === modes.done) {
            resetGraph()
        }
        mode = modes.sorting
        statusMessage.innerHTML = ''
        statusMessage.insertAdjacentHTML('beforeend', `Sorting <i class="fas fa-spinner"></i>`)
        let result = {}
        if (algorithm.key===algorithms.mergeSort.key) {
            result = mergeSort.sort(array)
        }
        await visualizeSortingAnimation(result.animation)
        statusMessage.innerHTML = `Sorting Completed`
        mode = modes.done
    })
}

function resetButtonHandler () {
    let resetButton = document.querySelector('#reset_btn')
    resetButton.addEventListener('click', async event => {
        if (mode===modes.initial||mode===modes.done){
            let statusMessage = document.querySelector('#status_message')
            statusMessage.innerHTML = ''
            resetGraph()
            mode = modes.initial
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

function updateVisualizerButton() {
    let visualizerButton = document.querySelector('#visualize_btn')
    visualizerButton.innerHTML = `Visualize ${algorithm.name}`
    let algorithmMessage = document.querySelector('#algorithm_message')
    algorithmMessage.innerHTML = `${algorithm.name} Algorithm`
    let statusMessage = document.querySelector('#status_message')
    statusMessage.innerHTML = ``
}

function plotGraph() {
    let graphBody = document.querySelector('#graph_body')
    let nodeWidth = Math.floor(graphBody.offsetWidth/array.length*0.7)
    array.map( (number, index) => {
        graphBody.insertAdjacentHTML('beforeend', `<div class="node text-white text-center" id="node_${index}">${number}</div>`)
        let node = graphBody.querySelector(`#node_${index}`)
        node.style.height = number+"px"
        node.style.width = nodeWidth+"px"
    })
}

function resetGraph() {
    let graphBody = document.querySelector('#graph_body')
    let nodeSize = Math.floor(graphBody.offsetWidth-1)
}

async function activatePoint(point, delay=0) {
    let node = document
        .querySelector('#graph_body')
        .querySelector(`#node_row_${point[0]}`)
        .querySelector(`#node_${point[0]}_${point[1]}`)
    node.classList.add('node-initiate-activation')
    await sleep(delay)
    node.classList.remove('node-initiate-activation')
    node.classList.add('node-active')
}

async function visualizeSortingAnimation(animation) {
    for(let point of animation) {
        await activatePoint(point, Math.round(SEARCH_TIME))
    }
}
let array = [1]
let arrayLength = 5
let modes = {initial: 1, sorting: 2, done:3}
let algorithms = {
    mergeSort: {key:6, name: "Merge Sort", description: `Merge Sort`},
}
let mode = modes.initial
let algorithm = algorithms.mergeSort

const SEARCH_TIME = 5000
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
        // if (mode === modes.done) {
        //     resetGraph()
        // }
        mode = modes.sorting
        statusMessage.innerHTML = ''
        statusMessage.insertAdjacentHTML('beforeend', `Sorting <i class="fas fa-spinner"></i>`)
        let result = {}
        let animation = []
        if (algorithm.key===algorithms.mergeSort.key) {
            console.log(array, 'input')
            result = mergeSort.sort([...array], animation)
            console.log(result, 'result')
        }
        await visualizeSortingAnimation(animation)
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
    graphBody.innerHTML = ''
    array.map( (number, index) => {
        graphBody.insertAdjacentHTML('beforeend', `<div class="node text-white text-center" id="node_${index}">${number}</div>`)
        let node = graphBody.querySelector(`#node_${index}`)
        node.style.height = number+"px"
        node.style.width = nodeWidth+"px"
        node.style.fontSize = (nodeWidth/3)+"px"
    })
}

function resetGraph() {
    let graphBody = document.querySelector('#graph_body')
    graphBody.innerHTML = ''
    plotGraph()
}

async function visualizeSortingAnimation(animation) {
    for (let set of animation) {
        // console.log(array, 'before')
        if (set.hasOwnProperty('numbers')) {
            let indices = []
            let nodes = []
            set.numbers.map( number => {
                let index = array.indexOf(number)
                indices.push(index)
                nodes.push(document
                    .querySelector('#graph_body')
                    .querySelector(`#node_${index}`))
            })
            console.log(indices, set.numbers, 'from array')
            // console.log(set.indices, set.numbers, 'from animation')
            console.log(set.numbers)
            nodes.map(node => node.classList.add(set.sorted ? 'node-sorted' : 'node-not-sorted'))
            await sleep(SEARCH_TIME/animation.length)
            if (!set.sorted) {
                let temp = array[indices[1]]
                for (let i=indices[1]; i>indices[0]; i--) {
                    array[i] = array[i-1]
                }
                array[indices[0]] = temp
                plotGraph()
            } else {
                nodes.map(node => node.classList.remove('node-sorted'))
            }
        } else {

        }
        // console.log(array, 'after')
    }
    // array = result.output
    console.log(animation)
    // plotGraph()
}
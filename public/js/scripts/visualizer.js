let visualizer = {
    mergeSort: async animation => {
        for (let set of animation) {
            let nodes = visualizer.getNodes(set)
            nodes.map((node, index) => node.classList.add(set.sorted ? 'node-sorted' : 'node-unsorted'))
            await sleep(SEARCH_TIME/animation.length)
            if (!set.sorted) {
                let newNodes = [];
                newNodes.push({index: set.indices[0], className: 'node-unsorted'})
                newNodes.push({index: set.indices[0]+1, className: 'node-unsorted'})
                shiftElement(array, set.indices[0], set.indices[1])
                plotGraph(newNodes)
                await sleep(SEARCH_TIME/(animation.length*2))
                newNodes.map(nodeIndex => {
                    let node = document.querySelector('#graph_body').querySelector(`#node_${nodeIndex.index}`)
                    node.classList.remove('node-unsorted')
                })
                await sleep(SEARCH_TIME/(animation.length*2))
            } else {
                nodes.map((node) => node.classList.remove('node-sorted'))
            }
        }
    },

    quickSort: async animation => {
        for (let set of animation) {
            let nodes = visualizer.getNodes(set)
            nodes.map((node, index) => {
                if (index===0) node.classList.add('node-pivot')
                else node.classList.add(set.sorted ? 'node-sorted' : 'node-unsorted')
            })
            await sleep(SEARCH_TIME/animation.length)
            if (!set.sorted) {
                let newNodes = [];
                newNodes.push({index: set.indices[0], className: 'node-pivot'})
                newNodes.push({index: set.indices[1], className: 'node-unsorted'})
                if (set.indices.length>2) {
                    newNodes.push({index: set.indices[2], className: 'node-unsorted'})
                    switchElement(array, set.indices[1], set.indices[2])
                    plotGraph(newNodes)
                }
                else {
                    let temp = newNodes[0].className
                    newNodes[0].className = newNodes[1].className
                    newNodes[1].className = temp
                    switchElement(array, set.indices[1], set.indices[0])
                    plotGraph(newNodes)
                }
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
    },

    bubbleSort: async animation => {
        for (let set of animation) {
            let nodes = visualizer.getNodes(set)
            nodes.map((node, index) => node.classList.add(set.sorted ? 'node-sorted' : 'node-unsorted'))
            await sleep(SEARCH_TIME/animation.length)
            if (!set.sorted) {
                let newNodes = [];
                newNodes.push({index: set.indices[0], className: 'node-unsorted'})
                newNodes.push({index: set.indices[0]+1, className: 'node-unsorted'})
                shiftElement(array, set.indices[0], set.indices[1])
                plotGraph(newNodes)
                await sleep(SEARCH_TIME/(animation.length*2))
                newNodes.map(nodeIndex => {
                    let node = document.querySelector('#graph_body').querySelector(`#node_${nodeIndex.index}`)
                    node.classList.remove('node-unsorted')
                })
                await sleep(SEARCH_TIME/(animation.length*2))
            } else {
                nodes.map((node) => node.classList.remove('node-sorted'))
            }
        }
    },

    selectionSort: async animation => {
        for (let set of animation) {
            let nodes = visualizer.getNodes(set)
            nodes[0].classList.add(set.sorted ? 'node-sorted' : 'node-position')
            nodes[1].classList.add(set.sorted ? 'node-sorted' : 'node-minimum')
            await sleep(SEARCH_TIME/animation.length)
            if (!set.sorted) {
                let newNodes = [];
                newNodes.push({index: set.indices[0], className: 'node-minimum'})
                newNodes.push({index: set.indices[0]+1, className: 'node-position'})
                switchElement(array, set.indices[0], set.indices[1])
                plotGraph(newNodes)
                await sleep(SEARCH_TIME/(animation.length*2))
                newNodes.map(nodeIndex => {
                    let node = document.querySelector('#graph_body').querySelector(`#node_${nodeIndex.index}`)
                    node.classList.remove('node-position', 'node-minimum')
                })
                await sleep(SEARCH_TIME/(animation.length*2))
            } else {
                nodes.map((node) => node.classList.remove('node-sorted'))
            }
        }
    },

    insertionSort: async animation => {
        for (let set of animation) {
            let nodes = visualizer.getNodes(set)
            nodes[0].classList.add(set.sorted ? 'node-sorted' : 'node-position')
            nodes[1].classList.add(set.sorted ? 'node-sorted' : 'node-scanner')
            await sleep(SEARCH_TIME/animation.length)
            if (!set.sorted) {
                let newNodes = [];
                newNodes.push({index: set.indices[0], className: 'node-scanner'})
                newNodes.push({index: set.indices[0]+1, className: 'node-position'})
                shiftElement(array, set.indices[0], set.indices[1])
                plotGraph(newNodes)
                await sleep(SEARCH_TIME/(animation.length*2))
                newNodes.map(nodeIndex => {
                    let node = document.querySelector('#graph_body').querySelector(`#node_${nodeIndex.index}`)
                    node.classList.remove('node-position', 'node-scanner')
                })
                await sleep(SEARCH_TIME/(animation.length*2))
            } else {
                nodes.map((node) => node.classList.remove('node-sorted'))
            }
        }
    },

    heapSort: async animation => {
        await sleep(1300)
        for (let set of animation) {
            if (set.refresh) plotGraph()
            else if (set.indices.length===1) {
                let nodes = visualizer.getNodes(set)
                nodes[0].classList.add(set.state==='creation'? 'node-target' : 'node-deleted')
                await sleep(SEARCH_TIME/animation.length*2)
            }
            else {
                let nodes = visualizer.getNodes(set)
                nodes[0].classList.add(set.state==='creation'? 'node-target' : (set.state==='switching'? 'node-position' :'node-deleted'))
                nodes[1].classList.add( set.state==='switching'? 'node-target' : 'node-position')
                await sleep(SEARCH_TIME/animation.length)
                if (set.move) {
                    let newNodes = [];
                    newNodes.push({index: set.indices[0], className: set.state==='switching'? 'node-target' : 'node-position'})
                    newNodes.push({index: set.indices[1], className: (set.state==='creation'? 'node-target' : (set.state==='switching'? 'node-position' :'node-deleted'))})
                    switchElement(array, set.indices[0], set.indices[1])
                    plotGraph(newNodes)
                    await sleep(SEARCH_TIME/(animation.length))
                    newNodes.map(nodeIndex => {
                        let node = document.querySelector('#graph_body').querySelector(`#node_${nodeIndex.index}`)
                        node.classList.remove('node-position')
                    })
                    await sleep(SEARCH_TIME/(animation.length*2))
                } else {
                    nodes.map((node) => node.classList.remove('node-sorted'))
                }
            }
        }
    },

    getNodes: set => {
        let nodes = []
        set.indices.map( index => {
            nodes.push(document
                .querySelector('#graph_body')
                .querySelector(`#node_${index}`))
        })
        return nodes
    }
}
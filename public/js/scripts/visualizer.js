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

    // quickSort: async animation => {
    //     for (let set of animation) {
    //         let nodes = visualizer.getNodes(set)
    //         nodes.map((node, index) => {
    //             if (index===2) node.classList.add('node-pivot')
    //             else node.classList.add(set.sorted ? 'node-sorted' : 'node-unsorted')
    //         })
    //         await sleep(SEARCH_TIME/animation.length)
    //         if (!set.sorted) {
    //             switchElement(array, set.indices[0], set.indices[1])
    //             set.indices[1]===set.indices[2] ? plotGraph([set.indices[0], set.indices[1]]) : plotGraph(set.indices)
    //             await sleep(SEARCH_TIME/(animation.length*2))
    //             set.indices.map(index => {
    //                 let node = document.querySelector('#graph_body').querySelector(`#node_${index}`)
    //                 node.classList.remove('node-unsorted', 'node-pivot')
    //             })
    //             await sleep(SEARCH_TIME/(animation.length*2))
    //         } else {
    //             nodes.map((node) => node.classList.remove('node-sorted', 'node-pivot'))
    //         }
    //     }
    // },

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
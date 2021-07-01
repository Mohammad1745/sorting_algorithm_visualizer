let animator = {
    heapSort: async (array ,animation) => {
        let sorted = []
        await animator.plotScreen( array, sorted)
        await sleep(SEARCH_TIME/animation.length*5)
        let treeHeader = document.querySelector('#graph_body').querySelector('#tree_header')
        treeHeader.innerHTML = `Binary Tree Representation (Heapifying: Creating A Heap)`
        let state = 'creation'
        for (let set of animation) {
            if (set.state==='deletion' && state==='creation') {
                treeHeader.innerHTML = `Binary Tree Representation | Heap Creation Completed`
                await sleep(1000)
                state = 'deletion'
            }
            if (state==='deletion'){
                treeHeader.innerHTML = `Binary Tree Representation | Sorting: Deleting From Heap`
            }
            if (set.refresh) await animator.plotScreen(array, sorted)
            else if (set.indices.length===1) {
                let nodes = animator.getNodes(set)
                nodes[0].classList.add(set.state==='creation'? 'node-target' : 'node-deleted')
                await sleep(SEARCH_TIME/animation.length*2)
            }
            else {
                let nodes = animator.getNodes(set)
                nodes[0].classList.add(set.state==='creation'? 'node-target' : (set.state==='switching'? 'node-position' :'node-deleted'))
                nodes[1].classList.add( set.state==='switching'? 'node-target' : 'node-position')
                await sleep(SEARCH_TIME/animation.length)
                if (set.move) {
                    let newNodes = [];
                    newNodes.push({index: set.indices[0], className: set.state==='switching'? 'node-target' : 'node-position'})
                    newNodes.push({index: set.indices[1], className: (set.state==='creation'? 'node-target' : (set.state==='switching'? 'node-position' :'node-deleted'))})
                    switchElement(array, set.indices[0], set.indices[1])
                    await animator.plotScreen(array, sorted, newNodes)
                    await sleep(SEARCH_TIME/(animation.length*2))
                    if (set.state==='deletion') {
                        sorted.push(array[set.indices[1]])
                        array.splice([set.indices[1]], 1)
                    }
                    await animator.plotScreen(array, sorted, newNodes, set.state==='deletion')
                    await sleep(SEARCH_TIME/(animation.length))
                    newNodes.map(nodeIndex => {
                        let node = document.querySelector('#graph_body').querySelector(`#tree_node_${nodeIndex.index}`)
                        if(node!==null) node.classList.remove('node-position')
                    })
                    await sleep(SEARCH_TIME/(animation.length*2))
                } else {
                    nodes.map((node) => node.classList.remove('node-sorted'))
                }
            }
        }
        treeHeader.innerHTML = `Binary Tree Representation | Sorting Completed: Left to Right <br> Watch now on Bar Chart`
    },

    plotScreen: async (array, sorted, unsortedNodes=[], isDeletion=false) => {
        let graphBody = document.querySelector('#graph_body')
        let nodeWidth = Math.floor(graphBody.offsetWidth/(array.length+sorted.length)*0.5)
        let tree = graphBody.querySelector('#tree')
        if (!tree) graphBody.insertAdjacentHTML('beforeend', `<div class="tree" id="tree"><div class="tree-header text-white" id="tree_header">Binary Tree Representation</div><div class="tree-body" id="tree-body"></div><div class="tree-footer row m-0 mt-5" id="tree_footer"></div></div>`)
        let treeBody = graphBody.querySelector('#tree-body')
        treeBody.innerHTML = ''

        let treeHeight = Math.ceil(Math.log2(array.length))
        for (let h = 0; h <= treeHeight; h++) {
            treeBody.insertAdjacentHTML('beforeend', `<div class="tree-node-row row m-0" id="tree_node_row_${h}" data-row="${h}"></div>`)
            let nodeRow = treeBody.querySelector(`#tree_node_row_${h}`)
            for (let index = 2 ** h - 1; index <= 2 * (2 ** h - 1); index++) {
                if (index >= array.length) break

                let number = array[index]
                if (index > 0) {
                    nodeRow.insertAdjacentHTML('beforeend', `<div class="node node-connector" id="tree_node_connector_${index}"></div>`)
                }
                nodeRow.insertAdjacentHTML('beforeend', `<div class="node text-white text-center" id="tree_node_${index}">${number}</div>`)

                let node = nodeRow.querySelector(`#tree_node_${index}`)
                let nodeConnector = nodeRow.querySelector(`#tree_node_connector_${index}`)
                animator.setNodeStyle(node, index, nodeWidth, treeHeight, h)
                if (nodeConnector) {
                    animator.setNodeConnectorStyle(nodeConnector, index, nodeWidth, treeHeight, h)
                }
                let indices = unsortedNodes.filter(indices => indices.index === index)
                if (unsortedNodes.length && indices.length) {
                    node.classList.add(indices[0].className)
                }
            }
        }
        if(sorted.length){
            let treeFooter = graphBody.querySelector('#tree_footer')
            if (isDeletion) {
                for (let index=0; index<sorted.length-1; index++){
                    let node = treeFooter.querySelector(`#tree_sorted_node_${index}`)
                    node.style.transition = "400ms"
                    node.style.transform = "translate("+nodeWidth+"px, 0)"
                }
                await sleep(500)
                treeFooter.innerHTML = ''
                for (let index=0; index<sorted.length; index++){
                    treeFooter.insertAdjacentHTML('afterbegin', `<div class="node text-white text-center m-1" id="tree_sorted_node_${index}">${sorted[index]}</div>`)
                    let node = treeFooter.querySelector(`#tree_sorted_node_${index}`)
                    node.style.height = nodeWidth + "px"
                    node.style.width = nodeWidth + "px"
                    node.style.fontSize = (nodeWidth / 3) + "px"
                }
            }
        }

    },

    getNodes: set => {
        let nodes = []
        set.indices.map( index => {
            nodes.push(document
                .querySelector('#graph_body')
                .querySelector(`#tree_node_${index}`))
        })
        return nodes
    },

    setNodeStyle: (node, index, nodeWidth, treeHeight, h) => {
        let margin = nodeWidth*0.5*(2**(treeHeight-h))- nodeWidth*0.5
        node.style.marginTop = index===0 ? "10px" : (margin*0.2)+10 + "px"
        node.style.marginLeft = margin + "px"
        node.style.marginRight = margin + "px"
        node.style.height = nodeWidth + "px"
        node.style.width = nodeWidth + "px"
        node.style.fontSize = (nodeWidth / 3) + "px"
    },

    setNodeConnectorStyle: (nodeConnector, index, nodeWidth, treeHeight, h) => {
        let margin = nodeWidth*0.5*(2**(treeHeight-h)) - nodeWidth*0.5
        let connectorAngle = 45+(treeHeight-h)*5
        if (index%2===1) {
            nodeConnector.style.transform = "rotate("+connectorAngle+"deg)"
            nodeConnector.style.left = margin*1.5 + nodeWidth*0.5 + "px"
        }
        else {
            nodeConnector.style.transform = "rotate(-"+connectorAngle+"deg)"
            nodeConnector.style.left = margin*0.5 + nodeWidth*0.5 + "px"
        }
        nodeConnector.style.position = "relative"
        nodeConnector.style.top = -((margin+nodeWidth*0.5)*0.2-5) + "px"
        nodeConnector.style.height = (margin*0.5)+5 + "px"
    }
}
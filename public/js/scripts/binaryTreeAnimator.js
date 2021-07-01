let binaryTreeAnimator = {
    heapSort: async (array ,animation) => {
        let sorted = []
        await binaryTreeAnimator.plotScreen( array, sorted)
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
            if (set.refresh) await binaryTreeAnimator.plotScreen(array, sorted)
            else if (set.indices.length===1) {
                let nodes = binaryTreeAnimator.getNodes(set)
                nodes[0].classList.add(set.state==='creation'? 'node-target' : 'node-deleted')
                await sleep(SEARCH_TIME/animation.length*2)
            }
            else {
                await binaryTreeAnimator.animateMovement(array, animation, set, sorted)
            }
        }
        treeHeader.innerHTML = `Binary Tree Representation | Sorting Completed: Left to Right <br> Watch now on Bar Chart`
    },

    animateMovement:  async (array, animation, set, sorted) => {
        let nodes = binaryTreeAnimator.getNodes(set)
        nodes[0].classList.add(set.state==='creation'? 'node-target' : (set.state==='switching'? 'node-position' :'node-deleted'))
        nodes[1].classList.add( set.state==='switching'? 'node-target' : 'node-position')
        await sleep(SEARCH_TIME/animation.length)
        if (set.move) {
            let newNodes = [];
            newNodes.push({index: set.indices[0], className: set.state==='switching'? 'node-target' : 'node-position'})
            newNodes.push({index: set.indices[1], className: (set.state==='creation'? 'node-target' : (set.state==='switching'? 'node-position' :'node-deleted'))})
            switchElement(array, set.indices[0], set.indices[1])
            await binaryTreeAnimator.plotScreen(array, sorted, newNodes, 'switch')
            // await sleep(SEARCH_TIME/(animation.length*2))
            if (set.state==='deletion') {
                sorted.push(array[set.indices[1]])
                array.splice(set.indices[1], 1)
            }
            await binaryTreeAnimator.plotScreen(array, sorted, newNodes, set.state)
            await sleep(SEARCH_TIME/(animation.length))
            newNodes.map(nodeIndex => {
                let node = document.querySelector('#graph_body').querySelector(`#tree_node_${nodeIndex.index}`)
                if(node!==null) node.classList.remove('node-position')
            })
            await sleep(SEARCH_TIME/(animation.length*2))
        } else {
            nodes.map((node) => node.classList.remove('node-sorted'))
        }
    },

    plotScreen: async (array, sorted, unsortedNodes=[], state='') => {
        let graphBody = document.querySelector('#graph_body')
        let nodeWidth = Math.floor(graphBody.offsetWidth/(array.length+sorted.length)*0.5)
        let tree = graphBody.querySelector('#tree')
        if (!tree) {
            graphBody.insertAdjacentHTML('beforeend', `<div class="tree" id="tree"><div class="tree-header text-white" id="tree_header">Binary Tree Representation</div><div class="tree-body" id="tree-body"></div><div class="tree-footer row m-0 mt-5" id="tree_footer"></div></div>`)
        }
        let treeBody = graphBody.querySelector('#tree-body')
        if (state==='switch') {
            await binaryTreeAnimator.animateSwitch(treeBody, unsortedNodes)
        }
        treeBody.innerHTML = ''

        let treeHeight = Math.ceil(Math.log2(array.length))
        for (let h = 0; h <= treeHeight; h++) {
            treeBody.insertAdjacentHTML('beforeend', `<div class="tree-node-row row m-0" id="tree_node_row_${h}" data-row="${h}"></div>`)
            await binaryTreeAnimator.plotTreeNodes(array, treeHeight, h, nodeWidth, treeBody, unsortedNodes, state)
        }
        if(sorted.length){
            await binaryTreeAnimator.plotSortedNodes(sorted, nodeWidth, state)
        }

    },

    animateSwitch: async (treeBody, unsortedNodes) => {
        let switchingNodes = [
            treeBody.querySelector(`#tree_node_${unsortedNodes[0].index}`),
            treeBody.querySelector(`#tree_node_${unsortedNodes[1].index}`)
        ]
        let nodePositions = [getOffset(switchingNodes[0]), getOffset(switchingNodes[1])]
        let topMovement = nodePositions[1].top-nodePositions[0].top
        let leftMovement = nodePositions[1].left-nodePositions[0].left
        switchingNodes[0].style.transition = "400ms"
        switchingNodes[0].style.transform = "translate("+(leftMovement)+"px,"+(topMovement)+"px)"
        switchingNodes[1].style.transition = "400ms"
        switchingNodes[1].style.transform = "translate("+(-leftMovement)+"px,"+(-topMovement)+"px)"
        await sleep(500)
    },

    plotTreeNodes: async (array, treeHeight, h, nodeWidth, treeBody, unsortedNodes) => {
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
            binaryTreeAnimator.setNodeStyle(node, index, nodeWidth, treeHeight, h)
            if (nodeConnector) {
                binaryTreeAnimator.setNodeConnectorStyle(nodeConnector, index, nodeWidth, treeHeight, h)
            }
            let indices = unsortedNodes.filter(indices => indices.index === index)
            if (unsortedNodes.length && indices.length) {
                node.classList.add(indices[0].className)
            }
        }
    },

    plotSortedNodes: async (sorted, nodeWidth, state) => {
        let treeFooter = document.querySelector('#graph_body').querySelector('#tree_footer')
        if (state==='deletion') {
            for (let index=0; index<sorted.length-1; index++){
                let node = treeFooter.querySelector(`#tree_sorted_node_${index}`)
                node.style.transition = "400ms"
                node.style.transform = "translate("+(nodeWidth*1.1+2)+"px, 0)"
            }
            await sleep(500)
            treeFooter.innerHTML = ''
            for (let index=0; index<sorted.length; index++){
                treeFooter.insertAdjacentHTML('afterbegin', `<div class="node text-white text-center" id="tree_sorted_node_${index}">${sorted[index]}</div>`)
                let node = treeFooter.querySelector(`#tree_sorted_node_${index}`)
                node.style.marginLeft = (nodeWidth*0.1) +"px"
                node.style.height = nodeWidth + "px"
                node.style.width = nodeWidth + "px"
                node.style.fontSize = (nodeWidth / 3) + "px"
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
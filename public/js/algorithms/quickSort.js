let quickSort = {
    sort: (array, animation, l=0, r) => {
        if (r===undefined) r=array.length-1
        if (l>=r) return
        let pivot = quickSort.partition(array, animation, l, r)
        quickSort.sort(array, animation, l, pivot-1)
        quickSort.sort(array, animation, pivot+1, r)
    },

    partition: (array, animation, l, r) => {
        let pivot = r
        let i = l-1
        for (let j=l; j<r; j++) {
            if (array[j]<array[pivot]) {
                i++
                let temp = array[j]
                array[j] = array[i]
                array[i] = temp
                animation.push({indices:[i, j, pivot], numbers: [array[i], array[j]],sorted: i===j})

            } else {
                animation.push({indices:[j, j, pivot], sorted: true})
            }
        }
        i++
        let temp = array[pivot]
        array[pivot] = array[i]
        array[i] = temp
        if (i!==pivot) {
            animation.push({indices:[i, pivot, pivot], sorted: i===pivot})
        }

        return i//as new pivot
    }
}
let selectionSort = {
    sort: (input, animation) => {
        let j=0
        for (let i=0; i<input.length; i++) {
            j = i
            let minIndex = j
            let min = input[j]
            while (j<input.length) {
                if (input[j]<min) {
                    min = input[j]
                    minIndex = j
                }
                j++
            }
            if (i!==minIndex) animation.push({indices:[i, minIndex], sorted: false})
            min = input[minIndex]
            input[minIndex] = input[i]
            input[i] = min
        }
        return input
    }
}
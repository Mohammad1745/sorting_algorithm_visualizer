let insertionSort = {
    sort: (input, animation) => {
        for (let i=1; i<input.length; i++){
            let number = input[i]
            let indices = []
            for (let j = i-1; j >= 0; j--) {
                if (input[j] > number) {
                    indices = [j, i]
                    input[j+1] = input[j]
                    input[j] = number
                }
            }
            if (indices.length) animation.push({indices: indices, sorted:false})
        }
    }
}
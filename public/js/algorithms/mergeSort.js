let mergeSort = {
    sort: (input, animation) => {
        if (input.length < 2) return input

        const middle = Math.floor(input.length / 2)
        let unsortedLeft = input.slice(0, middle)
        let unsortedRight = input.slice(middle, input.length)

        let left = mergeSort.sort(unsortedLeft, animation)//0
        let right = mergeSort.sort(unsortedRight, animation)//2
        let output = []

        while (left.length && right.length) {
            if (left[0]<=right[0]){
                animation.push({numbers: [left[0], right[0]], sorted:true})
                output.push(left.shift())
            } else {
                animation.push({numbers: [left[0], right[0]], sorted:false})
                output.push(right.shift())
            }
        }

        while (left.length) {
            output.push(left.shift())
        }
        while (right.length) {
            output.push(right.shift())
        }
        return output
    }
}
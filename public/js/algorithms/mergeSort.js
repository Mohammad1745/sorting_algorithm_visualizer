let mergeSort = {
    sort: (input) => {
        let animation = []
        let middleIndex = Math.ceil(input.length / 2)
        let left = input.splice(0, middleIndex)
        let right = input.splice(-middleIndex)

        if (left.length>1) left = mergeSort.sort(left)
        else animation.push(left[0])
        if (right.length>1) right = mergeSort.sort(right)
        else animation.push(right[0])

        let l = 0
        let r = 0
        let i = 0
        while(l<left.length&&r<right.length){
            if (left[l]<=right[r]) {
                input[i]=left[l]
                i++
                l++
            } else {
                input[i]=right[r]
                i++
                r++
            }
        }
        while(l<left[l]){
            input[i]=left[l]
            i++
            l++
        }
        while(r<right[r]){
            input[i]=right[r]
            i++
            r++
        }

        return {output:input, animation}
    }
}
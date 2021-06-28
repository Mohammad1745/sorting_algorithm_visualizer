let mergeSort = {
    sort: (input, animation, index=0) => {
        let middleIndex = Math.ceil(input.length / 2)
        let left = input.splice(0, middleIndex)
        let right = input.splice(-middleIndex)

        if (left.length>1) left = mergeSort.sort(left, animation, index)
        if (right.length>1) right = mergeSort.sort(right, animation, index+middleIndex)

        let l = 0
        let r = 0
        let i = 0
        while(l<left.length&&r<right.length){
            if (left[l]<=right[r]) {
                animation.push({numbers: [left[l], right[r]], indices:[i+index, r+index+middleIndex], sorted:true})
                input[i]=left[l]
                i++
                l++
            } else {
                animation.push({numbers: [left[l], right[r]], indices:[i+index, r+index+middleIndex], sorted:false})
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

        return input
    }
}
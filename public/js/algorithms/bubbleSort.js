let bubbleSort = {
    sort: (input, animation) => {
        let sorted = false
        while (!sorted){
            sorted = true
            for (let i = 0; i < input.length - 1; i++) {
                if (input[i] > input[i + 1]) {
                    animation.push({indices:[i, i+1], sorted:false})
                    let temp = input[i]
                    input[i] = input[i + 1]
                    input[i + 1] = temp
                    sorted = false
                } else {
                    animation.push({indices:[i, i+1], sorted:true})
                }
            }
        }
    }
}
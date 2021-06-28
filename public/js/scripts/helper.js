function generateArray(length = 5) {
    let array = []
    for (let i=0; i<length; i++) {
        array.push(randomNumber(5, 600))
    }
    return array
}

Array.prototype.equals = function(arr2) {
    return (
        this.length === arr2.length &&
        this.every((value, index) => value === arr2[index])
    )
}

const randomNumber = (min, max, except=null) => {
    let number = Math.round(min+Math.random()*max)
    if (except) {
        while (number===except){
            number = Math.round(min+Math.random()*max)
        }
    }
    return number;
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
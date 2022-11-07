
class Main {
    constructor(arr) {
        this.arr = arr;
    }

    calc() {
        let count = 0;
        this.arr.forEach(element => {
            count += element;
        });

        console.log(count/(this.arr.length));
    }
}

export { Main }
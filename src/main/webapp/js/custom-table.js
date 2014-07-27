function CustomTable() {

    var that = this;
    this.MAX_RANDOM = 1000;

    this.getRandomValue = function() {
        return parseInt( Math.random() * that.MAX_RANDOM );
    }

}
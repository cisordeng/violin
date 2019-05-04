let Util = {
    getFormatedDateTime(formate=null, duration=null) {
        var years = parseInt(duration / (60 * 60 * 24 * 365)); // 年365， 月30
        var months = parseInt(duration % (60 * 60 * 24 * 365) / (60 * 60 * 24 * 30));
        var days = parseInt(duration % (60 * 60 * 24 * 365) % (60 * 60 * 24 * 30) / (60 * 60 * 24));
        var hours = parseInt(duration % (60 * 60 * 24 * 365) % (60 * 60 * 24 * 30) % (60 * 60 * 24) / (60 * 60));
        var minutes = parseInt(duration % (60 * 60 * 24 * 365) % (60 * 60 * 24 * 30) % (60 * 60 * 24) % (60 * 60) / 60);
        var seconds = parseInt(duration % (60 * 60 * 24 * 365) % (60 * 60 * 24 * 30) % (60 * 60 * 24) % (60 * 60) % 60);
        if (formate == "m:ss") {
                return `${minutes}:${this.getFixedNum(seconds, 2)}`
        }
    },

    getFixedNum(num, length) {
        return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
    },

    async loadImage(src) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = reject;
        })
    },
}
export default Util;
class DiceDrawer {
    constructor(length = 25) {
        this.length = length
        this.canvas = this.getCanvas()
        this.ctx = this.canvas.getContext('2d')
        this.bg = this.getBackground()
    }
    getCanvas() {
        const canvas = document.createElement('canvas')
        canvas.width = this.length
        canvas.height = this.length
        return canvas
    }
    getBackground() {
        const length = this.length
        const ctx = this.ctx

        let gradient = ctx.createLinearGradient(0, 0, length, length + 30)
        gradient.addColorStop(0, 'white')
        gradient.addColorStop(1, 'gray')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, length, length)

        //border radius
        ctx.globalCompositeOperation = 'source-in'
        ctx.beginPath()
        ctx.arc(length / 2, length / 2, length / 1.6, 0, 2 * Math.PI)
        ctx.fill()
        ctx.globalCompositeOperation = 'source-over'

        return ctx.getImageData(0, 0, length, length)
    }
    getNum(num) {
        const ctx = this.ctx
        const length = this.length
        ctx.putImageData(this.bg, 0, 0)
        const radius = length / 9
        const drawPoint = (x, y, color = 'black') => {
            let gradient = ctx.createRadialGradient(x, y, 1, x, y, radius)
            gradient.addColorStop(0, color)
            gradient.addColorStop(1, 'darkgray')

            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(x, y, radius, 0, 2 * Math.PI)
            ctx.fill()
        }
        let pts
        switch (num) {
            case 1:
                drawPoint(length / 2, length / 2, 'red')
                break
            case 2:
                pts = [
                    length * (1 / 5),
                    length * (3 / 5)
                ]
                pts.forEach((pt) => {
                    drawPoint(pt + radius, pt + radius)
                })
                break
            case 3:
                pts = [
                    length * (1 / 7),
                    length * (3 / 7),
                    length * (5 / 7)
                ]
                pts.forEach((pt) => {
                    drawPoint(pt + radius, pt + radius)
                })
                break
            case 4:
                pts = [
                    [length * (1 / 5), length * (1 / 5)],
                    [length * (1 / 5), length * (3 / 5)],
                    [length * (3 / 5), length * (1 / 5)],
                    [length * (3 / 5), length * (3 / 5)]
                ]
                pts.forEach((pt) => {
                    drawPoint(pt[0] + radius, pt[1] + radius, 'red')
                })
                break
            case 5:
                pts = [
                    [length * (1 / 7), length * (1 / 7)],
                    [length * (1 / 7), length * (5 / 7)],
                    [length * (3 / 7), length * (3 / 7)],
                    [length * (5 / 7), length * (1 / 7)],
                    [length * (5 / 7), length * (5 / 7)]
                ]
                pts.forEach((pt) => {
                    drawPoint(pt[0] + radius, pt[1] + radius)
                })
                break
            case 6:
                pts = [
                    [length * (1 / 7), length * (1 / 7)],
                    [length * (1 / 7), length * (5 / 7)],
                    [length * (1 / 7), length * (3 / 7)],
                    [length * (4.5 / 7), length * (3 / 7)],
                    [length * (4.5 / 7), length * (1 / 7)],
                    [length * (4.5 / 7), length * (5 / 7)]
                ]
                pts.forEach((pt) => {
                    drawPoint(pt[0] + radius, pt[1] + radius)
                })
                break
        }
        return ctx.getImageData(0, 0, length, length)
    }
}
export const diceDrawer = new DiceDrawer()

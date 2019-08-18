let position = {}

module.exports = {

    createTableTop: (xVal, yVal) => {
        return { x: xVal, y: yVal }
    },

    updateRobotPosition: (xVal, yVal, facing) => {
        position = { x: xVal, y: yVal, f: facing }
        return({ x: xVal, y: yVal, f: facing })
    },

    getRobotPosition: () => {
        return position
    }
}
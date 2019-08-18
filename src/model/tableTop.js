let tableTop = { x: 5, y: 5}, 
    position = { x: 0, y: 0, f: 'NORTH'}

module.exports = {
    createTableTop: (xVal, yVal) => {
        tableTop = { x: xVal, y: yVal }
        return { x: xVal, y: yVal }
    },

    getTableTop: () => {
        return tableTop
    },

    updateRobotPosition: (xVal, yVal, facing) => {
        position = { x: xVal, y: yVal, f: facing }
        return({ x: xVal, y: yVal, f: facing })
    },

    getRobotPosition: () => {
        return position
    }
}
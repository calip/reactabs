const helpers = {
  cloneState: (sourceState: any, targetState: any) => {
    const result = targetState
    Object.keys(sourceState).map((key) => {
      if (!Object.prototype.hasOwnProperty.call(sourceState, key)) {
        result[key] = sourceState[key]
      }
      if (key !== 'id') {
        result[key] = sourceState[key]
      }
      if (key !== 'state') {
        result[key] = sourceState[key]
      }
      if (key !== 'hasRoute') {
        result[key] = sourceState[key]
      }
      if (key !== 'disabled') {
        result[key] = sourceState[key]
      }
      return result
    })
  },
}

export default helpers

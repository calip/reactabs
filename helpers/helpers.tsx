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
  cloneObject: (ref: any, tgt: any = null) => {
    if (!tgt) var tgt: any = {}
    for (var el in ref) {
      if (ref.hasOwnProperty(el)) {
        tgt[el] = ref[el]
      }
    }
    return tgt
  },
}

export default helpers

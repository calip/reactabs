import * as Cesium from 'cesium'

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
  cloneObject: (ref: any, target: any = null) => {
    if (!target) const tgt: any = {}
    Object.keys(ref).map((key) => {
      if (!Object.prototype.hasOwnProperty.call(ref, key)) {
        tgt[key] = ref[key]
      }
      return tgt
    })
    return tgt
  },
  cartoDelta: (ca: any, cb: any, ch = 0.0) => {
    const res = new Cesium.Cartographic(
      ca.longitude - cb.longitude,
      ca.latitude - cb.latitude,
      ch
    )
    return res
  },
  cartoAdd: (ca: any, cb: any, ch = 0.0) => {
    const res = new Cesium.Cartographic(
      ca.longitude + cb.longitude,
      ca.latitude + cb.latitude,
      ch
    )
    return res
  },
}

export default helpers

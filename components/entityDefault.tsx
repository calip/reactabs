const EntityDefault = () => {
  const result = {
    Callsign: "F-16 A/B",
    DISTypeID: {
        Kind: 1,
        Domain: 2,
        Category: 2,
        Subcategory: 0,
        Country: 0,
        Extra: 0,
        Specifics: 0
    },
    VisualModel: {
        "def": "/models/Cesium_Air.glb"
    },
    state: {
        rotOffset: 0
    }
  }
  return result
}

export default EntityDefault
import { useRef, useEffect } from 'react'
import * as Resium from 'resium'
import * as Cesium from 'cesium'
import CesiumDrag from './cesiumDrag'
import entityDefault from './entityDefault'
import CesiumEntity from './cesiumEntity'
import EntityDb from './entityDb'

const CesiumViewer = (prop: any) => {
  const { data } = prop
  const ref = useRef<Resium.CesiumComponentRef<Cesium.Viewer>>(null)

  useEffect(() => {
    if (ref.current?.cesiumElement && data) {
      const viewer = ref.current?.cesiumElement
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(118, -3.0, 3800000.0),
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-90.0),
          roll: 0.0,
        },
      })

      viewer.scene.screenSpaceCameraController.enableTilt = false
      data.entities.forEach((e: any) => {
        const entityDb = new EntityDb()
        const res = entityDb.getAsset(e.typeId)
        const entity = res ?? entityDefault() // TODO load dynamics asset specs

        const en = new CesiumEntity(entity, viewer)
        en.setStateLabels(e)
        en.state.typeId = entity.CallSign

        const dragHandler = new CesiumDrag(en, viewer)
      })
    }
  }, [data])

  return <Resium.Viewer ref={ref} />
}

export default CesiumViewer

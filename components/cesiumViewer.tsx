import { useRef, useEffect } from 'react'
import * as Resium from 'resium'
import * as Cesium from 'cesium'
import CesiumDrag from './cesiumDrag'
import entityDefault from './entityDefault'
import CesiumEntity from './cesiumEntity'
import EntityDb from './entityDb'
import MoveEntity from './moveEntity'

const CesiumViewer = (prop: any) => {
  const { data } = prop
  const ref = useRef<Resium.CesiumComponentRef<Cesium.Viewer>>(null)

  useEffect(() => {
    const callsigns: any = []
    const entities: any = []
    const entityKeys: any = []

    const setEntityFlag = (callsign: any, flagColor: any) => {
      const enIndex = callsigns.indexOf(callsign)
      if (enIndex < 0) return
      const en = entities[enIndex]
      if (flagColor === 'blue' || flagColor === 'biru') {
        en.state.flag = 'blue'
        en.avatar.model.color = Cesium.Color.DEEPSKYBLUE
      } else if (flagColor === 'red' || flagColor === 'merah') {
        en.state.flag = 'red'
        en.avatar.model.color = Cesium.Color.RED
      } else {
        en.state.flag = ''
        en.avatar.model.color = Cesium.Color.MEDIUMPURPLE
      }
    }

    if (ref.current?.cesiumElement && data) {
      const viewer = ref.current?.cesiumElement
      const elementHandler = new Cesium.ScreenSpaceEventHandler(
        viewer.scene.canvas
      )
      viewer.clock.shouldAnimate = false

      const move = new MoveEntity(viewer, entityKeys, callsigns, entities)
      move.setContextMenuHandler()

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
        entityKeys.push(en.key)
        en.setStateLabels(e)
        en.state.typeId = entity.CallSign

        entities.push(en)
        callsigns.push(e.callsign)

        const dragHandler = new CesiumDrag(en, viewer)

        setEntityFlag(en.state.callsign, e.flag)
      })
    }
  }, [data])

  return <Resium.Viewer ref={ref} />
}

export default CesiumViewer

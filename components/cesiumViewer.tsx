import { useRef, useEffect } from "react"
import * as Resium from "resium"
import * as Cesium from 'cesium'
import CesiumEntity from "./cesiumEntity"


const CesiumViewer = (prop: any) => {
  const { data } = prop
  const ref = useRef<Resium.CesiumComponentRef<Cesium.Viewer>>(null)
  
  useEffect(() => {
    if(ref.current?.cesiumElement && data) {
      data.entities.map((entity: any) => {
        const position = Cesium.Cartesian3.fromDegrees(entity.longitude, entity.latitude, entity.height)
        ref.current?.cesiumElement?.entities.add({
          position: position,
          model: {
            uri: entity.url,
            minimumPixelSize: 64,
          }
        })
      })
      
      const entity = new CesiumEntity(ref.current?.cesiumElement)
      entity.enable()
      
      ref.current?.cesiumElement.zoomTo(
        ref.current?.cesiumElement.entities,
        new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-90))
      )
    }
  }, [])

  return <Resium.Viewer ref={ref} />
};

export default CesiumViewer
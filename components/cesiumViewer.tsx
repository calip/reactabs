import { useRef, useEffect } from "react"
import * as Resium from "resium"
import * as Cesium from 'cesium'
import CesiumEntity from "./cesiumEntity"


const CesiumViewer = () => {
  const ref = useRef<Resium.CesiumComponentRef<Cesium.Viewer>>(null)

  useEffect(() => {
    if(ref.current?.cesiumElement) {
      const position = Cesium.Cartesian3.fromDegrees(106.774124, -6.200000, 100)
      //Actually create the entity
      const entity = ref.current?.cesiumElement.entities.add({
        position: position,
        //Load the Cesium plane model to represent the entity
        model: {
          uri:"/models/Cesium_Air.glb",
          minimumPixelSize: 64,
        },
      })

      const drag = new CesiumEntity(ref.current?.cesiumElement)
      drag.enable()
      
      ref.current?.cesiumElement.zoomTo(
        ref.current?.cesiumElement.entities,
        new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-90))
      )
    }
  }, [])

  return <Resium.Viewer ref={ref} />
};

export default CesiumViewer
// class CesiumViewer extends Component {
//   public viewer: Cesium.Viewer | undefined
  
//   componentDidMount() {
//     if (this.viewer) {
//       const position = Cesium.Cartesian3.fromDegrees(106.774124, -6.200000, 100)
//       //Actually create the entity
//       const entity = this.viewer.entities.add({
//         position: position,
//         //Load the Cesium plane model to represent the entity
//         model: {
//           uri:"/models/Cesium_Air.glb",
//           minimumPixelSize: 64,
//         },
//       })

//       const drag = new CesiumEntity(this.viewer)
//       drag.enable()
      
//       this.viewer.zoomTo(
//         this.viewer.entities,
//         new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-90))
//       )
//     }
//   }

//   render() {
//     return (
//       <Viewer full
//         ref={e => {
//           this.viewer = e ? e.cesiumElement : undefined
//         }}
//         infoBox={true}
//         selectionIndicator={false}
//         shouldAnimate={true}
//       />
//     );
//   }
// }

// export default CesiumViewer
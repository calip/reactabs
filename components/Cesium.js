
import { Viewer, Entity, ModelGraphics } from 'resium'
import { Cartesian3, Color } from 'cesium'

const position = Cartesian3.fromDegrees(106.774124, -6.200000, 100);

export default function Cesium() {
  return (
    <Viewer full>
      <Entity
                  name="Airplane"
                  label={"Airplane"}
                  tracked 
                  point={{ pixelSize: 50, color: Color.BLUE }}
                  position={position}
        >
          <ModelGraphics
                      scale={1}
                      uri={"/models/a318.glb"}
                      minimumPixelSize={100}
                      runAnimations
                      show
                      color={Color.WHITE}
          />
        </Entity>
      </Viewer>
  )
}
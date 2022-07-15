import dynamic from 'next/dynamic'
import Entity from '../helpers/entity';

const CesiumViewer = dynamic(
  () => import('../components/cesiumViewer'),
  { ssr: false }
)

function Index() {
  return (
    <CesiumViewer />
  )
}

export default Index
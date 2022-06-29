import dynamic from 'next/dynamic'

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
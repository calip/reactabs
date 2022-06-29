import dynamic from 'next/dynamic'

const Cesium = dynamic(
  () => import('../components/Cesium'),
  { ssr: false }
)

export default function Index() {
  return (
    <Cesium />
  )
}

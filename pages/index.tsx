import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Entity from '../helpers/entity'

const CesiumViewer = dynamic(
  () => import('../components/cesiumViewer'),
  { ssr: false }
)

export default function Index(props: any) {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      setLoading(true)
      const data = await Entity.get()
      setData(data)
      setLoading(false)
    })()
  }, [])

  if (isLoading) return <p>Loading...</p>

  return (
    <CesiumViewer entities={data} />
  )
}

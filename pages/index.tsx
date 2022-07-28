import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Entity from '../helpers/entity'

const CesiumViewer = dynamic(() => import('../components/cesiumViewer'), {
  ssr: false,
})

export default function Index() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    Entity.get()
      .then((response) => response)
      .then((result) => setData(result))
    setLoading(false)
  }, [])

  if (isLoading) return <p>Loading...</p>

  return <CesiumViewer data={data} />
}

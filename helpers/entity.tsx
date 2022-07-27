const getEntities = async () => {
  const res = await fetch('http://localhost:3000/api/entity')
  const json = await res.json()
  return json
}

const Entity = {
  get: () => getEntities(),
}

export default Entity

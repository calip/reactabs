import path from 'path'
import { promises as fs } from 'fs'

const handler = async (req: any, res: any) => {
  const jsonDirectory = path.join(process.cwd(), 'json')

  const fileContents = await fs.readFile(`${jsonDirectory}/entity.json`, 'utf8')

  res.status(200).json(JSON.parse(fileContents))
}

export default handler

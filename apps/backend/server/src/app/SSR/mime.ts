import { extname } from 'path'

const data = {
  '.js': 'application/javascript',
  '.map': 'application/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.html': 'text/html',
  '.txt': 'text/plain',
}

export function lookup(path: string): string {
  const ext = extname(path)
  const mime = data[ext]

  if(path==='/')
    return 'text/html'
  else if (!mime)
    throw new Error(`No mime type for file: ${path}`)

  return mime
}

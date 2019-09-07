interface APIProps {
  endpoint: 'api' | 'cdn' | 'login' | 'auth'
  path?: string
  accessLevel?: 'admin' | 'user'
}
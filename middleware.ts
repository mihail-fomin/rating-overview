export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/cards/new', '/cards/edit/:id+'],
}
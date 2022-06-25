export default function ({ redirect, store }) {
  if (!process.server) {
    const isAuthenticated = store.state.auth.user ? true : false
    if (isAuthenticated) {
      if (store.state.auth.user.role === 'admin' || store.state.auth.user.role === 'super_admin') {
        return redirect('/admin')
      } else {
        return redirect('/')
      }
    }
  }
}

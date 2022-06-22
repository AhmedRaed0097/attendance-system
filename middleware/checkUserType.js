export default function ({ redirect, store }) {
  if (!process.server) {
    const isAuthenticated = store.state.auth.user ? true : false
    if (isAuthenticated) {
      if (store.state.auth.user.user_type === 'admin') {
        return redirect('/admin')
      } else {
        return redirect('/')
      }
    } else {
      return redirect('/auth/login')
    }
  }
}

export default function (context) {
    const isAuthenticated = $auth.user ? true : false
    if (isAuthenticated) {
      if ($auth.user.role === 'admin' || context.$auth.user.role === 'super_admin') {
        return context.redirect('/admin')
      } else {
        return context.redirect('/')
      }
    }
}

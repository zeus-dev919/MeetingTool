export default function ({ store, redirect }) {

  const freeRoutes = ["/login", "/projects"]

  if(!freeRoutes.includes($nuxt.$route.path)) {
    if (!store.state.auth.access_token) {
      return redirect(process.env.baseUrl + '/login')
    }
  }
}
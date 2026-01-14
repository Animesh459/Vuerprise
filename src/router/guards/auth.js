/**
 * Authentication guard
 * Checks if user is authenticated before allowing access to protected routes
 */
export function requireAuth(to, from, next) {
  const token = localStorage.getItem('authToken')
  
  if (!token) {
    next('/login')
  } else {
    next()
  }
}

/**
 * Guest guard
 * Redirects authenticated users away from guest-only pages (like login)
 */
export function requireGuest(to, from, next) {
  const token = localStorage.getItem('authToken')
  
  if (token) {
    next('/')
  } else {
    next()
  }
}

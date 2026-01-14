/**
 * Permission guard
 * Checks if user has required permission(s) before allowing access to protected routes
 */
export function requirePermission(to, from, next) {
  const storedUser = localStorage.getItem('user')
  
  if (!storedUser) {
    next('/login')
    return
  }

  try {
    const user = JSON.parse(storedUser)
    const requiredPermissions = to.meta.permissions || []
    
    // If no permissions required, allow access
    if (requiredPermissions.length === 0) {
      next()
      return
    }

    // Get user's permissions
    const userPermissions = user.permissions || []
    
    // Check if user has at least one of the required permissions
    const hasPermission = requiredPermissions.some(permission => 
      userPermissions.includes(permission)
    )

    if (hasPermission) {
      next()
    } else {
      next('/unauthorized')
    }
  } catch (e) {
    console.error('Permission check error:', e)
    next('/login')
  }
}

/**
 * Check if user has a specific permission
 * @param {string} permission 
 * @returns {boolean}
 */
export function hasPermission(permission) {
  try {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) return false

    const user = JSON.parse(storedUser)
    const userPermissions = user.permissions || []
    
    return userPermissions.includes(permission)
  } catch (e) {
    return false
  }
}

/**
 * Check if user has any of the specified permissions
 * @param {Array} permissions 
 * @returns {boolean}
 */
export function hasAnyPermission(permissions) {
  try {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) return false

    const user = JSON.parse(storedUser)
    const userPermissions = user.permissions || []
    
    return permissions.some(permission => userPermissions.includes(permission))
  } catch (e) {
    return false
  }
}

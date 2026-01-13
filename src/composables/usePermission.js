import { useAuth } from './useAuth'

/**
 * Composable for permission checking in components
 */
export function usePermission() {
  const { hasPermission, hasAnyPermission } = useAuth()

  /**
   * Check if user can perform action (has permission)
   * @param {string} permission
   * @returns {boolean}
   */
  const can = (permission) => {
    return hasPermission(permission)
  }

  /**
   * Check if user can perform any of the actions (has any permission)
   * @param {Array} permissions
   * @returns {boolean}
   */
  const canAny = (permissions) => {
    return hasAnyPermission(permissions)
  }

  /**
   * Check if user cannot perform action (lacks permission)
   * @param {string} permission
   * @returns {boolean}
   */
  const cannot = (permission) => {
    return !hasPermission(permission)
  }

  return {
    can,
    canAny,
    cannot,
  }
}

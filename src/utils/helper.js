const baseUrl = import.meta.env.BASE_URL;

export const getAssetUrl = (path) => {
    const base = import.meta.env.BASE_URL
    // Remove leading slash from path if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${baseUrl}${cleanPath}`
}

export const getProductImage = (filename) => {
    return getAssetUrl(`product/${filename}`)
}
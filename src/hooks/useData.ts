export const useData = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined')
    return {}

  const el = document.getElementById('__PAGE_DATA__')

  if (el && el?.id === '__PAGE_DATA__') {
    const rawData = el.innerText

    if (!rawData) return {}

    let json

    try {
      json = JSON.parse(rawData)

      return { data: json }
    } catch (err) {
      return {}
    }
  } else {
    return {}
  }
}

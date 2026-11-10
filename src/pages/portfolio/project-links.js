const isValidDestination = (destination) => {
  if (!destination || destination === '#' || destination.includes('/yourhandle')) return false

  try {
    const url = new URL(destination)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

export const visibleProjectLinks = (project) => {
  const links = []

  if (isValidDestination(project.live)) {
    links.push({
      href: project.live,
      label: project.liveLabel || 'Live Demo',
      kind: 'primary',
    })
  }

  if (isValidDestination(project.source)) {
    links.push({
      href: project.source,
      label: 'View Source',
      kind: 'secondary',
    })
  }

  return links
}

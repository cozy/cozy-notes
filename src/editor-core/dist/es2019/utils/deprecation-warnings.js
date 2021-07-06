import { nextMajorVersion } from '../version-wrapper'

const deprecationWarnings = (className, props, deprecations) => {
  const nextVersion = nextMajorVersion()

  for (const deprecation of deprecations) {
    const {
      property,
      type = 'enabled by default',
      description = '',
      condition = () => true
    } = deprecation

    if (props.hasOwnProperty(property)) {
      if (condition(props)) {
        // eslint-disable-next-line no-console
        console.warn(
          `${property} property for ${className} is deprecated. ${description} [Will be ${type} in editor-core@${nextVersion}]`
        )
      }
    }
  }
}

export default deprecationWarnings

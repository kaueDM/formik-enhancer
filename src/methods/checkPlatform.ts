/**
 * @function checkPlatform
 * Checks if we are in React Native or Web environment.
 * @return {string} current platform.
 */
const checkPlatform = (_: void): string => {
  return navigator.product === 'ReactNative' ? 'native' : 'web'
}

export default checkPlatform

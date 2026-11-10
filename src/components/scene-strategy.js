const isPositiveNumber = (value) => Number.isFinite(value) && value > 0

export const shouldUseStaticScene = ({
  viewportWidth,
  reducedMotion,
  saveData,
  hardwareConcurrency,
  deviceMemory,
}) => (
  viewportWidth <= 767
  || reducedMotion
  || saveData
  || (isPositiveNumber(hardwareConcurrency) && hardwareConcurrency <= 4)
  || (isPositiveNumber(deviceMemory) && deviceMemory <= 4)
)

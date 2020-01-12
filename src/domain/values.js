const presetsRaw = new Map([
  ['Default', { mass: 1, tension: 170, friction: 26, clamp: false, precision: 0.01, velocity: 0 }],
  ['Gentle', { mass: 1, tension: 120, friction: 14, clamp: false, precision: 0.01, velocity: 0 }],
  ['Wobbly', { mass: 1, tension: 180, friction: 12, clamp: false, precision: 0.01, velocity: 0 }],
  ['Stiff', { mass: 1, tension: 210, friction: 20, clamp: false, precision: 0.01, velocity: 0 }],
  ['Slow', { mass: 1, tension: 280, friction: 60, clamp: false, precision: 0.01, velocity: 0 }],
  ['Molasses', { mass: 1, tension: 280, friction: 120, clamp: false, precision: 0.01, velocity: 0 }]
])

export const defaultValues = presetsRaw.get('Default')

function presetOptions() {
  const presets = [['', 'Presets']]
  for (let [key, value] of presetsRaw.entries()) {
    presets.push([JSON.stringify(value), key])
  }
  return presets
}


export const presets = presetOptions()

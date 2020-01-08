const presetsRaw = new Map([
  ['Default', { mass: 1, tension: 170, friction: 26 }],
  ['Gentle', { mass: 1, tension: 120, friction: 14 }],
  ['Wobbly', { mass: 1, tension: 180, friction: 12 }],
  ['Stiff', { mass: 1, tension: 210, friction: 20 }],
  ['Slow', { mass: 1, tension: 280, friction: 60 }],
  ['Molasses', { mass: 1, tension: 280, friction: 120 }]
])

export const defaultValues = { ...presetsRaw.get('Default'), clamp: false, precision: 0.01, velocity: 0 }

function presetOptions() {
  const presets = [['', 'Presets']]
  for (let [key, value] of presetsRaw.entries()) {
    presets.push([JSON.stringify(value), key])
  }
  return presets
}


export const presets = presetOptions()

* vizualizer as from GSAP, svg - need functions for this
V input elements or contenteditable code? Start with input elements for common api
* copy pastable code
V clamp
* start with only springs
* what about interpolate ranges
* do we need eases?
* do we need examples for api?
* in animatiooooonnnns
* store in localStorage

Chart notes
- stiffness of k = 180, and the damping factor of c = 12.
= mass is m, a is acceleration, X is displacement, x is position, v? (also displacement)

stiffness === tension === k
damping === friction * -velocity === c

- ma = -kX - cv
- ma = -k(x - 1) - cv

- k is a constant: TENSION,
- x is displacement, difference between length of spring at rest and current position
- F = -kx

 velocity = animation.lastVelocity !== 0
            ? animation.lastVelocity
            : config.initialVelocity

let force = -config.tension * (position - to) // F = -kx
let damping = -config.friction * velocity //
let acceleration = (force + damping) / config.mass // acc = (-kX + (c * velocity)) / mass
velocity = velocity + (acceleration * 1) / 1000 //
position = position + (velocity * 1) / 1000
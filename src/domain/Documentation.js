import { useScrollToRef } from '/machinery/useScrollToRef'
import styles from './Documentation.css'
import visual from './visual.svg'

function ScrollToImage({ imageRef }) {
  const scrollToRef = useScrollToRef({
    ref: imageRef,
    offset: 100,
    config: { tension: 155, friction: 14, clamp: true }
  })

  return <button className={styles.componentScrollToImage} onClick={scrollToRef}>see image</button>
}

export function Documentation() {
  const imageRef = React.useRef()
  return (
    <article className={styles.component}>
      <div className={styles.documentation}>
        <section>
          <h2>What is this ?</h2>
          <p>
            I am a big fan of <a className={styles.link} href="https://www.react-spring.io/">react-spring</a>, a spring-physics based animation library. It has quickly become my go-to library for UI animation in React projects. However, as a newbie to spring-based animations, I've had a hard time visualizing which effect the settings would have.
          </p>

          <p>
            So, I made this visualizer in order to help me determine the correct spring config for my animations. I hope it is of some help to someone else.
          </p>
        </section>

        <section>
          <h2>The settings.</h2>
          <div className={styles.settingsLayout}>
            <div className={styles.visualContainer}>
              <img
                className={styles.visual}
                src={visual}
                alt='Explanation of components of spring physics'
                ref={imageRef}
                width={500}
                height={500}
                loading="lazy"
              />
            </div>
            <div className={styles.settings}>
              <div>
                <h3>Mass</h3>
                <p>
                  Imagine a fixed spring with a bob on one end, the mass value is the mass of the bob (<ScrollToImage {...{ imageRef }} />). While not technically the same, in this instance you can think of it as the weight of the bob.
                </p>

                <p>The higher the mass, the longer it takes for the animation to come to a rest.</p>
              </div>

              <div>
                <h3>Tension</h3>

                <p>
                  Each spring has a certain stiffness. This is also called the spring constant or tension. In the real world it is caused by properties like the material and coil thickness.
                </p>

                <p>
                  If the spring's tension is high, the spring will contract more powerfully and the animation will feel snappy.
                </p>
              </div>

              <div>
                <h3>Friction</h3>
                <p>
                  Imagine a spring as before (<ScrollToImage {...{ imageRef }} />), but there is a certain amount of friction in the air. If the friction is higher, there's more power on the spring necessary to pull the bob to its resting position.
                </p>

                <p>
                  The higher the friction, the slower the animation will be. If the friction is low enough, it the bob will overshoot its position at rest. This creates a bouncy effect.
                </p>
              </div>

              <div>
                <h3>Precision</h3>
                <p>
                  If the bob (<ScrollToImage {...{ imageRef }} />) bounces around its resting point, it will continue to do so for some  time. The precision determines when to quit bouncing and stop the animation at the resting point.
                </p>

                <p>
                  By keeping the precision low, the animation will be more accurate and it might take longer to reach equilibrium.
                </p>
                <p>
                  Personally I haven't found much use for this setting. Please, let me know if I'm missing something!
                </p>
              </div>

              <div>
                <h3>Velocity</h3>
                <p>
                  Imagine pushing the bob (<ScrollToImage {...{ imageRef }} />) upwards or downwards while releasing it. The speed with which you push the bob is the velocity. Pushing downwards is a negative velocity, pushing upwards is a positive velocity.
                </p>

                <p>
                  Sometimes it's nice to give a little negative velocity to create a sense of <a className={styles.link} href="https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation#Anticipation">anticipation</a>.
                </p>

                <p>
                  If a component is coming from off-screen, it is can be pleasant to give it a positive velocity, so it looks like the component is coming from far away.
                </p>
              </div>

              <div>
                <h3>Clamp</h3>
                <p>
                  Imagine putting an solid barrier just above the resting position (<ScrollToImage {...{ imageRef }} />), so the bob can not overshoot the resting position. There will be no bounce and the animation comes to a stop immediately.
                </p>

                <p>
                  You might want to use this when animating opacity, a bounce effect is probably not what you are looking for. The same goes for animating to a scale of 0, usually you don't want to show a negative scale, which would flip the animated component.
                </p>

                <p>
                  Another use-case is when you want to move a component to off-screen, clamp it so the animation doesn't continue while the component is off-screen.
                </p>
              </div>

              <div>
                <h3>Presets</h3>
                <p>
                  React-spring comes with a set of sweet presets. You can select these to preview them.
                </p>
              </div>
            </div>
          </div>
        </section>
        <small>
          <p>
            Color scheme from <a href='https://www.happyhues.co/palettes/17' className={styles.link}>Happy Hues</a> bij Mackenzie Child.
          </p>
        </small>
      </div>
    </article>
  )
}

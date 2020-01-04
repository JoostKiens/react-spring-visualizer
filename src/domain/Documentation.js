import styles from './Documentation.css'
import visual from './visual.svg'

export function Documentation({ layoutClassName }) {
  return (
    <article className={cx(styles.component, layoutClassName)}>
      <div className={styles.documentation}>
        <section>
          <h2>What is this ?</h2>
          <p>
            I am a big fan of <a className={styles.link} href="https://www.react-spring.io/">react-spring</a>, a spring-physics based animation library. Ithas quicly become my go-to library for UI animation in React projects. However as a newbie to spring-based animations, I've had a hard time visualizing which effect the settings would have.
          </p>

          <p>
            So, I made this visualizer in order to help me determine the correct spring config for my UI animations. I hope it is of some help to someone else.
          </p>
        </section>

        <section>
          <h2>The settings.</h2>
          <div className={styles.settingsLayout}>
            <div className={styles.visualContainer}>
              <img className={styles.visual} src={visual} alt='Explanation of components of spring physics' />
            </div>
            <div className={styles.settings}>
              <div>
                <h3>Mass</h3>
                <p>
                  Imagine a fixed spring with a bob on one end, this is the mass of the bob. While not technically the same, in this instance you can think of it as the weight of the bob.
                </p>

                <p>The higher the mass, the longer it takes for the animation to come to a rest.</p>
              </div>

              <div>
                <h3>Tension</h3>

                <p>
                  Imagine a fixed spring with a bob on one end and a certain spring length when the spring is at rest.Now pull the bob, the distance between where the spring is at rest and the end of the spring is the tension.
                </p>

                <p>The higher the tension, the faster the animation will be.</p>
              </div>

              <div>
                <h3>Friction</h3>
                <p>
                  Image a spring as before, but there is a certain amount of friction in the air.If the friction is higher, there's more power necessary to pull the bob to its resting position.
                </p>

                <p>
                  The higher the friction, the slower the animation will be.If the friction is low enough, it the bob willl overshoot its resting position, creating a bouncy effect.
                </p>
              </div>

              <div>
                <h3>Precision</h3>
                <p>
                  If the bob bounces around its resting point, it wll continue to do so for a long time.The precision determines when to quit bouncing and stop the animation at the resting point.
                </p>

                <p>
                  By keeping the precision low, the more accurate the animation will be and the longer it might take to reach equilibrium.
                </p>
                <p>
                  Personally I haven't found much use for this setting. Please, let me know if I'm missing something!
                </p>
              </div>

              <div>
                <h3>Velocity</h3>
                <p>
                  Image pushing the bob upwards or downwards while releasing it.The speed with which you push the bob is the velocity. Pushing downwards is a negative velocity, pushing upwards a positive velocity.
                </p>

                <p>
                  Sometimes it's nice to give a little negative velocity to create a sense of <a className={styles.link} href="https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation#Anticipation">anticipation</a>.
                </p>

                <p>
                  If a component is coming from off - screen, it is can be pleasant to give it a positive velocity, so it looks like the component is coming from far away.
                </p>
              </div>

              <div>
                <h3>Clamp</h3>
                <p>
                  Imagine putting an unimpenetrable barrier just above the resting position, so the bob can not overshoot the resting position.There will be no bounce and the animation comes to a stop immediately.
                </p>

                <p>
                  You might want to use this when animating <a className={styles.link} href="#opacity">opacity</a>, a bounce effect is probably not what you are looking for.The same goes for animating to a scale of 0, often you don't want to show a negative scale, which would flip the animated component.
                </p>

                <p>
                  Another use-case is when you want to move a component to off-screen, clamp it so the animation doesn't   continue while the component is off-screen.
                </p>
              </div>

              <div>
                <h3>Presets</h3>
                <p>
                  React-spring comes with a set of pleasant presets.You can select these to preview them.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}

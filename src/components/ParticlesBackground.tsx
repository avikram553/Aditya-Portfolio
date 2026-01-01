import { useEffect, useMemo } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";

export const ParticlesBackground = () => {
  useEffect(() => {
    loadSlim(tsParticles);
  }, []);

  // Handle click to add and remove particles after 3 seconds
  useEffect(() => {
    const handleClick = () => {
      const container = tsParticles.domItem(0);
      if (container) {
        // Remove 4 particles after 3 seconds
        setTimeout(() => {
          container.particles.removeQuantity(4);
        }, 3000);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: false,
            mode: "grab",
          },
          resize: {
            enable: true,
          } as any,
        },
        modes: {
          push: {
            quantity: 4,
            particles_nb: 4,
          },
          remove: {
            quantity: 4,
          },
          grab: {
            distance: 400,
            links: {
              opacity: 1,
            },
          },
        },
      },
      particles: {
        color: {
          value: "#000000ff",
        },
        links: {
          color: "#000000ff",
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            width: 800,
            height: 800,
          },
          value: 15,
        },
        opacity: {
          value: 0.15,
          random: false,
        },
        shape: {
          type: ["circle", "square", "triangle", "polygon"],
          polygon: [
            {
              sides: 5, // Pentagon
            },
            {
              sides: 6, // Hexagon
            },
            {
              sides: 8, // Octagon
            },
          ],
          options: {
            square: {
              particles: {
                size: {
                  value: 3.9, // 30% larger than base size 3
                },
              },
            },
            triangle: {
              particles: {
                size: {
                  value: 3.9, // 30% larger than base size 3
                },
              },
            },
          },
        },
        size: {
          value: 3,
          random: false,
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <Particles
      id="tsparticles"
      options={options as any}
      className="absolute inset-0 z-0"
    />
  );
};

import React, { useEffect, useMemo, useState } from "react";

type Transition =
  | {
      type: "fade";
      duration: number;
    }
  | {
      type: "cut";
    };

type Scene = {
  title: string;
  images: string[];
  dialogue: string;
  transition: Transition;
};

const scenes: Scene[] = [
    {
    title: "The Beginning",
    images: ["/img/K54/beginning.jpg"],
    dialogue: "Mọi câu chuyện đều bắt đầu từ những cuộc gặp gỡ đầu tiên.",
    transition: {
      type: "fade",
      duration: 1200
    }
  },
  {
    title: "Các lớp",
    images: [
      "/img/K54/Classes/IMG_6284.PNG",
      "/img/K54/Classes/IMG_6287.PNG",
      "/img/K54/Classes/IMG_6288.PNG",
      "/img/K54/Classes/IMG_6289.PNG",
      "/img/K54/Classes/IMG_6290.PNG",
      "/img/K54/Classes/IMG_6291.PNG",
      "/img/K54/Classes/IMG_6292.PNG",
      "/img/K54/Classes/IMG_6294.PNG",
      "/img/K54/Classes/IMG_6295.PNG"
    ],
    dialogue: "Những người xa lạ được xếp chung vào một lớp học.",
    transition: {
      type: "fade",
      duration: 1200
    }
  },

  {
    title: "Villages",
    images: [
      "/img/K54/Villages/IMG_6315.JPG",
      "/img/K54/Villages/IMG_6316.JPG",
      "/img/K54/Villages/IMG_6317.JPG",
      "/img/K54/Villages/IMG_6318.JPG",
      "/img/K54/Villages/IMG_6319.JPG"
    ],
    dialogue: "Những lớp học được ghép thành những ngôi làng.",
    transition: {
      type: "fade",
      duration: 1600
    }
  },

  {
    title: "Ngày Chào đón",
    images: [
      "/img/K54/Ngaychaodon/IMG_6297.JPG",
      "/img/K54/Ngaychaodon/IMG_6298.JPG",
      "/img/K54/Ngaychaodon/IMG_6299.JPG",
      "/img/K54/Ngaychaodon/IMG_6300.JPG",
      "/img/K54/Ngaychaodon/IMG_6301.JPG",
      "/img/K54/Ngaychaodon/IMG_6302.JPG",
      "/img/K54/Ngaychaodon/IMG_6303.JPG",
      "/img/K54/Ngaychaodon/IMG_6304.JPG"
    ],
    dialogue: "Từ Ngày Chào đón.",
    transition: {
      type: "fade",
      duration: 1600
    }
  },
  {
    title: "Ngày kết nối",
    images: [
      "/img/K54/Ngayketnoi/IMG_6306.JPG",
      "/img/K54/Ngayketnoi/IMG_6307.JPG",
      "/img/K54/Ngayketnoi/IMG_6308.JPG",
      "/img/K54/Ngayketnoi/IMG_6309.JPG",
      "/img/K54/Ngayketnoi/IMG_6310.JPG",
      "/img/K54/Ngayketnoi/IMG_6311.JPG",
      "/img/K54/Ngayketnoi/IMG_6312.JPG",
      "/img/K54/Ngayketnoi/IMG_6313.JPG",
      "/img/K54/Ngayketnoi/IMG_6314.JPG"
    ],
    dialogue: "Đến Ngày Kết nối.",
    transition: {
      type: "fade",
      duration: 1600
    }
  },
  {
    title: "Club Fair",
    images: [
      "/img/K54/ClubFair/IMG_6320.JPG",
      "/img/K54/ClubFair/IMG_6321.JPG",
      "/img/K54/ClubFair/IMG_6322.JPG",
      "/img/K54/ClubFair/IMG_6323.JPG",
      "/img/K54/ClubFair/IMG_6324.JPG",
      "/img/K54/ClubFair/IMG_6325.JPG",
      "/img/K54/ClubFair/IMG_6326.JPG",
      "/img/K54/ClubFair/IMG_6327.JPG",
      "/img/K54/ClubFair/IMG_6328.JPG"
    ],
    dialogue: "Đến Club Fair.",
    transition: {
      type: "fade",
      duration: 1600
    }
  },
  {
    title: "Cheer - Flashmob",
    images: [
      "/img/K54/Cheerflashmob/IMG_6332.JPG",
      "/img/K54/Cheerflashmob/IMG_6333.JPG",
      "/img/K54/Cheerflashmob/IMG_6334.JPG",
      "/img/K54/Cheerflashmob/IMG_6335.JPG",
      "/img/K54/Cheerflashmob/IMG_6336.JPG",
      "/img/K54/Cheerflashmob/IMG_6337.JPG",
      "/img/K54/Cheerflashmob/IMG_6338.JPG",
      "/img/K54/Cheerflashmob/IMG_6339.JPG"
    ],
    dialogue: "Đến Cheer và Flashmob.",
    transition: {
      type: "fade",
      duration: 1600
    }
  }
];

export default function App() {
  const [sceneIndex, setSceneIndex] =
    useState(0);

  const [imageIndex, setImageIndex] =
    useState(0);

  const current =
    scenes[sceneIndex];

  /* ------------------------
     Scroll Scene Change
  ------------------------ */

  useEffect(() => {
    const onScroll = () => {
      const vh =
        window.innerHeight;

      const nextScene =
        Math.max(
          0,
          Math.min(
            scenes.length - 1,
            Math.round(
              window.scrollY / vh
            )
          )
        );

      setSceneIndex((prev) =>
        prev === nextScene
          ? prev
          : nextScene
      );
    };

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );
  }, []);

  /* ------------------------
     Reset slideshow when scene changes
  ------------------------ */

  useEffect(() => {
    setImageIndex(0);
  }, [sceneIndex]);

  /* ------------------------
     Slideshow
  ------------------------ */

  useEffect(() => {
    if (
      current.images.length <= 1
    )
      return;

    const timer =
      window.setInterval(() => {
        setImageIndex(
          (prev) =>
            (prev + 1) %
            current.images.length
        );
      }, 3000);

    return () =>
      clearInterval(timer);
  }, [
    sceneIndex,
    current.images.length
  ]);

  const currentImage =
    current.images[imageIndex];

  /* ------------------------
     Particles
  ------------------------ */

  const particles = useMemo(
    () =>
      Array.from({
        length: 60
      }).map(() => ({
        x:
          Math.random() * 100,
        y:
          Math.random() * 100,
        size:
          1 +
          Math.random() * 3,
        speed:
          3 +
          Math.random() * 6,
        delay:
          Math.random() * 5
      })),
    []
  );

  return (
    <div style={styles.page}>
      {/* BACKGROUND */}

      <div
        key={currentImage}
        style={{
          ...styles.bg,
          backgroundImage: `url(${currentImage})`
        }}
      />

      {/* FOG */}

      <div style={styles.fog} />


      {/* PARTICLES */}

      <div
        style={styles.particles}
      >
        {particles.map(
          (p, i) => (
            <span
              key={i}
              style={{
                ...styles.particle,
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.speed}s`
              }}
            />
          )
        )}
      </div>

      {/* TITLE */}

      <div style={styles.title}>
        {current.title}
      </div>

      {/* DIALOGUE */}

      <div
        key={`${sceneIndex}-${imageIndex}`}
        style={
          styles.dialogue
        }
      >
        {current.dialogue}
      </div>

      {/* NAV */}

      <div style={styles.nav}>
        {scenes.map(
          (_, i) => (
            <button
              key={i}
              onClick={() =>
                window.scrollTo({
                  top:
                    i *
                    window.innerHeight,
                  behavior:
                    "smooth"
                })
              }
              style={{
                ...styles.dot,
                opacity:
                  i ===
                  sceneIndex
                    ? 1
                    : 0.3
              }}
            />
          )
        )}
      </div>

      {/* SCROLL SPACE */}

      {scenes.map(
        (_, i) => (
          <div
            key={i}
            style={
              styles.section
            }
          />
        )
      )}

      <style>{`
        @keyframes bgFade {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes floatUp {
          from {
            transform: translateY(0);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          to {
            transform: translateY(-120vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

const styles: Record<
  string,
  React.CSSProperties
> = {
  page: {
    margin: 0,
    color: "white",
    background: "black",
    fontFamily: "serif"
  },

  bg: {
    position: "fixed",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition:
      "center",
    animation:
      "bgFade 1.2s ease"
  },

  fog: {
    position: "fixed",
    inset: 0,
    background:
      "radial-gradient(circle at 50% 60%, rgba(255,255,255,0.06), rgba(0,0,0,0.75))",
    pointerEvents: "none"
  },

  title: {
    position: "fixed",
    top: 30,
    left: 30,
    fontSize: 34
  },

  dialogue: {
    position: "fixed",
    bottom: 50,
    right: 30,
    width: 520,
    padding: 20,
    borderRadius: 16,
    background:
      "rgba(0,0,0,0.55)",
    backdropFilter:
      "blur(12px)"
  },

  nav: {
    position: "fixed",
    top: 30,
    right: 30,
    display: "flex",
    gap: 10
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    border:
      "1px solid white",
    background: "white",
    cursor: "pointer"
  },

  section: {
    height: "100vh"
  }
};
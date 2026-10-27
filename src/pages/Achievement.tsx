import { useEffect, useRef, useState } from "react";
import "./Achievement.css";
import NavBar from "./NavBar";
import { getStudents, type Student } from "../lib/api";

export default function Achievements() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("story");
  const [transitionProgress, setTransitionProgress] = useState(0);

  const storyRef = useRef<HTMLElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const directoryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let active = true;

    getStudents()
      .then((data) => {
        if (active) setStudents(data);
      })
      .catch(() => {
        if (active) setError("Không thể tải danh sách học sinh.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const sections = [storyRef.current, directoryRef.current].filter(
      (section): section is HTMLElement => section !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { threshold: [0.15, 0.35, 0.6], rootMargin: "-15% 0px -20% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Tie the pinned interlude to the user's scroll position.
  useEffect(() => {
    const section = transitionRef.current;
    if (!section) return;

    let frame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
        const progress = Math.min(1, Math.max(0, -rect.top / travel));
        setTransitionProgress(progress);
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  // Reveal elements as they enter the viewport, including newly loaded students.
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [loading, students.length, error]);

  const scrollToDirectory = () => {
    directoryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToStory = () => {
    storyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const phraseIndex = Math.min(2, Math.floor(transitionProgress * 3));

  return (
    <main className="site achievement-page">
      <NavBar />

      <header className="masthead">
        <div className="masthead-topline">
          <span>THE PHAN LEGACY</span>
          <span>THPT CHUYÊN PHAN BỘI CHÂU</span>
        </div>
        <div className="masthead-title">
          <span className="masthead-overline">ĐẶC SAN THÀNH TÍCH · 2024—2025</span>
          <h1>HÀNH TRÌNH</h1>
        </div>
        <div className="masthead-subtitle">
          <span>PHÍA SAU MỖI CÁI TÊN LÀ MỘT HÀNH TRÌNH</span>
          <span className="masthead-index">01 / 02</span>
        </div>
      </header>

      <div className="story-progress" aria-label="Tiến trình câu chuyện">
        <span className={activeSection === "story" ? "current" : ""}>01 — CÂU CHUYỆN</span>
        <span className="progress-track">
          <span className={`progress-fill ${activeSection === "directory" ? "completed" : ""}`} />
        </span>
        <span className={activeSection === "directory" ? "current" : ""}>02 — GƯƠNG MẶT</span>
      </div>

      <div className="achievement-scroll">
        <section
          id="story"
          ref={storyRef}
          className="story-section"
          aria-label="Hành trình học sinh giỏi quốc gia"
        >
          <article className="newspaper">
            <div className="paper-meta">
              <span>ĐẶC SAN HSGQG</span>
              <span>2024 — 2025 / SỐ ĐẶC BIỆT</span>
            </div>

            <div className="headline">
              <div className="headline-copy reveal">
                <div className="kicker">PHÍA SAU THÀNH TÍCH</div>
                <h2>MỘT<br />HÀNH TRÌNH<br />DÀI<span>.</span></h2>
                <p className="lead">
                  Phía sau mỗi cái tên trong danh sách HSGQG là một hành trình của nỗ lực,
                  áp lực, những ngày ôn luyện và trưởng thành.
                </p>
                <button type="button" className="story-link" onClick={scrollToDirectory}>
                  KHÁM PHÁ NHỮNG GƯƠNG MẶT <span aria-hidden="true">↘</span>
                </button>
              </div>

              <figure className="image-placeholder large-image reveal">
                <img
                  src="/img/olympiad-preparation.jpg"
                  alt="Học sinh trong hành trình ôn luyện"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    event.currentTarget.parentElement?.classList.add("image-missing");
                  }}
                />
                <div className="image-inner" aria-hidden="true">HÀNH TRÌNH</div>
                <figcaption><span>01</span> — ÔN LUYỆN</figcaption>
              </figure>
            </div>

            <div className="article-grid">
              <div className="article-text reveal">
                <p><span className="drop-cap">B</span>ắt đầu từ đâu? Có những ngày tưởng như không thể tiếp tục. Có những áp lực chỉ người trong cuộc mới hiểu.</p>
                <p>Nhưng từng ngày, từng bài toán, từng lần sửa sai đã tạo nên một hành trình. Mỗi bước tiến nhỏ đều góp phần làm nên thành quả hôm nay.</p>
              </div>

              <blockquote className="quote reveal">
                <div className="quote-mark" aria-hidden="true">“</div>
                <p>Thành tích là điểm đến. Hành trình mới là câu chuyện.</p>
                <cite>— HÀNH TRÌNH HSGQG</cite>
              </blockquote>

              <div className="article-feature reveal">
                <figure className="image-placeholder small-image">
                  <img
                    src="/img/study-moments.jpg"
                    alt="Khoảnh khắc học tập và trưởng thành"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      event.currentTarget.parentElement?.classList.add("image-missing");
                    }}
                  />
                  <div className="image-inner" aria-hidden="true">KỶ NIỆM</div>
                </figure>
                <p className="article-text">
                  Những ngày ôn luyện không chỉ là kiến thức, mà còn là sự trưởng thành,
                  tình bạn và những bài học theo ta rất lâu về sau.
                </p>
              </div>
            </div>

            <footer className="paper-footer">
              <span>HÀNH TRÌNH HSGQG · 2024—2025</span>
              <button type="button" onClick={scrollToDirectory} className="paper-next">
                <span>TIẾP TỤC HÀNH TRÌNH</span><b aria-hidden="true">↓</b>
              </button>
            </footer>
          </article>
        </section>

        <div
          ref={transitionRef}
          className="story-transition"
          aria-label="Chuyển tiếp từ câu chuyện đến danh sách học sinh"
          style={{ "--transition-progress": transitionProgress } as React.CSSProperties}
        >
          <div className="transition-sticky">
            <div className="transition-grain" aria-hidden="true" />
            <div className="transition-orbit transition-orbit-one" aria-hidden="true" />
            <div className="transition-orbit transition-orbit-two" aria-hidden="true" />

            <div className="transition-top">
              <span>THE PHAN LEGACY</span>
              <span>CHƯƠNG 02 / 02</span>
            </div>

            <div className="transition-center">
              <div className="transition-eyebrow">
                <span className="transition-dot" />
                MỌI THÀNH TÍCH ĐỀU BẮT ĐẦU TỪ
              </div>

              <div className="transition-title-wrap">
                <h2 className={phraseIndex === 0 ? "phrase-active" : ""}>
                  NHỮNG NỖ LỰC<span>.</span>
                </h2>
                <h2 className={phraseIndex === 1 ? "phrase-active" : ""}>
                  NHỮNG CON NGƯỜI<span>.</span>
                </h2>
                <h2 className={phraseIndex === 2 ? "phrase-active" : ""}>
                  NHỮNG DẤU ẤN<span>.</span>
                </h2>
              </div>

              <p className="transition-description">
                Đằng sau những con số là những gương mặt. Đằng sau những giải thưởng
                là những hành trình không được kể hết.
              </p>
            </div>

            <div className="transition-bottom">
              <span>01 — NỖ LỰC</span>
              <span>02 — TRƯỞNG THÀNH</span>
              <span>03 — DẤU ẤN</span>
            </div>

            <div className="transition-scroll-cue" aria-hidden="true">
              <span>TIẾP TỤC CUỘN</span>
              <span className="transition-scroll-line"><i /></span>
            </div>

            <div className="transition-counter" aria-hidden="true">
              0{phraseIndex + 1}<span> / 03</span>
            </div>
          </div>
        </div>

        <section
          id="directory"
          ref={directoryRef}
          className="directory-section"
          aria-label="Danh sách học sinh đạt thành tích"
        >
          <div className="list-paper">
            <div className="directory-rail">
              <span>THE PHAN LEGACY</span>
              <span>THÀNH TÍCH · 2024—2025</span>
            </div>

            <div className="list-top reveal">
              <div className="list-heading">
                <div className="kicker">NHỮNG GƯƠNG MẶT TIÊU BIỂU</div>
                <h2>HSGQG<span>.</span></h2>
                <p>Mỗi thành tích là một dấu mốc.<br />Mỗi cái tên là một câu chuyện.</p>
              </div>
              <div className="directory-edition">
                <span>TRƯỜNG THPT CHUYÊN</span>
                <strong>PHAN BỘI CHÂU</strong>
                <span>NGHỆ AN · VIỆT NAM</span>
              </div>
              <div className="directory-index" aria-hidden="true">02</div>
            </div>

            <div className="list-summary">
              <span>DANH SÁCH THÀNH TÍCH</span>
              <span>{loading ? "ĐANG TẢI..." : `${String(students.length).padStart(2, "0")} HỌC SINH`}</span>
            </div>

            <div className="list-line" />

            {loading ? (
              <p className="list-message" role="status">Đang tải danh sách học sinh...</p>
            ) : error ? (
              <p className="list-message" role="alert">{error}</p>
            ) : students.length === 0 ? (
              <p className="list-message">Chưa có dữ liệu học sinh.</p>
            ) : (
              <div className="students">
                {students.map((student: Student, index) => (
                  <article className="student reveal" key={student.id}>
                    <span className="student-number">{String(index + 1).padStart(2, "0")}</span>
                    <div className="student-info">
                      <strong>{student.name}</strong>
                      <span>HỌC SINH</span>
                    </div>
                    <span className="student-subject">{student.subject}</span>
                    <span className={`student-badge ${
                      student.award === "GIẢI NHẤT" ? "award-first" :
                      student.award === "GIẢI NHÌ" ? "award-second" :
                      student.award === "GIẢI BA" ? "award-third" : ""
                    }`}>{student.award}</span>
                    <span className="student-arrow" aria-hidden="true">↗</span>
                  </article>
                ))}
              </div>
            )}

            <footer className="list-footer">
              <span>THE PHAN LEGACY</span>
              <button type="button" onClick={scrollToStory}>
                <span aria-hidden="true">↑</span> VỀ ĐẦU TRANG
              </button>
              <span>2024 — 2025</span>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}

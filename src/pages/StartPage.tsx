
import { useEffect, useRef, useState } from 'react';
import NavBar from "./NavBar.tsx";
import './StartPage.css';



const members = [
  {
    name: 'Bảo VG',
    className: 'A2K53',
    role: 'Trưởng ban Kĩ thuật',
    seed: 'BaoVG',
  },
  {
    name: 'Trịnh Bá Hiếu',
    className: 'A1K53',
    role: 'Founder',
    image: '/Trinh_Ba_Hieu_A1K53.jpg',
    seed: 'Hieu',
  },
  {
    name: 'Nguyễn Minh Anh',
    className: 'C1K53',
    role: 'Trưởng ban Nội dung',
    seed: 'MinhAnh',
  },
  {
    name: 'Nguyễn Trọng Khiêm',
    className: 'A2K53',
    role: 'Thành viên ban Kĩ thuật',
    seed: 'Khiem',
  },
  {
    name: 'Võ Quang Thanh',
    className: 'A2K54',
    role: 'Thành viên ban Kĩ thuật',
    image: '/quangthanh.jpg',
    seed: 'QuangThanh',
  },
  {
    name: 'Lương Nữ Hồng Anh',
    className: 'C2K54',
    role: 'Thành viên ban Kĩ thuật',
    image: '/Luong_Nu_Hong_Anh_C2K54.jpg',
    seed: 'HongAnh',
  },
  {
    name: 'Cao Gia Nhi',
    className: 'C1K54',
    role: 'Thành viên ban Nội dung',
    seed: 'GiaNhi',
  },
  {
    name: 'Phạm Thị Anh Thơ',
    className: 'C2K54',
    role: 'Thành viên ban Nội dung',
    seed: 'AnhTho',
  },
  {
    name: 'Ngô Thụy Hồng Phúc',
    className: 'C2K54',
    role: 'Thành viên ban Nội dung',
    image: '/Ngo_Thuy_Hong_Phuc_C2K54.jpg',
    seed: 'HongPhuc',
  },
  {
    name: 'Bùi Thiên Khải',
    className: 'C5K54',
    role: 'Thành viên ban Nội dung',
    image: '/Bui_Thien_Khai_C5K54.jpg',
    seed: 'TruongKhai',
  },
  {
    name: 'Nguyễn Tài Định',
    className: 'C5K54',
    role: 'Thành viên ban Nội dung',
    seed: 'TaiDinh',
  },
  {
    name: 'Nguyễn Trâm Anh',
    className: 'C5K54',
    role: 'Thành viên ban Nội dung',
    image: '/Nguyen_Tram_Anh_C5K54.jpg',
    seed: 'TramAnh',
  },
  {
    name: 'Trần Hà Băng Băng',
    className: 'C8K54',
    role: 'Thành viên ban Nội dung',
    image: '/Tran_Ha_Bang_Bang_C8K54.jpg',
    seed: 'BangBang',
  },
];

function Avatar({
  name,
  image,
  seed,
}: {
  name: string;
  image?: string;
  seed: string;
}) {
  const [src, setSrc] = useState(
    image || `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`,
  );

  return (
    <div className="avatar-circle">
      <img
        src={src}
        alt={name}
        loading="lazy"
        onError={() => {
          const fallback = `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
          if (src !== fallback) setSrc(fallback);
        }}
      />
    </div>
  );
}

export default function StartPage() {
const [activeChapter, setActiveChapter] = useState(0);
  const [openMemory, setOpenMemory] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll('.reveal').forEach((element) => {
      observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const rect = e.currentTarget.getBoundingClientRect();

    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  const resetMouse = () => setMouse({ x: 0, y: 0 });

  const scrollToSection = (id: string) => {
  const element = document.getElementById(id);

  if (element) {
    const y = element.getBoundingClientRect().top + window.scrollY - 40;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  }

  setMenuOpen(false);
};

  const handleHeroImageError = (
    e: React.SyntheticEvent<HTMLImageElement>,
  ) => {
    const img = e.currentTarget;
    const sources = ['/background.jpg', '/tuong-phan.jpg', '/tuong phan.jpg'];
    const step = Number(img.dataset.step || 0);

    if (step < sources.length) {
      img.dataset.step = String(step + 1);
      img.src = sources[step];
    }
  };

  return (
    <main className="start-page">
      <NavBar />

      {/* HERO: MOUSE-INTERACTIVE BACKGROUND */}
      <section
        id="home"
        ref={heroRef}
        className="hero-section"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetMouse}
      >
        <div className="hero-bg-image">
          <img
            alt="Tượng Phan Bội Châu và khuôn viên trường"
            onError={handleHeroImageError}
            style={{
              transform: `scale(1.08) translate(${mouse.x * -9}px, ${mouse.y * -7}px)`,
            }}
          />
        </div>

        <div className="hero-tint" />
        <div className="hero-gradient-overlay" />


        <div className="hero-floating-mark" aria-hidden="true">
  <img
    src="/img/statue.jpg"
    alt=""
    style={{
      transform: `translate(${mouse.x * 3}px, ${mouse.y * 3}px) rotate(${mouse.x * 0.3}deg)`,
    }}
  />
</div>

        <div className="hero-content">
          <div className="hero-eyebrow">
          </div>

          <h1 className="hero-title">
            THE
            <br />
            <span className="highlight-red-italic">PHAN</span>
            <br />
            <span className="highlight-green">LEGACY</span>
            <span className="title-period">.</span>
          </h1>

          <div className="hero-title-line" />

          <p className="hero-description">
            Một ngôi trường.
            <br />
            Nhiều thế hệ.
            <br />
            <strong>Một di sản sống mãi.</strong>
          </p>

          <p className="hero-school">
          </p>

          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => scrollToSection('history')}
            >
              KHÁM PHÁ DI SẢN 
            </button>
          </div>
        </div>

      </section>



{/* ABOUT */}
<section id="history" className="about-section section-anchor">
  <div className="about-background-overlay"></div>

  <div className="container">
    <div className="section-intro reveal">
      <h2 className="section-title">
        Không chỉ là
        <br />
        <em>một ngôi trường.</em>
      </h2>

      <p className="about-lead">
        Đó là nơi những câu chuyện bắt đầu, những thế hệ trưởng thành
        và những giá trị được truyền lại.
      </p>
    </div>

    <div className="about-grid">
      <article className="about-card reveal">
        <span className="about-card-index">A / THE VISION</span>

        <h3>Dự án là gì?</h3>

        <p>
          The Phan Legacy là không gian di sản số của Trường THPT
          Chuyên Phan Bội Châu. Dự án tái hiện lịch sử, kiến trúc và
          giá trị tinh thần của ngôi trường qua hình ảnh, tư liệu
          và công nghệ không gian tương tác.
        </p>

      </article>

      <article className="about-card about-card-dark reveal">
        <span className="about-card-index">B / THE PURPOSE</span>

        <h3>Di sản cho tương lai.</h3>

        <p>
          Kết nối các thế hệ học sinh, lưu giữ những kỷ niệm vô giá
          và truyền cảm hứng về tri thức, lòng tự hào và tinh thần
          Chuyên Phan cho những thế hệ mai sau.
        </p>
      </article>
    </div>
  </div>
</section>



{/* THE STORY */}
<section className="story-section section-anchor" id="story">
  <div className="story-container">
    <div className="story-heading">
      <h2>
        VÌ SAO CHÚNG TÔI 
        <br />
        <em>Bắt Đầu</em>
      </h2>
    </div>

    <div className="story-panel">
      <div className="story-content">
        {activeChapter === 0 && (
          <>
            <h3>Nơi lưu giữ một thời thanh xuân.</h3>
            <p>
                Chuyên Phan Bội Châu có lẽ luôn gắn liền trong kí ức của bao thế hệ
                về hình ảnh ngôi trường có màu vàng đặc trưng, tọa lạc ngay tại trung tâm 
                Thành phố Vinh, tỉnh Nghệ An. Không chỉ là nơi để học tập, mỗi hành lang, mỗi lớp học,
                mỗi góc nhỏ đều đã đồng hành và lưu giữ thời thanh xuân của biết bao lứa học trò.

            </p>
          </>
        )}

        {activeChapter === 1 && (
          <>
            <h3>Một hành trình khép lại, một hành trình mở ra.</h3>
            <p>
                Sau hơn 50 năm đồng hành, điểm trường tại 119 Lê Hồng Phong đã hoàn thành sứ mệnh lịch sử của mình.
                Trong thời đại hội nhập và phát triển, trường THPT Chuyên Phan Bội Châu được chuyển về địa điểm mới với 
                một diện mạo hiện đại và khang trang hơn.
            </p>
          </>
        )}

        {activeChapter === 2 && (
          <>
            <h3>Để những điều thân thuộc không bị lãng quên.</h3>
            <p>
                Chúng tôi bởi vậy hiểu rằng mình là những thế hệ cuối cùng được đồng hành cùng nơi chốn 
                mang đậm dấu ấn lịch sử này. Với mong muốn không chỉ thế hệ mình mà cả hàng những thế hệ sau cũng có cơ hội 
                thấu hiểu một phần như một món quà tri ân trước lời tạm biệt, để rồi mái trường sẽ sống mãi trong kí ức của 
                bất kì ai đã, đang và sẽ là Phanners.
            </p>
          </>
        )}

        <button
          className="story-next"
          onClick={() => setActiveChapter((activeChapter + 1) % 3)}
        >
          {activeChapter === 2 ? "Đọc lại từ đầu" : "Tiếp tục câu chuyện"}
          <span> ↗</span>
        </button>
      </div>

      <div className="story-visual">
        <img
          src={
            activeChapter === 0
              ? "/school-bg.jpg"
              : activeChapter === 1
              ? "/school-new-campus.jpg"
              : "/school-corridor.jpg"
          }
          alt={
            activeChapter === 0
              ? "Mái trường Chuyên Phan"
              : activeChapter === 1
              ? "Cơ sở mới của trường"
              : "Hành lang trường học"
          }
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/school-bg.jpg";
          }}
        />
        <span className="story-image-caption">
          THPT CHUYÊN PHAN BỘI CHÂU · NGHỆ AN
        </span>
      </div>
    </div>

    <div className="story-progress">
      <span>0{activeChapter + 1}</span>
      <div className="story-progress-track">
        <div
          className="story-progress-fill"
          style={{ width: `${((activeChapter + 1) / 3) * 100}%` }}
        />
      </div>
      <span>03</span>
    </div>
  </div>
</section>


<section className="memory-section section-anchor" id="memories">
  <div className="memory-container">
    <div className="memory-heading">
      <span className="memory-eyebrow">THE PHAN LEGACY / THE ARCHIVE</span>
      <h2>
        Những nơi
        <br />
        <em>còn ở lại.</em>
      </h2>
      <p>
        Đôi khi, một bức ảnh có thể đưa ta trở về nơi mà thời gian
        đã bắt đầu đổi khác.
      </p>
    </div>

    <div className="memory-grid">
      <button
        className={
          openMemory === 0 ? "memory-card expanded" : "memory-card"
        }
        onClick={() => setOpenMemory(openMemory === 0 ? null : 0)}
        aria-expanded={openMemory === 0}
      >
        <div className="memory-image-wrap">
          <img src="/img/school-bg.jpg" alt="Mái trường Chuyên Phan" />
          
        </div>
        <div className="memory-card-content">
          <span className="memory-category">THE PLACE</span>
          <h3>Mái trường</h3>
          <p className="memory-summary">
            Nơi bắt đầu của biết bao hành trình.
          </p>
          {openMemory === 0 && (
            <p className="memory-description">
              Ngôi trường không chỉ là những bức tường và mái ngói.
              Đó còn là nơi những tình bạn được hình thành, những
              ước mơ được nuôi dưỡng và những thế hệ cùng trưởng thành.
            </p>
          )}
        </div>
      </button>

      <button
        className={
          openMemory === 1 ? "memory-card expanded" : "memory-card"
        }
        onClick={() => setOpenMemory(openMemory === 1 ? null : 1)}
        aria-expanded={openMemory === 1}
      >
        <div className="memory-image-wrap">
          <img
            src="/school-corridor.jpg"
            alt="Hành lang trường học"
          />
        </div>
        <div className="memory-card-content">
          <span className="memory-category">THE JOURNEY</span>
          <h3>Hành lang</h3>
          <p className="memory-summary">
            Những bước chân qua bao thế hệ.
          </p>
          {openMemory === 1 && (
            <p className="memory-description">
              Trên những hành lang quen thuộc, biết bao câu chuyện
              nhỏ đã diễn ra: những cuộc trò chuyện giờ ra chơi,
              những ngày ôn thi và những khoảnh khắc tưởng chừng
              bình thường nhưng chẳng dễ gì quên.
            </p>
          )}
        </div>
      </button>

      <button
        className={
          openMemory === 2 ? "memory-card expanded" : "memory-card"
        }
        onClick={() => setOpenMemory(openMemory === 2 ? null : 2)}
        aria-expanded={openMemory === 2}
      >
        <div className="memory-image-wrap">
          <img
            src="/school-classroom.jpg"
            alt="Lớp học tại trường"
          />
        </div>
        <div className="memory-card-content">
          <span className="memory-category">THE PEOPLE</span>
          <h3>Lớp học</h3>
          <p className="memory-summary">
            Nơi những con người cùng lớn lên.
          </p>
          {openMemory === 2 && (
            <p className="memory-description">
              Mỗi lớp học lưu giữ một thế giới riêng: những bài
              giảng, những nỗ lực thầm lặng, những tiếng cười và
              tình cảm gắn kết mà mỗi người mang theo sau khi rời trường.
            </p>
          )}
        </div>
      </button>
    </div>
  </div>
</section>




      {/* TEAM */}
      <section id="team" className="team-section section-anchor">
        <div className="container">
          <div className="team-heading reveal">
            <h2 className="section-title">
              Một di sản.
              <br />
              <em>Nhiều người kể chuyện.</em>
            </h2>
            <p>
              Được xây dựng bằng sự tò mò, sáng tạo và niềm tự hào
              của những thành viên trong nhóm dự án.
            </p>
          </div>

          <div className="team-grid">
            <div className="team-row row-leaders">
              {members.slice(0, 3).map((member, i) => (
                <article
                  className={`member-card reveal ${i === 1 ? 'member-founder' : ''}`}
                  key={member.name}
                >
                  <Avatar
                    name={member.name}
                    image={member.image}
                    seed={member.seed}
                  />
                  <p className="member-name">{member.name}</p>
                  <span className="member-class">{member.className}</span>
                  <span className="member-role">{member.role}</span>
                </article>
              ))}
            </div>

            <div className="team-row-group">
              <div className="team-row">
                {members.slice(3).map((member) => (
                  <article className="member-card reveal" key={member.name}>
                    <Avatar
                      name={member.name}
                      image={member.image}
                      seed={member.seed}
                    />
                    <p className="member-name">{member.name}</p>
                    <span className="member-class">{member.className}</span>
                    <span className="member-role">{member.role}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-cta reveal">
            <span>THE PHAN LEGACY</span>
            <h2>
              Quá khứ được lưu giữ.
              <br />
              <em>Tương lai được tiếp nối.</em>
            </h2>
            <button
              className="footer-tour-button"
              onClick={() => scrollToSection('home')}
            >
              TRỞ VỀ ĐẦU TRANG ↑
            </button>
          </div>

          <div className="footer-partners">
            <p className="partners-title">Đồng hành & phát triển cùng</p>
            <div className="partner-logos">
              <span>THPT Chuyên Phan Bội Châu</span>
              <span className="partner-dot">•</span>
              <span>Di Sản Số Việt Nam</span>
              <span className="partner-dot">•</span>
              <span>The Phan Legacy Team</span>
            </div>
          </div>

         </div>
      </footer>
    </main>
  );
}
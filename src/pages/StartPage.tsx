import './StartPage.css';

/** Khối Thành tích khác: một div bao ngoài để ghép cùng phần HSGQG. */
export default function StartPage() {
  return (
    <div id="thanh-tich-khac" className="tpl-achievements" role="region" aria-labelledby="tpl-achievements-title">
      <header className="tpl-achievements__header">
        <section className="tpl-achievements__intro">
          <p className="tpl-achievements__eyebrow"><span aria-hidden="true">✦</span> THE PHAN LEGACY <span className="tpl-achievements__separator" aria-hidden="true">/</span> THÀNH TÍCH KHÁC</p>
          <h2 id="tpl-achievements-title">Những dấu ấn<br /><em>ngoài trang sách.</em></h2>
        </section>
        <p className="tpl-achievements__lead">Từ sân khấu đến sân chơi, mỗi thế hệ để lại một sắc màu trong câu chuyện trường Phan.</p>
      </header>

      <section className="tpl-achievements__grid" aria-label="Các thành tích văn nghệ, thể thao và học sinh thanh lịch">
        <article className="tpl-achievements__card tpl-achievements__card--featured">
          <figure className="tpl-achievements__stage" aria-label="Minh họa sân khấu kịch">
            <svg className="tpl-achievements__stage-art" viewBox="0 0 600 250" aria-hidden="true" focusable="false">
              <path className="tpl-achievements__arch" d="M110 240V122C110 22 490 22 490 122V240" />
              <path className="tpl-achievements__arch tpl-achievements__arch--inner" d="M132 240V126C132 48 468 48 468 126V240" />
              <path className="tpl-achievements__curtain" d="M0 0H180C172 72 140 125 65 169L85 250H0Z" />
              <path className="tpl-achievements__curtain" d="M600 0H420C428 72 460 125 535 169L515 250H600Z" />
              <path className="tpl-achievements__curtain-line" d="M32 0L65 169M82 0L65 169M132 0L65 169M568 0L535 169M518 0L535 169M468 0L535 169M65 169L20 250M65 169L50 250M535 169L580 250M535 169L550 250" />
              <path className="tpl-achievements__floor" d="M90 238H510M130 247H470" />
              <path className="tpl-achievements__spark" d="M300 18V38M290 28H310M233 93V105M227 99H239M367 93V105M361 99H373" />
            </svg>
            <figcaption className="tpl-achievements__stage-caption"><span>MỘT DẤU SON SÂN KHẤU</span><strong>1975</strong><span>VĂN NGHỆ TOÀN NGÀNH</span></figcaption>
          </figure>
          <section className="tpl-achievements__card-body">
            <p className="tpl-achievements__category">01 <span aria-hidden="true">—</span> VĂN HÓA &amp; NGHỆ THUẬT</p>
            <h3>“Đường về”</h3>
            <p className="tpl-achievements__award">Giải Nhất tập thể<br />và giải nữ diễn viên xuất sắc</p>
            <p className="tpl-achievements__description">Vở kịch do các thầy cô thể hiện tại Hội thi văn nghệ toàn ngành, do Ty Giáo dục Nghệ An tổ chức năm 1975.</p>
            <details className="tpl-achievements__details">
              <summary>Câu chuyện phía sau <span className="tpl-achievements__plus" aria-hidden="true">+</span></summary>
              <section className="tpl-achievements__story">
                <p>Thầy Minh Đô viết kịch bản. Thành tích được cô Trần Thị Bích Diệp nhắc lại trong hồi ký <cite>Một thời để nhớ để thương</cite>, như một ký ức về đời sống văn nghệ của thầy trò trường Phan.</p>
                <a href="https://docs.google.com/document/d/1O203KqfVoE9Pe7VkG_L2jkbDf24XUaFNqTeeu1j_vEw/edit?tab=t.0" target="_blank" rel="noopener noreferrer">Đọc tư liệu gốc <span aria-hidden="true">↗</span><span className="tpl-achievements__sr-only"> (mở trong thẻ mới)</span></a>
              </section>
            </details>
          </section>
        </article>

        <article className="tpl-achievements__card tpl-achievements__card--sport">
          <header className="tpl-achievements__small-card-top">
            <p className="tpl-achievements__category">02 <span aria-hidden="true">—</span> THỂ THAO</p>
            <svg className="tpl-achievements__icon" viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
              <path d="M37 9c-9-3-22 6-25 15-3 9 1 17 10 19 5 1 8-1 11 3l9 10 7-7-10-9c-4-3-2-6-1-11 2-9 6-17-1-20Z" />
              <path d="m15 20 23 19" /><circle cx="49" cy="15" r="7" />
            </svg>
          </header>
          <h3>Giải Nhất<br />bóng bàn đồng đội nam</h3>
          <p className="tpl-achievements__description">Dấu ấn của đội tuyển giáo viên trường Phan tại Hội thao toàn ngành Giáo dục Nghệ Tĩnh.</p>
          <details className="tpl-achievements__details">
            <summary>Những người làm nên dấu ấn <span className="tpl-achievements__plus" aria-hidden="true">+</span></summary>
            <section className="tpl-achievements__story">
              <p>Đội tuyển gồm các thầy Phạm Xuân Thâm, Phan Huy Tuấn và Dương Đình Thanh. Thành tích được kể trong hồi ký <cite>Nhớ một thời tôi từng sống</cite> của thầy Phan Huy Tuấn.</p>
              <a href="https://docs.google.com/document/d/1O203KqfVoE9Pe7VkG_L2jkbDf24XUaFNqTeeu1j_vEw/edit?tab=t.0" target="_blank" rel="noopener noreferrer">Đọc tư liệu gốc <span aria-hidden="true">↗</span><span className="tpl-achievements__sr-only"> (mở trong thẻ mới)</span></a>
            </section>
          </details>
        </article>

        <article className="tpl-achievements__card tpl-achievements__card--student">
          <header className="tpl-achievements__small-card-top">
            <p className="tpl-achievements__category">03 <span aria-hidden="true">—</span> DẤU ẤN HỌC TRÒ</p>
            <svg className="tpl-achievements__icon" viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
              <path d="m32 7 5 11 12 2-9 9 2 12-10-6-10 6 2-12-9-9 12-2Z" />
              <path d="M14 35C7 28 6 20 8 13M11 25l8 2M10 18l7 2M50 35c7-7 8-15 6-22M53 25l-8 2M54 18l-7 2M23 45l-2 12 11-6 11 6-2-12" />
            </svg>
          </header>
          <h3>Đường Hải Yến</h3>
          <p className="tpl-achievements__student-award">Giải Nhất Học sinh thanh lịch cấp tỉnh</p>
          <p className="tpl-achievements__description">Một gương mặt trường Phan được ghi dấu trong lần đầu cuộc thi cấp tỉnh được tổ chức.</p>
          <details className="tpl-achievements__details">
            <summary>Mở trang hồi ký <span className="tpl-achievements__plus" aria-hidden="true">+</span></summary>
            <section className="tpl-achievements__story">
              <p>Trong hồi ký <cite>Nhớ một thời tôi từng sống</cite>, thầy Phan Huy Tuấn nhắc tới Đường Hải Yến cùng những tài năng văn nghệ, thể thao và sáng tác của học sinh trường Phan.</p>
              <a href="https://docs.google.com/document/d/1O203KqfVoE9Pe7VkG_L2jkbDf24XUaFNqTeeu1j_vEw/edit?tab=t.0" target="_blank" rel="noopener noreferrer">Đọc tư liệu gốc <span aria-hidden="true">↗</span><span className="tpl-achievements__sr-only"> (mở trong thẻ mới)</span></a>
            </section>
          </details>
        </article>
      </section>

      <footer className="tpl-achievements__footer">
        <p><span className="tpl-achievements__footer-mark" aria-hidden="true">✦</span> Một mái trường. Nhiều thế hệ. Muôn sắc tài năng.</p>
        <a href="https://docs.google.com/document/d/1O203KqfVoE9Pe7VkG_L2jkbDf24XUaFNqTeeu1j_vEw/edit?tab=t.0" target="_blank" rel="noopener noreferrer">Tư liệu hồi ký trường Phan <span aria-hidden="true">↗</span><span className="tpl-achievements__sr-only"> (mở trong thẻ mới)</span></a>
      </footer>
    </div>
  );
}

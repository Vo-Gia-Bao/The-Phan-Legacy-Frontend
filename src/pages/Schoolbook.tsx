import { forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import "./BookFlip.css";

type BookPage = {
  id: string;
};

const pages: BookPage[] = [
  { id: "page-1" },
  { id: "page-2" },
  { id: "page-3" },
  { id: "page-4" },
  { id: "page-5" },
  { id: "page-6" },
  { id: "page-7" },
  { id: "page-8" },
];

const Page = forwardRef<HTMLDivElement, { index: number }>(({ index }, ref) => {
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="book-page">
      <img
        src={isEven ? "/template-even.jpg" : "/template-odd.jpg"}
        className="page-template"
        draggable={false}
      />
    </div>
  );
});

Page.displayName = "Page";

const FlipBook: any = HTMLFlipBook;

export default function BookFlip() {
  return (
    <div className="book-wrapper">
      <FlipBook
        width={700}
        height={900}
        size="fixed"
        showCover={false}
        startPage={0}
        drawShadow
        flippingTime={800}
        useMouseEvents
        mobileScrollSupport
        maxShadowOpacity={0.25}
      >
        {pages.map((_, index) => (
          <Page key={index} index={index} />
        ))}
      </FlipBook>
    </div>
  );
}
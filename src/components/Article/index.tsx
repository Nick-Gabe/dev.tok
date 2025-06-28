import { SocialButtons } from "./SocialButtons";
import { Image } from "./Image";
import { ContentPreview } from "./ContentPreview";

type ArticleProps = {
  article: Article;
  onCommentsClick?: () => void;
};

export const Article = ({ article, onCommentsClick }: ArticleProps) => {
  return (
    <div className="h-dyn-screen snap-center flex flex-col justify-end items-center relative max-w-[500px] mx-auto">
      <Image article={article} />
      <div className={`${article.cover_image ? "justify-end" : "justify-center"} p-3 pb-8 max-w-screen h-dyn-screen flex flex-col items-center`}>
        <div className="w-[calc(100%-0.75rem)] max-w-screen grid grid-cols-[1fr_40px] gap-3">
          <ContentPreview article={article} />
          <SocialButtons article={article} onCommentsClick={onCommentsClick} />
        </div>
      </div>
    </div>
  );
};

import { ChatCircleDots, Heart } from "@phosphor-icons/react";
import { useRef } from "react";
import { Reactions, ReactionsHandler } from "../Feed/Reactions";

type SocialButtonsProps = {
  article: Article;
  onCommentsClick?: () => void;
};

export const SocialButtons = ({
  article,
  onCommentsClick,
}: SocialButtonsProps) => {
  const reactionsRef = useRef<ReactionsHandler>(null);

  const reactionHandler = (articleId: number) => {
    if (reactionsRef.current) {
      reactionsRef.current.toggle(articleId);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-end">
      <a
        href={`https://dev.to/${article.user.username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-10"
      >
        {article.organization && (
          <img
            className="absolute rounded-full w-full max-w-10 border-2 -z-10 -top-5"
            src={article.organization.profile_image_90}
            alt={article.organization.name}
          />
        )}
        <img
          className="rounded-full w-full max-w-10 border-2"
          src={article.user.profile_image_90}
          alt={article.user.name}
        />
      </a>
      <div className="flex flex-col text-center gap-1 w-10 justify-center">
        <button 
          className="relative"
          onClick={() => reactionHandler(article.id)}
        >
          <Heart className="text-gray-100 w-10 h-10" weight="fill" />
          <Reactions ref={reactionsRef} />
        </button>
        <p className="text-gray-100 text-sm">
          {article.public_reactions_count}
        </p>
      </div>
      <div className="flex flex-col text-center gap-1 w-10">
        <button onClick={onCommentsClick}>
          <ChatCircleDots className="text-gray-100 w-10 h-10" weight="fill" />
        </button>
        <p className="text-gray-100 text-sm">{article.comments_count}</p>
      </div>
    </div>
  );
};

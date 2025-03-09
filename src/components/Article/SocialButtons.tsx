import { ChatCircleDots, DotsThreeOutline, Heart } from "@phosphor-icons/react";
import { useRef } from "react";
import { Reactions, ReactionsHandler } from "../Feed/Reactions";
import { useTranslation } from "react-i18next";

type SocialButtonsProps = {
  article: Article;
  onCommentsClick?: () => void;
};


export const SocialButtons = ({
  article,
  onCommentsClick,
}: SocialButtonsProps) => {
  const { t } = useTranslation();
  const reactionsRef = useRef<ReactionsHandler>(null);

  const showReactions = (articleId: number) => {
    if (reactionsRef.current) {
      reactionsRef.current.toggle(articleId);
    }
  };

  const copyToClipboard = (article: Article) => {
    navigator.clipboard.writeText(article.url)
    alert(t('socialButtons.copiedSuccessfully'))
  }
  
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
          onClick={() => showReactions(article.id)}
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
      <div className="dropdown dropdown-top dropdown-end">
        <div tabIndex={0} role="button"><DotsThreeOutline className="text-gray-100 w-10 h-10" weight="fill" /></div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li><button className="btn bg-accent m-2" onClick={() => copyToClipboard(article)}>{t("socialButtons.copy")}</button></li>
          <li><button className={`btn bg-accent m-2 block ${typeof navigator.share === 'function' ? '' : 'hidden'}`} onClick={() => navigator.share({ title: article.title, url: article.url })}>{t("socialButtons.share")}</button></li>
          <li><a className="btn bg-error m-2" href={`https://dev.to/report-abuse?url=${encodeURIComponent(article.url)}`} target="_blank" rel="noopener noreferrer">{t("socialButtons.report")}</a></li>
        </ul>
      </div>
    </div>
  );
};

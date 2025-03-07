import { ChatCircleDots, DotsThreeOutline, Heart } from "@phosphor-icons/react";

type SocialButtonsProps = {
  article: Article;
  onCommentsClick?: () => void;
};

const copyToClipboard = (article: Article) => {
  navigator.clipboard.writeText(article.url)
}

const reportWithReferrer = (article: Article) => {
  window.open(`https://dev.to/report-abuse?url=${encodeURIComponent(article.url)}`, '_blank');
}


export const SocialButtons = ({
  article,
  onCommentsClick,
}: SocialButtonsProps) => {
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
        <Heart className="text-gray-100 w-10 h-10" weight="fill" />
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
      <div className="flex flex-col text-center gap-1 w-10">
        <button onClick={() => {
          const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
          modal.showModal();
        }}>
          <DotsThreeOutline className="text-gray-100 w-10 h-10" weight="fill" />
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="flex flex-col w-1/2 items-center justify-center m-auto">
              <button className="btn bg-accent m-2" onClick={() => copyToClipboard(article)}>Copy link</button>
              <button className="btn bg-accent m-2 block md:hidden" onClick={() => navigator.share({ title: article.title, url: article.url })}>Share to</button>
              <button className="btn bg-error m-2" onClick={() => reportWithReferrer(article)}>Report</button>
            </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      </div>
    </div>
  );
};

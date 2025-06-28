import { useTranslation } from "react-i18next";

type ContentPreviewProps = {
  article: Article;
};

export const ContentPreview = ({ article }: ContentPreviewProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-black/25 p-3 rounded-lg">
      <h2 className="font-bold text-2xl mb-2">{article.title}</h2>
      <div className="flex flex-wrap mb-2">
        {article.tag_list.map((tag) => (
          <span
            key={tag}
            className="border-gray-100 border text-gray-100 px-2 py-1 rounded-full text-xs mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>
      <hr className="mb-4" />
      <p className="mb-4 hyphens-auto">{article.description}</p>
      <div className="flex items-center justify-between gap-1">
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <button className="btn btn-outline">{t("forYou.readMore")}</button>
        </a>
        <p className="opacity-50">
          {t("forYou.minRead", {
            min: article.reading_time_minutes,
          })}{" "}
          &middot; {new Date(article.published_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { devtoForemApi } from "../../shared/api";
import sanitizeHtml from "sanitize-html";
import { Spinner, X } from "@phosphor-icons/react";
import { formatDistance } from "date-fns/formatDistance";
import { useTranslation } from "react-i18next";

export type CommentsHandler = {
  open: (articleId: number) => void;
};

export const Comments = forwardRef<CommentsHandler>((_, ref) => {
  const { t } = useTranslation();
  const [articleId, setArticleId] = useState<number | null>(null);
  const { data: comments, isPending } = useQuery({
    queryKey: ["comments", articleId],
    enabled: !!articleId,
    queryFn: async () => {
      const params = new URLSearchParams({
        a_id: articleId?.toString() ?? "",
      });
      return (await devtoForemApi.get("/comments?" + params)).data as Comment[];
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    open: (articleId: number) => {
      setArticleId(articleId);
      setIsOpen(true);
    },
  }));

  return (
    <div
      ref={backdropRef}
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
      onClick={(event) => {
        if (event.target === backdropRef.current) {
          setIsOpen(false);
        }
      }}
    >
      <motion.div
        className="fixed inset-x-0 bottom-0 h-[calc(70vh+3.5rem)] max-w-[700px] mx-auto bg-white rounded-t-2xl shadow-lg"
        style={{ y: "100%" }}
        animate={{ y: isOpen ? 0 : "100%" }}
        transition={{
          bounce: 0,
          ease: "circOut",
        }}
      >
        <div className="h-14 flex flex-col justify-center p-4 gap-2 text-black">
          <button onClick={() => setIsOpen(false)} className="absolute right-2">
            <X className="w-8 h-8 hover:bg-gray-200 rounded-full aspect-square" />
          </button>
          <h2 className="text-black font-semibold text-left">
            {t("comments.title")}
          </h2>
        </div>
        <div className="flex flex-col gap-4 p-4 text-black h-[70vh] overflow-auto overscroll-none">
          {isPending ? (
            <Spinner className="w-10 h-10 animate-spin mx-auto" weight="bold" />
          ) : comments?.length ? (
            comments.map((comment) => (
              <div key={comment.id_code} className="flex gap-4">
                <img
                  src={comment.user.profile_image}
                  alt={comment.user.name}
                  className="min-w-10 w-10 h-10 bg-gray-300 rounded-full translate-y-1"
                />
                <div>
                  <div className="flex items-center">
                    <h3 className="font-semibold">{comment.user.name}</h3>
                    <time
                      dateTime={comment.created_at}
                      className="ml-2 text-gray-500 text-sm"
                    >
                      {formatDistance(new Date(), new Date(comment.created_at))}
                    </time>
                  </div>
                  <div
                    key={comment.id_code + "_body"}
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(comment.body_html, {
                        allowedTags: ["img"],
                      }),
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">{t("comments.empty")}</p>
          )}
        </div>
      </motion.div>
    </div>
  );
});

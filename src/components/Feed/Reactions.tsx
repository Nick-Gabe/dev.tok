import { Bomb, Fire, HandsPraying, Heart, Horse, Spinner } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { api_reactions } from "../../shared/api";

const reactionIcons = {
  like: {
    Icon: Heart,
  },
  unicorn: {
    Icon: Horse,
  },
  exploding_head: {
    Icon: Bomb,
  },
  raised_hands: {
    Icon: HandsPraying,
  },
  fire: {
    Icon: Fire,
  },
};

export type ReactionsHandler = {
    toggle: (articleId: number) => void;
};

export const Reactions = forwardRef<ReactionsHandler>((_, ref) => {
  const [articleId, setArticleId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  const { data: reactions, isPending } = useQuery({
    queryKey: ["reactions", articleId],
    enabled: !!articleId,
    queryFn: async () => {
      const params = new URLSearchParams({
        article_id: articleId?.toString() ?? "",
      });
      return (await api_reactions.get("/reactions?" + params)).data as Reactions;
    },
  });

  useImperativeHandle(ref, () => ({
    toggle: (articleId: number) => {
      setArticleId(articleId);
      setIsOpen(!isOpen);
    },
  }));

  return (
    <>
      <div
        ref={backdropRef}
        className={`fixed inset-0 w-full h-full z-50 ${isOpen ? "" : "pointer-events-none"}`}
      ></div>

      <motion.div
        className="absolute -bottom-8 right-14 px-8 py-4 min-w-[200px] bg-white rounded-2xl shadow-lg"
        style={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{
          bounce: 0,
          ease: "circOut",
        }}
      >
        <div className="block w-full h-full">
          {isPending ? (
            <Spinner className="w-10 h-10 animate-spin mx-auto" weight="bold" color="#000" />
          ) : reactions?.article_reaction_counts?.length ? (
            <div className="flex items-center justify-between h-full">
              {reactions.article_reaction_counts?.map(({ category, count }) => {
                const { Icon } = reactionIcons[category] || {};
                
                if (!Icon) return null;

                return (
                  <div className="mr-6 last:mr-0">
                    <Icon color={"#000"} size={28} className="mb-4" />
                    <p className="text-black">{count}</p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </motion.div>
    </>
  )
});

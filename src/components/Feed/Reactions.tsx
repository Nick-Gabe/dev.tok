import { Bomb, Fire, HandsPraying, Heart, Horse, Spinner } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { devtoCustomApi } from "../../shared/api";

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
      return (await devtoCustomApi.get("/reactions?" + params)).data as Reactions;
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
        className={`fixed inset-0 w-full h-full z-50 ${isOpen ? "" : "hidden"}`}
      />

      <motion.div
        className="absolute -bottom-8 right-14 px-8 py-4 min-w-[200px] bg-white rounded-2xl shadow-lg"
        style={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        aria-hidden={!isOpen}
        transition={{
          bounce: 0,
          ease: "circOut",
        }}
      >
        <div className="block w-full h-full">
          {isPending ? (
            <Spinner className="w-10 h-10 animate-spin mx-auto" weight="bold" color="#000" />
          ) : (
            <div className="flex items-center justify-between h-full gap-6">
              {
                Object.entries(reactionIcons).map(([category, reaction]) => {
                  const count = reactions?.article_reaction_counts.find(
                    (r) => r.category === category
                  )?.count ?? 0;
                  return (
                    <div>
                      <reaction.Icon color="black" size={28} className="mb-4" />
                      <p className="text-black">{count}</p>
                    </div>
                  );
                })
              }
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
});

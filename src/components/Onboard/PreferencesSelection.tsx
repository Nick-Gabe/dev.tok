import { useQuery } from "@tanstack/react-query";
import { devtoForemApi } from "../../shared/api";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

type PreferencesSelectionProps = {
  onFinish: () => void;
};

const MINIMUM_TAGS = 5;

export const PreferencesSelection = ({
  onFinish,
}: PreferencesSelectionProps) => {
  const { t } = useTranslation();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const params = new URLSearchParams({
        per_page: "50",
      });
      return ((await devtoForemApi.get("/tags?" + params)).data as Tag[]).filter(
        (tag) => tag.bg_color_hex
      );
    },
  });

  const onTagClick = (tag: Tag) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t.id !== tag.id);
      } else {
        return [...prev, tag];
      }
    });
  };

  const onSubmit = () => {
    localStorage.setItem(
      "preferences",
      selectedTags.map((tag) => tag.name).join(",")
    );
    onFinish();
  };

  return (
    <motion.div
      style={{
        opacity: 0,
        y: 50,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -50,
        transition: {
          delay: 1,
        },
      }}
      className="z-50 text-center flex flex-col overflow-auto items-center py-5 gap-5"
    >
      <div>
        <h2 className="font-bold text-xl">
          {t("onboarding.whatAreYourInterests")}
        </h2>
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-center max-w-[500px] px-4">
        {tags?.map((tag) => (
          <button
            className="btn"
            key={tag.id}
            style={{
              backgroundColor: selectedTags.find((x) => x.id === tag.id)
                ? tag.bg_color_hex ?? "blue"
                : undefined,
              color: selectedTags.find((x) => x.id === tag.id)
                ? tag.text_color_hex ?? "white"
                : undefined,
              borderColor: tag.bg_color_hex ?? undefined,
            }}
            onClick={() => onTagClick(tag)}
          >
            {tag.name}
          </button>
        ))}
      </div>
      <div>
        <button
          onClick={onSubmit}
          className="btn mt-5 btn-outline"
          disabled={selectedTags.length < MINIMUM_TAGS}
        >
          {t("onboarding.continue")}
        </button>
        <p
          className={`text-sm ${
            selectedTags.length < MINIMUM_TAGS ? "" : "invisible"
          }`}
        >
          {t("onboarding.selectAtLeast", {
            num: MINIMUM_TAGS,
          })}
        </p>
      </div>
    </motion.div>
  );
};

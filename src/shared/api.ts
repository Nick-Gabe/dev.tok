import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Tab } from "../components/Feed/Tabs";

const API_URL = "https://dev.to/api";
const API_REACTIONS_URL = "https://dev.to";

export const api = axios.create({
  baseURL: API_URL,
});

export const api_reactions = axios.create({
  baseURL: API_REACTIONS_URL,
});

type UseArticles = {
  enabled: boolean;
  type: Tab;
  tags?: string;
};

export const useArticles = ({ enabled, type, tags = "" }: UseArticles) => {
  const [tagPages, setTagPages] = useState(
    Object.fromEntries(tags.split(",").map((tag) => [tag, 1]))
  );
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const articleIds = useMemo(() => articles.map((x) => x.id), [articles]);

  const url = type === "latest" ? "/articles/latest" : "/articles";
  const { data, refetch } = useQuery({
    queryKey: [`${type}Articles`, page, tags],
    enabled,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
      });
      if (tags) {
        const tagArray = tags.split(",");
        const randomTag = tagArray[Math.floor(Math.random() * tagArray.length)];

        params.set("page", tagPages[randomTag].toString());
        params.set("tag", randomTag);
        // At the moment, "?tags" don't work properly in the API. So the temporary solution is
        // to randomly select a tag from the user preferences with a low per_page and increment the
        // page number for that tag specifically.
        params.set("tags", tags);
        if (type === "for_you") params.set("per_page", "5");

        setTagPages((prev) => ({ ...prev, [randomTag]: prev[randomTag] + 1 }));
      }
      return (await api.get(`${url}?${params}`)).data as Article[];
    },
  });

  useEffect(() => {
    setArticles((prev) => [
      ...prev,
      ...(data?.filter(
        (article) => !articleIds.includes(article.id)
      ) ?? []),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { articles, fetchMore: () => setPage((prev) => prev + 1), refetch };
};

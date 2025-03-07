declare interface Tag {
  id: number;
  name: string;
  bg_color_hex: string | null;
  text_color_hex: string | null;
}

declare interface Article {
  type_of: string;
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  collection_id: number | null;
  published_timestamp: string;
  positive_reactions_count: number;
  cover_image: string;
  social_image: string;
  canonical_url: string;
  created_at: string;
  edited_at: string | null;
  crossposted_at: string | null;
  published_at: string;
  last_comment_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  tags: string;
  user: {
    name: string;
    username: string;
    twitter_username: string;
    github_username: string;
    user_id: number;
    website_url: string | null;
    profile_image: string;
    profile_image_90: string;
  };
  organization: {
    name: string;
    username: string;
    slug: string;
    profile_image: string;
    profile_image_90: string;
  };
  flare_tag: {
    name: string;
    bg_color_hex: string;
    text_color_hex: string;
  };
}

declare interface Comment {
  type_of: string;
  id_code: string;
  created_at: string;
  body_html: string;
  user: {
    name: string;
    username: string;
    twitter_username: string;
    github_username: string;
    user_id: number;
    website_url: string | null;
    profile_image: string;
    profile_image_90: string;
  };
  children: Comment[];
}

declare interface Reactions {
  current_user: {
    id: null;
  };
  reactions: [];
  article_reaction_counts: {
    category: "like" | "unicorn" | "exploding_head" | "raised_hands" | "fire";
    count: number;
  }[];
}

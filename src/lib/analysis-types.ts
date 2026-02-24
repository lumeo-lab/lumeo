export type ContentType = "p" | "quote" | "insight" | "lumeo" | "h3";

export type ContentBlock = {
  type: ContentType;
  text: string;
};

export type Section = {
  id: string;
  title: string;
  content: ContentBlock[];
};

export type Analysis = {
  intro: string;
  sections: Section[];
};

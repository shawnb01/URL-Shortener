export interface URLDataObject {
  id: number;
  authorId: string;
  urlSlug: string;
  targetUrl: string;
  clicks: number;
  status: "active" | "inactive" | "deleted";
  createdAt: Date;
  updatedAt: Date;
}

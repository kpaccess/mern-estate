export type CustomError = {
  statusCode?: number;
} & Error;

export type ListingProps = {
  _id: string;
  name: string;
  description: string;
  imageUrls: string[];
};

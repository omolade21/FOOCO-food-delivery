import { createClient } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";
export const client = createClient({
  projectId: "pg2kwzjw",
  dataset: "production",
  apiVersion: "2023-03-15",
  useCdn: true,
  token:
    "sk80JiNKfh7XWXb25QhL1CXX4UyPAUeT5EoMnVdC4UdEoIGWlXOm3VEFxtw0D3DOgxZPseseersHKm788wJ9oR5C7FRn713ZrcT6YeuSnVsQa2gPs04hId0BLJ7OKtxJapb7Yzy9jPy3jIIVq84qU460rKPdsdj8ui7ebNQWU4Ha7dNt70nW",
});
const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

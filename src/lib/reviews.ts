import { base } from "@/lib/airtable";

export async function getReviews() {
  const records = await base("Arcana Priority Reviews")
    .select({
    filterByFormula: `{Review Status} = "Pending"`,
    })
    .all();

  return records.map((record) => ({
    id: record.id,
    ...record.fields,
  }));
}
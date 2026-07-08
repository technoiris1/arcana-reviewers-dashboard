import type { UserSession } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { getReviews } from "@/lib/reviews";
import { RefreshButton } from "@/app/components/refresh_button";
import { ReviewButton } from "@/app/components/review_button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export async function Dashboard({ user }: { user: UserSession }) {
  const reviews = await getReviews();

  return (
    <main className="min-h-screen bg-[#efeded] p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900">
              Arcana Priority Reviews
            </h1>

            <p className="mt-2 text-zinc-600">
              heyo {user.name}!
            </p>
          </div>
<div className="flex items-center gap-3">
  <RefreshButton />

  <a href="/api/auth/logout">
    <Button className="bg-[#ec3750] hover:bg-[#d92d48] cursor-pointer">
      Logout
    </Button>
  </a>
</div>
        </div>

        <div className="overflow-hidden rounded-xl border bg-white shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slack ID</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {reviews.map((review: any, index: number) => (
                <TableRow key={review.id}>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell className="font-medium">
                    {review.Name}
                  </TableCell>

                  <TableCell className="font-mono text-sm">
                    {review["Slack ID"]}
                  </TableCell>

                  <TableCell>
                    <a
                      href={review["Project Link"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Open Project →
                    </a>
                  </TableCell>
                  <TableCell>
  <ReviewButton id={review.id} />
</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <p className="mt-4 text-sm text-zinc-500">
          {reviews.length} pending reviews
        </p>
      </div>
    </main>
  );
}
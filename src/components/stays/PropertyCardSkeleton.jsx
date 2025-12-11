import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function PropertyCardSkeleton() {
  return (
    <Card className="overflow-hidden border border-border">
      <div className="relative h-64 overflow-hidden bg-muted">
        <Skeleton className="w-full h-full" />
      </div>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <Skeleton className="h-7 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="text-right ml-4">
            <Skeleton className="h-3 w-12 mb-1 ml-auto" />
            <Skeleton className="h-6 w-16 mb-1 ml-auto" />
            <Skeleton className="h-3 w-16 ml-auto" />
          </div>
        </div>

        <Skeleton className="h-4 w-full mt-4 mb-2" />
        <Skeleton className="h-4 w-4/5 mb-4" />

        <div className="flex flex-wrap gap-4 mb-4">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-12" />
        </div>

        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />

        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )
}

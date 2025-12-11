import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function ExperienceCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 bg-muted relative">
        <Skeleton className="w-full h-full" />
        <div className="absolute top-4 right-4 bg-card px-4 py-2 rounded-full">
          <Skeleton className="h-4 w-16 mb-1" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
      <CardContent className="p-6">
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-5 w-full mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-6" />
        
        <div className="mb-6">
          <Skeleton className="h-5 w-20 mb-2" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )
}

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Box, Card } from '@radix-ui/themes'

const UserFormSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#00000040" highlightColor="#444">
      <Box className="max-w-xl mx-auto">
        <Card mt="3">
          <Skeleton count={6} width={150} className="h-6 mb-2" />
        </Card>
      </Box>
    </SkeletonTheme>
  )
}

export default UserFormSkeleton

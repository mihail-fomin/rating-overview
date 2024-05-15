import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Box, Flex } from '@radix-ui/themes'

const LoadingDashboardPage = () => {
  return (
    <SkeletonTheme baseColor="#00000040" highlightColor="#444">
      <Box className="mx-auto">
        <Flex className="space-x-3 my-3" align="center" justify="center" wrap="wrap">
          <Skeleton count={3} width="16rem" className="h-24 mb-2" />
          <Skeleton count={3} width="16rem" className="h-24 mb-2" />
          <Skeleton count={3} width="16rem" className="h-24 mb-2" />
        </Flex>
      </Box>
    </SkeletonTheme>
  )
}

export default LoadingDashboardPage

import { Box, Flex, Skeleton } from "@mantine/core"

export default function LoadingSkeleton({ index = 0 }: { index?: number }) {
    return (<Box
        key={index}
        className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700"
    >
        <Flex gap="lg" className="flex-col md:flex-row">
            <Skeleton height={192} radius="xl" className="md:w-2/5" />
            <Box className="md:w-3/5">
                <Skeleton height={28} width="80%" mb="sm" />
                <Skeleton height={16} mb="xs" />
                <Skeleton height={16} mb="xs" />
                <Skeleton height={16} width="60%" mb="md" />
                <Flex gap="md">
                    <Skeleton height={14} width={80} />
                    <Skeleton height={14} width={100} />
                    <Skeleton height={14} width={60} />
                </Flex>
            </Box>
        </Flex>
    </Box>)
}
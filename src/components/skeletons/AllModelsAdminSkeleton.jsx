import Container from "@/components/ui/container/Container";

const AllModelsAdminSkeleton = () => {
    return (
        <Container className="max-w-full">
            {/* 1. Header Skeleton */}
            <div className="mb-8">
                <div className="h-8 w-48 bg-base-200 rounded-md animate-pulse mb-2"></div>
                <div className="h-4 w-96 bg-base-200 rounded-md animate-pulse"></div>
            </div>

            {/* 2. Stats Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="bg-base-100 p-5 rounded-xl border border-border shadow-sm flex items-center gap-4 animate-pulse"
                    >
                        <div className="h-12 w-12 bg-base-300 rounded-lg shrink-0"></div>
                        <div className="w-full">
                            <div className="h-3 w-20 bg-base-200 rounded mb-2"></div>
                            <div className="h-6 w-16 bg-base-300 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. Table Skeleton */}
            <div className="bg-base-100 border border-border rounded-xl shadow-sm overflow-hidden animate-pulse">
                {/* Toolbar Skeleton */}
                <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between gap-4 items-center">
                    <div className="h-10 w-full sm:w-72 bg-base-200 rounded-lg"></div>
                    <div className="h-10 w-24 bg-base-200 rounded-lg"></div>
                </div>

                {/* Table Content Skeleton */}
                <div className="p-4 space-y-4">
                    {/* Header Row */}
                    <div className="flex justify-between items-center mb-4 px-2">
                        {[1, 2, 3, 4, 5].map((col) => (
                            <div key={col} className="h-4 w-24 bg-base-300 rounded"></div>
                        ))}
                    </div>

                    {/* Data Rows */}
                    {[1, 2, 3, 4, 5, 6].map((row) => (
                        <div key={row} className="h-20 w-full bg-base-200 rounded-xl"></div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default AllModelsAdminSkeleton;

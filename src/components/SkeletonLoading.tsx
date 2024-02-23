import React, { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoading: FC = () => {
  return (
    <div className="grid grid-cols-12 gap-y-9 gap-x-0 sm:gap-8 mb-8">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
        <div
          className="col-span-12 lg:col-span-2 md:col-span-4 sm:col-span-6"
          key={item}
        >
          <Skeleton className="w-full h-[300px] rounded-xl" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoading;

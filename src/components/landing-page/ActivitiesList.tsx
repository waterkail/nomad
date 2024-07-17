import { GetActivitiesList } from '@/utils/types';
import CardResource from './CardResource';
import PostActivityButton from './PostActivityButton';
import SearchActivitiesHeader from './SearchActivitiesHeader';
/* eslint-disable */
interface ActivitiesListProps {
  category?: string;
  activities?: GetActivitiesList[];
  search?: string;
  searchTotalCount?: number;
}

export default function ActivitiesList({ category = '전체', activities, search, searchTotalCount }: ActivitiesListProps) {
  return (
    <div className='flex flex-col items-start gap-8 w-full'>
      {search && searchTotalCount ? (
        <>
          <SearchActivitiesHeader search={search} searchTotalCount={searchTotalCount} />
          <ul className='grid grid-cols-4 gap-12'>
            {activities?.map((activity, index) => (
              <li key={`${activity.id}-${activity.userId}-${index}`}>
                <CardResource activitiesData={activity} banner={false} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2 className='flex justify-between items-center w-full text-3xl font-bold text-[#1b1b1b]'>
            {category || '전체 체험'}
            <PostActivityButton />
          </h2>
          <ul className='grid grid-cols-4 gap-x-6 gap-y-12 md:grid-cols-3 md:gap-x-6 md:gap-y-8 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-8'>
            {activities?.map((activity, index) => (
              <li key={`${activity.id}-${activity.userId}-${index}`}>
                <CardResource activitiesData={activity} banner={false} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
/* eslint-enable */
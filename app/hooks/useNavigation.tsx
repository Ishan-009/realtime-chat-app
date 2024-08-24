import { useQuery } from 'convex/react';
import { MessageSquare, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { api } from '../../convex/_generated/api';
export const useNavigation = () => {
  const pathName = usePathname();
  const requestsCount = useQuery(api.requests.count);
  const paths = useMemo(
    () => [
      {
        name: 'Conversations',
        href: '/conversations',
        icon: <MessageSquare />,
        active: pathName.startsWith('/conversations'),
      },
      {
        name: 'Friends',
        href: '/friends',
        icon: <Users />,
        active: pathName.startsWith('/friends'),
        count: requestsCount,
      },
    ],
    [pathName, requestsCount]
  );

  return paths;
};
// card
// tooltip

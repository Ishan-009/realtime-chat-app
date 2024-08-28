import { useQuery } from 'convex/react';
import { MessageSquare, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { api } from '../../convex/_generated/api';

export const useNavigation = () => {
  const pathName = usePathname();
  const requestsCount = useQuery(api.requests.count);
  const conversations = useQuery(api.conversations.get);

  const unseenMessageCount = useMemo(() => {
    if (!conversations) return 0;
    return conversations.reduce(
      (acc, curr) => acc + (curr.unseenCount || 0),
      0
    );
  }, [conversations]);

  const paths = useMemo(
    () => [
      {
        name: 'Conversations',
        href: '/conversations',
        icon: <MessageSquare />,
        active: pathName.startsWith('/conversations'),
        count: unseenMessageCount,
      },
      {
        name: 'Friends',
        href: '/friends',
        icon: <Users />,
        active: pathName.startsWith('/friends'),
        count: requestsCount,
      },
    ],
    [pathName, requestsCount, unseenMessageCount]
  );

  const isLoading = conversations === undefined || requestsCount === undefined;
  const error = conversations === null || requestsCount === null;

  return { paths, isLoading, error };
};

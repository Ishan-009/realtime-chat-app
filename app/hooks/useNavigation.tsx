import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { MessageSquare, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export const useNavigation = () => {
  const pathname = usePathname();

  const requestsCount = useQuery(api.requests.count);
  const conversations = useQuery(api.conversations.get);

  const calculateUnseenMessagesCount = useCallback((convs) => {
    return convs?.reduce((acc, curr) => acc + (curr.unseenCount ?? 0), 0) ?? 0;
  }, []);

  const unseenMessagesCount = useMemo(
    () => calculateUnseenMessagesCount(conversations),
    [conversations, calculateUnseenMessagesCount]
  );

  const paths = useMemo(
    () => [
      {
        name: 'Conversations',
        href: '/conversations',
        icon: <MessageSquare />,
        active: pathname.startsWith('/conversations'),
        count: unseenMessagesCount,
      },
      {
        name: 'Friends',
        href: '/friends',
        icon: <Users />,
        active: pathname === '/friends',
        count: requestsCount ?? 0,
      },
    ],
    [pathname, requestsCount, unseenMessagesCount]
  );

  const isLoading = requestsCount === undefined || conversations === undefined;
  const error = isLoading
    ? null
    : requestsCount === null || conversations === null
      ? new Error('Failed to fetch data')
      : null;

  return {
    paths: error ? [] : paths,
    isLoading,
    error,
  };
};

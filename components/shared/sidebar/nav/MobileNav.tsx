'use client';

import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useConversation } from '../../../../app/hooks/useConversation';
import { useNavigation } from '../../../../app/hooks/useNavigation';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Card } from '../../../ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../ui/tooltip';

const MobileNav = () => {
  const { paths, isLoading, error } = useNavigation();
  const { isActive } = useConversation();
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setRetryCount((prev) => prev + 1), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, retryCount]);

  if (isActive) return null;

  if (isLoading) {
    return (
      <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center justify-center h-16 p-2 lg:hidden">
        <p>Loading navigation...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex flex-col items-center justify-center h-16 p-2 lg:hidden">
        <p>Error loading navigation</p>
        <Button
          onClick={() => setRetryCount((prev) => prev + 1)}
          size="sm"
          variant="outline"
          className="mt-2"
        >
          Retry
        </Button>
      </Card>
    );
  }

  return (
    <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
      <nav className="w-full">
        <ul className="flex justify-evenly items-center">
          {paths.map((path, id) => (
            <li key={id} className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={path.href}>
                    <Button
                      size="icon"
                      variant={path.active ? 'default' : 'outline'}
                    >
                      {path.icon}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{path.name}</p>
                </TooltipContent>
              </Tooltip>
              {typeof path.count === 'number' && path.count > 0 && (
                <Badge className="absolute -top-2 -right-2 px-2">
                  {path.count}
                </Badge>
              )}
            </li>
          ))}
          <li>
            <UserButton />
          </li>
        </ul>
      </nav>
    </Card>
  );
};

export default MobileNav;

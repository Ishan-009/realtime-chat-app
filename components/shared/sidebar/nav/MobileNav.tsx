'use client';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useConversation } from '../../../../app/hooks/useConversation';
import { useNavigation } from '../../../../app/hooks/useNavigation';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Card } from '../../../ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../ui/tooltip';

const MobileNav = () => {
  const { paths, isLoading, error } = useNavigation();
  const { isActive } = useConversation();

  console.log('MobileNav render:', { paths, isLoading, error, isActive });

  if (isActive) return null;

  if (isLoading) {
    return <div>Loading...</div>; // Or a more sophisticated loading component
  }

  if (error) {
    return <div>Error loading navigation data</div>; // Or a more user-friendly error message
  }

  return (
    <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
      <nav className="w-full">
        <ul className="flex justify-evenly items-center">
          {paths.map((path, id) => {
            return (
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
                {path.count ? (
                  <Badge className="absolute -top-2 -right-2 px-2">
                    {path.count}
                  </Badge>
                ) : null}
              </li>
            );
          })}
          <li>
            <UserButton />
          </li>
        </ul>
      </nav>
    </Card>
  );
};

export default MobileNav;

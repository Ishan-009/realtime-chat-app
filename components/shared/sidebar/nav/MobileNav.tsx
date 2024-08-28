'use client';
import { UserButton } from '@clerk/nextjs';
import { Badge } from 'lucide-react';
import Link from 'next/link';
import { useConversation } from '../../../../app/hooks/useConversation';
import { useNavigation } from '../../../../app/hooks/useNavigation';
import { Button } from '../../../ui/button';
import { Card } from '../../../ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../ui/tooltip';

const MobileNav = () => {
  const paths = useNavigation();

  const { isActive } = useConversation();

  if (isActive) return null;
  return (
    <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
      <nav className="w-full">
        <ul className="flex justify-evenly items-center ">
          {paths.map((path, id) => {
            return (
              <li key={id} className="relative">
                <Link href={path.href}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        size="icon"
                        variant={path.active ? 'default' : 'outline'}
                      >
                        {path.icon}
                      </Button>
                      {path.count !== undefined && path.count > 0 && (
                        <Badge className="absolute -top-2 -right-2 px-2">
                          {path.count}
                        </Badge>
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{path.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            );
          })}
          <li>
            <div className="flex flex-col items-center gap-4">
              <UserButton />
            </div>
          </li>
        </ul>
      </nav>
    </Card>
  );
};

export default MobileNav;

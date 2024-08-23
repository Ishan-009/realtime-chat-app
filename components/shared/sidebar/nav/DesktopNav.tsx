'use client';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useNavigation } from '../../../../app/hooks/useNavigation';
import { Button } from '../../../ui/button';
import { Card } from '../../../ui/card';
import { ThemeToggle } from '../../../ui/theme/theme-toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../ui/tooltip';
const DesktopNav = () => {
  const paths = useNavigation();

  return (
    <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
      <nav>
        <ul className="flex flex-col items-center gap-4">
          {paths.map((path, id) => {
            return (
              <li key={id} className="relative">
                <Link href={path.href}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        size="icon"
                        variant={path.active ? 'outline' : 'default'}
                      >
                        {path.icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{path.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex flex-col items-center gap-4">
        <ThemeToggle />
        <UserButton />
      </div>
    </Card>
  );
};

export default DesktopNav;

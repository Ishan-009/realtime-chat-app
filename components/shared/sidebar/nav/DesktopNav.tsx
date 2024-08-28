'use client';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useNavigation } from '../../../../app/hooks/useNavigation';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Card } from '../../../ui/card';
import { ThemeToggle } from '../../../ui/theme/theme-toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../ui/tooltip';

const DesktopNav = () => {
  const { paths, isLoading, error } = useNavigation();

  console.log('DesktopNav render:', { paths, isLoading, error });

  if (isLoading) {
    return <div>Loading...</div>; // Or a more sophisticated loading component
  }

  if (error) {
    return <div>Error loading navigation data</div>; // Or a more user-friendly error message
  }

  return (
    <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
      <nav>
        <ul className="flex flex-col items-center gap-4">
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
                  <Badge className="absolute left-6 bottom-7 px-2">
                    {path.count}
                  </Badge>
                ) : null}
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

'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme/theme-toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useNavigation } from '../../../../app/hooks/useNavigation';
const DesktopNav = () => {
  const { paths, isLoading, error } = useNavigation();

  if (isLoading) {
    return (
      <Card className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
        <div>Loading...</div>
      </Card>
    );
  }

  if (error) {
    console.error('Navigation error:', error);
    return (
      <Card className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
        <div>Error loading navigation</div>
      </Card>
    );
  }

  return (
    <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
      <nav>
        <ul className="flex flex-col items-center gap-4">
          {paths.map((path, id) => (
            <li key={id} className="relative">
              <Link href={path.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant={path.active ? 'default' : 'outline'}
                    >
                      {path.icon}
                      {path.count > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {path.count}
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{path.name}</p>
                  </TooltipContent>
                </Tooltip>
              </Link>
            </li>
          ))}
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

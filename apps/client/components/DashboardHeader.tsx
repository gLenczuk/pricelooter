'use client';
import { User, LogOut } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './core/Dropdown';
import { Avatar, AvatarFallback, AvatarImage } from './core/Avatar';
import { cn } from 'lib/cn';
import { bebas } from 'fonts';
import { useCurrentUserQuery } from 'queries/getCurrentUserQuery';
import { useLogoutUserMutation } from 'mutations/logoutUserMutation';

export const DashboardHeader = () => {
    const { user, isLoadingUser } = useCurrentUserQuery();
    const { logoutUser } = useLogoutUserMutation();

    if (isLoadingUser) return;

    return (
        <header className="bg-white shadow-sm py-2">
            <div className="max-w-[1440px] px-2 mx-auto flex items-center justify-between">
                <h1 className={cn('text-3xl uppercase cursor-pointer', bebas.className)}>Pricelooter</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback className="bg-gray-200">CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel className="text-[15px] text-center flex flex-col">
                            <span>{user?.username}</span>
                            <span className="text-[14px] text-neutral-400 font-medium">{user?.email}</span>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => logoutUser()}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ShopDropDown from "./navigation/shop-dropdown";

const Navigation: React.FC = () => {
  const navigationItems = [
    { title: "Shop", href: "/products", hasDropdown: true },
    { title: "Categories", href: "/categories", hasDropdown: true },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex space-x-6">
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            {item.hasDropdown ? (
              <>
                <NavigationMenuTrigger
                  className={cn("text-sm font-medium transition-colors")}
                >
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ShopDropDown type={item.title} />
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link
                  className={cn(
                    "block select-none rounded-md px-3 py-2 text-sm font-medium leading-none no-underline outline-none transition-colors"
                  )}
                  href={item.href}
                >
                  {item.title}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;

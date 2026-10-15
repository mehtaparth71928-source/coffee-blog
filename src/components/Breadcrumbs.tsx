import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (href: string) => void;
}

export function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="py-3 text-xs md:text-sm text-[#7D6B5E]"
    >
      <ol 
        className="flex flex-wrap items-center gap-1.5 list-none p-0 m-0"
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        <li 
          itemProp="itemListElement" 
          itemScope 
          itemType="https://schema.org/ListItem" 
          className="flex items-center"
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            itemProp="item"
            className="flex items-center gap-1 hover:text-[#2D1E18] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span itemProp="name">Home</span>
          </a>
          <meta itemProp="position" content="1" />
        </li>

        {items.map((item, index) => {
          const position = index + 2;
          const isLast = index === items.length - 1;

          return (
            <li 
              key={item.label}
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem" 
              className="flex items-center gap-1.5"
            >
              <ChevronRight className="w-3 h-3 text-[#BFAEA2]" aria-hidden="true" />
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.href) onNavigate(item.href);
                  }}
                  itemProp="item"
                  className="hover:text-[#2D1E18] transition-colors truncate max-w-[200px]"
                >
                  <span itemProp="name">{item.label}</span>
                </a>
              ) : (
                <span 
                  itemProp="name" 
                  className="text-[#2D1E18] font-medium truncate max-w-[280px] md:max-w-[400px]"
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}
              <meta itemProp="position" content={position.toString()} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

import React, { useEffect, useRef, useState } from "react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@loongkirin/ui/src/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@loongkirin/ui/src/collapsible"
import { ChevronRightIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@loongkirin/ui/src/tooltip"

const AppSidebarMenu = (props: { data: any }) => {
  return (
    <SidebarMenu className="w-[calc(100%-0.3rem)]">
      {props.data.map((item: any) => (
        <Collapsible
          key={item.title}
          asChild
          defaultOpen={item.isActive}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <AppSidebarMenuSubItem props={ item } />
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </SidebarMenu>
  )
}

function AppSidebarMenuSubItem({
  props
}: {
  props: any
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    if (spanRef.current) {
      // console.log("spanRef.current.scrollWidth", spanRef.current.scrollWidth);
      // console.log("spanRef.current.clientWidth", spanRef.current.clientWidth);
      setIsTruncated(spanRef.current.scrollWidth > spanRef.current.clientWidth);
    }
  }, []);
  return (
    <SidebarMenuSub className="w-[calc(100%-0.3rem)]">
    {props.items?.map((subItem: any) => {
      if (subItem.items && subItem.items.length > 0) {
        return (
          <Collapsible 
            key={subItem.title}
            asChild
            className="group/collapsible-1"
          >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span ref={spanRef} className="truncate">{subItem.title}</span>
                        </TooltipTrigger>
                        <TooltipContent hidden={!isTruncated}>
                          <p>{subItem.title}</p>
                        </TooltipContent>
                      </Tooltip>
                  {/* <span className="truncate">{subItem.title}</span> */}
                  <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible-1:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <AppSidebarMenuSubItem props={ subItem } />
              </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        } else {
          return (
            <SidebarMenuSubItem key={subItem.title}>
              <SidebarMenuSubButton asChild>
                <a href={subItem.url}>
                <span>{subItem.title}</span>
              </a>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
          )
        }
      })}
    </SidebarMenuSub>
  )
}

export { AppSidebarMenu, AppSidebarMenuSubItem }
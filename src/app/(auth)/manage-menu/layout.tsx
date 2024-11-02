import MenuSidebar from '@/app/components/MenuSidebar';
import React from 'react'

const MenuLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className=" grid grid-cols-[17rem_auto]">
    <MenuSidebar />
    {children}
</div>
  )
}

export default MenuLayout
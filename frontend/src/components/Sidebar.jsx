import { IoArrowBack } from "react-icons/io5";
import React, { useEffect, useState } from "react";


const Sidebar = ({isOpen, toggleSidebar}) => {
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const sideBarItems = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: "Discover Books",
            link: '/all-books'
        },
        {
            title: "Categories",
            subitems: [
                { title: "Poetry", link: '/categories/Poetry' },
                { title: "Travelouge", link: '/categories/non-fiction' },
                { title: "Biography", link: '/categories/sci-fi' },
              ]
        },
    ]
  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-zinc-800 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className='mt-5 mx-4'>
        {isOpen && <button onClick={toggleSidebar}><IoArrowBack className='size-5 text-white'/></button>}
        </div>
        <div>
        <ul className="mt-16">
        {sideBarItems.map((item, i) => (
          <li key={i} className="px-4 py-2 text-gray-300 hover:bg-zinc-700 hover:text-white">
            {item.subitems ? (
              <>
                <div onClick={() => setIsCategoriesOpen(!isCategoriesOpen)} className="cursor-pointer">
                  {item.title}
                </div>
                {isCategoriesOpen && (
                  <ul className="pl-4">
                    {item.subitems.map((subitems, j) => (
                      <li key={j} className="py-2 text-gray-300 hover:bg-zinc-700 hover:text-white">
                        <a href={subitems.link}>{subitems.title}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <a href={item.link}>{item.title}</a>
            )}
          </li>
        ))}
      </ul>
      </div>
    </div>
  )
}

export default Sidebar;

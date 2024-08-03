import { IoArrowBack } from "react-icons/io5";
import React, { useEffect, useState } from "react";


const Sidebar = ({ isOpen, toggleSidebar }) => {
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
        { title: "Poetry", link: '/Category/Poetry' },
        { title: "Biography", link: '/Category/Biography' },
        { title: "Novel", link: '/Category/Novel' },
        { title: "Misc", link: '/Category/Misc' },
        { title: "Essays", link: '/Category/Essays' },
        { title: "Short-Stories", link: '/Category/Short-Stories' },
        { title: "Travelogue", link: '/Category/Travelogue' },

      ]
    },
  ]
  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-zinc-900 to-blue-500 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      <div className='mt-7 mx-4'>
        {isOpen && <button onClick={toggleSidebar}><IoArrowBack className='size-8 text-white' /></button>}
      </div>
      <div>
        <ul className="mt-16">
          {sideBarItems.map((item, i) => (
            <li key={i} className="px-4 py-2 text-gray-300  hover:text-white hover:text-lg ease-in-out duration-200">
              {item.subitems ? (
                <>
                  <div onClick={() => setIsCategoriesOpen(!isCategoriesOpen)} className="cursor-pointer">
                    {item.title}
                  </div>
                  {isCategoriesOpen && (
                    <ul className="pl-4">
                      {item.subitems.map((subitems, j) => (
                        <li key={j} className="py-2 text-gray-300 hover:text-white">
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

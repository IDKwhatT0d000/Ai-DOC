import React from 'react'
import Card from './Card';
const Checkup = () => {

    const cardData = [
        {
          imgSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
          goto:"/Diab",
          heading: "Diabetes",
          text: "Simple Yet Beautiful Card Design with TailwindCSS."
        },
        {
          imgSrc:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
          goto:"/heart",
          heading: "Heart",
          text: "Simple Yet Beautiful Card Design with TailwindCSS."
        },
        {
          imgSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
          heading: " Health CheckUp",
          goto:"/Diab",
          text: "Simple Yet Beautiful Card Design with TailwindCSS. "
        },
        {
          imgSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
          heading: "Heading 4",
          goto:"/Doc",
          text: "Simple Yet Beautiful Card Design with TailwindCSS."
        },
      ];
      
  return (
    <div className="w-full min-h-[100px] gap-6 flex-wrap flex justify-center">
    {cardData.map((card, index) => (
      <Card
        key={index}
        goto={card.goto}
        imgSrc={card.imgSrc}
        heading={card.heading}
        text={card.text}
      />
    ))}
  </div>
  )
}

export default Checkup
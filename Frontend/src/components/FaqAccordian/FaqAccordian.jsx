import React, { useState } from "react";

const accordianData = [
  {
    id: 1,
    question: "What is DocAppoint?",
    ans: "React JS is a JavaScript library for building user interfaces. It is used to create single-page applications that can update the screen without reloading the page",
  },
  {
    id: 2,
    question: "How to book an appointment?",
    ans: "JSX is a syntax extension that allows us to write HTML-like code in JavaScript. It makes it easier to create and render React elements. ",
  },
  {
    id: 3,
    question: "How to create an account on the site?",
    ans: "React hooks are functions that let us use state and other React features without writing a class component.",
  },
  {
    id: 4,
    question: "How to register as a doctor?",
    ans: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nostrum ullam minus illum ad eligendi",
  },
  {
    id: 5,
    question: "Is the survey reliable to take?",
    ans: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nostrum ullam minus illum ad eligendi",
  },
  {
    id: 6,
    question: "What does th ewebsite chatbot do?",
    ans: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nostrum ullam minus illum ad eligendi",
  },
];

function AccordianItem({ question, ans, isExpanded, onToggle }) {
  return (
    <div
      className={`rounded-xl overflow-hidden transition-all duration-500 hover:bg-gray-100 ${
        isExpanded ? "max-h-96" : "max-h-20"
      }`}
    >
      <div onClick={onToggle} className="flex items-start justify-between gap-4 p-4 cursor-pointer">
        <h2 className="text-2xl font-medium">{question}</h2>
        <i
          className={`ri-arrow-down-s-line text-3xl transition-all duration-500 ${
            isExpanded ? "rotate-180" : ""
          }`}
        ></i>
      </div>

      <div
        className={`px-5 pb-5 overflow-hidden transition-all duration-500 ${
          isExpanded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div>{ans}</div>
      </div>
    </div>
  );
}

function FaqAccordian() {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <>
      <div className="flex flex-col max-w-md gap-3 mx-auto">
        {accordianData.map((item) => (
          <AccordianItem
            key={item.id}
            {...item}
            isExpanded={expanded === item.id}
            onToggle={() => toggleExpand(item.id)}
          />
        ))}
      </div>
    </>
  );
}

export default FaqAccordian;

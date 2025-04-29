import React, { useState, useRef, useEffect } from "react";

const InputBuilder = () => {
  const [fields, setFields] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const fieldRefs = useRef({});

  const options = [
    { label: "Text", type: "text" },
    { label: "Select", type: "select" },
    { label: "Date", type: "date" },
    { label: "Date Range", type: "dateRange" },
    { label: "Time Range", type: "timeRange" },
    { label: "Recurring Time Range", type: "recurringTimeRange" },
  ];

  const getXPath = (element) => {
    if (!element) return "";
    if (element.id) return `#${element.id}`;
    const parts = [];
    while (element && element.nodeType === Node.ELEMENT_NODE) {
      let index = 1;
      let sibling = element.previousSibling;
      while (sibling) {
        if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName === element.nodeName) {
          index++;
        }
        sibling = sibling.previousSibling;
      }
      const tagName = element.nodeName.toLowerCase();
      const nth = index > 1 ? `[${index}]` : "";
      parts.unshift(`${tagName}${nth}`);
      element = element.parentNode;
    }
    return "/" + parts.join("/");
  };

  const getCSSSelector = (element) => {
    if (!element) return "";
    if (element.id) return `#${element.id}`;
    const path = [];
    while (element && element.nodeType === Node.ELEMENT_NODE) {
      let selector = element.nodeName.toLowerCase();
      if (element.className) {
        selector += `.${[...element.classList].join(".")}`;
      }
      let sibling = element;
      let siblingIndex = 1;
      while ((sibling = sibling.previousElementSibling)) {
        if (sibling.nodeName === element.nodeName) {
          siblingIndex++;
        }
      }
      if (siblingIndex > 1) {
        selector += `:nth-of-type(${siblingIndex})`;
      }
      path.unshift(selector);
      element = element.parentElement;
    }
    return path.join(' > ');
  };

  const handleSelectOption = (type) => {
    const id = Date.now();
    let elements = [id];

    if (type === "dateRange" || type === "timeRange") {
      elements = [`${id}-start`, `${id}-end`];
    } else if (type === "recurringTimeRange") {
      elements = [`${id}-start`, `${id}-end`, `${id}-freq`];
    }

    const newField = {
      id,
      type,
      elements,
      selectors: {}
    };

    setFields(prev => [...prev, newField]);
    setShowDropdown(false);
  };

  const handleSubmit = () => {
    let final=[]
    fields.map((field)=>{
      final.push({[field.type]:field.selectors})
      // console.log(field.type,field.selectors)
    })
    // console.log('Form fields with selectors:', fields);
    console.log(final,'final')
  };

  useEffect(() => {
    const updatedFields = fields.map(field => {
      const updatedSelectors = {};

      field.elements.forEach((elId) => {
        const el = fieldRefs.current[elId];
        if (el) {
          updatedSelectors[elId] = {
            xpath: getXPath(el),
            cssSelector: getCSSSelector(el),
          };
        }
      });

      return {
        ...field,
        selectors: updatedSelectors,
      };
    });

    if (JSON.stringify(updatedFields) !== JSON.stringify(fields)) {
      setFields(updatedFields);
    }
  }, [fields.length]); 

  return (
    <div className="p-6">
      <div className="relative mb-4">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Input Field
        </button>

        {showDropdown && (
          <div className="absolute bg-white border rounded-md mt-2 shadow-md w-48 z-10">
            {options.map((option) => (
              <div
                key={option.type}
                onClick={() => handleSelectOption(option.type)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="border p-4 rounded-md">
            {/* Render inputs */}
            {field.type === "text" && (
              <input
                type="text"
                ref={(el) => { if (el) fieldRefs.current[field.id] = el; }}
                placeholder="Text Input"
                className="border p-2 rounded-md w-full mb-2"
              />
            )}
            {field.type === "select" && (
              <select
                ref={(el) => { if (el) fieldRefs.current[field.id] = el; }}
                className="border p-2 rounded-md w-full mb-2"
              >
                <option>Select Option</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            )}
            {field.type === "date" && (
              <input
                type="date"
                ref={(el) => { if (el) fieldRefs.current[field.id] = el; }}
                className="border p-2 rounded-md w-full mb-2"
              />
            )}
            {(field.type === "dateRange" || field.type === "timeRange") && (
              <div className="flex space-x-2">
                <input
                  type={field.type === "dateRange" ? "date" : "time"}
                  ref={(el) => { if (el) fieldRefs.current[`${field.id}-start`] = el; }}
                  className="border p-2 rounded-md w-1/2"
                  placeholder="Start"
                />
                <input
                  type={field.type === "dateRange" ? "date" : "time"}
                  ref={(el) => { if (el) fieldRefs.current[`${field.id}-end`] = el; }}
                  className="border p-2 rounded-md w-1/2"
                  placeholder="End"
                />
              </div>
            )}
            {field.type === "recurringTimeRange" && (
              <div className="flex space-x-2 items-center">
                <input
                  type="time"
                  ref={(el) => { if (el) fieldRefs.current[`${field.id}-start`] = el; }}
                  className="border p-2 rounded-md w-1/3"
                  placeholder="Start Time"
                />
                <input
                  type="time"
                  ref={(el) => { if (el) fieldRefs.current[`${field.id}-end`] = el; }}
                  className="border p-2 rounded-md w-1/3"
                  placeholder="End Time"
                />
                <select
                  ref={(el) => { if (el) fieldRefs.current[`${field.id}-freq`] = el; }}
                  className="border p-2 rounded-md w-1/3"
                >
                  <option value="">Frequency</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            )}

            {/* Render XPath and CSS selectors */}
            <div className="text-xs mt-2 space-y-1">
              {Object.entries(field.selectors).map(([elId, sel]) => (
                <div key={elId}>
                  <div>XPath: {sel.xpath}</div>
                  <div>CSS: {sel.cssSelector}</div>
                  {/* <div><strong>{elId}</strong> XPath: {sel.xpath}</div>
                  <div><strong>{elId}</strong> CSS: {sel.cssSelector}</div> */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Submit
      </button>
    </div>
  );
};

export default InputBuilder;






// import React, { useState } from "react";

// const InputBuilder = () => {
//   const [fields, setFields] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const options = [
//     { label: "Text", type: "text" },
//     { label: "Select", type: "select" },
//     { label: "Date", type: "date" },
//     { label: "Date Range", type: "dateRange" },
//     { label: "Time Range", type: "timeRange" },
//     { label: "Recurring Time Range", type: "recurringTimeRange" }, 
//   ];

//   const handleSelectOption = (type) => {
//     setFields([...fields, { id: Date.now(), type}]);
//     setShowDropdown(false);
//   };


//   const handleSubmit=()=>{
//     console.log('submit')
//   }

//   return (
//     <div className="p-6">

//       <div className="relative mb-4">
//         <button
//           onClick={() => setShowDropdown(!showDropdown)}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md"
//         >
//           Add Input Field
//         </button>

//         {showDropdown && (
//           <div className="absolute bg-white border rounded-md mt-2 shadow-md w-48 z-10">
//             {options.map((option) => (
//               <div
//                 key={option.type}
//                 onClick={() => handleSelectOption(option.type)}
//                 className="p-2 hover:bg-gray-100 cursor-pointer"
//               >
//                 {option.label}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Render Added Fields */}
//       <div className="space-y-4">
//         {fields.map((field) => (
//           <div key={field.id}>
//             {field.type === "text" && (
//               <input
//                 type="text"
//                 placeholder="Text Input"
//                 className="border p-2 rounded-md w-full"
//               />
//             )}
//             {field.type === "select" && (
//               <select className="border p-2 rounded-md w-full">
//                 <option>Select Option</option>
//                 <option>Option 1</option>
//                 <option>Option 2</option>
//               </select>
//             )}
//             {field.type === "date" && (
//               <input
//                 type="date"
//                 className="border p-2 rounded-md w-full"
//               />
//             )}
//             {field.type === "dateRange" && (
//               <div className="flex space-x-2">
//                 <input
//                   type="date"
//                   className="border p-2 rounded-md w-1/2"
//                 />
//                 <input
//                   type="date"
//                   className="border p-2 rounded-md w-1/2"
//                 />
//               </div>
//             )}
//             {field.type === "timeRange" && (
//               <div className="flex space-x-2">
//                 <input
//                   type="time"
//                   className="border p-2 rounded-md w-1/2"
//                   placeholder="Start Time"
//                 />
//                 <input
//                   type="time"
//                   className="border p-2 rounded-md w-1/2"
//                   placeholder="End Time"
//                 />
//               </div>
//             )}
//             {field.type === "recurringTimeRange" && (
//               <div className="flex space-x-2 items-center">
//                 <input
//                   type="time"
//                   className="border p-2 rounded-md w-1/3"
//                   placeholder="Start Time"
//                 />
//                 <input
//                   type="time"
//                   className="border p-2 rounded-md w-1/3"
//                   placeholder="End Time"
//                 />
//                 <select className="border p-2 rounded-md w-1/3">
//                   <option value="">Frequency</option>
//                   <option value="daily">Daily</option>
//                   <option value="weekly">Weekly</option>
//                   <option value="monthly">Monthly</option>
//                 </select>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InputBuilder;



// import React, { useState, useRef, useEffect } from "react";

// const InputBuilder = () => {
//   const [fields, setFields] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const fieldRefs = useRef({});

//   const options = [
//     { label: "Text", type: "text" },
//     { label: "Select", type: "select" },
//     { label: "Date", type: "date" },
//     { label: "Date Range", type: "dateRange" },
//     { label: "Time Range", type: "timeRange" },
//     { label: "Recurring Time Range", type: "recurringTimeRange" }, 
//   ];

//   const getXPath = (element) => {
//     if (!element) return "";
//     if (element.id) return `#${element.id}`;
//     const parts = [];
//     while (element && element.nodeType === Node.ELEMENT_NODE) {
//       let index = 1;
//       let sibling = element.previousSibling;
//       while (sibling) {
//         if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName === element.nodeName) {
//           index++;
//         }
//         sibling = sibling.previousSibling;
//       }
//       const tagName = element.nodeName.toLowerCase();
//       const nth = index > 1 ? `[${index}]` : "";
//       parts.unshift(`${tagName}${nth}`);
//       element = element.parentNode;
//     }
//     return "/" + parts.join("/");
//   };

//   const getCSSSelector = (element) => {
//     if (!element) return "";
//     if (element.id) return `#${element.id}`;
//     const path = [];
//     while (element && element.nodeType === Node.ELEMENT_NODE) {
//       let selector = element.nodeName.toLowerCase();
//       if (element.className) {
//         selector += `.${[...element.classList].join(".")}`;
//       }
//       let sibling = element;
//       let siblingIndex = 1;
//       while ((sibling = sibling.previousElementSibling)) {
//         if (sibling.nodeName === element.nodeName) {
//           siblingIndex++;
//         }
//       }
//       if (siblingIndex > 1) {
//         selector += `:nth-of-type(${siblingIndex})`;
//       }
//       path.unshift(selector);
//       element = element.parentElement;
//     }
//     return path.join(' > ');
//   };

//   const handleSelectOption = (type) => {
//     const newField = {
//       id: Date.now(),
//       type,
//       xpath: "",
//       cssSelector: ""
//     };
//     setFields([...fields, newField]);
//     setShowDropdown(false);
//   };

//   const handleSubmit = () => {
//     console.log('Form fields with selectors:', fields);
//   };

//   // Update selectors when fields change
//   useEffect(() => {
//     const updatedFields = fields.map(field => {
//       const element = fieldRefs.current[field.id];
//       if (!element) return field;
      
//       return {
//         ...field,
//         xpath: getXPath(element),
//         cssSelector: getCSSSelector(element)
//       };
//     });
    
//     if (JSON.stringify(updatedFields) !== JSON.stringify(fields)) {
//       setFields(updatedFields);
//     }
//   }, [fields]);

//   return (
//     <div className="p-6">
//       <div className="relative mb-4">
//         <button
//           onClick={() => setShowDropdown(!showDropdown)}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md"
//         >
//           Add Input Field
//         </button>

//         {showDropdown && (
//           <div className="absolute bg-white border rounded-md mt-2 shadow-md w-48 z-10">
//             {options.map((option) => (
//               <div
//                 key={option.type}
//                 onClick={() => handleSelectOption(option.type)}
//                 className="p-2 hover:bg-gray-100 cursor-pointer"
//               >
//                 {option.label}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="space-y-4">
//         {fields.map((field) => {
//           const setRef = (el) => {
//             if (el) {
//               fieldRefs.current[field.id] = el;
//             }
//           };

//           return (
//             <div key={field.id} className="border p-4 rounded-md">
//               {field.type === "text" && (
//                 <input
//                   type="text"
//                   ref={setRef}
//                   placeholder="Text Input"
//                   className="border p-2 rounded-md w-full mb-2"
//                 />
//               )}
//               {field.type === "select" && (
//                 <select
//                   ref={setRef}
//                   className="border p-2 rounded-md w-full mb-2"
//                 >
//                   <option>Select Option</option>
//                   <option>Option 1</option>
//                   <option>Option 2</option>
//                 </select>
//               )}
//               {field.type === "date" && (
//                 <input
//                   type="date"
//                   ref={setRef}
//                   className="border p-2 rounded-md w-full mb-2"
//                 />
//               )}
//               {field.type === "dateRange" && (
//                 <div className="space-y-2">
//                   <div className="flex space-x-2">
//                     <input
//                       type="date"
//                       ref={(el) => { fieldRefs.current[`${field.id}-start`] = el }}
//                       className="border p-2 rounded-md w-1/2"
//                     />
//                     <input
//                       type="date"
//                       ref={(el) => { fieldRefs.current[`${field.id}-end`] = el }}
//                       className="border p-2 rounded-md w-1/2"
//                     />
//                   </div>
//                   <div className="text-xs space-y-1">
//                     <div>Start XPath: {getXPath(fieldRefs.current[`${field.id}-start`])}</div>
//                     <div>Start CSS: {getCSSSelector(fieldRefs.current[`${field.id}-start`])}</div>
//                     <div>End XPath: {getXPath(fieldRefs.current[`${field.id}-end`])}</div>
//                     <div>End CSS: {getCSSSelector(fieldRefs.current[`${field.id}-end`])}</div>
//                   </div>
//                 </div>
//               )}
//               {field.type === "timeRange" && (
//                 <div className="space-y-2">
//                   <div className="flex space-x-2">
//                     <input
//                       type="time"
//                       ref={(el) => { fieldRefs.current[`${field.id}-start`] = el }}
//                       className="border p-2 rounded-md w-1/2"
//                       placeholder="Start Time"
//                     />
//                     <input
//                       type="time"
//                       ref={(el) => { fieldRefs.current[`${field.id}-end`] = el }}
//                       className="border p-2 rounded-md w-1/2"
//                       placeholder="End Time"
//                     />
//                   </div>
//                   <div className="text-xs space-y-1">
//                     <div>Start XPath: {getXPath(fieldRefs.current[`${field.id}-start`])}</div>
//                     <div>Start CSS: {getCSSSelector(fieldRefs.current[`${field.id}-start`])}</div>
//                     <div>End XPath: {getXPath(fieldRefs.current[`${field.id}-end`])}</div>
//                     <div>End CSS: {getCSSSelector(fieldRefs.current[`${field.id}-end`])}</div>
//                   </div>
//                 </div>
//               )}
//               {field.type === "recurringTimeRange" && (
//                 <div className="space-y-2">
//                   <div className="flex space-x-2 items-center">
//                     <input
//                       type="time"
//                       ref={(el) => { fieldRefs.current[`${field.id}-start`] = el }}
//                       className="border p-2 rounded-md w-1/3"
//                       placeholder="Start Time"
//                     />
//                     <input
//                       type="time"
//                       ref={(el) => { fieldRefs.current[`${field.id}-end`] = el }}
//                       className="border p-2 rounded-md w-1/3"
//                       placeholder="End Time"
//                     />
//                     <select
//                       ref={(el) => { fieldRefs.current[`${field.id}-freq`] = el }}
//                       className="border p-2 rounded-md w-1/3"
//                     >
//                       <option value="">Frequency</option>
//                       <option value="daily">Daily</option>
//                       <option value="weekly">Weekly</option>
//                       <option value="monthly">Monthly</option>
//                     </select>
//                   </div>
//                   <div className="text-xs space-y-1">
//                     <div>Start XPath: {getXPath(fieldRefs.current[`${field.id}-start`])}</div>
//                     <div>Start CSS: {getCSSSelector(fieldRefs.current[`${field.id}-start`])}</div>
//                     <div>End XPath: {getXPath(fieldRefs.current[`${field.id}-end`])}</div>
//                     <div>End CSS: {getCSSSelector(fieldRefs.current[`${field.id}-end`])}</div>
//                     <div>Freq XPath: {getXPath(fieldRefs.current[`${field.id}-freq`])}</div>
//                     <div>Freq CSS: {getCSSSelector(fieldRefs.current[`${field.id}-freq`])}</div>
//                   </div>
//                 </div>
//               )}
              
//               {!["dateRange", "timeRange", "recurringTimeRange"].includes(field.type) && (
//                 <div className="text-xs space-y-1 mt-2">
//                   <div>XPath: {field.xpath}</div>
//                   <div>CSS Selector: {field.cssSelector}</div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//       <button
//         onClick={handleSubmit}
//         className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
//       >
//         Submit
//       </button>
//     </div>
//   );
// };

// export default InputBuilder;




[
  {
  "dropdown_1": {
  "click": {
  "xpath": "//div/div[2]/div[2]/div[1]/div[1]/div[2]/div",
  "css_selector_path": "div:nth-child(1) > div > div.content > div > div.styles__StyledPlayArea-ihipf8-1.eGKFPt > div.styles__Container-sc-1b5k4zr-1.bSupBp > div:nth-child(1) > div:nth-child(1) > div.styles__DropdownContainer-sc-1k46dl-2.jOEHSJ > div"
  },
  "selector": {
  "xpath": "//div[@data-id='BRAND_PLA']",
  "css_selector_path": "div > div.styles__Item-w3d9hs-0.hLWulR"
  }
  }
  },
  {
  "dropdown_2": {
  "click": {
  "xpath": "//div[1]/div/div[2]/div/div[2]/div[2]/div[1]/div[2]/div[2]",
  "css_selector_path": "div:nth-child(2) > div.styles__DropdownContainer-sc-1k46dl-2.jOEHSJ > div"
  },
  "selector": {
  "xpath": "//div[@data-id='FLIPKART']",
  "css_selector_path": "div > div.styles__Item-w3d9hs-0.hLWulR"
  }
  }
  },
  {
  "dropdown_3": {
  "click": {
  "xpath": "//div/div[2]/div[2]/div[3]/div[1]/div/div[2]/div",
  "css_selector_path": "div:nth-child(3) > div:nth-child(1) > div > div.styles__DropdownContainer-sc-1k46dl-2.jOEHSJ > div"
  },
  "selector": {
  "xpath": "//*[@id='popover-content']/div/div[1]",
  "css_selector_path": "div > div.styles__Item-w3d9hs-0.hLWulR"
  }
  }
  },
  {
  "range_calender": {
  "click_date": {
  "xpath": "//div[@class='date']",
  "css_selector_path": "div:nth-child(3) > div:nth-child(2) > div > div.date"
  },
  "click_year": {
  "xpath": "//div/div[2]/div/div/section/div/div[1]/div[1]/div/div/div[2]/div[2]/div",
  "css_selector_path": "div.styles__RangeView-sc-1y1pqap-24.kTpMIO > div:nth-child(1) > div > div > div.styles__HeaderBadgeWrapper-sc-1y1pqap-9.eAjLRW > div:nth-child(2) > div"
  },
  "select_year": {
  "xpath": "//div/div/div/table/tbody/tr/td",
  "css_selector_path": "div:nth-child(1) > div > div > table > tbody > tr > td"
  },
  "click_month": {
  "xpath": "//div/div[2]/div/div/section/div/div[1]/div[1]/div/div/div[2]/div[1]/div",
  "css_selector_path": "div:nth-child(1) > div > div > div.styles__HeaderBadgeWrapper-sc-1y1pqap-9.eAjLRW > div:nth-child(1) > div"
  },
  "select_month": {
  "xpath": "//table/tbody/tr/td",
  "css_selector_path": ".kTpMIO > div:nth-child(1) > div > table > tbody > tr > td"
  },
  "select_days": {
  "xpath": "//div/div/div/table/tbody/tr/td",
  "css_selector_path": "tbody tr td",
  "td_element_selector": "class"
  },
  "click_done": {
  "xpath": "//div[contains(text(),'Done')]",
  "css_selector_path": "div.styles__ControllerContainer-sc-1y1pqap-17.ildzqk > div.styles__RightContainer-sc-1y1pqap-19.ghwwft > div"
  }
  }
  }
 ]

[
  {
  "dropdown_1": {
  "click": {
  "xpath": "//div/div[2]/div/div/div[1]/div[1]/div[2]/div/div",
  "css_selector_path": "div.sc-bsfKwI.cxUObd > div:nth-child(1) > div:nth-child(2) > div"
  },
  "selector": {
  "xpath": "//div/div[2]/div/div/div[1]/div[1]/div[2]/div/div/span/section/div[3]",
  "css_selector_path": "div[aria-label='This Quarter']"
  }
  }
  },
  {
  "start_date_calendar": {
  "click_date": {
  "xpath": "//div/div/div[2]/div/div/div[1]/div[2]/div[2]/div/input",
  "css_selector_path": "div.sc-bsfKwI.cxUObd > div:nth-child(2) > div.ant-picker.sc-hLiTId.iZtGUu > div > input"
  },
  "click_year": {
  "xpath": "/html/body/div[14]/div/div/div/div/div[1]/div[1]/div/button[2]",
  "css_selector_path": "div.ant-picker-date-panel > div.ant-picker-header > div > button.ant-picker-year-btn"
  },
  "select_year": {
  "xpath": "//div/div/div/div/div/div[2]/table/tbody/tr/td",
  "css_selector_path": "table > tbody > tr > td"
  },
  "click_month": {
  "xpath": "/html/body/div[14]/div/div/div/div/div[1]/div[1]/div/button[1]",
  "css_selector_path": "div.ant-picker-header > div > button.ant-picker-month-btn"
  },
  "select_month": {
  "xpath": "//td['ant-picker-cell-in-view']",
  "css_selector_path": " div:nth-child(17) > div > div > div > div > div > div.ant-picker-body > table > tbody > tr > td"
  },
  "select_days": {
  "xpath": "//td['ant-picker-cell ant-picker-cell-in-view']",
  "css_selector_path": ".ant-picker-cell.ant-picker-cell-in-view"
  },
  "click_done": {
  "xpath": "//div[contains(text(),'Done')]",
  "css_selector_path": "div.styles__ControllerContainer-sc-1y1pqap-17.ildzqk > div.styles__RightContainer-sc-1y1pqap-19.ghwwft > div"
  }
  }
  },
  {
  "end_date_calendar": {
  "click_date": {
  "xpath": "//div/div[2]/div/div/div[1]/div[3]/div[2]/div/input",
  "css_selector_path": "div.sc-bsfKwI.cxUObd > div:nth-child(3) > div.ant-picker.sc-hLiTId.iZtGUu > div > input"
  },
  "click_year": {
  "xpath": "/html/body/div[14]/div/div/div/div/div[1]/div[1]/div/button[2]",
  "css_selector_path": "div.ant-picker-date-panel > div.ant-picker-header > div > button.ant-picker-year-btn"
  },
  "select_year": {
  "xpath": "//div/div/div/div/div/div[2]/table/tbody/tr/td",
  "css_selector_path": "table > tbody > tr > td"
  },
  "click_month": {
  "xpath": "/html/body/div[14]/div/div/div/div/div[1]/div[1]/div/button[1]",
  "css_selector_path": "div.ant-picker-header > div > button.ant-picker-month-btn"
  },
  "select_month": {
  "xpath": "//td['ant-picker-cell-in-view']",
  "css_selector_path": " div:nth-child(17) > div > div > div > div > div > div.ant-picker-body > table > tbody > tr > td"
  },
  "select_days": {
  "xpath": "//td['ant-picker-cell ant-picker-cell-in-view']",
  "css_selector_path": "div > div > div.ant-picker-body > table > tbody > tr > td",
  "css_selector_path": ".ant-picker-cell.ant-picker-cell-in-view"
  },
  "click_done": {
  "xpath": "//div[contains(text(),'Done')]",
  "css_selector_path": "div.styles__ControllerContainer-sc-1y1pqap-17.ildzqk > div.styles__RightContainer-sc-1y1pqap-19.ghwwft > div"
  }
  }
  }
  ]
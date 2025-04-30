import React, { useState } from "react";

const InputBuilder1 = () => {
  const [fields, setFields] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [fieldCounts, setFieldCounts] = useState({});

  const options = [
    { label: "Dropdown", type: "dropdown", groups: ["click", "selector"] },
    {
      label: "Range Calendar",
      type: "range_calendar",
      groups: [
          "click_date",
          "select_date",
        "click_month",
        "select_month",
        "click_year",
        "select_year",
        "click_done",
      ],
    },
    {
      label: "Start-End Calendar",
      type: "start_end_calendar",
      groups: [
        {
          name: "start_date_calendar",
          subGroups: [
            "click_date",
            "select_date",
          "click_month",
          "select_month",
          "click_year",
          "select_year",
          "click_done",
          ],
        },
        {
          name: "end_date_calendar",
          subGroups: [
            "click_date",
            "select_date",
          "click_month",
          "select_month",
          "click_year",
          "select_year",
          "click_done",
          ],
        },
      ],
    },
    { label: "Button Remove", type: "remove_pop", groups: ["selector"] },
    { label: "Button Submit", type: "click_done", groups: ["selector"] },
  ];

  const handleSelectOption = (selectedType) => {
    const selectedOption = options.find((opt) => opt.type === selectedType);
    if (!selectedOption) return;

    const newCount = (fieldCounts[selectedType] || 0) + 1;
    setFieldCounts((prev) => ({ ...prev, [selectedType]: newCount }));
    const idBase =
      newCount === 1 ? selectedType : `${selectedType}_${newCount - 1}`;

    const newFields = [];

    if (selectedType === "range_calendar") {
      newFields.push({
        id: idBase,
        type: "range_calendar",
        groups: selectedOption.groups.map((group) => ({
          groupName: group,
          xpath: "",
          css_selector_path: "",
        })),
      });
    } else if (selectedType === "start_end_calendar") {
      selectedOption.groups.forEach((groupObj) => {
        newFields.push({
          id: groupObj.name,
          type: groupObj.name,
          groups: groupObj.subGroups.map((sub) => ({
            groupName: sub,
            xpath: "",
            css_selector_path: "",
          })),
        });
      });
    } else {
      newFields.push({
        id: idBase,
        type: selectedType,
        groups: selectedOption.groups.map((group) => ({
          groupName: group,
          xpath: "",
          css_selector_path: "",
        })),
      });
    }

    setFields((prev) => [...prev, ...newFields]);
    setShowDropdown(false);
  };

  const handleInputChange = (fieldIndex, groupIndex, key, value) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].groups[groupIndex][key] = value;
    setFields(updatedFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = [];

    fields.forEach((field) => {
      const fieldEntry = {};
      const groupData = {};

      field.groups.forEach((group) => {
        const entry = {
          xpath: group.xpath,
          css_selector_path: group.css_selector_path,
        };
        if (group.td_element_selector) {
          entry.td_element_selector = group.td_element_selector;
        }
        groupData[group.groupName] = entry;
      });

      fieldEntry[field.id] = groupData;
      result.push(fieldEntry);
    });

    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="border-2 px-4 py-2 rounded-md"
        >
          Add Field
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

      <div className="mt-8">
        {fields.map((field, fieldIndex) => (
          <div
            key={fieldIndex}
            className="border p-4 mb-4 rounded-md shadow-sm"
          >
            <div className="mb-4">
              <p className="font-semibold">{field.id}</p>
              <p className="text-sm text-gray-500">{field.type}</p>
            </div>
            {field.groups.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-6">
                <h4 className="font-bold capitalize">{group.groupName}</h4>
                <input
                  type="text"
                  placeholder="Enter XPath"
                  value={group.xpath}
                  onChange={(e) =>
                    handleInputChange(
                      fieldIndex,
                      groupIndex,
                      "xpath",
                      e.target.value
                    )
                  }
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Enter CSS Selector Path"
                  value={group.css_selector_path}
                  onChange={(e) =>
                    handleInputChange(
                      fieldIndex,
                      groupIndex,
                      "css_selector_path",
                      e.target.value
                    )
                  }
                  className="border p-2 mb-2 w-full"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <button type="submit" className="border-2 px-6 py-2 rounded-md my-4">
        Submit
      </button>
    </form>
  );
};

export default InputBuilder1;


// import React, { useState } from "react";

// const InputBuilder1 = () => {
//   const [fields, setFields] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [fieldCounts, setFieldCounts] = useState({});

//   const options = [
//     { label: "Dropdown", type: "dropdown", groups: ["click", "selector"] },
//     {
//       label: "Range Calendar",
//       type: "range_calendar",
//       groups: [
//         "click_date",
//         "click_year",
//         "select_year",
//         "click_month",
//         "select_month",
//         "select_days",
//         "click_done",
//       ],
//     },
//     {
//       label: "Start-End Calendar",
//       type: "start_end_calendar",
//       groups: [
//         {
//           name: "start_date_calendar",
//           subGroups: [
//             "click_date",
//             "click_year",
//             "select_year",
//             "click_month",
//             "select_month",
//             "select_date",
//             "click_done",
//           ],
//         },
//         {
//           name: "end_date_calendar",
//           subGroups: [
//             "click_date",
//             "click_year",
//             "select_year",
//             "click_month",
//             "select_month",
//             "select_date",
//             "click_done",
//           ],
//         },
//       ],
//     },
//     { label: "Button Remove", type: "remove_pop", groups: ["selector"] },
//     { label: "Button Submit", type: "click_done", groups: ["selector"] },
//   ];

//   const handleSelectOption = (selectedType) => {
//     const selectedOption = options.find((opt) => opt.type === selectedType);
//     if (!selectedOption) return;

//     const newCount = (fieldCounts[selectedType] || 0) + 1;
//     setFieldCounts((prev) => ({ ...prev, [selectedType]: newCount }));
//     const idBase =
//       newCount === 1 ? selectedType : `${selectedType}_${newCount - 1}`;

//     const newFields = [];

//     if (selectedType === "range_calendar" || selectedType === "start_end_calendar") {
//       const dropdownId = `dropdown_${fieldCounts["dropdown"] || 0}`;
//       setFieldCounts((prev) => ({
//         ...prev,
//         dropdown: (prev["dropdown"] || 0) + 1,
//       }));

//       newFields.push({
//         id: dropdownId,
//         type: "dropdown",
//         groups: ["click", "selector"].map((group) => ({
//           groupName: group,
//           xpath: "",
//           css_selector_path: "",
//         })),
//       });
//     }

//     if (selectedType === "range_calendar") {
//       newFields.push({
//         id: idBase,
//         type: "range_calendar",
//         groups: selectedOption.groups.map((group) => ({
//           groupName: group,
//           xpath: "",
//           css_selector_path: "",
//         })),
//       });
//     } else if (selectedType === "start_end_calendar") {
//       selectedOption.groups.forEach((groupObj) => {
//         newFields.push({
//           id: groupObj.name,
//           type: groupObj.name,
//           groups: groupObj.subGroups.map((sub) => ({
//             groupName: sub,
//             xpath: "",
//             css_selector_path: "",
//           })),
//         });
//       });
//     } else {
//       newFields.push({
//         id: idBase,
//         type: selectedType,
//         groups: selectedOption.groups.map((group) => ({
//           groupName: group,
//           xpath: "",
//           css_selector_path: "",
//         })),
//       });
//     }

//     setFields((prev) => [...prev, ...newFields]);
//     setShowDropdown(false);
//   };

//   const handleInputChange = (fieldIndex, groupIndex, key, value) => {
//     const updatedFields = [...fields];
//     updatedFields[fieldIndex].groups[groupIndex][key] = value;
//     setFields(updatedFields);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const result = [];

//     fields.forEach((field) => {
//       const fieldEntry = {};
//       const groupData = {};

//       field.groups.forEach((group) => {
//         const entry = {
//           xpath: group.xpath,
//           css_selector_path: group.css_selector_path,
//         };
//         if (group.td_element_selector) {
//           entry.td_element_selector = group.td_element_selector;
//         }
//         groupData[group.groupName] = entry;
//       });

//       fieldEntry[field.id] = groupData;
//       result.push(fieldEntry);
//     });

//     console.log(result);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="relative">
//         <button
//           type="button"
//           onClick={() => setShowDropdown(!showDropdown)}
//           className="border-2 px-4 py-2 rounded-md"
//         >
//           Add Field
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

//       <div className="mt-8">
//         {fields.map((field, fieldIndex) => (
//           <div
//             key={fieldIndex}
//             className="border p-4 mb-4 rounded-md shadow-sm"
//           >
//             <div className="mb-4">
//               <p className="font-semibold">{field.id}</p>
//               <p className="text-sm text-gray-500">{field.type}</p>
//             </div>
//             {field.groups.map((group, groupIndex) => (
//               <div key={groupIndex} className="mb-6">
//                 <h4 className="font-bold capitalize">{group.groupName}</h4>
//                 <input
//                   type="text"
//                   placeholder="Enter XPath"
//                   value={group.xpath}
//                   onChange={(e) =>
//                     handleInputChange(
//                       fieldIndex,
//                       groupIndex,
//                       "xpath",
//                       e.target.value
//                     )
//                   }
//                   className="border p-2 mb-2 w-full"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Enter CSS Selector Path"
//                   value={group.css_selector_path}
//                   onChange={(e) =>
//                     handleInputChange(
//                       fieldIndex,
//                       groupIndex,
//                       "css_selector_path",
//                       e.target.value
//                     )
//                   }
//                   className="border p-2 mb-2 w-full"
//                 />
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>

//       <button type="submit" className="border-2 px-6 py-2 rounded-md my-4">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default InputBuilder1;


// import React, { useState } from "react";

// const InputBuilder1 = () => {
//   const [fields, setFields] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [fieldCounts, setFieldCounts] = useState({});

//   const options = [
//     { label: "Dropdown", type: "dropdown", groups: ["click", "selector"] },
//     {
//       label: "Range Calendar",
//       type: "range_calendar",
//       groups: [
//         "click_date",
//         "click_year",
//         "select_year",
//         "click_month",
//         "select_month",
//         "select_days",
//         "click_done",
//       ],
//     },
//     {
//       label: "Start-End Calendar",
//       type: "start_end_calendar",
//       groups: [
//         { name: "start_date_calendar", subGroups: ["click_date", "click_year", "select_year", "click_month", "select_month", "select_days", "click_done"] },
//         { name: "end_date_calendar", subGroups: ["click_date", "click_year", "select_year", "click_month", "select_month", "select_days", "click_done"] }
//       ],
//     },
//     { label: "Button Remove", type: "remove_pop", groups: ["selector"] },
//     { label: "Button Submit", type: "click_done", groups: ["selector"] },
//   ];

//   const handleSelectOption = (selectedType) => {
//     const selectedOption = options.find((opt) => opt.type === selectedType);
//     if (!selectedOption) return;

//     const newCount = (fieldCounts[selectedType] || 0) + 1;
//     setFieldCounts((prev) => ({ ...prev, [selectedType]: newCount }));
//     const idBase = newCount === 1 ? selectedType : `${selectedType}_${newCount - 1}`;

//     const newFields = [];

//     // Handle dropdown + range_calendar or dropdown + start_end_calendar
//     if (selectedType === "range_calendar") {
//       const dropdownId = `dropdown_${newCount - 1}`;
//       newFields.push({
//         id: dropdownId,
//         type: "dropdown",
//         groups: ["click", "selector"].map((group) => ({
//           groupName: group,
//           xpath: "",
//           css_selector_path: "",
//         })),
//       });

//       newFields.push({
//         id: idBase,
//         type: "range_calendar",
//         groups: selectedOption.groups.map((group) => ({
//           groupName: group,
//           xpath: "",
//           css_selector_path: "",
//         })),
//       });
//     } else if (selectedType === "start_end_calendar") {
//       const dropdownId = `dropdown_${newCount - 1}`;
//       newFields.push({
//         id: dropdownId,
//         type: "dropdown",
//         groups: ["click", "selector"].map((group) => ({
//           groupName: group,
//           xpath: "",
//           css_selector_path: "",
//         })),
//       });

//       selectedOption.groups.forEach((groupObj) => {
//         newFields.push({
//           id: groupObj.name,
//           type: groupObj.name,
//           groups: groupObj.subGroups.map((sub) => ({
//             groupName: sub,
//             xpath: "",
//             css_selector_path: "",
//           })),
//         });
//       });
//     } else {
//       newFields.push({
//         id: idBase,
//         type: selectedOption.type,
//         groups: selectedOption.groups.map((group) => ({
//           groupName: group,
//           xpath: "",
//           css_selector_path: "",
//         })),
//       });
//     }

//     setFields((prev) => [...prev, ...newFields]);
//     setShowDropdown(false);
//   };

//   const handleInputChange = (fieldIndex, groupIndex, key, value) => {
//     const updatedFields = [...fields];
//     updatedFields[fieldIndex].groups[groupIndex][key] = value;
//     setFields(updatedFields);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const result = {};

//     fields.forEach((field) => {
//       const groupData = {};
//       field.groups.forEach((group) => {
//         const entry = {
//           xpath: group.xpath,
//           css_selector_path: group.css_selector_path,
//         };
//         if (group.td_element_selector) {
//           entry.td_element_selector = group.td_element_selector;
//         }
//         groupData[group.groupName] = entry;
//       });

//       result[field.id] = groupData;
//     });

//     console.log(result);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="relative">
//         <button
//           type="button"
//           onClick={() => setShowDropdown(!showDropdown)}
//           className="border-2 px-4 py-2 rounded-md"
//         >
//           Add Field
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

//       <div className="mt-8">
//         {fields.map((field, fieldIndex) => (
//           <div
//             key={fieldIndex}
//             className="border p-4 mb-4 rounded-md shadow-sm"
//           >
//             <div className="mb-4">
//               <p className="font-semibold">{field.id}</p>
//               <p className="text-sm text-gray-500">{field.type}</p>
//             </div>
//             {field.groups.map((group, groupIndex) => (
//               <div key={groupIndex} className="mb-6">
//                 <h4 className="font-bold capitalize">{group.groupName}</h4>
//                 <input
//                   type="text"
//                   placeholder="Enter XPath"
//                   value={group.xpath}
//                   onChange={(e) =>
//                     handleInputChange(
//                       fieldIndex,
//                       groupIndex,
//                       "xpath",
//                       e.target.value
//                     )
//                   }
//                   className="border p-2 mb-2 w-full"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Enter CSS Selector Path"
//                   value={group.css_selector_path}
//                   onChange={(e) =>
//                     handleInputChange(
//                       fieldIndex,
//                       groupIndex,
//                       "css_selector_path",
//                       e.target.value
//                     )
//                   }
//                   className="border p-2 mb-2 w-full"
//                 />
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>

//       <button
//         type="submit"
//         className="border-2 px-6 py-2 rounded-md my-4"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default InputBuilder1;





// import React, { useState } from "react";

// const InputBuilder1 = () => {
//   const [fields, setFields] = useState([]);
//   console.log(fields)
//   const [showDropdown, setShowDropdown] = useState(false);

//   const options = [
//     { label: "Select", type: "select" ,elements:{"click":["input","input"],"selector":["input","input"]}},
//     { label: "Date Range", type: "dateRange",elements:{"click":["input","input","input"],"selector":["input","input","input"]}  },
//     { label: "sendbutton", type: "button" ,elements:{"selector":["input","input"]}},
//   ];

//   const handleSelectOption = (type) => {
//     setFields(...fields, { type: type });
//   };
//   return (
//     <div>
//       <div>
//         <button
//           onClick={() => setShowDropdown(!showDropdown)}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md"
//         >
//           Add Field
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
//       <div>
//         {fields && fields.map((field) => {
//           {
//             field.type === "select" && (
//                 field.elements.map(element=>{
//                     <p>{element.key}</p>
//                     element.values.map((val)=>(
//                         <input type="text" />
//                     ))
//                 })
//             //   <div>
//             //     <div className="border">
//             //       <p>Click</p>
//             //       <div className="flex">
//             //         <label htmlFor="">xpath</label>
//             //         <input type="text" />
//             //         <label htmlFor="">css</label>
//             //         <input type="text" />
//             //       </div>
//             //     </div>
//             //     <div className="border">
//             //       <p>Select</p>
//             //       <div className="flex">
//             //         <label htmlFor="">xpath</label>
//             //         <input type="text" />
//             //         <label htmlFor="">css</label>
//             //         <input type="text" />
//             //       </div>
//             //     </div>
//             //   </div>
//             );
//           }
//         })}
//       </div>
//     </div>
//   );
// };

// export default InputBuilder1;

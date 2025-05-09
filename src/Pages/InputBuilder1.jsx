import React, { useState } from "react";

const rangeCalendarTemplate = () => ({
  click_date: { xpath: "", css_selector_path: "" },
  click_year: { xpath: "", css_selector_path: "" },
  select_year: { xpath: "", css_selector_path: "" },
  click_month: { xpath: "", css_selector_path: "" },
  select_month: { xpath: "", css_selector_path: "" },
  select_day: { xpath: "", css_selector_path: "" },
  click_done: { xpath: "", css_selector_path: "" },
});

const startEndCalendarTemplate = () => ({
  click_date: { xpath: "", css_selector_path: "" },
  click_year: { xpath: "", css_selector_path: "" },
  select_year: { xpath: "", css_selector_path: "" },
  click_month: { xpath: "", css_selector_path: "" },
  select_month: { xpath: "", css_selector_path: "" },
  select_day: { xpath: "", css_selector_path: "" },
  click_done: { xpath: "", css_selector_path: "" },
});

const isAllEmpty = (obj) => {
  if (!obj) return true;
  return Object.values(obj).every(
    (v) =>
      v === "" ||
      v === undefined ||
      v === null ||
      (typeof v === "object" && isAllEmpty(v))
  );
};

const options = [
  { label: "Media Type", type: "media_type" },
  { label: "Client Name", type: "client_name" },
  { label: "Login Process", type: "login" },
  { label: "Account Name", type: "account_name" },
  { label: "Account ID", type: "account_id" },
  { label: "Platform ID", type: "platform_id" },
  { label: "Report Type", type: "report_type" },
  { label: "Segment", type: "segment" },
  { label: "Platform", type: "platform" },
  { label: "Sync Date Range", type: "sync_date_range" },
  { label: "Frequency", type: "frequency" },
  { label: "Report Url", type: "reporturl" },
  { label: "Button Remove Popup", type: "remove_pop" },
  { label: "Report Download Data", type: "report_download_data" },
  { label: "Click Download Button", type: "click_download_button" },
  // { label: "Range Calendar", type: "range_calendar" },
  { label: "Status", type: "status" },
];

const SIMPLE_INPUT_TYPES = [
  "sync_date_range",
  "frequency",
  "status",
  "client_name",
  "account_name",
  "account_id",
  "platform_id",
  "report_type",
  "segment",
  "platform",
  "media_type",
];

const InputBuilder1 = () => {
  const [fields, setFields] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [fieldCounts, setFieldCounts] = useState({});

  const handleSelectOption = (selectedType) => {
    const newCount = (fieldCounts[selectedType] || 0) + 1;
    setFieldCounts((prev) => ({ ...prev, [selectedType]: newCount }));
    const idBase =
      newCount === 1 ? selectedType : `${selectedType}_${newCount - 1}`;

    if (selectedType === "report_download_data") {
      setFields((prev) => [
        ...prev,
        {
          id: idBase,
          type: "report_download_data",
          dropdowns: [
            {
              dropdownName: "dropdown_1",
              click: { xpath: "", css_selector_path: "" },
              selector: { xpath: "", css_selector_path: "" },
            },
            {
              dropdownName: "dropdown_2",
              click: { xpath: "", css_selector_path: "" },
              selector: { xpath: "", css_selector_path: "" },
            },
            {
              dropdownName: "dropdown_3",
              click: { xpath: "", css_selector_path: "" },
              selector: { xpath: "", css_selector_path: "" },
            },
          ],
          range_calendar: rangeCalendarTemplate(),
          start_date_calendar: startEndCalendarTemplate(),
          end_date_calendar: startEndCalendarTemplate(),
        },
      ]);
    } else if (selectedType === "range_calendar") {
      setFields((prev) => [
        ...prev,
        {
          id: idBase,
          type: "range_calendar",
          ...rangeCalendarTemplate(),
        },
      ]);
    } else if (SIMPLE_INPUT_TYPES.includes(selectedType)) {
      setFields((prev) => [
        ...prev,
        {
          id: idBase,
          type: selectedType,
          value: "",
        },
      ]);
    } else if (selectedType === "login") {
      setFields((prev) => [
        ...prev,
        {
          id: idBase,
          type: "login",
          metadata: { login_url: "", mail: "", password: "" },
          groups: [
            { groupName: "login_username", xpath: "", css_selector: "" },
            { groupName: "login_password", xpath: "", css_selector: "" },
            { groupName: "login_submit", xpath: "", css_selector: "" },
            { groupName: "click_login_btn", xpath: "" },
            { groupName: "login_email_box", xpath: "" },
            { groupName: "clk_request_btn", xpath: "" },
          ],
        },
      ]);
    } else if (selectedType === "reporturl") {
      setFields((prev) => [
        ...prev,
        { id: idBase, type: "reporturl", value: "" },
      ]);
    } else if (selectedType === "remove_pop") {
      setFields((prev) => [
        ...prev,
        { id: idBase, type: "remove_pop", xpath: "", css_selector: "" },
      ]);
    } else if (selectedType === "click_download_button") {
      setFields((prev) => [
        ...prev,
        { id: idBase, type: "click_download_button", xpath: "", css_selector_path: "" },
      ]);
    }
    setShowDropdown(false);
  };

  const handleDropdownChange = (fieldIndex, dropdownIdx, section, key, value) => {
    setFields((prev) => {
      const updated = [...prev];
      updated[fieldIndex].dropdowns[dropdownIdx][section][key] = value;
      return updated;
    });
  };

  const handleCalendarChange = (fieldIndex, calendarType, section, key, value) => {
    setFields((prev) => {
      const updated = [...prev];
      updated[fieldIndex][calendarType][section][key] = value;
      return updated;
    });
  };

  const handleSimpleValueChange = (fieldIndex, value) => {
    setFields((prev) => {
      const updated = [...prev];
      updated[fieldIndex].value = value;
      return updated;
    });
  };

  const handleInputChange = (fieldIndex, groupIndex, key, value) => {
    setFields((prev) => {
      const updated = [...prev];
      updated[fieldIndex].groups[groupIndex][key] = value;
      return updated;
    });
  };

  const handleLoginMetaChange = (fieldIndex, key, value) => {
    setFields((prev) => {
      const updated = [...prev];
      updated[fieldIndex].metadata[key] = value;
      return updated;
    });
  };

  const handleReportUrlChange = (fieldIndex, value) => {
    setFields((prev) => {
      const updated = [...prev];
      updated[fieldIndex].value = value;
      return updated;
    });
  };

  const handleRemovePopChange = (fieldIndex, key, value) => {
    setFields((prev) => {
      const updated = [...prev];
      updated[fieldIndex][key] = value;
      return updated;
    });
  };

  const handleClickDownloadChange = (fieldIndex, key, value) => {
    setFields((prev) => {
      const updated = [...prev];
      updated[fieldIndex][key] = value;
      return updated;
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const result = {};

    fields.forEach((field) => {
      if (field.type === "login") {
        const loginObj = {
          login_url: field.metadata?.login_url || "",
          mail: field.metadata?.mail || "",
          password: field.metadata?.password || "",
          login_username: {
            xpath: field.groups?.[0]?.xpath || "",
            css_selector: field.groups?.[0]?.css_selector || "",
          },
          login_password: {
            xpath: field.groups?.[1]?.xpath || "",
            css_selector: field.groups?.[1]?.css_selector || "",
          },
          login_submit: {
            xpath: field.groups?.[2]?.xpath || "",
            css_selector: field.groups?.[2]?.css_selector || "",
          },
          click_login_btn: {
            xpath: field.groups?.[3]?.xpath || "",
          },
          login_email_box: {
            xpath: field.groups?.[4]?.xpath || "",
          },
          clk_request_btn: {
            xpath: field.groups?.[5]?.xpath || "",
          },
        };
        Object.keys(loginObj).forEach(
          (k) =>
            (typeof loginObj[k] === "string"
              ? loginObj[k] === ""
              : isAllEmpty(loginObj[k])) && delete loginObj[k]
        );
        if (Object.keys(loginObj).length > 0) result["login_process"] = loginObj;
      }

      if (field.type === "reporturl" && field.value && field.value.trim() !== "") {
        result["report_url"] = field.value;
      }

      if (field.type === "remove_pop") {
        const obj = {
          xpath: field.xpath || "",
          css_selector: field.css_selector || "",
        };
        if (!isAllEmpty(obj)) result["remove_pop"] = obj;
      }

      if (field.type === "click_download_button") {
        const obj = {
          xpath: field.xpath || "",
          css_selector_path: field.css_selector_path || "",
        };
        if (!isAllEmpty(obj)) result["click_download_button"] = obj;
      }

      if (field.type === "report_download_data") {
        const arr = [];

        // Dropdowns
        field.dropdowns.forEach((dropdown) => {
          const click = dropdown.click;
          const selector = dropdown.selector;
          if (!isAllEmpty(click) || !isAllEmpty(selector)) {
            const dropdownObj = {};
            if (!isAllEmpty(click)) dropdownObj.click = { ...click };
            if (!isAllEmpty(selector)) dropdownObj.selector = { ...selector };
            arr.push({ [dropdown.dropdownName]: dropdownObj });
          }
        });

        
        const rangeCal = {};
        Object.entries(field.range_calendar).forEach(([section, val]) => {
          if (!isAllEmpty(val)) rangeCal[section] = { ...val };
        });
        if (Object.keys(rangeCal).length > 0) {
          arr.push({ range_calendar: rangeCal });
        }

        
        const startCal = {};
        Object.entries(field.start_date_calendar).forEach(([section, val]) => {
          if (!isAllEmpty(val)) startCal[section] = { ...val };
        });
        if (Object.keys(startCal).length > 0) {
          arr.push({ start_date_calendar: startCal });
        }

        
        const endCal = {};
        Object.entries(field.end_date_calendar).forEach(([section, val]) => {
          if (!isAllEmpty(val)) endCal[section] = { ...val };
        });
        if (Object.keys(endCal).length > 0) {
          arr.push({ end_date_calendar: endCal });
        }

        if (arr.length > 0) result["report_download_data"] = arr;
      }

      if (SIMPLE_INPUT_TYPES.includes(field.type)) {
        if (field.value && field.value.trim() !== "") {
          result[field.type] = field.value;
        }
      }
    });
   try {
     const response = await fetch("http://localhost:3000/submit", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(result),
     });
     if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
     }
     const data = await response.json();
     console.log("Server Response:", data);
   } catch (error) {
     console.error("Error occurred while submitting the form:", error);
   }
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
            {field.type === "login" ? (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Login URL"
                    value={field.metadata.login_url || ""}
                    onChange={(e) =>
                      handleLoginMetaChange(fieldIndex, "login_url", e.target.value)
                    }
                    className="border p-2 mb-2 w-full"
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    value={field.metadata.mail || ""}
                    onChange={(e) =>
                      handleLoginMetaChange(fieldIndex, "mail", e.target.value)
                    }
                    className="border p-2 mb-2 w-full"
                  />
                  <input
                    type="text"
                    placeholder="Password"
                    value={field.metadata.password || ""}
                    onChange={(e) =>
                      handleLoginMetaChange(fieldIndex, "password", e.target.value)
                    }
                    className="border p-2 mb-2 w-full"
                  />
                </div>
                {field.groups.map((group, groupIndex) => (
                  <div key={groupIndex} className="mb-6">
                    <h4 className="font-bold capitalize">
                      {group.groupName.replace("login_", "").replace("_", " ")}
                    </h4>
                    <input
                      type="text"
                      placeholder="Enter XPath"
                      value={group.xpath || ""}
                      onChange={(e) =>
                        handleInputChange(fieldIndex, groupIndex, "xpath", e.target.value)
                      }
                      className="border p-2 mb-2 w-full"
                    />
                    {"css_selector" in group ? (
                      <input
                        type="text"
                        placeholder="Enter CSS Selector"
                        value={group.css_selector || ""}
                        onChange={(e) =>
                          handleInputChange(fieldIndex, groupIndex, "css_selector", e.target.value)
                        }
                        className="border p-2 mb-2 w-full"
                      />
                    ) : null}
                  </div>
                ))}
              </>
            ) : field.type === "reporturl" ? (
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Enter Report URL"
                  value={field.value || ""}
                  onChange={(e) =>
                    handleReportUrlChange(fieldIndex, e.target.value)
                  }
                  className="border p-2 mb-2 w-full"
                />
              </div>
            ) : field.type === "remove_pop" ? (
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Enter XPath"
                  value={field.xpath || ""}
                  onChange={(e) =>
                    handleRemovePopChange(fieldIndex, "xpath", e.target.value)
                  }
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Enter CSS Selector"
                  value={field.css_selector || ""}
                  onChange={(e) =>
                    handleRemovePopChange(fieldIndex, "css_selector", e.target.value)
                  }
                  className="border p-2 mb-2 w-full"
                />
              </div>
            ) : field.type === "click_download_button" ? (
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Enter XPath"
                  value={field.xpath || ""}
                  onChange={(e) =>
                    handleClickDownloadChange(fieldIndex, "xpath", e.target.value)
                  }
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Enter CSS Selector Path"
                  value={field.css_selector_path || ""}
                  onChange={(e) =>
                    handleClickDownloadChange(fieldIndex, "css_selector_path", e.target.value)
                  }
                  className="border p-2 mb-2 w-full"
                />
              </div>
            ) : field.type === "report_download_data" ? (
              <div>
                <h4 className="font-bold mb-2">Dropdowns</h4>
                {field.dropdowns.map((dropdown, dropdownIdx) => (
                  <div key={dropdown.dropdownName} className="mb-4 border rounded p-2">
                    <div className="font-semibold mb-1">{dropdown.dropdownName}</div>
                    <div className="mb-2">
                      <label className="block text-xs">Click XPath</label>
                      <input
                        type="text"
                        placeholder="Click XPath"
                        value={dropdown.click.xpath}
                        onChange={(e) =>
                          handleDropdownChange(fieldIndex, dropdownIdx, "click", "xpath", e.target.value)
                        }
                        className="border p-2 mb-1 w-full"
                      />
                      <label className="block text-xs">Click CSS Selector Path</label>
                      <input
                        type="text"
                        placeholder="Click CSS Selector Path"
                        value={dropdown.click.css_selector_path}
                        onChange={(e) =>
                          handleDropdownChange(fieldIndex, dropdownIdx, "click", "css_selector_path", e.target.value)
                        }
                        className="border p-2 mb-1 w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs">Selector XPath</label>
                      <input
                        type="text"
                        placeholder="Selector XPath"
                        value={dropdown.selector.xpath}
                        onChange={(e) =>
                          handleDropdownChange(fieldIndex, dropdownIdx, "selector", "xpath", e.target.value)
                        }
                        className="border p-2 mb-1 w-full"
                      />
                      <label className="block text-xs">Selector CSS Selector Path</label>
                      <input
                        type="text"
                        placeholder="Selector CSS Selector Path"
                        value={dropdown.selector.css_selector_path}
                        onChange={(e) =>
                          handleDropdownChange(fieldIndex, dropdownIdx, "selector", "css_selector_path", e.target.value)
                        }
                        className="border p-2 mb-1 w-full"
                      />
                    </div>
                  </div>
                ))}
                <h4 className="font-bold mb-2">Range Calendar</h4>
                {Object.entries(field.range_calendar).map(([section, val]) => (
                  <div key={section} className="mb-2">
                    <div className="font-semibold">{section}</div>
                    <input
                      type="text"
                      placeholder="XPath"
                      value={val.xpath}
                      onChange={(e) =>
                        handleCalendarChange(fieldIndex, "range_calendar", section, "xpath", e.target.value)
                      }
                      className="border p-2 mb-1 w-full"
                    />
                    <input
                      type="text"
                      placeholder="CSS Selector Path"
                      value={val.css_selector_path}
                      onChange={(e) =>
                        handleCalendarChange(fieldIndex, "range_calendar", section, "css_selector_path", e.target.value)
                      }
                      className="border p-2 mb-1 w-full"
                    />
                  </div>
                ))}
                <h4 className="font-bold mb-2">Start Date Calendar</h4>
                {Object.entries(field.start_date_calendar).map(([section, val]) => (
                  <div key={section} className="mb-2">
                    <div className="font-semibold">{section}</div>
                    <input
                      type="text"
                      placeholder="XPath"
                      value={val.xpath}
                      onChange={(e) =>
                        handleCalendarChange(fieldIndex, "start_date_calendar", section, "xpath", e.target.value)
                      }
                      className="border p-2 mb-1 w-full"
                    />
                    <input
                      type="text"
                      placeholder="CSS Selector Path"
                      value={val.css_selector_path}
                      onChange={(e) =>
                        handleCalendarChange(fieldIndex, "start_date_calendar", section, "css_selector_path", e.target.value)
                      }
                      className="border p-2 mb-1 w-full"
                    />
                  </div>
                ))}
                <h4 className="font-bold mb-2">End Date Calendar</h4>
                {Object.entries(field.end_date_calendar).map(([section, val]) => (
                  <div key={section} className="mb-2">
                    <div className="font-semibold">{section}</div>
                    <input
                      type="text"
                      placeholder="XPath"
                      value={val.xpath}
                      onChange={(e) =>
                        handleCalendarChange(fieldIndex, "end_date_calendar", section, "xpath", e.target.value)
                      }
                      className="border p-2 mb-1 w-full"
                    />
                    <input
                      type="text"
                      placeholder="CSS Selector Path"
                      value={val.css_selector_path}
                      onChange={(e) =>
                        handleCalendarChange(fieldIndex, "end_date_calendar", section, "css_selector_path", e.target.value)
                      }
                      className="border p-2 mb-1 w-full"
                    />
                  </div>
                ))}
              </div>
            ) : SIMPLE_INPUT_TYPES.includes(field.type) ? (
              <div className="mb-6">
                <input
                  type="text"
                  placeholder={`Enter ${field.type.replace(/_/g, " ")}`}
                  value={field.value || ""}
                  onChange={(e) =>
                    handleSimpleValueChange(fieldIndex, e.target.value)
                  }
                  className="border p-2 mb-2 w-full"
                />
              </div>
            ) : null}
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



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";

// const InputBuilder1 = () => {
//   const [fields, setFields] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [fieldCounts, setFieldCounts] = useState({});

//   const options = [
//     {
//       label: "Login",
//       type: "login",
//       groups: [
//         { groupName: "login_username", xpath: "", css_selector: "" },
//         { groupName: "login_password", xpath: "", css_selector: "" },
//         { groupName: "login_submit", xpath: "", css_selector: "" },
//         ////
//         { groupName: "click_login_btn", xpath: "" },
//         { groupName: "login_email_box", xpath: "" },
//         { groupName: "clk_request_btn", xpath: "" },
//         ////
//       ],
//       metadata: {
//         login_url: "",
//         mail: "",
//         password: "",
//       },
//     },
//     // {
//     //   label: "Range Calendar",
//     //   type: "range_calendar",
//     //   groups: [
//     //     "click_date",
//     //     "select_date",
//     //     "click_month",
//     //     "select_month",
//     //     "click_year",
//     //     "select_year",
//     //     "click_done",
//     //   ],
//     // },
//     // {
//     //   label: "Start-End Calendar",
//     //   type: "start_end_calendar",
//     //   groups: [
//     //     {
//     //       name: "start_date_calendar",
//     //       subGroups: [
//     //         "click_date",
//     //         "select_date",
//     //         "click_month",
//     //         "select_month",
//     //         "click_year",
//     //         "select_year",
//     //         "click_done",
//     //       ],
//     //     },
//     //     {
//     //       name: "end_date_calendar",
//     //       subGroups: [
//     //         "click_date",
//     //         "select_date",
//     //         "click_month",
//     //         "select_month",
//     //         "click_year",
//     //         "select_year",
//     //         "click_done",
//     //       ],
//     //     },
//     //   ],
//     // },
//     {
//       label: "Report Url",
//       type: "reporturl",
//     },
//     {
//       label: "Button Remove",
//       type: "remove_pop",
//       groups: [{ groupName: "remove_pop", xpath: "", css_selector: "" }],
//     },
//     {
//       label: "Click Download Button",
//       type: "click_download_button",
//       groups: [
//         { groupName: "click_download_button", xpath: "", css_selector_path: "" },
//       ],
//     },
//     {
//       label: "Report Download Data",
//       type: "report_download_data",
//     },
//     { label: "Sync Date Range", type: "sync_date_range" },
//     { label: "Frequency", type: "frequency" },
//     { label: "Status", type: "status" },
//     { label: "Client Name", type: "client_name" },
//     { label: "Account Name", type: "account_name" },
//     { label: "Account ID", type: "account_id" },
//     { label: "Platform ID", type: "platform_id" },
//     { label: "Report Type", type: "report_type" },
//     { label: "Segment", type: "segment" },
//     { label: "Platform", type: "platform" },
//     { label: "Media Type", type: "media_type" },
//   ];

//   const handleSelectOption = (selectedType) => {
//     const selectedOption = options.find((opt) => opt.type === selectedType);
//     if (!selectedOption) return;

//     const newCount = (fieldCounts[selectedType] || 0) + 1;
//     setFieldCounts((prev) => ({ ...prev, [selectedType]: newCount }));
//     const idBase =
//       newCount === 1 ? selectedType : `${selectedType}_${newCount - 1}`;

//     if (selectedType === "login") {
//       setFields((prev) => [
//         ...prev,
//         {
//           id: idBase,
//           type: "login",
//           metadata: { login_url: "", mail: "", password: "" },
//           groups: [
//             { groupName: "login_username", xpath: "", css_selector: "" },
//             { groupName: "login_password", xpath: "", css_selector: "" },
//             { groupName: "login_submit", xpath: "", css_selector: "" },

//             ////
//             { groupName: "click_login_btn", xpath: "" },
//             { groupName: "login_email_box", xpath: "" },
//             { groupName: "clk_request_btn", xpath: "" },
//             ////

//           ],
//         },
//       ]);
//     } else if (selectedType === "reporturl") {
//       setFields((prev) => [
//         ...prev,
//         {
//           id: idBase,
//           type: "reporturl",
//           value: "",
//         },
//       ]);
//     } else if (selectedType === "remove_pop") {
//       setFields((prev) => [
//         ...prev,
//         {
//           id: idBase,
//           type: "remove_pop",
//           xpath: "",
//           css_selector: "",
//         },
//       ]);
//     } else if (selectedType === "click_download_button") {
//       setFields((prev) => [
//         ...prev,
//         {
//           id: idBase,
//           type: "click_download_button",
//           xpath: "",
//           css_selector_path: "",
//         },
//       ]);
//     } else if (selectedType === "range_calendar") {
//       setFields((prev) => [
//         ...prev,
//         {
//           id: idBase,
//           type: "range_calendar",
//           groups: selectedOption.groups.map((group) => ({
//             groupName: group,
//             xpath: "",
//             css_selector_path: "",
//           })),
//         },
//       ]);
//     } else if (selectedType === "start_end_calendar") {
//       const newFields = [];
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
//       setFields((prev) => [...prev, ...newFields]);
//     } else if (selectedType === "report_download_data") {
//       setFields((prev) => [
//         ...prev,
//         {
//           id: idBase,
//           type: "report_download_data",
//           dropdowns: [
//             {
//               dropdownName: "dropdown_1",
//               click: { xpath: "", css_selector_path: "" },
//               selector: { xpath: "", css_selector_path: "" },
//             },
//             {
//               dropdownName: "dropdown_2",
//               click: { xpath: "", css_selector_path: "" },
//               selector: { xpath: "", css_selector_path: "" },
//             },
//             {
//               dropdownName: "dropdown_3",
//               click: { xpath: "", css_selector_path: "" },
//               selector: { xpath: "", css_selector_path: "" },
//             },
//           ],
//           range_calender: {
//             click_date: { xpath: "", css_selector_path: "" },
//             click_year: { xpath: "", css_selector_path: "" },
//             select_year: { xpath: "", css_selector_path: "" },
//             click_month: { xpath: "", css_selector_path: "" },
//             select_month: { xpath: "", css_selector_path: "" },
//             select_day: { xpath: "", css_selector_path: "", td_element_selector: "" },
//             click_done: { xpath: "", css_selector_path: "" },
//           },
          
//         },
//       ]);
//     } else if (
//       selectedType === "sync_date_range" ||
//       selectedType === "frequency" ||
//       selectedType === "status" ||
//       selectedType === "client_name" ||
//       selectedType === "account_name" ||
//       selectedType === "account_id" ||
//       selectedType === "platform_id" ||
//       selectedType === "report_type" ||
//       selectedType === "segment" ||
//       selectedType === "platform" ||
//       selectedType === "media_type"
//     ) {
//       setFields((prev) => [
//         ...prev,
//         {
//           id: idBase,
//           type: selectedType,
//           value: "",
//         },
//       ]);
//     } else {
//       setFields((prev) => [
//         ...prev,
//         {
//           id: idBase,
//           type: selectedType,
//           groups: selectedOption.groups.map((group) => ({
//             groupName: group,
//             xpath: "",
//             css_selector_path: "",
//           })),
//         },
//       ]);
//     }
//     setShowDropdown(false);
//   };

//   const handleInputChange = (fieldIndex, groupIndex, key, value) => {
//     const updatedFields = [...fields];
//     updatedFields[fieldIndex].groups[groupIndex][key] = value;
//     setFields(updatedFields);
//   };

//   const handleLoginMetaChange = (fieldIndex, key, value) => {
//     const updatedFields = [...fields];
//     updatedFields[fieldIndex].metadata[key] = value;
//     setFields(updatedFields);
//   };

//   const handleReportUrlChange = (fieldIndex, value) => {
//     const updatedFields = [...fields];
//     updatedFields[fieldIndex].value = value;
//     setFields(updatedFields);
//   };

//   const handleRemovePopChange = (fieldIndex, key, value) => {
//     const updatedFields = [...fields];
//     updatedFields[fieldIndex][key] = value;
//     setFields(updatedFields);
//   };

//   const handleClickDownloadChange = (fieldIndex, key, value) => {
//     const updatedFields = [...fields];
//     updatedFields[fieldIndex][key] = value;
//     setFields(updatedFields);
//   };

//   // For report_download_data dropdowns
//   const handleReportDownloadDropdownChange = (fieldIndex, dropdownIdx, section, key, value) => {
//     const updatedFields = [...fields];
//     updatedFields[fieldIndex].dropdowns[dropdownIdx][section][key] = value;
//     setFields(updatedFields);
//   };

//   // For report_download_data range_calender
//   const handleReportDownloadRangeChange = (fieldIndex, section, key, value) => {
//     const updatedFields = [...fields];
//     updatedFields[fieldIndex].range_calender[section][key] = value;
//     setFields(updatedFields);
//   };

//   // For report_download_data range_calender td_element_selector
//   const handleReportDownloadRangeTdSelectorChange = (fieldIndex, value) => {
//     const updatedFields = [...fields];
//     updatedFields[fieldIndex].range_calender.select_day.td_element_selector = value;
//     setFields(updatedFields);
//   };

//   // For simple value fields
//   const handleSimpleValueChange = (fieldIndex, value) => {
//     const updatedFields = [...fields];
//     updatedFields[fieldIndex].value = value;
//     setFields(updatedFields);
//   };

//   // Helper to check if all values in an object (including nested) are empty
//   const isAllEmpty = (obj) => {
//     if (!obj) return true;
//     return Object.values(obj).every(
//       (v) =>
//         v === "" ||
//         v === undefined ||
//         v === null ||
//         (typeof v === "object" && isAllEmpty(v))
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const result = {};

//     fields.forEach((field) => {
//       // LOGIN PROCESS
//       if (field.type === "login") {
//         const loginObj = {
//           login_url: field.metadata?.login_url || "",
//           mail: field.metadata?.mail || "",
//           password: field.metadata?.password || "",
//           login_username: {
//             xpath: field.groups?.[0]?.xpath || "",
//             css_selector: field.groups?.[0]?.css_selector || "",
//           },
//           login_password: {
//             xpath: field.groups?.[1]?.xpath || "",
//             css_selector: field.groups?.[1]?.css_selector || "",
//           },
//           login_submit: {
//             xpath: field.groups?.[2]?.xpath || "",
//             css_selector: field.groups?.[2]?.css_selector || "",
//           },
//           ////
//           click_login_btn: {
//             xpath: field.groups?.[3]?.xpath || "",
//           },
//           login_email_box: {
//             xpath: field.groups?.[4]?.xpath || "",
//           },
//           clk_request_btn: {
//             xpath: field.groups?.[5]?.xpath || "",
//           },
//           ////
//         };
//         // Remove empty fields
//         Object.keys(loginObj).forEach(
//           (k) =>
//             (typeof loginObj[k] === "string"
//               ? loginObj[k] === ""
//               : isAllEmpty(loginObj[k])) && delete loginObj[k]
//         );
//         if (Object.keys(loginObj).length > 0) result["login_process"] = loginObj;
//       }

//       // REPORT URL
//       if (field.type === "reporturl" && field.value && field.value.trim() !== "") {
//         result["report_url"] = field.value;
//       }

//       // REMOVE POP
//       if (field.type === "remove_pop") {
//         const obj = {
//           xpath: field.xpath || "",
//           css_selector: field.css_selector || "",
//         };
//         if (!isAllEmpty(obj)) result["remove_pop"] = obj;
//       }

//       // CLICK DOWNLOAD BUTTON
//       if (field.type === "click_download_button") {
//         const obj = {
//           xpath: field.xpath || "",
//           css_selector_path: field.css_selector_path || "",
//         };
//         if (!isAllEmpty(obj)) result["click_download_button"] = obj;
//       }

//       // REPORT DOWNLOAD DATA
//       if (field.type === "report_download_data") {
//         const dropdowns = field.dropdowns
//           .map((dropdown) => {
//             // Only include dropdown if any field is filled
//             const click = {
//               xpath: dropdown.click.xpath,
//               css_selector_path: dropdown.click.css_selector_path,
//             };
//             const selector = {
//               xpath: dropdown.selector.xpath,
//               css_selector_path: dropdown.selector.css_selector_path,
//             };
//             // If all click and selector fields are empty, skip this dropdown
//             if (isAllEmpty(click) && isAllEmpty(selector)) return null;
//             return {
//               [dropdown.dropdownName]: {
//                 ...(isAllEmpty(click) ? {} : { click }),
//                 ...(isAllEmpty(selector) ? {} : { selector }),
//               },
//             };
//           })
//           .filter(Boolean);

//         // Range calendar
//         const range = {};
//         Object.entries(field.range_calender).forEach(([section, val]) => {
//           // For select_day, check td_element_selector too
//           if (
//             section === "select_day"
//               ? !isAllEmpty(val) ||
//                 (val.td_element_selector &&
//                   val.td_element_selector.trim() !== "")
//               : !isAllEmpty(val)
//           ) {
//             range[section] = { ...val };
//           }
//         });
//         if (Object.keys(range).length > 0) {
//           dropdowns.push({ range_calender: range });
//         }
//         if (dropdowns.length > 0) result["report_download_data"] = dropdowns;
//       }

//       // Simple value fields
//       if (
//         [
//           "sync_date_range",
//           "frequency",
//           "status",
//           "client_name",
//           "account_name",
//           "account_id",
//           "platform_id",
//           "report_type",
//           "segment",
//           "platform",
//           "media_type",
//         ].includes(field.type)
//       ) {
//         if (field.value && field.value.trim() !== "") {
//           result[field.type] = field.value;
//         }
//       }
//     });

//     // try {
//     //   const response = await fetch("http://localhost:3000/submit", {
//     //     method: "POST",
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //     },
//     //     body: JSON.stringify(result),
//     //   });
//     //   if (!response.ok) {
//     //     throw new Error(`HTTP error! status: ${response.status}`);
//     //   }
//     //   const data = await response.json();
//     //   console.log("Server Response:", data);
//     // } catch (error) {
//     //   console.error("Error occurred while submitting the form:", error);
//     // }
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
//             {field.type === "login" ? (
//               <>
//                 <div className="mb-4">
//                   <input
//                     type="text"
//                     placeholder="Login URL"
//                     value={field.metadata.login_url || ""}
//                     onChange={(e) =>
//                       handleLoginMetaChange(fieldIndex, "login_url", e.target.value)
//                     }
//                     className="border p-2 mb-2 w-full"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Email"
//                     value={field.metadata.mail || ""}
//                     onChange={(e) =>
//                       handleLoginMetaChange(fieldIndex, "mail", e.target.value)
//                     }
//                     className="border p-2 mb-2 w-full"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Password"
//                     value={field.metadata.password || ""}
//                     onChange={(e) =>
//                       handleLoginMetaChange(fieldIndex, "password", e.target.value)
//                     }
//                     className="border p-2 mb-2 w-full"
//                   />
//                 </div>
//                 {/* {field.groups.map((group, groupIndex) => (
//                   <div key={groupIndex} className="mb-6">
//                     <h4 className="font-bold capitalize">{group.groupName.replace("login_", "").replace("_", " ")}</h4>
//                     <input
//                       type="text"
//                       placeholder="Enter XPath"
//                       value={group.xpath || ""}
//                       onChange={(e) =>
//                         handleInputChange(fieldIndex, groupIndex, "xpath", e.target.value)
//                       }
//                       className="border p-2 mb-2 w-full"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Enter CSS Selector"
//                       value={group.css_selector || ""}
//                       onChange={(e) =>
//                         handleInputChange(fieldIndex, groupIndex, "css_selector", e.target.value)
//                       }
//                       className="border p-2 mb-2 w-full"
//                     />
//                   </div>
//                 ))} */}

//                 {/* //// */}
//                 {field.groups.map((group, groupIndex) => (
//   <div key={groupIndex} className="mb-6">
//     <h4 className="font-bold capitalize">
//       {group.groupName.replace("login_", "").replace("_", " ")}
//     </h4>
//     <input
//       type="text"
//       placeholder="Enter XPath"
//       value={group.xpath || ""}
//       onChange={(e) =>
//         handleInputChange(fieldIndex, groupIndex, "xpath", e.target.value)
//       }
//       className="border p-2 mb-2 w-full"
//     />
//     {/* Only show CSS Selector input for groups that have the css_selector property */}
//     {"css_selector" in group || "css_selector_path" in group ? (
//       <input
//         type="text"
//         placeholder="Enter CSS Selector"
//         value={group.css_selector || group.css_selector_path || ""}
//         onChange={(e) =>
//           handleInputChange(
//             fieldIndex,
//             groupIndex,
//             "css_selector" in group ? "css_selector" : "css_selector_path",
//             e.target.value
//           )
//         }
//         className="border p-2 mb-2 w-full"
//       />
//     ) : null}
//   </div>
// ))}
//                 {/* //// */}

//               </>
//             ) : field.type === "reporturl" ? (
//               <div className="mb-6">
//                 <input
//                   type="text"
//                   placeholder="Enter Report URL"
//                   value={field.value || ""}
//                   onChange={(e) =>
//                     handleReportUrlChange(fieldIndex, e.target.value)
//                   }
//                   className="border p-2 mb-2 w-full"
//                 />
//               </div>
//             ) : field.type === "remove_pop" ? (
//               <div className="mb-6">
//                 <input
//                   type="text"
//                   placeholder="Enter XPath"
//                   value={field.xpath || ""}
//                   onChange={(e) =>
//                     handleRemovePopChange(fieldIndex, "xpath", e.target.value)
//                   }
//                   className="border p-2 mb-2 w-full"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Enter CSS Selector"
//                   value={field.css_selector || ""}
//                   onChange={(e) =>
//                     handleRemovePopChange(fieldIndex, "css_selector", e.target.value)
//                   }
//                   className="border p-2 mb-2 w-full"
//                 />
//               </div>
//             ) : field.type === "click_download_button" ? (
//               <div className="mb-6">
//                 <input
//                   type="text"
//                   placeholder="Enter XPath"
//                   value={field.xpath || ""}
//                   onChange={(e) =>
//                     handleClickDownloadChange(fieldIndex, "xpath", e.target.value)
//                   }
//                   className="border p-2 mb-2 w-full"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Enter CSS Selector Path"
//                   value={field.css_selector_path || ""}
//                   onChange={(e) =>
//                     handleClickDownloadChange(fieldIndex, "css_selector_path", e.target.value)
//                   }
//                   className="border p-2 mb-2 w-full"
//                 />
//               </div>
//             ) : field.type === "report_download_data" ? (
//               <div>
//                 <h4 className="font-bold mb-2">Dropdowns</h4>
//                 {field.dropdowns.map((dropdown, dropdownIdx) => (
//                   <div key={dropdown.dropdownName} className="mb-4 border rounded p-2">
//                     <div className="font-semibold mb-1">{dropdown.dropdownName}</div>
//                     <div className="mb-2">
//                       <label className="block text-xs">Click XPath</label>
//                       <input
//                         type="text"
//                         placeholder="Click XPath"
//                         value={dropdown.click.xpath}
//                         onChange={(e) =>
//                           handleReportDownloadDropdownChange(fieldIndex, dropdownIdx, "click", "xpath", e.target.value)
//                         }
//                         className="border p-2 mb-1 w-full"
//                       />
//                       <label className="block text-xs">Click CSS Selector Path</label>
//                       <input
//                         type="text"
//                         placeholder="Click CSS Selector Path"
//                         value={dropdown.click.css_selector_path}
//                         onChange={(e) =>
//                           handleReportDownloadDropdownChange(fieldIndex, dropdownIdx, "click", "css_selector_path", e.target.value)
//                         }
//                         className="border p-2 mb-1 w-full"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs">Selector XPath</label>
//                       <input
//                         type="text"
//                         placeholder="Selector XPath"
//                         value={dropdown.selector.xpath}
//                         onChange={(e) =>
//                           handleReportDownloadDropdownChange(fieldIndex, dropdownIdx, "selector", "xpath", e.target.value)
//                         }
//                         className="border p-2 mb-1 w-full"
//                       />
//                       <label className="block text-xs">Selector CSS Selector Path</label>
//                       <input
//                         type="text"
//                         placeholder="Selector CSS Selector Path"
//                         value={dropdown.selector.css_selector_path}
//                         onChange={(e) =>
//                           handleReportDownloadDropdownChange(fieldIndex, dropdownIdx, "selector", "css_selector_path", e.target.value)
//                         }
//                         className="border p-2 mb-1 w-full"
//                       />
//                     </div>
//                   </div>
//                 ))}
//                 <h4 className="font-bold mb-2">Range Calendar</h4>
//                 {Object.entries(field.range_calender).map(([section, val]) => (
//                   <div key={section} className="mb-2">
//                     <div className="font-semibold">{section}</div>
//                     <input
//                       type="text"
//                       placeholder="XPath"
//                       value={val.xpath}
//                       onChange={(e) =>
//                         handleReportDownloadRangeChange(fieldIndex, section, "xpath", e.target.value)
//                       }
//                       className="border p-2 mb-1 w-full"
//                     />
//                     <input
//                       type="text"
//                       placeholder="CSS Selector Path"
//                       value={val.css_selector_path}
//                       onChange={(e) =>
//                         handleReportDownloadRangeChange(fieldIndex, section, "css_selector_path", e.target.value)
//                       }
//                       className="border p-2 mb-1 w-full"
//                     />
//                     {section === "select_day" && (
//                       <input
//                         type="text"
//                         placeholder="TD Element Selector"
//                         value={val.td_element_selector}
//                         onChange={(e) =>
//                           handleReportDownloadRangeTdSelectorChange(fieldIndex, e.target.value)
//                         }
//                         className="border p-2 mb-1 w-full"
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               (
//                 field.type === "sync_date_range" ||
//                 field.type === "frequency" ||
//                 field.type === "status" ||
//                 field.type === "client_name" ||
//                 field.type === "account_name" ||
//                 field.type === "account_id" ||
//                 field.type === "platform_id" ||
//                 field.type === "report_type" ||
//                 field.type === "segment" ||
//                 field.type === "platform" ||
//                 field.type === "media_type"
//               ) ? (
//                 <div className="mb-6">
//                   <input
//                     type="text"
//                     placeholder={`Enter ${field.type.replace(/_/g, " ")}`}
//                     value={field.value || ""}
//                     onChange={(e) =>
//                       handleSimpleValueChange(fieldIndex, e.target.value)
//                     }
//                     className="border p-2 mb-2 w-full"
//                   />
//                 </div>
//               ) : (
//                 field.groups &&
//                 field.groups.map((group, groupIndex) => (
//                   <div key={groupIndex} className="mb-6">
//                     <h4 className="font-bold capitalize">{group.groupName}</h4>
//                     <input
//                       type="text"
//                       placeholder="Enter XPath"
//                       value={group.xpath || ""}
//                       onChange={(e) =>
//                         handleInputChange(
//                           fieldIndex,
//                           groupIndex,
//                           "xpath",
//                           e.target.value
//                         )
//                       }
//                       className="border p-2 mb-2 w-full"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Enter CSS Selector Path"
//                       value={group.css_selector_path || ""}
//                       onChange={(e) =>
//                         handleInputChange(
//                           fieldIndex,
//                           groupIndex,
//                           "css_selector_path",
//                           e.target.value
//                         )
//                       }
//                       className="border p-2 mb-2 w-full"
//                     />
//                   </div>
//                 ))
//               )
//             )}
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


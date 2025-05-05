const convertToDDMMYYYY = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString); // Convert string to Date object
  if (isNaN(date.getTime())) return ""; // Handle invalid date

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
};

export const caseMapToViewList = (dataList) => {
  let result = [];
  if (dataList) {
    for (let data of dataList) {
      const date = new Date(data.created_at);
      let case_date = convertToDDMMYYYY(date);
      let jsonObj = {
        id: data.case_uid,
        name: data.name,
        description: data.description,
        case_date: case_date,
        requiredAmount: data.required_amount,
        amount_donated: data.total_amount_donated,
        ...data
      };
      result.push(jsonObj);
    }
  }
  return result;
};

export const caseMapToView = (data) => {
  if (!data) return null;

  const date = new Date(data.created_at);
  let case_date = convertToDDMMYYYY(date);

  return {
    id: data.case_uid,
    name: data.name,
    description: data.description,
    case_date: case_date,
    requiredAmount: data.required_amount,
    amount_donated: data.total_amount_donated,
    ...data
  };
};

export const caseLogMapToViewList = (dataList) => {
  if (!dataList) {
    return [];
  }

  return dataList.map((data) => {
    const date = new Date(data.created_at);

    // Get the date components
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    // Get the time components
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0:00) as 12:00 AM

    // Format the date and time
    const formattedDate = `${day} ${month}, ${year} ${hours}:${minutes < 10 ? "0" : ""
      }${minutes} ${ampm}`;

    return {
      id: data.case_uid,
      status: data.status,
      assignee: data.action_by?.user?.first_name + " " + data.action_by?.user?.last_name,
      remark: data.remark,
      createdAt: formattedDate,
    };
  });
};

export const caseTransactionsMapToViewList = (dataList) => {
  if (!dataList || !Array.isArray(dataList)) {
    return [];
  }

  return dataList.map((data) => {
    if (!data.donated_at) return null; // Skip if date is missing

    // Create a Date object from UTC time
    const date = new Date(data.donated_at);

    // Ensure valid date
    if (isNaN(date.getTime())) return null;

    // Extract UTC date components
    const day = date.getUTCDate();
    const month = date.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
    const year = date.getUTCFullYear();

    // Extract UTC time components
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    // Construct formatted date string in UTC
    const formattedDate = `${day} ${month}, ${year} ${hours}:${minutes} ${ampm}`;

    return {
      transaction_id: data.donation_reference_id || "N/A",
      amount_donated: data.amount_donated || 0,
      donated_by: data.donated_by?.user?.first_name + " " + data.donated_by?.user?.last_name || "Anonymous",
      donated_at: formattedDate,
      is_verified: data.is_verified,
    };
  }).filter(Boolean); // Remove null values
};

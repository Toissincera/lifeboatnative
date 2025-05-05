//to_view
//to_api

//portfolio service -> generic -> service-> mapper -> service -> mapper return data to view

export const memberMapToViewList = (dataList) => {
  let result = [];
  if (dataList) {
    for (let data of dataList) {
      let jsonObj = {
        id: data.member_uid,
        name: data.user.first_name + " " + data.user.last_name,
        ...data
      };
      result.push(jsonObj);
    }
  }
  return result;
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
      assignee: data.action_by.user.username,
      remark: data.remark,
      createdAt: formattedDate,
    };
  });
};

export const caseStatusOptionsMapToViewList = (dataList) => {
  if (!dataList) {
    return [];
  }

  return dataList.map((data) => {
    return {
      id: data.status,
      status: data.status,
      text: data.text,
    };
  });
};
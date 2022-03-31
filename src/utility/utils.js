/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem("userData");
export const getUserData = () => JSON.parse(localStorage.getItem("userData"));
//  export const getUserRole = () => 'student'
export const getUserRole = () =>
  JSON.parse(localStorage.getItem("userData")).role_name;
export const getAccessToken = () => JSON.parse(localStorage.getItem("token"));

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole) => {
  if (userRole === "tutor") return "/home";
  if (userRole === "student") return "/home";
  if (userRole === "admin") return "/home";
  if (userRole === "school-admin") return "/home";
  if (userRole === "school-student") return "/home";
  if (userRole === "school-tutor") return "/home";
  return "/login";
};

export const authHeader = () => {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("userData"));
  let token = JSON.parse(localStorage.getItem("token"));
  if (user && token) {
    return {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };
  } else {
    return { "Content-Type": "application/json" };
  }
};

export const getAllTeachingMode = () => [
  { id: "Online", name: "Online" },
  { id: "At Student Home", name: "At Student Home" },
  { id: "At Tutors Location", name: "At Tutors Location" },
];

export const getAllLanguages = () => [
  { id: "Hindi", name: "Hindi" },
  { id: "English", name: "English" },
  { id: "Tamil", name: "Tamil" },
  { id: "Telugu", name: "Telugu" },
  { id: "Kannad", name: "Kannad" },
  { id: "Malyalam", name: "Malyalam" },
];

export const getAllDays = () => [
  { id: "monday", name: "Monday" },
  { id: "tuesday", name: "Tuesday" },
  { id: "wednesday", name: "Wednesday" },
  { id: "thursday", name: "Thursday" },
  { id: "friday", name: "Friday" },
  { id: "saturday", name: "Saturday" },
  { id: "sunday", name: "Sunday" },
];

export const getAllDayForTimeTable = () => [
  { id: "monday", name: "Monday" },
  { id: "tuesday", name: "Tuesday" },
  { id: "wednesday", name: "Wednesday" },
  { id: "thursday", name: "Thursday" },
  { id: "friday", name: "Friday" },
  { id: "saturday", name: "Saturday" },
];
export const getAllRoles = () => [
  { id: "tutor", name: "Tutor" },
  { id: "student", name: "Student" },
  { id: "parent", name: "Parent" },
  { id: "school-admin", name: "School Admin" },
  { id: "school-tutor", name: "School Tutor" },
  { id: "school-student", name: "School Student" },
];

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (
  value,
  formatting = { month: "short", day: "numeric", year: "numeric" }
) => {
  if (!value) return value;
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value);
  let formatting = { month: "short", day: "numeric" };

  if (toTimeForCurrentDay) {
    formatting = { hour: "numeric", minute: "numeric" };
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

export const currencySymbole = () => "₹";

export const generateUniqueID = (length) => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const checkAccessPermission = (permissionForCheck) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  if (getUserData().role_name === "admin") return true;
  else return permissions.some((item) => permissionForCheck === item.name);
};

export const checkImpersonate = () => {
  const impersonateStatus = localStorage.getItem("impersonateStatus");
  return impersonateStatus;
};

export const checkImpersonateSchool = () => {
  const impersonateStatus = localStorage.getItem("impersonateStatusSchool");
  return impersonateStatus;
};

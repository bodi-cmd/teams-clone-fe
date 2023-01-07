export const emailValidator = new RegExp(
  "\\w+([\\.-]?\\w+)*@\\w+([\\.-]?w+)*(\\.\\w{2,3})"
);
export const phoneValidator = new RegExp(
  "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
);

export const passwordValidator = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
);
export const nameValidator = new RegExp(
  "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"
);

export default function(dueDate) {
    const date = dueDate;
    const beforeSplit = date.split('T');
    const splitted = beforeSplit[0].split('-')
    const newDate = splitted[1] + "/" + splitted[2] + "/" + splitted[0] + " " + beforeSplit[1];
    return newDate;
}


export const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
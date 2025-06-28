export function maskMobile(number) {
    return number.replace(/^(\d{2})(\d{2})\d{4}(\d{2})$/, "$1****$3");
  }
  
  export function maskName(name) {
    if (!name) return "*****";
    return name[0] + "*".repeat(Math.max(1, name.length - 2)) + name[name.length - 1];
  }
export class Validator {
  static required(value: any) {
    if (typeof value === 'string') {
      return value.length > 0;
    }
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return !!value;
  }

  static compare(value1: any, value2: any) {
    if (!value1 || !value2) return false;
    return value1 === value2;
  }
}

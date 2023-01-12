type Week = "월" | "화" | "수" | "목" | "금" | "토" | "일";
type Schedule = {
  [key in Week]: `${number}년_${number}월_${number}일`;
};

function TryCatch() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target, propertyKey, descriptor);
    console.log(descriptor.value());
  };
}

export default class CalendarUtil {
  static getCalendarWeeks(str: string[]): Week[] {
    return [];
  }

  @TryCatch()
  static getCalendarSchedule(): Schedule[] {
    console.log(456);
    return [];
  }

  constructor(type: Week, desc: string) {}
}

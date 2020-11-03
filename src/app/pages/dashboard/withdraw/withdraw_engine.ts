
// Growth Bonus and Principal: Mon to Fri [4pm - 7pm]
// Level and Speed Bonus: Sunday [24hrs available]

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export class WithdrawEngine {
  public static growthAndPrincipalWorkingHours(date: Date) {
    const day = DAYS[date.getDay()];
    if ('Saturday' === day || 'Sunday' === day) {
      return true;
    } else {
      const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      const time: number = +(date.getHours().toString() + minutes);
      if (time >= 1600 && time <= 1900) { return false; }
      else { return true; }
    }
  }

  public static speedAndLevelBonusWorkingHours(date: Date) {
    const day = DAYS[date.getDay()];
    return day === 'Sunday' ? false : true;
  }
}

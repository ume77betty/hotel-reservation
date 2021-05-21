import prev from '../../../assets/img/icons/prev.svg';
import next from '../../../assets/img/icons/next.svg';
import { CALENDER_MONTHS } from './helper';

const Calendar = ({
  handleSelectDateRange,
  handlePrevMonth,
  handleNextMonth,
  thisYear,
  thisMonth,
  renderDays,
  renderDays2,
  prevMonthday,
  day,
  nextMonthYear,
  nextMonth,
  nextMonthPrevMonthday,
  nextMonthDay,
  reserveDuplicate
}) => {


  return (
    <div className="room-empty">
      <div className="room-empty-header">
        <h1>空房狀態查詢</h1>
        <h2 className={reserveDuplicate ? "reserve-duplicate" : "non-duplicate"}>您所選擇的日期中間已無空房</h2>
      </div>
      <div className="whole-calendar">
        <div className="calendar-wrapper">
          <div className="calendar-header">
            <div className="prev-icon" style={{ backgroundImage: `url(${prev})` }} onClick={handlePrevMonth}></div>
            <div className="calendar-month-year">
              {CALENDER_MONTHS[thisMonth - 1]} {thisYear}
            </div>
          </div>
          <div className="calendar-body" onClick={handleSelectDateRange}>
            {renderDays}
            {prevMonthday}
            {day}
          </div>
        </div>
        <div className="calendar-wrapper">
          <div className="calendar-header">
            <div className="calendar-month-year">
              {CALENDER_MONTHS[nextMonth - 1]} {nextMonthYear}
            </div>
            <div className="next-icon" style={{ backgroundImage: `url(${next})` }} onClick={handleNextMonth}></div>
          </div>
          <div className="calendar-body" onClick={handleSelectDateRange}>
            {renderDays2}
            {nextMonthPrevMonthday}
            {nextMonthDay}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
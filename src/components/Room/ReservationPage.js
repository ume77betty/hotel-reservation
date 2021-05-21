import CancelBtn from '../../assets/img/icons/cancel.png';
import { useEffect } from 'react';
import { WEEK_DAYS, CALENDER_MONTHS } from './Calendar/helper';
import prev from '../../assets/img/icons/prev.svg';
import next from '../../assets/img/icons/next.svg';


const ReservationPage = ({
  roomName,
  roomShortDescription,
  roomPrice,
  available,
  checkInTime,
  checkOutTime,
  showReservationPage,
  closeReservationPage,
  showStartSC,
  showEndSC,
  toggleStartSC,
  toggleEndSC,
  showDialog,
  zeroPad,
  getDateISO,
  minDate,
  maxDate,
  selectEndDate,
  selectStartDate,
  totalAmountCount,
  weekDayNight,
  holidayNight,
  totalPrice,
  monthDays,
  monthFirstDay,
  thisMonth,
  thisYear,
  handleSCNextMonth,
  handleSCPrevMonth,
  handleSCEnd,
  handleSCStart,
  handleNameInput,
  handleTelInput,
  handleBookRoom,
  reserved,
  reserveDuplicate,
  success,
  failure,
}) => {

  useEffect(() => {
    totalAmountCount();
  }, [selectStartDate, selectEndDate, showStartSC, showEndSC, totalAmountCount])

  const availableMap = available.map((amenity) => {
    if (amenity.isAvailable === true) {
      return (
        <div key={amenity.iconName + 1}>
          <div className="right-icon" style={{
            backgroundImage: `url(${amenity.url})`
          }}></div>
          <p>{amenity.iconName}</p>

        </div>
      )
    }
  });

  //map出一到日
  const renderSCDays = Object.entries(WEEK_DAYS).map((day, index) => {
    return (
      <div className="SC-days-of-week" key={index}>{day[1]}</div>
    )
  });
  const renderSCDays2 = Object.entries(WEEK_DAYS).map((day, index) => {
    return (
      <div className="SC-days-of-week" key={index * 4}>{day[1]}</div>
    )
  });

  //render出日期
  let Startday = [];
  let startPrevMonthday = [];
  const renderSCStart = () => {
    let zeroPadMonth = zeroPad(thisMonth, 2);
    for (let j = 0; j < monthFirstDay; j++) {
      startPrevMonthday.push(<div className="SC-non-date" key={thisYear + thisMonth + j + 3}></div>)
    }
    for (let i = 1; i <= monthDays; i++) {
      let zeroPadDay = zeroPad(i, 2);
      let title = `${thisYear}-${zeroPadMonth}-${zeroPadDay}`;
      Startday.push(<div key={Math.random()} className={
        title >= getDateISO(minDate) && getDateISO(maxDate) >= title && selectStartDate === title ? 'SC-select-start-date-bg'
          : title >= getDateISO(minDate) && getDateISO(maxDate) >= title && selectEndDate === title ? 'SC-select-end-date-bg'
            : null}>
        <div
          className={
            title >= getDateISO(minDate) && getDateISO(maxDate) >= title && selectStartDate === title ? 'SC-select-start-date'
              : title >= getDateISO(minDate) && getDateISO(maxDate) >= title && selectEndDate === title ? 'SC-select-end-date'
                : title >= getDateISO(minDate) && getDateISO(maxDate) >= title && reserved.includes(title) ? 'SC-disable-date'
                  : title >= getDateISO(minDate) && getDateISO(maxDate) >= title ? 'SC-date'
                    : 'SC-disable-date'
          }
          title={title}
          key={thisMonth + i + 3}>
          {i}
        </div>
      </div>);
    }
  };
  renderSCStart();

  //render出日期
  let Endday = [];
  let endPrevMonthday = [];
  const renderSCEnd = () => {
    let zeroPadMonth = zeroPad(thisMonth, 2);
    for (let j = 0; j < monthFirstDay; j++) {
      endPrevMonthday.push(<div className="SC-non-date" key={thisYear + thisMonth + j + 1}></div>)
    }
    for (let i = 1; i <= monthDays; i++) {
      let zeroPadDay = zeroPad(i, 2);
      let title = `${thisYear}-${zeroPadMonth}-${zeroPadDay}`;
      Endday.push(<div key={Math.random()} className={
        title >= getDateISO(minDate) && getDateISO(maxDate) >= title && selectStartDate === title ? 'SC-select-start-date-bg'
          : title >= getDateISO(minDate) && getDateISO(maxDate) >= title && selectEndDate === title ? 'SC-select-end-date-bg'
            : null}>
        <div
          className={
            title >= getDateISO(minDate) && getDateISO(maxDate) >= title && selectStartDate === title ? 'SC-select-start-date'
              : title >= getDateISO(minDate) && getDateISO(maxDate) >= title && selectEndDate === title ? 'SC-select-end-date'
                : title >= getDateISO(minDate) && getDateISO(maxDate) >= title && reserved.includes(title) ? 'SC-disable-date'
                  : title >= getDateISO(minDate) && getDateISO(maxDate) >= title ? 'SC-date'
                    : 'SC-disable-date'
          }
          title={title}
          key={thisMonth + i + 1}>
          {i}
        </div>
      </div >);
    }
  };
  renderSCEnd();





  return (
    <div className="dialog-bg" style={showDialog ? { visibility: `visible` } : { visibility: `hidden` }}>
      <div className="dialog-container">
        <img src={CancelBtn} className="cancel-btn" onClick={closeReservationPage} alt=""></img>
        <form className="reservation-form">
          <label htmlFor="name-input" className="name-input">姓名</label>
          <input required name="name" placeholder="請輸入您的姓名" id="name-input" className="name" autoComplete="off" onChange={handleNameInput}></input>
          <label htmlFor="phone-input" className="phone-input">手機號碼</label>
          <input required type="tel" name="tel" placeholder="請輸入您的手機號碼" id="phone-input" className="tel" autoComplete="off" onChange={handleTelInput}></input>
          <label htmlFor="check-in-input" className="check-in-input">入住日期</label>
          <div className="check-in-picker" onClick={toggleStartSC}>{selectStartDate}
            <div className="picker">
            </div>
            <div className="small-calendar" style={showStartSC ? { visibility: `visible` } : { visibility: `hidden` }}>
              <div className="SC-header">
                <div className="prev-icon" style={{ backgroundImage: `url(${prev})` }} onClick={handleSCPrevMonth}></div>
                <div className="SC-month-and-year">{CALENDER_MONTHS[thisMonth - 1]} {thisYear}</div>
                <div className="next-icon" style={{ backgroundImage: `url(${next})` }} onClick={handleSCNextMonth}></div>
              </div>
              <div className="SC-body" onClick={handleSCStart}>
                {renderSCDays}
                {startPrevMonthday}
                {Startday}
              </div>
            </div>
          </div>
          <label htmlFor="check-out-input" className="check-out-input">退房日期</label>
          <div className="check-out-picker" onClick={toggleEndSC}>{selectEndDate}
            <div className="picker">
            </div>
            <div className="small-calendar" style={showEndSC ? { visibility: `visible` } : { visibility: `hidden` }}>
              <div className="SC-header">
                <div className="prev-icon" style={{ backgroundImage: `url(${prev})` }} onClick={handleSCPrevMonth}></div>
                <div className="SC-month-and-year">{CALENDER_MONTHS[thisMonth - 1]} {thisYear}</div>
                <div className="next-icon" style={{ backgroundImage: `url(${next})` }} onClick={handleSCNextMonth}></div>
              </div>
              <div className="SC-body" onClick={handleSCEnd}>
                {renderSCDays2}
                {endPrevMonthday}
                {Endday}
              </div>
            </div>
          </div>
          <div className="day-count">{weekDayNight + holidayNight + 1}天，
          {weekDayNight === 0 ? `${holidayNight}晚假日` :
              holidayNight === 0 ? `${weekDayNight}晚平日`
                : `${weekDayNight}晚平日，${holidayNight}晚假日`}</div>
          <div style={reserveDuplicate ? { display: `block` } : { display: `none` }}>您所選擇的日期中間已無空房</div>
          <div className="total">
            <div>總計</div>
            <div className="money-total">${totalPrice}</div>
          </div>
          <button className="confirm-btn" type="submit" onClick={handleBookRoom}>確認送出</button>
          <div className="notice">此預約系統僅預約功能，並不會對您進行收費</div>
        </form>
        <div className="dialog-right">
          <div className="right-title">{roomName}</div>
          <div className="right-short-description">{roomShortDescription}</div>
          <div className="right-price">{roomPrice}</div>
          <div className="right-available">{availableMap}</div>
          <div className="reservation-info-title">訂房資訊</div>
          <div className="reservation-info">
            <ul>
              <li>
                {checkInTime}；{checkOutTime}，請自行確認行程安排。
              </li>
              <li>平日定義週一至週四；假日定義週五至週日及國定假日。</li>
              <li>好室旅店全面禁止吸菸。</li>
              <li>
                若您有任何問題，歡迎撥打 03-8321155 ( 服務時間 週一至週六 10:00
                - 18:00 )。
              </li>
            </ul>
          </div>
          <div className="reservation-flow-title">預約流程</div>
          <div className="reservation-flow">
            <div className="step-1">
              <div className="step-1-logo"></div>
              <span>送出線上預約單</span>
            </div>
            <div className="step-arrow"></div>
            <div className="step-2">
              <div className="step-2-logo"></div>
              <span>系統立即回覆是否預訂成功<br />並以簡訊發送訂房通知<br />(若未收到簡訊請來電確認)</span>
            </div>
            <div className="step-arrow"></div>
            <div className="step-3">
              <div className="step-3-logo"></div>
              <span>入住當日憑訂房通知<br />以現金或刷卡付款即可<br />(僅接受VISA.JCB.銀聯卡)</span>
            </div>
          </div>
        </div>
        <div className={success ? "success" : "default"}>
          <div className="cancel-white" onClick={closeReservationPage}></div>
          <div className="success-icon"></div>
          <h1>預約成功</h1>
          <h2>請留意簡訊發送訂房通知，入住當日務必出示此訂房通知，</h2>
          <h2>若未收到簡訊請來電確認，謝謝您</h2>
        </div>
        <div className={failure ? "failure" : "default"}>
          <div className="cancel-white" onClick={closeReservationPage}></div>
          <div className="failure-icon"></div>
          <h1>預約失敗</h1>
          <h2>哎呀！晚了一步！您預約的日期已經被預約走了，</h2>
          <h2>再看看其它房型吧</h2>
        </div>
      </div>
    </div >
  );
};

export default ReservationPage;
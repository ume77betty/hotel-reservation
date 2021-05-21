import Breakfast from '../../assets/img/icons/breakfast.svg';
import MiniBar from '../../assets/img/icons/mini-bar.svg';
import RoomService from '../../assets/img/icons/room-service.svg';
import Wifi from '../../assets/img/icons/wifi.svg';
import KidsFit from '../../assets/img/icons/children.svg';
import Telephone from '../../assets/img/icons/telephone.svg';
import Refrig from '../../assets/img/icons/refrig.svg';
import Sofa from '../../assets/img/icons/sofa.svg';
import Pet from '../../assets/img/icons/pet.svg';
import NonSmoking from '../../assets/img/icons/non-smoking.svg';
import AirCon from '../../assets/img/icons/air-con.svg';
import View from '../../assets/img/icons/view.svg';
import '../../Room-card.css';
import { getRoomById, bookRoom, deleteBooking } from '../../API';
import { useEffect, useState } from 'react';
import RoomAmenity from './RoomAmenity';
import RoomSlider from './RoomSlider';
import Calendar from './Calendar/Calendar';
import ReservationPage from './ReservationPage';
import { useParams } from 'react-router-dom';
import { WEEK_DAYS, getDateISO, zeroPad } from './Calendar/helper';


const RoomCard = () => {

  let { id } = useParams();


  const [loading, setLoading] = useState(true);
  //房間基本資訊
  const [roomName, setRoomName] = useState('');
  const [roomShortDescription, setRoomShortDescription] = useState('');
  const [roomPrice, setRoomPrice] = useState('');
  const [holidayRoomPrice, setHolidayRoomPrice] = useState('');
  const [normalDayRoomPrice, setNormalDayRoomPrice] = useState('');
  //預約頁面相關
  const [totalPrice, setTotalPrice] = useState('');
  const [weekDayNight, setWeekDayNight] = useState('');
  const [holidayNight, setHolidayNight] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [descriptionList, setDiscriptionList] = useState([]);
  const [roomImgs, setRoomImgs] = useState([]);
  const [roomAmenitiesAvailable, setRoomAmenitiesAvailable] = useState('');
  const [available, setAvailable] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showStartSC, setShowStartSC] = useState(false);
  const [showEndSC, setShowEndSC] = useState(false);
  //日曆相關
  const [today] = useState(new Date());
  const [thisMonth, setThisMonth] = useState(today.getMonth() + 1);
  const [thisYear, setThisYear] = useState(today.getFullYear());
  const [nextMonth, setNextMonth] = useState(today.getMonth() + 2);
  const [nextMonthYear, setNextMonthYear] = useState(today.getFullYear());
  const [selectStartDate, setSelectStartDate] = useState('');
  const [selectEndDate, setSelectEndDate] = useState('');
  const [selectDateRange, setSelectDateRange] = useState([]);
  //預約相關
  const [nameInput, setNameInput] = useState('');
  const [telInput, setTelInput] = useState('');
  const [reserved, setReserved] = useState([]);
  const [reserveDuplicate, setReserveDuplicate] = useState(false);
  const [success, setSuccess] = useState();
  const [failure, setFailure] = useState();


  useEffect(() => {
    getRoomData();
    totalAmountCount();
    getAllDates();
  }, [selectStartDate, selectEndDate, totalPrice]);



  const loadingPage = () => {
    setLoading(false);
  };
  setTimeout(loadingPage, 2000);

  const getRoomData = async () => {

    const roomData = await getRoomById(`${id}`);

    //取得已預約日期
    let temparr = [];
    for (let i = 0; i < roomData.booking.length; i++) {
      temparr.push(roomData.booking[i].date);
      const result = temparr.filter(function (element, index, arr) {
        return arr.indexOf(element) === index;
      })
      for (let i = 0; i < result.length - 1; i++) {
        const difference = (Math.abs(new Date(result[i + 1])) - (new Date(result[i]))) / (1000 * 3600 * 24);
        if (difference === 2) {
          result.push(getDateISO(new Date(parseInt(new Date(result[i]).getTime() + 24 * 60 * 60 * 1000))));
        }
      }
      setReserved(result);
    };

    //設定開始與結束日期的預設值
    let tempStart = [];
    if (reserved.length === 0 && selectStartDate === '') {
      setSelectStartDate(getDateISO(new Date(parseInt(today.getTime() + 24 * 60 * 60 * 1000))));
      setSelectEndDate(getDateISO(new Date(parseInt(today.getTime() + 2 * 24 * 60 * 60 * 1000))));
    }
    else if (reserved.length !== 0) {
      for (let i = 0; i < reserved.length - 1; i++) {
        const difference = (Math.abs(new Date(reserved[i + 1]) - new Date(reserved[i]))) / (1000 * 3600 * 24);
        if (difference > 2 && selectStartDate === '') {
          tempStart.push(reserved[i]);
          setSelectStartDate(getDateISO(new Date(parseInt(new Date(tempStart[0]).getTime() + 24 * 60 * 60 * 1000))));
          setSelectEndDate(getDateISO(new Date(parseInt(new Date(tempStart[0]).getTime() + 2 * 24 * 60 * 60 * 1000))));
        }
      }
    }

    //房間名稱
    setRoomName(roomData.room[0].name);

    //取得房間基本資訊並設定右上方基本描述
    let {
      Bed: bedList,
      GuestMin,
      GuestMax,
      'Private-Bath': bathNum,
      Footage
    } = roomData.room[0].descriptionShort;
    //人數上限
    const guestNum = GuestMin === GuestMax ? `${GuestMax}人` : `${GuestMin}~${GuestMax}人`;
    //床鋪
    let bedTrans;
    switch (bedList[0]) {
      case 'Single':
        bedTrans = '單人床';
        break;
      case 'Small Double':
        bedTrans = '小型雙人床';
        break;
      case 'Double':
        bedTrans = '雙人床';
        break;
      case 'Queen':
        bedTrans = '大型雙人床';
        break;
      default:
        console.log('error');
    };
    //設定房間基本描述
    setRoomShortDescription(`${guestNum}・${bedTrans}・附早餐・衛浴${bathNum}間・${Footage}平方公尺`);

    //房間價格
    const normalPrice = roomData.room[0].normalDayPrice;
    const holidayPrice = roomData.room[0].holidayPrice;
    setNormalDayRoomPrice(normalPrice);
    setHolidayRoomPrice(holidayPrice);
    setRoomPrice(`平日（一～四）價格：${normalPrice} / 假日（五～日）價格：${holidayPrice}`)

    //check in & check out
    const checkInEarly = roomData.room[0].checkInAndOut.checkInEarly;
    const checkInLate = roomData.room[0].checkInAndOut.checkInLate;
    const checkOut = roomData.room[0].checkInAndOut.checkOut;
    setCheckInTime(`入住時間：${checkInEarly}（最早） / ${checkInLate}（最晚）`);
    setCheckOutTime(`退房時間：${checkOut}`);

    //房間詳細描述
    const description = roomData.room[0].description;
    let list = description.split('. ');
    setDiscriptionList(() => {
      return (
        list.map((sentence, index) => {
          if (index !== list.length - 1) {
            return sentence + '.';
          }
          return sentence;
        })
      )
    });

    //取得各房間照片網址
    const roomImgUrls = roomData.room[0].imageUrl;
    setRoomImgs(roomImgUrls);

    const amenitiesAvailable = roomData.room[0].amenities;
    setRoomAmenitiesAvailable(amenitiesAvailable);

  }

  const showRoomAmenities = [
    {
      icon: 'Breakfast',
      iconName: '早餐',
      url: Breakfast
    },
    {
      icon: 'Mini-Bar',
      iconName: 'Mini Bar',
      url: MiniBar
    },
    {
      icon: 'Room-Service',
      iconName: 'Room Service',
      url: RoomService
    },
    {
      icon: 'Wi-Fi',
      iconName: 'Wifi',
      url: Wifi
    },
    {
      icon: 'Child-Friendly',
      iconName: '適合兒童',
      url: KidsFit
    },
    {
      icon: 'Television',
      iconName: '電話',
      url: Telephone
    },
    {
      icon: 'Great-View',
      iconName: '漂亮的視野',
      url: View
    },
    {
      icon: 'Refrigerator',
      iconName: '冰箱',
      url: Refrig
    },
    {
      icon: 'Sofa',
      iconName: '沙發',
      url: Sofa
    },
    {
      icon: 'Pet-Friendly',
      iconName: '攜帶寵物',
      url: Pet
    },
    {
      icon: 'Smoke-Free',
      iconName: '全面禁菸',
      url: NonSmoking
    },
    {
      icon: 'Air-Conditioner',
      iconName: '空調',
      url: AirCon
    }
  ];


  //創建新的陣列以取得房間設施與可使用項目
  const newArr = Object.entries(roomAmenitiesAvailable);
  for (let i = 0; i < newArr.length; i++) {
    for (let j = 0; j < showRoomAmenities.length; j++) {
      if (newArr[i][0] === showRoomAmenities[j].icon) {
        const obj = {
          amenityName: showRoomAmenities[j].icon,
          iconName: showRoomAmenities[j].iconName,
          url: showRoomAmenities[j].url,
          isAvailable: newArr[i][1]
        };
        if (available.length === 0) { //為了讓房內設施不會重複map
          setAvailable((prevAvailable) => [
            ...prevAvailable,
            obj
          ]);
        }
      }
    }
  };

  //開啟預約頁面
  const showReservationPage = () => {
    setShowDialog((prev) => !prev);
  };

  //關閉預約頁面
  const closeReservationPage = () => {
    setShowDialog((prev) => !prev);
    setShowStartSC();
    setSuccess();
    setFailure();
  };


  //開關小日曆
  const toggleStartSC = (e) => {
    const title = e.target.className;
    if (title !== 'prev-icon' && title !== 'next-icon') {
      setShowStartSC(prev => !prev);
    }
  };

  const toggleEndSC = (e) => {
    const title = e.target.className;
    if (title !== 'prev-icon' && title !== 'next-icon') {
      setShowEndSC(prev => !prev);
    }
  };


  //預約
  const handleSelectDateRange = (e) => {
    let title = e.target.title;
    const selectStandard = title >= getDateISO(minDate) && getDateISO(maxDate) >= title;
    if (selectStandard && !selectStartDate && !selectEndDate) {
      handleSelectStartDate(title);
      handleSCStart(e);
    } else if (selectStandard && selectStartDate && !selectEndDate) {
      handleSelectEndDate(title);
      handleSCEnd(e);
    } else if (selectStandard && selectStartDate && selectEndDate) {
      handleSelectStartDate(title);
      handleSCStart(e);
      setSelectEndDate('');
    }
  };

  //選擇預約開始日期
  const handleSelectStartDate = (title) => {
    setSelectStartDate(title);
    if (showStartSC) {
      toggleStartSC();
    }
  };

  //選擇預約結束日期
  const handleSelectEndDate = (title) => {
    if (title > selectStartDate) { //如果選擇結束的日期比開始日期晚
      setSelectEndDate(title);
      if (showEndSC) {
        toggleEndSC();
      }
    } else if (selectStartDate > title) { //如果選擇結束的日期比開始日期晚
      setSelectEndDate(selectStartDate); //將開始日期設為結束日期
      setSelectStartDate(title); //將所選日期設為開始日期
      if (showEndSC) {
        toggleEndSC();
      }
    }
  };

  //小日曆選擇開始日期
  const handleSCStart = (e) => {
    const title = e.target.title;
    if (title >= selectEndDate) { //如果選擇開始的日期比結束日期晚
      setSelectStartDate(title);
      setSelectEndDate('');
    } else if (selectEndDate > title) { //如果選擇開始的日期比結束日期早
      setSelectStartDate(title); //將所選日期設為開始日期
    }
  }

  //小日曆選擇結束日期
  const handleSCEnd = (e) => {
    const title = e.target.title;
    if (title > selectStartDate) { //如果選擇結束的日期比開始日期晚
      setSelectEndDate(title);
    } else if (selectStartDate >= title) { //如果選擇結束的日期比開始日期晚
      setSelectEndDate(selectStartDate); //將開始日期設為結束日期
      setSelectStartDate(title); //將所選日期設為開始日期
    }
  }



  //取得開始到結束日期中間的所有日期
  const getAllDates = () => {
    if (selectStartDate && selectEndDate) {
      let start = selectStartDate.split('-');
      let end = selectEndDate.split('-');
      let UTCstart = new Date();
      UTCstart.setUTCFullYear(start[0], start[1] - 1, start[2]);
      let UTCend = new Date();
      UTCend.setUTCFullYear(end[0], end[1] - 1, end[2]);
      let getUTCstart = UTCstart.getTime();
      let getUTCend = UTCend.getTime();
      let arr = [];
      for (let k = getUTCstart; k <= getUTCend;) {
        arr.push(getDateISO(new Date(parseInt(k))));
        k = k + 24 * 60 * 60 * 1000;
      }
      let duplicate = [];
      const standard = (day) => day === -1;
      for (let i = 0; i < reserved.length; i++) {
        duplicate.push(arr.indexOf(reserved[i]));
        if (duplicate.every(standard)) {
          setReserveDuplicate(false)
        } else {
          setReserveDuplicate(true)
        }
      }
      setSelectDateRange(arr);
    }
  };


  //計算預約日期的總價
  const totalAmountCount = () => {
    let totalAmount = '';
    let holiday = [];
    let weekday = [];
    for (let i = 0; i < selectDateRange.length; i++) {
      let reservationDate = new Date(selectDateRange[i]).getDay();
      if (reservationDate >= 1 && 5 > reservationDate) {
        weekday.push(i);
      } else {
        holiday.push(i);
      }
    }
    if (holiday.length >= 0 && weekday.length >= 0) {
      if (holiday.length === 0) {
        totalAmount = normalDayRoomPrice * (weekday.length - 1);
        setWeekDayNight(weekday.length - 1);
        setHolidayNight(0);
        setTotalPrice(totalAmount);
      } else if (holiday.length === 1) {
        totalAmount = normalDayRoomPrice * (weekday.length);
        setWeekDayNight(weekday.length);
        setHolidayNight(0);
        setTotalPrice(totalAmount);
      } else if (holiday.length === 2 || 4) {
        totalAmount = holidayRoomPrice * (holiday.length - 1) + normalDayRoomPrice * (weekday.length);
        setHolidayNight(holiday.length - 1);
        setWeekDayNight(weekday.length);
        setTotalPrice(totalAmount);
      } else if (holiday.length === 3 || 6) {
        totalAmount = holidayRoomPrice * (holiday.length - 1) + normalDayRoomPrice * (weekday.length);
        setHolidayNight(holiday.length - 1);
        setWeekDayNight(weekday.length);
        setTotalPrice(totalAmount);
      }
    };
  }

  //預約只能從今天開始算起90天內
  const minDate = new Date(parseInt(today.getTime() + 24 * 60 * 60 * 1000));
  minDate.setHours(0);
  minDate.setMinutes(0);
  minDate.setSeconds(0);
  minDate.setMilliseconds(0);

  const maxDate = new Date(minDate.getTime());
  maxDate.setDate(maxDate.getDate() + 90);


  //以下為日曆

  //取得當月天數
  const getMonthDays = (month = thisMonth, year = thisYear) => {
    const month30Days = [4, 6, 9, 11];
    const leapYear =
      (year % 4 === 0 && year % 100 !== 0) || (year % 4 === 0 && year % 100 === 0 && year % 400 === 0);
    if (month30Days.includes(month)) {
      return 30;
    } if (month === 2) {
      return leapYear ? 29 : 28;
    } else if (!month30Days.includes(month)) {
      return 31;
    }
  };

  //一個月的第一天是禮拜幾
  const getMonthFirstDay = (month = thisMonth, year = thisYear) => {
    return +new Date(`${year}-${zeroPad(month, 2)}-01`).getDay();
  };


  const monthDays = getMonthDays();
  const monthFirstDay = getMonthFirstDay();


  //map出禮拜一到日
  const renderDays = Object.entries(WEEK_DAYS).map((day, index) => {
    return (
      <div className="days-of-week" key={index * 2}>{day[1]}</div>
    )
  });
  const renderDays2 = Object.entries(WEEK_DAYS).map((day, index) => {
    return (
      <div className="days-of-week" key={index * 3}>{day[1]}</div>
    )
  });


  //render出日期
  let day = [];
  let prevMonthday = [];
  const renderCalendar = () => {
    let zeroPadMonth = zeroPad(thisMonth, 2);
    for (let j = 0; j < monthFirstDay; j++) {
      prevMonthday.push(<div className="non-date" key={thisYear + thisMonth + j + 2}></div>)
    }
    for (let i = 1; i <= monthDays; i++) {
      let zeroPadDay = zeroPad(i, 2);
      let title = `${thisYear}-${zeroPadMonth}-${zeroPadDay}`;
      day.push(<div key={Math.random()} className={
        title >= getDateISO(minDate) && getDateISO(maxDate) >= title && selectStartDate === title ? 'select-start-date-bg'
          : title >= getDateISO(minDate) && getDateISO(maxDate) >= title && selectEndDate === title ? 'select-end-date-bg'
            : null}>
        <div
          className={
            title >= getDateISO(minDate) && getDateISO(maxDate) >= title && selectStartDate === title ? 'select-start-date'
              : title >= getDateISO(minDate) && getDateISO(maxDate) >= title && selectEndDate === title ? 'select-end-date'
                : title >= getDateISO(minDate) && getDateISO(maxDate) >= title && reserved.includes(title) ? 'disable-date'
                  : title >= getDateISO(minDate) && getDateISO(maxDate) >= title ? 'date'
                    : 'disable-date'
          }
          title={title}
          key={thisMonth + i}>
          {i}
        </div>
      </div>);
    }
  };
  renderCalendar();

  //下個月的日期
  let nextMonthDay = [];
  let nextMonthPrevMonthday = [];
  const renderNextCalendar = (month = nextMonth, year = nextMonthYear) => {
    let zeroPadMonth = zeroPad(nextMonth, 2);
    for (let j = 0; j < getMonthFirstDay(month, year); j++) {
      nextMonthPrevMonthday.push(<div className="non-date" key={nextMonthYear + nextMonth + j + 1}></div>)
    }
    for (let i = 1; i <= getMonthDays(month, year); i++) {
      let zeroPadDay = zeroPad(i, 2);
      let title = `${nextMonthYear}-${zeroPadMonth}-${zeroPadDay}`;
      nextMonthDay.push(<div key={Math.random()} className={
        title >= getDateISO(minDate) && getDateISO(maxDate) >= title && selectStartDate === title ? 'select-start-date-bg'
          : title >= getDateISO(minDate) && getDateISO(maxDate) >= title && selectEndDate === title ? 'select-end-date-bg'
            : null}>
        <div
          className={
            title >= getDateISO(minDate) && getDateISO(maxDate) >= title && selectStartDate === title ? 'select-start-date'
              : title >= getDateISO(minDate) && getDateISO(maxDate) >= title && selectEndDate === title ? 'select-end-date'
                : title >= getDateISO(minDate) && getDateISO(maxDate) >= title && reserved.includes(title) ? 'disable-date'
                  : title >= getDateISO(minDate) && getDateISO(maxDate) >= title ? 'date'
                    : 'disable-date'
          }
          title={title}
          key={nextMonth + i + 1}>
          {i}
        </div>
      </div>);
    }
  };
  renderNextCalendar();

  //按下往上個月按鈕
  const handlePrevMonth = () => {
    if (12 > thisMonth && thisMonth > 1) {
      setThisMonth(prev => prev - 1);
      setNextMonth(prev => prev - 1);
    } else if (thisMonth === 1) {
      setThisMonth(prev => prev = 12);
      setNextMonth(prev => prev - 1);
      setThisYear(prev => prev - 1);
    } else if (thisMonth === 12) {
      setThisMonth(prev => prev - 1);
      setNextMonth(prev => prev = 12);
      setNextMonthYear(prev => prev - 1);
    }
  };

  //按下往下個月按鈕
  const handleNextMonth = () => {
    if (11 > thisMonth && thisMonth > 0) {
      setThisMonth(prev => prev + 1);
      setNextMonth(prev => prev + 1);
    } else if (thisMonth === 11) {
      setThisMonth(prev => prev + 1);
      setNextMonth(prev => prev = 1);
      setNextMonthYear(prev => prev + 1);
    } else if (thisMonth === 12) {
      setThisMonth(prev => prev = 1);
      setNextMonth(prev => prev + 1);
      setThisYear(prev => prev + 1);
    }
  };

  //按下往上個月按鈕
  const handleSCPrevMonth = () => {
    if (12 > thisMonth && thisMonth > 1) {
      setThisMonth(prev => prev - 1);
      setNextMonth(prev => prev - 1);
    } else if (thisMonth === 1) {
      setThisMonth(prev => prev = 12);
      setNextMonth(prev => prev - 1);
      setThisYear(prev => prev - 1);
    } else if (thisMonth === 12) {
      setThisMonth(prev => prev - 1);
      setNextMonth(prev => prev = 12);
      setNextMonthYear(prev => prev - 1);
    }
  };

  //按下往下個月按鈕
  const handleSCNextMonth = () => {
    if (11 > thisMonth && thisMonth > 0) {
      setThisMonth(prev => prev + 1);
      setNextMonth(prev => prev + 1);
    } else if (thisMonth === 11) {
      setThisMonth(prev => prev + 1);
      setNextMonth(prev => prev = 1);
      setNextMonthYear(prev => prev + 1);
    } else if (thisMonth === 12) {
      setThisMonth(prev => prev = 1);
      setNextMonth(prev => prev + 1);
      setThisYear(prev => prev + 1);
    }
  };

  //預約頁面姓名與電話的輸入
  const handleNameInput = (e) => {
    setNameInput(e.target.value);
  };

  const handleTelInput = (e) => {
    setTelInput(e.target.value);
  };


  const handleBookRoom = async (e) => {
    e.preventDefault();
    const reservationDate = selectDateRange.slice(0, selectDateRange.length - 1);
    const data = {
      "name": nameInput,
      "tel": telInput,
      "date": reservationDate
    }
    const result = await bookRoom(id, data);
    console.log(result);
    if (result.success) {
      setSuccess(true);
      return;
    } else if (result === 400) {
      setFailure(true);
    }
  };


  return (
    <>
      <div className={loading ? "loading" : null}>
        <div className="loading-dot-1">．</div>
        <div className="loading-dot-2">．</div>
        <div className="loading-dot-3">．</div>
        <div className="loading-dot-4">．</div>
      </div>
      <div className="room-card">
        <ReservationPage
          showDialog={showDialog}
          showReservationPage={showReservationPage}
          closeReservationPage={closeReservationPage}
          showStartSC={showStartSC}
          showEndSC={showEndSC}
          toggleStartSC={toggleStartSC}
          toggleEndSC={toggleEndSC}
          roomName={roomName}
          roomShortDescription={roomShortDescription}
          roomPrice={roomPrice}
          available={available}
          checkInTime={checkInTime}
          checkOutTime={checkOutTime}
          zeroPad={zeroPad}
          getDateISO={getDateISO}
          minDate={minDate}
          maxDate={maxDate}
          selectEndDate={selectEndDate}
          selectStartDate={selectStartDate}
          totalAmountCount={totalAmountCount}
          totalPrice={totalPrice}
          weekDayNight={weekDayNight}
          holidayNight={holidayNight}
          monthDays={monthDays}
          monthFirstDay={monthFirstDay}
          thisMonth={thisMonth}
          thisYear={thisYear}
          handleSCPrevMonth={handleSCPrevMonth}
          handleSCNextMonth={handleSCNextMonth}
          handleSCEnd={handleSCEnd}
          handleSCStart={handleSCStart}
          handleNameInput={handleNameInput}
          handleTelInput={handleTelInput}
          handleBookRoom={handleBookRoom}
          reserved={reserved}
          reserveDuplicate={reserveDuplicate}
          success={success}
          failure={failure}
        />
        <RoomSlider
          showReservationPage={showReservationPage}
          roomImgs={roomImgs}
          totalPrice={totalPrice}
          weekDayNight={weekDayNight}
          holidayNight={holidayNight}
          totalAmountCount={totalAmountCount}
          selectDateRange={selectDateRange}
          selectEndDate={selectEndDate}
          selectStartDate={selectStartDate}
        />
        <div className="room-info">
          <div className="top-row">
            <h1 className="room-name">{roomName}</h1>
            <h2 className="room-short-description">{roomShortDescription}</h2>
          </div>
          <div className="medium-row">
            <div className="room-price">{roomPrice}</div>
            <div className="check-in">{checkInTime}</div>
            <div className="check-out">{checkOutTime}</div>
            <div className="description-list">
              {descriptionList.map((sentence, index) => (
                <li key={index + 1}>{sentence}</li>
              ))}
            </div>
          </div>
          <RoomAmenity
            available={available}
          />
          <Calendar
            handleSelectDateRange={handleSelectDateRange}
            handlePrevMonth={handlePrevMonth}
            handleNextMonth={handleNextMonth}
            thisYear={thisYear}
            thisMonth={thisMonth}
            renderDays={renderDays}
            renderDays2={renderDays2}
            prevMonthday={prevMonthday}
            day={day}
            nextMonthYear={nextMonthYear}
            nextMonth={nextMonth}
            nextMonthPrevMonthday={nextMonthPrevMonthday}
            nextMonthDay={nextMonthDay}
            reserveDuplicate={reserveDuplicate}
          />
        </div>
      </div >
    </>
  );
};

export default RoomCard;
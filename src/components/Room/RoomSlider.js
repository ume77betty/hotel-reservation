import Slider from "react-slick";
import styled from '@emotion/styled';
import surface1 from '../../assets/img/icons/surface1.png'
import { useEffect } from 'react';

const TotalPrice = styled.div`
  position: absolute;
  left: 37%;
  top: 53%;
  z-index: 20;
  font-size: 30px;
  color: rgb(56, 71, 11);
`;

const BookingButton = styled.div`
  width: 46%;
  height: 44px;
  z-index: 20;
  background: rgb(56, 71, 11);
  position: absolute;
  left: 27%;
  top: 60%;
  color: white;
  font-size: 20px;
  font-weight: 600;
  font-family: "Open Sans", sans-serif;
  display: inline-flex;
  justify-content: center;
  align-items: center; 
  transition: opacity 200ms ease 0s;

  &:hover {
    opacity: 0.8;
    cursor: pointer
  }
`;

const PrevPage = styled.div`
  color: rgba(56, 71, 11, 1);
  position: absolute;
  left: 25%;
  top: 87px;
  z-index: 20;
  font-size: 14px;
  text-decoration: none;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    margin-top: -8px;
    left: -20px;
    background-image: url(${surface1});
    background-repeat: no-repeat;
    background-position: center center;
    width: 16px;
    height: 16px;
  }
`;


const RoomSlider = ({
  roomImgs,
  showReservationPage,
  totalPrice,
  weekDayNight,
  holidayNight,
  totalAmountCount,
  selectDateRange,
  selectEndDate,
  selectStartDate
}) => {

  useEffect(() => { totalAmountCount() }, [selectEndDate, selectStartDate, selectDateRange, roomImgs, totalAmountCount])


  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };



  return (
    <div className="room-bg-container">
      <a href="http://localhost:3000/"><PrevPage>查看其它房型</PrevPage></a>
      <TotalPrice>${totalPrice} <span style={{ fontSize: 20 }}> / {weekDayNight + holidayNight} 晚</span></TotalPrice>
      <BookingButton onClick={showReservationPage}>Booking Now</BookingButton>
      <Slider {...settings}>
        <div>
          <img className="room-background" src={roomImgs[0]} alt="" />
        </div>
        <div>
          <img className="room-background" src={roomImgs[1]} alt="" />
        </div>
        <div>
          <img className="room-background" src={roomImgs[2]} alt="" />
        </div>
      </Slider>
    </div >
  )
};

export default RoomSlider;
import Able from '../../assets/img/icons/able.svg';
import Disable from '../../assets/img/icons/disable.svg';

const RoomAmenity = ({ available }) => {

  //map出房內設施
  const Amenities = available.map((amenity) => {
    return (
      <div className="room-amenity" key={amenity.url} style={{ opacity: amenity.isAvailable ? 1 : 0.2 }}>
        <div className="icon" style={{ backgroundImage: `url(${amenity.url})` }} ></div>
        <div className="check-icon" style={{ backgroundImage: amenity.isAvailable ? `url(${Able})` : `url(${Disable})` }}></div>
        <p>{amenity.iconName}</p>
      </div>
    )
  });

  return (
    <div className="amenities">
      {Amenities}
    </div>
  )
};

export default RoomAmenity;
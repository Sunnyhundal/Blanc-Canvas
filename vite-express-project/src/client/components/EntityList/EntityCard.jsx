import { useNavigate } from 'react-router-dom';
import { TypeIcon } from './TypeIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


const entityCardStyle = {
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer',
  paddingTop: '0.5rem'
};

const polaroidStyle = {
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)'
};

export const EntityCard = ({ style, data, isArtists }) => {
  const navigate = useNavigate();

  return (
    <div
      className="entity-card-container"
      style={{ ...style, ...entityCardStyle }}
    >
      <div
        className="entity-image-wrapper w-60 h-72 rounded-md"
        style={{
          ...polaroidStyle,
          transform: data.transform,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          paddingTop: '0.5rem'
        }}>
        <img 
          src={isArtists ? data.profile_picture : data.images[0]}
          alt={data.title}
          title={data.title}
          onClick={() => {
            navigate(`/${isArtists ? 'users' : 'projects'}/${data.id}`);
          }}
          className="w-56 h-56 object-cover"
        />
        <footer className="flex justify-between w-full pl-4 pr-3">
          <div className="flex justify-center items-center">
            <TypeIcon isArtists={isArtists} type={isArtists ? data.artist_type : data.type} />
          </div>
          <div className="flex flex-col truncate px-3">
            <span
              className="text-slate-950 truncate"
              style={{
                fontFamily: "'Kalam', cursive"
              }}
            >
              {isArtists ? data.name : data.title}
            </span>
            <span
              className="text-gray-400 truncate"
              style={{
                fontFamily: "'Kalam', cursive"
              }}
            >
              {data.location}
            </span>
          </div>
          <aside className="flex justify-end items-center">
            {/* this is only place holder */}
            <FontAwesomeIcon icon={faHeart} color={Math.random() > 0.5 ? 'red' : 'gray'}/>
          </aside>
        </footer>
      </div>
    </div>
  )
};

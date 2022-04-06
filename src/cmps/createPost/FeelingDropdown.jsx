import React from 'react';
import { Dropdown } from '../../UI/Dropdown';
import ReactTooltip from 'react-tooltip';

// feeling icons:

import happyIcon from '../../assets/icons/happy.png';
import sadIcon from '../../assets/icons/sad.png';
import confusedIcon from '../../assets/icons/happy.png';
import proudIcon from '../../assets/icons/proud.png';
import excitedIcon from '../../assets/icons/excited.png';
import angryIcon from '../../assets/icons/angry.png';
import cancelIcon from '../../assets/imgs/cancel.png';
export const FeelingDropdown = ({ setPostFeeling }) => {
  return (
    <Dropdown>
      <ReactTooltip />
      <li onClick={() => setPostFeeling('happy')}>
        <div data-tip='Happy'>
          <img src={happyIcon} alt='' />
        </div>
        {/* <div><span>Happy</span></div> */}
      </li>
      <li onClick={() => setPostFeeling('sad')}>
        <div data-tip='Sad'>
          <img src={sadIcon} alt='' />
        </div>
        {/* <div><span>Sad</span></div> */}
      </li>
      <li onClick={() => setPostFeeling('proud')}>
        <div data-tip='Proud'>
          <img src={proudIcon} alt='' />
        </div>
        {/* <div><span>Proud</span></div> */}
      </li>
      <li onClick={() => setPostFeeling('confused')}>
        <div data-tip='Confused'>
          <img src={confusedIcon} alt='' />
        </div>
        {/* <div><span>Confused</span></div> */}
      </li>
      <li onClick={() => setPostFeeling('excited')}>
        <div data-tip='Excited'>
          <img src={excitedIcon} alt='' />
        </div>
        {/* <div><span>Excited</span></div> */}
      </li>
      <li onClick={() => setPostFeeling('angry')}>
        <div data-tip='Angry'>
          <img src={angryIcon} alt='' />
        </div>
        {/* <div><span>Angry</span></div> */}
      </li>
      <li onClick={() => setPostFeeling(undefined)}>
        <div data-tip='Cancel'>
          <img src={cancelIcon} alt='' />
        </div>
        {/* <div><span>Angry</span></div> */}
      </li>
    </Dropdown>
  );
};

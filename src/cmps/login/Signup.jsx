import React, {
  useState,
  // useRef,
  useReducer,
} from 'react';
import styles from './Login-Signup.module.css';
// import { uploadImg } from '../services/img-upload-service';
import { useForm } from 'react-hook-form';
// import Autocomplete from "react-google-autocomplete";
import ReactTooltip from 'react-tooltip';

// import DatePicker from 'react-date-picker';// i can use this later in the app itself
import { useDispatch, useSelector } from 'react-redux';
import openEye from '../../assets/imgs/open-eye.png';
import closedEye from '../../assets/imgs/closed-eye.png';
import plus from '../../assets/imgs/plus.png';

import { signup } from '../../store/actions/userActions';
import { validate, titleCase } from '../../services/utilService';
// import { googleMapApiKey } from "../secrets";

export const Signup = ({ setCheckIfUser }) => {
  const { register, handleSubmit } = useForm();
  // const previewRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [latLng, setLatLng] = useState(null);
  const [place, setPlace] = useState(null);
  // const [preview, setPreview] = useState();
  // const [fileToUpload, setFileToUpload] = useState();
  // const [previewLoader, setPreviewLoader] = useState(false);
  const [showMiddleNameInput, setShowMiddleNameInput] = useState(false);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'password':
        return {
          ...state,
          isPasswordValid: action.isValid,
        };
      case 'first-name':
        return {
          ...state,
          isFirstNameValid: action.isValid,
        };
      case 'middle-name':
        return {
          ...state,
          isMiddleNameValid: action.isValid,
        };
      case 'last-name':
        return {
          ...state,
          isLastNameValid: action.isValid,
        };
      case 'email':
        return {
          ...state,
          isEmailValid: action.isValid,
        };

      default:
        break;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    isPasswordValid: false,
    isFirstNameValid: false,
    isMiddleNameValid: false,
    isLastNameValid: false,
    isEmailValid: false,
  });

  const { ready, loggedInUser, loginLoader } = useSelector(
    (state) => state.userModule
  );

  const globalDispatch = useDispatch();

  // const imageUploadHandler = async (ev) => {
  //   if (!ev.target.files[0]) return;
  //   const file = ev.target.files[0];
  //   if (!file.type.includes('image')) return;
  //   setFileToUpload(file);
  //   setPreviewLoader(true);
  //   const fileReader = new FileReader();
  //   fileReader.readAsDataURL(file);
  //   fileReader.addEventListener(
  //     'load',
  //     async (reader) => {
  //       setPreview(true);
  //       let image = new Image();
  //       image.src = reader.currentTarget.result;
  //       image.title = file.name;
  //       previewRef.current.appendChild(image);
  //     },
  //     false
  //   );
  //   setPreviewLoader(false);
  // };

  const checkValidity = (ev, type) => {
    const isValid = validate(
      type.includes('name') ? 'name' : type,
      ev.target.value
    );
    dispatch({ type, isValid });
  };

  const onSubmit = async (data) => {
    // const uploadedFileRes = await uploadImg(fileToUpload);
    const userEmail = data['email-input'].trim();
    const userPassword = data['password-input'].trim();
    const userPasswordVer = data['password-ver-input'].trim();
    const userFirstName = data['first-name'].trim().toLowerCase();
    const userMiddleName = data['middle-name']?.trim().toLowerCase();
    const userLastName = data['last-name'].trim().toLowerCase();
    const userDOB = data['DOB-input'];
    const userSex = data['sex-input'];
    // const userFullAddress = place.formatted_address;
    if (userPassword !== userPasswordVer) {
      alert("Passwords Don't Match");
      return;
    }
    console.log('name:', data);
    const userCred = {
      name: {
        first: userFirstName,
        middle: userMiddleName ? userMiddleName : '',
        last: userLastName,
      },
      // name: {
      //   first: titleCase(userFirstName),
      //   middle: userMiddleName ? titleCase(userMiddleName) : '',
      //   last: titleCase(userLastName),
      // },
      email: userEmail,
      password: userPassword,
      DOB: {
        day: new Date(userDOB).getDate(),
        month: new Date(userDOB).getMonth() + 1,
        year: new Date(userDOB).getFullYear(),
        timestamp: new Date(userDOB).getTime(),
      },
      // address: { full: userFullAddress, lat: latLng.lat, lng: latLng.lng },
      address: { full: 'Tel Aviv, Israel', lat: 32.0853, lng: 34.7818 },
      sex: userSex,
      profilePicture: '',
      // profilePicture: uploadImg(uploadedFileRes,userId)//user id isnt created yet. maybe add picture only after sign in
      careerInfo: {},
      educationInfo: {},
    };
    console.log('userCred in signup onsubmit:', userCred);
    if (validate('email', userEmail) && validate('password', userPassword)) {
      globalDispatch(signup(userCred));
      // setLoading(false);
    } else {
      console.log('unvalidated, try again.');
    }
  };

  return (
    <div className={`${styles.container} ${styles.signup}`}>
      <ReactTooltip />
      <div className={styles['right-header']}>
        <button onClick={() => setCheckIfUser(true)}>
          Already a User? Log In!
        </button>
        <div className={styles['h-container']}>
          <h1>Join Us!</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='text'
          placeholder='Enter Your Email*'
          {...register('email-input')}
          required
          onChange={(ev) => checkValidity(ev, 'email')}
          className={`${styles['validation-input']} ${
            state.isEmailValid ? styles.valid : styles.invalid
          }`}
        />
        <label>
          <input
            id='password'
            {...register('password-input')}
            type={showPassword ? 'text' : 'password'}
            placeholder='Password: At least 8 ch, Lower and Capital Letters*'
            onChange={(ev) => checkValidity(ev, 'password')}
            className={` ${styles['validation-input']} ${
              state.isPasswordValid ? styles.valid : styles.invalid
            }`}
          />
          <div className={styles['eye-image-container']}>
            <img
              onClick={() => setShowPassword(!showPassword)}
              src={showPassword ? openEye : closedEye}
              alt=''
            />
          </div>
        </label>
        <label>
          <input
            id='password-ver'
            {...register('password-ver-input')}
            type={showPassword ? 'text' : 'password'}
            placeholder='Password Verification*'
            required
          />
          <div className={styles['eye-image-container']}>
            <img
              onClick={() => setShowPassword(!showPassword)}
              src={showPassword ? openEye : closedEye}
              alt=''
            />
          </div>
        </label>

        <input
          type='text'
          id='first-name'
          placeholder='First Name'
          {...register('first-name')}
          onInput={(ev) => checkValidity(ev, 'first-name')}
          className={`${styles['validation-input']} ${
            state.isFirstNameValid ? styles.valid : styles.invalid
          }`}
        />
        <img
          data-tip='Add a Middle Name'
          src={plus}
          alt=''
          className={`${styles['validation-input']} ${
            styles['middle-name-btn']
          } ${showMiddleNameInput && styles.open}`}
          onClick={() => setShowMiddleNameInput(!showMiddleNameInput)}
        />
        {showMiddleNameInput && (
          <input
            type='text'
            id='middle-name'
            placeholder='Middle Name'
            {...register('middle-name')}
            onInput={(ev) => checkValidity(ev, 'middle-name')}
            className={`${styles['validation-input']} ${
              state.isMiddleNameValid ? styles.valid : styles.invalid
            }`}
          />
        )}
        <input
          type='text'
          id='last-name'
          placeholder='Last Name'
          {...register('last-name')}
          onInput={(ev) => checkValidity(ev, 'last-name')}
          className={` ${styles['validation-input']} ${
            state.isLastNameValid ? styles.valid : styles.invalid
          }`}
        />

        <input
          type='date'
          placeholder='Date Of Birth*'
          {...register('DOB-input')}
          required
        />
        {/* maybe add the 'sex' input figures of a man/woman/unicor that pop up when choosing?? */}
        <div className={styles.sex}>
          <span style={{ fontWeight: '500' }}>Sex:</span>
          <label htmlFor='f-option' className={styles['l-radio']}>
            <input
              className={styles['radio-input']}
              type='radio'
              id='f-option'
              name='selector'
              tabIndex='1'
              {...register('sex-input')}
              value='male'
            />
            <span className={styles['radio-span']}>Male</span>
          </label>
          <label htmlFor='s-option' className={styles['l-radio']}>
            <input
              className={styles['radio-input']}
              type='radio'
              id='s-option'
              name='selector'
              tabIndex='2'
              {...register('sex-input')}
              value='female'
            />
            <span>Female</span>
          </label>
          <label htmlFor='t-option' className={styles['l-radio']}>
            <input
              className={styles['radio-input']}
              type='radio'
              id='t-option'
              name='selector'
              tabIndex='3'
              value='unicorn'
              {...register('sex-input')}
            />
            <span>Unicorn</span>
          </label>
        </div>
        {/* <LocationInput /> */}

        {/* GOOGLE PLACES COSTS MONEY. NEED TO CHECK IF THERE'S A FREE OPTION OR IF ACTUALLY FREE UNDER 200$ */}

        {/* <Autocomplete
          required
          placeholder="Enter Your Address*"
          apiKey={googleMapApiKey}
          style={{ width: '90%' }}
          onPlaceSelected={(place) => {
            setLatLng({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            });
            console.log(place);
            setPlace(place);
          }}
          options={{
            types: ['geocode'],
          }}
        /> */}
        {/* <input
          type="file"
          placeholder="Choose Your Profile Picture*"
          onChange={imageUploadHandler}
          accept="image/*"
        />
        {preview && <div ref={previewRef} className={styles.preview}></div>} */}
        <button
          type='submit'
          className={styles['submit-button']}
          disabled={
            loginLoader || //if sent a request and now loading
            !state.isPasswordValid ||
            !state.isFirstNameValid ||
            (state.isMiddleNameValid ? !state.isMiddleNameValid : false) ||
            !state.isLastNameValid ||
            !state.isEmailValid
          }
        >
          {loginLoader ? (
            <div className={styles['lds-ellipsis']}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            'Signup'
          )}
        </button>
      </form>
    </div>
  );
};

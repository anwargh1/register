import { useEffect, useRef , useState } from "react";
import { FaCheck , FaTimes , FaInfoCircle} from "react-icons/fa";
import './r.css'

import { Link } from "react-router-dom";
import axios from "axios";

function  Register (){
    const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    const userNamePattern = /^[A-z][A-z0-9-_]{6,23}$/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const fullNamePattern = /^([a-zA-Z]+ ){3,7}[a-zA-Z]+$/;
    const phoneRegex = /^\d{10}$/;
    const univesityIdRegex = /^\d{9}$/; 

    const fullNameRef = useRef()
    const errRef = useRef()

    const[fullName,setfullName]=useState('');
    const[validfullName,setValidfullName]=useState(false);
    const[fullNameFocus,setfullNameFocus]=useState(false);

    const[email,setEmail]=useState('');
    const[validEmail,setValidEmail]=useState(false);
    const[emailFocus,setEmailFocus]=useState(false);

    const[phone,setPhone]=useState('');
    const[validPhone,setValidPhone]=useState(false);
    const[phoneFocus,setPhoneFocus]=useState(false);

    const[gender,setGender]=useState('');
    const[genderFocus,setGenderFocus]=useState(false);

    const[unversityId,setUnversityId]=useState('');
    const[validUnversityId,setValidUnversityId]=useState(false);
    const[unversityIdFocus,setUnversityIdFocus]=useState(false);

    const[userName,setUserName]=useState('');
    const[validUserName,setValidUserName]=useState(false);
    const[userNameFocus,setUserNameFocus]=useState(false);

    const[password,setPassword]=useState('');
    const[validPassword,setValidPassword]=useState(false);
    const[passwordFocus,setPasswordFocus]=useState(false);

    const[matchPwd,setMatchPwd]=useState('');
    const[validMatch,setValidMatch]=useState(false);
    const[matchFocus,setMatchFocus]=useState(false);

    const[major,setMajor]=useState('');
    const[majorFocus,setMajorFocus]=useState(false);

    const[errMsg,setErrMsg]=useState('');
    const[success,setSuccess]=useState(false);
      
    useEffect(()=>
    {
        fullNameRef.current.focus()
    },[]);

    useEffect(() => {
    const result = userNamePattern.test(userName)
    console.log(result);
    console.log(userName);
    setValidUserName(result);
     },[userName])


     useEffect(() => {
      const result = fullNamePattern.test(fullName.trim())
      console.log(result);
      console.log(fullName);
      setValidfullName(result);
       },[fullName])

       useEffect(() => {
        const result = emailRegex.test(email)
        console.log(result);
        console.log(email);
        setValidEmail(result);
         },[email])

         useEffect(() => {
          const result = phoneRegex.test(phone)
          console.log(result);
          console.log(phone);
          setValidPhone(result);
           },[phone])


           useEffect(() => {
            const result = univesityIdRegex.test(unversityId)
            console.log(result);
            console.log(unversityId);
            setValidUnversityId(result);
             },[unversityId])

     useEffect(() => {
        const result = passwordPattern.test(password)
        console.log(result);
        console.log(password);
        setValidPassword(result);

        const match = password === matchPwd;
        setValidMatch(match);
         },[password , matchPwd])


         useEffect(() => {
            setErrMsg('');
             },[userName , password , matchPwd])

      const handleSubmit = async (e) => {
        e.preventDefault();
            const user = {
                fullName,
                email,
                major,
                gender,
                unversityId,
                phone,
                userName,
                password
              };
              
              try {
                const result  = await  ( axios.post('http://localhost:3001/api/regester' , user))
                console.log(result.data )
              } catch (error) {
                console.log(error.response);

              }
            // await  axios({
            //     method: 'post',
            //     url: 'http://localhost:3001/api/regester',
            //     data: data
            //   })
            //     .then(response => {
            //       console.log(data);
            //     })
            //     .catch(error => {
            //       console.log(error.response);
            //     });

    
      }     

  return (
    <>
      {success ? (
        <section>
          <h1>success !</h1>
          <p>
            <Link to=''>Sign In</Link>
          </p>
        </section>
      ): (
   
    <section>
      <p ref={errRef} className={errMsg?"errmsg" : "offscreen"} 
      aria-live="assertive">{errMsg}</p>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} >

      <label for='fullName'>Full Name : 
            <span className={validfullName ? "valid" : "hide"}>
                <FaCheck/>
            </span>
            <span className={validfullName || !fullName ? "hide" : "invaled"}>
                <FaTimes/>
            </span>
        </label>
        <input
            type="text"
            id="fullName"
            ref={fullNameRef}
            autoComplete="off"
            onChange={(e)=> setfullName(e.target.value)}
            required
            aria-invalid={validfullName?"false" : "true"}
            aria-describedby="fNamenote"
            onFocus={()=> setfullNameFocus(true)}
            onBlur={()=> setfullNameFocus(false)}
        />

        <p id="fNamenote"
         className={fullNameFocus && fullName && !validfullName ?
            "instructions" : "offscreen"}>
                <FaInfoCircle/>
                Please enter full name more than 3 Words .<br/>
         </p>

         <label for='email'>Email : 
            <span className={validEmail ? "valid" : "hide"}>
                <FaCheck/>
            </span>
            <span className={validEmail || !email? "hide" : "invaled"}>
                <FaTimes/>
            </span>
        </label>
        <input
            type="text"
            id="email"
            autoComplete="off"
            onChange={(e)=> setEmail(e.target.value)}
            required
            aria-invalid={setEmail?"false" : "true"}
            aria-describedby="emailnote"
            onFocus={()=> setEmailFocus(true)}
            onBlur={()=> setEmailFocus(false)}
        />

        <p id="emailnote"
         className={emailFocus && email && !validEmail ?
            "instructions" : "offscreen"}>
                <FaInfoCircle/>
                Please enter valid Email .<br/>
         </p>

         <label for='major'> Your Major : 

        </label>
        <input
            type="text"
            id="major"
            autoComplete="off"
            onChange={(e)=> setMajor(e.target.value)}
            required
            onFocus={()=> setMajorFocus(true)}
            onBlur={()=> setMajorFocus(false)}
        />

         <label for='phone'> Phone Number : 
            <span className={validPhone ? "valid" : "hide"}>
                <FaCheck/>
            </span>
            <span className={validPhone || !phone? "hide" : "invaled"}>
                <FaTimes/>
            </span>
        </label>
        <input
            type="text"
            id="phone"
            autoComplete="off"
            onChange={(e)=> setPhone(e.target.value)}
            required
            aria-invalid={validPhone?"false" : "true"}
            aria-describedby="phonenote"
            onFocus={()=> setPhoneFocus(true)}
            onBlur={()=> setPhoneFocus(false)}
        />

         <p id="phone"
             className={phoneFocus && phone && !validPhone ?
               "instructions" : "offscreen"}>
                <FaInfoCircle/>
                The number must be 10 digits<br/>
         </p>

        <label for='username'>Username : 
            <span className={validUserName ? "valid" : "hide"}>
                <FaCheck/>
            </span>
            <span className={validUserName || !userName? "hide" : "invaled"}>
                <FaTimes/>
            </span>
        </label>
        <input
            type="text"
            id="username"
            autoComplete="off"
            onChange={(e)=> setUserName(e.target.value)}
            required
            aria-invalid={validUserName?"false" : "true"}
            aria-describedby="uidnote"
            onFocus={()=> setUserNameFocus(true)}
            onBlur={()=> setUserNameFocus(false)}
        />

        <p id="uidnote"
         className={userNameFocus && userName && !validUserName ?
            "instructions" : "offscreen"}>
                <FaInfoCircle/>
                6 to 23 characters .<br/>
                Must begin with a letter.<br/>
                Letters, numbers , underscores , hyphens allowed .
         </p>

         <label for='universityId'>University Id : 
            <span className={validUnversityId ? "valid" : "hide"}>
                <FaCheck/>
            </span>
            <span className={validUnversityId || !unversityId? "hide" : "invaled"}>
                <FaTimes/>
            </span>
        </label>
        <input
            type="text"
            id="universityId"
            autoComplete="off"
            onChange={(e)=> setUnversityId(e.target.value)}
            required
            aria-invalid={validUnversityId?"false" : "true"}
            aria-describedby="universityIdnote"
            onFocus={()=> setUnversityIdFocus(true)}
            onBlur={()=> setUnversityIdFocus(false)}
        />

        <p id="universityIdnote"
         className={unversityIdFocus && unversityId && !validUnversityId ?
            "instructions" : "offscreen"}>
                <FaInfoCircle/>
                The Id must be 9 digits .<br/>
         </p>

         <label for='gender'>Your Gender : 
        </label>
        <input
            type="radio"
            id="gender"
            name="gender"
            onChange={(e)=> setGender(e.target.value)}
            required
            onFocus={()=> setGenderFocus(true)}
            onBlur={()=> setGenderFocus(false)}
        /> Male
        <input
            type="radio"
            id="gender"
            name="gender"
            onChange={(e)=> setGender(e.target.value)}
            required
            onFocus={()=> setGenderFocus(true)}
            onBlur={()=> setGenderFocus(false)}
        />Female


         <label for='password'> Password : 
            <span className={validPassword ? "valid" : "hide"}>
                <FaCheck/>
            </span>
            <span className={validPassword || !password? "hide" : "invaled"}>
                <FaTimes/>
            </span>
        </label>

        <input
            type="password"
            id="password"
            onChange={(e)=> setPassword(e.target.value)}
            required
            aria-invalid={validPassword?"false" : "true"}
            aria-describedby="pwdnote"
            onFocus={()=> setPasswordFocus(true)}
            onBlur={()=>setPasswordFocus(false)}
        />

        <p id="pwdnote"
            className={passwordFocus && !validPassword  ?
                "instructions" : "offscreen"}>
                <FaInfoCircle/>
                8 to 24 characters .<br/>
                Must include uppercaase and lowercase letter , a numbers
                 and special characters.<br/>
                allowed apecial characters : <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
         </p>

         <label for='confirm-pwd'> Confiem Password : 
            <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FaCheck/>
            </span>
            <span className={validMatch || !matchPwd ? "hide" : "invaled"}>
                <FaTimes/>
            </span>
        </label>

        <input
            type="password"
            id="confirm-pwd"
            onChange={(e)=> setMatchPwd(e.target.value)}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={()=> setMatchFocus(true)}
            onBlur={()=>setMatchFocus(false)}
        />

        <p id="confirmnote"
            className={matchFocus && !validMatch  ?
                "instructions" : "offscreen"}>
                <FaInfoCircle/>
                Must match the first password input field .<br/>
         </p>

         <button type="submit" disabled={!validUserName || !validMatch || 
         !validPassword ? true : false}  >Sign Up</button>
  
      </form>
      <p>
        Already registered ? <br/>
        <span className="line">
          <Link to='/login'>Sign In</Link>
        </span>
      </p>
    </section>
    )} 
    
    </>
    
  )
}

export default Register



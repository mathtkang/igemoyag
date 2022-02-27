import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_HOST_IP_ADDRESS } from '../env';
import { resetpassword } from '../redux/authSlice';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
  });
  const { email } = formData;
  const [requestSent, setRequestSent] = useState(false);

  const resetPassword = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email });

    try {
      await axios.post(`${REACT_APP_HOST_IP_ADDRESS}auth/users/reset_password/`, body, config);
      alert('이메일 전송이 완료되었습니다.');

      dispatch(resetpassword({ email }));
    } catch (error) {
      alert('유효하지 않은 이메일입니다.');
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    resetPassword(email);
  };

  const onChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });
  if (requestSent) {
    navigate('/login');
  }

  return (
    <PasswordDiv>
      <h1>비밀번호를 변경하고 싶은 이메일을 작성해 주세요 💬</h1>
      <br />
      <form onSubmit={(event) => onSubmit(event)} style={{ display: 'flex' }}>
        <FormField>
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(event) => onChange(event)}
            required
          />
          <span />
        </FormField>
        <Button type="submit">비밀번호 재설정</Button>
      </form>
    </PasswordDiv>
  );
};

export default ResetPasswordPage;

const PasswordDiv = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  box-shadow: 3px 4px 0px 0px #899599;
  background: linear-gradient(to bottom, #ededed 5%, #bab1ba 100%);
  background-color: #ededed;
  border-radius: 15px;
  border: 1px solid #d6bcd6;
  display: inline-block;
  cursor: pointer;
  color: #3a8a9e;
  font-family: Arial;
  font-size: 17px;
  padding: 7px 25px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #e1e2ed;

  &:hover {
    background: linear-gradient(to bottom, #bab1ba 5%, #ededed 100%);
    background-color: #bab1ba;
  }
  &:active {
    position: relative;
    top: 1px;
  }
`;

const FormField = styled.div`
  position: relative;
  > input {
    border-radius: 0.25em;
    border-style: solid;
    border-width: 2px;
    font-size: 1.5rem;
    padding: 0.5em 4em 0.5em 2em;

    :valid {
      border-color: forestgreen;

      + span::after {
        position: absolute;
        right: 1em;
        top: 50%;
        transform: translateY(-50%);
        content: '😃';
      }
    }

    :invalid {
      border-color: firebrick;

      + span::after {
        position: absolute;
        right: 1em;
        top: 50%;
        transform: translateY(-50%);
        content: '😳';
      }
    }
  }
  > span {
    margin-left: 10px;
  }
`;

// const FormInput = styled.input`
//   border-radius: 0.25em;
//   border-style: solid;
//   border-width: 2px;
//   font-size: 1.5rem;
//   padding: 0.5em 4em 0.5em 2em;
//   &:valid {
//     border-color: forestgreen;
//   }
//   &:invalid {
//     border-color: firebrick;
//   }
// `;

// const FormFieldIcon = styled.span`
//   position: absolute;
//   right: 1em;
//   top: 50%;
//   transform: translateY(-50%);
// `;

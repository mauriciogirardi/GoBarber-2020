import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

const appearFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const appearFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const appearFromRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(50px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div``;

export const Header = styled.header`
  background-color: #28262e;
  padding: 32px 0;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  animation: ${appearFromTop} 0.9s;

  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 90px;
  }

  button {
    background-color: transparent;
    border: 0;
    font-size: 25px;

    svg {
      color: #999591;
      transition: color 0.2s;

      &:hover {
        color: #c53030;
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 56px;
    height: 56px;
    object-fit: cover;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 12px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    a {
      display: flex;
      align-items: center;
      transition: opacity 0.2s;

      strong {
        color: #ff9000;
      }

      svg {
        color: #999591;
        margin-left: 12px;
        font-size: 18px;
      }

      &:hover {
        opacity: 80%;
      }
    }
  }
`;

export const ImageFakeProfile = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #999591;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: #28262e;
    font-size: 30px;
  }
`;

export const ImageFakeAppointment = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #f4ede8;
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    color: #28262e;
    font-size: 30px;
  }
`;

export const Content = styled.main`
  max-width: 1200px;
  width: 100%;
  margin: 64px auto;
  padding: 0 16px;
  display: flex;
`;

export const Schedule = styled.section`
  flex: 1;
  margin-right: 120px;
  animation: ${appearFromLeft} 0.9s;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    font-weight: 500;

    span {
      &::after {
        content: '|';
        color: #ff9000;
        padding: 0 8px;
      }

      &:nth-last-child(1) {
        &::after {
          content: '';
        }
      }
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 34px;
    display: block;
  }

  div {
    background-color: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    position: relative;

    &::before {
      content: '';
      width: 2px;
      height: 75%;
      background-color: #ff9000;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
    }

    strong {
      margin-left: 24px;
      color: #fff;
    }

    span {
      display: flex;
      align-items: center;
      margin-left: auto;
      color: #999591;

      svg {
        margin-right: 5px;
        color: #ff9000;
        font-size: 18px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 64px;

  > p {
    color: #999591;
  }

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3d47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
`;

export const Appointment = styled.main`
  display: flex;
  align-items: center;

  & + main {
    margin-top: 8px;
  }

  span {
    color: #f4ede8;
    display: flex;
    align-items: center;
    margin-right: 24px;

    svg {
      color: #ff9000;
      margin-right: 5px;
    }
  }

  > div {
    flex: 1;
    background-color: #3e3b47;
    border-radius: 10px;
    padding: 16px 24px;
    display: flex;
    align-items: center;

    img {
      width: 56px;
      height: 56px;
      object-fit: cover;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      font-size: 18px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;
  animation: ${appearFromRight} 0.9s;

  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 10px;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: #28262e;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
